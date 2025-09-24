/*
  Warnings:

  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `dob` DATE NULL,
    ADD COLUMN `first_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `middle_name` VARCHAR(100) NULL,
    ADD COLUMN `role` VARCHAR(20) NOT NULL DEFAULT 'USER';
