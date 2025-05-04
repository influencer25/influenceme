/*
  Warnings:

  - You are about to drop the column `location` on the `InfluencerProfile` table. All the data in the column will be lost.
  - Added the required column `city` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InfluencerProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
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
INSERT INTO "new_InfluencerProfile" ("bio", "followers", "id", "instagram", "rate", "respondsFast", "tiktok", "topCreator", "userId", "youtube") SELECT "bio", "followers", "id", "instagram", "rate", "respondsFast", "tiktok", "topCreator", "userId", "youtube" FROM "InfluencerProfile";
DROP TABLE "InfluencerProfile";
ALTER TABLE "new_InfluencerProfile" RENAME TO "InfluencerProfile";
CREATE UNIQUE INDEX "InfluencerProfile_userId_key" ON "InfluencerProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
