import { Controller, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';

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
}
