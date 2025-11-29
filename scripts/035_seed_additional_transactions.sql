-- Script 035: Seed Additional Transactions
-- Adds recent, high-density ledger activity across every account to enrich demos.

DO $$
DECLARE
    account_rec RECORD;
    merchant_pool TEXT[] := ARRAY[
        'Carrefour', 'Spinneys', 'Amazon.ae', 'Noon', 'Careem', 'Uber',
        'Dubai Mall', 'Emirates NBD', 'Apple Services', 'Google Play',
        'Netflix', 'Spotify', 'Etisalat', 'Du', 'Fuel Station',
        'Hospital', 'Pharmacy', 'IKEA', 'Zara', 'H&M', 'Lulu Hypermarket',
        'TransferWise', 'Salary Bonus', 'ADCB Rewards'
    ];
    category_pool TEXT[] := ARRAY[
        'groceries', 'restaurants', 'shopping', 'entertainment', 'utilities',
        'transport', 'healthcare', 'travel', 'fees', 'other'
    ];
    txn_type transaction_type;
    txn_category TEXT;
    txn_amount NUMERIC(12,2);
    txn_date TIMESTAMPTZ;
    running_balance NUMERIC(12,2);
    loop_idx INT;
    merchant_name TEXT;
BEGIN
    FOR account_rec IN
        SELECT id, balance
        FROM accounts
    LOOP
        running_balance := account_rec.balance;

        -- Add 25 fresh transactions per account (roughly last 60 days)
        FOR loop_idx IN 1..25 LOOP
            txn_date := (NOW() - ((loop_idx * 2) || ' days')::INTERVAL)
                        - ( (random() * 10)::INT || ' hours')::INTERVAL;

            IF random() < 0.78 THEN
                txn_type := 'debit';
                txn_amount := (random() * 900 + 25)::NUMERIC(12,2);
                merchant_name := merchant_pool[1 + floor(random() * array_length(merchant_pool, 1))];
                txn_category := category_pool[1 + floor(random() * array_length(category_pool, 1))];
                running_balance := GREATEST(running_balance - txn_amount, 0);
            ELSE
                txn_type := 'credit';
                txn_amount := (random() * 7500 + 1500)::NUMERIC(12,2);
                merchant_name := CASE WHEN random() < 0.6 THEN 'Salary Bonus' ELSE 'Incoming Transfer' END;
                txn_category := CASE WHEN merchant_name = 'Salary Bonus' THEN 'salary' ELSE 'transfer' END;
                running_balance := running_balance + txn_amount;
            END IF;

            INSERT INTO transactions (
                account_id,
                date,
                description,
                merchant,
                category,
                amount,
                balance_after,
                type,
                status,
                reference,
                metadata
            ) VALUES (
                account_rec.id,
                txn_date,
                CASE WHEN txn_type = 'debit' THEN 'Payment to ' || merchant_name ELSE merchant_name END,
                CASE WHEN txn_type = 'debit' THEN merchant_name ELSE NULL END,
                txn_category::transaction_category,
                txn_amount,
                running_balance,
                txn_type,
                'completed',
                CONCAT('ADDL-', loop_idx, '-', substr(account_rec.id::TEXT, 1, 8)),
                jsonb_build_object('source', 'seed_035', 'batch', loop_idx)
            );
        END LOOP;
    END LOOP;
END $$;

