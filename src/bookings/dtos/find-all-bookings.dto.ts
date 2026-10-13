import { IsEnum, IsOptional } from "class-validator";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";
import { sortType } from "src/common/data-access";

export class FindAllBookingsDto extends PaginationDto{
     @IsOptional()
     @IsEnum(BookingStatus)
    status?:BookingStatus
    
    @IsOptional()
    unit?:string
    
     @IsOptional()
    checkIn?:Date|number
     
    @IsOptional()
    checkOut?:Date|number

    @IsOptional()
    @IsEnum(sortType)
    sortByCreatedAt?:sortType

    
    @IsOptional()
    @IsEnum(sortType)
    sortByTotalAmount?:sortType

    @IsOptional()
    userType:'host'| 'guest'
}