import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/data-access/base-repository";
import { HydratedDocument, Model } from "mongoose";
import { ModelNames } from "src/common/data-access/model-names.enum";
import { InjectModel } from "@nestjs/mongoose";
import { UnitReviews } from "../schemas/unit-reviews.schema";


@Injectable()

export class UnitReviewsRepository extends BaseRepository<UnitReviews> {

    constructor(
        
                @InjectModel(ModelNames.UNITREVIEWS)
                private readonly unitReviewsModel:Model< HydratedDocument<UnitReviews>>


    ) {
        super(unitReviewsModel);
    }




}