import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Email address associated with the verified password reset request.',
        example: 'user@example.com',
        format: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'New password to set for the account.',
        example: 'NewSecurePassword123',
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}