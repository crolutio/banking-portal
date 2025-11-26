-- Seed risk alerts for compliance team

INSERT INTO risk_alerts (id, user_id, type, severity, status, title, description, assigned_to, evidence, ai_analysis) VALUES
-- Fixed UUID format: 'alert-' prefix to 'aaaa' to use valid hexadecimal characters
-- High severity alert
('aaaa0001-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'unusual_activity', 'high', 'open',
  'Unusual Large Transaction Pattern',
  'Multiple large transfers totaling AED 150,000 over 48 hours to new beneficiaries',
  '88888888-8888-8888-8888-888888888888',
  '{"transactions": [{"amount": 50000, "date": "2024-11-20"}, {"amount": 50000, "date": "2024-11-21"}, {"amount": 50000, "date": "2024-11-22"}], "new_beneficiaries": 3}',
  '{"risk_score": 78, "recommendation": "Recommend verification call with customer", "similar_cases": 12, "false_positive_likelihood": "low", "policy_refs": ["AML-2024-001", "KYC-REFRESH-REQ"]}'),

-- Medium severity alert
('aaaa0002-0001-0001-0001-000000000001', '55555555-5555-5555-5555-555555555555', 'kyc', 'medium', 'investigating',
  'KYC Documents Expiring Soon',
  'Customer Emirates ID expires in 30 days. KYC refresh required.',
  '88888888-8888-8888-8888-888888888888',
  '{"document_type": "Emirates ID", "expiry_date": "2024-12-25", "last_kyc_update": "2022-12-25"}',
  '{"risk_score": 45, "recommendation": "Send reminder to customer for document update", "auto_action_available": true}'),

-- Fraud alert
('aaaa0003-0001-0001-0001-000000000001', '33333333-3333-3333-3333-333333333333', 'fraud', 'critical', 'open',
  'Potential Card Fraud Detected',
  'Card used in 3 different countries within 6 hours. Geo-location impossible travel detected.',
  '88888888-8888-8888-8888-888888888888',
  '{"card_last_four": "8876", "locations": ["Dubai, UAE", "London, UK", "New York, USA"], "time_span_hours": 6, "total_amount": 8500}',
  '{"risk_score": 95, "recommendation": "Immediate card block recommended. Contact customer urgently.", "fraud_pattern_match": "impossible_travel", "similar_fraud_cases": 8}'),

-- Low severity alert
('aaaa0004-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'unusual_activity', 'low', 'resolved',
  'Spending Pattern Deviation',
  'Customer spending 40% higher than usual this month',
  '88888888-8888-8888-8888-888888888888',
  '{"avg_monthly_spend": 8500, "current_month_spend": 12000, "deviation_percent": 41}',
  '{"risk_score": 22, "recommendation": "No action required - appears to be holiday shopping season", "context": "Q4 spending typically higher"}'),

-- Sanctions screening
('aaaa0005-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'aml', 'high', 'investigating',
  'Sanctions List Partial Name Match',
  'New beneficiary name partially matches sanctions list entry',
  '88888888-8888-8888-8888-888888888888',
  '{"beneficiary_name": "R. Patel Trading LLC", "matched_name": "R. Patel International", "match_score": 72, "list": "OFAC"}',
  '{"risk_score": 68, "recommendation": "Manual review required - likely false positive due to common name", "false_positive_likelihood": "high", "additional_checks": ["verify_company_registration", "request_proof_of_business"]}')

ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status;
