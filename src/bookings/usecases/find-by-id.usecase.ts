import { Injectable } from "@nestjs/common";
import { CheckBookingAuthUsecase } from "./check-booking-auth.usecase";
import { BookingRepository } from "../repositories/booking.repository";
import { Principale } from "src/auth/decorators/current-account.decorator";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { plainToInstance } from "class-transformer";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";
@Injectable()
export class FindByIdUsecase{
    constructor(private readonly checkBookingAuthUsecase:CheckBookingAuthUsecase ,
             private readonly bookingRepository:BookingRepository
       ){}
    async excute(bookingId:string,principale:Principale):Promise<BookingResponseDto>{

        await this.checkBookingAuthUsecase.excute(bookingId,principale.user._id);
        const booking= await this.bookingRepository.findById(bookingId,{
            populate:[
            {path:'unit',select:'title'},
             {path:'guest',select:'name phoneNumber'},
             {path:'host',select:'name phoneNumber'}
        ],lean:true
        })
        if (!booking) throw new NotFoundException('Booking not found')
        return plainToInstance(BookingResponseDto,booking)


          
        
    }
}