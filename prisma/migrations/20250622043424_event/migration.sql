-- AlterTable
ALTER TABLE "events" ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_member" BOOLEAN NOT NULL DEFAULT false;
