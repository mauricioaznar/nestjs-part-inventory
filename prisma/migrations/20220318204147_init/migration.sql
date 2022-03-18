-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "part_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "image_url" TEXT,
    "part_category_id" INTEGER NOT NULL,
    "default_generated_quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("part_id")
);

-- CreateTable
CREATE TABLE "PartCategory" (
    "part_category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PartCategory_pkey" PRIMARY KEY ("part_category_id")
);

-- CreateTable
CREATE TABLE "PartAssignment" (
    "parentId" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "requiredQuantity" INTEGER NOT NULL,

    CONSTRAINT "PartAssignment_pkey" PRIMARY KEY ("parentId","componentId")
);

-- CreateTable
CREATE TABLE "PartAddition" (
    "id" SERIAL NOT NULL,
    "part_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PartAddition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartSubtraction" (
    "id" SERIAL NOT NULL,
    "part_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PartSubtraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_part_category_id_fkey" FOREIGN KEY ("part_category_id") REFERENCES "PartCategory"("part_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartAssignment" ADD CONSTRAINT "PartAssignment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartAssignment" ADD CONSTRAINT "PartAssignment_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartAddition" ADD CONSTRAINT "PartAddition_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartSubtraction" ADD CONSTRAINT "PartSubtraction_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;
