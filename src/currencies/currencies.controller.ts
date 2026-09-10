import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { CurrenciesService } from './currencies.service';
import { CurrencyIdDto } from './dtos/currency-id.dto';
import { FindAllCurriencies } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(
    private readonly currenciesService:CurrenciesService
  ){}
    @Post()
    async createCurrency(@Body() body:CreateCurrencyDto):Promise<CurrencyResponseDto>{

        return this.currenciesService.create(body)

    }

    @Get('/:id')
        async getCurrencyById(@Param() param:CurrencyIdDto):Promise <CurrencyResponseDto>{
    
            return   this.currenciesService.getCurrencyById(param.id)
    
        }
    
    
         @Get()
        async findAll(@Query() query:FindAllCurriencies):Promise <PaginatedResult<CurrencyResponseDto>>{
    
            return   this.currenciesService.findAll(query)
    
        }
    
    
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async deleteCurrencyById(@Param() param:CurrencyIdDto):Promise <void>{
    
            return   this.currenciesService.deleteById(param.id)
    
        }
    
    
        @Patch('/:id')
        async updateCurrencyById(@Param() param:CurrencyIdDto,@Body() body:UpdateCurrencyDto):Promise <CurrencyResponseDto>{
    
            return   this.currenciesService.updateById(param.id,body)
        }
    }
    

