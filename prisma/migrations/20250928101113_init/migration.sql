/*
  Warnings:

  - You are about to drop the column `department_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `designation_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `designation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `designation` DROP FOREIGN KEY `Designation_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_designation_id_fkey`;

-- DropIndex
DROP INDEX `User_department_id_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_designation_id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `department_id`,
    DROP COLUMN `designation_id`,
    DROP COLUMN `dob`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `middle_name`,
    DROP COLUMN `role`,
    DROP COLUMN `username`,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `full_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `short_description` TEXT NULL;

-- DropTable
DROP TABLE `designation`;
