/*
  Warnings:

  - You are about to drop the column `value` on the `purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "value",
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL DEFAULT 0;
