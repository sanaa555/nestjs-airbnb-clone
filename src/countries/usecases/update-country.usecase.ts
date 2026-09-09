import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Country } from "../schema/country.schema";
import { Model } from "mongoose";
import { UpdateCountryDto } from "../dtos/update-country.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { CountryResponseDto } from "../dtos/country-response.dto";
import { ModelNames } from "src/common/data-access";
import { CountryRepository } from "../repository/country.repository";


@Injectable()
export class UpdateCountryUseCase{

    constructor(
        //  @InjectModel(ModelNames.COUNTRIES)
        //                   private readonly countryModel:Model<Country>
                                      private readonly countryRepository:CountryRepository
        
    ){}


    async  excute(body:UpdateCountryDto,countryId:string):Promise<CountryResponseDto>{

        //check if country exist
        const country=await this.countryRepository.findOne({
            _id:countryId,
            isDeleted:{$ne:true}
        })
        if(!country){
         throw new BadRequestException('country not found ')

        }
        if(body?.name){
            
        // check if country name alrady exist
        const existingCountry= await this.countryRepository.findOne({
            name:body.name,
            isDeleted:{$ne:true}
            ,
            _id:{$ne:countryId}
        })
        if(existingCountry){
            throw new BadRequestException('country name already exist ')
        }


        }

        

         const updatedCountry= await this.countryRepository.findByIdAndUpdate(
            countryId,
            body,
             )

        return plainToInstance(CountryResponseDto,updatedCountry?.toObject())

    }
}