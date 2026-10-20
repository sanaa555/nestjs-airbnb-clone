import { Injectable } from '@nestjs/common';
import { CreateUnitReviewUsecase } from './usecases/create-unit-review.usecase';
import { CalculateRatingAvgUsecase } from './usecases/calculate-rating-avg.usecase';
import { CalculateRatingAvgAndCountDto } from './dtos/calculate-rating-avg-and-count.dto';
import { CreateUnitReviewDto } from './dtos/create-unit-review.dto';
import { ClientSession } from 'mongoose';

@Injectable()
export class UnitReviewsService {
    constructor(
        private readonly createUnitReviewUsecase :CreateUnitReviewUsecase,
        private readonly calculateRatingAvgUsecase:CalculateRatingAvgUsecase
    ){}

    async createUnitReview(body:CreateUnitReviewDto,session?:ClientSession):Promise<void>{
        await this.createUnitReviewUsecase.excute(body,session)
    }
    async CalculateRatingAvg(unitId:string,session?:ClientSession):Promise<CalculateRatingAvgAndCountDto>{
          return this.calculateRatingAvgUsecase.excute(unitId,session)

    }
}
