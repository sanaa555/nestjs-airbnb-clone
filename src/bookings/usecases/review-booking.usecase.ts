import { Injectable, Logger } from "@nestjs/common";
import { GuestReviewDto } from "../dtos/guest-review.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { FindOneUsecase } from "./find-one.usecase";
import { BookingParticipantAuthUsecase } from "./booking-participant-auth.usecase";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { UnitReviewsService } from "src/unit-reviews/unit-reviews.service";
import { UnitsService } from "src/units/units.service";
import { plainToInstance } from "class-transformer";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { BaseCustomException } from "src/common/errors-handling/custom-exceptions/base-custom.exception";

@Injectable()
export class ReviewBookingUseCase {
        private readonly logger= new Logger(ReviewBookingUseCase.name)
    constructor(
        
                private readonly  bookingRepository:BookingRepository,
                 private readonly bookingParticipantAuthUsecase:BookingParticipantAuthUsecase,
                 private readonly findOneUsecase:FindOneUsecase,
                 private readonly unitReviewsService  :UnitReviewsService,
                 private readonly  unitsService:UnitsService,
                 @InjectConnection()
                 private readonly connection:Connection 
    ) { }
    async excute(id:string,body:GuestReviewDto,currentUser:currentUserData):Promise<BookingResponseDto>{
        
    //1-find booking by id
    const booking = await this.findOneUsecase.excute({_id:id})

    //2-check if booking belongs to the user guest
        this.bookingParticipantAuthUsecase.checkGuestAuth( booking?.guest.toString(),currentUser._id.toString())
    //3-Make sure the booking is completed
          if( booking.status !==BookingStatus.COMPLETED){
            throw new BadRequestException('Booking is not completed,you can not submit a review')
          }
    //4- make sure guest has not already reviewed the booking
         if(booking?.guestReview) {
            throw new BadRequestException('guest has already reviewed')
         }
    // start transaction
    
      //start session

      const session = await this.connection.startSession()

      let updatedBooking:any

      try{
          await session.startTransaction()
           // operations
           
    //5-update booking guest review-booking schema - first transaction
    updatedBooking= await this.bookingRepository.findByIdAndUpdate(id,{
        guestReview:body},
    {returnDocument:'after',lean:true,session})
    ///6- add  record at  unit-reviews collection-second transaction

       await this.unitReviewsService.createUnitReview({
        booking:id,
        guest:booking.guest.toString(),
        unit: booking.unit,
        rating:body.rating,
        comment:body.comment
       },session)

      

    
    //7- update the unit schema with rateCount and average rating - third transaction
    // calculate RatingAvg
     const {ratingAvg,ratingCount} =await this.unitReviewsService.CalculateRatingAvg(booking.unit.toString(),session)
       await this.unitsService.updateUnitAvgAndCount({
         unit:  booking.unit.toString(),
         ratingAvg,
         ratingCount
       },session)

          await session.commitTransaction();

      }catch(error){
         
         await session.abortTransaction()
         this.logger.error(error)
         if(error instanceof BaseCustomException) throw error
         throw new BadRequestException('failed to review booking')
      }finally{
         await session.endSession()
      }
    //8- commit transaction

    return plainToInstance(BookingResponseDto,updatedBooking)

    }

}