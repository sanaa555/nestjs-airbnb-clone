import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CityIdDto {

  @ApiProperty({ description: "City MongoDB ID", example: "507f1f77bcf86cd799439011" })
  @IsNotEmpty()
  @IsMongoId({
    message: 'param must be a valid mongo id'
  })
  id: string;

}