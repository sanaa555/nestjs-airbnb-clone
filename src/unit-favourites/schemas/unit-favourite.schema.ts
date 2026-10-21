import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";

@Schema({timestamps:true})
export class UnitFavourite{

    @Prop({required:true,ref:ModelNames.UNITS})
    unit:string

    @Prop({required:true,ref:ModelNames.USERS})
    user:string
}

export const UnitFavouriteSchema= SchemaFactory.createForClass(UnitFavourite)