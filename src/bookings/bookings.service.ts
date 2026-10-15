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
import { FindByIdUsecase } from './usecases/find-by-id.usecase';
import { Principale } from 'src/auth/decorators/current-account.decorator';
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
import { UpdateBookingByGuest } from './usecases/update-booking-by-guest.usecase';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUsecase:CheckAvailabilityUsecase,
        private readonly bookingRequestUsecase:BookingRequestUsecase,
        private readonly findAllBookingsUsecase:FindAllBookingsUsecase,
        private readonly findMyBookingUsecase:FindMyBookingUsecase,
        private readonly findByIdUsecase:FindByIdUsecase,
        private readonly updateBookingByGuest:UpdateBookingByGuest
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

    async findById(bookingId:string,principale:Principale):Promise<BookingResponseDto>{
         return this.findByIdUsecase.excute(bookingId,principale)
    }
    async updateByGuest(id:string,body:UpdateBookingRequestDto,currentUser:currentUserData):Promise<BookingResponseDto>{
         return this.updateBookingByGuest.excute(id,body,currentUser)

    }
}
