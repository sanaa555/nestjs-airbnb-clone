import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty({ description: "User name", example: "Sanaa Radwan" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "User email", example: "Sanaa@example.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "User phone number", example: "012345678910" })
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ description: "User password", example: "password", format: "password" })
    @IsNotEmpty()
    password: string;
}