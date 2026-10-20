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
     guest:string
     
    // @Expose()
    rating:number;

    // @Expose()
    comment:string
    
    //  @Expose()
    createdAt:Date
}
