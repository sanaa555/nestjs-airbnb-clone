import { Injectable } from "@nestjs/common";
import { S3FileStorageService } from "../storage/s3/s3-file-storage.service";

@Injectable()
export class DeleteFileByUrlUsecase{
    constructor(
            private readonly s3FileStorageService:S3FileStorageService
        ){}
    
        async excute(urls:string|string[]):Promise<void>{
            
            return  this.s3FileStorageService.DeleteFilesByUrl(urls)
        }
    
}