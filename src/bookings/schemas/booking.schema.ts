import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { BookingStatus } from "../enums/BookingStatus.enum";

@Schema({timestamps:true})
export class Booking{
    @Prop({required:true,ref:ModelNames.UNITS})
    unit:string;

     @Prop({required:true,ref:ModelNames.USERS})
    guest:string;

    
     @Prop({required:true,ref:ModelNames.USERS})
    host:string;

    @Prop({required:true,type:Date()})
    checkIn:Date|number;
    
    @Prop({required:true,type:Date()})
    checkOut:Date|number;

    @Prop({required:true})
    daysCount:number;

    
    @Prop({required:true})
    pricePerDay:number;

    
    @Prop({required:true})
    bookingAmount:number;

    
    @Prop({required:true})
    vatAmount:number;
    
    @Prop({required:true})
    // bookingAmount+vatAmount
    totalAmount:number;

    
    @Prop()
    adultsCount?:number;
    
    @Prop()
    kidsCount?:number;

    
    @Prop()
    notes?:string;

    @Prop({type:String,enum:BookingStatus,default:BookingStatus.PENDING})
    status:BookingStatus;

    @Prop()
    cancellationReason?:string;
}

export const BookingSchema=SchemaFactory.createForClass(Booking)