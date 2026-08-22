import { ApiProperty } from "@nestjs/swagger";



export class AuthResponseDto{
    @ApiProperty({
            description:"access Token",
            example:'qwertyuiopasddddddd..'
    
        })
    acessToken:string;

    @ApiProperty({
        description:"refresh token",
        example:'asdfghjklzxcvbnmfmfk...'

    })
    refreshToken:string


}