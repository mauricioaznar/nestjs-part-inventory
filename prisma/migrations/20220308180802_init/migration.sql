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
    "parent_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PartAssignment_pkey" PRIMARY KEY ("parent_id","component_id")
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
ALTER TABLE "PartAssignment" ADD CONSTRAINT "PartAssignment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartAssignment" ADD CONSTRAINT "PartAssignment_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartAddition" ADD CONSTRAINT "PartAddition_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartSubtraction" ADD CONSTRAINT "PartSubtraction_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;
