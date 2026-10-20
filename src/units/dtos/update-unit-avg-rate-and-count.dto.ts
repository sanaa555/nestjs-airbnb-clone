import { IsNotEmpty } from "class-validator";

export class UpdateUnitAvgAndCountDto{
    
    @IsNotEmpty()
    unit:string

    @IsNotEmpty()
    ratingAvg:number;
    
     @IsNotEmpty()
    ratingCount:number
}