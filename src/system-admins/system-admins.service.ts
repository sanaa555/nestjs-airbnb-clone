import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitializeSystemAdminUseCase } from './usecases/initialize-system-admin.usecase';
import { FindOneSystemAdminUseCase } from './usecases/findone.usecase';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from './schemas/system-admin.schema';
import { SystemAdminResponseDto } from './dtos/system-dmin-response.dto';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
    constructor(
        private readonly initializeSystemAdminUseCase:InitializeSystemAdminUseCase,
        private readonly findOneSystemAdminUseCase:FindOneSystemAdminUseCase
    ){}
  async  onModuleInit(){

        console.log('SystemAdminsService OnModuleInit')
            await this.initializeSystemAdminUseCase.excute();

    }

    async findone(query:QueryFilter<SystemAdmin>):Promise<SystemAdminResponseDto>{

        return this.findOneSystemAdminUseCase.excute(query)

    }


}
