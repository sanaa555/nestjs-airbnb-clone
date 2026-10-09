import { IsMongoId, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";

export class FindAllDto extends PaginationDto {

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsMongoId()
    country: string;

    @IsOptional()
    @IsMongoId()
    city: string;
}