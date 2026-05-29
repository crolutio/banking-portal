-- =========================================================================
-- KENYA — REWARDS SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisites:
--   1. seed_kenya_profiles.sql
--   2. add_market_column_extras.sql   (adds the `market` column)
--
-- Wanjiru: Gold-tier urban professional, active card-and-mobile spender.
-- Otieno : Platinum-tier business owner, heavy spend across fuel + supplies.
--
-- Rewards catalog rows tagged `market = 'kenya'` list Kenya-relevant
-- partners (Naivas, Java House, Kenya Airways, Safaricom airtime,
-- Bonga points conversion, etc.).
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — reward profiles
-- -------------------------------------------------------------------------

INSERT INTO reward_profiles (
  customer_id, total_points, lifetime_points,
  tier, next_tier_progress, market
) VALUES

-- Wanjiru — Gold, ~78% of the way to Platinum
('11ce0001-0001-4001-a001-000000000001',
 12500, 28400,
 'Gold', 78.50, 'kenya'),

-- Otieno — Platinum, sitting on a healthy redemption balance
('11ce0002-0002-4002-a002-000000000002',
 28500, 54200,
 'Platinum', 100.00, 'kenya')

ON CONFLICT (customer_id) DO UPDATE SET
  total_points          = EXCLUDED.total_points,
  lifetime_points       = EXCLUDED.lifetime_points,
  tier                  = EXCLUDED.tier,
  next_tier_progress    = EXCLUDED.next_tier_progress,
  market                = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 2 — reward activities (last ~90 days mix of earn + redeem)
-- -------------------------------------------------------------------------

INSERT INTO reward_activities (
  id, customer_id, amount, type, category, description, market
) VALUES

-- Wanjiru — earn
('a1b2c3d1-1111-4111-a001-000000000001', '11ce0001-0001-4001-a001-000000000001',  650, 'earned', 'purchase',         'Naivas Lavington — groceries swipe',                'kenya'),
('a1b2c3d1-1111-4111-a001-000000000002', '11ce0001-0001-4001-a001-000000000001',  220, 'earned', 'purchase',         'Java House Junction — lunch',                       'kenya'),
('a1b2c3d1-1111-4111-a001-000000000003', '11ce0001-0001-4001-a001-000000000001',  180, 'earned', 'purchase',         'Uber Nairobi — work commute',                       'kenya'),
('a1b2c3d1-1111-4111-a001-000000000004', '11ce0001-0001-4001-a001-000000000001',  890, 'earned', 'purchase',         'Carrefour Two Rivers — monthly shop',               'kenya'),
('a1b2c3d1-1111-4111-a001-000000000005', '11ce0001-0001-4001-a001-000000000001',  250, 'earned', 'cashback',         'Safaricom airtime auto top-up cashback',            'kenya'),
('a1b2c3d1-1111-4111-a001-000000000006', '11ce0001-0001-4001-a001-000000000001', 1200, 'earned', 'login_streak',     '30-day app login streak bonus',                     'kenya'),
('a1b2c3d1-1111-4111-a001-000000000007', '11ce0001-0001-4001-a001-000000000001',  380, 'earned', 'purchase',         'Artcaffe Yaya — coffee + co-working',               'kenya'),
('a1b2c3d1-1111-4111-a001-000000000008', '11ce0001-0001-4001-a001-000000000001',  520, 'earned', 'purchase',         'Quickmart Westlands — household',                   'kenya'),
('a1b2c3d1-1111-4111-a001-000000000009', '11ce0001-0001-4001-a001-000000000001',  450, 'earned', 'travel',           'Kenya Airways — flight to Mombasa',                 'kenya'),
('a1b2c3d1-1111-4111-a001-000000000010', '11ce0001-0001-4001-a001-000000000001',  300, 'earned', 'referral',         'Referred a friend who opened a Goal Saver',         'kenya'),

-- Wanjiru — redeem
('a1b2c3d1-1111-4111-a001-000000000011', '11ce0001-0001-4001-a001-000000000001', -3500, 'redeemed', 'travel',         'Redeemed for Kenya Airways Asante Rewards miles',   'kenya'),
('a1b2c3d1-1111-4111-a001-000000000012', '11ce0001-0001-4001-a001-000000000001', -1000, 'redeemed', 'gift_card',      'Java House KES 1,000 voucher',                      'kenya'),
('a1b2c3d1-1111-4111-a001-000000000013', '11ce0001-0001-4001-a001-000000000001',  -800, 'redeemed', 'gift_card',      'Naivas KES 1,000 shopping voucher',                 'kenya'),


