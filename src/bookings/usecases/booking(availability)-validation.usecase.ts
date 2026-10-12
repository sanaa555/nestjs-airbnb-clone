import {  Injectable } from "@nestjs/common";
import { UnitsService } from "src/units/units.service";
import { CheckAvailabilityDto } from "../dtos/check-availability.dto";
import dayjs from "dayjs";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class BookingValidationUsecase{
    constructor(
        private readonly  unitsService :UnitsService,
        private readonly bookingRepository:BookingRepository
    ){}

    async excute(query:CheckAvailabilityDto):Promise<void>{

        //1- validate that checkin date not bigger than checkout         
             this.validateDateRange(query)

            // 2-validate capacity
            await  this.validateCapacity(query)

             //3- check unit availability
             //booking for this unit ---checkIn > checkOut for any booking
             //checkIn 25/6  ,checkOut 26/5  -> overlapping
             //checkIn 25/6  ,checkOut 24/5  ->  not overlapping
             // checkOut in db > checkIn  ->overlapping

             await this.validateUnitAvailability(query)
    }

    private validateDateRange(query:CheckAvailabilityDto){

     if  (dayjs(query.checkIn).isAfter ( query.checkOut)) throw new BadRequestException('checkIn date must be before checkOut date')

    }
    private async validateCapacity(query:CheckAvailabilityDto){
        
            const unit = await this.unitsService.findById(query.unit)
            if(query.adultsCount && query.adultsCount > unit.adultsCount) throw new BadRequestException('unit capacity is not enough for adults')
            if(query.kidsCount && query.kidsCount > unit.kidsCount) throw new BadRequestException('unit capacity is not enough for kids')
    }
    private async validateUnitAvailability(query:CheckAvailabilityDto){

        
             const overlappingBookings= await this.bookingRepository.find({
                unit:query.unit,
                status:{$in:[BookingStatus.PENDING,BookingStatus.CONFIRMED]},
                checkIn:{$lte:query.checkOut},
                checkOut:{$gte:query.checkIn}
             })

             if(overlappingBookings.length>0) throw new BadRequestException('Unit is not available for the selected dates')

    }
}