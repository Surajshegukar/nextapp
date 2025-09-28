/*
  Warnings:

  - You are about to drop the column `category` on the `magazine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `magazine` DROP COLUMN `category`,
    ADD COLUMN `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Magazine` ADD CONSTRAINT `Magazine_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
