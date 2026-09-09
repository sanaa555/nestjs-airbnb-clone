import { Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city-repository";
import { FindAllCityDto } from "../dtos/find-all-cities.dto";
import { PaginatedResult } from "src/common/data-access";
import { CityResponseDto } from "../dtos/city-response.dto";
import { HydratedDocument, QueryFilter } from "mongoose";
import { City } from "../schema/city.schema";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindAllCitiesUseCase {
    constructor(

        private readonly cityRepository:CityRepository
    ){}

    async excute(query:FindAllCityDto):Promise<PaginatedResult<CityResponseDto>>{

        const matchQuery:   QueryFilter<City>= {
            isDeleted:false
        }

        if(query?.name) matchQuery.name={$regex:query.name,$options:'i'}
        if(query?.country) matchQuery.country=query.country

        const result = await this.cityRepository.findPaginated(matchQuery,{
            page:query?.page,
            limit:query?.limit,
            ignoreLimit:query?.ignoreLimit,
            populate:[{
                path:'country',
                select :'name'
            }],
            lean:true
        })


        return plainToInstance(PaginatedResult<CityResponseDto>,result)




        // //   return plainToInstance(PaginatedResult<CityResponseDto>,result.data.map((doc) => doc.toObject()))

        // const cities=    plainToInstance(CityResponseDto,result.data.map((doc:HydratedDocument<City>)=>doc.toObject()))  
        
        // return new PaginatedResult(
        //     cities,
        //     result.totalCount,
        //     result.page,
        //     result.limit,

        // )


    }
}