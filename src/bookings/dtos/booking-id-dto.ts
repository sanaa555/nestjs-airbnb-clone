import { IsMongoId, IsNotEmpty } from "class-validator";


export class BookingIdDto{
    @IsNotEmpty()
    @IsMongoId({message:' param must be a valid mongo id '})
    id:string
}