-- Bank of the Future Database Schema
-- Script 011: Create Risk Alerts Tables

-- Risk alerts table
CREATE TABLE IF NOT EXISTS risk_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type alert_type NOT NULL,
  severity alert_severity NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status alert_status NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES profiles(id),
  evidence JSONB DEFAULT '[]',
  ai_analysis JSONB,
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;

-- Only risk/compliance and admins can view alerts
CREATE POLICY "Risk and Admin can view all alerts"
  ON risk_alerts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- Risk/compliance can manage alerts
CREATE POLICY "Risk can manage alerts"
  ON risk_alerts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- RMs can view alerts for their clients
CREATE POLICY "RMs can view client alerts"
  ON risk_alerts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND risk_alerts.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

-- Indexes
CREATE INDEX idx_risk_alerts_user ON risk_alerts(user_id);
CREATE INDEX idx_risk_alerts_status ON risk_alerts(status);
CREATE INDEX idx_risk_alerts_severity ON risk_alerts(severity);
CREATE INDEX idx_risk_alerts_assigned ON risk_alerts(assigned_to);
