-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deletedAt" TIMESTAMP(3);
