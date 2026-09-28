import { Injectable } from "@nestjs/common";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { UnitRepository } from "../repositories/unit.repository";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { currentUserData } from "src/auth/interfaces/principal.interface";

@Injectable()
export class FindUnitByIdUsecase{
    constructor(
        private readonly  unitRepository :UnitRepository
    ){}

    async excute(id:string):Promise<UnitResponseDto>{
     
        const unit = await this.unitRepository.findOne({
            _id:id,
            isDeleted:false,
              isActive: true

        })

        if(!unit) throw new BadRequestException(`unit with id${id} not exist`)

        return plainToInstance(UnitResponseDto,unit)
    }
}