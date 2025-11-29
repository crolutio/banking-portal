-- Script 033: Seed Rewards Data
-- Populates reward profiles, catalog, and activities

DO $$
DECLARE
    u_sarah UUID := '11111111-1111-1111-1111-111111111111';
    u_mohammed UUID := '22222222-2222-2222-2222-222222222222';
    u_emma UUID := '33333333-3333-3333-3333-333333333333';
    
    r_voucher UUID := gen_random_uuid();
    r_headphones UUID := gen_random_uuid();
    r_flight UUID := gen_random_uuid();
    r_charity UUID := gen_random_uuid();
    r_coffee UUID := gen_random_uuid();
BEGIN
    -- 1. Seed Reward Profiles
    INSERT INTO reward_profiles (user_id, total_points, lifetime_points, tier, next_tier_progress) VALUES
    (u_sarah, 12500, 25000, 'Gold', 65.5),
    (u_mohammed, 5400, 8000, 'Silver', 30.0),
    (u_emma, 1200, 1200, 'Bronze', 12.0)
    ON CONFLICT (user_id) DO UPDATE SET
        total_points = EXCLUDED.total_points,
        lifetime_points = EXCLUDED.lifetime_points,
        tier = EXCLUDED.tier;

    -- 2. Seed Reward Catalog
    INSERT INTO reward_catalog (id, name, description, points_cost, category, image_url, is_featured, stock_quantity) VALUES
    (r_voucher, 'AED 500 Mall Voucher', 'Valid at any major mall in UAE', 5000, 'gift_card', '/placeholder.svg?height=100&width=100', true, 100),
    (r_headphones, 'Premium Noise-Cancelling Headphones', 'Wireless over-ear headphones', 15000, 'gadget', '/placeholder.svg?height=100&width=100', true, 20),
    (r_flight, 'Flight Upgrade Voucher', 'Upgrade to Business Class on partner airlines', 25000, 'travel', '/placeholder.svg?height=100&width=100', true, 50),
    (r_charity, 'Donate AED 100 to Charity', 'Support local community initiatives', 1000, 'charity', '/placeholder.svg?height=100&width=100', false, null),
    (r_coffee, 'Coffee Shop Credit', 'AED 50 credit for premium coffee chains', 500, 'gift_card', '/placeholder.svg?height=100&width=100', false, 500);

    -- 3. Seed Reward Activities for Sarah
    INSERT INTO reward_activities (user_id, amount, type, category, description, created_at) VALUES
    (u_sarah, 500, 'earned', 'account_opening', 'Welcome Bonus', NOW() - INTERVAL '6 months'),
    (u_sarah, 150, 'earned', 'purchase', 'Card Spend: Grocery', NOW() - INTERVAL '5 months'),
    (u_sarah, 2000, 'earned', 'referral', 'Referral Bonus: John Doe', NOW() - INTERVAL '4 months'),
    (u_sarah, -5000, 'redeemed', 'gift_card', 'Redeemed: AED 500 Mall Voucher', NOW() - INTERVAL '3 months'),
    (u_sarah, 350, 'earned', 'marketplace_bonus', 'Marketplace: Amazon Connect', NOW() - INTERVAL '2 months'),
    (u_sarah, 5000, 'earned', 'purchase', 'Card Spend: Travel Booking', NOW() - INTERVAL '1 month'),
    (u_sarah, 100, 'earned', 'login_streak', '7-Day Login Streak', NOW() - INTERVAL '2 days');

    -- 4. Seed Redemptions for Sarah
    INSERT INTO reward_redemptions (user_id, reward_id, points_spent, status, created_at) VALUES
    (u_sarah, r_voucher, 5000, 'completed', NOW() - INTERVAL '3 months');

END $$;

