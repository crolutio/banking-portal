-- =========================================================================
-- PRODUCTS TABLE — Banking DB
-- Run in Banking Supabase SQL Editor
-- A general product catalog for RM copilot and products page
-- =========================================================================

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read access on products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow anon read access on products"
  ON products FOR SELECT
  TO anon
  USING (true);

-- =========================================================================
-- SEED PRODUCTS
-- =========================================================================

INSERT INTO products (name, description) VALUES

-- Personal Loans
('Quick Personal Loan',
 'Unsecured personal loan from AED 5,000 to AED 50,000 with terms of 6–24 months at 8.99% APR. Same-day approval for existing customers with good standing. No collateral required. Early repayment permitted with no penalty. Ideal for short-term needs such as medical expenses, home repairs, or consolidating smaller debts. Requires minimum monthly income of AED 8,000 and 6+ months banking relationship.'),

('Premium Personal Loan',
 'Unsecured personal loan from AED 50,000 to AED 500,000 with terms of 12–60 months at 6.99% APR. Available to Premium and Private Banking customers. Includes dedicated relationship manager support, fee waivers on processing charges, and preferential rates for salary-transfer customers. Suited for major life events — weddings, education, high-value purchases. Requires minimum monthly income of AED 25,000 and 12+ months banking relationship.'),

-- Auto Finance
('New Car Finance',
 'Auto loan for brand-new vehicles, financing up to 80% of the vehicle value from AED 30,000 to AED 500,000 over 12–60 months at 3.99% APR. Includes comprehensive insurance for the first year, free vehicle registration, and flexible down payment options starting at 20%. Partnership with 40+ authorized dealers across the UAE. Salary-transfer customers receive 0.5% rate discount. Requires minimum monthly income of AED 10,000.'),

('Used Car Finance',
 'Auto loan for pre-owned vehicles up to 5 years old, financing from AED 20,000 to AED 300,000 over 12–48 months at 5.99% APR. Includes free vehicle valuation and inspection report. Insurance options available through bank partners at preferential group rates. Requires minimum monthly income of AED 8,000. Vehicle must pass bank-approved inspection and have valid service history.'),

-- Mortgage
('Home Purchase Mortgage',
 'Mortgage for residential property purchases from AED 500,000 to AED 10,000,000 with terms of 5–25 years at 3.49% APR. Up to 80% loan-to-value for UAE nationals, 75% for expatriates. Fixed-rate option available for the first 3 or 5 years, then variable. Includes free property valuation, mandatory life insurance (bundled at preferential rate), and no early settlement fee after 3 years. Available for ready and off-plan properties from approved developers. Requires minimum monthly income of AED 15,000 and 2+ years employment history.'),

('Home Refinance',
 'Refinance an existing mortgage from another lender at 3.29% APR, from AED 300,000 to AED 8,000,000 over 5–20 years. Cash-out option available up to 70% of current property value. No early settlement penalty. Quick processing — approval within 5 business days for complete applications. Ideal for customers paying higher rates elsewhere or needing to unlock home equity for renovations, investments, or business needs. Free property revaluation included.'),

-- Business Loans
('SME Working Capital Loan',
 'Short-to-medium term business loan from AED 50,000 to AED 2,000,000 over 12–48 months at 7.99% APR. No collateral required for amounts under AED 500,000. Minimal documentation — 6 months bank statements and valid trade license. Revolving credit option available for repeat borrowers. Designed for inventory purchases, payroll bridging, seasonal cash flow gaps, and supplier payments. Business must be operational for 2+ years with positive cash flow.'),

('Business Expansion Loan',
 'Long-term business loan from AED 200,000 to AED 10,000,000 over 24–84 months at 6.49% APR. Supports expansion into new markets, equipment purchases, franchise acquisition, and commercial property. Flexible collateral options including property, equipment, and receivables. Up to 6-month grace period on principal repayment. Dedicated business banking relationship manager included. Requires audited financials for 2+ years and detailed business plan for amounts over AED 1,000,000.'),

-- Credit Lines
('Personal Credit Line',
 'Revolving credit facility from AED 10,000 to AED 100,000 at 10.99% APR. Draw funds as needed and pay interest only on the utilized amount. Instant access via mobile app or branch. Automatic replenishment as you repay. Ideal as an emergency fund or for managing irregular expenses. Annual renewal with no reapplication needed for customers in good standing. Requires minimum monthly income of AED 10,000.'),

('Business Credit Line',
 'Revolving business credit facility from AED 50,000 to AED 500,000 at 8.99% APR. Flexible drawdown through online banking, cheque, or direct transfer. Interest charged only on the utilized portion. Easy annual renewal process. Designed to smooth out cash flow cycles, cover seasonal demand spikes, or take advantage of time-sensitive supplier discounts. Business must be operational for 1+ year with turnover of AED 500,000+.'),

