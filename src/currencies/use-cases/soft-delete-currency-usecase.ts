import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class DeleteCurrencyUsecase{
    constructor(
                private readonly currencyRepository:CurrencyRepository
        
    ){}

    async excute(id:string):Promise<void>{

        // check if currency exist
        const existinCity= await this.currencyRepository.findOne({
            _id:id,
            isDeleted:false
        })

        if(!existinCity) throw new BadRequestException('currency not found')

            await this.currencyRepository.findByIdAndUpdate(id,{
        isDeleted:true,
        deletedAt:new Date()
    })


    }
}