-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "introduction_date" TIMESTAMP(3),
    "sales_discontinuation_date" TIMESTAMP(3),
    "support_discontinuation_date" TIMESTAMP(3),
    "comment" TEXT,
    "is_good" BOOLEAN,
    "is_service" BOOLEAN,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "product_category_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "ProductCategoryClassification" (
    "product_id" INTEGER NOT NULL,
    "product_category_id" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategoryClassification_pkey" PRIMARY KEY ("product_id","product_category_id")
);

-- CreateTable
CREATE TABLE "ProductFeature" (
    "product_feature_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProductFeature_pkey" PRIMARY KEY ("product_feature_id")
);

-- CreateTable
CREATE TABLE "ProductFeatureApplicability" (
    "product_feature_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductFeatureApplicability_pkey" PRIMARY KEY ("product_id","product_feature_id")
);

-- AddForeignKey
ALTER TABLE "ProductCategoryClassification" ADD CONSTRAINT "ProductCategoryClassification_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategoryClassification" ADD CONSTRAINT "ProductCategoryClassification_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "ProductCategory"("product_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureApplicability" ADD CONSTRAINT "ProductFeatureApplicability_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFeatureApplicability" ADD CONSTRAINT "ProductFeatureApplicability_product_feature_id_fkey" FOREIGN KEY ("product_feature_id") REFERENCES "ProductFeature"("product_feature_id") ON DELETE RESTRICT ON UPDATE CASCADE;
