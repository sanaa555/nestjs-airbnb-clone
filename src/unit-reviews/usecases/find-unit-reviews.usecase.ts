import { Injectable } from "@nestjs/common";
import { PaginatedResult } from "src/common/data-access";
import { UnitReviewsRepository } from "../repositories/unit-reviews.repository";
import { findUnitReviewDto } from "../dtos/find-unit-reviews.dto";
import { plainToInstance } from "class-transformer";
import { FindUnitReviewsResponseDto } from "../dtos/find-unit-reviews-response.dto";

@Injectable()
export class FindUnitReviewsUsecase{
    constructor(private readonly unitReviewsRepository :UnitReviewsRepository){}
    async excute(query:findUnitReviewDto):Promise<PaginatedResult<FindUnitReviewsResponseDto>>{
          
    const result= await this.unitReviewsRepository.findPaginated({
            unit:query.unit
        },{
            page:query?.page,
            limit:query?.limit,
            ignoreLimit:query?.ignoreLimit,
            lean:true,
            populate:[{path:'guest' , select:'name'}]
        })


        return plainToInstance(PaginatedResult<FindUnitReviewsResponseDto>,result)

    }
}