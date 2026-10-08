import { Injectable } from '@nestjs/common';
import { UploadSingleFileUsecase } from './usecases/upload-single-file.usecase';
import { UploadMultipleFilesUsecase } from './usecases/upload-multiple-files.usecase';
import { DeleteFileByUrlUsecase } from './usecases/delete-file-by-url.usecase';
import { MulterFile } from './types/multer-file.type';

@Injectable()
export class FilesUploadService {
    constructor(
        private readonly uploadSingleFileUsecase:UploadSingleFileUsecase,
        private readonly uploadMultipleFilesUsecase:UploadMultipleFilesUsecase,
        private readonly deleteFileByUrlUsecase:DeleteFileByUrlUsecase

    ){}

   async uploadSingleFile(file:MulterFile):Promise<string>{
        return this.uploadSingleFileUsecase.excute(file)

    }
   async uploadMultipleFile(files:MulterFile[]):Promise<string[]>{
    return this.uploadMultipleFilesUsecase.excute(files)

    }
    DeleteFileByUrl(){
        
    }
}