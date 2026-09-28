import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CheckUnitAuthUsecase } from "./check-unit-auth.usecase";
import { FindoneUnitUsecase } from "./find-one.usecase";
import { currentUserData } from "src/auth/interfaces/principal.interface";


@Injectable()
export class DeleteUnitUseCase{
    constructor(
        
                private readonly unitRepository :UnitRepository,
                private readonly checkUnitAuthUsecase:CheckUnitAuthUsecase,
                private readonly findoneUnitUsecase:FindoneUnitUsecase
    ){}

    async excute(unitId:string,currentUser:currentUserData):Promise<void>{
        
        //1-validate the owner of unit who can update the unit data
              //get unit
           const unit= await this.findoneUnitUsecase.excute({_id:unitId })

         this.checkUnitAuthUsecase.excute(unit.user.toString(),currentUser)

         await this.unitRepository.findByIdAndUpdate(unitId,{
            isDeleted:true
         })
        
    }
}