import { Body, Controller, Get, HttpStatus, Param, Patch,Delete, Post, Query, HttpCode } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCityDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from 'src/common/data-access';
import { CityIdDto } from './dtos/city-id.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/common/swagger';
import { CreateCitySwagger } from './swagger/create-city.swagger';
import { DeleteCitySwagger } from './swagger/delete-city.swagger';
import { FindAllCitiesSwagger } from './swagger/find-all-cities.swagger';
import { FindCityByIdSwagger } from './swagger/find-city-by-id.swagger';
import { UpdateCitySwagger } from './swagger/update-city.swagger';

@ApiTags(API_TAGS.CITIES)
@Controller('cities')
export class CitiesController {
    constructor(
    
 private readonly citiesService:CitiesService
    ){}

    @CreateCitySwagger()
    @Post()
  async  create(@Body() body:CreateCityDto):Promise<CityResponseDto>{
    return  this.citiesService.createCity(body)
    }

    @FindAllCitiesSwagger()
    @Get()
  async  getAll(@Query() query:FindAllCityDto):Promise<PaginatedResult<CityResponseDto>>{
    return  this.citiesService.findAllCity(query)
    }


    @FindCityByIdSwagger()
    @Get('/:id')
    async findById(@Param() param:CityIdDto):Promise<CityResponseDto>{
      return this.citiesService.findById(param.id)
    }

    @UpdateCitySwagger()
    @Patch('/:id')
    async update(@Param() param:CityIdDto,@Body() body:UpdateCityDto):Promise<CityResponseDto>{
       return this.citiesService.update(param.id,body)
    }

    @DeleteCitySwagger()
    @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)

    async delete(@Param() param:CityIdDto):Promise<void>{

      return this.citiesService.deleteById(param.id)

    }




}
