import { Injectable } from "@nestjs/common";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { UpdateBookingRequestDto } from "../dtos/update-booking-request.dto";
import { BookingRepository } from "../repositories/booking.repository";
import { ForbiddenException } from "src/common/errors-handling/custom-exceptions/forbidden.exception";
import { BookingValidationUsecase } from "./booking(availability)-validation.usecase";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";
import dayjs from "dayjs";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UpdateBookingByGuest{
    constructor(
        private readonly bookingRepository:BookingRepository,
        private readonly bookingValidationUsecase:BookingValidationUsecase
    ){}

    async excute(id:string,body:UpdateBookingRequestDto,currentUser:currentUserData):Promise<BookingResponseDto>{
       //1-find booking
       const booking= await this.bookingRepository.findById(id)
       if(!booking) throw new NotFoundException('booking not found')
       //2-validate if the user is the booking guest
       if(booking?.guest.toString() !== currentUser._id.toString()){
        throw new ForbiddenException('you are not authorized to update this booking')
       }

       //3-if the guest want to update check-in and check-out,check availability
       if(body?.checkIn && !body?.checkOut) throw new BadRequestException('check-out date is required')
         if(body?.checkOut && !body?.checkIn) throw new BadRequestException('check-in date is required')

        if(body?.checkIn && body?.checkOut){
            
             body.checkIn=dayjs(body.checkIn).toDate()
            body.checkOut=dayjs(body.checkOut).toDate()
            this.bookingValidationUsecase.validateDateRange(body.checkIn,body.checkOut)
            await this.bookingValidationUsecase.validateUnitAvailability(booking.unit.toString(),body.checkIn,body.checkOut,id)
        }
          //4- if the guest want to update adultsCount and kidsCount ,check availability
          if(body?.adultsCount ){
            await this.bookingValidationUsecase.validateCapacity(booking.unit.toString(),body?.adultsCount)
          } else{
            await this.bookingValidationUsecase.validateCapacity(booking.unit.toString(),body?.kidsCount)
          }

          //5- update booking
       const updatedBooking=   await this.bookingRepository.findByIdAndUpdate(id,{
            $set:body
          },{
            returnDocument:'after',
            lean:true
          })

          return plainToInstance(BookingResponseDto,updatedBooking)

         
    }
}