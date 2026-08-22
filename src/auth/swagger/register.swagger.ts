


import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function   SignupSwagger (){
  return applyDecorators(

   ApiOperation({
    summary:'Register a new user',
    description:'Register a new user and recieve acess token and refresh token'
   }),

      ApiResponse({status:201,type:AuthResponseDto}),
       ApiResponse({status:400,description:'validation error:User with this email already exists or User with this phone number already exists',
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
      "example": "User with this email already exists"
                    },
              },
            },
          },
        },
      },
    }),
  );
}