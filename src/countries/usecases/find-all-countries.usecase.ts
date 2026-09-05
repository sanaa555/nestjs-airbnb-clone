import { Injectable, Query } from "@nestjs/common";
import { Country } from "../schema/country.schema";
import {  HydratedDocument, HydrateOptions, QueryFilter } from "mongoose";
import { CountryResponseDto } from "../dtos/country-response.dto";
import { plainToInstance } from "class-transformer";
import { FindAllDto } from "../dtos/find-all.dto";
import { CountryRepository } from "../repository/country.repository";
import { PaginatedResult } from "src/common/data-access";

@Injectable()
export class FindAllCountriesUseCase{

    constructor(


                private readonly countryRepository:CountryRepository
    ){}

    async excute( query:FindAllDto):Promise <PaginatedResult<CountryResponseDto>>{
         
        // const page=query?.page || 1
        // const limit =query?.page || 10
        // const skip= (page-1)*limit

        const matchQuery :QueryFilter<Country>={isDeleted:{$ne:true}}

          if(query?.name) matchQuery.name={$regex:query.name,$options:'i'}
         if(query?.countryCode) matchQuery.countryCode=query.countryCode

        //  const countries =this.countryModel.find(matchQuery)
        //  .sort(createsAt:-1)
        //  .skip(skip)
        //  .limit(limit)
        //    return countries.map((country)=>
    //     plainToInstance(CountryResponseDto,country.toObject())

    //    )



        const result= await this.countryRepository.findPaginated(matchQuery,{
            page:query?.page,
            limit:query?.limit,
              ignoreLimit:query?.ignoreLimit})

              const countries=  plainToInstance(CountryResponseDto,result.data.map((doc:HydratedDocument<Country>)=>doc.toObject()),
            )

              return new PaginatedResult(
                countries,
                result.totalCount,
                 result.page,
                 result.limit,

              )

    

        
    }
    
}