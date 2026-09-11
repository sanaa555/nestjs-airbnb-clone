import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { AppSettings } from "../schemas/app-settings.schema";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ApppSettingsRepository extends BaseRepository<AppSettings>{
    constructor(
        @InjectModel(ModelNames.APP_SETTINGS)
        private readonly appSettingsModel:Model<HydratedDocument<AppSettings>>
    ){
        super(appSettingsModel)
    }

}