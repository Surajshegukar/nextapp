/*
  Warnings:

  - You are about to drop the `tbl_admins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `tbl_admins`;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
