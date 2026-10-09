import { Module } from '@nestjs/common';
import {  UnitCategoriesController } from './unit-categories.controller';
import {  UnitCategoriesService } from './unit-categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  UnitCategoriesSchema } from './schema/unit-categories.schema';
import { ModelNames } from 'src/common/data-access';
import {  CreateUnitCategoryUsecase } from './use-cases/create-unit-category.usecase';
import {  FindAllUnitCateoriesUsecase } from './use-cases/find-all-unit-categories.usecase';
import {  FindUnitCategoryByIdUsecase } from './use-cases/find-unit-category-by-id.usecase';
import {  DeleteUnitCategoryUsecase } from './use-cases/soft-delete-unit-category-usecase';
import {  UpdateUnitCategoryUsecase } from './use-cases/update-unit-category-usecase';
import {  UnitCategoriesRepository } from './repository/unit-categories.repository';
import { FindOneUnitCategoryUsecase } from './use-cases/find-one-unit-category.usecase';

@Module({
      imports: [MongooseModule.forFeature([{ name: ModelNames.UNIT_CATEGORIES, schema: UnitCategoriesSchema }])],
  
  controllers: [UnitCategoriesController],
  providers: [UnitCategoriesRepository,UnitCategoriesService,CreateUnitCategoryUsecase,FindAllUnitCateoriesUsecase,FindUnitCategoryByIdUsecase,DeleteUnitCategoryUsecase,UpdateUnitCategoryUsecase,FindOneUnitCategoryUsecase],
  exports:[UnitCategoriesService]
})
export class UnitCategoriesModule {}
