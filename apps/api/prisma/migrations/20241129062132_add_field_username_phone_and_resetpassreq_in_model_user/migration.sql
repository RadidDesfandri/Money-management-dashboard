-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `resetPassReq` DATETIME(3) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL;
