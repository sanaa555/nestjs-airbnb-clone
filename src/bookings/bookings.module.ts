import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingRepository } from './repositories/booking.repository';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { BookingSchema } from './schemas/booking.schema';
import { UnitsModule } from 'src/units/units.module';
import { BookingValidationUsecase } from './usecases/booking(availability)-validation.usecase';
import { BookingCalculationUsecase } from './usecases/booking-calculation.usecase';
import { CheckAvailabilityUsecase } from './usecases/check-availability.usecase';
import { AppSettingsModule } from 'src/app-settings/app-settings.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.BOOKINGS,
    schema:BookingSchema
  }]),UnitsModule,AppSettingsModule],
  providers: [BookingsService,BookingRepository,BookingValidationUsecase,BookingCalculationUsecase,CheckAvailabilityUsecase],
  controllers: [BookingsController]
})
export class BookingsModule {}
