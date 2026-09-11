import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schema/city.schema';
import { ModelNames } from 'src/common/data-access';
import { CountriesModule } from 'src/countries/countries.module';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { FindAllCitiesUseCase } from './use-cases/find-all-cities.usecase';
import { CityRepository } from './repository/city-repository';
import { FindCityByIdUseCase } from './use-cases/find-city-by-id.usecase';
import { UpdateCityUseCase } from './use-cases/update-city.usecase';
import { DeleteCityUseCase } from './use-cases/soft-delete-city.usecase';

@Module({

  imports:[MongooseModule.forFeature([{ name: ModelNames.CITIES, schema: CitySchema }]),CountriesModule],
  providers: [CitiesService,CreateCityUseCase,FindAllCitiesUseCase,CityRepository,FindCityByIdUseCase,UpdateCityUseCase,DeleteCityUseCase],
  controllers: [CitiesController]
})
export class CitiesModule {}
