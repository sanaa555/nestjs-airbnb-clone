import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { CreateCurrencyDto } from "../dtos/create-currency.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";
import { plainToInstance } from "class-transformer";


@Injectable()

export class  CreateCurrencyUsecase{

    constructor(
      
        private readonly currencyRepository:CurrencyRepository
    ){}

    async excute(body:CreateCurrencyDto):Promise<CurrencyResponseDto>{
         // check if currency exist

         const existingCurrency= await this.currencyRepository.findOne({
           name: body.name,
           isDeleted:false
         })

         if(existingCurrency) throw new BadRequestException('currency already exist')

            const currency= await this.currencyRepository.create(body,
            
            )

            return plainToInstance(CurrencyResponseDto,currency.toObject())
    }
}