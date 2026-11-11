

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../guards/jwt-auth.guard';
import type { currentUserData, Iprincipal } from '../interfaces/principal.interface';
import { Roles } from 'src/common/constants';
import { ApiProperty } from '@nestjs/swagger';

export const CurrentAccount = createParamDecorator((data:unknown,context:ExecutionContext)=>{
    const request=context.switchToHttp().getRequest<RequestWithUser>()
    if(! request) return null;
    const {user,role}=request.principale
        return new Principale(user,role)


}

);

export class Principale implements Iprincipal{

    @ApiProperty({
      description: 'Identity of the authenticated account.',
      type: 'object',
      required: ['_id', 'name', 'email'],
      properties: {
        _id: { type: 'string', example: '60d21b4967d0d8992e610c85' },
        name: { type: 'string', example: 'JOHN DOE' },
        email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
      },
    })
    user: currentUserData;

    @ApiProperty({
      description: 'Role of the authenticated account.',
      enum: Roles,
      example: Roles.USER,
    })
    role: Roles;

    constructor(
      user: currentUserData,
      role: Roles
    ) {
      this.user = user;
      this.role = role;
    }
}