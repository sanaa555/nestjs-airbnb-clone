
export class AvailabilityResponseDto{

    available:Boolean;

    daysCount:number;

    pricePerDay:number;

    bookingAmount:number; // price per day * daysCount

    vatAmount:number;   //bookingAmount  *   Vate rate

    totalAmount:number; // vateAmount + bookingAmount

}