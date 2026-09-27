import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';
import { UnitsService } from './units.service';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { UpdateUnitDto } from './dtos/update-unit.dto ';
import { UnitIdDto } from './dtos/unit-id.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllDto } from './dtos/find-all-units.dto';

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
    @Public()
    @Get()
    async findAll(@Query() query:FindAllDto):Promise<PaginatedResult<UnitResponseDto>>{
        return this.unitsService.findAll(query)

    }

    @Authorize(Roles.USER)
     @Get('/my-units')
     async findAllByUser(@Query() query:FindAllDto,@CurrentAccount() principale:Principale):Promise<PaginatedResult<UnitResponseDto>>{

        return this.unitsService.findAllByUser(query,principale.user)
     }

     @Public()
    @Get('/:id')
     async findById ( @Param()param:UnitIdDto):Promise<UnitResponseDto>{
         return this.unitsService.findById(param.id)
     }

     
}
