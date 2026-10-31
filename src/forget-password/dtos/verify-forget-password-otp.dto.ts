import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyForgetPassworOtpDto{

    @IsNotEmpty()
    @IsEmail()
    email:string

    
    @IsString()
    code:string
}