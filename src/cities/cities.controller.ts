import { Body, Controller, Get, HttpStatus, Param, Patch,Delete, Post, Query, HttpCode } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCityDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from 'src/common/data-access';
import { CityIdDto } from './dtos/city-id.dto';
import { UpdateCityDto } from './dtos/update-city.dto';

@Controller('cities')
export class CitiesController {
    constructor(
    
 private readonly citiesService:CitiesService
    ){}

    @Post()
  async  create(@Body() body:CreateCityDto):Promise<CityResponseDto>{
    return  this.citiesService.createCity(body)
    }

    @Get()
  async  getAll(@Query() query:FindAllCityDto):Promise<PaginatedResult<CityResponseDto>>{
    return  this.citiesService.findAllCity(query)
    }


    @Get('/:id')
    async findById(@Param() param:CityIdDto):Promise<CityResponseDto>{
      return this.citiesService.findById(param.id)
    }

    @Patch('/:id')
    async update(@Param() param:CityIdDto,@Body() body:UpdateCityDto):Promise<CityResponseDto>{
       return this.citiesService.update(param.id,body)
    }

    @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)

    async delete(@Param() param:CityIdDto):Promise<void>{

      return this.citiesService.deleteById(param.id)

    }




}
