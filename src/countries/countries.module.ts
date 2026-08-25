import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schema/country.schema';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { FindCountryByIdUseCase } from './usecases/find-country-ById.usecase';
import { FindAllCountriesUseCase } from './usecases/find-all-countries.usecase';
import { SoftDeleteUseCase } from './usecases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './usecases/update-country.usecase';

@Module({
    imports: [MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])],

  controllers: [CountriesController],
  providers: [CountriesService,CreateCountryUseCase,FindCountryByIdUseCase,FindAllCountriesUseCase,SoftDeleteUseCase,UpdateCountryUseCase]
})
export class CountriesModule {}
