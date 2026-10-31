import { IsEmail, IsNotEmpty } from "class-validator";

export class SendForgetPassworOtpDto{

    @IsNotEmpty()
    @IsEmail()
    email:string
}