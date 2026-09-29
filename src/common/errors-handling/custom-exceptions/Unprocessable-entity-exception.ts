import { HttpStatus } from "@nestjs/common";
import { BaseCustomException } from "./base-custom.exception";

export class UnprocessableEntityException extends BaseCustomException{
    status=HttpStatus. UNPROCESSABLE_ENTITY;

    constructor(message: string){
        super(message);
    }
}