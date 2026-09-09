import { Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city-repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class DeleteCityUseCase{
    constructor(

        private readonly cityRepository:CityRepository
    ){}


    async excute(cityId:string):Promise<void>{

        const existingCity= await this.cityRepository.findOne({
            _id:cityId,
            isDeleted:false
        })
        if(!existingCity) throw new BadRequestException('city noy found')

            await this.cityRepository.findByIdAndUpdate(    cityId,
{
                isDeleted:true,
                deletedAt:new Date()
            })

    }

}