import { HttpStatus } from "@nestjs/common";
import { BaseCustomException } from "./base-custom.exception";


export class TooManyRequestsException extends BaseCustomException {
    status=HttpStatus.TOO_MANY_REQUESTS;
    
        constructor(message: string){
            super(message);
        }
}