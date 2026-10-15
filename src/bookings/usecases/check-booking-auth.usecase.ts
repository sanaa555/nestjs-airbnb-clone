
import { Injectable } from "@nestjs/common";
import { BookingRepository } from "../repositories/booking.repository";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";
import { ForbiddenException } from "src/common/errors-handling/custom-exceptions/forbidden.exception";

@Injectable()

export class CheckBookingAuthUsecase{
    constructor(
                private readonly bookingRepository:BookingRepository
    ){}

    async excute(bookingId:string,userId:string):Promise<void>{
        
        const booking = await this.bookingRepository.findById(bookingId)
        if(!booking) throw new NotFoundException ('Booking bot found')
            if(booking.guest.toString()!==userId.toString() && booking.host.toString() !==userId.toString()){
                throw new ForbiddenException('you are not authorized to access this booking')
            }


    }
}