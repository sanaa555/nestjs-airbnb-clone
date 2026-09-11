import { Injectable } from "@nestjs/common";
import { UpdateCityDto } from "../dtos/update-city.dto";
import { CityResponseDto } from "../dtos/city-response.dto";
import { CityRepository } from "../repository/city-repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";


@Injectable()
export class UpdateCityUseCase{

    constructor(
        private readonly cityRepository:CityRepository
    ){}

    async excute(cityId:string,body:UpdateCityDto):Promise<CityResponseDto>{

        // check if city exist 

        const city= await  this.cityRepository.findOne({
           _id: cityId,
            isDeleted:false,


        })

        if(!city) throw new BadRequestException('city not found')

            // Check city name not duplicated in the same country

        
const ExistingCityByName = await this.cityRepository.findOne(
    {
        name: body.name,
        country:city.country,
        isDeleted:false,
    _id:{$ne :cityId},

})


        if(ExistingCityByName) throw new BadRequestException('city name already exist')


            const updatedCity= await this.cityRepository.findByIdAndUpdate(
                cityId,body
            )





   return plainToInstance(CityResponseDto,updatedCity?.toObject())
    }
}