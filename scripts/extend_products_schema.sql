-- =========================================================================
-- EXTEND PRODUCTS SCHEMA + BACKFILL (Banking DB)
-- Run in Banking Supabase SQL Editor
-- Adds 9 new columns and backfills the existing 20 products
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: Add new columns (all nullable for backwards compatibility)
-- -------------------------------------------------------------------------
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS min_amount NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS max_amount NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rate_pct NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS term_label TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS key_features TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS target_segment TEXT;


-- -------------------------------------------------------------------------
-- STEP 2: Backfill — Personal Loans
-- Categories: loans, mortgages, credit_lines, cards, deposits, insurance, investments
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'loans',
  icon = 'Coins',
  tagline = 'Same-day cash for unexpected needs',
  min_amount = 5000,
  max_amount = 50000,
  rate_pct = 8.99,
  term_label = '6–24 months',
  key_features = ARRAY[
    'Same-day approval for existing customers',
    'No collateral required',
    'Early repayment with no penalty',
    'Min income KES 8,000/month'
  ],
  target_segment = 'Mass'
WHERE name = 'Quick Personal Loan';

UPDATE products SET
  category = 'loans',
  icon = 'Gem',
  tagline = 'Higher limits with preferential rates',
  min_amount = 50000,
  max_amount = 500000,
  rate_pct = 6.99,
  term_label = '12–60 months',
  key_features = ARRAY[
    'Dedicated relationship manager',
    'Processing fee waivers',
    'Preferential rates for salary transfer',
    'Min income KES 25,000/month'
  ],
  target_segment = 'Premium'
WHERE name = 'Premium Personal Loan';


-- -------------------------------------------------------------------------
-- STEP 3: Backfill — Auto Finance
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'loans',
  icon = 'Car',
  tagline = 'Up to 80% financing on brand-new vehicles',
  min_amount = 30000,
  max_amount = 500000,
  rate_pct = 3.99,
  term_label = '12–60 months',
  key_features = ARRAY[
    'Up to 80% loan-to-value',
    'Free comprehensive insurance (year 1)',
    '0.5% rate discount for salary transfer',
    '40+ authorized dealer partners'
  ],
  target_segment = 'Mass'
WHERE name = 'New Car Finance';

UPDATE products SET
  category = 'loans',
  icon = 'Car',
  tagline = 'Finance pre-owned vehicles up to 5 years old',
  min_amount = 20000,
  max_amount = 300000,
  rate_pct = 5.99,
  term_label = '12–48 months',
  key_features = ARRAY[
    'Free vehicle valuation & inspection',
    'Insurance options at group rates',
    'Service history verification included',
    'Min income KES 8,000/month'
  ],
  target_segment = 'Mass'
WHERE name = 'Used Car Finance';


-- -------------------------------------------------------------------------
-- STEP 4: Backfill — Mortgages
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'mortgages',
  icon = 'Home',
  tagline = 'Own your home with up to 80% financing',
  min_amount = 500000,
  max_amount = 10000000,
  rate_pct = 3.49,
  term_label = '5–25 years',
  key_features = ARRAY[
    'Up to 80% loan-to-value',
    'Fixed-rate option (3 or 5 years)',
    'Free property valuation',
    'No early settlement fee after year 3'
  ],
  target_segment = 'Premium'
WHERE name = 'Home Purchase Mortgage';

UPDATE products SET
  category = 'mortgages',
  icon = 'RefreshCcw',
  tagline = 'Lower your rate or unlock home equity',
  min_amount = 300000,
  max_amount = 8000000,
  rate_pct = 3.29,
  term_label = '5–20 years',
  key_features = ARRAY[
    'Cash-out option up to 70% LTV',
    'No early settlement penalty',
    'Approval within 5 business days',
    'Free property revaluation'
  ],
  target_segment = 'Premium'
WHERE name = 'Home Refinance';


-- -------------------------------------------------------------------------
-- STEP 5: Backfill — Business Loans
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'loans',
  icon = 'Briefcase',
  tagline = 'Working capital for growing SMEs',
  min_amount = 50000,
  max_amount = 2000000,
  rate_pct = 7.99,
  term_label = '12–48 months',
  key_features = ARRAY[
    'No collateral under KES 500,000',
    '6 months bank statements only',
    'Revolving credit option available',
    '2+ years business operations required'
  ],
  target_segment = 'SME'
WHERE name = 'SME Working Capital Loan';

UPDATE products SET
  category = 'loans',
  icon = 'TrendingUp',
  tagline = 'Long-term capital for business expansion',
  min_amount = 200000,
  max_amount = 10000000,
  rate_pct = 6.49,
  term_label = '24–84 months',
  key_features = ARRAY[
    'Flexible collateral options',
    'Up to 6-month grace period',
    'Dedicated business banker',
    'Audited financials required'
  ],
  target_segment = 'SME'
WHERE name = 'Business Expansion Loan';


-- -------------------------------------------------------------------------
-- STEP 6: Backfill — Credit Lines
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'credit_lines',
  icon = 'Wallet',
  tagline = 'Pay interest only on what you use',
  min_amount = 10000,
  max_amount = 100000,
  rate_pct = 10.99,
  term_label = 'Revolving',
  key_features = ARRAY[
    'Draw funds as needed',
    'Interest only on utilized amount',
    'Instant access via mobile app',
    'Annual renewal — no reapplication'
  ],
  target_segment = 'Mass'
WHERE name = 'Personal Credit Line';

UPDATE products SET
  category = 'credit_lines',
  icon = 'Wallet',
  tagline = 'Smooth cash flow for your business',
  min_amount = 50000,
  max_amount = 500000,
  rate_pct = 8.99,
  term_label = 'Revolving',
  key_features = ARRAY[
    'Flexible drawdown channels',
    'Interest only on utilized portion',
    'Easy annual renewal',
    'Turnover KES 500,000+ required'
  ],
  target_segment = 'SME'
