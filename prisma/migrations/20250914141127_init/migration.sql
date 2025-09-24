/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_designation_id_fkey`;

-- DropTable
DROP TABLE `admin`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `is_deleted` ENUM('NOT_DELETED', 'DELETED') NOT NULL DEFAULT 'NOT_DELETED',
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `designation_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_designation_id_fkey` FOREIGN KEY (`designation_id`) REFERENCES `Designation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
