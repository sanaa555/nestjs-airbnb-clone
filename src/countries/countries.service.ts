import { Injectable, Query } from '@nestjs/common';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { FindCountryByIdUseCase } from './usecases/find-country-ById.usecase';
import { SoftDeleteUseCase } from './usecases/soft-delete-country.usecase';
import { FindAllCountriesUseCase } from './usecases/find-all-countries.usecase';
import { UpdateCountryUseCase } from './usecases/update-country.usecase';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindOneUsecase } from './usecases/find-one-country.usecase';
import { Country } from './schema/country.schema';
import { QueryFilter } from 'mongoose';

@Injectable()
export class CountriesService {

    constructor(
        private readonly createCountryUseCase:CreateCountryUseCase,
        
                private readonly findCountryByIdUseCase:FindCountryByIdUseCase,
                 private readonly findAllCountriesUseCase:FindAllCountriesUseCase,

            private readonly softDeleteUseCase:SoftDeleteUseCase,
            private readonly updateCountryUseCase:UpdateCountryUseCase,
            private readonly FindOneUsecase:FindOneUsecase



    ){}

    async create(body:CreateCountryDto):Promise<CountryResponseDto>{
        return  this.createCountryUseCase.excute(body)
    }

    async getCountryById(id:string):Promise<CountryResponseDto>{
        return   this.findCountryByIdUseCase.excute(id)
    }

    async findAll(query:FindAllDto):Promise<PaginatedResult<CountryResponseDto>>{
        return  this.findAllCountriesUseCase.excute(query)
    }


    
    async deleteById(id:string):Promise<void>{
        return  this.softDeleteUseCase.excute(id)
    }


    async updateById(body:UpdateCountryDto,id:string):Promise<CountryResponseDto>{
        return  this.updateCountryUseCase.excute(body,id)
    }

    async findOne(query:QueryFilter<Country>):Promise<CountryResponseDto>{
         return this.FindOneUsecase.excute(query)
    }


}
