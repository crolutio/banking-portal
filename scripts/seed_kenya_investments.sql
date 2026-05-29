-- =========================================================================
-- KENYA — INVESTMENTS SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisites:
--   1. seed_kenya_profiles.sql
--   2. add_market_column_extras.sql   (adds `market` column + `currency`
--                                      column on portfolio_holdings)
--
-- Wanjiru: balanced NSE-heavy portfolio + a KES money-market fund position.
-- Otieno : conservative SME-owner mix — Treasury bonds + MMF only.
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — portfolio holdings
-- All Wanjiru/Otieno holdings are KES-denominated (NSE-listed or KES MMF).
-- The `currency` column was added by add_market_column_extras.sql; existing
-- legacy rows (Sarah Chen et al.) keep their default 'USD'.
-- -------------------------------------------------------------------------

INSERT INTO portfolio_holdings (
  id, customer_id, symbol, name, type,
  quantity, avg_cost, current_price,
  currency, market
) VALUES

-- Wanjiru Kamau — balanced NSE portfolio (~KES 1.4M total)
('70a4c1c0-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 'SCOM',  'Safaricom PLC',                'stock',
 4500.000000, 16.20, 18.45, 'KES', 'kenya'),

('70a4c1c0-1111-4111-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001',
 'EQTY',  'Equity Group Holdings PLC',    'stock',
 2200.000000, 42.10, 47.25, 'KES', 'kenya'),

('70a4c1c0-1111-4111-a001-000000000003',
 '11ce0001-0001-4001-a001-000000000001',
 'KCB',   'KCB Group PLC',                'stock',
 3000.000000, 36.80, 41.55, 'KES', 'kenya'),

('70a4c1c0-1111-4111-a001-000000000004',
 '11ce0001-0001-4001-a001-000000000001',
 'EABL',  'East African Breweries PLC',   'stock',
 750.000000,  168.50, 175.20, 'KES', 'kenya'),

('70a4c1c0-1111-4111-a001-000000000005',
 '11ce0001-0001-4001-a001-000000000001',
 'COOP',  'Co-operative Bank of Kenya',   'stock',
 4800.000000, 13.40, 14.95, 'KES', 'kenya'),

-- KES money-market fund (mapped to the closest enum value 'mutual_fund')
('70a4c1c0-1111-4111-a001-000000000006',
 '11ce0001-0001-4001-a001-000000000001',
 'CICMMF', 'CIC Money Market Fund (KES)', 'mutual_fund',
 380000.000000, 1.00, 1.00, 'KES', 'kenya'),


-- Otieno Ouma — conservative SME-owner mix (~KES 2.6M total)
('70a4c1c0-2222-4222-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002',
 'GOK91D', 'GoK 91-Day Treasury Bill',     'bond',
 1500000.000000, 1.00, 1.00, 'KES', 'kenya'),

('70a4c1c0-2222-4222-a002-000000000002',
 '11ce0002-0002-4002-a002-000000000002',
 'GOK2Y',  'GoK 2-Year Treasury Bond',     'bond',
 800000.000000,  1.00, 1.02, 'KES', 'kenya'),

('70a4c1c0-2222-4222-a002-000000000003',
 '11ce0002-0002-4002-a002-000000000002',
 'SANMMF', 'Sanlam KES Money Market Fund', 'mutual_fund',
 320000.000000,  1.00, 1.00, 'KES', 'kenya')

ON CONFLICT (id) DO UPDATE SET
  quantity      = EXCLUDED.quantity,
  current_price = EXCLUDED.current_price,
  currency      = EXCLUDED.currency,
  market        = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 2 — watchlist (a couple of Kenyan symbols Wanjiru is eyeing)
-- NOTE: the production `watchlist` table kept the original `user_id` column
-- (unlike `portfolio_holdings` / `savings_goals` / `reward_*` which were
-- renamed to `customer_id`). Keep `user_id` here.
-- -------------------------------------------------------------------------

INSERT INTO watchlist (id, user_id, symbol, name, type) VALUES
('80b5d2d1-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 'BAT',   'British American Tobacco Kenya', 'stock'),

('80b5d2d1-1111-4111-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001',
 'NCBA',  'NCBA Group PLC',                 'stock')

ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- STEP 3 — risk profile rows (drives the recommended-allocation tile)
-- Production `risk_profiles` uses `customer_id` with a UNIQUE constraint
-- on it (verified via information_schema). `watchlist` is the outlier that
-- still uses `user_id`.
-- -------------------------------------------------------------------------

INSERT INTO risk_profiles (
  id, customer_id, score, category, questionnaire_answers, last_updated, market
) VALUES

-- Wanjiru — moderate; comfortable with NSE blue chips and a slice in MMF
('90c6e3e2-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 62, 'Moderate',
 '{"horizon_years": 5, "loss_tolerance": "medium", "income_stability": "high", "investment_experience": "intermediate"}'::jsonb,
 NOW(), 'kenya'),

-- Otieno — conservative; capital preservation while the business is the main growth engine
('90c6e3e2-2222-4222-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002',
 38, 'Conservative',
 '{"horizon_years": 3, "loss_tolerance": "low", "income_stability": "variable", "investment_experience": "beginner"}'::jsonb,
 NOW(), 'kenya')

ON CONFLICT (customer_id) DO UPDATE SET
  score                  = EXCLUDED.score,
  category               = EXCLUDED.category,
  questionnaire_answers  = EXCLUDED.questionnaire_answers,
  last_updated           = EXCLUDED.last_updated,
  market                 = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 4 — verify
-- -------------------------------------------------------------------------

SELECT p.full_name, ph.symbol, ph.name, ph.type, ph.currency,
       ph.quantity, ph.current_price,
       ROUND(ph.quantity * ph.current_price, 2) AS market_value
FROM portfolio_holdings ph
JOIN profiles p ON p.id = ph.customer_id
WHERE ph.market = 'kenya'
ORDER BY p.full_name, ph.type, ph.symbol;

SELECT p.full_name, rp.score, rp.category
FROM risk_profiles rp
JOIN profiles p ON p.id = rp.customer_id
WHERE rp.market = 'kenya';
