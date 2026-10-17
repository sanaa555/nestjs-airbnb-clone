import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { PaymentStatus } from "../enums/payment-status.enum";


@Schema({timestamps:true})
export class Payment{

 @Prop({required:true,ref:ModelNames.BOOKINGS})
 booking:string;

 
 @Prop({required:true,ref:ModelNames.USERS})
 guest:string;

 
 @Prop({required:true,})
 amount:number;

 
 @Prop({required:true,default:'EGP'})
 currency:string;

 
 @Prop({required:true,enum:PaymentStatus,default:PaymentStatus.PENDING})
 status:PaymentStatus;
  

 //This is the transaction number at the payment gateway, not the card number
   @Prop()
   providerPaymentId?: string;
   
   @Prop()
   paiedAt?:Date
   
    @Prop()
    refundedAt?: Date;
}

  export const PaymentSchema= SchemaFactory.createForClass(Payment)