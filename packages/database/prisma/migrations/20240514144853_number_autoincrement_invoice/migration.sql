-- AlterTable
CREATE SEQUENCE invoice_number_seq;
ALTER TABLE "Invoice" ALTER COLUMN "number" SET DEFAULT nextval('invoice_number_seq');
ALTER SEQUENCE invoice_number_seq OWNED BY "Invoice"."number";
