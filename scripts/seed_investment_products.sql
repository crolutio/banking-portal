-- =========================================================================
-- SEED INVESTMENT PRODUCTS (Banking DB)
-- Run in Banking Supabase SQL Editor
-- Adds 8 market-agnostic investment products to the catalog
-- Prerequisite: extend_products_schema.sql must be run first
-- =========================================================================

INSERT INTO products (
  name, description, category, icon, tagline,
  min_amount, max_amount, rate_pct, term_label, key_features, target_segment
) VALUES

-- 1. Treasury Bills
('Treasury Bills',
 'Short-term government securities with maturities of 91, 182, or 364 days. Backed by the government, considered virtually risk-free. Sold at a discount to face value — yield equals the difference between purchase price and face value at maturity. Auctioned weekly with competitive and non-competitive bidding. Minimum investment KES 100,000. Returns currently range from 9–13% depending on tenor and market conditions. Suitable for conservative investors needing capital preservation with short liquidity windows. Interest is exempt from withholding tax for residents.',
 'investments', 'ScrollText', 'Short-term, risk-free government securities',
 100000, NULL, 13, '91/182/364 days',
 ARRAY[
   'Government-backed, virtually risk-free',
   'Returns 9–13% depending on tenor',
   'Three tenors: 91, 182, 364 days',
   'Tax exempt for residents'
 ],
 'Mass'),

-- 2. Government Bonds
('Government Bonds',
 'Long-term sovereign debt instruments with maturities ranging from 2 to 30 years. Pay semi-annual coupons (interest) at a fixed or floating rate. Includes infrastructure bonds which are typically tax-exempt and offer attractive yields. Tradeable on the secondary market for liquidity before maturity. Returns typically 11–14% depending on tenor. Minimum investment KES 50,000. Ideal for long-term wealth building, retirement planning, and predictable income streams. Lower volatility than equities.',
 'investments', 'Landmark', 'Long-term sovereign debt with predictable income',
 50000, NULL, 14, '2–30 years',
 ARRAY[
   'Semi-annual coupon payments',
   'Tradeable on secondary market',
   'Tax-exempt infrastructure bonds available',
   'Returns 11–14% depending on tenor'
 ],
 'Mass'),

-- 3. Money Market Fund
('Money Market Fund',
 'Collective investment scheme that pools investor funds and invests in short-term, high-quality debt instruments including T-bills, commercial paper, and bank deposits. Daily compounding interest, with funds available within 2–3 business days. No lock-in period. Returns currently 8–11% per annum, paid daily or monthly depending on the fund. Minimum investment from KES 1,000. Lower risk than equity funds, higher returns than savings accounts. Ideal for emergency funds, short-term goals, and parking cash awaiting investment opportunities.',
 'investments', 'Wallet', 'Higher returns than savings, daily liquidity',
 1000, NULL, 11, 'Open-ended',
 ARRAY[
   'Returns 8–11% per annum',
   'Daily compounding interest',
   'Withdraw within 2–3 business days',
   'Minimum from KES 1,000'
 ],
 'Mass'),

-- 4. Equity Unit Trust
('Equity Unit Trust',
 'Diversified equity mutual fund investing across local and regional listed companies. Professionally managed by experienced fund managers using fundamental and technical analysis. Three risk-adjusted strategies: Growth (target 15–20%, higher volatility), Balanced Equity (target 12–15%), and Dividend Yield (target 10–12%, lower volatility). Minimum investment KES 5,000, with optional Systematic Investment Plan (SIP) from KES 500/month. Annual management fee 1.5–2.0%. Best suited for medium-to-long-term investors with 3+ year horizons.',
 'investments', 'BarChart3', 'Diversified equity exposure, professionally managed',
 5000, NULL, 15, '3+ year horizon',
 ARRAY[
   '3 strategies: Growth, Balanced, Dividend',
   'Target returns 10–20% depending on strategy',
   'SIP from KES 500/month',
   'Professionally managed'
 ],
 'Premium'),

