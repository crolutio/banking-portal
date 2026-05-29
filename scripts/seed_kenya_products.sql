-- =========================================================================
-- KENYA — PRODUCT CATALOG SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisite: add_market_column_banking.sql + extend_products_schema.sql
--
-- 20 Kenyan-flavored products spanning every category in the existing catalog:
--   Accounts, Cards, Loans, Investments, Bancassurance, Digital
--
-- Note: the existing 8 KES-flavored investment products (T-Bills, Bonds, MMF,
-- Eurobond, Sukuk, Equity Unit Trust, REIT, Green Bonds) are currently tagged
-- market='default' from the original seed. They remain there for backwards
-- compatibility. The Kenyan investment rows below are deliberate duplicates
-- so the Kenyan catalog renders coherently in isolation.
-- =========================================================================

INSERT INTO products (
  name, description, category, icon, tagline,
  min_amount, max_amount, rate_pct, term_label, key_features, target_segment, market
) VALUES

-- =========================================================================
-- ACCOUNTS (5)
-- =========================================================================

('Personal Current Account',
 'Day-to-day Kenya Shilling current account with debit card, online and mobile banking, free PesaLink transfers up to 5 per month, and direct M-Pesa linkage for instant pay-bill and till payments. Salary processing through this account unlocks waived monthly maintenance.',
 'accounts', 'Wallet', 'Everyday banking, M-Pesa-ready',
 0, NULL, NULL, 'Open-ended',
 ARRAY['Free PesaLink (5/month)', 'M-Pesa Pay Bill linkage', 'Salary credit waives maintenance', 'Visa debit card included'],
 'Mass', 'kenya'),

('Goal Saver',
 'Target savings account with a chosen goal (e.g. home deposit, school fees, vehicle). Interest paid monthly at 7% p.a. on balances above KES 50,000. Standing-order friendly with a visual progress tracker in the mobile app. Withdrawals before goal date are allowed but reduce that month''s interest.',
 'accounts', 'PiggyBank', 'Save toward a named goal, 7% p.a.',
 1000, NULL, 7, 'Open-ended',
 ARRAY['7% p.a. on balances > KES 50,000', 'Visual goal progress in-app', 'Standing-order friendly', 'No penalties for early withdrawal'],
 'Mass', 'kenya'),

('Junior Saver',
 'Savings account for under-18s, opened by a parent/guardian, with a higher promotional interest rate (8% p.a.) and no minimum balance. Annual school fees standing order to a partnered school waives transfer fees. Includes a free junior debit card from age 12.',
 'accounts', 'BookOpen', 'Build your child''s savings habit early',
 0, NULL, 8, 'Open-ended',
 ARRAY['8% p.a. promotional rate', 'No minimum balance', 'Free school fees standing order', 'Junior debit card from age 12'],
 'Mass', 'kenya'),

('Diaspora USD Account',
 'USD-denominated account for Kenyans in the diaspora. Receive inbound USD wires without FX conversion losses, convert to KES at preferential rates, and pay Kenyan bills directly from USD balances. Free SWIFT inbound up to 5 wires per month.',
 'accounts', 'Globe', 'Hold USD onshore, convert on your terms',
 100, NULL, 1, 'Open-ended',
 ARRAY['No FX loss on inbound USD wires', 'Preferential KES conversion rates', 'Free SWIFT inbound (5/month)', 'Pay Kenyan bills from USD balance'],
 'Premium', 'kenya'),

('SME Current Account',
 'Business current account for SMEs with up to KES 50M annual turnover. Includes bulk payroll processing, PesaLink and EFT batch transfers, dedicated relationship manager from year 1, and pre-approved working capital line up to KES 5M after 6 months of account activity.',
 'accounts', 'Briefcase', 'Built for growing businesses',
 0, NULL, NULL, 'Open-ended',
 ARRAY['Bulk payroll processing', 'PesaLink + EFT batch transfers', 'Dedicated RM from year 1', 'Pre-approved working capital up to KES 5M'],
 'Premium', 'kenya'),


-- =========================================================================
-- CARDS (3)
-- =========================================================================

('Standard Debit Visa',
 'Free Visa debit card linked to your current account. Contactless, ATM withdrawals across all banks in Kenya, online shopping enabled by default, and free SMS transaction alerts. ATM limit KES 40,000 daily, POS limit KES 150,000 daily.',
 'cards', 'CreditCard', 'Free contactless debit for everyday spend',
 NULL, NULL, NULL, 'Free',
 ARRAY['No annual fee', 'Contactless tap-to-pay', 'KES 40k ATM / KES 150k POS daily', 'Free SMS alerts'],
 'Mass', 'kenya'),

