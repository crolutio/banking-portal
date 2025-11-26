-- Seed portfolio holdings

INSERT INTO portfolio_holdings (id, user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
-- Fixed UUID format: 'hold' → 'abcd' to use valid hexadecimal characters
-- Sarah Chen's portfolio
('abcd1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'AAPL', 'Apple Inc.', 'stock', 25, 145.00, 178.50),
('abcd1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'MSFT', 'Microsoft Corporation', 'stock', 15, 280.00, 378.25),
('abcd1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'VOO', 'Vanguard S&P 500 ETF', 'etf', 10, 380.00, 425.50),
('abcd1111-0004-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'BND', 'Vanguard Total Bond ETF', 'bond', 50, 78.00, 72.25),

-- Mohammed Ali's portfolio
('abcd2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'GOOGL', 'Alphabet Inc.', 'stock', 20, 125.00, 142.80),
('abcd2222-0002-0001-0001-000000000002', '22222222-2222-2222-2222-222222222222', 'AMZN', 'Amazon.com Inc.', 'stock', 30, 145.00, 178.90),
('abcd2222-0003-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'VTI', 'Vanguard Total Stock ETF', 'etf', 40, 210.00, 245.75),

-- Raj Patel's portfolio (Private Banking - Diversified)
('abcd4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'AAPL', 'Apple Inc.', 'stock', 500, 120.00, 178.50),
('abcd4444-0002-0001-0001-000000000002', '44444444-4444-4444-4444-444444444444', 'NVDA', 'NVIDIA Corporation', 'stock', 200, 250.00, 485.50),
('abcd4444-0003-0001-0001-000000000003', '44444444-4444-4444-4444-444444444444', 'TSLA', 'Tesla Inc.', 'stock', 100, 200.00, 245.80),
('abcd4444-0004-0001-0001-000000000004', '44444444-4444-4444-4444-444444444444', 'BRK.B', 'Berkshire Hathaway', 'stock', 50, 320.00, 365.40),
('abcd4444-0005-0001-0001-000000000005', '44444444-4444-4444-4444-444444444444', 'GLD', 'SPDR Gold Shares', 'etf', 100, 175.00, 192.50),
('abcd4444-0006-0001-0001-000000000006', '44444444-4444-4444-4444-444444444444', 'QQQ', 'Invesco QQQ Trust', 'etf', 75, 350.00, 405.25),
('abcd4444-0007-0001-0001-000000000007', '44444444-4444-4444-4444-444444444444', 'SCHD', 'Schwab US Dividend ETF', 'etf', 200, 72.00, 78.50)

ON CONFLICT (id) DO UPDATE SET
  current_price = EXCLUDED.current_price;

-- Seed watchlist
INSERT INTO watchlist (id, user_id, symbol, name, type) VALUES
('bcde1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'NVDA', 'NVIDIA Corporation', 'stock'),
('bcde1111-0002-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'AMD', 'Advanced Micro Devices', 'stock'),
('bcde1111-0003-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'TSLA', 'Tesla Inc.', 'stock'),
('bcde2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'META', 'Meta Platforms Inc.', 'stock'),
('bcde2222-0002-0001-0001-000000000002', '22222222-2222-2222-2222-222222222222', 'CRM', 'Salesforce Inc.', 'stock'),
('bcde4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'COIN', 'Coinbase Global', 'stock'),
('bcde4444-0002-0001-0001-000000000002', '44444444-4444-4444-4444-444444444444', 'SQ', 'Block Inc.', 'stock')

ON CONFLICT (id) DO NOTHING;

-- Seed risk profiles
INSERT INTO risk_profiles (id, user_id, score, category, questionnaire_answers) VALUES
-- Changed 'moderate', 'moderate_aggressive', 'aggressive' to 'Moderate', 'Moderate', 'Aggressive' to match capitalized enum
('cdef1111-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 65, 'Moderate', '{"horizon": "5-10 years", "loss_tolerance": "moderate", "investment_goal": "growth"}'),
('cdef2222-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 72, 'Moderate', '{"horizon": "10+ years", "loss_tolerance": "high", "investment_goal": "aggressive_growth"}'),
('cdef4444-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 85, 'Aggressive', '{"horizon": "10+ years", "loss_tolerance": "very_high", "investment_goal": "maximum_growth"}')

ON CONFLICT (id) DO NOTHING;
