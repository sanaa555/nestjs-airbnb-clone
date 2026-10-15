import { Injectable } from "@nestjs/common";
import { BookingRepository } from "../repositories/booking.repository";
import { QueryFilter } from "mongoose";
import { Booking } from "../schemas/booking.schema";
import { BookingResponseDto } from "../dtos/booking-response.dto";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneUsecase{
    constructor(
        private readonly bookingRepository:BookingRepository
    ){}

    async excute(query: QueryFilter<Booking>):Promise<BookingResponseDto>{

        const Booking= await this.bookingRepository.findOne(query)
        if( !Booking) throw new NotFoundException('Booking not found')
            return plainToInstance(BookingResponseDto,Booking)
    }
}