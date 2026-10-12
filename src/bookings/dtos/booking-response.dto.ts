import { BookingStatus } from "../enums/BookingStatus.enum";

export class BookingResponseDto{
      
       unit:string;
        guest:string;
        host:string;
        checkIn:Date|number;
        checkOut:Date |number;
        daysCount:number;
        pricePerDay:number;
        bookingAmount:number;
        vatAmount:number;
        totalAmount:number;         // bookingAmount+vatAmount
        adultsCount?:number;
         kidsCount?:number;
        notes?:string;
        status:BookingStatus;
        cancellationReason?:string;
    

}