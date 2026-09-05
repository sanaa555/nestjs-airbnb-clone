import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  CountrySchema } from './schema/country.schema';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { FindCountryByIdUseCase } from './usecases/find-country-ById.usecase';
import { FindAllCountriesUseCase } from './usecases/find-all-countries.usecase';
import { SoftDeleteUseCase } from './usecases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './usecases/update-country.usecase';
import { ModelNames } from 'src/common/data-access';
import { CountryRepository } from './repository/country.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: ModelNames.COUNTRIES, schema: CountrySchema }])],

  controllers: [CountriesController],
  providers: [CountriesService,CreateCountryUseCase,FindCountryByIdUseCase,FindAllCountriesUseCase,SoftDeleteUseCase,UpdateCountryUseCase,CountryRepository]
})
export class CountriesModule {}
