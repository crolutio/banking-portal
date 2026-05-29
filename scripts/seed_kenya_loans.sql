-- =========================================================================
-- KENYA — LOANS SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisite: seed_kenya_profiles.sql must be run first.
--
-- Loan portfolio is persona-shaped:
--   Wanjiru: mortgage + car asset finance + salary advance  (consumer leverage)
--   Otieno:  SME working capital + commercial asset finance + LPO discounting (business leverage)
-- =========================================================================

INSERT INTO loans (
  id, customer_id, type,
  principal_amount, remaining_balance, interest_rate,
  term_months, monthly_payment, status,
  disbursement_date, next_payment_date, market
) VALUES

-- WANJIRU KAMAU — consumer portfolio
-- 1. Mortgage on a Kileleshwa apartment
('ee11ce01-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001', 'mortgage',
 18000000.00, 14200000.00, 12.00,
 240, 198000.00, 'active',
 '2022-08-15', CURRENT_DATE + INTERVAL '8 days', 'kenya'),

-- 2. Asset finance on a personal vehicle
('ee11ce01-2222-4222-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001', 'asset_finance',
 2800000.00, 1650000.00, 13.50,
 60, 64500.00, 'active',
 '2023-11-02', CURRENT_DATE + INTERVAL '14 days', 'kenya'),

-- 3. Short salary advance
('ee11ce01-3333-4333-a001-000000000003',
 '11ce0001-0001-4001-a001-000000000001', 'salary_advance',
 250000.00, 180000.00, 14.50,
 18, 16000.00, 'active',
 '2025-02-10', CURRENT_DATE + INTERVAL '5 days', 'kenya'),


-- OTIENO OUMA — business portfolio
-- 1. SME working capital (imports/distribution business)
('ee11ce02-1111-4111-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002', 'sme_working_capital',
 8500000.00, 5200000.00, 15.50,
 48, 240000.00, 'active',
 '2023-05-20', CURRENT_DATE + INTERVAL '10 days', 'kenya'),

-- 2. Commercial asset finance — delivery fleet (two light trucks)
('ee11ce02-2222-4222-a002-000000000002',
 '11ce0002-0002-4002-a002-000000000002', 'asset_finance',
 12000000.00, 8400000.00, 13.50,
 60, 276000.00, 'active',
 '2023-10-12', CURRENT_DATE + INTERVAL '18 days', 'kenya'),

-- 3. LPO/invoice discounting revolving facility
('ee11ce02-3333-4333-a002-000000000003',
 '11ce0002-0002-4002-a002-000000000002', 'lpo_discounting',
 5000000.00, 3200000.00, 16.00,
 36, 175000.00, 'active',
 '2024-09-01', CURRENT_DATE + INTERVAL '22 days', 'kenya')

ON CONFLICT (id) DO UPDATE SET
  remaining_balance = EXCLUDED.remaining_balance,
  status = EXCLUDED.status,
  next_payment_date = EXCLUDED.next_payment_date,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT p.full_name, l.type, l.principal_amount, l.remaining_balance, l.interest_rate, l.status
FROM loans l
JOIN profiles p ON l.customer_id = p.id
WHERE l.market = 'kenya'
ORDER BY p.full_name, l.disbursement_date;
