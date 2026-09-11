import { Injectable } from '@nestjs/common';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { FindAllCitiesUseCase } from './use-cases/find-all-cities.usecase';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCityDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindCityByIdUseCase } from './use-cases/find-city-by-id.usecase';
import { UpdateCityUseCase } from './use-cases/update-city.usecase';
import { DeleteCityUseCase } from './use-cases/soft-delete-city.usecase';
import { UpdateCityDto } from './dtos/update-city.dto';

@Injectable()
export class CitiesService {


    constructor(
                private readonly createCityUseCase:CreateCityUseCase,
                private readonly findAllCitiesUseCase:FindAllCitiesUseCase,
                private readonly findCityByIdUseCase:FindCityByIdUseCase,
                private readonly updateCityUseCase:UpdateCityUseCase,
                private readonly deleteCityUseCase:DeleteCityUseCase,
    ){
    }


    async createCity(body:CreateCityDto): Promise<CityResponseDto>{

        return this.createCityUseCase.excute(body)

    }

    async findAllCity(query:FindAllCityDto): Promise<PaginatedResult<CityResponseDto>>{

        return this.findAllCitiesUseCase.excute(query)

    }

    async findById(cityId:string): Promise<CityResponseDto>{
        return this.findCityByIdUseCase.excute(cityId)

    }

    async update(cityId:string,body:UpdateCityDto): Promise<CityResponseDto>{
        return this.updateCityUseCase.excute(cityId,body)

    }
    async deleteById(cityId:string): Promise<void>{
        return this.deleteCityUseCase.excute(cityId)

    }

}
