import {  S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  Environment } from "src/common/configration/environment.interface";
import { Readable } from "stream";
import bytes from 'bytes'
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { MulterFile } from "src/files-upload/types/multer-file.type";
// call sdk aws s3
@Injectable()
export class S3FileStorageService{
    private readonly s3Client:S3 ;
    private readonly  bucketName:string;
    private readonly region:string;
    private readonly accessKeyId:string;
    private readonly secretAccessKey:string

    constructor(
        private readonly configService:ConfigService<Environment>
    ){
        this.bucketName=this.configService.getOrThrow<string>('awsS3.bucketName',{infer:true});
        this.region=this.configService.getOrThrow<string>('awsS3.region',{infer:true});
          this.accessKeyId=this.configService.getOrThrow<string>('awsS3.accessKeyId',{infer:true});
         this.secretAccessKey=this.configService.getOrThrow<string>('awsS3.secretAccessKey',{infer:true})
           //connect  to awsS3
         this.s3Client= new S3({
            region:this.region,
            credentials:{
                accessKeyId:this.accessKeyId,
                secretAccessKey:this.secretAccessKey
            }
         } )}

   async uploadFile(file:MulterFile):Promise<string>{
      //1-generate unique file name
      const uniqueFileName =  this.generateUniqueFileName(file)
      ///2-upload file to s3
    const upload=  new Upload({
        client:this.s3Client,
        params:{
            Bucket:this.bucketName,
            Key:uniqueFileName,
            Body: Readable.from(file.buffer),
            ContentType:file.mimetype,
        },
          // upload up to 4 parts in parallel
          queueSize:4,
          //min part size= 5 MB
          partSize:bytes('5MB') as number
      }) 
       upload.on('httpUploadProgress',(Progress)=>{
           console.log('uploaded progress',Progress)
       })
      try{
        const result = await upload.done()
              //3-return file url
                 return result.Location as string
      }
      catch(error){
         console.log(error)
         throw new BadRequestException('failed to upload file')
      }
    }

    
   private generateUniqueFileName(file:MulterFile):string{
      
        const fileName=`${Date.now()}-${file.originalname??file.filename}`
        return fileName
    }

}