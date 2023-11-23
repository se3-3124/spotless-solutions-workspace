-- CreateTable
CREATE TABLE "TokenIssued" (
    "id" SERIAL NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TokenIssued_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenIssued" ADD CONSTRAINT "TokenIssued_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
