import { Injectable } from '@nestjs/common';
import { CreateUnitUsecase } from './usecases/create-unit.usecase';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { currentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto ';
import { UpdateUnitUsecase } from './usecases/update-unit.usecase';

@Injectable()
export class UnitsService {

    constructor(
        private readonly createUnitUsecase:CreateUnitUsecase,
        private readonly updateUnitUsecase:UpdateUnitUsecase,
    ){}


    async create(body:CreateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        return await this.createUnitUsecase.excute(body,currentUser)
    }

    async update(id:string,body:UpdateUnitDto,currentUser:currentUserData):Promise <UnitResponseDto>{

        return await this.updateUnitUsecase.excute(id,body,currentUser)
    }
}
