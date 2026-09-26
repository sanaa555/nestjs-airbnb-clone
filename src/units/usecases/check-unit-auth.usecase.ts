import { Injectable } from "@nestjs/common";
import { UnitIdDto } from "../dtos/unit-id.dto";
import { UpdateUnitDto } from "../dtos/update-unit.dto ";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { ForbiddenException } from "src/common/errors-handling/custom-exceptions/forbidden.exception";
import { UnitRepository } from "../repositories/unit.repository";


@Injectable()
export class CheckUnitAuthUsecase{
    constructor(
                private readonly unitRepository :UnitRepository,
        
    ){}

     excute(unitOwnerId:string,currentUser:currentUserData):void{
                //1-validate the owner of unit who can update the unit data
       
        if(currentUser._id.toString() !== unitOwnerId) throw new ForbiddenException('you are not allowed.only unit owner can do that')
    }
}