('Platinum Credit Card',
 'Premium Mastercard with up to KES 1,000,000 credit limit, complimentary airport lounge access (3 Kenyan + 100 international lounges via LoungeKey), travel insurance, and 1% cashback on all spend with 3% on supermarket and fuel categories. Interest-free period up to 50 days.',
 'cards', 'Sparkles', 'Premium card with lounge access + cashback',
 0, 1000000, 3.5, 'Monthly',
 ARRAY['Up to KES 1M credit limit', 'LoungeKey airport access', 'Travel insurance included', '1% cashback (3% on supermarket/fuel)'],
 'Premium', 'kenya'),

('Business Credit Card',
 'Mastercard for SME owners with credit limits up to KES 2,000,000, separate billing per cardholder for staff cards, expense category reports for KRA filing, and 1.5% cashback on B2B supplier payments. Single statement view across multiple cards.',
 'cards', 'Briefcase', 'SME-grade card with KRA-ready expense reports',
 0, 2000000, 3.0, 'Monthly',
 ARRAY['Up to KES 2M credit limit', 'Up to 5 staff cards', 'KRA-ready expense categorization', '1.5% cashback on supplier payments'],
 'Premium', 'kenya'),


-- =========================================================================
-- LOANS (5)
-- =========================================================================

('Personal Loan',
 'Unsecured personal loan in KES for any purpose — home improvements, medical, education top-up, or consolidation. Approval in 48 hours for salaried customers, repayment via standing order from your current account. Rates from 13.5% p.a. on amounts up to KES 5,000,000.',
 'loans', 'Banknote', 'Unsecured KES loan, 48-hour approval',
 50000, 5000000, 13.5, '12–60 months',
 ARRAY['Approval in 48 hours', 'No security required (salaried)', 'Rates from 13.5% p.a.', 'Standing-order repayment'],
 'Mass', 'kenya'),

('Asset Finance — Vehicle',
 'Financing for new and used vehicles in KES. Up to 90% of vehicle value, terms 12–84 months, rates from 13% p.a. Includes free vehicle valuation, comprehensive insurance package via partner insurers, and balloon-payment structuring for end-of-term flexibility.',
 'loans', 'Car', 'Drive a car, finance up to 90%',
 200000, 15000000, 13, '12–84 months',
 ARRAY['Up to 90% of vehicle value', 'Free vehicle valuation', 'Comprehensive insurance bundled', 'Balloon-payment option'],
 'Mass', 'kenya'),

('Home Loan / Mortgage',
 'Mortgages for residential properties in KES. Up to 90% loan-to-value for first-time buyers, terms up to 25 years, rates from 11.5% p.a. KMRC-supported rates for properties under KES 8M. Includes free property valuation and discounted legal fees with partner law firms.',
 'loans', 'Home', 'Own your home from 11.5% p.a.',
 1000000, 50000000, 11.5, 'Up to 25 years',
 ARRAY['Up to 90% LTV (first-time buyers)', 'KMRC-supported rates < KES 8M', 'Free property valuation', 'Discounted legal fees'],
 'Premium', 'kenya'),

('SME Working Capital',
 'Revolving working capital facility for SMEs in KES. Limits from KES 500k to KES 20M based on turnover, drawdowns and repayments through your SME current account, interest charged only on outstanding balance. Quarterly facility reviews with your RM.',
 'loans', 'TrendingUp', 'Smooth cashflow for growing businesses',
 500000, 20000000, 15.5, 'Revolving 24-month',
 ARRAY['Limits up to KES 20M', 'Interest on outstanding only', 'Drawdowns via SME current account', 'Quarterly facility reviews'],
 'Premium', 'kenya'),

('LPO / Invoice Discounting',
 'Trade finance facility for SMEs holding Local Purchase Orders or accepted invoices from blue-chip buyers (KEMSA, Carrefour, Naivas, Twiga, government parastatals). Advance up to 80% of invoice value, repayment when buyer settles. Rates from 14% p.a. on outstanding amounts.',
 'loans', 'FileText', 'Cash today against tomorrow''s invoices',
 250000, 25000000, 14, 'Up to 180 days per invoice',
 ARRAY['Advance up to 80% of invoice', 'Eligible blue-chip buyers only', 'Repayment on buyer settlement', 'Rates from 14% p.a.'],
 'Premium', 'kenya'),


-- =========================================================================
-- INVESTMENTS (3)
-- =========================================================================

('Treasury Bills (KES)',
 'Short-term Government of Kenya securities issued by the Central Bank of Kenya in 91, 182, and 364-day tenors. Auctioned weekly with competitive and non-competitive bidding. We handle CBK CDS account setup, bidding, and settlement. Returns currently 13–17% depending on tenor. Minimum KES 100,000, interest tax-exempt for residents.',
 'investments', 'ScrollText', 'Government-backed, 13–17% returns, KES',
 100000, NULL, 15, '91 / 182 / 364 days',
 ARRAY['Government-backed (CBK)', 'Returns currently 13–17%', 'Weekly auctions, three tenors', 'Tax-exempt for residents'],
 'Mass', 'kenya'),

