-- Seed profiles with demo users for each role
-- Note: These use fixed UUIDs for demo purposes. In production, users would be created via Supabase Auth.

INSERT INTO profiles (id, email, full_name, phone, role, segment, kyc_status, avatar_url, assigned_rm_id) VALUES
-- Fixed enum values: 'premium' -> 'Premium', 'mass_affluent' -> 'Premium', 'retail' -> 'Standard', 'private' -> 'VIP'
-- Customers
('11111111-1111-1111-1111-111111111111', 'sarah.chen@email.com', 'Sarah Chen', '+971501234567', 'retail_customer', 'Premium', 'Verified', '/placeholder.svg?height=40&width=40', NULL),
('22222222-2222-2222-2222-222222222222', 'mohammed.ali@email.com', 'Mohammed Ali', '+971502345678', 'retail_customer', 'Premium', 'Verified', '/placeholder.svg?height=40&width=40', NULL),
('33333333-3333-3333-3333-333333333333', 'emma.wilson@email.com', 'Emma Wilson', '+971503456789', 'retail_customer', 'Standard', 'Verified', '/placeholder.svg?height=40&width=40', NULL),
('44444444-4444-4444-4444-444444444444', 'raj.patel@email.com', 'Raj Patel', '+971504567890', 'retail_customer', 'VIP', 'Verified', '/placeholder.svg?height=40&width=40', NULL),
('55555555-5555-5555-5555-555555555555', 'fatima.hassan@email.com', 'Fatima Hassan', '+971505678901', 'sme_customer', 'Premium', 'Pending', '/placeholder.svg?height=40&width=40', NULL),

-- Relationship Managers
('66666666-6666-6666-6666-666666666666', 'james.rm@bank.com', 'James Rodriguez', '+971506789012', 'relationship_manager', NULL, 'Verified', '/placeholder.svg?height=40&width=40', NULL),
('77777777-7777-7777-7777-777777777777', 'lisa.rm@bank.com', 'Lisa Thompson', '+971507890123', 'relationship_manager', NULL, 'Verified', '/placeholder.svg?height=40&width=40', NULL),

-- Risk & Compliance
('88888888-8888-8888-8888-888888888888', 'david.risk@bank.com', 'David Kim', '+971508901234', 'risk_compliance', NULL, 'Verified', '/placeholder.svg?height=40&width=40', NULL),

-- Admin
('99999999-9999-9999-9999-999999999999', 'admin@bank.com', 'System Administrator', '+971509012345', 'admin', NULL, 'Verified', '/placeholder.svg?height=40&width=40', NULL)

ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role,
  segment = EXCLUDED.segment,
  kyc_status = EXCLUDED.kyc_status;

-- Assign RMs to customers
UPDATE profiles SET assigned_rm_id = '66666666-6666-6666-6666-666666666666' 
WHERE id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444');

UPDATE profiles SET assigned_rm_id = '77777777-7777-7777-7777-777777777777' 
WHERE id IN ('33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555');
