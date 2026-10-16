import { Injectable } from "@nestjs/common";
import { AvailabilityResponseDto } from "../dtos/availability-response.dto";
import { CheckAvailabilityDto } from "../dtos/check-availability.dto";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingValidationUsecase } from "./booking(availability)-validation.usecase";
import { BookingCalculationUsecase } from "./booking-calculation.usecase";

@Injectable()
export class CheckAvailabilityUsecase{
    constructor(
        private readonly bookingRepository :BookingRepository,
        private readonly bookingValidationUsecase:BookingValidationUsecase,
        private readonly bookingCalculationUsecase:BookingCalculationUsecase
    ){}


    async excute(query:CheckAvailabilityDto):Promise<AvailabilityResponseDto>{
        // usecase for validation(checkin,checkout)
          
        await this.bookingValidationUsecase.excute(query)

        // usecase for calculate booking total amount
         
      const bookingCalculation= await this.bookingCalculationUsecase.excute(query.checkIn,query.checkOut,query.unit)
        // current usecase responsible for check availability
          return{
            available:true,
            ...bookingCalculation
          }
    }

    
}