import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CheckUnitAuthUsecase } from "./check-unit-auth.usecase";
import { FindoneUnitUsecase } from "./find-one.usecase";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class ActivateUnitUseCase{
    constructor(
        
                private readonly unitRepository :UnitRepository,
                private readonly checkUnitAuthUsecase:CheckUnitAuthUsecase,
                private readonly findoneUnitUsecase:FindoneUnitUsecase
    ){}

    async excute(unitId:string,currentUser:currentUserData):Promise<UnitResponseDto>{
        
        //1-validate the owner of unit who can update the unit data
              //get unit
           const unit= await this.findoneUnitUsecase.excute({_id:unitId })

         this.checkUnitAuthUsecase.excute(unit.user.toString(),currentUser)

     if (unit.isActive === true) throw new BadRequestException('unit is already activated');
        const updatedUnit= await this.unitRepository.findByIdAndUpdate(unitId,{
            isActive:true,

         },
        {returnDocument:'after',lean:true})

           return plainToInstance(UnitResponseDto,updatedUnit)
        
    }
}