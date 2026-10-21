import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { UnitIdDto } from './dtos/unit-id.dto';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';
import { UnitFavouritesService } from './unit-favourites.service';
import { FindUnitFavouriteDto } from './dtos/find-unit-favourite.dto';

@Controller('unit-favourites')
@Authorize(Roles.USER)
export class UnitFavouritesController {

    constructor(private readonly unitFavouritesService:UnitFavouritesService){}
    
    @Post('/:unitId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async addFavourite(
        @Param() param:UnitIdDto,
        @CurrentAccount() principale :Principale
    ):Promise<void>{
         return this.unitFavouritesService.addFavourite(param.unitId,principale.user)
    }


    @Delete('/:unitId')
    async deleteFavourite(
        @Param() param:UnitIdDto,
        @CurrentAccount() principale :Principale
    ){
         return this.unitFavouritesService.removeFavourite(param.unitId,principale.user)

    }

    @Get()
    async getFavourite( @Query() query:FindUnitFavouriteDto,
        @CurrentAccount() principale :Principale
){
             return this.unitFavouritesService.getFavourite(query,principale.user)

}


}
