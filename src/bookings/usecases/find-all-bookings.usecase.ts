import { Injectable } from "@nestjs/common";
import { BookingRepository } from "../repositories/booking.repository";
import { FindAllBookingsDto } from "../dtos/find-all-bookings.dto";
import { PaginatedResult} from "src/common/data-access";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { plainToInstance } from "class-transformer";
import { FindAllQueryBuilder } from "../query-builder/find-all-query-builder";

@Injectable()
export class FindAllBookingsUsecase{
    constructor(
        private readonly bookingRepository :BookingRepository,
        private readonly findAllQueryBuilder:FindAllQueryBuilder
    ){}
    async excute(query:FindAllBookingsDto):Promise<PaginatedResult<BookingResponseDto>>{
         const matchQuery= this.findAllQueryBuilder.buildMatchQuery(query)
         const sortQuery= this.findAllQueryBuilder.buildSortQuery(query)
    //     const matchQuery:QueryFilter<Booking>={}
    //     if(query?.unit) matchQuery.unit=query.unit
    //     if(query?.status) matchQuery.status=query.status
    //    if(query?.checkIn) matchQuery.checkIn={$gte:dayjs(query.checkIn).toDate()}
    //   if(query?.checkOut) matchQuery.checkOut={$lte:dayjs(query.checkOut).toDate()}

    //   const sortQuery:QueryFilter<Booking>={createdAt:-1}
    //      sortQuery.createdAt=   query?.sortByCreatedAt===sortType.ASC? 1: -1
    //     sortQuery.totalAmount=   query?.sortByTotalAmount===sortType.ASC? 1: -1


     const results= await this.bookingRepository.findPaginated(matchQuery,{
        page:query?.page,
        limit:query?.limit,
        ignoreLimit:query?.ignoreLimit,
        sort:sortQuery,
        populate:[
            {path:'unit',select:'title'},
             {path:'guest',select:'name phoneNumber'},
             {path:'host',select:'name phoneNumber'}
        ],
        lean:true
        })
         
     return plainToInstance(PaginatedResult<BookingResponseDto>,results)



    }
}