-- Bank of the Future Database Schema
-- Script 005: Create Cards Table

CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  type card_type NOT NULL,
  brand card_brand NOT NULL DEFAULT 'Visa',
  last_four TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  status card_status NOT NULL DEFAULT 'active',
  credit_limit DECIMAL(15,2),
  spent_amount DECIMAL(15,2) DEFAULT 0,
  cardholder_name TEXT NOT NULL,
  pin_set BOOLEAN DEFAULT FALSE,
  contactless_enabled BOOLEAN DEFAULT TRUE,
  online_enabled BOOLEAN DEFAULT TRUE,
  atm_limit DECIMAL(15,2) DEFAULT 5000,
  pos_limit DECIMAL(15,2) DEFAULT 10000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Policies for cards
CREATE POLICY "Users can view own cards"
  ON cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own cards"
  ON cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cards"
  ON cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RMs can view their clients' cards
CREATE POLICY "RMs can view client cards"
  ON cards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND cards.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Risk/Admin can view all cards
CREATE POLICY "Risk and Admin can view all cards"
  ON cards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- Indexes
CREATE INDEX idx_cards_user ON cards(user_id);
CREATE INDEX idx_cards_account ON cards(account_id);
CREATE INDEX idx_cards_status ON cards(status);
