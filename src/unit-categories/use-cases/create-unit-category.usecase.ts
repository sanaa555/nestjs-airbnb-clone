import { Injectable } from "@nestjs/common";
import {  UnitCategoriesRepository } from "../repository/unit-categories.repository";
import {  CreateUnitCategoryDto } from "../dtos/create-unit-category.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";


@Injectable()

export class  CreateUnitCategoryUsecase{

    constructor(
      
        private readonly unitCategoriesRepository:UnitCategoriesRepository
    ){}

    async excute(body:CreateUnitCategoryDto):Promise<UnitCategoryResponseDto>{
         // check if unitCategory exist

         const existingUnitCategory= await this.unitCategoriesRepository.findOne({
           name: body.name,
           isDeleted:false
         })

         if(existingUnitCategory) throw new BadRequestException('unit Category already exist')

            const unitCategory= await this.unitCategoriesRepository.create(body)

            return plainToInstance(UnitCategoryResponseDto,unitCategory.toObject())
    }
}