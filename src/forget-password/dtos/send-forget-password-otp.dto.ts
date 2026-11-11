import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendForgetPassworOtpDto{

    @ApiProperty({
        description: 'Email address associated with the account to recover.',
        example: 'user@example.com',
        format: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email:string
}