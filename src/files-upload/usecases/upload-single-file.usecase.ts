import { Injectable } from "@nestjs/common";
import { S3FileStorageService } from "../storage/s3/s3-file-storage.service";
import { MulterFile } from "../types/multer-file.type";

@Injectable()
export class UploadSingleFileUsecase{
    
    constructor(
        private readonly s3FileStorageService:S3FileStorageService
    ){}

    async excute(file:MulterFile):Promise<string>{
        
        return await this.s3FileStorageService.uploadFile(file)
    }
}