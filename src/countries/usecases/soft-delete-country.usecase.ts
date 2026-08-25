import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Country } from "../schema/country.schema";
import { Model } from "mongoose";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";


@Injectable()
export class SoftDeleteUseCase{

constructor(

     @InjectModel(Country.name)
                  private readonly countryModel:Model<Country>

){}

async excute(id:string):Promise<void>{

  const existinCountry= await this.countryModel.findOne({ 
    _id:id,
    isDeleted:{$ne:true},
        })
  if(!existinCountry) throw new NotFoundException('no country found fot this id')
   
    await this.countryModel.findByIdAndUpdate(id,{
        isDeleted:true,
        deletedAt:new Date()
    })

}
}