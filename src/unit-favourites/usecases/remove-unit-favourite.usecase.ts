import { Injectable } from "@nestjs/common";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { UnitFavouriteRepository } from "../repositories/unit-favourite.repository";

@Injectable()
export class RemoveUnitFavouriteUsecase{
    constructor(
        private readonly unitFavouriteRepository :UnitFavouriteRepository
    ){}

    async excute(unitId:string,currenUser:currentUserData):Promise<void>{

        const deletedFavourite=    await this.unitFavouriteRepository.findOneAndDelete({
             unit:unitId,
            user:currenUser._id.toString()
            })
              
            if(!deletedFavourite) throw new BadRequestException('favourite not found')
    }


}