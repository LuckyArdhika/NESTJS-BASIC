import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

export const UseRoles = Reflector.createDecorator<string[]>();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    return allowedRoles.some(x => userRoles.includes(x));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(UseRoles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.roles.map(x => x.role.name));
  }
}