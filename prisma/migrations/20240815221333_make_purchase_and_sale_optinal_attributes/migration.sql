-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_saleId_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "saleId" DROP NOT NULL,
ALTER COLUMN "purchaseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
