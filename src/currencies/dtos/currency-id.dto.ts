import { IsMongoId, IsNotEmpty } from "class-validator";


export class CurrencyIdDto{

    @IsNotEmpty()
    @IsMongoId({message:'paaram must be a valid mongo id'})
    id:string
}