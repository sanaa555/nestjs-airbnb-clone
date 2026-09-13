import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CountryIdDto {

  @ApiProperty({ description: "Country MongoDB ID", example: "507f1f77bcf86cd799439011" })
  @IsNotEmpty()
  @IsMongoId({message:'param mmust be a valid mongo id'})
  id: string;


}
