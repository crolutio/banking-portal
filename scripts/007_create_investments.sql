-- Bank of the Future Database Schema
-- Script 007: Create Investment Tables

-- Portfolio holdings table
CREATE TABLE IF NOT EXISTS portfolio_holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  type investment_type NOT NULL,
  quantity DECIMAL(15,6) NOT NULL,
  avg_cost DECIMAL(15,2) NOT NULL,
  current_price DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  type investment_type NOT NULL,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

-- Risk profile table
CREATE TABLE IF NOT EXISTS risk_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  category risk_profile_category NOT NULL,
  questionnaire_answers JSONB DEFAULT '{}',
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_profiles ENABLE ROW LEVEL SECURITY;

-- Portfolio holdings policies
CREATE POLICY "Users can manage own holdings"
  ON portfolio_holdings FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "RMs can view client holdings"
  ON portfolio_holdings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND portfolio_holdings.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Watchlist policies
CREATE POLICY "Users can manage own watchlist"
  ON watchlist FOR ALL
  USING (auth.uid() = user_id);

-- Risk profile policies
CREATE POLICY "Users can manage own risk profile"
  ON risk_profiles FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "RMs can view client risk profiles"
  ON risk_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND risk_profiles.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Indexes
CREATE INDEX idx_holdings_user ON portfolio_holdings(user_id);
CREATE INDEX idx_watchlist_user ON watchlist(user_id);
CREATE INDEX idx_risk_profiles_user ON risk_profiles(user_id);
