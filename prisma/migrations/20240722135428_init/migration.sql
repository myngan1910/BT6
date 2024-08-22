-- CreateTable
CREATE TABLE "dangnhap" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "dangnhap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dangki" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "dangki_pkey" PRIMARY KEY ("id")
);
