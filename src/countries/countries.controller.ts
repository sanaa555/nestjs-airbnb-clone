import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CountryIdDto } from './dtos/country-id.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/common/swagger';
import { CreateCountrySwagger } from './swagger/create-country.swagger';
import { DeleteCountrySwagger } from './swagger/delete-country.swagger';
import { FindAllCountriesSwagger } from './swagger/find-all-countries.swagger';
import { FindCountryByIdSwagger } from './swagger/find-country-by-id.swagger';
import { UpdateCountrySwagger } from './swagger/update-country.swagger';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';

@ApiTags(API_TAGS.COUNTRIES)
@Controller('countries')
export class CountriesController {
    constructor(
        private readonly countriesService:CountriesService,
        

    ){}
    @CreateCountrySwagger()
    @Post()
     @Authorize(Roles.SYETEM_ADMIN)
    async create(@Body() body:CreateCountryDto):Promise <CountryResponseDto>{

        return this.countriesService.create(body)

    }

    @FindCountryByIdSwagger()
    @Get('/:id')
    async getCountryById(@Param() param:CountryIdDto):Promise <CountryResponseDto>{

        return   this.countriesService.getCountryById(param.id)

    }


    @FindAllCountriesSwagger()
    @Get()
    async findAll(@Query() query:FindAllDto):Promise <PaginatedResult<CountryResponseDto>>{

        return   this.countriesService.findAll(query)

    }

    @DeleteCountrySwagger()
    @Delete('/:id')
    @Authorize(Roles.SYETEM_ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCountryById(@Param() param:CountryIdDto):Promise <void>{

        return   this.countriesService.deleteById(param.id)

    }

    @UpdateCountrySwagger()
    @Patch('/:id')
    @Authorize(Roles.SYETEM_ADMIN)
    async updateCountryById(@Body() body:UpdateCountryDto,@Param() param:CountryIdDto):Promise <CountryResponseDto>{

        return   this.countriesService.updateById(body,param.id)

    }
}
