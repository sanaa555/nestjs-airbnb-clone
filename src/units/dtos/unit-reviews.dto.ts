import { ApiProperty } from "@nestjs/swagger";

// import { Expose, Type } from "class-transformer";
// export class GuestReviewResponseDto{

//      @Expose()
//     _id:string;
//     @Expose()
//     name:string
// }
export class UnitReviews{
    // @Expose()
    // @Type(()=>GuestReviewResponseDto)
    // guest:GuestReviewResponseDto;
    @ApiProperty({ description: 'Guest name', example: 'Alex Morgan' })
     guest:string
     
    // @Expose()
    @ApiProperty({ description: 'Guest rating for the unit', example: 5 })
    rating:number;

    // @Expose()
    @ApiProperty({ description: 'Guest review text', example: 'Clean and comfortable stay.' })
    comment:string
    
    //  @Expose()
    @ApiProperty({
        description: 'Review creation date',
        type: String,
        format: 'date-time',
        example: '2025-01-15T10:30:00.000Z',
    })
    createdAt:Date
}
