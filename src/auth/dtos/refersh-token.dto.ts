import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export  class RefreshTokenDto{

     @ApiProperty({
             description:"user refresh token",
             example:'qwertyuiopasdfghjk....'
     
         })
    @IsString()
    @IsNotEmpty()
    refreshToken:string

}