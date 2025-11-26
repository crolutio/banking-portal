-- Seed savings goals
-- Fixed all source_account_id references to match actual account IDs in database

INSERT INTO savings_goals (id, user_id, name, category, target_amount, current_amount, monthly_contribution, target_date, status, source_account_id, auto_debit, currency, image_url) VALUES
-- Sarah Chen's savings goals
('abcd1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Maldives Vacation', 'travel', 25000.00, 18500.00, 2000.00, '2025-06-01', 'active', 'aaaa1111-1111-1111-1111-111111111111', true, 'AED', '/maldives-beach-resort-tropical-paradise.jpg'),
('abcd1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'MacBook Pro', 'shopping', 12000.00, 8400.00, 1200.00, '2025-03-01', 'active', 'aaaa1111-1111-1111-1111-111111111111', true, 'AED', '/macbook-pro-laptop-sleek-modern.jpg'),
('abcd1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Emergency Fund', 'emergency', 50000.00, 35000.00, 2500.00, '2025-12-31', 'active', 'aaaa1111-2222-2222-2222-222222222222', true, 'AED', '/safety-umbrella-protection-financial-security.jpg'),

-- Mohammed Ali's savings goals - Fixed: aaaa2222-2222-2222-2222-222222222222 → aaaa2222-1111-1111-1111-111111111111
('abcd2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'Business Expansion', 'other', 150000.00, 67500.00, 10000.00, '2025-09-01', 'active', 'aaaa2222-1111-1111-1111-111111111111', true, 'AED', '/placeholder.svg?height=200&width=300'),
('abcd2222-0002-0001-0001-000000000002', '22222222-2222-2222-2222-222222222222', 'New Car', 'vehicle', 200000.00, 85000.00, 8000.00, '2025-12-01', 'active', 'aaaa2222-2222-2222-2222-222222222222', false, 'AED', '/placeholder.svg?height=200&width=300'),

-- Emma Wilson's savings goals - Fixed: aaaa3333-2222-3333-3333-333333333333 → aaaa3333-2222-2222-2222-222222222222
('abcd3333-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'Europe Trip', 'travel', 15000.00, 8500.00, 1500.00, '2025-08-01', 'active', 'aaaa3333-2222-2222-2222-222222222222', true, 'AED', '/placeholder.svg?height=200&width=300'),
('abcd3333-0002-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'iPhone 16 Pro', 'shopping', 5500.00, 2200.00, 550.00, '2025-04-01', 'active', 'aaaa3333-1111-1111-1111-111111111111', false, 'AED', '/iphone-smartphone-latest-model.jpg'),

-- Raj Patel's savings goals - Fixed: aaaa4444-2222-4444-4444-444444444444 → aaaa4444-1111-1111-1111-111111111111
('abcd4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'Villa Down Payment', 'home', 1000000.00, 650000.00, 50000.00, '2025-12-31', 'active', 'aaaa4444-1111-1111-1111-111111111111', true, 'AED', '/modern-house-keys-home-ownership-dream.jpg'),
('abcd4444-0002-0001-0001-000000000002', '44444444-4444-4444-4444-444444444444', 'Yacht Charter', 'travel', 100000.00, 75000.00, 12500.00, '2025-06-01', 'active', 'aaaa4444-1111-1111-1111-111111111111', true, 'AED', '/placeholder.svg?height=200&width=300'),

-- Fatima Hassan's savings goals - Fixed: aaaa5555-2222-5555-5555-555555555555 → aaaa5555-2222-2222-2222-222222222222
('abcd5555-0001-0001-0001-000000000001', '55555555-5555-5555-5555-555555555555', 'Wedding Fund', 'wedding', 80000.00, 42000.00, 4000.00, '2025-10-01', 'active', 'aaaa5555-2222-2222-2222-222222222222', true, 'AED', '/wedding-celebration-rings-romantic.jpg'),
('abcd5555-0002-0001-0001-000000000002', '55555555-5555-5555-5555-555555555555', 'Education Course', 'education', 20000.00, 8000.00, 2000.00, '2025-06-01', 'active', 'aaaa5555-1111-1111-1111-111111111111', true, 'AED', '/placeholder.svg?height=200&width=300')

ON CONFLICT (id) DO UPDATE SET
  current_amount = EXCLUDED.current_amount,
  status = EXCLUDED.status;

-- Seed savings goal transactions
INSERT INTO savings_goal_transactions (id, goal_id, type, amount, description) VALUES
('bcde0001-0001-0001-0001-000000000001', 'abcd1111-0001-0001-0001-000000000001', 'deposit', 2000.00, 'Monthly auto-debit'),
('bcde0001-0001-0001-0001-000000000002', 'abcd1111-0001-0001-0001-000000000001', 'deposit', 2000.00, 'Monthly auto-debit'),
('bcde0001-0001-0001-0001-000000000003', 'abcd1111-0002-0001-0001-000000000002', 'deposit', 1200.00, 'Monthly auto-debit'),
('bcde0002-0001-0001-0001-000000000001', 'abcd2222-0001-0001-0001-000000000001', 'deposit', 10000.00, 'Monthly auto-debit'),
('bcde0002-0001-0001-0001-000000000002', 'abcd2222-0001-0001-0001-000000000001', 'deposit', 15000.00, 'Extra business profit')

ON CONFLICT (id) DO NOTHING;
