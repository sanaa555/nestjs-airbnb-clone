import {  Injectable } from "@nestjs/common";
import { UnitsService } from "src/units/units.service";
import { CheckAvailabilityDto } from "../dtos/check-availability.dto";
import dayjs from "dayjs";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { BookingRequestDto } from "../dtos/booking-request.dto";

@Injectable()
export class BookingValidationUsecase{
    constructor(
        private readonly  unitsService :UnitsService,
        private readonly bookingRepository:BookingRepository
    ){}

    async excute(body:CheckAvailabilityDto|BookingRequestDto):Promise<void>{
           //body=>(body,query)
        //1- validate that checkin date not bigger than checkout         
             this.validateDateRange(body)

            // 2-validate capacity
            await  this.validateCapacity(body)

             //3- check unit availability
             //booking for this unit ---checkIn > checkOut for any booking
             //checkIn 25/6  ,checkOut 26/5  -> overlapping
             //checkIn 25/6  ,checkOut 24/5  ->  not overlapping
             // checkOut in db > checkIn  ->overlapping

             await this.validateUnitAvailability(body)
              
    }

    private validateDateRange(body:CheckAvailabilityDto){

     if  (dayjs(body.checkIn).isAfter ( body.checkOut)) throw new BadRequestException('checkIn date must be before checkOut date')

    }
    private async validateCapacity(body:CheckAvailabilityDto){
        
            const unit = await this.unitsService.findById(body.unit)
            if(body.adultsCount && body.adultsCount > unit.adultsCount) throw new BadRequestException('unit capacity is not enough for adults')
            if(body.kidsCount && body.kidsCount > unit.kidsCount) throw new BadRequestException('unit capacity is not enough for kids')
    }
    private async validateUnitAvailability(body:CheckAvailabilityDto){

        
             const overlappingBookings= await this.bookingRepository.find({
                unit:body.unit,
                status:{$in:[BookingStatus.PENDING,BookingStatus.CONFIRMED]},
                checkIn:{$lte:body.checkOut},
                checkOut:{$gte:body.checkIn}
             })

             if(overlappingBookings.length>0) throw new BadRequestException('Unit is not available for the selected dates')

    }
}