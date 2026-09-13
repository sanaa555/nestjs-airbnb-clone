import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import {  FindAllUnitCategories } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { UnitCategoryIdDto } from './dtos/unit-category-id.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { UnitCategoriesService } from './unit-categories.service';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/common/swagger';
import { CreateUnitCategorySwagger } from './swagger/create-unit-category.swagger';
import { DeleteUnitCategorySwagger } from './swagger/delete-unit-category.swagger';
import { FindAllUnitCategoriesSwagger } from './swagger/find-all-unit-categories.swagger';
import { FindUnitCategoryByIdSwagger } from './swagger/find-unit-category-by-id.swagger';
import { UpdateUnitCategorySwagger } from './swagger/update-unit-category.swagger';

@ApiTags(API_TAGS.UNIT_CATEGORIES)
@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(
    private readonly unitCategoriesService:UnitCategoriesService
  ){}
    @CreateUnitCategorySwagger()
    @Post()
    async createUnitCategory(@Body() body:CreateUnitCategoryDto):Promise<UnitCategoryResponseDto>{

        return this.unitCategoriesService.create(body)

    }

    @FindUnitCategoryByIdSwagger()
    @Get('/:id')
        async getUnitCategoryById(@Param() param:UnitCategoryIdDto):Promise <UnitCategoryResponseDto>{
    
            return   this.unitCategoriesService.getUnitCategoryById(param.id)
    
        }
    
    
         @FindAllUnitCategoriesSwagger()
         @Get()
        async findAll(@Query() query:FindAllUnitCategories):Promise <PaginatedResult<UnitCategoryResponseDto>>{
    
            return   this.unitCategoriesService.findAll(query)
    
        }
    
    
        @DeleteUnitCategorySwagger()
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async deleteUnitCategoryById(@Param() param:UnitCategoryIdDto):Promise <void>{
    
            return   this.unitCategoriesService.deleteById(param.id)
    
        }
    
    
        @UpdateUnitCategorySwagger()
        @Patch('/:id')
        async updateUnitCategoryById(@Param() param:UnitCategoryIdDto,@Body() body:UpdateUnitCategoryDto):Promise <UnitCategoryResponseDto>{
    
            return   this.unitCategoriesService.updateById(param.id,body)
        }
    }
    

