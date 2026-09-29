import { Injectable } from '@nestjs/common';
import { UploadSingleFileUsecase } from './usecases/upload-single-file.usecase';
import { UploadMultipleFilesUsecase } from './usecases/upload-multiple-files.usecase';
import { DeleteFileByUrlUsecase } from './usecases/delete-file-by-url.usecase';

@Injectable()
export class FilesUploadService {
    constructor(
        private readonly uploadSingleFileUsecase:UploadSingleFileUsecase,
        private readonly uploadMultipleFilesUsecase:UploadMultipleFilesUsecase,
        private readonly deleteFileByUrlUsecase:DeleteFileByUrlUsecase

    ){}

    uploadSingleFile(){

    }
    uploadMultipleFile(){

    }
    DeleteFileByUrl(){
        
    }
}