-- Otieno — earn (heavy SME spend)
('a1b2c3d2-2222-4222-a002-000000000001', '11ce0002-0002-4002-a002-000000000002', 1850, 'earned', 'purchase',         'Shell Westlands — fleet fuel card',                 'kenya'),
('a1b2c3d2-2222-4222-a002-000000000002', '11ce0002-0002-4002-a002-000000000002', 2200, 'earned', 'purchase',         'Rubis Mombasa Road — fleet fuel card',              'kenya'),
('a1b2c3d2-2222-4222-a002-000000000003', '11ce0002-0002-4002-a002-000000000002', 3100, 'earned', 'purchase',         'Carrefour Garden City — office supplies bulk',      'kenya'),
('a1b2c3d2-2222-4222-a002-000000000004', '11ce0002-0002-4002-a002-000000000002', 2800, 'earned', 'purchase',         'Tile & Carpet Centre — Mombasa branch fit-out',     'kenya'),
('a1b2c3d2-2222-4222-a002-000000000005', '11ce0002-0002-4002-a002-000000000002', 1500, 'earned', 'purchase',         'Naivas Mega Mombasa — staff welfare hampers',       'kenya'),
('a1b2c3d2-2222-4222-a002-000000000006', '11ce0002-0002-4002-a002-000000000002', 4200, 'earned', 'travel',           'Kenya Airways — business trip Nairobi → Kigali',    'kenya'),
('a1b2c3d2-2222-4222-a002-000000000007', '11ce0002-0002-4002-a002-000000000002', 1800, 'earned', 'travel',           'Sarova Stanley — supplier meeting accommodation',   'kenya'),
('a1b2c3d2-2222-4222-a002-000000000008', '11ce0002-0002-4002-a002-000000000002', 2000, 'earned', 'login_streak',     'Quarterly business banking activity bonus',         'kenya'),
('a1b2c3d2-2222-4222-a002-000000000009', '11ce0002-0002-4002-a002-000000000002',  900, 'earned', 'cashback',         'Safaricom Pay Bill business cashback',              'kenya'),

-- Otieno — redeem
('a1b2c3d2-2222-4222-a002-000000000010', '11ce0002-0002-4002-a002-000000000002', -8000, 'redeemed', 'travel',         'Redeemed for Kenya Airways Cloud 9 lounge access',  'kenya'),
('a1b2c3d2-2222-4222-a002-000000000011', '11ce0002-0002-4002-a002-000000000002', -2500, 'redeemed', 'gift_card',      'Carrefour KES 5,000 supplies voucher',              'kenya'),
('a1b2c3d2-2222-4222-a002-000000000012', '11ce0002-0002-4002-a002-000000000002', -1500, 'redeemed', 'cashback',       'Direct credit to SME Current account (KES 3,000)',  'kenya')

ON CONFLICT (id) DO UPDATE SET
  amount      = EXCLUDED.amount,
  description = EXCLUDED.description,
  market      = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 3 — Kenya-flavoured reward catalog rows
-- -------------------------------------------------------------------------

INSERT INTO reward_catalog (
  id, name, description, points_cost, category, image_url, is_featured, market
) VALUES

('cab51e01-0001-4001-aaaa-000000000001',
 'Kenya Airways Asante Miles 5,000',
 'Convert points to 5,000 Asante Rewards miles for domestic flights.',
 3500, 'travel', NULL, true, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000002',
 'Java House KES 1,000 voucher',
 'Coffee, breakfast or lunch at any Java House outlet country-wide.',
 1000, 'gift_card', NULL, true, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000003',
 'Naivas KES 1,000 shopping voucher',
 'Use at any Naivas branch on groceries and household.',
 800, 'gift_card', NULL, false, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000004',
 'Safaricom KES 500 airtime',
 'Direct airtime top-up to your registered Safaricom line.',
 500, 'cashback', NULL, false, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000005',
 'Carrefour KES 5,000 voucher',
 'Big-ticket purchases at any Carrefour Kenya hypermarket.',
 2500, 'gift_card', NULL, false, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000006',
 'Mara Safari Day Trip (2 pax)',
 'Day trip to the Maasai Mara with a partner operator.',
 18000, 'travel', NULL, true, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000007',
 'KQ Cloud 9 Lounge Access',
 'Single lounge access at JKIA — perfect for business travellers.',
 8000, 'travel', NULL, false, 'kenya'),

('cab51e01-0001-4001-aaaa-000000000008',
 'Donate to KEMRI Research',
 'Convert points to a KES 1,000 donation to KEMRI medical research.',
 900, 'charity', NULL, false, 'kenya')

ON CONFLICT (id) DO UPDATE SET
  points_cost = EXCLUDED.points_cost,
  description = EXCLUDED.description,
  market      = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 4 — verify
-- -------------------------------------------------------------------------

SELECT p.full_name, rp.tier, rp.total_points, rp.lifetime_points, rp.next_tier_progress
FROM reward_profiles rp
JOIN profiles p ON p.id = rp.customer_id
WHERE rp.market = 'kenya'
ORDER BY p.full_name;

SELECT p.full_name,
       SUM(CASE WHEN ra.type = 'earned'   THEN ra.amount ELSE 0 END) AS points_earned_recent,
       SUM(CASE WHEN ra.type = 'redeemed' THEN ra.amount ELSE 0 END) AS points_redeemed_recent,
       COUNT(*) AS activity_rows
FROM reward_activities ra
JOIN profiles p ON p.id = ra.customer_id
WHERE ra.market = 'kenya'
GROUP BY p.full_name
ORDER BY p.full_name;
