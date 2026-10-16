import { Injectable } from "@nestjs/common";
import { FindAllBookingsDto } from "../dtos/find-all-bookings.dto";
import { QueryFilter } from "mongoose";
import { Booking } from "../schemas/booking.schema";
import dayjs from "dayjs";
import { sortType } from "src/common/data-access";

@Injectable()
export class FindAllQueryBuilder{
    buildMatchQuery(query:FindAllBookingsDto):QueryFilter<Booking>{
          const matchQuery:QueryFilter<Booking>={}
        if(query?.unit) matchQuery.unit=query.unit
        if(query?.status) matchQuery.status=query.status
       if(query?.checkIn) matchQuery.checkIn={$gte:dayjs(query.checkIn).toDate()}
      if(query?.checkOut) matchQuery.checkOut={$lte:dayjs(query.checkOut).toDate()}
        return matchQuery
      
    }


    buildSortQuery(query:FindAllBookingsDto):QueryFilter<Booking>{
        
      const sortQuery:QueryFilter<Booking>={createdAt:-1}
         sortQuery.createdAt=   query?.sortByCreatedAt===sortType.ASC? 1: -1
        sortQuery.totalAmount=   query?.sortByTotalAmount===sortType.ASC? 1: -1
        return sortQuery

    }
}