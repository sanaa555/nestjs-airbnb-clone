import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { UploadSingleFileUsecase } from './usecases/upload-single-file.usecase';
import { UploadMultipleFilesUsecase } from './usecases/upload-multiple-files.usecase';
import { DeleteFileByUrlUsecase } from './usecases/delete-file-by-url.usecase';
import { S3FileStorageService } from './storage/s3/s3-file-storage.service';

@Module({
  providers: [FilesUploadService,UploadSingleFileUsecase,UploadMultipleFilesUsecase,DeleteFileByUrlUsecase,S3FileStorageService],
  exports:[FilesUploadService]
})
export class FilesUploadModule {}
