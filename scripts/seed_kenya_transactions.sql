-- =========================================================================
-- KENYA — TRANSACTIONS SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisite: seed_kenya_accounts_cards.sql must be run first.
--
-- Distribution (96 transactions total):
--   Wanjiru KES current  (aa11ce01-1111-...): 40 txn over last 90 days
--   Wanjiru KES savings  (aa11ce01-2222-...):  3 standing-order deposits
--   Wanjiru USD wallet   (aa11ce01-3333-...):  3 incoming wires + 1 outgoing hotel
--   Otieno  SME current  (aa11ce02-1111-...): 45 txn (revenue, payroll, KRA, suppliers)
--   Otieno  USD trade    (aa11ce02-3333-...):  5 customer wires + 1 supplier wire
--
-- balance_after values are approximations seeded for demo readability,
-- not a strict ledger. They trend toward each account's final balance.
-- =========================================================================


-- =========================================================================
-- WANJIRU KAMAU — KES CURRENT ACCOUNT
-- =========================================================================

INSERT INTO transactions (
  id, account_id, type, amount, balance_after,
  description, merchant, category, status, reference, date, market
) VALUES

-- ===== Most recent month (last 30 days) =====
('ff11ce01-aaaa-4001-a001-000000000001', 'aa11ce01-1111-4111-a001-000000000001',
 'credit', 580000.00, 425000.00, 'Salary - March',         'ACME LIMITED PAYROLL',  'salary',       'completed', 'SAL-2026-03', NOW() - INTERVAL '2 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000002', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',  198000.00, 227000.00, 'Mortgage Payment',        'NCBA Mortgage',         'other',        'completed', 'MTG-MAR-26', NOW() - INTERVAL '5 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000003', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   64500.00, 162500.00, 'Car Loan Repayment',      'NCBA Asset Finance',    'other',        'completed', 'CAR-MAR-26', NOW() - INTERVAL '6 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000004', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    8420.00, 154080.00, 'Electricity',             'KPLC',                  'utilities',    'completed', 'KPLC-2603',  NOW() - INTERVAL '7 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000005', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    2300.00, 151780.00, 'Water Bill',              'Nairobi Water',         'utilities',    'completed', 'NW-2603',    NOW() - INTERVAL '7 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000006', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    7800.00, 143980.00, 'Internet & Fibre',        'Safaricom Home Fibre',  'utilities',    'completed', 'SAF-FIB-03', NOW() - INTERVAL '8 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000007', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    1700.00, 142280.00, 'NHIF Contribution',       'NHIF',                  'healthcare',   'completed', 'NHIF-03-26', NOW() - INTERVAL '9 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000008', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    2160.00, 140120.00, 'NSSF Contribution',       'NSSF',                  'other',        'completed', 'NSSF-03-26', NOW() - INTERVAL '9 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000009', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    8400.00, 131720.00, 'Groceries',               'Naivas Westlands',      'groceries',    'completed', 'POS-93821',  NOW() - INTERVAL '3 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000010', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   12300.00, 119420.00, 'Weekend Shop',            'Carrefour Kenya - Junction', 'groceries','completed', 'POS-44712',  NOW() - INTERVAL '10 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000011', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    1450.00, 117970.00, 'Lunch',                   'Java House - Westlands','restaurants',  'completed', 'POS-22381',  NOW() - INTERVAL '4 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000012', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',     980.00, 116990.00, 'Coffee & Pastry',         'Artcaffe',              'restaurants',  'completed', 'POS-22411',  NOW() - INTERVAL '6 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000013', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',     720.00, 116270.00, 'Uber Ride',               'Uber',                  'transport',    'completed', 'UBR-77321',  NOW() - INTERVAL '2 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000014', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',     450.00, 115820.00, 'Bolt Ride',               'Bolt',                  'transport',    'completed', 'BOLT-44820', NOW() - INTERVAL '3 days', 'kenya'),
