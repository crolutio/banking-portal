-- Bank of the Future Database Schema
-- Script 008: Create Savings Goals Tables

-- Savings goals table
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

-- Savings goal transactions table
CREATE TABLE IF NOT EXISTS savings_goal_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES savings_goals(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goal_transactions ENABLE ROW LEVEL SECURITY;

-- Savings goals policies
CREATE POLICY "Users can manage own savings goals"
  ON savings_goals FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "RMs can view client savings goals"
  ON savings_goals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND savings_goals.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Savings goal transactions policies
CREATE POLICY "Users can manage own goal transactions"
  ON savings_goal_transactions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM savings_goals sg 
      WHERE sg.id = savings_goal_transactions.goal_id 
      AND sg.user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX idx_savings_goals_user ON savings_goals(user_id);
CREATE INDEX idx_savings_goals_status ON savings_goals(status);
CREATE INDEX idx_savings_goal_transactions_goal ON savings_goal_transactions(goal_id);
