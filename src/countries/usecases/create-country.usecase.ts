import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Country } from "../schema/country.schema";
// import { Model } from "mongoose";
import { CreateCountryDto } from "../dtos/create-country.dto";
import { CountryResponseDto } from "../dtos/country-response.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import {  plainToInstance } from "class-transformer";
import { CountryRepository } from "../repository/country.repository";
// import { ModelNames } from "src/common/data-access";

@Injectable()
export class CreateCountryUseCase{
    constructor(
        // @InjectModel(ModelNames.COUNTRIES)
        // private readonly countryModel:Model<Country>

    private readonly countryRepository:CountryRepository
        
    ){}

    async excute(body:CreateCountryDto):Promise<CountryResponseDto> {


     
      // change in model only
        const ExistingCountry= await this.countryRepository.findOne({
            name:body.name,
         isDeleted:{$ne:true},

        })
           
        if(ExistingCountry) throw new BadRequestException('country name already exist')

            const createdCountry = await this.countryRepository.create(body)
        return plainToInstance(CountryResponseDto,createdCountry.toObject())

    }
}