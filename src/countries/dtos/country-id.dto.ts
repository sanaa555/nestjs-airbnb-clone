import { IsMongoId, IsNotEmpty } from "class-validator";

export class CountryIdDto {

  @IsNotEmpty()
  @IsMongoId({message:'param mmust be a valid mongo id'})
  id: string;


}
