import { Injectable } from "@nestjs/common";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { UnitsService } from "src/units/units.service";
import { UnitFavouriteRepository } from "../repositories/unit-favourite.repository";

@Injectable()
export class AddUnitFavouriteUsecase{
    constructor(
        private readonly  unitsService:UnitsService,
        private readonly unitFavouriteRepository :UnitFavouriteRepository
    ){}

    async excute(unitId:string,currenUser:currentUserData):Promise<void>{

        //1-check if unit is exist

        const unit =  await this.unitsService.findOne({_id:unitId})
           

        //2- logged in user can not add his units to his favourites list 

          if(unit.user.toString() === currenUser._id.toString()){
              throw new BadRequestException('you can not add your units to your favourites list ')
          }
        //3-check if the unit already in the user favourite
        const existingFavourite= await this.unitFavouriteRepository.findOne({
            user:currenUser._id.toString(),
            unit:unitId
        })
        if(existingFavourite) return;
        //4- add unit to the user favourite

            await this.unitFavouriteRepository.create({
            user:currenUser._id.toString(),
            unit:unitId
            })
    }


}