-- CreateTable
CREATE TABLE "scaffold_check" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scaffold_check_pkey" PRIMARY KEY ("id")
);
