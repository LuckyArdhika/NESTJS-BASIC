import { AbilityBuilder, createMongoAbility, InferSubjects, MongoQuery, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { users } from '@prisma/client'
import { Action } from '@/src/auth/casl/casl.enum';

type Subjects = InferSubjects<users> | 'all';
type PossibleAbilities = [Action, Subjects];

export type UserWithRoles = Prisma.usersGetPayload<{
  include: {
    roles: {
      select: {role: true}
    };
  };
}>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserWithRoles) {

    const { can, cannot, build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, MongoQuery>);

    if (user.roles.map(x => x.role.name).includes("Root")) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}