import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingRepository } from './repositories/booking.repository';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { BookingSchema } from './schemas/booking.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.BOOKINGS,
    schema:BookingSchema
  }])],
  providers: [BookingsService,BookingRepository],
  controllers: [BookingsController]
})
export class BookingsModule {}
