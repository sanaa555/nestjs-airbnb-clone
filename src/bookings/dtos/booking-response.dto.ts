import { BookingStatus } from "../enums/BookingStatus.enum";
import { GuestReview } from "../schemas/subdocument/guest-review.schema";

export class BookingResponseDto{
        _id:string;
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
        guestReview?:GuestReview
        
    

}