import { IsMongoId, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";

export class FindAllDto extends PaginationDto {

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'Case-insensitive title search',
        example: 'apartment',
    })
    title: string;

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({
        description: 'Filter by country MongoDB ID',
        example: '64a1f2e3b4c5d6e7f8a9b0c1',
    })
    country: string;

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({
        description: 'Filter by city MongoDB ID',
        example: '64a1f2e3b4c5d6e7f8a9b0c2',
    })
    city: string;
}