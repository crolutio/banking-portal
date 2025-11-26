-- Bank of the Future Database Schema
-- Script 009: Create Connected Apps (Marketplace) Tables

-- Available apps in marketplace
CREATE TABLE IF NOT EXISTS marketplace_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category connected_app_category NOT NULL,
  logo_url TEXT,
  credit_score_points INTEGER NOT NULL DEFAULT 0,
  data_shared TEXT[] DEFAULT '{}',
  offers JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User connected apps
CREATE TABLE IF NOT EXISTS connected_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  app_id UUID NOT NULL REFERENCES marketplace_apps(id) ON DELETE CASCADE,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  sync_data JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, app_id)
);

-- Credit score contributions from connected apps
CREATE TABLE IF NOT EXISTS credit_score_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  connected_app_id UUID NOT NULL REFERENCES connected_apps(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE marketplace_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_score_contributions ENABLE ROW LEVEL SECURITY;

-- Marketplace apps are public read
CREATE POLICY "Anyone can view marketplace apps"
  ON marketplace_apps FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage marketplace apps"
  ON marketplace_apps FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
    )
  );

-- Connected apps policies
CREATE POLICY "Users can manage own connected apps"
  ON connected_apps FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "RMs can view client connected apps"
  ON connected_apps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND connected_apps.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Credit score contributions policies
CREATE POLICY "Users can view own credit contributions"
  ON credit_score_contributions FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_connected_apps_user ON connected_apps(user_id);
CREATE INDEX idx_connected_apps_app ON connected_apps(app_id);
CREATE INDEX idx_credit_contributions_user ON credit_score_contributions(user_id);
