/*
  Warnings:

  - You are about to drop the column `quantity` on the `PartAssignment` table. All the data in the column will be lost.
  - Added the required column `required_quantity` to the `PartAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartAssignment" RENAME COLUMN "quantity" TO "required_quantity";
