-- Seed support tickets
-- Fixed sender_type values: 'customer' → 'user' to match check constraint

INSERT INTO support_tickets (id, user_id, subject, status, priority, assigned_to) VALUES
('aaaa0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Unable to add new beneficiary', 'resolved', 'medium', '66666666-6666-6666-6666-666666666666'),
('aaaa0002-0001-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'Card delivery tracking', 'open', 'low', NULL),
('aaaa0003-0001-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'Business account statement request', 'in_progress', 'medium', '77777777-7777-7777-7777-777777777777'),
('aaaa0004-0001-0001-0001-000000000004', '55555555-5555-5555-5555-555555555555', 'Credit card limit increase', 'open', 'high', '66666666-6666-6666-6666-666666666666'),
('aaaa0005-0001-0001-0001-000000000005', '44444444-4444-4444-4444-444444444444', 'Wire transfer fee inquiry', 'resolved', 'low', '66666666-6666-6666-6666-666666666666')

ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status;

-- Seed support messages - Fixed sender_type: 'customer' → 'user'
INSERT INTO support_messages (id, ticket_id, sender_id, sender_type, content, citations) VALUES
-- Ticket 1 conversation
('abcd0001-0001-0001-0001-000000000001', 'aaaa0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'user', 
  'Hi, I''m trying to add a new beneficiary for international transfer but the system keeps showing an error. Can you help?', NULL),
('abcd0001-0002-0001-0001-000000000002', 'aaaa0001-0001-0001-0001-000000000001', NULL, 'ai', 
  'I understand you''re having trouble adding a beneficiary. This usually happens when the IBAN format is incorrect or the beneficiary bank details are incomplete. Could you please verify: 1) The IBAN is exactly as provided by the beneficiary, 2) The bank name and SWIFT code are correct.',
  '[{"source": "International Transfer Guidelines", "type": "policy"}]'),
('abcd0001-0003-0001-0001-000000000003', 'aaaa0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'user', 
  'Oh I see! The IBAN was missing a digit. It works now. Thank you!', NULL),
('abcd0001-0004-0001-0001-000000000004', 'aaaa0001-0001-0001-0001-000000000001', '66666666-6666-6666-6666-666666666666', 'agent', 
  'Great to hear it''s resolved! If you have any other questions, feel free to reach out.', NULL),

-- Ticket 2 conversation
('abcd0002-0001-0001-0001-000000000001', 'aaaa0002-0001-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'user', 
  'I ordered a new debit card 5 days ago but haven''t received any tracking information. When will it arrive?', NULL),
('abcd0002-0002-0001-0001-000000000002', 'aaaa0002-0001-0001-0001-000000000002', NULL, 'ai', 
  'Card delivery typically takes 5-7 business days within the UAE. Your card was dispatched on November 21st and is currently with Aramex for delivery. Expected delivery is November 26-27. You can track it using reference: ARX-847362.',
  '[{"source": "Card Delivery Policy", "type": "policy"}, {"source": "Order #CD-2024-847", "type": "account"}]'),

-- Ticket 3 conversation
('abcd0003-0001-0001-0001-000000000001', 'aaaa0003-0001-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'user', 
  'I need official statements for my business account for the last 6 months for visa processing. Can you email them?', NULL),
('abcd0003-0002-0001-0001-000000000002', 'aaaa0003-0001-0001-0001-000000000003', '77777777-7777-7777-7777-777777777777', 'agent', 
  'Hi Mohammed, I''ll prepare the official bank statements for your business account. For visa purposes, these will include the bank seal and authorized signature. I''ll email them to your registered email within 24 hours.', NULL),

-- Ticket 4 conversation
('abcd0004-0001-0001-0001-000000000001', 'aaaa0004-0001-0001-0001-000000000004', '55555555-5555-5555-5555-555555555555', 'user', 
  'I would like to request a credit limit increase on my Visa card. Current limit is AED 30,000 and I need AED 50,000.', NULL),
('abcd0004-0002-0001-0001-000000000002', 'aaaa0004-0001-0001-0001-000000000004', NULL, 'ai', 
  'I can help you with a credit limit increase request. Based on your account history, you may be eligible for an increase. To process this request, we''ll need: 1) Recent salary certificate, 2) Bank statements for last 3 months. Would you like to upload these documents?',
  '[{"source": "Credit Limit Policy", "type": "policy"}, {"source": "Account Analysis", "type": "account"}]')

ON CONFLICT (id) DO NOTHING;
