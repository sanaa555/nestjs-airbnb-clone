import { Injectable } from "@nestjs/common";
import { UnitReviewsRepository } from "../repositories/unit-reviews.repository";
import { CreateUnitReviewDto } from "../dtos/create-unit-review.dto";
import { ClientSession } from "mongoose";

@Injectable()
export class CreateUnitReviewUsecase{
    constructor( 
        private readonly unitReviewsRepository :UnitReviewsRepository
    ){}

    async excute(body:CreateUnitReviewDto,session?:ClientSession):Promise<void>{

        await this.unitReviewsRepository.create(body,{session})
    }
    
}