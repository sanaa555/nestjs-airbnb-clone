import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Roles } from 'src/common/constants';
import { RequestWithUser } from './jwt-auth.guard';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ForbiddenException } from 'src/common/errors-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
     private readonly reflector:Reflector
     
  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const isPublic = await  this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
      context.getHandler(),
      context.getClass()
    ])
    if(isPublic) return true

     const roles = await this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
     ])

     if(!roles) return true

       // => read role from user who try to access end point
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const principal= request.principale
    const userRole=principal.role

    const canAccess= roles.includes(userRole)
    if(!canAccess) throw new ForbiddenException('you are not allowed to access this resource')

    return true;
  }
}
