-- Bank of the Future Database Schema
-- Script 001: Create Enums

-- User roles enum
CREATE TYPE user_role AS ENUM (
  'retail_customer',
  'sme_customer', 
  'relationship_manager',
  'risk_compliance',
  'admin'
);

-- Customer segment enum
CREATE TYPE customer_segment AS ENUM (
  'VIP',
  'Premium', 
  'Standard',
  'At Risk'
);

-- KYC status enum
CREATE TYPE kyc_status AS ENUM (
  'Verified',
  'Pending',
  'Review Required'
);

-- Account type enum
CREATE TYPE account_type AS ENUM (
  'current',
  'savings',
  'business',
  'fx_wallet'
);

-- Account status enum
CREATE TYPE account_status AS ENUM (
  'active',
  'frozen',
  'closed'
);

-- Transaction category enum
CREATE TYPE transaction_category AS ENUM (
  'groceries',
  'restaurants',
  'shopping',
  'entertainment',
  'utilities',
  'transport',
  'healthcare',
  'travel',
  'transfer',
  'salary',
  'investment',
  'fees',
  'other'
);

-- Transaction type enum
CREATE TYPE transaction_type AS ENUM (
  'credit',
  'debit'
);

-- Transaction status enum
CREATE TYPE transaction_status AS ENUM (
  'completed',
  'pending',
  'failed'
);

-- Card type enum
CREATE TYPE card_type AS ENUM (
  'debit',
  'credit',
  'virtual'
);

-- Card brand enum
CREATE TYPE card_brand AS ENUM (
  'Visa',
  'Mastercard'
);

-- Card status enum
CREATE TYPE card_status AS ENUM (
  'active',
  'frozen',
  'expired',
  'cancelled'
);

-- Loan type enum
CREATE TYPE loan_type AS ENUM (
  'personal',
  'mortgage',
  'auto',
  'business',
  'credit_line'
);

-- Loan status enum
CREATE TYPE loan_status AS ENUM (
  'active',
  'paid_off',
  'delinquent'
);

-- Loan application status enum
CREATE TYPE loan_application_status AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'disbursed'
);

-- Investment type enum
CREATE TYPE investment_type AS ENUM (
  'stock',
  'bond',
  'etf',
  'mutual_fund',
  'crypto'
);

-- Risk profile category enum
CREATE TYPE risk_profile_category AS ENUM (
  'Conservative',
  'Moderate',
  'Aggressive'
);

-- Savings goal category enum
CREATE TYPE savings_goal_category AS ENUM (
  'travel',
  'shopping',
  'home',
  'education',
  'emergency',
  'vehicle',
  'wedding',
  'retirement',
  'other'
);

-- Savings goal status enum
CREATE TYPE savings_goal_status AS ENUM (
  'active',
  'paused',
  'completed',
  'cancelled'
);

-- Connected app category enum
CREATE TYPE connected_app_category AS ENUM (
  'shopping',
  'entertainment',
  'telecom',
  'utilities',
  'transport',
  'food_delivery',
  'travel',
  'government'
);

-- Alert severity enum
CREATE TYPE alert_severity AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

-- Alert type enum
CREATE TYPE alert_type AS ENUM (
  'aml',
  'kyc',
  'fraud',
  'policy_breach',
  'unusual_activity'
);

-- Alert status enum
CREATE TYPE alert_status AS ENUM (
  'open',
  'investigating',
  'resolved',
  'escalated'
);

-- Audit action type enum
CREATE TYPE audit_action_type AS ENUM (
  'ai_response',
  'transfer',
  'dispute',
  'loan_application',
  'card_action',
  'policy_change',
  'login'
);

-- Support ticket status enum
CREATE TYPE ticket_status AS ENUM (
  'open',
  'in_progress',
  'resolved',
  'closed'
);

-- Support ticket priority enum
CREATE TYPE ticket_priority AS ENUM (
  'low',
  'medium',
  'high'
);

-- AI confidence level enum
CREATE TYPE ai_confidence AS ENUM (
  'high',
  'medium',
  'low'
);

-- Citation type enum
CREATE TYPE citation_type AS ENUM (
  'account_ledger',
  'policy',
  'product_terms',
  'transaction_history',
  'crm_notes',
  'risk_rules'
);
