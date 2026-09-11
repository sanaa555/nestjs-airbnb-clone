import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})
export class Currency{


    @Prop({required:true})
    name:string;

    @Prop({default:''})
    cuurrencyCode:string;

      @Prop({default:false})
     isDeleted:boolean;

     @Prop()
     deletedAt:Date;

}

export const  CurrencySchema=  SchemaFactory.createForClass(Currency)
