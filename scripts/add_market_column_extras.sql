-- =========================================================================
-- ADD `market` COLUMN TO BANKING DB EXTRA TABLES
-- Run in the BANKING Supabase SQL Editor.
--
-- This patch covers the persona/dataset tables that were not part of the
-- original `add_market_column_banking.sql` migration:
--
--   savings_goals, savings_goal_transactions
--   portfolio_holdings, watchlist, risk_profiles
--   reward_profiles, reward_activities, reward_redemptions, reward_catalog
--
-- All existing rows back-fill to market = 'default' (UAE) so the legacy
-- Sarah / Mohammed / Emma / Raj data continues to render unchanged. The
-- Kenya seeds (seed_kenya_savings_goals.sql, seed_kenya_investments.sql,
-- seed_kenya_rewards.sql) write rows with market = 'kenya'.
--
-- Safe to run multiple times — ALTER ... IF NOT EXISTS guards everything.
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — add `market` column to every "extra" persona/dataset table
-- -------------------------------------------------------------------------

ALTER TABLE savings_goals              ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE savings_goal_transactions  ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';

ALTER TABLE portfolio_holdings         ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE watchlist                  ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE risk_profiles              ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';

ALTER TABLE reward_profiles            ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE reward_activities          ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE reward_redemptions         ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE reward_catalog             ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';


-- -------------------------------------------------------------------------
-- STEP 2 — also patch portfolio_holdings with a `currency` column so the
--          investments page can render NSE stocks in KES alongside the
--          legacy US-listed Sarah Chen portfolio (which stays USD).
-- -------------------------------------------------------------------------

ALTER TABLE portfolio_holdings ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD';


-- -------------------------------------------------------------------------
-- STEP 3 — indexes on the hot tables for fast market-scoped reads
-- -------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_savings_goals_market      ON savings_goals(market);
CREATE INDEX IF NOT EXISTS idx_portfolio_holdings_market ON portfolio_holdings(market);
CREATE INDEX IF NOT EXISTS idx_reward_profiles_market    ON reward_profiles(market);
CREATE INDEX IF NOT EXISTS idx_reward_activities_market  ON reward_activities(market);
CREATE INDEX IF NOT EXISTS idx_reward_catalog_market     ON reward_catalog(market);


-- -------------------------------------------------------------------------
-- STEP 4 — verification: every existing row should now show market = 'default'
-- -------------------------------------------------------------------------

SELECT 'savings_goals' AS table_name,
       COUNT(*) AS total_rows,
       COUNT(*) FILTER (WHERE market = 'default') AS default_rows,
       COUNT(*) FILTER (WHERE market <> 'default') AS non_default_rows
FROM savings_goals
UNION ALL
SELECT 'portfolio_holdings', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM portfolio_holdings
UNION ALL
SELECT 'reward_profiles', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM reward_profiles
UNION ALL
SELECT 'reward_activities', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM reward_activities;
