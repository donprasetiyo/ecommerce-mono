-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address_line_1" TEXT,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "currency_code" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "postal_code" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
