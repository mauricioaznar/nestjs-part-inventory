/*
  Warnings:

  - Added the required column `part_category_id` to the `Part` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Part" ADD COLUMN     "part_category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PartCategory" (
    "part_category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PartCategory_pkey" PRIMARY KEY ("part_category_id")
);

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_part_category_id_fkey" FOREIGN KEY ("part_category_id") REFERENCES "PartCategory"("part_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