-- Credit Cards
('Cashback Rewards Card',
 'Visa Platinum credit card with unlimited 2% cashback on grocery and fuel, 1.5% on dining, and 1% on all other purchases. No annual fee for the first year (AED 350/year thereafter, waived with AED 60,000+ annual spend). Credit limits from AED 10,000 to AED 75,000. Includes purchase protection, extended warranty, and airport lounge access (4 visits/year). Contactless and Apple Pay/Google Pay enabled. Ideal for everyday spenders who prefer cash rewards over points.'),

('Travel Rewards Card',
 'Visa Signature credit card earning 3x points on international spend, 2x on airlines and hotels, and 1x on everything else. Points redeemable for flights, hotel stays, and upgrades across 20+ airline and hotel partners. No foreign transaction fees. Complimentary airport lounge access worldwide (unlimited), travel insurance up to AED 2,000,000, and concierge service. Annual fee AED 900, waived with AED 120,000+ annual spend. Credit limits from AED 30,000 to AED 200,000. Ideal for frequent travelers and high spenders.'),

('Premium Black Card',
 'Visa Infinite card for Private Banking customers. 5x points on luxury, travel, and dining. Personal concierge, unlimited lounge access for cardholder + 1 guest, complimentary golf green fees at 15 UAE courses, and priority access to exclusive events. Comprehensive travel insurance, purchase protection up to AED 50,000 per item, and dedicated 24/7 support line. Annual fee AED 3,000. Credit limits from AED 100,000 to AED 500,000. By invitation or for customers with AED 500,000+ in assets under management.'),

-- Savings & Deposits
('High-Yield Savings Account',
 'Tiered savings account offering up to 4.5% annual return on balances over AED 100,000 (3.5% for AED 25,000–100,000, 2.5% below AED 25,000). No lock-in period — withdraw anytime with no penalty. Interest paid monthly. FDIC-equivalent protection up to AED 500,000. Automatic sweep available from current account when balance exceeds a set threshold. Ideal for emergency funds and short-term savings goals. No minimum balance requirement to open.'),

('Fixed Deposit',
 'Term deposit with guaranteed returns from 4.0% (3 months) to 5.5% (24 months). Minimum deposit AED 10,000. Available in AED, USD, GBP, and EUR. Early withdrawal permitted with reduced rate (1% penalty on earned interest). Auto-renewal option at maturity. Laddering strategy available — split across multiple tenors for liquidity and rate optimization. Ideal for customers seeking capital preservation with predictable returns. Sharia-compliant variant available.'),

-- Insurance
('Life Protection Plan',
 'Term life insurance covering AED 250,000 to AED 5,000,000 with premiums starting from AED 50/month. Coverage options include critical illness rider, disability income protection, and accidental death benefit (2x payout). Premium remains level for the chosen term (10, 15, 20, or 25 years). Simplified underwriting for amounts under AED 1,000,000 — no medical exam required. Premium discounts for non-smokers and active lifestyle participants. Ideal for families, mortgage holders, and business owners needing key-person coverage.'),

('Property Insurance',
 'Comprehensive home and property insurance for owners and tenants. Building coverage up to replacement value, contents coverage from AED 50,000 to AED 500,000. Covers fire, flood, theft, accidental damage, and natural disasters. Optional add-ons: domestic worker coverage, personal liability (up to AED 1,000,000), and temporary accommodation if home becomes uninhabitable. Annual premiums from AED 800 for apartments, AED 1,500 for villas. 10% multi-year discount for 3-year policies. Required for all mortgage customers.'),

-- Investments
('Managed Investment Portfolio',
 'Professionally managed investment portfolio with minimum AED 100,000. Three risk profiles: Conservative (target 5–7% annual return, 70% bonds/30% equities), Balanced (target 8–10%, 50/50 split), and Growth (target 12–15%, 30% bonds/70% equities). Quarterly rebalancing, monthly performance reports, and annual strategy review with your relationship manager. Management fee 1.25% annually. Access to global markets including US, European, and emerging market equities and fixed income. ESG-compliant portfolio option available.'),

('Mutual Fund Marketplace',
 'Access to 50+ mutual funds across asset classes, geographies, and risk profiles. Minimum investment from AED 5,000 per fund. Includes money market funds (low risk, high liquidity), bond funds, equity funds, and sector-specific funds (technology, healthcare, real estate). Online trading via mobile app with real-time NAV pricing. No entry load on selected partner funds. Annual expense ratios from 0.5% to 2.0% depending on fund. SIP (Systematic Investment Plan) available — automated monthly contributions from AED 500. Ideal for customers wanting diversification without the minimum required for managed portfolios.');

-- =========================================================================
-- VERIFY
-- =========================================================================
SELECT id, name, LEFT(description, 80) AS description_preview FROM products ORDER BY name;
