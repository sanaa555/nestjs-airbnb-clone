import { Injectable } from "@nestjs/common";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { FilesUploadService } from "src/files-upload/files-upload.service";
import { DeleteUnitPhotosDto } from "../dtos/delete-unit-photos.dto";
import { CheckUnitAuthUsecase } from "./check-unit-auth.usecase";
import { FindoneUnitUsecase } from "./find-one.usecase";
import { UnitRepository } from "../repositories/unit.repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class DeleteUnitPhotoUsecase{
    constructor(
        private readonly filesUploadService :FilesUploadService,
         private readonly checkUnitAuthUsecase:CheckUnitAuthUsecase,
        private readonly findoneUnitUsecase:FindoneUnitUsecase,
        private readonly unitRepository:UnitRepository
    ){}

    async excute(unitId:string,currentUser:currentUserData,body:DeleteUnitPhotosDto):Promise<void>{

        
        //1-validate the owner of unit who can delete the unit photos
              //get unit
           const unit= await this.findoneUnitUsecase.excute({_id:unitId })

         this.checkUnitAuthUsecase.excute(unit.user.toString(),currentUser)
         if(!body.photos?.length) throw new BadRequestException('No Photo Provided')
         
           //delete from db
           //unit.photos=['url1','url2','url3']
           //body.photos=['url1','url2','url4']
           //imagesToDelete=['url1','url2']
           // result unit in db =unit.photos=['url3']
              const imagesToDelete=body.photos.filter((photo)=> unit.photos.includes(photo))
            await this.unitRepository.findByIdAndUpdate(unitId,{
                $pull:{photos:{$in:imagesToDelete}}
            },{returnDocument:'after'})

         // delete photos from S3
        await   this.filesUploadService.DeleteFileByUrl(imagesToDelete)
          
    }
}