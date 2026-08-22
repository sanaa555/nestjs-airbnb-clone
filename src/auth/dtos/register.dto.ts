import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class RegisterDto{
    @ApiProperty({
        description:"user name",
        example:'Sanaa Radwan'

    })
    @IsNotEmpty()
    name:string;


    @ApiProperty({
        description:"user email",
        example:'Sanaa@example.com'

    })
    @IsNotEmpty()
    @IsEmail()
    email:string;


@ApiProperty({
        description:"user phone number",
        example:'012345678910'

    })
    @IsNotEmpty()
    phoneNumber:string;
    


    @ApiProperty({
        description:"user password",
        example:'password'

    })
    @IsNotEmpty()
    password:string;
}