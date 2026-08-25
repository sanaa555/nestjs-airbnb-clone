import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Country } from "../schema/country.schema";
import { Model } from "mongoose";
import { CreateCountryDto } from "../dtos/create-country.dto";
import { CountryResponseDto } from "../dtos/country-response.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import {  plainToInstance } from "class-transformer";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";

@Injectable()
export class FindCountryByIdUseCase{
    constructor(
        @InjectModel(Country.name)
        private readonly countryModel:Model<Country>
    ){}

    async excute(id:string):Promise<CountryResponseDto> {

        const country= await this.countryModel.findOne({
            _id:id,
            isDeleted:{$ne:true}
        })
        if(!country) throw new NotFoundException('country not found')

            return plainToInstance(CountryResponseDto,country.toObject())
     

    }
}