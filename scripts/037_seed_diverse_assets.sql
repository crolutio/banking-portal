-- Script 037: Seed diverse asset classes for Sarah Chen's portfolio
-- Adds holdings across all investment categories so each page shows data

DO $$
DECLARE
    u_sarah UUID := '11111111-1111-1111-1111-111111111111';
BEGIN

    -- =====================================================
    -- PRIVATE MARKETS (~$800k)
    -- =====================================================
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    -- Private Equity
    (u_sarah, 'BLACKSTONE-PE', 'Blackstone Growth Fund IV', 'private_equity', 10.0, 25000.00, 32500.00),  -- $325k
    (u_sarah, 'KKR-PE', 'KKR Global Infrastructure Fund', 'private_equity', 5.0, 50000.00, 58000.00),     -- $290k
    -- Venture Capital
    (u_sarah, 'SEQUOIA-VC', 'Sequoia Capital Fund XXII', 'venture_capital', 2.0, 100000.00, 95000.00);    -- $190k (some loss typical in VC)

    -- =====================================================
    -- REAL ESTATE (Direct / Funds) (~$750k)
    -- Note: REITs like O and PLD are "stock" type; these are direct RE holdings
    -- =====================================================
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'DUBAI-APT', 'Dubai Marina Apartment Unit 1204', 'real_estate', 1.0, 420000.00, 485000.00),  -- $485k
    (u_sarah, 'LONDON-COMM', 'London Commercial Property Fund', 'real_estate', 5.0, 50000.00, 53000.00);   -- $265k

    -- =====================================================
    -- ALTERNATIVE ASSETS (~$400k)
    -- Crypto already seeded; adding commodities & collectibles
    -- =====================================================
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    -- Commodities
    (u_sarah, 'GOLD-BAR', 'Physical Gold (10oz bars)', 'commodity', 5.0, 18500.00, 23500.00),            -- $117.5k
    (u_sarah, 'SILVER-BAR', 'Physical Silver (100oz bars)', 'commodity', 20.0, 2400.00, 2950.00),        -- $59k
    -- Collectibles
    (u_sarah, 'ROLEX-DAYTONA', 'Rolex Daytona 116500LN', 'collectible', 1.0, 32000.00, 42000.00),        -- $42k
    (u_sarah, 'HERMES-BIRKIN', 'Hermès Birkin 25 Togo Gold', 'collectible', 1.0, 15000.00, 28000.00),    -- $28k
    (u_sarah, 'ART-WARHOL', 'Andy Warhol Print (Flowers)', 'collectible', 1.0, 85000.00, 105000.00);     -- $105k

    -- =====================================================
    -- BUSINESS OWNERSHIP (~$500k)
    -- =====================================================
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'TECHSTART-EQ', 'TechStart Inc. (Angel Investment)', 'business_equity', 50000.0, 2.00, 4.50),       -- $225k
    (u_sarah, 'GREENENERGY-EQ', 'GreenEnergy Solutions LLC (5% stake)', 'business_equity', 1.0, 150000.00, 275000.00); -- $275k

    -- =====================================================
    -- WEALTH PRESERVATION / TRUSTS (~$1M)
    -- =====================================================
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'FAMILY-TRUST', 'Chen Family Irrevocable Trust', 'trust', 1.0, 800000.00, 850000.00),       -- $850k
    (u_sarah, 'EDUCATION-TRUST', 'Education Trust Fund', 'trust', 1.0, 150000.00, 165000.00);             -- $165k

    -- =====================================================
    -- LIFESTYLE INVESTMENTS (~$600k)
    -- =====================================================
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'YACHT-SHARE', 'Fractional Yacht Ownership (Sunseeker 76)', 'luxury_asset', 0.125, 3200000.00, 3500000.00), -- $437.5k (1/8 share)
    (u_sarah, 'WINE-COLL', 'Fine Wine Collection (Bordeaux)', 'luxury_asset', 1.0, 120000.00, 145000.00);                  -- $145k

END $$;

