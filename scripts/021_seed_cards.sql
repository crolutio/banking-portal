-- Seed cards for customers
-- Fixed all account_id references to match actual account IDs in database

INSERT INTO cards (id, user_id, account_id, type, brand, status, last_four, cardholder_name, expiry_date, credit_limit, spent_amount, atm_limit, pos_limit, online_enabled, contactless_enabled, pin_set) VALUES
-- Sarah Chen's cards - Fixed account IDs
('cccc1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaa1111-1111-1111-1111-111111111111', 'debit', 'Visa', 'active', '4532', 'SARAH CHEN', '12/27', NULL, NULL, 5000.00, 10000.00, true, true, true),
('cccc1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'aaaa1111-2222-2222-2222-222222222222', 'credit', 'Mastercard', 'active', '8847', 'SARAH CHEN', '08/28', 50000.00, 12500.00, 10000.00, 50000.00, true, true, true),
('cccc1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'aaaa1111-3333-3333-3333-333333333333', 'virtual', 'Visa', 'active', '9923', 'SARAH CHEN', '11/25', NULL, NULL, 0, 5000.00, true, false, false),

-- Mohammed Ali's cards - Fixed: aaaa2222-1111-2222-2222-222222222222 → aaaa2222-1111-1111-1111-111111111111
('cccc2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'aaaa2222-1111-1111-1111-111111111111', 'debit', 'Visa', 'active', '7721', 'MOHAMMED ALI', '03/28', NULL, NULL, 10000.00, 20000.00, true, true, true),
('cccc2222-0002-0001-0001-000000000002', '22222222-2222-2222-2222-222222222222', 'aaaa2222-1111-1111-1111-111111111111', 'credit', 'Visa', 'active', '3345', 'MOHAMMED ALI', '06/27', 100000.00, 35000.00, 20000.00, 100000.00, true, true, true),
('cccc2222-0003-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'aaaa2222-2222-2222-2222-222222222222', 'debit', 'Mastercard', 'active', '5567', 'MOHAMMED ALI - BUSINESS', '09/26', NULL, NULL, 25000.00, 50000.00, true, true, true),

-- Emma Wilson's cards - Fixed: aaaa3333-1111-3333-3333-333333333333 → aaaa3333-1111-1111-1111-111111111111
('cccc3333-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'aaaa3333-1111-1111-1111-111111111111', 'debit', 'Visa', 'active', '2234', 'EMMA WILSON', '01/27', NULL, NULL, 2000.00, 5000.00, true, true, true),
('cccc3333-0002-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'aaaa3333-2222-2222-2222-222222222222', 'credit', 'Mastercard', 'active', '8876', 'EMMA WILSON', '04/28', 20000.00, 8500.00, 5000.00, 20000.00, true, true, true),

-- Raj Patel's cards (Private Banking - Premium) - Fixed: aaaa4444-1111-4444-4444-444444444444 → aaaa4444-1111-1111-1111-111111111111
('cccc4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'aaaa4444-1111-1111-1111-111111111111', 'debit', 'Visa', 'active', '9900', 'RAJ PATEL', '12/28', NULL, NULL, 50000.00, 100000.00, true, true, true),
('cccc4444-0002-0001-0001-000000000002', '44444444-4444-4444-4444-444444444444', 'aaaa4444-1111-1111-1111-111111111111', 'credit', 'Mastercard', 'active', '1234', 'RAJ PATEL', '10/27', 500000.00, 125000.00, 100000.00, 500000.00, true, true, true)

ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  spent_amount = EXCLUDED.spent_amount;
