import { Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city-repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { CityResponseDto } from "../dtos/city-response.dto";


@Injectable()
export class FindCityByIdUseCase{
    constructor(
                private readonly cityRepository:CityRepository
        
    ){}


    async excute(cityId:string):Promise<CityResponseDto>{

        // check if city exist

        const city = await this.cityRepository.findOne({
            _id:cityId,
            isDeleted:false
        })

        if(!city) throw new BadRequestException('city not found')

            return plainToInstance(CityResponseDto,city)


    }
}