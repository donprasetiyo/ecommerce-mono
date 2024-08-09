/*
  Warnings:

  - A unique constraint covering the columns `[paypal_product_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paypal_plan_id]` on the table `SubscriptionPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_paypal_product_id_key" ON "Product"("paypal_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_paypal_plan_id_key" ON "SubscriptionPlan"("paypal_plan_id");
