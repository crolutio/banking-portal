-- Bank of the Future Database Schema
-- Script 014: Create Policies & Product Terms Tables

-- Bank policies table
CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  effective_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product terms table
CREATE TABLE IF NOT EXISTS product_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type TEXT NOT NULL,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  content TEXT NOT NULL,
  effective_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_terms ENABLE ROW LEVEL SECURITY;

-- Policies are public read for active ones
CREATE POLICY "Anyone can view active policies"
  ON policies FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage policies"
  ON policies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
    )
  );

-- Product terms are public read
CREATE POLICY "Anyone can view active product terms"
  ON product_terms FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage product terms"
  ON product_terms FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
    )
  );

-- Indexes
CREATE INDEX idx_policies_category ON policies(category);
CREATE INDEX idx_product_terms_type ON product_terms(product_type);
