import { Injectable } from "@nestjs/common";
import { S3FileStorageService } from "../storage/s3/s3-file-storage.service";
import { MulterFile } from "../types/multer-file.type";
import { UploadSingleFileUsecase } from "./upload-single-file.usecase";

@Injectable()
export class UploadMultipleFilesUsecase{
    constructor(
            private readonly s3FileStorageService:S3FileStorageService,
            private readonly uploadSingleFileUsecase:UploadSingleFileUsecase
        ){}
    
        async excute(files:MulterFile[]):Promise<string[]>{

            return Promise.all(
                files.map((file)=> this.uploadSingleFileUsecase.excute(file))
            )
            
        }
    
}