-- =========================================================================
-- ADD `market` COLUMN TO BANKING DB TABLES
-- Run in the BANKING Supabase SQL Editor.
--
-- Additive only. All existing rows will default to market = 'default'.
-- Safe to run multiple times (uses IF NOT EXISTS guards via DO blocks).
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — add `market` column to every persona/dataset table
-- -------------------------------------------------------------------------

ALTER TABLE profiles          ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE accounts          ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE cards             ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE loans             ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE transactions      ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE support_tickets   ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE support_messages  ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE products          ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';


-- -------------------------------------------------------------------------
-- STEP 2 — indexes on the hot tables for fast market-scoped reads
-- -------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_transactions_market     ON transactions(market);
CREATE INDEX IF NOT EXISTS idx_support_messages_market ON support_messages(market);
CREATE INDEX IF NOT EXISTS idx_products_market         ON products(market);
CREATE INDEX IF NOT EXISTS idx_profiles_market         ON profiles(market);
CREATE INDEX IF NOT EXISTS idx_accounts_market         ON accounts(market);


-- -------------------------------------------------------------------------
-- STEP 3 — verification: every existing row should now show market = 'default'
-- -------------------------------------------------------------------------

SELECT 'profiles' AS table_name,
       COUNT(*) AS total_rows,
       COUNT(*) FILTER (WHERE market = 'default') AS default_rows,
       COUNT(*) FILTER (WHERE market <> 'default') AS non_default_rows
FROM profiles
UNION ALL
SELECT 'accounts', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM accounts
UNION ALL
SELECT 'cards', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM cards
UNION ALL
SELECT 'loans', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM loans
UNION ALL
SELECT 'transactions', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM transactions
UNION ALL
SELECT 'support_tickets', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM support_tickets
UNION ALL
SELECT 'support_messages', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM support_messages
UNION ALL
SELECT 'products', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM products;
