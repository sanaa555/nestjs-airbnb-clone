import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";

@Injectable()

export class FindCurrencyByIdUsecase{
    constructor(
                private readonly currencyRepository:CurrencyRepository    
    ){}

    async excute(id:string):Promise<CurrencyResponseDto>{

        // check if currency exist

        const currency= await this.currencyRepository.findOne({
            _id:id,
            isDeleted:false

        })

        if(!currency) throw new BadRequestException('currency not exist with this id')

            return plainToInstance(CurrencyResponseDto,currency.toObject())

    }
}