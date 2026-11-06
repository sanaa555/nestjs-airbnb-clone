import { Expose } from "class-transformer";

export class UnitFavouriteResponseDto{
   @Expose()
    _id:string
    @Expose()
    title:string;
    @Expose()
    description:string;
    @Expose()
    costPerDay:number;
    @Expose()
    photos:string[];
}