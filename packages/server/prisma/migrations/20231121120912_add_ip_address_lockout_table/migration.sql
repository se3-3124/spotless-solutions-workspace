-- CreateTable
CREATE TABLE "IpAddressLockoutTable" (
    "id" SERIAL NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "next_attempt" TIMESTAMP(3),

    CONSTRAINT "IpAddressLockoutTable_pkey" PRIMARY KEY ("id")
);