('Money Market Fund (KES)',
 'Daily-compounded KES money market fund investing in Treasury Bills, deposits, and short-term commercial paper. Returns currently 11–12% p.a. with daily liquidity (T+1 withdrawal). Minimum investment KES 1,000, automatic monthly top-up via standing order from your current account.',
 'investments', 'TrendingUp', '11–12% p.a., daily liquidity',
 1000, NULL, 11.5, 'Open-ended, T+1 withdrawal',
 ARRAY['11–12% p.a. (daily compounding)', 'T+1 liquidity', 'Low KES 1,000 minimum', 'Auto top-up via standing order'],
 'Mass', 'kenya'),

('NSE Equity Unit Trust',
 'Open-ended unit trust investing across the Nairobi Securities Exchange in blue-chip listed companies (Safaricom, Equity Group, KCB, Co-op Bank, EABL, etc.). Suited for long-term wealth building with 5+ year horizons. Bid/offer pricing daily, returns historically averaging 12–18% p.a. over rolling 5-year periods.',
 'investments', 'BarChart3', 'NSE blue-chip exposure, 5+ year horizon',
 5000, NULL, 14, 'Recommended 5+ years',
 ARRAY['NSE blue-chip diversification', 'Historical 12–18% p.a. (5yr rolling)', 'Daily bid/offer pricing', 'KES 5,000 minimum'],
 'Premium', 'kenya'),


-- =========================================================================
-- BANCASSURANCE / INSURANCE (3)
-- =========================================================================

('Motor Insurance',
 'Comprehensive and third-party motor cover for private and commercial vehicles, underwritten by partner insurers. Includes 24/7 roadside assistance, courtesy car, and KES 500,000 third-party liability minimum. Premiums payable monthly through your current account.',
 'insurance', 'ShieldCheck', 'Comprehensive cover with 24/7 assistance',
 NULL, NULL, NULL, 'Annual renewal',
 ARRAY['Comprehensive + third-party options', '24/7 roadside assistance', 'Courtesy car included', 'Monthly premium payment'],
 'Mass', 'kenya'),

('Family Medical Cover',
 'Inpatient and outpatient medical cover for the whole family, up to KES 5,000,000 inpatient limit per year. Access to the partner hospital network (Aga Khan, Nairobi Hospital, Karen Hospital, MP Shah, etc.) with cashless treatment. Optional maternity and dental add-ons.',
 'insurance', 'HeartPulse', 'Family cover up to KES 5M, cashless network',
 NULL, 5000000, NULL, 'Annual renewal',
 ARRAY['Up to KES 5M inpatient limit', 'Cashless partner hospital network', 'Optional maternity + dental', 'Family-wide cover'],
 'Premium', 'kenya'),

('Life Assurance',
 'Term life cover up to KES 20,000,000 with optional critical illness rider. Premiums based on age and sum assured, payable monthly. Includes accidental death double indemnity and 60-day grace period for missed premiums. Tax-deductible up to KES 60,000 p.a.',
 'insurance', 'Shield', 'Up to KES 20M cover with critical illness rider',
 NULL, 20000000, NULL, '10 / 20 / 30 year terms',
 ARRAY['Up to KES 20M sum assured', 'Optional critical illness rider', 'Accidental death double indemnity', 'Tax-deductible up to KES 60k p.a.'],
 'Premium', 'kenya'),


-- =========================================================================
-- DIGITAL / MOBILE (2)
-- =========================================================================

('M-Pesa Bank Linkage',
 'Direct linkage between your bank current account and M-Pesa for instant top-ups and withdrawals. Pay bills, send to phone numbers, and receive customer payments to your bank without leaving the mobile app. Free unlimited top-ups, KES 50 flat fee for bank-to-M-Pesa withdrawal.',
 'digital', 'Smartphone', 'Bank ↔ M-Pesa in one tap',
 NULL, NULL, NULL, 'Always-on',
 ARRAY['Free unlimited bank-to-M-Pesa top-ups', 'KES 50 flat withdrawal fee', 'Pay Bill / Buy Goods in-app', 'Auto-reconciliation for business'],
 'Mass', 'kenya'),

('PesaLink Transfers',
 'Instant inter-bank transfers in Kenya via the PesaLink network. Send up to KES 999,999 in a single transaction to any Kenyan bank, settled instantly 24/7. Free for first 5 transfers per month for current account holders, KES 30 flat fee thereafter.',
 'digital', 'Send', 'Instant inter-bank transfers, 24/7',
 NULL, 999999, NULL, 'Instant',
 ARRAY['Up to KES 999,999 per transfer', 'Free first 5/month (current account)', 'KES 30 flat fee thereafter', 'Settled 24/7, any Kenyan bank'],
 'Mass', 'kenya')

ON CONFLICT DO NOTHING;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT category, COUNT(*) AS count
FROM products
WHERE market = 'kenya'
GROUP BY category
ORDER BY category;

SELECT name, category, tagline, rate_pct, target_segment
FROM products
WHERE market = 'kenya'
ORDER BY category, name;
