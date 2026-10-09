import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { UnitSchema } from './schema/unit.schema';
import { UnitRepository } from './repositories/unit.repository';
import { SystemAdminsModule } from 'src/system-admins/system-admins.module';
import { CitiesModule } from 'src/cities/cities.module';
import { CountriesModule } from 'src/countries/countries.module';
import { UnitCategoriesModule } from 'src/unit-categories/unit-categories.module';
import { UnitValidationUsecase } from './usecases/unit-validation.usecase';
import { CreateUnitUsecase } from './usecases/create-unit.usecase';
import { AppSettingsModule } from 'src/app-settings/app-settings.module';
import { CheckUnitAuthUsecase } from './usecases/check-unit-auth.usecase';
import { UpdateUnitUsecase } from './usecases/update-unit.usecase';
import { FindoneUnitUsecase } from './usecases/find-one.usecase';
import { FindAllUnitsUsacase } from './usecases/find-all-units.usecase';
import { FindUnitByIdUsecase } from './usecases/find-unit-by-id.usecase';
import { FindAllUnitsByUserUsacase } from './usecases/find-all-units-by-user].usecase copy';
import { DeleteUnitUseCase } from './usecases/soft-delete-unit.usecase';
import { DeActivateUnitUseCase } from './usecases/deactivate-unit.usecase ';
import { ActivateUnitUseCase } from './usecases/activate-unit.usecase ';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { DeleteUnitPhotoUsecase } from './usecases/delete-unit-photo.usecase';
import { UpdateUnitPhotoUsease } from './usecases/update-unit-photo.usecase';
import { S3FileStorageService } from 'src/files-upload/storage/s3/s3-file-storage.service';

@Module({

    imports:[MongooseModule.forFeature([{ name: ModelNames.UNITS, schema: UnitSchema }]),SystemAdminsModule,CitiesModule,CountriesModule,UnitCategoriesModule,AppSettingsModule,FilesUploadModule],
  
  controllers: [UnitsController],
  providers: [UnitsService,UnitRepository,UnitValidationUsecase,CreateUnitUsecase,CheckUnitAuthUsecase,UpdateUnitUsecase,FindoneUnitUsecase,FindAllUnitsUsacase,FindUnitByIdUsecase,FindAllUnitsByUserUsacase,DeleteUnitUseCase,DeActivateUnitUseCase,ActivateUnitUseCase,DeleteUnitPhotoUsecase,UpdateUnitPhotoUsease,S3FileStorageService]
})
export class UnitsModule {}
