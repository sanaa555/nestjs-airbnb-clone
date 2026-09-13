import { Module } from '@nestjs/common';
import { SystemAdminsService } from './system-admins.service';
import { SystemAdminRepository } from './repositories/system-admins.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdminSchema } from './schemas/system-admin.schema';
import { ModelNames } from 'src/common/data-access';
import { InitializeSystemAdminUseCase } from './usecases/initialize-system-admin.usecase';
import { FindOneSystemAdminUseCase } from './usecases/findone.usecase';

@Module({
  imports:[MongooseModule.forFeature([
    {
      schema:SystemAdminSchema,
      name:ModelNames.SYSTEM_ADMINS
    }
  ])],
  providers: [SystemAdminsService,SystemAdminRepository,InitializeSystemAdminUseCase,FindOneSystemAdminUseCase],
  exports:[SystemAdminsService]
})

export class SystemAdminsModule {}
