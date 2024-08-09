-- DropIndex
DROP INDEX "ProductPrice_product_id_currency_code_from_date_to_date_key";

-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" SET DEFAULT 0;

CREATE EXTENSION btree_gist;

-- Drop the existing constraint if it exists
ALTER TABLE "ProductPrice" DROP CONSTRAINT IF EXISTS unique_price_in_interval;

-- Add the new constraint
ALTER TABLE "ProductPrice" ADD CONSTRAINT unique_price_in_interval EXCLUDE USING gist (
    product_id WITH =,
    currency_code WITH =,
    tstzrange(from_date, to_date, '[]'::text) WITH &&
) WHERE (deleted_at IS NULL);

-- Drop the existing constraint if it exists
ALTER TABLE "Subscription" DROP CONSTRAINT IF EXISTS unique_price_in_interval;

-- Drop the existing constraint if it exists
ALTER TABLE "Subscription" DROP CONSTRAINT IF EXISTS unique_subscription_in_interval;

-- Add the new constraint
ALTER TABLE "Subscription" ADD CONSTRAINT unique_subscription_in_interval EXCLUDE USING gist (
        user_id WITH =,
        tstzrange(starts_at, ends_at, '[]'::text) WITH &&)
        WHERE (deleted_at IS NULL AND status = 'ACTIVE');

