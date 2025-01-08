import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles.enum';

export const AuthRole = (...roles: ValidRoles[]) => {
    return SetMetadata('roles', roles);
};