('ff11ce01-aaaa-4001-a001-000000000015', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    6800.00, 109020.00, 'Fuel',                    'Shell - Riverside',     'transport',    'completed', 'POS-99831',  NOW() - INTERVAL '11 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000016', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   35000.00,  74020.00, 'Transfer to Goal Saver',  'Internal Transfer',     'transfer',     'completed', 'INT-SAV-26', NOW() - INTERVAL '12 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000017', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    5000.00,  69020.00, 'M-Pesa Send',             'M-Pesa - 0712***xxx',   'transfer',     'completed', 'MPESA-77291',NOW() - INTERVAL '14 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000018', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   23000.00,  46020.00, 'Domestic Help - March',   'M-Pesa - Salary',       'transfer',     'completed', 'MPESA-77544',NOW() - INTERVAL '15 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000019', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    9800.00,  36220.00, 'Pharmacy',                'Goodlife Westlands',    'healthcare',   'completed', 'POS-77231',  NOW() - INTERVAL '17 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000020', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    4500.00,  31720.00, 'Salon',                   'Ashleys Beauty',        'shopping',     'completed', 'POS-77822',  NOW() - INTERVAL '19 days','kenya'),

-- ===== Second month back (30-60 days ago) =====
('ff11ce01-aaaa-4001-a001-000000000021', 'aa11ce01-1111-4111-a001-000000000001',
 'credit', 580000.00, 611720.00, 'Salary - February',       'ACME LIMITED PAYROLL',  'salary',       'completed', 'SAL-2026-02', NOW() - INTERVAL '33 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000022', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',  198000.00, 413720.00, 'Mortgage Payment',        'NCBA Mortgage',         'other',        'completed', 'MTG-FEB-26', NOW() - INTERVAL '37 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000023', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   64500.00, 349220.00, 'Car Loan Repayment',      'NCBA Asset Finance',    'other',        'completed', 'CAR-FEB-26', NOW() - INTERVAL '38 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000024', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',  145000.00, 204220.00, 'Credit Card Payment',     'NCBA Mastercard ****9913','other',      'completed', 'CC-PMT-FEB', NOW() - INTERVAL '40 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000025', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    9100.00, 195120.00, 'Electricity',             'KPLC',                  'utilities',    'completed', 'KPLC-2602',  NOW() - INTERVAL '42 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000026', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    7800.00, 187320.00, 'Internet',                'Safaricom Home Fibre',  'utilities',    'completed', 'SAF-FIB-02', NOW() - INTERVAL '43 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000027', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   28500.00, 158820.00, 'Restaurant - Birthday',   'Talisman Karen',        'restaurants',  'completed', 'POS-91182',  NOW() - INTERVAL '45 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000028', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   42000.00, 116820.00, 'Flight Booking - Kigali', 'Kenya Airways',         'travel',       'completed', 'KQ-44218',   NOW() - INTERVAL '47 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000029', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    8600.00, 108220.00, 'Groceries',               'Naivas Westlands',      'groceries',    'completed', 'POS-91291',  NOW() - INTERVAL '48 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000030', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    7200.00, 101020.00, 'Fuel',                    'Rubis - Westlands',     'transport',    'completed', 'POS-91391',  NOW() - INTERVAL '50 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000031', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   35000.00,  66020.00, 'Transfer to Goal Saver',  'Internal Transfer',     'transfer',     'completed', 'INT-SAV-26', NOW() - INTERVAL '52 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000032', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   23000.00,  43020.00, 'Domestic Help - Feb',     'M-Pesa - Salary',       'transfer',     'completed', 'MPESA-77541',NOW() - INTERVAL '55 days','kenya'),

