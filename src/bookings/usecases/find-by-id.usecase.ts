import { Injectable } from "@nestjs/common";
import { CheckBookingAuthUsecase } from "./check-booking-auth.usecase";
import { BookingRepository } from "../repositories/booking.repository";
import { Principale } from "src/auth/decorators/current-account.decorator";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { Roles } from "src/common/constants";
import { plainToInstance } from "class-transformer";
@Injectable()
export class FindByIdUsecase{
    constructor(private readonly checkBookingAuthUsecase:CheckBookingAuthUsecase ,
             private readonly bookingRepository:BookingRepository
       ){}
    async excute(bookingId:string,principale:Principale):Promise<BookingResponseDto>{

        // Check if the role is admin or the user is the owner of the booking
        // booking guest id ===principale.user._id or host id === principale.user._id
        if(principale.role===Roles.USER){
        await this.checkBookingAuthUsecase.excute(bookingId,principale.user._id);
        }
        const booking= await this.bookingRepository.findById(bookingId,{
            populate:[
            {path:'unit',select:'title'},
             {path:'guest',select:'name phoneNumber'},
             {path:'host',select:'name phoneNumber'}
        ],lean:true
        })
        return plainToInstance(BookingResponseDto,booking)


          
        
    }
}