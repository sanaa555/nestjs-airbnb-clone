import { Module } from '@nestjs/common';
import { UnitFavouritesService } from './unit-favourites.service';
import { UnitFavouritesController } from './unit-favourites.controller';
import { UnitFavouriteRepository } from './repositories/unit-favourite.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { UnitFavouriteSchema } from './schemas/unit-favourite.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.UNITFAVOURITIES,
    schema:UnitFavouriteSchema
  }])],
  providers: [UnitFavouritesService,UnitFavouriteRepository],
  controllers: [UnitFavouritesController]
})
export class UnitFavouritesModule {}
