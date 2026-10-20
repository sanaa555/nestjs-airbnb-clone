import { Injectable } from '@nestjs/common';
import { CreateUnitReviewUsecase } from './usecases/create-unit-review.usecase';
import { CalculateRatingAvgUsecase } from './usecases/calculate-rating-avg.usecase';
import { CalculateRatingAvgAndCountDto } from './dtos/calculate-rating-avg-and-count.dto';
import { CreateUnitReviewDto } from './dtos/create-unit-review.dto';
import { ClientSession } from 'mongoose';
import { FindUnitReviewsUsecase } from './usecases/find-unit-reviews.usecase';
import { findUnitReviewDto } from './dtos/find-unit-reviews.dto';
import { FindUnitReviewsResponseDto } from './dtos/find-unit-reviews-response.dto';
import { PaginatedResult } from 'src/common/data-access';

@Injectable()
export class UnitReviewsService {
    constructor(
        private readonly createUnitReviewUsecase :CreateUnitReviewUsecase,
        private readonly calculateRatingAvgUsecase:CalculateRatingAvgUsecase,
        private readonly findUnitReviewsUsecase:FindUnitReviewsUsecase
    ){}

    async createUnitReview(body:CreateUnitReviewDto,session?:ClientSession):Promise<void>{
        await this.createUnitReviewUsecase.excute(body,session)
    }
    async CalculateRatingAvg(unitId:string,session?:ClientSession):Promise<CalculateRatingAvgAndCountDto>{
          return this.calculateRatingAvgUsecase.excute(unitId,session)

    }

    async findUnitReviews(query:findUnitReviewDto):Promise<PaginatedResult<FindUnitReviewsResponseDto>>{
       
        return this.findUnitReviewsUsecase.excute(query)
    }
}
