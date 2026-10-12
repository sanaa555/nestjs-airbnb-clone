import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { AppSettingsService } from "src/app-settings/app-settings.service";
import { UnitsService } from "src/units/units.service";
import { BookingCalculationResponseDto } from "../dtos/booking-calculation-response.dto";

@Injectable()
export class BookingCalculationUsecase{
    constructor(
        private readonly unitsService:UnitsService,
        private readonly  appSettingsService:AppSettingsService
    ){}
    async excute(checkIn:number|Date,checkOut:number|Date,unitId:string):Promise<BookingCalculationResponseDto>{

      const daysCount = dayjs(checkOut).diff(dayjs(checkIn),'day')

        const unit= await this.unitsService.findById(unitId)
        const pricePerDay= unit.costPerDay //  100
        const bookingAmount= pricePerDay * daysCount  //100*5=500

        const appSetting= await this.appSettingsService.find()
        const vatAmount = Number((bookingAmount *(appSetting.vatRate/100)).toFixed(2)) //500*(10/100)=50

        const totalAmount=bookingAmount + vatAmount

        return {daysCount,pricePerDay,bookingAmount,
            vat:appSetting.vatRate,
            vatAmount,totalAmount}
    
    }
}