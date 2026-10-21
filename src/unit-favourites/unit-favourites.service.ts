import { Injectable } from '@nestjs/common';
import { currentUserData } from 'src/auth/interfaces/principal.interface';
import { FindUnitFavouriteDto } from './dtos/find-unit-favourite.dto';
import { AddUnitFavouriteUsecase } from './usecases/add-unit-favourite.usecase';

@Injectable()
export class UnitFavouritesService {

    constructor(
         private readonly addUnitFavouriteUsecase:AddUnitFavouriteUsecase
    ){

    }

    async addFavourite(id:string,currentUser:currentUserData):Promise<void>{
        
        return this.addUnitFavouriteUsecase.excute(id,currentUser)
    }

    async removeFavourite(id:string,currentUser:currentUserData){
        
        return undefined
    }


    async getFavourite(query:FindUnitFavouriteDto,currentUser:currentUserData){
        
        return undefined
    }
}
