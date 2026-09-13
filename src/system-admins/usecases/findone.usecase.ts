import { Injectable } from "@nestjs/common";
import { SystemAdminRepository } from "../repositories/system-admins.repository";
import { QueryFilter } from "mongoose";
import { SystemAdmin } from "../schemas/system-admin.schema";
import { SystemAdminResponseDto } from "../dtos/system-dmin-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneSystemAdminUseCase{
    constructor(
        private readonly systemAdminRepository:SystemAdminRepository
    ){}

    async excute(query:QueryFilter<SystemAdmin>):Promise<SystemAdminResponseDto>{

         const systemAdmin= await this.systemAdminRepository.findOne(query)


            return plainToInstance(SystemAdminResponseDto,systemAdmin)

    }
}