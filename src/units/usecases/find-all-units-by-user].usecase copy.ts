import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { plainToInstance } from "class-transformer";
import { PaginatedResult } from "src/common/data-access";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { QueryFilter, Types } from "mongoose";
import { Unit } from "../schema/unit.schema";
import { FindAllDto } from "../dtos/find-all-units.dto";
import { currentUserData } from "src/auth/interfaces/principal.interface";

@Injectable()
export class FindAllUnitsByUserUsacase{
    constructor(
        private readonly unitRepository:UnitRepository
    ){}

    async excute(query:FindAllDto,currentUser:currentUserData):Promise<PaginatedResult<UnitResponseDto>>{
        const matchquery:QueryFilter<Unit>={
            isDeleted:{$ne:true},
            user:currentUser._id.toString()
        }

        if(query?.title) matchquery.title={$regex:query.title,$options:'i'}
        if(query?.country) matchquery.country=query.country
        if(query?.city) matchquery.city=query.city

        const result= await this.unitRepository.findPaginated(matchquery,{
            limit:query?.limit,
            page:query?.page,
            ignoreLimit:query?.ignoreLimit,
            lean:true
        })

    return plainToInstance(PaginatedResult<UnitResponseDto>,result)

    }
}