-- CreateTable
CREATE TABLE `Magazine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `magazine_name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `publish_date` DATETIME(3) NULL,
    `auther` VARCHAR(191) NULL,
    `short_description` VARCHAR(191) NULL,
    `duration` INTEGER NULL,
    `image` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
