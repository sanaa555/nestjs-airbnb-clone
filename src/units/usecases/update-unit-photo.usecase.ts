// import { Injectable } from "@nestjs/common";
// import { FilesUploadService } from "src/files-upload/files-upload.service";
// import { CheckUnitAuthUsecase } from "./check-unit-auth.usecase";
// import { FindoneUnitUsecase } from "./find-one.usecase";
// import { UnitRepository } from "../repositories/unit.repository";
// import { currentUserData } from "src/auth/interfaces/principal.interface";
// import { UpdateUnitPhotosDto } from "../dtos/update-unit-photos.dto ";
// import { UnitResponseDto } from "../dtos/unit-response.dto";
// import { plainToInstance } from "class-transformer";
// import { MulterFile } from "src/files-upload/types/multer-file.type";
// import { S3FileStorageService } from "src/files-upload/storage/s3/s3-file-storage.service";


// @Injectable()

// export class UpdateUnitPhotoUsease{
//     constructor(
        
//                 private readonly filesUploadService :FilesUploadService,
//                  private readonly checkUnitAuthUsecase:CheckUnitAuthUsecase,
//                 private readonly findoneUnitUsecase:FindoneUnitUsecase,
//                 private readonly unitRepository:UnitRepository,
//                   private readonly s3FileStorageService: S3FileStorageService,

//     ){}

//     // async excute(unitId:string,currentUser:currentUserData,photos:MulterFile[]):Promise<UnitResponseDto>{

//     //      const body:UpdateUnitPhotosDto={}
//     //     //1-validate the owner of unit who can delete the unit photos
//     //           //get unit
//     //        const unit= await this.findoneUnitUsecase.excute({_id:unitId })

//     //      this.checkUnitAuthUsecase.excute(unit.user.toString(),currentUser)
//     //      //2-upload new photos
//     //               body.photos= await this.filesUploadService.uploadMultipleFile(photos)

//     //      //3-update unit with new photos
//     //      //$addToSet operator adds a value to an arrary unless the value is already present
//     //      //unit.photos=['url1','url2']
//     //      //body.photo=['url1','url3']
//     //      //result ['url1'','url2','url3']
            
//     //    const updatedUnit=   await this.unitRepository.findByIdAndUpdate(unitId,{
//     //         $addToSet:{photos:{$each:body.photos}}
//     //      },{returnDocument:'after',lean:true})
//     //    return plainToInstance(UnitResponseDto,updatedUnit)


//     //     }
// }

import { Injectable } from "@nestjs/common";
import { FilesUploadService } from "src/files-upload/files-upload.service";
import { CheckUnitAuthUsecase } from "./check-unit-auth.usecase";
import { UnitRepository } from "../repositories/unit.repository";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { plainToInstance } from "class-transformer";
import { MulterFile } from "src/files-upload/types/multer-file.type";
import { S3FileStorageService } from "src/files-upload/storage/s3/s3-file-storage.service";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class UpdateUnitPhotoUsease {
  constructor(
    private readonly filesUploadService: FilesUploadService,
    private readonly checkUnitAuthUsecase: CheckUnitAuthUsecase,
    private readonly unitRepository: UnitRepository,
    private readonly s3FileStorageService: S3FileStorageService,
  ) {}

  async excute(
    unitId: string,
    currentUser: currentUserData,
    photos: MulterFile[],
  ): Promise<UnitResponseDto> {
    // 1. Get unit from database
    const unit = await this.unitRepository.findOne({
      _id: unitId,
    });

    if (!unit) {
      throw new BadRequestException("this unit not found");
    }

    // 2. Check unit owner
    this.checkUnitAuthUsecase.excute(
      unit.user.toString(),
      currentUser,
    );

    // 3. Get existing photo hashes
    const existingPhotoHashes = unit.photoHashes ?? [];

    const knownPhotoUrls = new Set(
      existingPhotoHashes.map((photo) => photo.url),
    );

    // 4. Calculate missing hashes for old photos
    const missingPhotoHashes: { url: string; hash: string }[] = [];

    for (const photoUrl of unit.photos ?? []) {
      if (knownPhotoUrls.has(photoUrl)) {
        continue;
      }

      const hash =
        await this.s3FileStorageService.generateFileHashFromUrl(
          photoUrl,
        );

      missingPhotoHashes.push({
        url: photoUrl,
        hash,
      });

      knownPhotoUrls.add(photoUrl);
    }

    // 5. Save missing hashes in the database
    if (missingPhotoHashes.length > 0) {
      await this.unitRepository.findByIdAndUpdate(
        unitId,
        {
          $addToSet: {
            photoHashes: {
              $each: missingPhotoHashes,
            },
          },
        },
        {
          returnDocument: "after",
          lean: true,
        },
      );
    }

    // 6. Build a set containing all existing hashes
    const existingHashes = new Set([
      ...existingPhotoHashes.map((photo) => photo.hash),
      ...missingPhotoHashes.map((photo) => photo.hash),
    ]);

    // 7. Filter duplicate photos from the request
    const uniquePhotos: MulterFile[] = [];
    const newHashes: string[] = [];

    for (const photo of photos) {
      const hash =
        this.s3FileStorageService.generateFileHash(photo);

      console.log("NEW PHOTO:", photo.originalname);
      console.log("NEW HASH:", hash);
      console.log("EXISTING HASHES:", [...existingHashes]);
      console.log("IS DUPLICATE:", existingHashes.has(hash));

      // Skip photos that already exist in this unit
      if (existingHashes.has(hash)) {
        continue;
      }

      // Prevent duplicates within the same request
      existingHashes.add(hash);

      uniquePhotos.push(photo);
      newHashes.push(hash);
    }

    // 8. If all photos are duplicates, don't upload anything
    if (uniquePhotos.length === 0) {
      return plainToInstance(UnitResponseDto, unit);
    }

    // 9. Upload only new photos to S3
    const uploadedUrls =
      await this.filesUploadService.uploadMultipleFile(
        uniquePhotos,
      );

    // 10. Pair each uploaded URL with its hash
    const newPhotoHashes = uploadedUrls.map((url, index) => ({
      url,
      hash: newHashes[index],
    }));

    // 11. Save the new photo URLs and hashes
    const updatedUnit =
      await this.unitRepository.findByIdAndUpdate(
        unitId,
        {
          $addToSet: {
            photos: {
              $each: uploadedUrls,
            },
            photoHashes: {
              $each: newPhotoHashes,
            },
          },
        },
        {
          returnDocument: "after",
          lean: true,
        },
      );

    if (!updatedUnit) {
      throw new BadRequestException("this unit not found");
    }

    // 12. Return the response
    return plainToInstance(UnitResponseDto, updatedUnit);
  }
}


