import { Injectable } from "@nestjs/common";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { ChangeBookingStatusDto } from "../dtos/change-booking-status.dto";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingParticipantAuthUsecase } from "./booking-participant-auth.usecase";
import { FindOneUsecase } from "./find-one.usecase";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { CancelBy } from "../enums/cancel-by.enum";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ChangeBookingStatusByHost{
    constructor(
        private readonly  bookingRepository:BookingRepository,
         private readonly bookingParticipantAuthUsecase:BookingParticipantAuthUsecase,
                private readonly findOneUsecase:FindOneUsecase

    ){}

    async excute(id:string,body:ChangeBookingStatusDto,currentUser:currentUserData):Promise<BookingResponseDto>{
         let updatedBooking:any={}
        //1- check if booking exist

        const bookingToUpdate= await this.findOneUsecase.excute({_id:id})
        //2-check if the user is the host of booking
        this.bookingParticipantAuthUsecase.checkHostAuth(bookingToUpdate?.host.toString(),currentUser._id.toString())

        //3-if the host want approve booking,makesure booking not approved,set approved
           if(body.status===BookingStatus.CONFIRMED && bookingToUpdate?.status===BookingStatus.CONFIRMED) {
            throw new BadRequestException('booking already approved')
           }

        //4-if the host want cancel booking,makesure booking not cancelled,set cancelled
        if(body.status===BookingStatus.CANCELLED  ){
            if(bookingToUpdate?.status===BookingStatus.CANCELLED ){
                throw new BadRequestException('booking already cancelled')
            }
           updatedBooking= await this.bookingRepository.findByIdAndUpdate(id,{
                status:BookingStatus.CANCELLED,
                cancelationReason:body?.cancelationReason,
                cancelationDate:new Date(),
                cancelBy:CancelBy.HOSE

            },{
            returnDocument:"after",
            lean:true
        })
        }

         updatedBooking=  await this.bookingRepository.findByIdAndUpdate(id,{
            status:body.status
        },{
            returnDocument:"after",
            lean:true
        })

        return plainToInstance(BookingResponseDto,updatedBooking)










    }
}