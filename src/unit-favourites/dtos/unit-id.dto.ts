import { IsMongoId, IsNotEmpty } from "class-validator";

export class UnitIdDto {

  @IsNotEmpty()
  @IsMongoId({message:'param mmust be a valid mongo id'})
  unitId: string;


}
