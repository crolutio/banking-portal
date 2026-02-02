-- Seed marketplace apps first
INSERT INTO marketplace_apps (id, name, description, category, credit_score_points, data_shared, is_active) VALUES
('aaaa0001-0001-0001-0001-000000000001', 'Amazon', 'Online shopping marketplace', 'shopping', 15, ARRAY['transactions', 'payment_history'], true),
('aaaa0002-0001-0001-0001-000000000002', 'Netflix', 'Streaming entertainment service', 'entertainment', 10, ARRAY['subscription_payments'], true),
('aaaa0003-0001-0001-0001-000000000003', 'DEWA', 'Dubai Electricity and Water Authority', 'utilities', 25, ARRAY['utility_payments', 'payment_history'], true),
('aaaa0004-0001-0001-0001-000000000004', 'Etisalat', 'Telecommunications provider', 'telecom', 20, ARRAY['bill_payments', 'payment_history'], true),
('aaaa0005-0001-0001-0001-000000000005', 'Emirates', 'Emirates Airlines', 'travel', 18, ARRAY['travel_spending', 'loyalty_miles'], true),
('aaaa0006-0001-0001-0001-000000000006', 'Salik', 'Dubai road toll system', 'transport', 12, ARRAY['transport_payments'], true),
('aaaa0007-0001-0001-0001-000000000007', 'Noon', 'Online shopping platform', 'shopping', 12, ARRAY['transactions', 'payment_history'], true),
('aaaa0008-0001-0001-0001-000000000008', 'du', 'Telecommunications provider', 'telecom', 20, ARRAY['bill_payments', 'payment_history'], true)
ON CONFLICT (id) DO NOTHING;

-- Seed connected apps for customers

INSERT INTO connected_apps (id, user_id, app_id, is_active, connected_at, last_synced_at, sync_data) VALUES
-- Fixed UUID format: 'conn' → 'abcd' to use valid hexadecimal characters
-- Sarah Chen's connected apps
('abcd1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaa0001-0001-0001-0001-000000000001', 
  true, NOW() - INTERVAL '3 months', NOW() - INTERVAL '1 day',
  '{"monthly_spend": 2500, "payment_history": "excellent", "member_since": "2020"}'),
('abcd1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'aaaa0002-0001-0001-0001-000000000002', 
  true, NOW() - INTERVAL '2 months', NOW() - INTERVAL '1 day',
  '{"subscription_tier": "premium", "payment_history": "perfect", "member_since": "2019"}'),
('abcd1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'aaaa0003-0001-0001-0001-000000000003', 
  true, NOW() - INTERVAL '6 months', NOW() - INTERVAL '2 days',
  '{"avg_bill": 450, "payment_history": "on_time", "account_age": "3 years"}'),
('abcd1111-0004-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'aaaa0004-0001-0001-0001-000000000004', 
  true, NOW() - INTERVAL '4 months', NOW() - INTERVAL '1 day',
  '{"plan": "postpaid", "monthly_bill": 350, "payment_history": "excellent"}'),

-- Mohammed Ali's connected apps
('abcd2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'aaaa0001-0001-0001-0001-000000000001', 
  true, NOW() - INTERVAL '5 months', NOW() - INTERVAL '1 day',
  '{"monthly_spend": 5000, "payment_history": "excellent", "prime_member": true}'),
('abcd2222-0002-0001-0001-000000000002', '22222222-2222-2222-2222-222222222222', 'aaaa0005-0001-0001-0001-000000000005', 
  true, NOW() - INTERVAL '2 months', NOW() - INTERVAL '3 days',
  '{"tier": "gold", "annual_spend": 45000, "miles": 125000}'),
('abcd2222-0003-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'aaaa0006-0001-0001-0001-000000000006', 
  true, NOW() - INTERVAL '8 months', NOW() - INTERVAL '1 day',
  '{"avg_monthly": 600, "auto_recharge": true, "payment_history": "perfect"}'),

-- Raj Patel's connected apps (Private Banking)
('abcd4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'aaaa0005-0001-0001-0001-000000000005', 
  true, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 day',
  '{"tier": "platinum", "annual_spend": 250000, "miles": 850000}'),
('abcd4444-0002-0001-0001-000000000002', '44444444-4444-4444-4444-444444444444', 'aaaa0001-0001-0001-0001-000000000001', 
  true, NOW() - INTERVAL '6 months', NOW() - INTERVAL '2 days',
  '{"monthly_spend": 15000, "payment_history": "perfect", "prime_member": true}'),
('abcd4444-0003-0001-0001-000000000003', '44444444-4444-4444-4444-444444444444', 'aaaa0003-0001-0001-0001-000000000003', 
  true, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 day',
  '{"avg_bill": 2500, "payment_history": "perfect", "properties": 3}')

ON CONFLICT (id) DO NOTHING;

-- Seed credit score contributions
INSERT INTO credit_score_contributions (id, user_id, connected_app_id, points, reason) VALUES
('bcde1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'abcd1111-0001-0001-0001-000000000001', 15, 'Consistent shopping patterns'),
('bcde1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'abcd1111-0002-0001-0001-000000000002', 10, 'Regular subscription payments'),
('bcde1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'abcd1111-0003-0001-0001-000000000003', 25, 'On-time utility payments'),
('bcde1111-0004-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'abcd1111-0004-0001-0001-000000000004', 20, 'Consistent telecom payments'),
('bcde2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'abcd2222-0001-0001-0001-000000000001', 15, 'High-value consistent purchases'),
('bcde2222-0002-0001-0001-000000000002', '22222222-2222-2222-2222-222222222222', 'abcd2222-0002-0001-0001-000000000002', 18, 'Frequent traveler, premium tier'),
('bcde4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'abcd4444-0001-0001-0001-000000000001', 18, 'Platinum status, high annual spend'),
('bcde4444-0002-0001-0001-000000000002', '44444444-4444-4444-4444-444444444444', 'abcd4444-0002-0001-0001-000000000002', 15, 'Premium shopping patterns'),
('bcde4444-0003-0001-0001-000000000003', '44444444-4444-4444-4444-444444444444', 'abcd4444-0003-0001-0001-000000000003', 25, 'Multiple properties, perfect payment')

ON CONFLICT (id) DO NOTHING;
