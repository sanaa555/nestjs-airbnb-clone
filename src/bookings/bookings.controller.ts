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
import { GuestReviewDto } from './dtos/guest-review.dto';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { API_TAGS } from 'src/common/swagger/constant';
import { CheckAvailabilitySwagger } from './swagger/checkAvailability.swagger';
import { CreateBookingSwagger } from './swagger/createBooking.swagger';
import { FindAllSwagger } from './swagger/findAll.swagger';
import { FindMineSwagger } from './swagger/findMine.swagger';
import { FindByIdSwagger } from './swagger/findById.swagger';
import { UpdateByGuestSwagger } from './swagger/updateByGuest.swagger';
import { CancelByGuestSwagger } from './swagger/cancelByGuest.swagger';
import { ChangeStatusByHostSwagger } from './swagger/changeStatusByHost.swagger';
import { ReviewBookingSwagger } from './swagger/reviewBooking.swagger';

@Controller('bookings')
@ApiTags(API_TAGS.BOOKINGS)

export class BookingsController {
    constructor(
        private readonly BookingsService:BookingsService
    ){}

    @Public()
    @Get('/check-availability')
    @CheckAvailabilitySwagger()
    async checkAvailability(@Query() query:CheckAvailabilityDto):Promise<AvailabilityResponseDto>{
        return this.BookingsService.checkAvailability(query)
    }
    @Authorize(Roles.USER)
    @Post()
    @CreateBookingSwagger()
    async createBooking( @Body()body:BookingRequestDto,
                          @CurrentAccount() principale:Principale
    ):Promise< BookingResponseDto>{
         return this.BookingsService.createBooking(body,principale.user)

    }

        @Authorize(Roles.SYETEM_ADMIN)
        @Get()
        @FindAllSwagger()
        async findAll(@Query() query:FindAllBookingsDto):Promise<PaginatedResult< BookingResponseDto>>{
            return this.BookingsService.findAll(query)

        }

        @Authorize(Roles.USER)
        @Get('/me')
        @FindMineSwagger()
        async findMine(@Query() query:FindAllBookingsDto,@CurrentAccount() principale:Principale):Promise<PaginatedResult< BookingResponseDto>>{
            return this.BookingsService.findMine(query,principale.user)

        }

        @Get('/:id')
        @FindByIdSwagger()
        async findById(@Param()  param:BookingIdDto,@CurrentAccount() principale:Principale):Promise<BookingResponseDto>{
            return this.BookingsService.findById(param.id,principale)
        }
        @Authorize(Roles.USER)
        @Patch('/:id')
        @UpdateByGuestSwagger()
        async updateByGuest(
            @Param() param:BookingIdDto,
             @Body() body :UpdateBookingRequestDto,
             @CurrentAccount() principale :Principale
        ):Promise<BookingResponseDto>{

              return this.BookingsService.updateByGuest(param.id,body,principale.user)
        }

        @Authorize(Roles.USER)
        @Patch('/:id/cancel')
        @CancelByGuestSwagger()
        async cancelByGuest(
            @Param() param:BookingIdDto,
             @Body() body :CancelBookingByGuestDto,
             @CurrentAccount() principale :Principale
        ):Promise<BookingResponseDto>{

              return this.BookingsService.cancelByGuest(param.id,body,principale.user)
        }

        @Authorize(Roles.USER)
        @Patch('/:id/status')
        @ChangeStatusByHostSwagger()
        async changeStatusByHost(
            @Param() param:BookingIdDto,
             @Body() body :ChangeBookingStatusDto,
             @CurrentAccount() principale :Principale
        ):Promise<BookingResponseDto>{

              return this.BookingsService.changeStatusByHost(param.id,body,principale.user)
        }

    @Authorize(Roles.USER)
    @Patch('/:id/submit-review')
    @ReviewBookingSwagger()
    async reviewBooking(
        @Param() param:BookingIdDto,
         @Body() body :GuestReviewDto,
        @CurrentAccount() principale :Principale

    ):Promise<BookingResponseDto>{
      return this.BookingsService.reviewBooking(param.id,body,principale.user)
    }


}
