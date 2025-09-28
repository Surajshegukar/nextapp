/*
  Warnings:

  - You are about to drop the column `auther` on the `magazine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `magazine` DROP COLUMN `auther`,
    ADD COLUMN `auther_id` VARCHAR(191) NULL;
