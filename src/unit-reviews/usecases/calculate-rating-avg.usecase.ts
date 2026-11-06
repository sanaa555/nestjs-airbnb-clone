import { Injectable } from "@nestjs/common";
import { UnitReviewsRepository } from "../repositories/unit-reviews.repository";
import { CalculateRatingAvgAndCountDto } from "../dtos/calculate-rating-avg-and-count.dto";
import { ClientSession } from "mongoose";

@Injectable()
export class CalculateRatingAvgUsecase{
    constructor(private readonly unitReviewsRepository :UnitReviewsRepository){}

    async excute(unitId:string,session?:ClientSession):Promise<CalculateRatingAvgAndCountDto>{
        //    const unitReviews=await this.unitReviewsRepository.find({_id:unitId})

        //    if(unitReviews === 0 ){
        //     return 0
        //    }

        //    const ratingAvg=  unitReviews.reduce((acc,review)=> acc + review.rating,0)/ unitReviews.length

        //    return ratingAvg


        const Result= await this.unitReviewsRepository.aggregate<{
            ratingAvg:number;
            ratingCount:number
        }>([
            {  $match:{ unit:unitId }},
            {
                $group:{
                    _id:'$unit',
                    ratingAvg:{$avg:'$rating'},
                    ratingCount:{$sum:1}
                }
            }
            ,
                {$project:{
                    _id:0,
                    ratingAvg:1,
                    ratingCount:1
                }}
        ],{session})

          if(Result.length===0){
              return{ratingAvg:0,ratingCount:0}
          }

          const {ratingAvg,ratingCount}=Result[0]
        return {ratingAvg,ratingCount}

    }
}