-- ===== Third month back (60-90 days ago) =====
('ff11ce01-aaaa-4001-a001-000000000033', 'aa11ce01-1111-4111-a001-000000000001',
 'credit', 580000.00, 623020.00, 'Salary - January',        'ACME LIMITED PAYROLL',  'salary',       'completed', 'SAL-2026-01', NOW() - INTERVAL '64 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000034', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',  198000.00, 425020.00, 'Mortgage Payment',        'NCBA Mortgage',         'other',        'completed', 'MTG-JAN-26', NOW() - INTERVAL '68 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000035', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   64500.00, 360520.00, 'Car Loan Repayment',      'NCBA Asset Finance',    'other',        'completed', 'CAR-JAN-26', NOW() - INTERVAL '69 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000036', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   85000.00, 275520.00, 'School Fees Term 1',      'Brookhouse School',     'other',        'completed', 'BHS-T1-26',  NOW() - INTERVAL '70 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000037', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   16000.00, 259520.00, 'Salary Advance Repayment','NCBA Loans',            'other',        'completed', 'SADV-JAN',   NOW() - INTERVAL '72 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000038', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   13800.00, 245720.00, 'Hospital - Outpatient',   'Aga Khan University Hospital','healthcare','completed','POS-91482',NOW() - INTERVAL '74 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000039', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',    9800.00, 235920.00, 'Groceries',               'Carrefour Kenya - Junction','groceries','completed', 'POS-91591',  NOW() - INTERVAL '78 days','kenya'),
('ff11ce01-aaaa-4001-a001-000000000040', 'aa11ce01-1111-4111-a001-000000000001',
 'debit',   31000.00, 204920.00, 'Insurance Premium',       'Jubilee Insurance',     'other',        'completed', 'JUB-Q1-26',  NOW() - INTERVAL '85 days','kenya')

ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- WANJIRU KAMAU — KES GOAL SAVER (standing-order deposits)
-- =========================================================================

INSERT INTO transactions (
  id, account_id, type, amount, balance_after,
  description, merchant, category, status, reference, date, market
) VALUES
('ff11ce01-bbbb-4002-a001-000000000001', 'aa11ce01-2222-4222-a001-000000000002',
 'credit', 35000.00, 985000.00, 'Standing Order from Current', 'Internal Transfer', 'transfer', 'completed', 'INT-SAV-26', NOW() - INTERVAL '12 days', 'kenya'),
('ff11ce01-bbbb-4002-a001-000000000002', 'aa11ce01-2222-4222-a001-000000000002',
 'credit', 35000.00, 950000.00, 'Standing Order from Current', 'Internal Transfer', 'transfer', 'completed', 'INT-SAV-26', NOW() - INTERVAL '52 days','kenya'),
