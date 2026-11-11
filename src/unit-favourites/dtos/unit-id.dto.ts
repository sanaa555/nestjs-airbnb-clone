import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UnitIdDto {

  @ApiProperty({
    description: 'Unit MongoDB ID used to manage a favourite.',
    example: '64a1f2e3b4c5d6e7f8a9b0c1',
  })
  @IsNotEmpty()
  @IsMongoId({message:'param mmust be a valid mongo id'})
  unitId: string;


}
