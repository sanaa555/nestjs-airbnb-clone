import { Injectable } from "@nestjs/common";
import { BookingRequestDto } from "../dtos/booking-request.dto";
import {  BookingResponseDto} from "../dtos/booking-response.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { BookingValidationUsecase } from "./booking(availability)-validation.usecase";
import { BookingCalculationUsecase } from "./booking-calculation.usecase";
import { UnitsService } from "src/units/units.service";
import dayjs from "dayjs";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class BookingRequestUsecase{
    constructor(
        
                private readonly bookingValidationUsecase:BookingValidationUsecase,
                private readonly bookingCalculationUsecase:BookingCalculationUsecase,
                private readonly unitsService:UnitsService,
                private readonly bookingRepository:BookingRepository
    ){}

    async excute(body:BookingRequestDto,currentUser:currentUserData):Promise<BookingResponseDto>{
        const unit= await this.unitsService.findById(body.unit)
             if(unit.user=== currentUser._id.toString()) throw new BadRequestException('you cannot book your own unit ')
        //1-validation
           await this.bookingValidationUsecase.excute(body)
        //2-calculation
           
      const bookingCalculation=  await this.bookingCalculationUsecase.excute(body.checkIn,body.checkOut,body.unit)
        //3-save
       body.checkIn=dayjs(body.checkIn).toDate()
       body.checkOut=dayjs(body.checkOut).toDate()

      const bookingRequest= await this.bookingRepository.create({
        ...body,
        guest:currentUser._id.toString(),
        host:unit.user,
        daysCount:bookingCalculation.daysCount,
        pricePerDay:bookingCalculation.pricePerDay,
        bookingAmount:bookingCalculation.bookingAmount,
        vat:bookingCalculation.vat,
        vatAmount:bookingCalculation.vatAmount,
        totalAmount:bookingCalculation.totalAmount,

       })
       //TODO send email notification to the host (unit.user)

       return plainToInstance(BookingResponseDto,bookingRequest.toObject())   
    }
}