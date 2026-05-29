-- =========================================================================
-- KENYA — ACCOUNTS + CARDS SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisite: seed_kenya_profiles.sql must be run first.
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — accounts
--
-- Wanjiru (Premium urban professional): KES current + KES goal-saver + USD diaspora wallet
-- Otieno (SME owner): KES SME current + KES SME deposit + USD trade account
-- -------------------------------------------------------------------------

INSERT INTO accounts (
  id, customer_id, type, name, account_number, iban,
  currency, balance, available_balance, status, market
) VALUES

-- Wanjiru Kamau
('aa11ce01-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001', 'current', 'Personal Current Account',
 '0110000001', 'KE07033KCB1100000001000',
 'KES', 425000.00, 410500.00, 'active', 'kenya'),

('aa11ce01-2222-4222-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001', 'savings', 'Goal Saver (Home Improvements)',
 '0110000002', 'KE07033KCB1100000002000',
 'KES', 985000.00, 985000.00, 'active', 'kenya'),

('aa11ce01-3333-4333-a001-000000000003',
 '11ce0001-0001-4001-a001-000000000001', 'fx_wallet', 'Diaspora USD Wallet',
 '0110000003', 'KE07033KCB1100000003000',
 'USD', 8500.00, 8500.00, 'active', 'kenya'),

-- Otieno Ouma
('aa11ce02-1111-4111-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002', 'current', 'SME Current Account',
 '0220000001', 'KE07033KCB2200000001000',
 'KES', 2410000.00, 2380000.00, 'active', 'kenya'),

('aa11ce02-2222-4222-a002-000000000002',
 '11ce0002-0002-4002-a002-000000000002', 'savings', 'Business Reserve',
 '0220000002', 'KE07033KCB2200000002000',
 'KES', 1200000.00, 1200000.00, 'active', 'kenya'),

('aa11ce02-3333-4333-a002-000000000003',
 '11ce0002-0002-4002-a002-000000000002', 'fx_wallet', 'Trade USD Account',
 '0220000003', 'KE07033KCB2200000003000',
 'USD', 38000.00, 36500.00, 'active', 'kenya')

ON CONFLICT (id) DO UPDATE SET
  balance = EXCLUDED.balance,
  available_balance = EXCLUDED.available_balance,
  status = EXCLUDED.status,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 2 — cards
--
-- Wanjiru: debit on current, platinum credit card (high limit, light usage)
-- Otieno: business debit on SME current, business credit on SME current
-- -------------------------------------------------------------------------

INSERT INTO cards (
  id, customer_id, account_id, type, brand, status,
  last_four, cardholder_name, expiry_date,
  credit_limit, spent_amount, atm_limit, pos_limit,
  online_enabled, contactless_enabled, pin_set, market
) VALUES

-- Wanjiru's cards
('cc11ce01-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 'aa11ce01-1111-4111-a001-000000000001',
 'debit', 'Visa', 'active',
 '4471', 'WANJIRU KAMAU', '09/28',
 NULL, NULL, 40000.00, 150000.00,
 true, true, true, 'kenya'),

('cc11ce01-2222-4222-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001',
 'aa11ce01-1111-4111-a001-000000000001',
 'credit', 'Mastercard', 'active',
 '9913', 'WANJIRU KAMAU', '02/29',
 500000.00, 145000.00, 50000.00, 300000.00,
 true, true, true, 'kenya'),

-- Otieno's cards
('cc11ce02-1111-4111-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002',
 'aa11ce02-1111-4111-a002-000000000001',
 'debit', 'Visa', 'active',
 '5582', 'OTIENO OUMA', '11/27',
 NULL, NULL, 100000.00, 500000.00,
 true, true, true, 'kenya'),

('cc11ce02-2222-4222-a002-000000000002',
 '11ce0002-0002-4002-a002-000000000002',
 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 'Mastercard', 'active',
 '7734', 'OTIENO OUMA - BUSINESS', '06/28',
 1500000.00, 782000.00, 200000.00, 1000000.00,
 true, true, true, 'kenya')

ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  spent_amount = EXCLUDED.spent_amount,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 3 — verify
-- -------------------------------------------------------------------------

SELECT a.name, a.type, a.currency, a.balance, p.full_name
FROM accounts a
JOIN profiles p ON a.customer_id = p.id
WHERE a.market = 'kenya'
ORDER BY p.full_name, a.type;

SELECT c.cardholder_name, c.type, c.brand, c.last_four, c.credit_limit, c.spent_amount
FROM cards c
WHERE c.market = 'kenya'
ORDER BY c.cardholder_name, c.type;
