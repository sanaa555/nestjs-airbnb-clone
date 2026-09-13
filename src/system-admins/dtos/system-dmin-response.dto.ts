

import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class SystemAdminResponseDto{
   
    @ApiProperty({ example: "507f1f77bcf86cd799439011" })
    _id:string;
    @ApiProperty({ example: "Admin User" })
    name:string;

    @ApiProperty({ example: "admin@example.com" })
    email:string;
    
    @ApiHideProperty()
    password:string;

    @ApiProperty({ example: true })
    isSuperAdmin: boolean;


}