import { IsNotEmpty, IsOptional, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateUnitReviewDto{

    @IsNotEmpty()
    booking:string

    
    @IsNotEmpty()
    guest:string

    
    @IsNotEmpty()
    unit:string
     

    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating:number
     
    @MinLength(5)
    @MaxLength(1000)
    @IsOptional()
    comment?:string
}