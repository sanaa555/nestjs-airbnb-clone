import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUsecase } from './usecases/check-availability.usecase';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { BookingRequestUsecase } from './usecases/booking-request.usecase';
import { currentUserData } from 'src/auth/interfaces/principal.interface';
import { FindAllBookingsUsecase } from './usecases/find-all-bookings.usecase';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindMyBookingUsecase } from './usecases/find-my-booking.usecase';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUsecase:CheckAvailabilityUsecase,
        private readonly bookingRequestUsecase:BookingRequestUsecase,
        private readonly findAllBookingsUsecase:FindAllBookingsUsecase,
        private readonly findMyBookingUsecase:FindMyBookingUsecase
    ){}

    async checkAvailability(query:CheckAvailabilityDto):Promise<AvailabilityResponseDto>{
          return this.checkAvailabilityUsecase.excute(query)
    }
     
    async createBooking(body:BookingRequestDto,currentUser:currentUserData):Promise< BookingResponseDto>{
        return this.bookingRequestUsecase.excute(body,currentUser)

    }
    
    async findAll(query:FindAllBookingsDto):Promise<PaginatedResult< BookingResponseDto>>{
        return this.findAllBookingsUsecase.excute(query)

    }

    
    async findMine(query:FindAllBookingsDto,currentUser:currentUserData):Promise<PaginatedResult< BookingResponseDto>>{
        return this.findMyBookingUsecase.excute(query,currentUser)

    }
}
