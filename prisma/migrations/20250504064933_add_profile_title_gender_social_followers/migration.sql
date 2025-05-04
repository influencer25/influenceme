/*
  Warnings:

  - Added the required column `gender` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagramFollowers` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiktokFollowers` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtubeFollowers` to the `InfluencerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InfluencerProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "instagramFollowers" TEXT NOT NULL,
    "youtube" TEXT,
    "youtubeFollowers" TEXT NOT NULL,
    "tiktok" TEXT,
    "tiktokFollowers" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "rate" REAL NOT NULL,
    "topCreator" BOOLEAN NOT NULL DEFAULT false,
    "respondsFast" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "InfluencerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InfluencerProfile" ("bio", "city", "country", "followers", "id", "instagram", "rate", "respondsFast", "tiktok", "topCreator", "userId", "youtube") SELECT "bio", "city", "country", "followers", "id", "instagram", "rate", "respondsFast", "tiktok", "topCreator", "userId", "youtube" FROM "InfluencerProfile";
DROP TABLE "InfluencerProfile";
ALTER TABLE "new_InfluencerProfile" RENAME TO "InfluencerProfile";
CREATE UNIQUE INDEX "InfluencerProfile_userId_key" ON "InfluencerProfile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
