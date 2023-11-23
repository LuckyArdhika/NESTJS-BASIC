-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_updatedBy_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verifiedEmail" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "users_roles" ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
