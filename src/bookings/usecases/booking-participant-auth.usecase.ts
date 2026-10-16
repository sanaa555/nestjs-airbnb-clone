import { Injectable } from "@nestjs/common";
import { currentUserData } from "src/auth/interfaces/principal.interface";
import { ForbiddenException } from "src/common/errors-handling/custom-exceptions/forbidden.exception";
import { Booking } from "../schemas/booking.schema";
import { HydratedDocument } from "mongoose";

@Injectable()
export class BookingParticipantAuthUsecase {
   
     checkGuestAuth( guest:string,currentUser:string){
        if(guest !== currentUser){
        throw new ForbiddenException('you are not authorized to update this booking')
       }
    }

     checkHostAuth(host:string,currentUser:string){
        if(host !== currentUser){
        throw new ForbiddenException('you are not authorized to update this booking')
       }
    }
}