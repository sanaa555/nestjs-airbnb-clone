import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUsecase } from './usecases/check-availability.usecase';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { BookingRequestUsecase } from './usecases/booking-request.usecase';
import { currentUserData } from 'src/auth/interfaces/principal.interface';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUsecase:CheckAvailabilityUsecase,
        private readonly bookingRequestUsecase:BookingRequestUsecase
    ){}

    async checkAvailability(query:CheckAvailabilityDto):Promise<AvailabilityResponseDto>{
          return this.checkAvailabilityUsecase.excute(query)
    }
     
    async createBooking(body:BookingRequestDto,currentUser:currentUserData):Promise< BookingResponseDto>{
        return this.bookingRequestUsecase.excute(body,currentUser)

    }
}
