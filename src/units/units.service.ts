import { Injectable } from '@nestjs/common';
import { CreateUnitUsecase } from './usecases/create-unit.usecase';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { currentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto ';
import { UpdateUnitUsecase } from './usecases/update-unit.usecase';
import { FindAllDto } from './dtos/find-all-units.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllUnitsUsacase } from './usecases/find-all-units.usecase';
import { FindUnitByIdUsecase } from './usecases/find-unit-by-id.usecase';

@Injectable()
export class UnitsService {

    constructor(
        private readonly createUnitUsecase:CreateUnitUsecase,
        private readonly updateUnitUsecase:UpdateUnitUsecase,
        private readonly findAllUnitsUsacase:FindAllUnitsUsacase,
        private readonly findUnitByIdUsecase:FindUnitByIdUsecase
    ){}


    async create(body:CreateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        return await this.createUnitUsecase.excute(body,currentUser)
    }

    async update(id:string,body:UpdateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        return await this.updateUnitUsecase.excute(id,body,currentUser)
    }

        async findAll(query:FindAllDto):Promise<PaginatedResult<UnitResponseDto>>{

            return await this.findAllUnitsUsacase.excute(query)

        }

        async  findById(id:string):Promise<UnitResponseDto>{
               return await this.findUnitByIdUsecase.excute(id)
        }

    
}
