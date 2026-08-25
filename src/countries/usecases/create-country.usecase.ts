import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Country } from "../schema/country.schema";
import { Model } from "mongoose";
import { CreateCountryDto } from "../dtos/create-country.dto";
import { CountryResponseDto } from "../dtos/country-response.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import {  plainToInstance } from "class-transformer";

@Injectable()
export class CreateCountryUseCase{
    constructor(
        @InjectModel(Country.name)
        private readonly countryModel:Model<Country>
    ){}

    async excute(body:CreateCountryDto):Promise<CountryResponseDto> {
     

        const ExistingCountry= await this.countryModel.findOne({
            name:body.name,
         isDeleted:{$ne:true},

        })
           
        if(ExistingCountry) throw new BadRequestException('country name already exist')

            const createdCountry = await this.countryModel.create(body)
        return plainToInstance(CountryResponseDto,createdCountry.toObject())

    }
}