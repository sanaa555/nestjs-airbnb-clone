import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { UpdateCurrencyDto } from "../dtos/update-currency.dto";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";


@Injectable()
export class UpdateCurrencyUsecase{

    constructor(                private readonly currencyRepository:CurrencyRepository
    ){}

    async excute(id:string,body:UpdateCurrencyDto):Promise<CurrencyResponseDto>{
        // check if currency exist 

        const existingCurrency= await this.currencyRepository.findOne({
            _id:id,
            isDeleted:false
        })

        if(!existingCurrency) throw new BadRequestException('currency not found ')
             
            
             if(body?.name){
                        
                    // check if country name alrady exist
                    const existingCurrency= await this.currencyRepository.findOne({
                        name:body.name,
                        isDeleted:false
                        ,
                        _id:{$ne:id}
                    })
                    if(existingCurrency){
                        throw new BadRequestException('currency name already exist ')
                    }
            
            
                    }
            
    
            
                     const updatedCurrency= await this.currencyRepository.findByIdAndUpdate(
                        id,
                        body,
                         )
            
                    return plainToInstance(CurrencyResponseDto,updatedCurrency?.toObject())
            

    }
}