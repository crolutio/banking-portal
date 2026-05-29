-- =========================================================================
-- KENYA — SAVINGS GOALS SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisites:
--   1. seed_kenya_profiles.sql
--   2. seed_kenya_accounts_cards.sql        (need source_account_id targets)
--   3. add_market_column_extras.sql         (adds the `market` column)
--
-- Wanjiru (premium urban professional): 4 personal goals across home,
-- emergency, education, and travel — grounded in Nairobi/Kenya context.
-- Otieno (SME owner): 2 business-flavoured goals.
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — savings goals
-- -------------------------------------------------------------------------

INSERT INTO savings_goals (
  id, customer_id, name, category,
  target_amount, current_amount, monthly_contribution,
  target_date, status, source_account_id, auto_debit,
  currency, image_url, market
) VALUES

-- Wanjiru Kamau — 4 goals
('5a4e1c01-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 'Karen 2BR Apartment Deposit', 'home',
 6000000.00, 4150000.00, 75000.00,
 '2026-12-31', 'active',
 'aa11ce01-2222-4222-a001-000000000002', true,
 'KES', '/modern-house-keys-home-ownership-dream.jpg', 'kenya'),

('5a4e1c01-2222-4222-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001',
 'Emergency Fund (6 months)', 'emergency',
 1200000.00, 720000.00, 40000.00,
 '2026-09-30', 'active',
 'aa11ce01-1111-4111-a001-000000000001', true,
 'KES', '/emergency.webp', 'kenya'),

('5a4e1c01-3333-4333-a001-000000000003',
 '11ce0001-0001-4001-a001-000000000001',
 'Strathmore Executive MBA', 'education',
 1500000.00, 525000.00, 35000.00,
 '2027-01-15', 'active',
 'aa11ce01-1111-4111-a001-000000000001', true,
 'KES', '/placeholder.svg?height=200&width=300', 'kenya'),

('5a4e1c01-4444-4444-a001-000000000004',
 '11ce0001-0001-4001-a001-000000000001',
 'Maasai Mara & Diani Holiday', 'travel',
 280000.00, 180000.00, 25000.00,
 '2026-08-01', 'active',
 'aa11ce01-1111-4111-a001-000000000001', false,
 'KES', '/japan.jpg', 'kenya'),


-- Otieno Ouma — 2 business-flavoured goals
('5a4e1c02-1111-4111-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002',
 'SME Working Capital Reserve', 'other',
 3000000.00, 1850000.00, 100000.00,
 '2026-10-01', 'active',
 'aa11ce02-2222-4222-a002-000000000002', true,
 'KES', '/placeholder.svg?height=200&width=300', 'kenya'),

('5a4e1c02-2222-4222-a002-000000000002',
 '11ce0002-0002-4002-a002-000000000002',
 'Mombasa Branch Fit-out', 'other',
 1500000.00, 920000.00, 75000.00,
 '2026-11-30', 'active',
 'aa11ce02-1111-4111-a002-000000000001', true,
 'KES', '/placeholder.svg?height=200&width=300', 'kenya')

ON CONFLICT (id) DO UPDATE SET
  current_amount = EXCLUDED.current_amount,
  status         = EXCLUDED.status,
  market         = EXCLUDED.market,
  currency       = EXCLUDED.currency;


-- -------------------------------------------------------------------------
-- STEP 2 — savings goal transactions (recent deposits)
-- Stamped with market = 'kenya' so direct-read queries scope correctly.
-- -------------------------------------------------------------------------

INSERT INTO savings_goal_transactions (id, goal_id, type, amount, description, market) VALUES
-- Wanjiru — Karen apartment deposit
('6b5f1d01-0001-4001-a001-000000000001', '5a4e1c01-1111-4111-a001-000000000001', 'deposit', 75000.00, 'Monthly standing order from Goal Saver',     'kenya'),
('6b5f1d01-0001-4001-a001-000000000002', '5a4e1c01-1111-4111-a001-000000000001', 'deposit', 75000.00, 'Monthly standing order from Goal Saver',     'kenya'),
('6b5f1d01-0001-4001-a001-000000000003', '5a4e1c01-1111-4111-a001-000000000001', 'deposit', 150000.00, 'Quarterly performance bonus',               'kenya'),

-- Wanjiru — Emergency Fund
('6b5f1d01-0002-4002-a001-000000000001', '5a4e1c01-2222-4222-a001-000000000002', 'deposit', 40000.00, 'Monthly auto-debit',                         'kenya'),
('6b5f1d01-0002-4002-a001-000000000002', '5a4e1c01-2222-4222-a001-000000000002', 'deposit', 40000.00, 'Monthly auto-debit',                         'kenya'),

-- Wanjiru — Strathmore MBA
('6b5f1d01-0003-4003-a001-000000000001', '5a4e1c01-3333-4333-a001-000000000003', 'deposit', 35000.00, 'Monthly auto-debit',                         'kenya'),
('6b5f1d01-0003-4003-a001-000000000002', '5a4e1c01-3333-4333-a001-000000000003', 'deposit', 100000.00, 'Year-end bonus top-up',                     'kenya'),

-- Wanjiru — Mara & Diani trip
('6b5f1d01-0004-4004-a001-000000000001', '5a4e1c01-4444-4444-a001-000000000004', 'deposit', 25000.00, 'M-Pesa transfer from Goal Saver',            'kenya'),
('6b5f1d01-0004-4004-a001-000000000002', '5a4e1c01-4444-4444-a001-000000000004', 'deposit', 30000.00, 'Manual top-up after side gig payout',        'kenya'),

-- Otieno — SME Working Capital Reserve
('6b5f1d02-0001-4001-a002-000000000001', '5a4e1c02-1111-4111-a002-000000000001', 'deposit', 100000.00, 'Monthly auto-debit from Business Reserve',  'kenya'),
('6b5f1d02-0001-4001-a002-000000000002', '5a4e1c02-1111-4111-a002-000000000001', 'deposit', 250000.00, 'Quarterly retained earnings sweep',         'kenya'),

-- Otieno — Mombasa branch fit-out
('6b5f1d02-0002-4002-a002-000000000001', '5a4e1c02-2222-4222-a002-000000000002', 'deposit', 75000.00, 'Monthly transfer from SME Current',          'kenya'),
('6b5f1d02-0002-4002-a002-000000000002', '5a4e1c02-2222-4222-a002-000000000002', 'deposit', 120000.00, 'Supplier discount captured and reinvested', 'kenya')

ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- STEP 3 — verify
-- -------------------------------------------------------------------------

SELECT p.full_name, sg.name, sg.category, sg.currency,
       sg.current_amount, sg.target_amount,
       ROUND(100.0 * sg.current_amount / sg.target_amount, 1) AS progress_pct
FROM savings_goals sg
JOIN profiles p ON p.id = sg.customer_id
WHERE sg.market = 'kenya'
ORDER BY p.full_name, sg.target_date;
