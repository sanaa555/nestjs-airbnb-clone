import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import {  FindAllUnitCategories } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { UnitCategoryIdDto } from './dtos/unit-category-id.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { UnitCategoriesService } from './unit-categories.service';

@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(
    private readonly unitCategoriesService:UnitCategoriesService
  ){}
    @Post()
    async createUnitCategory(@Body() body:CreateUnitCategoryDto):Promise<UnitCategoryResponseDto>{

        return this.unitCategoriesService.create(body)

    }

    @Get('/:id')
        async getUnitCategoryById(@Param() param:UnitCategoryIdDto):Promise <UnitCategoryResponseDto>{
    
            return   this.unitCategoriesService.getUnitCategoryById(param.id)
    
        }
    
    
         @Get()
        async findAll(@Query() query:FindAllUnitCategories):Promise <PaginatedResult<UnitCategoryResponseDto>>{
    
            return   this.unitCategoriesService.findAll(query)
    
        }
    
    
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async deleteUnitCategoryById(@Param() param:UnitCategoryIdDto):Promise <void>{
    
            return   this.unitCategoriesService.deleteById(param.id)
    
        }
    
    
        @Patch('/:id')
        async updateUnitCategoryById(@Param() param:UnitCategoryIdDto,@Body() body:UpdateUnitCategoryDto):Promise <UnitCategoryResponseDto>{
    
            return   this.unitCategoriesService.updateById(param.id,body)
        }
    }
    

