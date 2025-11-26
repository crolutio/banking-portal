-- Bank of the Future Database Schema
-- Script 017: Seed Bank Policies

INSERT INTO policies (title, version, category, content, effective_date) VALUES
('Fee Schedule', '2.1', 'fees', 
  'Account Maintenance: AED 0 for balances above AED 3,000, otherwise AED 25/month. Wire Transfers: Domestic AED 0, International AED 50. ATM Withdrawals: Bank ATMs free, other banks AED 2. Card Replacement: First replacement free, subsequent AED 50.',
  '2024-01-01'),

('Dispute Resolution Policy', '1.3', 'disputes',
  'Customers may dispute unauthorized transactions within 60 days. Investigation completed within 10 business days. Provisional credit provided for amounts over AED 500. Final resolution within 45 days. Appeals process available.',
  '2024-01-01'),

('Card Terms and Conditions', '3.0', 'cards',
  'Cards are property of the bank. Report lost/stolen immediately. Liability limited to AED 200 for timely reporting. Contactless limit AED 500. PIN required for transactions over AED 300. Card validity 3 years.',
  '2024-01-01'),

('Privacy Policy', '2.0', 'privacy',
  'We collect personal data for service delivery. Data shared with regulators as required. Third-party sharing requires consent. Data retention for 7 years post-relationship. Right to access and correction. Opt-out available for marketing.',
  '2024-01-01'),

('KYC Requirements', '1.5', 'kyc',
  'Emirates ID required for all accounts. Proof of address within 3 months. Source of funds documentation for high-value transactions. Annual review for high-risk customers. Enhanced due diligence for PEPs.',
  '2024-01-01'),

('Lending Guidelines', '2.2', 'lending',
  'Maximum DBR 50% of salary. Minimum salary AED 5,000 for personal loans. Employment tenure minimum 6 months. Age 21-65 for personal loans. Collateral required for amounts over AED 500,000.',
  '2024-01-01'),

('Complaints Handling', '1.1', 'complaints',
  'Complaints acknowledged within 24 hours. Resolution target 5 business days. Escalation to management after 10 days. Central Bank complaint option provided. Quarterly review of complaints.',
  '2024-01-01'),

('General Terms of Service', '4.0', 'general',
  'Account holder must be UAE resident. Minimum age 18 years. Joint accounts available. Dormancy after 12 months inactivity. Account closure requires 30 days notice. Governing law UAE.',
  '2024-01-01');
