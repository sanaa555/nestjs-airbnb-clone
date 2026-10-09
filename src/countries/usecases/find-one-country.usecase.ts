import { Injectable } from "@nestjs/common";
import { CountryRepository } from "../repository/country.repository";
import { QueryFilter } from "mongoose";
import { Country } from "../schema/country.schema";
import { CountryResponseDto } from "../dtos/country-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneUsecase{
    constructor(
        private readonly countryRepository:CountryRepository
    ){}

    async excute(query:QueryFilter<Country>):Promise<CountryResponseDto>{

        const country = await this.countryRepository.findOne(query)
        return plainToInstance(CountryResponseDto,country)
    }
}