-- 5. Eurobond
('Eurobond',
 'USD-denominated international bonds issued by governments or large corporations and listed on international exchanges. Offers diversification away from local currency risk. Coupon rates typically 6–9% in USD, paid semi-annually. Maturities range from 5 to 30 years. Tradeable on international markets for liquidity. Minimum investment USD 10,000 (approximately KES 1.3M). Ideal for clients seeking hard currency exposure, hedging against local currency depreciation, or building an internationally diversified portfolio. Subject to currency conversion costs.',
 'investments', 'Globe', 'USD-denominated international bonds',
 10000, NULL, 9, '5–30 years',
 ARRAY[
   'USD-denominated, hedges currency risk',
   'Coupons 6–9% in USD',
   'Semi-annual interest payments',
   'Tradeable internationally'
 ],
 'Premium'),

-- 6. Green Bond
('Green Bond',
 'Fixed-income securities where proceeds are exclusively used to finance environmentally sustainable projects — renewable energy, clean transportation, sustainable water, climate adaptation, and energy efficiency. Issued by governments, supranationals, and corporations. Returns comparable to conventional bonds (typically 10–13% in local currency, 5–7% in USD) with the added benefit of measurable environmental impact reporting. Minimum investment KES 50,000 (local) or USD 5,000 (international). Aligned with Climate Bonds Initiative standards. Appeals to ESG-conscious investors and institutions with sustainability mandates.',
 'investments', 'Leaf', 'Fixed income with measurable climate impact',
 50000, NULL, 13, '5–15 years',
 ARRAY[
   'Funds renewable energy & climate projects',
   'Returns comparable to conventional bonds',
   'Annual environmental impact reports',
   'Climate Bonds Initiative aligned'
 ],
 'Premium'),

-- 7. REIT (Real Estate Investment Trust)
('REIT (Real Estate Investment Trust)',
 'Listed investment vehicle that holds a portfolio of income-generating real estate — commercial offices, shopping malls, residential complexes, and industrial properties. Distributes at least 80% of net income to unit-holders as dividends, typically paid semi-annually. Provides exposure to real estate without the friction of direct property ownership (no maintenance, tenant management, or large capital outlay). Returns include dividend yield (currently 7–10%) plus potential capital appreciation. Tradeable on the stock exchange for liquidity. Minimum investment from KES 5,000 (one unit). Suitable for income-seeking investors and those wanting real estate exposure in a diversified portfolio.',
 'investments', 'Building2', 'Real estate exposure without owning property',
 5000, NULL, 10, 'Open-ended',
 ARRAY[
   'Dividend yield 7–10% annually',
   '80%+ of income distributed to holders',
   'Tradeable on stock exchange',
   'No property management headaches'
 ],
 'Mass'),

-- 8. Sukuk
('Sukuk',
 'Sharia-compliant fixed-income instrument structured as an asset-backed security rather than interest-bearing debt. Holders receive a share of profits generated by underlying assets (typically infrastructure, real estate, or commodities) rather than fixed interest. Returns comparable to conventional bonds (typically 9–12% in local currency, 5–7% in USD). Maturities from 3 to 15 years. Suitable for Sharia-compliant portfolios, ethical investors, and clients seeking diversification through asset-backed instruments. Minimum investment KES 50,000. Issued by governments and major corporations across multiple markets including Middle East, Southeast Asia, and Africa.',
 'investments', 'Star', 'Sharia-compliant asset-backed securities',
 50000, NULL, 12, '3–15 years',
 ARRAY[
   'Sharia-compliant structure',
   'Profit-sharing instead of interest',
   'Returns 9–12% local, 5–7% USD',
   'Asset-backed for stability'
 ],
 'Premium')

ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- VERIFY
-- =========================================================================
SELECT
  name,
  tagline,
  rate_pct,
  term_label,
  target_segment
FROM products
WHERE category = 'investments'
ORDER BY name;

-- Total investment products (should be 10: 2 existing + 8 new)
SELECT COUNT(*) AS investment_product_count
FROM products
WHERE category = 'investments';
