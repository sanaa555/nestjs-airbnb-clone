import { Injectable } from "@nestjs/common";
import { UnitCategories } from "../schema/unit-categories.schema";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { QueryFilter } from "mongoose";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneUnitCategoryUsecase{

    constructor(

         private readonly  unitCategoriesRepository :UnitCategoriesRepository
    ){}

    async excute(query:QueryFilter<UnitCategories>):Promise<UnitCategoryResponseDto>{

        const unitCategory= this.unitCategoriesRepository.findOne(query)

        return plainToInstance (UnitCategoryResponseDto,unitCategory)

    }


}