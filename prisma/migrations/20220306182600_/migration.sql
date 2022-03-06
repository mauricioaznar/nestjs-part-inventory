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

    CONSTRAINT "Part_pkey" PRIMARY KEY ("part_id")
);

-- CreateTable
CREATE TABLE "PartComponent" (
    "parent_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PartComponent_pkey" PRIMARY KEY ("parent_id","component_id")
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
ALTER TABLE "PartComponent" ADD CONSTRAINT "PartComponent_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartComponent" ADD CONSTRAINT "PartComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartAddition" ADD CONSTRAINT "PartAddition_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartSubtraction" ADD CONSTRAINT "PartSubtraction_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;
