import { Module } from '@nestjs/common';
import { UnitFavouritesService } from './unit-favourites.service';
import { UnitFavouritesController } from './unit-favourites.controller';
import { UnitFavouriteRepository } from './repositories/unit-favourite.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { UnitFavouriteSchema } from './schemas/unit-favourite.schema';
import { AddUnitFavouriteUsecase } from './usecases/add-unit-favourite.usecase';
import { UnitsModule } from 'src/units/units.module';
import { RemoveUnitFavouriteUsecase } from './usecases/remove-unit-favourite.usecase';
import { FindUnitFavouriteUsecase } from './usecases/find-unit-favourite.usecase';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.UNITFAVOURITIES,
    schema:UnitFavouriteSchema
  }]),UnitsModule],
  providers: [UnitFavouritesService,UnitFavouriteRepository,AddUnitFavouriteUsecase,RemoveUnitFavouriteUsecase,FindUnitFavouriteUsecase],
  controllers: [UnitFavouritesController]
})
export class UnitFavouritesModule {}
