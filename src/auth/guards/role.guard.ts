import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { SetMetadata } from '@nestjs/common';

export enum Roles {
  admin = 'admin',
  member = 'member'
}; 

export const ROLES_KEY = 'roles';
export const UseRoles = (...roles) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    return allowedRoles.some(x => userRoles.includes(x));
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(requiredRoles.flat(), user.roles.map(x => x.role.name));
  }
}