-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "ImageOutput" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "status" "GenerationStatus" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "content" TEXT NOT NULL,
    "image_input_id" BIGINT NOT NULL,
    "image_generation_id" BIGINT NOT NULL,

    CONSTRAINT "ImageOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageInput" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "content" TEXT NOT NULL,
    "image_generation_id" BIGINT NOT NULL,

    CONSTRAINT "ImageInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageGeneration" (
    "id" BIGSERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "status" "GenerationStatus" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "generation_id" BIGINT NOT NULL,
    "conversation_id" BIGINT,

    CONSTRAINT "ImageGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageOutput_id_key" ON "ImageOutput"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageOutput_public_id_key" ON "ImageOutput"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageOutput_image_input_id_key" ON "ImageOutput"("image_input_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageOutput_image_generation_id_key" ON "ImageOutput"("image_generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageInput_id_key" ON "ImageInput"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageInput_public_id_key" ON "ImageInput"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageInput_image_generation_id_key" ON "ImageInput"("image_generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageGeneration_id_key" ON "ImageGeneration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageGeneration_public_id_key" ON "ImageGeneration"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageGeneration_generation_id_key" ON "ImageGeneration"("generation_id");

-- AddForeignKey
ALTER TABLE "ImageOutput" ADD CONSTRAINT "ImageOutput_image_input_id_fkey" FOREIGN KEY ("image_input_id") REFERENCES "ImageInput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageOutput" ADD CONSTRAINT "ImageOutput_image_generation_id_fkey" FOREIGN KEY ("image_generation_id") REFERENCES "ImageGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageInput" ADD CONSTRAINT "ImageInput_image_generation_id_fkey" FOREIGN KEY ("image_generation_id") REFERENCES "ImageGeneration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGeneration" ADD CONSTRAINT "ImageGeneration_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGeneration" ADD CONSTRAINT "ImageGeneration_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
