import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDto {
    @ApiProperty({
        description: 'Email address associated with the verification code.',
        example: 'user@example.com',
        format: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Six-digit verification code sent to the email address.',
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    code: string;
}