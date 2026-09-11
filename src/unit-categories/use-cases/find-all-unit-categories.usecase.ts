import { PaginatedResult } from "src/common/data-access";
import {  UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";
import {  FindAllUnitCategories } from "../dtos/find-all.dto";
import {  UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { QueryFilter } from "mongoose";
import { plainToInstance } from "class-transformer";
import { Injectable } from "@nestjs/common";
import { UnitCategories } from "../schema/unit-categories.schema";

@Injectable()
export class FindAllUnitCateoriesUsecase{
    constructor(
        private readonly unitCategoriesRepository:UnitCategoriesRepository
        
    ){}

    async excute(query:FindAllUnitCategories):Promise <PaginatedResult<UnitCategoryResponseDto>>{

   const matchQuery:QueryFilter<UnitCategories>= {isDeleted:false}

   if(query?.name) matchQuery.name={$regex:query.name,$options:'i'}

   const result= await this.unitCategoriesRepository.findPaginated(matchQuery,{
    page:query?.page,
    limit:query?.limit,
    ignoreLimit:query?.ignoreLimit,
    lean:true
   })

        return plainToInstance(PaginatedResult<UnitCategoryResponseDto>,result)

        

    }
}
 
    

    
  