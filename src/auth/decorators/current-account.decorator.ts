

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../guards/jwt-auth.guard';
import { currentUserData, Iprincipal } from '../interfaces/principal.interface';
import { Roles } from 'src/common/constants';

export const CurrentAccount = createParamDecorator((data:unknown,context:ExecutionContext)=>{
    const request=context.switchToHttp().getRequest<RequestWithUser>()
    if(! request) return null;
    const {user,role}=request.principale
        return new Principale(user,role)


}

);

export class Principale implements Iprincipal{

    constructor(
      public  user:currentUserData,
      public  role:Roles
    ){}

}