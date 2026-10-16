import { IsMongoId, IsNotEmpty } from "class-validator";


export class UnitIdDto{
    @IsNotEmpty()
    @IsMongoId({message:' param must be a valid mongo id '})
    id:string
}