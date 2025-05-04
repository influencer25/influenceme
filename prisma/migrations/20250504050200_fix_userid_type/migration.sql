/*
  Warnings:

  - You are about to drop the column `categoryId` on the `InfluencerProfile` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SocialLogin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InfluencerCategory" (
    "influencerId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("influencerId", "categoryId"),
    CONSTRAINT "InfluencerCategory_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "InfluencerProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InfluencerCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiCredential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ApiCredential" ("accessToken", "createdAt", "expiresAt", "id", "platform", "refreshToken", "userId") SELECT "accessToken", "createdAt", "expiresAt", "id", "platform", "refreshToken", "userId" FROM "ApiCredential";
DROP TABLE "ApiCredential";
ALTER TABLE "new_ApiCredential" RENAME TO "ApiCredential";
CREATE TABLE "new_BrandProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "BrandProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BrandProfile" ("company", "description", "id", "industry", "userId", "website") SELECT "company", "description", "id", "industry", "userId", "website" FROM "BrandProfile";
DROP TABLE "BrandProfile";
ALTER TABLE "new_BrandProfile" RENAME TO "BrandProfile";
CREATE UNIQUE INDEX "BrandProfile_userId_key" ON "BrandProfile"("userId");
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "influencerId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Comment_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "InfluencerProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "BrandProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("brandId", "createdAt", "id", "influencerId", "rating", "text") SELECT "brandId", "createdAt", "id", "influencerId", "rating", "text" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_InfluencerProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "youtube" TEXT,
    "tiktok" TEXT,
    "followers" INTEGER NOT NULL,
    "rate" REAL NOT NULL,
    "topCreator" BOOLEAN NOT NULL DEFAULT false,
    "respondsFast" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "InfluencerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InfluencerProfile" ("bio", "followers", "id", "instagram", "location", "rate", "respondsFast", "tiktok", "topCreator", "userId", "youtube") SELECT "bio", "followers", "id", "instagram", "location", "rate", "respondsFast", "tiktok", "topCreator", "userId", "youtube" FROM "InfluencerProfile";
DROP TABLE "InfluencerProfile";
ALTER TABLE "new_InfluencerProfile" RENAME TO "InfluencerProfile";
CREATE UNIQUE INDEX "InfluencerProfile_userId_key" ON "InfluencerProfile"("userId");
CREATE TABLE "new_SocialProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "profilePicUrl" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SocialProfile" ("displayName", "followers", "handle", "id", "lastUpdated", "platform", "profilePicUrl", "userId") SELECT "displayName", "followers", "handle", "id", "lastUpdated", "platform", "profilePicUrl", "userId" FROM "SocialProfile";
DROP TABLE "SocialProfile";
ALTER TABLE "new_SocialProfile" RENAME TO "SocialProfile";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLoginAt" DATETIME,
    "isVerified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "role") SELECT "createdAt", "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "SocialLogin_provider_providerId_key" ON "SocialLogin"("provider", "providerId");
