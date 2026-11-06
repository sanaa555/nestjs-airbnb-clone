import { Prop, Schema } from "@nestjs/mongoose"
import { Max, MaxLength, MinLength } from "class-validator"

@Schema()
export class GuestReview{
    @Prop({Min:1,Max:12})
    rating:number

    @Prop({MinLength:5,MaxLength:1000})
    comment?:string


}