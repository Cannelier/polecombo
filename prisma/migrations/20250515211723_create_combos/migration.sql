-- CreateTable
CREATE TABLE "Combo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ComboMove" (
    "comboId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    PRIMARY KEY ("comboId", "moveId"),
    CONSTRAINT "ComboMove_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ComboMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
