import { Injectable } from "@nestjs/common";
import { UnitFavouriteRepository } from "../repositories/unit-favourite.repository";
import { FindUnitFavouriteDto } from "../dtos/find-unit-favourite.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { PipelineStage } from "mongoose";
import { ModelNames, PaginatedResult } from "src/common/data-access";
import { UnitFavouriteResponseDto } from "../dtos/unit-favourite-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindUnitFavouriteUsecase{
    constructor(
        private readonly unitFavouriteRepository:UnitFavouriteRepository
    ){}

    async  excute(query:FindUnitFavouriteDto,currentUser:currentUserData):Promise<PaginatedResult<UnitFavouriteResponseDto>>{
    
       const pipline:PipelineStage[]=[
        {
            $match:{user:currentUser._id.toString()}
        },
        {$sort:{createdAt:-1}},

        {$addFields:{unitObjectId:{$toObjectId:'$unit'}}},
        {
            $lookup:{
                from:ModelNames.UNITS,
                localField:'unitObjectId',
                foreignField:'_id',
                as:'unit'
            }
        },

       {$unwind:'$unit'},
       {$replaceRoot:{newRoot:'$unit'}},
       {$match:{isDeleted:{$ne:true},isActive:{$ne:false}}},
    //    {
    //     $project:{
    //         _id:1,
    //         title:1,
    //         description:1,
    //         photos:1,
    //         costPerDay:1
    //     }
    //    }
       ]

      const result= await this.unitFavouriteRepository.paginatedAggregation<UnitFavouriteResponseDto>(pipline,{
              page:query?.page,
               limit:query.limit,
            ignoreLimit:query?.ignoreLimit,
       }

       )
       
       const transformedData=plainToInstance(UnitFavouriteResponseDto,result.data,{
                  excludeExtraneousValues:true
       })
  
        return new PaginatedResult<UnitFavouriteResponseDto>(
            transformedData,
            result.totalCount,
            result.pageCount,
           result.limit,

        )

        //  return plainToInstance(PaginatedResult<UnitFavouriteResponseDto>,result)


    //   return   await this.unitFavouriteRepository.findPaginated(
    //            {user:currentUser._id.toString()},{
    //             page:query?.page,
    //             limit:query.limit,
    //             ignoreLimit:query?.ignoreLimit,
    //             populate:[{path:'unit' , select:'_id title description costPerDay'}]
    //         }
    //      )

    }
}