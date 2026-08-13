import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { BaseCustomException } from "../custom-exceptions/base-custom.exception";
import { I18n, I18nService, I18nValidationException } from "nestjs-i18n";
import { formatInputValidationError } from "../input-validation/format-input-validation-errors";


@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
        constructor (private i18nServices: I18nService) {}
    
    catch(exception:any,host:ArgumentsHost) {

        const response =host.switchToHttp().getResponse<Response>();
        // Handle custom exceptions that inherit from BaseCustomException
        if(exception instanceof BaseCustomException){

            return response.status(exception.status).send({
                errors: exception.formateError(),
            })


                  }

                  // Handle input validation errors from (class-validator(Dtos)) )

                  if(exception instanceof I18nValidationException){

                    const formattedErrors=formatInputValidationError(exception.errors,this.i18nServices,host)

                    return response.status(400).send({
                        errors:formattedErrors
                    })
                  }

                   // unknown exception

            response.status(500).json({
                errors:[{
                    message: 'Internal Server Error',
                }]
            })
 
            
        
    }

}