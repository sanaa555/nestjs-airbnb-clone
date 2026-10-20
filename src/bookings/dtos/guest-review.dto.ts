import { Prop } from "@nestjs/mongoose"
import { IsNotEmpty, IsOptional, Max, MaxLength, Min, MinLength } from "class-validator"

export class GuestReviewDto{
     

    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating:number
     
    @MinLength(5)
    @MaxLength(1000)
    @IsOptional()
    comment?:string
}