import { Injectable } from "@nestjs/common";
import {  UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import {  UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";

@Injectable()

export class FindUnitCategoryByIdUsecase{
    constructor(
        private readonly unitCategoriesRepository:UnitCategoriesRepository
    ){}

    async excute(id:string):Promise<UnitCategoryResponseDto>{

        // check if unitCategory exist

        const unitCategory= await this.unitCategoriesRepository.findOne({
            _id:id,
            isDeleted:false

        })

        if(!unitCategory) throw new BadRequestException('unit Category not exist with this id')

            return plainToInstance(UnitCategoryResponseDto,unitCategory.toObject())

    }
}