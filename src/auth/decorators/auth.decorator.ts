import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "src/auth/guards/user-role/user-role.guard";
import { ValidRoles } from "../interfaces/valid-roles.enum";
import { AuthRole } from "./auth-role.decorator";

export const Auth = (...roles: ValidRoles[]) => {
    return applyDecorators(
        AuthRole(...roles), // ? Sets roles in context
        UseGuards( AuthGuard(), UserRoleGuard ) // ? Default AuthGuard strategy is JWT
    );
};
