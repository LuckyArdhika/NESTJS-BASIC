import { seedUser } from './user.seed';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma  = new PrismaClient();
const env = process.env.NODE_ENV;

async function main(){
  console.log(`
  ++++++++++++++++++++++++++++
  +++ Environtment: ${env} +++
  ++++++++++++++++++++++++++++
  `);
  console.log("[+] Connecting to the database...");
  await prisma.$connect();
  console.log("[+] Database connected!")

  return prisma.$transaction(async (tx) => {

    await seedUser(tx);
    
  })
}

main()
.catch((e) => {
  console.error("[!!!] Error during seeding", e)
}).then(data => {
  console.log("[+] Successfuly seeding!");
})
.finally(async () => {
await prisma.$disconnect();
});