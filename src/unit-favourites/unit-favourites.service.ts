import { Injectable } from '@nestjs/common';
import { currentUserData } from 'src/auth/interfaces/principal.interface';
import { FindUnitFavouriteDto } from './dtos/find-unit-favourite.dto';
import { AddUnitFavouriteUsecase } from './usecases/add-unit-favourite.usecase';
import { RemoveUnitFavouriteUsecase } from './usecases/remove-unit-favourite.usecase';
import { FindUnitFavouriteUsecase } from './usecases/find-unit-favourite.usecase';
import { UnitFavouriteResponseDto } from './dtos/unit-favourite-response.dto';
import { PaginatedResult } from 'src/common/data-access';

@Injectable()
export class UnitFavouritesService {

    constructor(
         private readonly addUnitFavouriteUsecase:AddUnitFavouriteUsecase,
         private readonly removeUnitFavouriteUsecase:RemoveUnitFavouriteUsecase,
         private readonly findUnitFavouriteUsecase:FindUnitFavouriteUsecase
    ){

    }

    async addFavourite(id:string,currentUser:currentUserData):Promise<void>{
        
        return this.addUnitFavouriteUsecase.excute(id,currentUser)
    }

    async removeFavourite(id:string,currentUser:currentUserData):Promise<void>{
        
        return this.removeUnitFavouriteUsecase.excute(id,currentUser)
    }


    async getFavourite(query:FindUnitFavouriteDto,currentUser:currentUserData):Promise<PaginatedResult<UnitFavouriteResponseDto>>{
        
        return this.findUnitFavouriteUsecase.excute(query,currentUser)
    }
}
