-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StarRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "StarRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StarRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StarRating" ("id", "movieId", "score", "userId") SELECT "id", "movieId", "score", "userId" FROM "StarRating";
DROP TABLE "StarRating";
ALTER TABLE "new_StarRating" RENAME TO "StarRating";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
