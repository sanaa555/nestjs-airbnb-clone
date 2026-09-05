import { Injectable } from "@nestjs/common";
import { Country } from "../schema/country.schema";
import { BaseRepository } from "src/common/data-access/base-repository";
import { HydratedDocument, Model } from "mongoose";
import { ModelNames } from "src/common/data-access/model-names.enum";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()

export class CountryRepository extends BaseRepository<Country> {

    constructor(
        
                @InjectModel(ModelNames.COUNTRIES)
                private readonly countryModel:Model< HydratedDocument<Country>>


    ) {
        super(countryModel);
    }




}