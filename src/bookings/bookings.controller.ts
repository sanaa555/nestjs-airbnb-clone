import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { BookingIdDto } from './dtos/booking-id-dto'
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
import { CancelBookingByGuestDto } from './dtos/cancel-booking-by-guest.dto';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';

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

        @Authorize(Roles.SYETEM_ADMIN)
        @Get()
        async findAll(@Query() query:FindAllBookingsDto):Promise<PaginatedResult< BookingResponseDto>>{
            return this.BookingsService.findAll(query)

        }

        @Authorize(Roles.USER)
        @Get('/me')
        async findMine(@Query() query:FindAllBookingsDto,@CurrentAccount() principale:Principale):Promise<PaginatedResult< BookingResponseDto>>{
            return this.BookingsService.findMine(query,principale.user)

        }

        @Get('/:id')
        async findById(@Param()  param:BookingIdDto,@CurrentAccount() principale:Principale):Promise<BookingResponseDto>{
            return this.BookingsService.findById(param.id,principale)
        }
        @Authorize(Roles.USER)
        @Patch('/:id')
        async updateByGuest(
            @Param() param:BookingIdDto,
             @Body() body :UpdateBookingRequestDto,
             @CurrentAccount() principale :Principale
        ):Promise<BookingResponseDto>{

              return this.BookingsService.updateByGuest(param.id,body,principale.user)
        }

        @Authorize(Roles.USER)
        @Patch('/:id/cancel')
        async cancelByGuest(
            @Param() param:BookingIdDto,
             @Body() body :CancelBookingByGuestDto,
             @CurrentAccount() principale :Principale
        ):Promise<BookingResponseDto>{

              return this.BookingsService.cancelByGuest(param.id,body,principale.user)
        }

        @Authorize(Roles.USER)
        @Patch('/:id/status')
        async changeStatusByHost(
            @Param() param:BookingIdDto,
             @Body() body :ChangeBookingStatusDto,
             @CurrentAccount() principale :Principale
        ):Promise<BookingResponseDto>{

              return this.BookingsService.changeStatusByHost(param.id,body,principale.user)
        }

}
