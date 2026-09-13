import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Injectable } from "@nestjs/common";
import { SystemAdmin } from "../schemas/system-admin.schema";

@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin>{
    constructor(
        @InjectModel(ModelNames.SYSTEM_ADMINS)
        private readonly systemAdminModel:Model<HydratedDocument<SystemAdmin>>
    ){
        super(systemAdminModel)
    }

}