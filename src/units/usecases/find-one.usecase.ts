import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { QueryFilter } from "mongoose";
import { Unit } from "../schema/unit.schema";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { UnitResponseDto } from "../dtos/unit-response.dto";

@Injectable()
export class FindoneUnitUsecase{
    constructor(
        private readonly unitRepository :UnitRepository
    ){}
    async excute(query:QueryFilter<Unit>):Promise<UnitResponseDto>{

         const unit = await this.unitRepository.findOne(query)
                if(!unit) throw new BadRequestException('this unit not found')

                    return plainToInstance(UnitResponseDto,unit)
                     

    }
}