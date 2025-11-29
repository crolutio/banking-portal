-- Bank of the Future Database Schema
-- Script 032: Create Rewards Tables

-- Create types for rewards
DO $$ BEGIN
    CREATE TYPE reward_transaction_type AS ENUM ('earned', 'redeemed', 'expired', 'adjusted');
    CREATE TYPE reward_activity_category AS ENUM ('purchase', 'referral', 'login_streak', 'account_opening', 'marketplace_bonus', 'gift_card', 'travel', 'cashback', 'charity', 'gadget');
    CREATE TYPE redemption_status AS ENUM ('pending', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Table to store user point balances and tier info
CREATE TABLE IF NOT EXISTS reward_profiles (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    lifetime_points INTEGER NOT NULL DEFAULT 0,
    tier TEXT NOT NULL DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
    next_tier_progress DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for available rewards in the catalog
CREATE TABLE IF NOT EXISTS reward_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    points_cost INTEGER NOT NULL,
    category reward_activity_category NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    stock_quantity INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for point transactions (earning and spending history)
CREATE TABLE IF NOT EXISTS reward_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL, -- Positive for earned, negative for redeemed
    type reward_transaction_type NOT NULL,
    category reward_activity_category NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for tracking redemptions
CREATE TABLE IF NOT EXISTS reward_redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reward_id UUID REFERENCES reward_catalog(id),
    points_spent INTEGER NOT NULL,
    status redemption_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reward_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

-- Policies

-- Reward Profiles
CREATE POLICY "Users can view own reward profile"
    ON reward_profiles FOR SELECT
    USING (auth.uid() = user_id);

-- Reward Catalog
CREATE POLICY "Everyone can view reward catalog"
    ON reward_catalog FOR SELECT
    USING (true);

-- Reward Activities
CREATE POLICY "Users can view own reward activities"
    ON reward_activities FOR SELECT
    USING (auth.uid() = user_id);

-- Reward Redemptions
CREATE POLICY "Users can view and create own redemptions"
    ON reward_redemptions FOR ALL
    USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_reward_activities_user ON reward_activities(user_id);
CREATE INDEX idx_reward_redemptions_user ON reward_redemptions(user_id);

