-- Bank of the Future Database Schema
-- Script 012: Create Audit Logs Table

-- Audit logs table (immutable)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  user_role user_role NOT NULL,
  action TEXT NOT NULL,
  action_type audit_action_type NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  sources_accessed TEXT[] DEFAULT '{}',
  details JSONB DEFAULT '{}',
  ai_suggestion TEXT,
  user_confirmed BOOLEAN,
  redactions TEXT[] DEFAULT '{}',
  risk_flags TEXT[] DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins and risk/compliance can view audit logs
CREATE POLICY "Risk and Admin can view all audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- All authenticated users can insert audit logs (for their own actions)
CREATE POLICY "Users can insert own audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Prevent updates and deletes (audit logs are immutable)
-- No UPDATE or DELETE policies

-- Indexes
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
