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
             this.validateDateRange(body.checkIn,body.checkOut)

            // 2-validate capacity
            await  this.validateCapacity(body.unit,body?.adultsCount,body?.kidsCount)

             //3- check unit availability
             //booking for this unit ---checkIn > checkOut for any booking
             //checkIn 25/6  ,checkOut 26/5  -> overlapping
             //checkIn 25/6  ,checkOut 24/5  ->  not overlapping
             // checkOut in db > checkIn  ->overlapping

             await this.validateUnitAvailability(body.unit,body.checkIn,body.checkOut)
              
    }

     validateDateRange(checkIn:Date|number,checkOut:Date|number){

     if  (dayjs(checkIn).isAfter (checkOut)) throw new BadRequestException('checkIn date must be before checkOut date')

    }
     async validateCapacity(unitId:string,adultsCount?:number,kidsCount?:number){
        
            const unit = await this.unitsService.findById(unitId)
            if(adultsCount && adultsCount > unit.adultsCount) throw new BadRequestException('unit capacity is not enough for adults')
            if(kidsCount && kidsCount > unit.kidsCount) throw new BadRequestException('unit capacity is not enough for kids')
    }
     async validateUnitAvailability(unit:string,checkIn:Date|number,checkOut:Date|number, bookingId?: string,
){

        
             const overlappingBookings= await this.bookingRepository.find({
                unit:unit,
                status:{$in:[BookingStatus.PENDING,BookingStatus.CONFIRMED]},
                checkIn:{$lte:checkOut},
                checkOut:{$gte:checkIn},
            ...(bookingId && { _id: { $ne: bookingId } }),

             })

             if(overlappingBookings.length>0) throw new BadRequestException('Unit is not available for the selected dates')

    }
}