import { BaseRepository, ModelNames } from "src/common/data-access";
import { Unit } from "../schema/unit.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";



export class UnitRepository extends BaseRepository<Unit>{
constructor(
        @InjectModel(ModelNames.UNITS)
        private readonly unitModel:Model<HydratedDocument<Unit>>
    ){
        super(unitModel)
    }    
}