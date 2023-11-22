import { UserWithRoles } from '@/src/auth/casl/casl-ability.factory';

declare module 'express' {
  interface Request {
    user: UserWithRoles;
  }
}