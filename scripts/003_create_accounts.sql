-- Bank of the Future Database Schema
-- Script 003: Create Accounts Table

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type account_type NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AED',
  balance DECIMAL(15,2) NOT NULL DEFAULT 0,
  available_balance DECIMAL(15,2) NOT NULL DEFAULT 0,
  account_number TEXT NOT NULL UNIQUE,
  iban TEXT,
  status account_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- Policies for accounts
CREATE POLICY "Users can view own accounts"
  ON accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own accounts"
  ON accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own accounts"
  ON accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RMs can view their clients' accounts
CREATE POLICY "RMs can view client accounts"
  ON accounts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND accounts.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Risk/Admin can view all accounts
CREATE POLICY "Risk and Admin can view all accounts"
  ON accounts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- Indexes
CREATE INDEX idx_accounts_user ON accounts(user_id);
CREATE INDEX idx_accounts_type ON accounts(type);
CREATE INDEX idx_accounts_status ON accounts(status);
