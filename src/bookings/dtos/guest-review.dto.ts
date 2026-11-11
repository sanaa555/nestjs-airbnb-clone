import {
    IsNotEmpty,
    IsOptional,
    Max,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GuestReviewDto {
    @ApiProperty({
        description: 'Rating for the completed booking.',
        type: Number,
        minimum: 1,
        maximum: 5,
        example: 5,
    })
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating: number;

    @ApiPropertyOptional({
        description: 'Optional review comment.',
        minLength: 5,
        maxLength: 1000,
        example: 'A wonderful stay. The place was clean and comfortable.',
    })
    @MinLength(5)
    @MaxLength(1000)
    @IsOptional()
    comment?: string;
}