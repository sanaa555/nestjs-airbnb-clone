import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';

@Controller('bookings')
export class BookingsController {
    constructor(
        private readonly BookingsService:BookingsService
    ){}

    @Public()
    @Get('/check-availability')
    async checkAvailability(@Query() query:CheckAvailabilityDto):Promise<AvailabilityResponseDto>{
        return this.BookingsService.checkAvailability(query)
    }
    @Authorize(Roles.USER)
    @Post()
    async createBooking( @Body()body:BookingRequestDto,
                          @CurrentAccount() principale:Principale
    ):Promise< BookingResponseDto>{
         return this.BookingsService.createBooking(body,principale.user)

    }
}
