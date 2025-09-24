/*
  Warnings:

  - You are about to alter the column `status` on the `department` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `TinyInt`.
  - You are about to alter the column `is_deleted` on the `department` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `TinyInt`.
  - You are about to alter the column `status` on the `designation` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `TinyInt`.
  - You are about to alter the column `is_deleted` on the `designation` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `TinyInt`.
  - You are about to alter the column `status` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `TinyInt`.
  - You are about to alter the column `is_deleted` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `department` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_deleted` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `designation` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_deleted` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` MODIFY `status` TINYINT NOT NULL DEFAULT 1,
    MODIFY `is_deleted` TINYINT NOT NULL DEFAULT 0;
