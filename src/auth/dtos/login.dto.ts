import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";



export class LoginDto{
@ApiProperty({
        description:"user email",
        example:'Sanaa@example.com'

    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

      @ApiProperty({
        description:"user password",
        example:'password'

    })  
     @IsNotEmpty()
     password:string;

}