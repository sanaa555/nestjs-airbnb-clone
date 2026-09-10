import { Injectable } from "@nestjs/common";
import {  UnitCategoriesRepository } from "../repository/unit-categories.repository";
import {  UpdateUnitCategoryDto } from "../dtos/update-unit-category.dto";
import {  UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";


@Injectable()
export class UpdateUnitCategoryUsecase{

    constructor(               
        private readonly unitCategoriesRepository:UnitCategoriesRepository
    ){}

    async excute(id:string,body:UpdateUnitCategoryDto):Promise<UnitCategoryResponseDto>{
        // check if unitCategory exist 

        const existingUnitCategory= await this.unitCategoriesRepository.findOne({
            _id:id,
            isDeleted:false
        })

        if(!existingUnitCategory) throw new BadRequestException('unit Category not found ')
             
            
             if(body?.name){
                        
                    // check if unitCategory name alrady exist
                    const existingUnitCategoryName= await this.unitCategoriesRepository.findOne({
                        name:body.name,
                        isDeleted:false
                        ,
                        _id:{$ne:id}
                    })
                    if(existingUnitCategoryName){
                        throw new BadRequestException('unit Category name already exist ')
                    }
            
            
                    }
            
    
            
                     const updatedUnitCategory= await this.unitCategoriesRepository.findByIdAndUpdate(
                        id,
                        body,
                         )
            
                    return plainToInstance(UnitCategoryResponseDto,updatedUnitCategory?.toObject())
            

    }
}