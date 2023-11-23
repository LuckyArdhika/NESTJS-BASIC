import { hash } from "@/src/EnH/hash.fn-service";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const adminRoleId = '2a2ee05e-826f-423a-a9ea-cb2cad4bdc60';
export const memberRoleId = '2a2ee05e-826f-423a-a9ea-cb2cad4bdc61';

export const systemUserId = '1a2ee05e-826f-423a-a9ea-cb2cad4bdc59';

export async function seedUser(tx: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">){
  console.log("seedUser(): Seeding user....");

  const env = process.env.NODE_ENV;
  if (env == 'production') {

  } else if (env == 'development' || env == 'local') { // used in local env
    await tx.users.createMany({data: [
      { // dummy user
        id: systemUserId,
        email: `system@${process.env.APP_NAME}.com`,
        firstName: "System",
        password: hash("1a2ee05e-826f-423a-a9ea-cb2cad4928768909387678932876832uyeghjwsieuy8239u"),
        username: "system",
      }, {
        id: '1a2ee05e-826f-423a-a9ea-cb2cad4bdc60',
        email: `admin@${process.env.APP_NAME}.com`,
        firstName: "Admin",
        password: hash(".Password1"),
        username: "admin",
      }, {
        id: '1a2ee05e-826f-423a-a9ea-cb2cad4bdc61',
        email: `member@${process.env.APP_NAME}.com`,
        firstName: "Member",
        password: hash(".Password1"),
        username: "member"  
      }
    ]});

    await tx.roles.createMany({
      data: [
        {
          id: '2a2ee05e-826f-423a-a9ea-cb2cad4bdc60',
          name: "admin",
          description: "Admin role, has permission for all route"
        },
        {
          id: '2a2ee05e-826f-423a-a9ea-cb2cad4bdc61',
          name: "member",
          description: "Member role, has permission for regular route"
        }
      ]
    });

    await tx.users_roles.createMany({
      data: [
        {
          createdBy: '1a2ee05e-826f-423a-a9ea-cb2cad4bdc60',
          roleId: '2a2ee05e-826f-423a-a9ea-cb2cad4bdc60',
          userId: '1a2ee05e-826f-423a-a9ea-cb2cad4bdc60'
        },
        {
          createdBy: '1a2ee05e-826f-423a-a9ea-cb2cad4bdc60',
          roleId: '2a2ee05e-826f-423a-a9ea-cb2cad4bdc61',
          userId: '1a2ee05e-826f-423a-a9ea-cb2cad4bdc61'
        }
      ]
    });
  } else if (env == 'test') {

  }

  console.log("[+] seedUser(): OK!")
}