import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import {Request} from 'express'
import { UnAuthorizedException } from 'src/common/errors-handling/custom-exceptions/un-authorized-exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { SystemAdminsService } from 'src/system-admins/system-admins.service';
import { Roles } from 'src/common/constants';
import { UserResponseDto } from 'src/users/dto/user-response-dto';
import { SystemAdminResponseDto } from 'src/system-admins/dtos/system-dmin-response.dto';
import { Iprincipal } from '../interfaces/principal.interface';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
 
 export type RequestWithUser= Request &{
         principale:Iprincipal
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
       private readonly  logger =new Logger(JwtAuthGuard.name)


  constructor(
      private readonly jwtService:JwtService,
     private readonly userService:UsersService,
     private readonly systemAdminsService:SystemAdminsService,
     private readonly reflector:Reflector
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const isPublic= this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
[      context.getHandler(),
  context.getClass()
]    )

  if(isPublic) return true;

    //1-extract token from request header
      
    const request =context.switchToHttp().getRequest<RequestWithUser>()
    const token= request.headers.authorization?.split(' ')[1]
       if(!token) throw new UnAuthorizedException('no token provided')
    //2-verify token
  try{
        //3-if token is valid
       const payload:JwtPayload=   this.jwtService.verify(token)

           //4-build the user object 
   const currentAccount :Iprincipal=   await this.buildCurrentUser(payload)
      //5- attach user object to the request 
       request.principale=currentAccount
  }catch(error){
      this.logger.error(error)
      throw new UnAuthorizedException('invalid token')
  }

    return true;
  }

  private async buildCurrentUser(payload:JwtPayload):Promise<Iprincipal> {
            let currentAccount:UserResponseDto|SystemAdminResponseDto

  if(payload.role===Roles.USER){
      currentAccount = await this.userService.findOne({_id:payload.id})
  }else{
    currentAccount=await this.systemAdminsService.findone({_id:payload.id})}

      if (!currentAccount) {
    throw new UnAuthorizedException('account not found');
  }

     return {
      user:{
       _id: currentAccount._id,
       name: currentAccount.name,
       email: currentAccount.email

      },
      role:payload.role
     }
  
  
 }

}
