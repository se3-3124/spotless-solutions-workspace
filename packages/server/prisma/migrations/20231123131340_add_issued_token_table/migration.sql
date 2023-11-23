-- CreateTable
CREATE TABLE "IssuedResetTokens" (
    "id" SERIAL NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "consumed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IssuedResetTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IssuedResetTokens" ADD CONSTRAINT "IssuedResetTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
