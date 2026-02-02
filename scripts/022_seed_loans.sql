-- Seed active loans

INSERT INTO loans (id, user_id, product_id, type, principal_amount, remaining_balance, interest_rate, term_months, monthly_payment, status, disbursement_date, next_payment_date) VALUES
-- Sarah Chen - Personal Loan
('aaaa1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 
  (SELECT id FROM loan_products WHERE name = 'Personal Loan' LIMIT 1),
  'personal', 50000.00, 32500.00, 8.5, 36, 1578.00, 'active', '2023-06-15', '2024-12-15'),

-- Mohammed Ali - Business Loan
('aaaa2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 
  (SELECT id FROM loan_products WHERE name = 'Business Loan' LIMIT 1),
  'business', 250000.00, 187500.00, 7.25, 60, 4975.00, 'active', '2023-03-01', '2024-12-01'),

-- Raj Patel - Mortgage
('aaaa4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 
  (SELECT id FROM loan_products WHERE name = 'Home Mortgage' LIMIT 1),
  'mortgage', 2500000.00, 2350000.00, 4.25, 300, 13500.00, 'active', '2023-01-15', '2024-12-15')

ON CONFLICT (id) DO UPDATE SET
  remaining_balance = EXCLUDED.remaining_balance,
  status = EXCLUDED.status;

-- Seed loan applications
INSERT INTO loan_applications (id, user_id, product_id, status, requested_amount, requested_term_months, purpose, employment_status, monthly_income, created_at) VALUES
-- Emma Wilson - Pending Personal Loan
('abcd3333-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333',
  (SELECT id FROM loan_products WHERE name = 'Personal Loan' LIMIT 1),
  'under_review', 25000.00, 24, 'Home renovation and furniture', 'employed', 12000.00, NOW() - INTERVAL '2 days'),

-- Fixed enum value: 'pre_approved' -> 'approved' (pre_approved not in enum)
-- Sarah Chen - Approved Credit Line
('abcd1111-0002-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM loan_products WHERE name = 'Credit Line' LIMIT 1),
  'approved', 100000.00, 12, 'Emergency credit line', 'employed', 25000.00, NOW() - INTERVAL '5 days')

ON CONFLICT (id) DO NOTHING;
