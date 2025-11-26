-- Bank of the Future Database Schema
-- Script 006: Create Loans and Loan Applications Tables

-- Loan offers/products table
CREATE TABLE IF NOT EXISTS loan_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type loan_type NOT NULL,
  name TEXT NOT NULL,
  min_amount DECIMAL(15,2) NOT NULL,
  max_amount DECIMAL(15,2) NOT NULL,
  min_term_months INTEGER NOT NULL,
  max_term_months INTEGER NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  apr DECIMAL(5,2) NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User loans table
CREATE TABLE IF NOT EXISTS loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES loan_products(id),
  type loan_type NOT NULL,
  principal_amount DECIMAL(15,2) NOT NULL,
  remaining_balance DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  term_months INTEGER NOT NULL,
  monthly_payment DECIMAL(15,2) NOT NULL,
  next_payment_date DATE NOT NULL,
  disbursement_date DATE,
  status loan_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Loan applications table
CREATE TABLE IF NOT EXISTS loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES loan_products(id),
  requested_amount DECIMAL(15,2) NOT NULL,
  requested_term_months INTEGER NOT NULL,
  purpose TEXT,
  employment_status TEXT,
  monthly_income DECIMAL(15,2),
  documents JSONB DEFAULT '[]',
  status loan_application_status NOT NULL DEFAULT 'draft',
  ai_assessment JSONB,
  reviewer_id UUID REFERENCES profiles(id),
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE loan_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

-- Loan products are public read
CREATE POLICY "Anyone can view loan products"
  ON loan_products FOR SELECT
  USING (is_active = TRUE);

-- Only admins can manage loan products
CREATE POLICY "Admins can manage loan products"
  ON loan_products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
    )
  );

-- Loans policies
CREATE POLICY "Users can view own loans"
  ON loans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "RMs can view client loans"
  ON loans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND loans.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

CREATE POLICY "Risk and Admin can view all loans"
  ON loans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- Loan applications policies
CREATE POLICY "Users can view own applications"
  ON loan_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON loan_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own draft applications"
  ON loan_applications FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft');

CREATE POLICY "RMs can view and update client applications"
  ON loan_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'relationship_manager'
      AND loan_applications.user_id IN (
        SELECT id FROM profiles WHERE assigned_rm_id = auth.uid()
      )
    )
  );

CREATE POLICY "Risk and Admin can view all applications"
  ON loan_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'risk_compliance')
    )
  );

-- Indexes
CREATE INDEX idx_loans_user ON loans(user_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loan_applications_user ON loan_applications(user_id);
CREATE INDEX idx_loan_applications_status ON loan_applications(status);
