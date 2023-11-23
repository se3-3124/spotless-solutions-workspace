/*
  Warnings:

  - Added the required column `consumed` to the `TokenIssued` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenIssued" ADD COLUMN     "consumed" BOOLEAN NOT NULL;
