import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyForgetPassworOtpDto {
    @ApiProperty({
        description: 'Email address associated with the password reset code.',
        example: 'user@example.com',
        format: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password reset verification code sent by email.',
        example: '123456',
    })
    @IsString()
    code: string;
}