WHERE name = 'Business Credit Line';


-- -------------------------------------------------------------------------
-- STEP 7: Backfill — Credit Cards
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'cards',
  icon = 'CreditCard',
  tagline = '2% cashback on groceries and fuel',
  min_amount = 10000,
  max_amount = 75000,
  rate_pct = NULL,
  term_label = 'Annual',
  key_features = ARRAY[
    '2% cashback on grocery & fuel',
    '1.5% on dining, 1% on everything else',
    'No annual fee year 1 (then KES 350)',
    'Airport lounge access (4 visits/year)'
  ],
  target_segment = 'Mass'
WHERE name = 'Cashback Rewards Card';

UPDATE products SET
  category = 'cards',
  icon = 'Plane',
  tagline = 'Earn points on every trip, fly more',
  min_amount = 30000,
  max_amount = 200000,
  rate_pct = NULL,
  term_label = 'Annual',
  key_features = ARRAY[
    '3x points on international spend',
    'No foreign transaction fees',
    'Unlimited airport lounge access',
    'Travel insurance up to KES 2M'
  ],
  target_segment = 'Premium'
WHERE name = 'Travel Rewards Card';

UPDATE products SET
  category = 'cards',
  icon = 'Sparkles',
  tagline = 'Invitation-only luxury card',
  min_amount = 100000,
  max_amount = 500000,
  rate_pct = NULL,
  term_label = 'Annual',
  key_features = ARRAY[
    '5x points on luxury, travel & dining',
    'Personal concierge service',
    'Unlimited lounge access + 1 guest',
    'Annual fee KES 3,000'
  ],
  target_segment = 'Private'
WHERE name = 'Premium Black Card';


-- -------------------------------------------------------------------------
-- STEP 8: Backfill — Deposits
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'deposits',
  icon = 'PiggyBank',
  tagline = 'Earn up to 4.5% on idle cash',
  min_amount = 0,
  max_amount = NULL,
  rate_pct = 4.5,
  term_label = 'No lock-in',
  key_features = ARRAY[
    'Tiered rates up to 4.5%',
    'Withdraw anytime, no penalty',
    'Interest paid monthly',
    'No minimum balance to open'
  ],
  target_segment = 'Mass'
WHERE name = 'High-Yield Savings Account';

UPDATE products SET
  category = 'deposits',
  icon = 'Vault',
  tagline = 'Guaranteed returns up to 5.5%',
  min_amount = 10000,
  max_amount = NULL,
  rate_pct = 5.5,
  term_label = '3–24 months',
  key_features = ARRAY[
    'Rates from 4.0% (3mo) to 5.5% (24mo)',
    'Multi-currency: KES, USD, GBP, EUR',
    'Auto-renewal at maturity',
    'Sharia-compliant variant available'
  ],
  target_segment = 'Mass'
WHERE name = 'Fixed Deposit';


-- -------------------------------------------------------------------------
-- STEP 9: Backfill — Insurance
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'insurance',
  icon = 'ShieldCheck',
  tagline = 'Protect your family from the unexpected',
  min_amount = 250000,
  max_amount = 5000000,
  rate_pct = NULL,
  term_label = '10–25 years',
  key_features = ARRAY[
    'Premiums from KES 50/month',
    'Critical illness rider available',
    'No medical exam under KES 1M',
    '2x payout on accidental death'
  ],
  target_segment = 'Mass'
WHERE name = 'Life Protection Plan';

UPDATE products SET
  category = 'insurance',
  icon = 'Home',
  tagline = 'Cover your home, contents, and liability',
  min_amount = 50000,
  max_amount = 500000,
  rate_pct = NULL,
  term_label = 'Annual',
  key_features = ARRAY[
    'Fire, flood, theft, natural disasters',
    'Personal liability up to KES 1M',
    'Premiums from KES 800/year',
    '10% discount on 3-year policies'
  ],
  target_segment = 'Mass'
WHERE name = 'Property Insurance';


-- -------------------------------------------------------------------------
-- STEP 10: Backfill — Existing Investments
-- -------------------------------------------------------------------------
UPDATE products SET
  category = 'investments',
  icon = 'LineChart',
  tagline = 'Professionally managed portfolios from KES 100K',
  min_amount = 100000,
  max_amount = NULL,
  rate_pct = NULL,
  term_label = 'Open-ended',
  key_features = ARRAY[
    '3 risk profiles: Conservative, Balanced, Growth',
    'Quarterly rebalancing',
    'Management fee 1.25% annually',
    'ESG-compliant option available'
  ],
  target_segment = 'Premium'
WHERE name = 'Managed Investment Portfolio';

UPDATE products SET
  category = 'investments',
  icon = 'PieChart',
  tagline = 'Access 50+ funds from KES 5,000',
  min_amount = 5000,
  max_amount = NULL,
  rate_pct = NULL,
  term_label = 'Open-ended',
  key_features = ARRAY[
    '50+ funds across asset classes',
    'Real-time NAV pricing in-app',
    'SIP from KES 500/month',
    'No entry load on partner funds'
  ],
  target_segment = 'Mass'
WHERE name = 'Mutual Fund Marketplace';


-- -------------------------------------------------------------------------
-- STEP 11: Verify backfill
-- -------------------------------------------------------------------------
SELECT
  category,
  COUNT(*) AS product_count,
  string_agg(name, ', ' ORDER BY name) AS products
FROM products
GROUP BY category
ORDER BY category;

-- Check no products missing required new fields
SELECT name, category, icon, tagline
FROM products
WHERE category IS NULL OR icon IS NULL OR tagline IS NULL OR key_features IS NULL
ORDER BY name;
