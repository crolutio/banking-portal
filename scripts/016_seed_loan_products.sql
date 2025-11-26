-- Bank of the Future Database Schema
-- Script 016: Seed Loan Products

INSERT INTO loan_products (type, name, min_amount, max_amount, min_term_months, max_term_months, interest_rate, apr, features) VALUES
-- Personal Loans
('personal', 'Quick Personal Loan', 5000, 50000, 6, 24, 8.99, 9.45, 
  ARRAY['Same-day approval', 'No collateral required', 'Flexible repayment', 'Early repayment option']),
  
('personal', 'Premium Personal Loan', 50000, 500000, 12, 60, 6.99, 7.35,
  ARRAY['Competitive rates', 'Higher limits for VIP customers', 'Dedicated relationship manager', 'Fee waivers']),

-- Auto Loans  
('auto', 'New Car Finance', 30000, 500000, 12, 60, 3.99, 4.25,
  ARRAY['Up to 80% financing', 'Comprehensive insurance included', 'Free registration', 'Flexible down payment']),
  
('auto', 'Used Car Finance', 20000, 300000, 12, 48, 5.99, 6.35,
  ARRAY['Cars up to 5 years old', 'Quick valuation', 'Competitive rates', 'Insurance options']),

-- Mortgage
('mortgage', 'Home Purchase Loan', 500000, 10000000, 60, 300, 3.49, 3.75,
  ARRAY['Up to 80% LTV', 'Fixed rate options', 'Free property valuation', 'Life insurance included']),
  
('mortgage', 'Home Refinance', 300000, 8000000, 60, 240, 3.29, 3.55,
  ARRAY['Lower your monthly payments', 'Cash-out option', 'No early settlement fees', 'Quick processing']),

-- Business Loans
('business', 'SME Working Capital', 50000, 2000000, 12, 48, 7.99, 8.45,
  ARRAY['Quick approval', 'Minimal documentation', 'No collateral up to 500K', 'Revolving credit option']),
  
('business', 'Business Expansion Loan', 200000, 10000000, 24, 84, 6.49, 6.95,
  ARRAY['Competitive rates', 'Flexible collateral', 'Grace period available', 'Dedicated business banker']),

-- Credit Line
('credit_line', 'Personal Credit Line', 10000, 100000, 12, 36, 10.99, 11.50,
  ARRAY['Draw as needed', 'Pay interest only on used amount', 'Revolving facility', 'Instant access']),
  
('credit_line', 'Business Credit Line', 50000, 500000, 12, 48, 8.99, 9.45,
  ARRAY['Flexible drawdown', 'Working capital solution', 'Competitive rates', 'Easy renewal']);