('ff11ce01-bbbb-4002-a001-000000000003', 'aa11ce01-2222-4222-a001-000000000002',
 'credit', 35000.00, 915000.00, 'Standing Order from Current', 'Internal Transfer', 'transfer', 'completed', 'INT-SAV-26', NOW() - INTERVAL '82 days','kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- WANJIRU KAMAU — USD DIASPORA WALLET
-- =========================================================================

INSERT INTO transactions (
  id, account_id, type, amount, balance_after,
  description, merchant, category, status, reference, date, market
) VALUES
('ff11ce01-cccc-4003-a001-000000000001', 'aa11ce01-3333-4333-a001-000000000003',
 'credit', 1500.00, 8500.00, 'Incoming Wire - Consulting',  'Atlas Studios Ltd (UK)', 'salary', 'completed', 'WIRE-IN-0331', NOW() - INTERVAL '8 days',  'kenya'),
('ff11ce01-cccc-4003-a001-000000000002', 'aa11ce01-3333-4333-a001-000000000003',
 'credit', 2200.00, 7000.00, 'Incoming Wire - Consulting',  'Atlas Studios Ltd (UK)', 'salary', 'completed', 'WIRE-IN-0228', NOW() - INTERVAL '38 days', 'kenya'),
('ff11ce01-cccc-4003-a001-000000000003', 'aa11ce01-3333-4333-a001-000000000003',
 'debit',   650.00, 4800.00, 'Hotel Booking - Kigali',      'Marriott Kigali',        'travel', 'completed', 'HTL-KGL-MAR',  NOW() - INTERVAL '5 days',  'kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- OTIENO OUMA — KES SME CURRENT ACCOUNT
-- =========================================================================

INSERT INTO transactions (
  id, account_id, type, amount, balance_after,
  description, merchant, category, status, reference, date, market
) VALUES

-- ===== Recent month (Customer receipts) =====
('ff11ce02-aaaa-4001-a002-000000000001', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 720000.00, 2410000.00, 'Invoice INV-2026-0341',  'Twiga Foods Ltd',         'salary',       'completed', 'INV-0341', NOW() - INTERVAL '3 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000002', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 480000.00, 1690000.00, 'Invoice INV-2026-0338',  'Carrefour Kenya',         'salary',       'completed', 'INV-0338', NOW() - INTERVAL '7 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000003', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 295000.00, 1210000.00, 'Invoice INV-2026-0335',  'Naivas Holdings',         'salary',       'completed', 'INV-0335', NOW() - INTERVAL '14 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000004', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 620000.00,  915000.00, 'Invoice INV-2026-0332',  'Quickmart Supermarkets',  'salary',       'completed', 'INV-0332', NOW() - INTERVAL '18 days','kenya'),

-- ===== Supplier payments =====
('ff11ce02-aaaa-4001-a002-000000000005', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  480000.00,  295000.00, 'Supplier - Dubai Imports','Al Maha Trading FZE',     'other',        'completed', 'SUPP-0421',NOW() - INTERVAL '4 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000006', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  220000.00,   75000.00, 'Supplier - Packaging',   'Pakflex Packaging Ltd',   'other',        'completed', 'SUPP-0418',NOW() - INTERVAL '9 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000007', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  340000.00,  -265000.00,'Supplier - Bulk Rice',   'Mwea Rice Millers',       'other',        'completed', 'SUPP-0415',NOW() - INTERVAL '12 days','kenya'),

-- ===== Payroll =====
('ff11ce02-aaaa-4001-a002-000000000008', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  850000.00, -1115000.00,'Staff Payroll - March',  'Payroll Batch 2026-03',   'salary',       'completed', 'PAY-2603', NOW() - INTERVAL '5 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000009', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  145000.00, -1260000.00,'PAYE - March',           'KRA',                     'other',        'completed', 'KRA-PAYE', NOW() - INTERVAL '5 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000010', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   42000.00, -1302000.00,'NHIF Employer Contrib',  'NHIF',                    'healthcare',   'completed', 'NHIF-EM',  NOW() - INTERVAL '5 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000011', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   51000.00, -1353000.00,'NSSF Employer Contrib',  'NSSF',                    'other',        'completed', 'NSSF-EM',  NOW() - INTERVAL '5 days', 'kenya'),

-- ===== KRA + business overheads =====
('ff11ce02-aaaa-4001-a002-000000000012', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  220000.00, -1573000.00,'VAT - February',         'KRA',                     'other',        'completed', 'KRA-VAT',  NOW() - INTERVAL '20 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000013', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  180000.00, -1753000.00,'Warehouse Rent',         'Industrial Area Holdings','other',        'completed', 'RENT-MAR', NOW() - INTERVAL '8 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000014', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  240000.00, -1993000.00,'SME Working Capital Loan','NCBA SME',               'other',        'completed', 'WCL-MAR',  NOW() - INTERVAL '6 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000015', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  276000.00, -2269000.00,'Fleet Asset Finance',    'NCBA Asset Finance',      'other',        'completed', 'AF-FLEET', NOW() - INTERVAL '10 days','kenya'),

-- ===== Fleet fuel + ops =====
('ff11ce02-aaaa-4001-a002-000000000016', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   28500.00, -2297500.00,'Fleet Fuel - Truck 1',   'Shell - Mlolongo',        'transport',    'completed', 'POS-FL01', NOW() - INTERVAL '4 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000017', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   22000.00, -2319500.00,'Fleet Fuel - Truck 2',   'Rubis - Industrial Area', 'transport',    'completed', 'POS-FL02', NOW() - INTERVAL '7 days', 'kenya'),
('ff11ce02-aaaa-4001-a002-000000000018', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   45000.00, -2364500.00,'Vehicle Service - Truck 1','Toyota Kenya Service',  'transport',    'completed', 'TK-SRV',   NOW() - INTERVAL '14 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000019', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   18000.00, -2382500.00,'Cash Management',        'G4S Cash Services',       'other',        'completed', 'G4S-CSH',  NOW() - INTERVAL '11 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000020', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',    9800.00, -2392300.00,'Office Internet',        'Safaricom Business',      'utilities',    'completed', 'SAF-BIZ',  NOW() - INTERVAL '13 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000021', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   12500.00, -2404800.00,'Electricity - Warehouse','KPLC',                    'utilities',    'completed', 'KPLC-WH',  NOW() - INTERVAL '15 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000022', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  175000.00, -2579800.00,'LPO Facility Drawdown',  'NCBA Trade Finance',      'other',        'completed', 'LPO-DRW',  NOW() - INTERVAL '17 days','kenya'),

-- ===== Second month back (60-30 days) =====
('ff11ce02-aaaa-4001-a002-000000000023', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 580000.00, -1999800.00,'Invoice INV-2026-0298',  'Tuskys Distribution',     'salary',       'completed', 'INV-0298', NOW() - INTERVAL '34 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000024', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 410000.00, -1589800.00,'Invoice INV-2026-0291',  'Carrefour Kenya',         'salary',       'completed', 'INV-0291', NOW() - INTERVAL '40 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000025', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 320000.00, -1269800.00,'Invoice INV-2026-0288',  'Quickmart',               'salary',       'completed', 'INV-0288', NOW() - INTERVAL '46 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000026', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  850000.00, -2119800.00,'Staff Payroll - February','Payroll Batch 2026-02',  'salary',       'completed', 'PAY-2602', NOW() - INTERVAL '35 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000027', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  145000.00, -2264800.00,'PAYE - February',        'KRA',                     'other',        'completed', 'KRA-PAYE', NOW() - INTERVAL '35 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000028', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  220000.00, -2484800.00,'VAT - January',          'KRA',                     'other',        'completed', 'KRA-VAT',  NOW() - INTERVAL '50 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000029', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  240000.00, -2724800.00,'SME Working Capital Loan','NCBA SME',               'other',        'completed', 'WCL-FEB',  NOW() - INTERVAL '36 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000030', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  276000.00, -3000800.00,'Fleet Asset Finance',    'NCBA Asset Finance',      'other',        'completed', 'AF-FLEET', NOW() - INTERVAL '40 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000031', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  180000.00, -3180800.00,'Warehouse Rent',         'Industrial Area Holdings','other',        'completed', 'RENT-FEB', NOW() - INTERVAL '38 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000032', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  315000.00, -3495800.00,'Supplier - Bulk Cooking Oil','Bidco Africa',        'other',        'completed', 'SUPP-0307',NOW() - INTERVAL '42 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000033', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',   58000.00, -3553800.00,'Fleet Fuel',             'Shell - Mlolongo',        'transport',    'completed', 'POS-FL',   NOW() - INTERVAL '44 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000034', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  175000.00, -3728800.00,'LPO Facility Repayment', 'NCBA Trade Finance',      'other',        'completed', 'LPO-REP',  NOW() - INTERVAL '50 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000035', 'aa11ce02-1111-4111-a002-000000000001',
 'credit',1200000.00, -2528800.00,'Invoice INV-2026-0285',  'Twiga Foods Ltd',         'salary',       'completed', 'INV-0285', NOW() - INTERVAL '55 days','kenya'),

-- ===== Third month back (90-60 days) =====
('ff11ce02-aaaa-4001-a002-000000000036', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 690000.00, -1838800.00,'Invoice INV-2026-0264',  'Naivas Holdings',         'salary',       'completed', 'INV-0264', NOW() - INTERVAL '66 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000037', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 510000.00, -1328800.00,'Invoice INV-2026-0258',  'Carrefour Kenya',         'salary',       'completed', 'INV-0258', NOW() - INTERVAL '72 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000038', 'aa11ce02-1111-4111-a002-000000000001',
 'credit', 380000.00,  -948800.00,'Invoice INV-2026-0254',  'Quickmart',               'salary',       'completed', 'INV-0254', NOW() - INTERVAL '78 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000039', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  850000.00, -1798800.00,'Staff Payroll - January','Payroll Batch 2026-01',   'salary',       'completed', 'PAY-2601', NOW() - INTERVAL '65 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000040', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  240000.00, -2038800.00,'SME Working Capital Loan','NCBA SME',               'other',        'completed', 'WCL-JAN',  NOW() - INTERVAL '70 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000041', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  276000.00, -2314800.00,'Fleet Asset Finance',    'NCBA Asset Finance',      'other',        'completed', 'AF-FLEET', NOW() - INTERVAL '72 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000042', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  395000.00, -2709800.00,'Annual Insurance - Fleet','UAP Old Mutual',         'other',        'completed', 'INS-FL',   NOW() - INTERVAL '80 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000043', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  180000.00, -2889800.00,'Warehouse Rent',         'Industrial Area Holdings','other',        'completed', 'RENT-JAN', NOW() - INTERVAL '68 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000044', 'aa11ce02-1111-4111-a002-000000000001',
 'debit',  220000.00, -3109800.00,'VAT - December',         'KRA',                     'other',        'completed', 'KRA-VAT',  NOW() - INTERVAL '82 days','kenya'),
('ff11ce02-aaaa-4001-a002-000000000045', 'aa11ce02-1111-4111-a002-000000000001',
 'credit',3500000.00,  390200.00, 'Annual Tender Award',    'KEMSA (Ministry of Health)','salary',     'completed', 'TND-AWD',  NOW() - INTERVAL '87 days','kenya')

ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- OTIENO OUMA — USD TRADE ACCOUNT
-- =========================================================================

INSERT INTO transactions (
  id, account_id, type, amount, balance_after,
  description, merchant, category, status, reference, date, market
) VALUES
('ff11ce02-cccc-4003-a002-000000000001', 'aa11ce02-3333-4333-a002-000000000003',
 'credit',  8500.00, 38000.00, 'Customer Wire - LC Settlement', 'TradeWell Trading (DRC)', 'salary', 'completed', 'WIRE-IN-0322', NOW() - INTERVAL '12 days','kenya'),
('ff11ce02-cccc-4003-a002-000000000002', 'aa11ce02-3333-4333-a002-000000000003',
 'credit', 11200.00, 29500.00, 'Customer Wire - Bulk Shipment', 'East Africa Foods Ltd',   'salary', 'completed', 'WIRE-IN-0318', NOW() - INTERVAL '16 days','kenya'),
('ff11ce02-cccc-4003-a002-000000000003', 'aa11ce02-3333-4333-a002-000000000003',
 'credit',  6300.00, 18300.00, 'Customer Wire - LC Settlement', 'AgriPro Uganda',          'salary', 'completed', 'WIRE-IN-0312', NOW() - INTERVAL '22 days','kenya'),
('ff11ce02-cccc-4003-a002-000000000004', 'aa11ce02-3333-4333-a002-000000000003',
 'debit',  15000.00, 12000.00, 'Supplier Wire - Imports',       'Al Maha Trading FZE',     'other',  'completed', 'WIRE-OUT-0309',NOW() - INTERVAL '25 days','kenya'),
('ff11ce02-cccc-4003-a002-000000000005', 'aa11ce02-3333-4333-a002-000000000003',
 'credit',  7500.00, 27000.00, 'Customer Wire - LC Settlement', 'TradeWell Trading (DRC)', 'salary', 'completed', 'WIRE-IN-0224', NOW() - INTERVAL '52 days','kenya'),
('ff11ce02-cccc-4003-a002-000000000006', 'aa11ce02-3333-4333-a002-000000000003',
 'debit',  19500.00,  7500.00, 'Supplier Wire - Imports',       'Sunshine Trading FZCO',   'other',  'completed', 'WIRE-OUT-0218',NOW() - INTERVAL '58 days','kenya')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT
  p.full_name,
  a.name AS account,
  COUNT(*) AS txn_count,
  SUM(CASE WHEN t.type = 'credit' THEN t.amount ELSE 0 END) AS total_credits,
  SUM(CASE WHEN t.type = 'debit'  THEN t.amount ELSE 0 END) AS total_debits
FROM transactions t
JOIN accounts a ON t.account_id = a.id
JOIN profiles p ON a.customer_id = p.id
WHERE t.market = 'kenya'
GROUP BY p.full_name, a.name
ORDER BY p.full_name, a.name;
