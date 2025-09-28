-- AddForeignKey
ALTER TABLE `Magazine` ADD CONSTRAINT `Magazine_auther_id_fkey` FOREIGN KEY (`auther_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
