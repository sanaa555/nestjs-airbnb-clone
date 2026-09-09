import { Injectable } from "@nestjs/common";
import { CreateCityDto } from "../dtos/create-city.dto";
import { CityResponseDto } from "../dtos/city-response.dto";
import { CityRepository } from "../repository/city-repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { CountriesService } from "src/countries/countries.service";


@Injectable()
export class CreateCityUseCase{
    constructor(

        private readonly cityRepository:CityRepository,
        private readonly countriesService:CountriesService
    ){}

    async excute(body:CreateCityDto):Promise<CityResponseDto>{
        // validate city name not  duplicated per country

        const existingCityByName= await this.cityRepository.findOne({
            name:body.name,
            country:body.country,
            isDeleted:false
        })

        if (existingCityByName) throw new BadRequestException('city already exist')

            // validate countryId

             await this.countriesService.getCountryById(body.country)


            const city= await this.cityRepository.create(body)

            return plainToInstance(CityResponseDto,city.toObject())


    }
}