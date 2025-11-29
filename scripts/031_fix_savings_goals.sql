-- Script 031: Fix Savings Goals and Disable RLS for Demo
-- Creates tables if missing, disables RLS safely, and seeds data

-- 0. Create Enums (dependencies)
DO $$ BEGIN
    CREATE TYPE savings_goal_category AS ENUM ('travel', 'shopping', 'emergency', 'home', 'vehicle', 'wedding', 'education', 'other');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE savings_goal_status AS ENUM ('active', 'completed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 1. Create Tables if not exist
CREATE TABLE IF NOT EXISTS savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category savings_goal_category NOT NULL,
  target_amount DECIMAL(15,2) NOT NULL,
  current_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'AED',
  target_date DATE NOT NULL,
  monthly_contribution DECIMAL(15,2) NOT NULL DEFAULT 0,
  auto_debit BOOLEAN DEFAULT FALSE,
  source_account_id UUID REFERENCES accounts(id),
  status savings_goal_status NOT NULL DEFAULT 'active',
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS savings_goal_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES savings_goals(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Disable RLS safely
DO $$
BEGIN
    EXECUTE 'ALTER TABLE profiles DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE accounts DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE transactions DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE cards DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE loans DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE loan_applications DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE loan_products DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE portfolio_holdings DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE savings_goals DISABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE savings_goal_transactions DISABLE ROW LEVEL SECURITY';
    
    -- Try to disable RLS on tables that might not exist
    BEGIN EXECUTE 'ALTER TABLE risk_alerts DISABLE ROW LEVEL SECURITY'; EXCEPTION WHEN undefined_table THEN NULL; END;
    BEGIN EXECUTE 'ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY'; EXCEPTION WHEN undefined_table THEN NULL; END;
    BEGIN EXECUTE 'ALTER TABLE marketplace_apps DISABLE ROW LEVEL SECURITY'; EXCEPTION WHEN undefined_table THEN NULL; END;
    BEGIN EXECUTE 'ALTER TABLE connected_apps DISABLE ROW LEVEL SECURITY'; EXCEPTION WHEN undefined_table THEN NULL; END;
    BEGIN EXECUTE 'ALTER TABLE policies DISABLE ROW LEVEL SECURITY'; EXCEPTION WHEN undefined_table THEN NULL; END;
END $$;

-- 3. Clear existing savings goals
TRUNCATE TABLE savings_goals CASCADE;

-- 4. Seed Savings Goals with dynamic account lookups
DO $$
DECLARE
    u_sarah UUID := '11111111-1111-1111-1111-111111111111';
    u_mohammed UUID := '22222222-2222-2222-2222-222222222222';
    u_emma UUID := '33333333-3333-3333-3333-333333333333';
    u_raj UUID := '44444444-4444-4444-4444-444444444444';
    u_fatima UUID := '55555555-5555-5555-5555-555555555555';
    
    acc_sarah UUID;
    acc_mohammed UUID;
    acc_emma UUID;
    acc_raj UUID;
    acc_fatima UUID;
BEGIN
    -- Get primary account IDs
    SELECT id INTO acc_sarah FROM accounts WHERE user_id = u_sarah AND type = 'current' LIMIT 1;
    SELECT id INTO acc_mohammed FROM accounts WHERE user_id = u_mohammed AND type = 'current' LIMIT 1;
    SELECT id INTO acc_emma FROM accounts WHERE user_id = u_emma AND type = 'current' LIMIT 1;
    SELECT id INTO acc_raj FROM accounts WHERE user_id = u_raj AND type = 'current' LIMIT 1;
    SELECT id INTO acc_fatima FROM accounts WHERE user_id = u_fatima AND type = 'current' LIMIT 1;

    -- Sarah's Goals
    IF acc_sarah IS NOT NULL THEN
        INSERT INTO savings_goals (user_id, name, category, target_amount, current_amount, monthly_contribution, target_date, status, source_account_id, auto_debit, image_url) VALUES
        (u_sarah, 'Maldives Vacation', 'travel', 25000.00, 18500.00, 2000.00, '2025-06-01', 'active', acc_sarah, true, '/maldives-beach-resort-tropical-paradise.jpg'),
        (u_sarah, 'MacBook Pro', 'shopping', 12000.00, 8400.00, 1200.00, '2025-03-01', 'active', acc_sarah, true, '/macbook-pro-laptop-sleek-modern.jpg'),
        (u_sarah, 'Emergency Fund', 'emergency', 50000.00, 35000.00, 2500.00, '2025-12-31', 'active', acc_sarah, true, '/safety-umbrella-protection-financial-security.jpg');
    END IF;

    -- Mohammed's Goals
    IF acc_mohammed IS NOT NULL THEN
        INSERT INTO savings_goals (user_id, name, category, target_amount, current_amount, monthly_contribution, target_date, status, source_account_id, auto_debit, image_url) VALUES
        (u_mohammed, 'Business Expansion', 'other', 150000.00, 67500.00, 10000.00, '2025-09-01', 'active', acc_mohammed, true, '/placeholder.svg?height=200&width=300'),
        (u_mohammed, 'New Car', 'vehicle', 200000.00, 85000.00, 8000.00, '2025-12-01', 'active', acc_mohammed, false, '/placeholder.svg?height=200&width=300');
    END IF;

    -- Emma's Goals
    IF acc_emma IS NOT NULL THEN
        INSERT INTO savings_goals (user_id, name, category, target_amount, current_amount, monthly_contribution, target_date, status, source_account_id, auto_debit, image_url) VALUES
        (u_emma, 'Europe Trip', 'travel', 15000.00, 8500.00, 1500.00, '2025-08-01', 'active', acc_emma, true, '/placeholder.svg?height=200&width=300'),
        (u_emma, 'iPhone 16 Pro', 'shopping', 5500.00, 2200.00, 550.00, '2025-04-01', 'active', acc_emma, false, '/iphone-smartphone-latest-model.jpg');
    END IF;

    -- Raj's Goals
    IF acc_raj IS NOT NULL THEN
        INSERT INTO savings_goals (user_id, name, category, target_amount, current_amount, monthly_contribution, target_date, status, source_account_id, auto_debit, image_url) VALUES
        (u_raj, 'Villa Down Payment', 'home', 1000000.00, 650000.00, 50000.00, '2025-12-31', 'active', acc_raj, true, '/modern-house-keys-home-ownership-dream.jpg'),
        (u_raj, 'Yacht Charter', 'travel', 100000.00, 75000.00, 12500.00, '2025-06-01', 'active', acc_raj, true, '/placeholder.svg?height=200&width=300');
    END IF;

    -- Fatima's Goals
    IF acc_fatima IS NOT NULL THEN
        INSERT INTO savings_goals (user_id, name, category, target_amount, current_amount, monthly_contribution, target_date, status, source_account_id, auto_debit, image_url) VALUES
        (u_fatima, 'Wedding Fund', 'wedding', 80000.00, 42000.00, 4000.00, '2025-10-01', 'active', acc_fatima, true, '/wedding-celebration-rings-romantic.jpg'),
        (u_fatima, 'Education Course', 'education', 20000.00, 8000.00, 2000.00, '2025-06-01', 'active', acc_fatima, true, '/placeholder.svg?height=200&width=300');
    END IF;

END $$;
