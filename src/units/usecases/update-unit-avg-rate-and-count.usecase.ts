import { Injectable } from "@nestjs/common";
import { UpdateUnitAvgAndCountDto } from "../dtos/update-unit-avg-rate-and-count.dto";
import { UnitRepository } from "../repositories/unit.repository";
import { ClientSession } from "mongoose";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()

export class UpdateUnitAvgRateAndCountUsecase{
    constructor(
        private readonly unitRepository :UnitRepository
    ){}

    async excute(body:UpdateUnitAvgAndCountDto,session?:ClientSession):Promise<void>{

        const unit = await this.unitRepository.findById(body.unit,{session})
        
         if(!unit) throw new BadRequestException('unit not found')

         await this.unitRepository.findByIdAndUpdate(body.unit,{
                ratingAvg:body.ratingAvg,
                ratingCount:body.ratingCount
            },
        {session})

    }
}