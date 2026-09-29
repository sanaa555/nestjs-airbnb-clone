import { FileTypeValidator, FileValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";
import { fileSizeType, fileType } from "../types/file.types";
import { createFileTypeRegex } from "../utils/file.util";
import { NonEmptyArrary } from "../utils/arrary.util";
import  bytes  from 'bytes'
import { UnprocessableEntityException } from "src/common/errors-handling/custom-exceptions/Unprocessable-entity-exception";


const createFileValidators= (maxSize:fileSizeType,fileTypes:NonEmptyArrary<fileType>):FileValidator[]=>{

    const fileTypeRegex=createFileTypeRegex(fileTypes)
    
    return[
    //nest provide 2 built in validators

    //1-)validate file size
    new MaxFileSizeValidator(
        {
            maxSize:bytes(maxSize) as number,
            message:(maxSize)=>`file is too big.Max file is${maxSize} bytes`
        }
    ),
    //2)validate file type(exetensions)
     new FileTypeValidator({
        fileType:fileTypeRegex
     })
]}



export const createParseFilePipe=(maxSize:fileSizeType,
    fileTypes:NonEmptyArrary<fileType>):ParseFilePipe =>   new ParseFilePipe(
{     
       validators:createFileValidators(maxSize,fileTypes),
       errorHttpStatusCode:HttpStatus.UNSUPPORTED_MEDIA_TYPE,
       exceptionFactory:(error:string)=>{
              
        console.log('error',error)
        throw new UnprocessableEntityException(error)
       },
       fileIsRequired:true
}
    )