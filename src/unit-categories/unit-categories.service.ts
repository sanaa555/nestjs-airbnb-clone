import { Injectable } from '@nestjs/common';
import {  CreateUnitCategoryUsecase } from './use-cases/create-unit-category.usecase';
import {  FindUnitCategoryByIdUsecase } from './use-cases/find-unit-category-by-id.usecase';
import {  FindAllUnitCateoriesUsecase } from './use-cases/find-all-unit-categories.usecase';
import { PaginatedResult } from 'src/common/data-access';
import {  DeleteUnitCategoryUsecase } from './use-cases/soft-delete-unit-category-usecase';
import {  UpdateUnitCategoryUsecase } from './use-cases/update-unit-category-usecase';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { FindAllUnitCategories } from './dtos/find-all.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { QueryFilter } from 'mongoose';
import { UnitCategories } from './schema/unit-categories.schema';
import { FindOneUnitCategoryUsecase } from './use-cases/find-one-unit-category.usecase';

@Injectable()
export class UnitCategoriesService {
    constructor(
                private readonly createUnitCategoryUsecase:CreateUnitCategoryUsecase,
                 private readonly findUnitCategoryByIdUsecase:FindUnitCategoryByIdUsecase,
                 private readonly findAllUnitCateoriesUsecase:FindAllUnitCateoriesUsecase,
                private readonly deleteUnitCategoryUsecase:DeleteUnitCategoryUsecase,
                private readonly updateUnitCategoryUsecase:UpdateUnitCategoryUsecase,
                 private readonly findOneUnitCategoryUsecase:FindOneUnitCategoryUsecase,

    ){}

    async create(body:CreateUnitCategoryDto):Promise<UnitCategoryResponseDto>{
            return  this.createUnitCategoryUsecase.excute(body)
        }
    
        async getUnitCategoryById(id:string):Promise<UnitCategoryResponseDto>{
            return   this.findUnitCategoryByIdUsecase.excute(id)
        }
    
        async findAll(query:FindAllUnitCategories):Promise<PaginatedResult<UnitCategoryResponseDto>>{
            return  this.findAllUnitCateoriesUsecase.excute(query)
        }
    
    
        
        async deleteById(id:string):Promise<void>{
            return  this.deleteUnitCategoryUsecase.excute(id)
        }
    
    
        async updateById(id:string,body:UpdateUnitCategoryDto):Promise<UnitCategoryResponseDto>{
            return  this.updateUnitCategoryUsecase.excute(id,body)
        }

        async findone(query: QueryFilter<UnitCategories>):Promise<UnitCategoryResponseDto>{
            return  this.findOneUnitCategoryUsecase.excute(query)
        }
    
}
