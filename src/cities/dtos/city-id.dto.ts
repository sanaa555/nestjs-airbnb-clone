import { IsMongoId, IsNotEmpty } from "class-validator";

export class CityIdDto {

  @IsNotEmpty()
  @IsMongoId({
    message: 'param must be a valid mongo id'
  })
  id: string;

}