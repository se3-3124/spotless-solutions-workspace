/*
  Warnings:

  - You are about to drop the `_AccountBindingToCredential` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `credential_id` to the `AccountBinding` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AccountBindingToCredential" DROP CONSTRAINT "_AccountBindingToCredential_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountBindingToCredential" DROP CONSTRAINT "_AccountBindingToCredential_B_fkey";

-- AlterTable
ALTER TABLE "AccountBinding" ADD COLUMN     "credential_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AccountBindingToCredential";

-- AddForeignKey
ALTER TABLE "AccountBinding" ADD CONSTRAINT "AccountBinding_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
