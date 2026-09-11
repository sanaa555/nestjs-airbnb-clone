import { PaginatedResult } from "src/common/data-access";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";
import { FindAllCurriencies } from "../dtos/find-all.dto";
import { CurrencyRepository } from "../repository/currency.repository";
import { QueryFilter } from "mongoose";
import { Currency } from "../schema/currency.schema";
import { plainToInstance } from "class-transformer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllCurrenciesUsecase{
    constructor(
                private readonly currencyRepository:CurrencyRepository
        
    ){}

    async excute(query:FindAllCurriencies):Promise <PaginatedResult<CurrencyResponseDto>>{

   const matchQuery:QueryFilter<Currency>= {isDeleted:false}

   if(query?.name) matchQuery.name={$regex:query.name,$options:'i'}
   if(query?.currencyCode) matchQuery.cuurrencyCode=query.currencyCode

   const result= await this.currencyRepository.findPaginated(matchQuery,{
    page:query?.page,
    limit:query?.limit,
    ignoreLimit:query?.ignoreLimit,
    lean:true
   })

        return plainToInstance(PaginatedResult<CurrencyResponseDto>,result)

        

    }
}
 
    

    
  