import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/data-access/base-repository";
import { HydratedDocument, Model } from "mongoose";
import { ModelNames } from "src/common/data-access/model-names.enum";
import { InjectModel } from "@nestjs/mongoose";
import { UnitFavourite } from "../schemas/unit-favourite.schema";


@Injectable()

export class UnitFavouriteRepository extends BaseRepository<UnitFavourite> {

    constructor(
        
                @InjectModel(ModelNames.UNITFAVOURITIES)
                private readonly unitFavouriteModel:Model< HydratedDocument<UnitFavourite>>


    ) {
        super(unitFavouriteModel);
    }




}