-- CreateEnum
CREATE TYPE "AccountBindingType" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRATOR', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "credential_id" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" SERIAL NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountBinding" (
    "id" SERIAL NOT NULL,
    "type" "AccountBindingType" NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "AccountBinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountBindingToCredential" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_credential_id_key" ON "User"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "AccountBinding_account_id_key" ON "AccountBinding"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountBindingToCredential_AB_unique" ON "_AccountBindingToCredential"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountBindingToCredential_B_index" ON "_AccountBindingToCredential"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountBindingToCredential" ADD CONSTRAINT "_AccountBindingToCredential_A_fkey" FOREIGN KEY ("A") REFERENCES "AccountBinding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountBindingToCredential" ADD CONSTRAINT "_AccountBindingToCredential_B_fkey" FOREIGN KEY ("B") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;
