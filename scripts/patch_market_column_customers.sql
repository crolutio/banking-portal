-- =========================================================================
-- PATCH — add `market` column to banking `customers` table
-- Run in the BANKING Supabase SQL Editor.
--
-- Context: `accounts.customer_id` FKs to a separate `customers` table that
-- mirrors `profiles` for retail customers. The original
-- add_market_column_banking.sql did not include it (the local migration
-- scripts pre-date the customers/accounts_v2 rename in production).
-- =========================================================================

ALTER TABLE customers ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
CREATE INDEX IF NOT EXISTS idx_customers_market ON customers(market);

-- Verify
SELECT 'customers' AS table_name,
       COUNT(*) AS total_rows,
       COUNT(*) FILTER (WHERE market = 'default') AS default_rows,
       COUNT(*) FILTER (WHERE market <> 'default') AS non_default_rows
FROM customers;

-- Show the columns we have on customers — useful to confirm seed_kenya_customers.sql
-- inserts the right shape.
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'customers'
ORDER BY ordinal_position;
