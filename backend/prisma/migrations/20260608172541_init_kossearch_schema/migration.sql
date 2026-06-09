-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SEEKER', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "KosType" AS ENUM ('PUTRA', 'PUTRI', 'CAMPUR');

-- CreateEnum
CREATE TYPE "KosStatus" AS ENUM ('ACTIVE', 'HIDDEN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SEEKER',
    "phone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Semarang',
    "price" INTEGER NOT NULL,
    "type" "KosType" NOT NULL,
    "availableRooms" INTEGER NOT NULL DEFAULT 0,
    "status" "KosStatus" NOT NULL DEFAULT 'ACTIVE',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KosFacility" (
    "kosId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,

    CONSTRAINT "KosFacility_pkey" PRIMARY KEY ("kosId","facilityId")
);

-- CreateTable
CREATE TABLE "SavedKos" (
    "userId" TEXT NOT NULL,
    "kosId" TEXT NOT NULL,

    CONSTRAINT "SavedKos_pkey" PRIMARY KEY ("userId","kosId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "kosId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KosImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kosId" TEXT NOT NULL,

    CONSTRAINT "KosImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- AddForeignKey
ALTER TABLE "Kos" ADD CONSTRAINT "Kos_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KosFacility" ADD CONSTRAINT "KosFacility_kosId_fkey" FOREIGN KEY ("kosId") REFERENCES "Kos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KosFacility" ADD CONSTRAINT "KosFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedKos" ADD CONSTRAINT "SavedKos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedKos" ADD CONSTRAINT "SavedKos_kosId_fkey" FOREIGN KEY ("kosId") REFERENCES "Kos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_kosId_fkey" FOREIGN KEY ("kosId") REFERENCES "Kos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KosImage" ADD CONSTRAINT "KosImage_kosId_fkey" FOREIGN KEY ("kosId") REFERENCES "Kos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
