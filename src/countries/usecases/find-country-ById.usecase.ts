import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Country } from "../schema/country.schema";
// import { Model } from "mongoose";
import { CountryResponseDto } from "../dtos/country-response.dto";
import {  plainToInstance } from "class-transformer";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";
// import { ModelNames } from "src/common/data-access";
import { CountryRepository } from "../repository/country.repository";

@Injectable()
export class FindCountryByIdUseCase{
    constructor(
        // @InjectModel(ModelNames.COUNTRIES)
        // private readonly countryModel:Model<Country>
        // change model

            private readonly countryRepository:CountryRepository
        
    ){}

    async excute(id:string):Promise<CountryResponseDto> {

        const country= await this.countryRepository.findOne({
            _id:id,
            isDeleted:{$ne:true}
        })
        if(!country) throw new NotFoundException('country not found')

            return plainToInstance(CountryResponseDto,country.toObject())
     

    }
}