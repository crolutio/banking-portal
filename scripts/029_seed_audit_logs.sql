-- Seed audit logs for compliance tracking

INSERT INTO audit_logs (id, user_id, user_role, action_type, action, resource_type, resource_id, details, sources_accessed, ai_suggestion, user_confirmed, risk_flags, redactions, ip_address, user_agent) VALUES
-- Fixed UUID format: 'audit-' prefix and wrong length to 'aaaa' with proper UUID format
-- Customer actions
('aaaa0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'retail_customer', 'ai_response', 'Viewed account balance', 'account', 'aaaa1111-1111-1111-1111-111111111111', 
  '{"via": "ai_banker", "query": "What is my balance?"}', 
  ARRAY['accounts'], NULL, NULL, NULL, NULL, '192.168.1.100', 'Mozilla/5.0 Chrome/120'),

('aaaa0002-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'retail_customer', 'transfer', 'Initiated transfer', 'transaction', NULL, 
  '{"amount": 5000, "to": "Mohammed Ali", "type": "internal"}', 
  ARRAY['accounts', 'beneficiaries'], NULL, true, NULL, NULL, '192.168.1.100', 'Mozilla/5.0 Chrome/120'),

('aaaa0003-0001-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'retail_customer', 'transfer', 'Added new beneficiary', 'beneficiary', NULL, 
  '{"name": "Gulf Supplies Co", "type": "business", "country": "UAE"}', 
  ARRAY['beneficiaries'], NULL, true, ARRAY['new_beneficiary'], NULL, '10.0.0.50', 'Mozilla/5.0 Safari/17'),

-- RM actions
('aaaa0004-0001-0001-0001-000000000004', '66666666-6666-6666-6666-666666666666', 'relationship_manager', 'ai_response', 'Accessed client portfolio', 'profile', '11111111-1111-1111-1111-111111111111', 
  '{"purpose": "quarterly_review", "client_consent": true}', 
  ARRAY['profile', 'accounts', 'transactions', 'investments'], NULL, NULL, NULL, ARRAY['email', 'phone'], '172.16.0.25', 'Mozilla/5.0 Edge/120'),

('aaaa0005-0001-0001-0001-000000000005', '66666666-6666-6666-6666-666666666666', 'relationship_manager', 'ai_response', 'Generated client report', 'report', NULL, 
  '{"report_type": "wealth_summary", "client_id": "44444444-4444-4444-4444-444444444444"}', 
  ARRAY['accounts', 'investments', 'loans'], NULL, NULL, NULL, ARRAY['full_account_numbers'], '172.16.0.25', 'Mozilla/5.0 Edge/120'),

-- Risk/Compliance actions
('aaaa0006-0001-0001-0001-000000000006', '88888888-8888-8888-8888-888888888888', 'risk_compliance', 'dispute', 'Reviewed risk alert', 'risk_alert', 'aaaa0001-0001-0001-0001-000000000001', 
  '{"decision": "escalate_for_review", "notes": "Requires customer verification"}', 
  ARRAY['transactions', 'profile', 'risk_alerts'], 'Recommend verification call', true, ARRAY['unusual_pattern'], NULL, '172.16.0.100', 'Mozilla/5.0 Chrome/120'),

('aaaa0007-0001-0001-0001-000000000007', '88888888-8888-8888-8888-888888888888', 'risk_compliance', 'dispute', 'Resolved risk alert', 'risk_alert', 'aaaa0004-0001-0001-0001-000000000001', 
  '{"decision": "false_positive", "notes": "Confirmed holiday shopping, normal pattern for Q4"}', 
  ARRAY['transactions', 'risk_alerts'], 'No action required - seasonal pattern', true, NULL, NULL, '172.16.0.100', 'Mozilla/5.0 Chrome/120'),

-- Admin actions
('aaaa0008-0001-0001-0001-000000000008', '99999999-9999-9999-9999-999999999999', 'admin', 'policy_change', 'Updated AI guardrails', 'system_config', NULL, 
  '{"setting": "max_transfer_without_confirmation", "old_value": 10000, "new_value": 15000}', 
  ARRAY['system_config'], NULL, NULL, ARRAY['config_change'], NULL, '172.16.0.1', 'Mozilla/5.0 Chrome/120'),

('aaaa0009-0001-0001-0001-000000000009', '99999999-9999-9999-9999-999999999999', 'admin', 'card_action', 'Disabled user account', 'profile', '55555555-5555-5555-5555-555555555555', 
  '{"reason": "kyc_pending", "temporary": true, "reactivation_condition": "document_submission"}', 
  ARRAY['profile'], NULL, true, ARRAY['account_action'], NULL, '172.16.0.1', 'Mozilla/5.0 Chrome/120')

ON CONFLICT (id) DO NOTHING;
