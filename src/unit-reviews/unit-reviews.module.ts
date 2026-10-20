import { Module } from '@nestjs/common';
import { UnitReviewsService } from './unit-reviews.service';
import { UnitReviewsController } from './unit-reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { UnitReviewsSchema } from './schemas/unit-reviews.schema';
import { CreateUnitReviewUsecase } from './usecases/create-unit-review.usecase';
import { CalculateRatingAvgUsecase } from './usecases/calculate-rating-avg.usecase';
import { UnitReviewsRepository } from './repositories/unit-reviews.repository';
import { FindUnitReviewsUsecase } from './usecases/find-unit-reviews.usecase';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.UNITREVIEWS,
    schema:UnitReviewsSchema

  }])],
  providers: [UnitReviewsService,CreateUnitReviewUsecase,CalculateRatingAvgUsecase,UnitReviewsRepository,FindUnitReviewsUsecase],
  controllers: [UnitReviewsController],
  exports:[UnitReviewsService]
})
export class UnitReviewsModule {}
