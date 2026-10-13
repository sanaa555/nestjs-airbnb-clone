import { Injectable } from "@nestjs/common";
import { BookingRepository } from "../repositories/booking.repository";
import { FindAllBookingsDto } from "../dtos/find-all-bookings.dto";
import { PaginatedResult} from "src/common/data-access";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { plainToInstance } from "class-transformer";
import { FindAllQueryBuilder } from "../query-builder/find-all-query-builder";
import { currentUserData } from "src/auth/interfaces/principal.interface";

@Injectable()
export class FindMyBookingUsecase{
    constructor(
        private readonly bookingRepository :BookingRepository,
        private readonly findAllQueryBuilder:FindAllQueryBuilder
    ){}
    async excute(query:FindAllBookingsDto,currentUser:currentUserData):Promise<PaginatedResult<BookingResponseDto>>{
         const matchQuery= this.findAllQueryBuilder.buildMatchQuery(query)
         const sortQuery= this.findAllQueryBuilder.buildSortQuery(query)
          if(query?.userType==='guest'){
            matchQuery.guest=currentUser._id.toString()
          }else if( query?.userType==='host'){
            matchQuery.host=currentUser._id.toString()
          }else{
            matchQuery.$or=[
            {guest:currentUser._id.toString()},
             {host:currentUser._id.toString()}
         ]}

         

     const results= await this.bookingRepository.findPaginated(matchQuery,{
        page:query?.page,
        limit:query?.limit,
        ignoreLimit:query?.ignoreLimit,
        sort:sortQuery,
        lean:true,
        populate:[
            {path:'unit',select:'title'},
             {path:'guest',select:'name phoneNumber'},
             {path:'host',select:'name phoneNumber'}
        ]})
         
     return plainToInstance(PaginatedResult<BookingResponseDto>,results)


    }
}