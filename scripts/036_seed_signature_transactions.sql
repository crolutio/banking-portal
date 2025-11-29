-- Script 036: Seed Signature High-Value Transactions
-- Adds curated marquee payments/transfers for flagship demo users.

DO $$
DECLARE
    txn RECORD;
    acct_id UUID;
    running_balance NUMERIC(12,2);
BEGIN
    CREATE TEMP TABLE tmp_balance_cache (
        account_id UUID PRIMARY KEY,
        balance NUMERIC(12,2)
    ) ON COMMIT DROP;

    FOR txn IN
        SELECT * FROM (
            VALUES
                -- Sarah Chen (Retail VIP)
                ('11111111-1111-1111-1111-111111111111'::UUID, 'Luxury Watch Purchase', 'Rolex Boutique DIFC', 'shopping', 68500.00, 'debit', 4),
                ('11111111-1111-1111-1111-111111111111'::UUID, 'Private Jet Deposit', 'VistaJet Charter', 'travel', 125000.00, 'debit', 7),
                ('11111111-1111-1111-1111-111111111111'::UUID, 'Bonus Equity Payout', 'TechCorp ESOP', 'salary', 180000.00, 'credit', 6),
                ('11111111-1111-1111-1111-111111111111'::UUID, 'Art Basel Purchase', 'Gagosian Gallery', 'entertainment', 52000.00, 'debit', 12),
                -- Mohammed Al-Farsi (Mortgage client)
                ('22222222-2222-2222-2222-222222222222'::UUID, 'Villa Renovation Advance', 'Emaar Contractors', 'home', 240000.00, 'debit', 9),
                ('22222222-2222-2222-2222-222222222222'::UUID, 'Oil & Gas Consultancy Retainer', 'Falcon Energy', 'salary', 95000.00, 'credit', 10),
                ('22222222-2222-2222-2222-222222222222'::UUID, 'Dubai British School Fees', 'Taaleem Group', 'education', 87000.00, 'debit', 14),
                -- Emma Rodriguez (SME founder)
                ('33333333-3333-3333-3333-333333333333'::UUID, 'Inventory Settlement', 'Amazon Vendor Payout', 'transfer', 420000.00, 'credit', 3),
                ('33333333-3333-3333-3333-333333333333'::UUID, 'Dubai Mall Pop-up Lease', 'Emaar Leasing', 'fees', 78000.00, 'debit', 5),
                ('33333333-3333-3333-3333-333333333333'::UUID, 'Global Shipping Invoice', 'Aramex Logistics', 'transport', 56000.00, 'debit', 8),
                -- Raj Patel (Private client)
                ('44444444-4444-4444-4444-444444444444'::UUID, 'Family Office Contribution', 'Raj Capital LLC', 'investment', 350000.00, 'debit', 11),
                ('44444444-4444-4444-4444-444444444444'::UUID, 'Dividend Sweep', 'Global Equities Desk', 'salary', 210000.00, 'credit', 13),
                ('44444444-4444-4444-4444-444444444444'::UUID, 'Gulfstream Hangar Fees', 'Al Maktoum Aviation', 'travel', 43000.00, 'debit', 2),
                -- Fatima Al-Hassan (SME / business loan)
                ('55555555-5555-5555-5555-555555555555'::UUID, 'Corporate Event Advance', 'Expo City Dubai', 'entertainment', 92000.00, 'debit', 6),
                ('55555555-5555-5555-5555-555555555555'::UUID, 'VC Bridge Funding', 'Founders Collective', 'transfer', 275000.00, 'credit', 4),
                ('55555555-5555-5555-5555-555555555555'::UUID, 'GCC Expansion Travel', 'Emirates Business Class', 'travel', 36000.00, 'debit', 1)
        ) AS t(user_id, description, merchant, category, amount, txn_type, days_ago)
    LOOP
        SELECT id INTO acct_id
        FROM accounts
        WHERE user_id = txn.user_id
        ORDER BY created_at
        LIMIT 1;

        IF acct_id IS NULL THEN
            CONTINUE;
        END IF;

        SELECT balance INTO running_balance
        FROM tmp_balance_cache
        WHERE account_id = acct_id;

        IF running_balance IS NULL THEN
            SELECT balance INTO running_balance FROM accounts WHERE id = acct_id;
            INSERT INTO tmp_balance_cache (account_id, balance)
            VALUES (acct_id, running_balance)
            ON CONFLICT (account_id) DO NOTHING;
        END IF;

        IF txn.txn_type = 'debit' THEN
            running_balance := GREATEST(running_balance - txn.amount, 0);
        ELSE
            running_balance := running_balance + txn.amount;
        END IF;

        UPDATE tmp_balance_cache
        SET balance = running_balance
        WHERE account_id = acct_id;

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
        )
        VALUES (
            acct_id,
            NOW() - (txn.days_ago || ' days')::INTERVAL,
            txn.description,
            CASE WHEN txn.txn_type = 'debit' THEN txn.merchant ELSE NULL END,
            CASE
                WHEN txn.category = 'home' THEN 'other'
                WHEN txn.category = 'education' THEN 'other'
                ELSE txn.category
            END::transaction_category,
            txn.amount,
            running_balance,
            txn.txn_type::transaction_type,
            'completed',
            CONCAT('SIG-', substr(acct_id::TEXT, 1, 6), '-', txn.days_ago),
            jsonb_build_object(
                'source', 'seed_036',
                'merchant', txn.merchant,
                'persona', txn.user_id
            )
        );
    END LOOP;
END $$;

