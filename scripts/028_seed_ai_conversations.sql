-- Seed AI conversations and messages

INSERT INTO ai_conversations (id, user_id, title, scope, is_pinned) VALUES
-- Fixed UUID format: 'conv' prefix to 'aaaa' to use valid hexadecimal characters
('aaaa1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Balance inquiry', ARRAY['my_accounts'], true),
('aaaa1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Restaurant spending', ARRAY['transactions'], false),
('aaaa1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Loan affordability check', ARRAY['my_accounts', 'transactions', 'product_terms'], true),
('aaaa2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'Business account fees', ARRAY['fees_policies', 'my_accounts'], false),
('aaaa4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'Investment portfolio review', ARRAY['my_accounts', 'transactions'], true)

ON CONFLICT (id) DO NOTHING;

-- Seed AI messages
INSERT INTO ai_messages (id, conversation_id, role, content, citations, confidence, data_used, actions, requires_escalation, pii_masked) VALUES
-- Conversation 1: Balance inquiry
('abcd0001-0001-0001-0001-000000000001', 'aaaa1111-0001-0001-0001-000000000001', 'user', 
  'What is my current balance?', NULL, NULL, NULL, NULL, false, false),
('abcd0001-0002-0001-0001-000000000002', 'aaaa1111-0001-0001-0001-000000000001', 'assistant', 
  'Your total balance across all accounts is AED 175,950.00. Here''s the breakdown:\n\n• Primary Current Account: AED 45,750.00\n• High Yield Savings: AED 125,000.00\n• USD Travel Wallet: $5,200.00 (≈AED 19,100)\n\nYour available balance (excluding pending transactions) is AED 175,450.00.',
  '[{"source": "Account Balances", "type": "account", "excerpt": "Real-time balance as of Nov 26, 2024"}]',
  'high', ARRAY['accounts', 'balances'], NULL, false, false),

-- Conversation 2: Restaurant spending
('abcd0002-0001-0001-0001-000000000001', 'aaaa1111-0002-0001-0001-000000000001', 'user', 
  'How much did I spend on restaurants this month?', NULL, NULL, NULL, NULL, false, false),
('abcd0002-0002-0001-0001-000000000002', 'aaaa1111-0002-0001-0001-000000000001', 'assistant', 
  'This month you''ve spent AED 1,245.00 on dining, which is 23% higher than your monthly average of AED 1,012.00.\n\nTop restaurants:\n• Zuma Dubai: AED 245.00\n• Nobu Dubai: AED 450.00\n• Various cafes: AED 550.00\n\nWould you like me to set up a dining budget alert?',
  '[{"source": "Transaction Analysis", "type": "account", "excerpt": "November 2024 dining category"}]',
  'high', ARRAY['transactions', 'spending_analysis'], 
  '[{"label": "Set Budget Alert", "type": "budget_alert", "params": {"category": "dining", "limit": 1000}}]',
  false, false),

-- Conversation 3: Loan affordability
('abcd0003-0001-0001-0001-000000000001', 'aaaa1111-0003-0001-0001-000000000001', 'user', 
  'Can I afford a AED 100,000 personal loan?', NULL, NULL, NULL, NULL, false, false),
('abcd0003-0002-0001-0001-000000000002', 'aaaa1111-0003-0001-0001-000000000001', 'assistant', 
  'Based on my analysis of your financial profile:\n\n**Affordability Assessment: Likely Approved**\n\n• Monthly income: AED 25,000\n• Existing commitments: AED 1,578 (current loan)\n• Debt-to-income ratio: 6.3% (healthy)\n• New loan payment (36 months): ~AED 3,156/month\n• Projected DTI with new loan: 18.9%\n\nOur maximum DTI threshold is 50%, so you have significant headroom. However, I recommend considering:\n\n1. Your savings goals progress may slow down\n2. Emergency fund should remain at 3-6 months expenses\n\n*This is an indicative assessment. Final approval subject to full credit check and documentation.*',
  '[{"source": "Personal Loan Terms", "type": "product", "excerpt": "Rate: 8.5% APR, Max DTI: 50%"}, {"source": "Account Analysis", "type": "account", "excerpt": "Income and existing obligations"}, {"source": "Responsible Lending Policy", "type": "policy"}]',
  'medium', ARRAY['accounts', 'transactions', 'loans', 'product_terms'],
  '[{"label": "Start Application", "type": "loan_application", "params": {"amount": 100000, "term": 36}}, {"label": "See Other Options", "type": "navigate", "params": {"path": "/loans"}}]',
  false, true),

-- Conversation 4: Business fees
('abcd0004-0001-0001-0001-000000000001', 'aaaa2222-0001-0001-0001-000000000001', 'user', 
  'What are the fees for international wire transfers from my business account?', NULL, NULL, NULL, NULL, false, false),
('abcd0004-0002-0001-0001-000000000002', 'aaaa2222-0001-0001-0001-000000000001', 'assistant', 
  'For your Business Account, international wire transfer fees are:\n\n**Standard Transfer (3-5 days)**\n• Fee: AED 75 flat + 0.1% of amount\n• Max fee: AED 500\n\n**Express Transfer (Same day)**\n• Fee: AED 150 flat + 0.15% of amount\n• Max fee: AED 750\n\n**As a Mass Affluent customer, you receive:**\n• 2 free international transfers per month\n• 25% discount on subsequent transfers\n\nYou''ve used 1 of your 2 free transfers this month.',
  '[{"source": "Business Banking Fee Schedule 2024", "type": "policy", "excerpt": "Section 4.2: International Transfers"}, {"source": "Account Benefits", "type": "account", "excerpt": "Mass Affluent tier benefits"}]',
  'high', ARRAY['fees_policies', 'account_benefits'], NULL, false, false)

ON CONFLICT (id) DO NOTHING;
