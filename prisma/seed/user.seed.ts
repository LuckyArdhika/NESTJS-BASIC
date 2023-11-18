import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export function seedUser(tx: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">){
  console.log("seedUser(): Seeding user....");

  const env = process.env.NODE_ENV;
  if (env == 'production') {

  } else if (env == 'development') {

  } else if (env == 'text') {

  }

  console.log("[+] seedUser(): OK!")
}