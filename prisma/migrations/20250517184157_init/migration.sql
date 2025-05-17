-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Move" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "tech_value" REAL NOT NULL
);

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
    CONSTRAINT "ComboMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ComboMove_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
