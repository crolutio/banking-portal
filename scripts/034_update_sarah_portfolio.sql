-- Script 034: Update Sarah Chen Portfolio
-- Adds diverse assets to total ~$5M USD for Sarah Chen (ID: 11111111-1111-1111-1111-111111111111)

DO $$
DECLARE
    u_sarah UUID := '11111111-1111-1111-1111-111111111111';
BEGIN
    -- Clear existing holdings for clean slate or update/upsert. 
    -- For safety in this demo script, let's delete her existing holdings first to avoid duplicates/conflicts 
    -- and ensure the total is exactly what we want.
    DELETE FROM portfolio_holdings WHERE user_id = u_sarah;

    -- 1. Stocks (approx $2.5M)
    -- Tech Growth
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'NVDA', 'NVIDIA Corporation', 'stock', 1500.0, 450.00, 850.00), -- $1.275M
    (u_sarah, 'AAPL', 'Apple Inc.', 'stock', 3000.0, 145.00, 185.00), -- $555k
    (u_sarah, 'MSFT', 'Microsoft Corporation', 'stock', 1200.0, 280.00, 415.00); -- $498k

    -- 2. ETFs & Mutual Funds (approx $1.5M)
    -- S&P 500
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'VOO', 'Vanguard S&P 500 ETF', 'etf', 2000.0, 380.00, 475.00), -- $950k
    -- International
    (u_sarah, 'VXUS', 'Vanguard Total International Stock ETF', 'etf', 5000.0, 52.00, 58.00), -- $290k
    -- Bonds
    (u_sarah, 'BND', 'Vanguard Total Bond Market ETF', 'etf', 3500.0, 75.00, 72.00); -- $252k

    -- 3. Alternative / Crypto (approx $500k)
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'BTC', 'Bitcoin', 'crypto', 4.5, 42000.00, 68000.00), -- $306k
    (u_sarah, 'ETH', 'Ethereum', 'crypto', 50.0, 2100.00, 3800.00); -- $190k

    -- 4. Real Estate / REITs (approx $500k)
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'O', 'Realty Income Corporation', 'stock', 5000.0, 55.00, 52.00), -- $260k
    (u_sarah, 'PLD', 'Prologis, Inc.', 'stock', 2000.0, 110.00, 125.00); -- $250k

END $$;

