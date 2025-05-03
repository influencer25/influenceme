-- CreateTable
CREATE TABLE "SocialProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "profilePicUrl" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "socialProfileId" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postedAt" DATETIME NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    CONSTRAINT "Post_socialProfileId_fkey" FOREIGN KEY ("socialProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FollowerSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "socialProfileId" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FollowerSnapshot_socialProfileId_fkey" FOREIGN KEY ("socialProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApiCredential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
