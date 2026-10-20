import { Injectable } from "@nestjs/common";
import { PaginatedResult } from "src/common/data-access";
import { UnitReviews } from "../dtos/unit-reviews.dto";
import { UnitReviewsService } from "src/unit-reviews/unit-reviews.service";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindUnitReviewsUsecase{
    constructor(
        private readonly unitReviewsService:UnitReviewsService
    ){}

    async excute(unitId:string,query:PaginationDto):Promise<PaginatedResult<UnitReviews>>{
         
       const result= await this.unitReviewsService.findUnitReviews({unit:unitId,...query})
         
          // return plainToInstance(PaginatedResult<UnitReviews>,result)

       const transformedData= plainToInstance(UnitReviews,result.data,{
          excludeExtraneousValues:true
       })

        return new PaginatedResult<UnitReviews>(
            transformedData,
            result.limit,
            result.totalCount,
            result.pageCount
        )
    }
}