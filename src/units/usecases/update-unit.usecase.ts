import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { UpdateUnitDto } from "../dtos/update-unit.dto ";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { UnitValidationUsecase } from "./unit-validation.usecase";
import { CheckUnitAuthUsecase } from "./check-unit-auth.usecase";
import { plainToInstance } from "class-transformer";
import { FindoneUnitUsecase } from "./find-one.usecase";

@Injectable()
export class UpdateUnitUsecase{
    constructor(
        private readonly unitRepository :UnitRepository,
        private readonly unitValidationUsecase:UnitValidationUsecase,
        private readonly checkUnitAuthUsecase:CheckUnitAuthUsecase,
        private readonly findoneUnitUsecase:FindoneUnitUsecase
    ){}

    async excute(id:string,body:UpdateUnitDto,currentUser:currentUserData):Promise<UnitResponseDto>{

        //1-validate the owner of unit who can update the unit data
              //get unit
           const unit= await this.findoneUnitUsecase.excute({_id:id })

            this.checkUnitAuthUsecase.excute(unit.user.toString(),currentUser)
        
        //2-the same validation for creat unit
           await this.unitValidationUsecase.excute(body,unit)
         
        //3- update the unit data
        const updatedUnit = await this.unitRepository.findByIdAndUpdate(id,{
            $set:body
        },
        {returnDocument:'after'}
    
    )
        //4-return  the updated unit data
        return plainToInstance(UnitResponseDto,updatedUnit?.toObject())


    }
}