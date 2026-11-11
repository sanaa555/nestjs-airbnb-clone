import { IsEnum, IsIn, IsOptional } from "class-validator";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";
import { sortType } from "src/common/data-access";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindAllBookingsDto extends PaginationDto{
     @IsOptional()
      @IsEnum(BookingStatus, {
          message: 'Invalid status. Use PENDING, CONFIRMED, DECLINED, CANCELLED, or COMPLETED.',
      })
    @ApiPropertyOptional({ description: 'Filter by booking status', enum: BookingStatus, example: BookingStatus.PENDING })
    status?:BookingStatus
    
    @IsOptional()
    @ApiPropertyOptional({ description: 'Filter by unit MongoDB ID', example: '64a1f2e3b4c5d6e7f8a9b0c1' })
    unit?:string
    
     @IsOptional()
    @ApiPropertyOptional({
        description: 'Include bookings with check-in on or after this date',
        type: String,
        format: 'date-time',
        example: '2026-12-10T00:00:00.000Z',
    })
    checkIn?:Date|number
     
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Include bookings with check-out on or before this date',
        type: String,
        format: 'date-time',
        example: '2026-12-15T00:00:00.000Z',
    })
    checkOut?:Date|number

    @IsOptional()
    @IsEnum(sortType, { message: 'Invalid sortByCreatedAt. Use asc or desc.' })
    @ApiPropertyOptional({ description: 'Sort creation date ascending or descending', enum: sortType, example: sortType.DESC })
    sortByCreatedAt?:sortType

    
    @IsOptional()
    @IsEnum(sortType, { message: 'Invalid sortByTotalAmount. Use asc or desc.' })
    @ApiPropertyOptional({ description: 'Sort total amount ascending or descending', enum: sortType, example: sortType.DESC })
    sortByTotalAmount?:sortType

    @IsOptional()
    @IsIn(['host', 'guest'], { message: 'userType must be host or guest.' })
    @ApiPropertyOptional({
        description: 'Filter by your role in the booking. Omit to include both roles.',
        enum: ['host', 'guest'],
        example: 'guest',
    })
    userType:'host'| 'guest'
}