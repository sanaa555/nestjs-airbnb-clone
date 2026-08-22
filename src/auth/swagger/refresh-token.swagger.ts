import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthResponseDto } from "../dtos/auth-response.dto";




export  function RefreshTokenSwagger(){
  return  applyDecorators(

    ApiOperation({
        summary:'refresh token  ',
        description:' create new  acess token and refresh token for the user'
       }),


       ApiResponse({
        status:201,
        type:AuthResponseDto,
        description:'New access and refresh tokens',
       }),
       ApiResponse({
  status: 400,
  description: 'Invalid refresh token type',
  schema: {
    type: 'object',
    required: ['errors'],
    properties: {
      errors: {
        type: 'array',
        items: {
          type: 'object',
          required: ['message'],
          properties: {
            message: {
              type: 'string',
              example: 'invalid refresh token',
            },
          },
        },
      },
    },
  },
}),
       ApiResponse({
        status:403,
        description:'The refresh token is invalid, expired, or not found',
        schema:{
          type:'object',
          required:['errors'],
          properties:{
            errors:{
              type:'array',
              items:{
                type:'object',
                required:['message'],
                properties:{
                  message:{
                    type:'string',
                    example:'invalid refresh token',
                  },
                },
              },
            },
          },
        },
       }),

    )
}