import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from './schema/currency.schema';
import { ModelNames } from 'src/common/data-access';
import { CreateCurrencyUsecase } from './use-cases/create-currency.usecase';
import { FindAllCurrenciesUsecase } from './use-cases/find-all-curriencies.usecase';
import { FindCurrencyByIdUsecase } from './use-cases/find-currency-by-id.usecase';
import { DeleteCurrencyUsecase } from './use-cases/soft-delete-currency-usecase';
import { UpdateCurrencyUsecase } from './use-cases/update-currency-usecase';
import { CurrencyRepository } from './repository/currency.repository';

@Module({
      imports: [MongooseModule.forFeature([{ name: ModelNames.Curriencies, schema: CurrencySchema }])],
  
  controllers: [CurrenciesController],
  providers: [CurrencyRepository,CurrenciesService,CreateCurrencyUsecase,FindAllCurrenciesUsecase,FindCurrencyByIdUsecase,DeleteCurrencyUsecase,UpdateCurrencyUsecase]
})
export class CurrenciesModule {}
