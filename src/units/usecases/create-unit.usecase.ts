import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CreateUnitDto } from "../dtos/create-unit.dto";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { UnitValidationUsecase } from "./unit-validation.usecase";
import { plainToInstance } from "class-transformer";
import { currentUserData } from "src/auth/interfaces/principal.interface";


@Injectable()
export class CreateUnitUsecase{
    constructor(
        private readonly unitRepository:UnitRepository,
        private readonly unitValidationUsecase:UnitValidationUsecase
    ){}

    async excute(body:CreateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        //validation(unit category,country,city exist)
        //validation makesure costPerday > appsettings.minPrice

          await this.unitValidationUsecase.excute(body)

          const unit = await this.unitRepository.create({
            ...body,
            user:currentUser._id
          })
          return plainToInstance(UnitResponseDto,unit.toObject())

    }

}