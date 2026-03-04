/*
  Warnings:

  - You are about to drop the column `sellerId` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_sellerId_fkey";

-- DropIndex
DROP INDEX "categories_name_sellerId_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "sellerId";

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
