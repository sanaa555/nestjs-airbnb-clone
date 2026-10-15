import {  Injectable } from "@nestjs/common";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingParticipantAuthUsecase } from "./booking-participant-auth.usecase";
import { FindOneUsecase } from "./find-one.usecase";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { plainToInstance } from "class-transformer";
import { CancelBy } from "../enums/cancel-by.enum";
import { CancelBookingByGuestDto } from "../dtos/cancel-booking-by-guest.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class CancelBookingByGuestUsecse{
    constructor(
        private readonly bookingRepository :BookingRepository,
        private readonly bookingParticipantAuthUsecase:BookingParticipantAuthUsecase,
        private readonly findOneUsecase:FindOneUsecase
    ){}

    async excute(id:string,body:CancelBookingByGuestDto,user:currentUserData):Promise<BookingResponseDto>{
           //1- check existance of booking
       const booking= await this.findOneUsecase.excute({_id:id})

        //2-validate if the user is the booking guest
         this.bookingParticipantAuthUsecase.checkGuestAuth(booking?.guest.toString(),user._id.toString())
         // 3- check booking to be cancellled not to be cancelled or completed
             if(booking.status=== BookingStatus.CANCELLED || booking.status===BookingStatus.COMPLETED){
                throw new BadRequestException('Booking can not be cancelled')
             }

        //4-cancel booking
     const cancelledBooking=   await this.bookingRepository.findOneAndUpdate(
            {_id:id},
            {
               status:BookingStatus.CANCELLED,
               cancelationReason:body?.cancelationReason,
               cancelationDate: new Date(),
               cancelBy:CancelBy.Guest
            },
            {returnDocument:'after',lean:true}
        )

        return  plainToInstance(BookingResponseDto,cancelledBooking)



    }
}