-- Seed support tickets
-- Fixed sender_type values: 'customer' → 'user' to match check constraint

DELETE FROM support_messages;
DELETE FROM support_tickets;

INSERT INTO support_tickets (id, user_id, subject, status, priority, assigned_to, resolved_at, created_at, updated_at) VALUES
('aaaa1001-0001-0001-0001-000000000001', '4e140685-8f38-49ff-aae0-d6109c46873d', 'International transfer pending review', 'open', 'high', '51880b1d-3935-49dd-bac6-9469d33d3ee3', NULL, '2024-12-20T09:10:00Z', '2024-12-20T10:30:00Z'),
('aaaa1002-0001-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'Card replacement fee waiver request', 'resolved', 'low', '51880b1d-3935-49dd-bac6-9469d33d3ee3', '2024-12-18T15:00:00Z', '2024-12-18T13:20:00Z', '2024-12-18T15:05:00Z'),
('aaaa1003-0001-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'Business account statement for visa', 'in_progress', 'medium', '77777777-7777-7777-7777-777777777777', NULL, '2024-12-17T08:40:00Z', '2024-12-17T12:15:00Z'),
('aaaa1005-0001-0001-0001-000000000005', '44444444-4444-4444-4444-444444444444', 'Mobile app login verification loop', 'resolved', 'medium', '77777777-7777-7777-7777-777777777777', '2024-12-14T11:20:00Z', '2024-12-14T09:30:00Z', '2024-12-14T11:25:00Z'),
('aaaa1006-0001-0001-0001-000000000006', '4e140685-8f38-49ff-aae0-d6109c46873d', 'Recurring transfer limit clarification', 'open', 'low', NULL, NULL, '2024-12-13T10:05:00Z', '2024-12-13T10:10:00Z');

-- Seed support messages - Fixed sender_type: 'customer' → 'user'
INSERT INTO support_messages (id, ticket_id, sender_id, sender_type, content, citations, created_at) VALUES
-- Ticket 1 conversation
('abcd1001-0001-0001-0001-000000000001', 'aaaa1001-0001-0001-0001-000000000001', '4e140685-8f38-49ff-aae0-d6109c46873d', 'user',
  'My international transfer is pending for 3 days. It says compliance review. What''s happening?', NULL, '2024-12-20T09:10:00Z'),
('abcd1001-0002-0001-0001-000000000002', 'aaaa1001-0001-0001-0001-000000000001', NULL, 'ai',
  'I can help with that. Transfers over AED 50,000 are reviewed for sanctions screening. I''ve flagged this to compliance for expedited review.',
  '[{"source": "International Transfer Guidelines", "type": "policy"}]', '2024-12-20T09:12:00Z'),
('abcd1001-0003-0001-0001-000000000003', 'aaaa1001-0001-0001-0001-000000000001', '51880b1d-3935-49dd-bac6-9469d33d3ee3', 'agent',
  'We''re reviewing the beneficiary details now. Expected update within 4 business hours.', NULL, '2024-12-20T10:30:00Z'),

-- Ticket 2 conversation
('abcd1002-0001-0001-0001-000000000001', 'aaaa1002-0001-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'user',
  'My card was damaged in the ATM. Can the replacement fee be waived?', NULL, '2024-12-18T13:20:00Z'),
('abcd1002-0002-0001-0001-000000000002', 'aaaa1002-0001-0001-0001-000000000002', NULL, 'ai',
  'I can request a fee waiver based on the ATM incident. Please confirm the ATM location and time.',
  '[{"source": "Card Replacement Policy", "type": "policy"}]', '2024-12-18T13:22:00Z'),
('abcd1002-0003-0001-0001-000000000003', 'aaaa1002-0001-0001-0001-000000000002', '33333333-3333-3333-3333-333333333333', 'user',
  'Dubai Marina Mall ATM, yesterday around 7pm.', NULL, '2024-12-18T13:25:00Z'),
('abcd1002-0004-0001-0001-000000000004', 'aaaa1002-0001-0001-0001-000000000002', '51880b1d-3935-49dd-bac6-9469d33d3ee3', 'agent',
  'Thanks. We''ve waived the fee and ordered the replacement. You''ll receive it in 5-7 business days.', NULL, '2024-12-18T15:05:00Z'),

-- Ticket 3 conversation
('abcd1003-0001-0001-0001-000000000001', 'aaaa1003-0001-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'user',
  'Need official statements for my business account for visa processing. Last 6 months.', NULL, '2024-12-17T08:40:00Z'),
('abcd1003-0002-0001-0001-000000000002', 'aaaa1003-0001-0001-0001-000000000003', '77777777-7777-7777-7777-777777777777', 'agent',
  'Got it. We''ll prepare stamped statements and email them within 24 hours.', NULL, '2024-12-17T12:15:00Z'),

-- Ticket 5 conversation
('abcd1005-0001-0001-0001-000000000001', 'aaaa1005-0001-0001-0001-000000000005', '44444444-4444-4444-4444-444444444444', 'user',
  'I keep getting the verification code, but the app loops back to login.', NULL, '2024-12-14T09:30:00Z'),
('abcd1005-0002-0001-0001-000000000002', 'aaaa1005-0001-0001-0001-000000000005', NULL, 'ai',
  'Thanks for reporting this. Clearing cached data usually resolves the verification loop. I can also reset your session token.',
  '[{"source": "Mobile App Support Playbook", "type": "policy"}]', '2024-12-14T09:35:00Z'),
('abcd1005-0003-0001-0001-000000000003', 'aaaa1005-0001-0001-0001-000000000005', '77777777-7777-7777-7777-777777777777', 'agent',
  'We reset the session token and confirmed login works. Let us know if it recurs.', NULL, '2024-12-14T11:25:00Z'),

-- Ticket 6 conversation
('abcd1006-0001-0001-0001-000000000001', 'aaaa1006-0001-0001-0001-000000000006', '4e140685-8f38-49ff-aae0-d6109c46873d', 'user',
  'Is there a daily cap for recurring transfers? I want to schedule AED 8,000 monthly.', NULL, '2024-12-13T10:05:00Z'),
('abcd1006-0002-0001-0001-000000000002', 'aaaa1006-0001-0001-0001-000000000006', NULL, 'ai',
  'Recurring transfers are capped at AED 10,000 per day for retail accounts. Your AED 8,000 schedule is within the limit.',
  '[{"source": "Transfer Limits Policy", "type": "policy"}]', '2024-12-13T10:10:00Z')

ON CONFLICT (id) DO NOTHING;
