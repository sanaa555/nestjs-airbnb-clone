import { Injectable } from "@nestjs/common";
import {  UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class DeleteUnitCategoryUsecase{
    constructor(
        private readonly unitCategoriesRepository:UnitCategoriesRepository
        
    ){}

    async excute(id:string):Promise<void>{

        // check if unitCategory exist
        const existinUnitCategory= await this.unitCategoriesRepository.findOne({
            _id:id,
            isDeleted:false
        })

        if(!existinUnitCategory) throw new BadRequestException('unit Category not found')

            await this.unitCategoriesRepository.findByIdAndUpdate(id,{
        isDeleted:true,
        deletedAt:new Date()
    })


    }
}