import { Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { Roles } from "src/common/constants";
import { loginAsUserUseCase } from "./login-as-user.usecase";
import { LoginAsSystemAdminUseCase } from "./login-as-system-admin.usecase";


@Injectable()
export class loginUseCase{


    constructor(
        private readonly loginAsUserUseCase:loginAsUserUseCase,
        private readonly loginAsSystemAdminUseCase:LoginAsSystemAdminUseCase,

    ){}

    async excute (body:LoginDto):Promise<AuthResponseDto>{

        if(body.role.includes(Roles.USER)){
           
              return  this.loginAsUserUseCase.excute(body)

        }

        // login as systemAdmin
                      return  this.loginAsSystemAdminUseCase.excute(body)

            

            
    
            }
         

}