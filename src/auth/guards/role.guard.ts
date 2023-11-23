import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

export enum Roles {
  admin = 'admin',
  member = 'member'
}; 

export const UseRoles = Reflector.createDecorator<string[]>();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    // console.log(allowedRoles, userRoles)
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