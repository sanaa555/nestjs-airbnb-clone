import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { CreateCurrencyUsecase } from './use-cases/create-currency.usecase';
import { FindCurrencyByIdUsecase } from './use-cases/find-currency-by-id.usecase';
import { FindAllCurrenciesUsecase } from './use-cases/find-all-curriencies.usecase';
import { FindAllCurriencies } from './dtos/find-all.dto';
import { PaginatedResult } from 'src/common/data-access';
import { DeleteCurrencyUsecase } from './use-cases/soft-delete-currency-usecase';
import { UpdateCurrencyUsecase } from './use-cases/update-currency-usecase';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';

@Injectable()
export class CurrenciesService {
    constructor(
                private readonly createCurrencyUsecase:CreateCurrencyUsecase,
                 private readonly findCurrencyByIdUsecase:FindCurrencyByIdUsecase,
                 private readonly findAllCurrenciesUsecase:FindAllCurrenciesUsecase,
                private readonly deleteCurrencyUsecase:DeleteCurrencyUsecase,
                private readonly updateCurrencyUsecase:UpdateCurrencyUsecase,




        
    ){}

    async create(body:CreateCurrencyDto):Promise<CurrencyResponseDto>{
            return  this.createCurrencyUsecase.excute(body)
        }
    
        async getCurrencyById(id:string):Promise<CurrencyResponseDto>{
            return   this.findCurrencyByIdUsecase.excute(id)
        }
    
        async findAll(query:FindAllCurriencies):Promise<PaginatedResult<CurrencyResponseDto>>{
            return  this.findAllCurrenciesUsecase.excute(query)
        }
    
    
        
        async deleteById(id:string):Promise<void>{
            return  this.deleteCurrencyUsecase.excute(id)
        }
    
    
        async updateById(id:string,body:UpdateCurrencyDto):Promise<CurrencyResponseDto>{
            return  this.updateCurrencyUsecase.excute(id,body)
        }
    
}
