import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get('roles', context.getHandler() );

    
    if( !validRoles || validRoles.length === 0 )
      return true;
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if( !user )
      throw new InternalServerErrorException('User not found. Contact your administrator.')

    for( let role in user.roles ) {
      if( validRoles.includes( role ) )
        return true
    }

    throw new ForbiddenException(`User ${ user.fullName } requires the following role(s): [${validRoles}]`);
  }
}
