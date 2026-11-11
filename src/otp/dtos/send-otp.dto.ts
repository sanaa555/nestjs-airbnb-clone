import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendOtpDto {
    @ApiProperty({
        description: 'Email address to send the verification code to.',
        example: 'user@example.com',
        format: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}