import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';
import { UnitsService } from './units.service';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { UpdateUnitDto } from './dtos/update-unit.dto ';
import { UnitIdDto } from './dtos/unit-id.dto';

@Controller('units')
export class UnitsController {

    constructor(
                private readonly unitsService :UnitsService

    ){}
 
     @Authorize(Roles.USER)
    @Post()
    async create(@Body() body:CreateUnitDto,@CurrentAccount() principale: Principale): Promise<UnitResponseDto>{
        return this.unitsService.create(body,principale.user)
         

    }
         @Authorize(Roles.USER)
         @Patch('/:id')
         async update(@Param() Param:UnitIdDto,@Body() body:UpdateUnitDto,@CurrentAccount() principale: Principale): Promise<UnitResponseDto>{

            return this.unitsService.update(Param.id,body,principale.user)

         }

}
