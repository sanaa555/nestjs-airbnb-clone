import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Injectable } from "@nestjs/common";
import { Booking } from "../schemas/booking.schema";

@Injectable()
export class BookingRepository extends BaseRepository<Booking>{
    constructor(
        @InjectModel(ModelNames.BOOKINGS)
        private readonly bookingModel:Model<HydratedDocument<Booking>>
    ){
        super(bookingModel)
    }

}