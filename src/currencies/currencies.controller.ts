import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { CurrenciesService } from './currencies.service';
import { CurrencyIdDto } from './dtos/currency-id.dto';
import { FindAllCurriencies } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/common/swagger';
import { CreateCurrencySwagger } from './swagger/create-currency.swagger';
import { DeleteCurrencySwagger } from './swagger/delete-currency.swagger';
import { FindAllCurrenciesSwagger } from './swagger/find-all-currencies.swagger';
import { FindCurrencyByIdSwagger } from './swagger/find-currency-by-id.swagger';
import { UpdateCurrencySwagger } from './swagger/update-currency.swagger';

@ApiTags(API_TAGS.CURRENCIES)
@Controller('currencies')
export class CurrenciesController {
  constructor(
    private readonly currenciesService:CurrenciesService
  ){}
    @CreateCurrencySwagger()
    @Post()
    async createCurrency(@Body() body:CreateCurrencyDto):Promise<CurrencyResponseDto>{

        return this.currenciesService.create(body)

    }

    @FindCurrencyByIdSwagger()
    @Get('/:id')
        async getCurrencyById(@Param() param:CurrencyIdDto):Promise <CurrencyResponseDto>{
    
            return   this.currenciesService.getCurrencyById(param.id)
    
        }
    
    
         @FindAllCurrenciesSwagger()
         @Get()
        async findAll(@Query() query:FindAllCurriencies):Promise <PaginatedResult<CurrencyResponseDto>>{
    
            return   this.currenciesService.findAll(query)
    
        }
    
    
        @DeleteCurrencySwagger()
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async deleteCurrencyById(@Param() param:CurrencyIdDto):Promise <void>{
    
            return   this.currenciesService.deleteById(param.id)
    
        }
    
    
        @UpdateCurrencySwagger()
        @Patch('/:id')
        async updateCurrencyById(@Param() param:CurrencyIdDto,@Body() body:UpdateCurrencyDto):Promise <CurrencyResponseDto>{
    
            return   this.currenciesService.updateById(param.id,body)
        }
    }
    

