import {  Injectable } from "@nestjs/common";
import { CitiesService } from "src/cities/cities.service";
import { CountriesService } from "src/countries/countries.service";
import { UnitCategoriesService } from "src/unit-categories/unit-categories.service";
import { CreateUnitDto } from "../dtos/create-unit.dto";
import { AppSettingsService } from "src/app-settings/app-settings.service";
import { UpdateUnitDto } from "../dtos/update-unit.dto ";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class UnitValidationUsecase{
    constructor(
        private readonly appSettingsService:AppSettingsService,
            private readonly citiesService:CitiesService,
         private readonly countriesService:CountriesService,
           private readonly unitCategoriesService:UnitCategoriesService
    ){}

    async excute(body:CreateUnitDto|UpdateUnitDto,currentUnit?: any):Promise<void>{

        
        // validation(unit category,country,city exist)
        //validation makesure costPerday > appsettings.minPrice
        
        const appSettings= await this.appSettingsService.find()
         if(body?.costPerDay < appSettings.minPrice) throw new BadRequestException(`cost per day can not be less than ${appSettings.minPrice}`)
             let city;    
            if(body?.city){
                        
                     city = await this.citiesService.findOne({_id:body.city})
                    if(!city) throw new BadRequestException('city not found')
                }
            let country;
                if(body?.country){
                    
             country = await this.countriesService.findOne({_id:body.country})
            if(!country) throw new BadRequestException('country not found')
                }

                if(currentUnit){
                  // country changed without city
                    if(body.country&&!body.city) throw new BadRequestException('when changing country, city must be provided')
                    // city changed without country
                if(body.city && !body.country){
                    if(city.country.toString() !== currentUnit.country.toString() ) throw new BadRequestException('city does not belong to the current country')
                    }
                        // country + city changed
                        if(body.city && body.country) {
                            if(city.country.toString() !== country._id.toString()) throw new BadRequestException('city does not belong to the selected country')
                        }

                }


            if(city && country){
                         if(city.country.toString() !== body.country.toString()) throw new BadRequestException('city doesnot belong to the selected country')

            }
                 

                if(body?.unitCategory){
                  const unitCategory = await this.unitCategoriesService.findone({_id:body.unitCategory})
                    if(!unitCategory) throw new BadRequestException('unitCategory not found')
                }



            
    }
}