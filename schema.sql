-- Zero Gravity Tours Database Schema (PostgreSQL for Supabase)
-- You can copy and paste this entire script directly into the Supabase SQL Editor to create your tables.

-- 1. Create User Table (Mirrors Supabase Auth Users)
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "avatarUrl" TEXT,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- 2. Create LoginHistory Table
CREATE TABLE "LoginHistory" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

-- 3. Create Trip Table
CREATE TABLE "Trip" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "tagline" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "duration" TEXT NOT NULL,
  "maxSeats" INTEGER NOT NULL,
  "filledSeats" INTEGER NOT NULL DEFAULT 0,
  "departureDate" TIMESTAMP(3) NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "badge" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Published',
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
  "highlights" TEXT NOT NULL,
  "itinerary" TEXT NOT NULL,
  "included" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Trip_slug_key" ON "Trip"("slug");

-- 4. Create Departure Table
CREATE TABLE "Departure" (
  "id" TEXT NOT NULL,
  "tripId" TEXT NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "time" TEXT NOT NULL,
  "seatsLeft" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Open',
  PRIMARY KEY ("id")
);

-- 5. Create Enquiry Table
CREATE TABLE "Enquiry" (
  "id" TEXT NOT NULL,
  "tripId" TEXT,
  "packageId" TEXT,
  "userName" TEXT NOT NULL,
  "userEmail" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Pending',
  "requestedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "message" TEXT,
  PRIMARY KEY ("id")
);

-- 6. Create Notification Table
CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

-- 7. Create ContactMessage Table
CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

-- 8. Create Package Table
CREATE TABLE "Package" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "tagline" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "tierBadge" TEXT NOT NULL,
  "bundlePrice" INTEGER NOT NULL,
  "duration" TEXT NOT NULL,
  "maxSeats" INTEGER NOT NULL,
  "filledSeats" INTEGER NOT NULL DEFAULT 0,
  "imageUrl" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Published',
  "itinerary" TEXT NOT NULL,
  "inclusions" TEXT NOT NULL,
  "includedTripIds" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- 9. Add Foreign Key Constraints
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Departure" ADD CONSTRAINT "Departure_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
