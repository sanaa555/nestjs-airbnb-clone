


import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function   LoginSwagger (){
  return applyDecorators(

   ApiOperation({
    summary:'login  user',
    description:'login  user and recieve acess token and refresh token'
   }),


    ApiResponse({status:201,type:AuthResponseDto}),
       ApiResponse({status:400,description:'validation error:invalid credentials',
              schema:{
     "type": "object",
     "required": ["errors"],
     "properties": {
       "errors": {
         "type": "array",
         "items": {
           "type": "object",
           "required": ["message"],
           "properties": {
             "message": {
     "type": "string",
     "example": "invalid credentials"
   }
           }
         }
       }
     }
   }
   
       })


      
    
  );
}