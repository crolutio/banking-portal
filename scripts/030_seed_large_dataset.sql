-- Script 030: Seed Large Dataset (Corrected V3)
-- Generates extensive data for demo purposes

DO $$
DECLARE
    u_sarah UUID := '11111111-1111-1111-1111-111111111111';
    u_mohammed UUID := '22222222-2222-2222-2222-222222222222';
    u_emma UUID := '33333333-3333-3333-3333-333333333333';
    u_raj UUID := '44444444-4444-4444-4444-444444444444';
    u_fatima UUID := '55555555-5555-5555-5555-555555555555';
    
    acc_id UUID;
    card_id UUID;
    user_rec RECORD;
    account_rec RECORD;
    merchant_list TEXT[] := ARRAY['Carrefour', 'Spinneys', 'Lulu Hypermarket', 'Amazon.ae', 'Noon', 'Dubizzle', 'IKEA', 'Home Centre', 'Zara', 'H&M', 'Starbucks', 'Costa Coffee', 'Tim Hortons', 'Uber', 'Careem', 'Emirates', 'Etihad', 'Netflix', 'Spotify', 'Apple Services', 'Google Play', 'DEWA', 'Etisalat', 'Du', 'Virgin Mobile', 'Fuel Station', 'Pharmacy', 'Hospital', 'Cinema', 'Restaurant'];
    category_list TEXT[] := ARRAY['groceries', 'shopping', 'entertainment', 'utilities', 'transport', 'healthcare', 'travel', 'restaurants', 'other'];
    txn_date TIMESTAMPTZ;
    txn_amount NUMERIC;
    txn_type transaction_type;
    merchant_name TEXT;
    txn_category TEXT;
    
BEGIN
    -- 1. Ensure all users have a Current Account if not exists
    FOR user_rec IN SELECT id, full_name FROM profiles WHERE role IN ('retail_customer', 'sme_customer') LOOP
        IF NOT EXISTS (SELECT 1 FROM accounts WHERE user_id = user_rec.id AND type = 'current') THEN
            INSERT INTO accounts (user_id, type, name, balance, available_balance, currency, account_number, iban, status)
            VALUES (
                user_rec.id, 
                'current', 
                'Primary Current Account', 
                (random() * 50000 + 5000)::NUMERIC(12,2), 
                (random() * 45000 + 4000)::NUMERIC(12,2), 
                'AED', 
                '784' || floor(random() * 1000000000)::TEXT, 
                'AE' || floor(random() * 90 + 10)::TEXT || '000' || floor(random() * 10000000000000000)::TEXT, 
                'active'
            );
        END IF;
        
        -- Add a Savings Account for everyone
        IF NOT EXISTS (SELECT 1 FROM accounts WHERE user_id = user_rec.id AND type = 'savings') THEN
            INSERT INTO accounts (user_id, type, name, balance, available_balance, currency, account_number, status)
            VALUES (
                user_rec.id, 
                'savings', 
                'High Yield Savings', 
                (random() * 100000 + 10000)::NUMERIC(12,2), 
                (random() * 100000 + 10000)::NUMERIC(12,2), 
                'AED', 
                '784' || floor(random() * 1000000000)::TEXT, 
                'active'
            );
        END IF;
    END LOOP;

    -- 2. Generate Transactions for all accounts (last 6 months)
    FOR account_rec IN SELECT id, user_id, balance FROM accounts LOOP
        FOR i IN 1..50 LOOP -- Generate 50 transactions per account
            txn_date := NOW() - (floor(random() * 180) || ' days')::INTERVAL;
            
            -- Decide type (mostly debits)
            IF random() < 0.8 THEN
                txn_type := 'debit';
                txn_amount := (random() * 500 + 10)::NUMERIC(10,2);
                merchant_name := merchant_list[floor(random() * array_length(merchant_list, 1) + 1)];
                txn_category := category_list[floor(random() * array_length(category_list, 1) + 1)];
            ELSE
                txn_type := 'credit';
                txn_amount := (random() * 5000 + 1000)::NUMERIC(10,2);
                merchant_name := CASE WHEN random() < 0.5 THEN 'Salary Transfer' ELSE 'Transfer In' END;
                txn_category := CASE WHEN merchant_name = 'Salary Transfer' THEN 'salary' ELSE 'transfer' END;
            END IF;

            INSERT INTO transactions (
                account_id, 
                amount, 
                type, 
                category, 
                description, 
                merchant, 
                status, 
                date, 
                balance_after
            ) VALUES (
                account_rec.id,
                txn_amount,
                txn_type,
                txn_category::transaction_category, -- Correct cast here
                CASE WHEN txn_type = 'credit' THEN merchant_name ELSE 'Payment to ' || merchant_name END,
                CASE WHEN txn_type = 'debit' THEN merchant_name ELSE NULL END,
                'completed',
                txn_date,
                account_rec.balance -- Simplified balance tracking
            );
        END LOOP;
    END LOOP;

    -- 3. Add More Cards
    FOR user_rec IN SELECT id FROM profiles WHERE role IN ('retail_customer', 'sme_customer') LOOP
        IF NOT EXISTS (SELECT 1 FROM cards WHERE user_id = user_rec.id AND type = 'credit') THEN
            acc_id := (SELECT id FROM accounts WHERE user_id = user_rec.id LIMIT 1);
            INSERT INTO cards (user_id, account_id, type, brand, last_four, cardholder_name, expiry_date, status, credit_limit, spent_amount)
            VALUES (
                user_rec.id,
                acc_id,
                'credit',
                CASE WHEN random() < 0.5 THEN 'Visa' ELSE 'Mastercard' END,
                floor(random() * 8999 + 1000)::TEXT,
                (SELECT full_name FROM profiles WHERE id = user_rec.id),
                '12/28',
                'active',
                50000.00,
                (random() * 10000)::NUMERIC(10,2)
            );
        END IF;
    END LOOP;

    -- 4. Add Investment Holdings for Raj (VIP) and Sarah
    -- Adding to Raj
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_raj, 'BTC', 'Bitcoin', 'crypto', 0.5, 45000.00, 65000.00),
    (u_raj, 'ETH', 'Ethereum', 'crypto', 10.0, 2500.00, 3500.00),
    (u_raj, 'TSLA', 'Tesla Inc.', 'stock', 50.0, 180.00, 210.00);

    -- Adding to Sarah
    INSERT INTO portfolio_holdings (user_id, symbol, name, type, quantity, avg_cost, current_price) VALUES
    (u_sarah, 'AMZN', 'Amazon.com Inc', 'stock', 20.0, 130.00, 175.00),
    (u_sarah, 'GOOGL', 'Alphabet Inc', 'stock', 15.0, 120.00, 140.00);

    -- 5. Add Loans
    -- Mortgage for Mohammed
    INSERT INTO loans (user_id, type, principal_amount, remaining_balance, interest_rate, term_months, disbursement_date, next_payment_date, monthly_payment, status)
    VALUES (u_mohammed, 'mortgage', 1500000.00, 1420000.00, 4.5, 300, (NOW() - INTERVAL '2 years')::DATE, (NOW() + INTERVAL '15 days')::DATE, 8500.00, 'active');

    -- Business Loan for Fatima
    INSERT INTO loans (user_id, type, principal_amount, remaining_balance, interest_rate, term_months, disbursement_date, next_payment_date, monthly_payment, status)
    VALUES (u_fatima, 'business', 500000.00, 350000.00, 6.0, 60, (NOW() - INTERVAL '18 months')::DATE, (NOW() + INTERVAL '10 days')::DATE, 9600.00, 'active');

END $$;
