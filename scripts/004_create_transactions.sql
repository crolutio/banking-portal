-- Bank of the Future Database Schema
-- Script 004: Create Transactions Table

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT NOT NULL,
  merchant TEXT,
  category transaction_category NOT NULL DEFAULT 'other',
  amount DECIMAL(15,2) NOT NULL,
  balance_after DECIMAL(15,2) NOT NULL,
  type transaction_type NOT NULL,
  status transaction_status NOT NULL DEFAULT 'completed',
  reference TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM accounts a 
      WHERE a.id = transactions.account_id 
      AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM accounts a 
      WHERE a.id = transactions.account_id 
      AND a.user_id = auth.uid()
    )
  );

-- RMs can view their clients' transactions
CREATE POLICY "RMs can view client transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM accounts a 
      JOIN profiles p ON a.user_id = p.id
      WHERE a.id = transactions.account_id
      AND p.assigned_rm_id = auth.uid()
    )
  );

-- Risk/Admin can view all transactions
CREATE POLICY "Risk and Admin can view all transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- Indexes
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(date DESC);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_transactions_status ON transactions(status);
