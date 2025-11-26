-- Bank of the Future Database Schema
-- Script 015: Seed Marketplace Apps

INSERT INTO marketplace_apps (name, description, category, credit_score_points, data_shared, offers) VALUES
-- Shopping
('Amazon', 'World''s largest online marketplace', 'shopping', 15, 
  ARRAY['Order history', 'Prime membership status', 'Payment history'],
  '[{"title": "5% cashback on all purchases", "description": "Get 5% cashback when paying with your bank card"}, {"title": "EMI options", "description": "0% EMI on purchases over AED 500"}]'::jsonb),

('Noon', 'UAE''s homegrown e-commerce platform', 'shopping', 12,
  ARRAY['Purchase history', 'Returns rate', 'Payment behavior'],
  '[{"title": "10% off electronics", "description": "Exclusive discount on electronics"}, {"title": "Buy Now Pay Later", "description": "Split payments into 4 interest-free installments"}]'::jsonb),

('IKEA', 'Swedish furniture and home goods retailer', 'shopping', 10,
  ARRAY['Purchase frequency', 'Order value trends'],
  '[{"title": "Free delivery", "description": "Free delivery on orders over AED 200"}, {"title": "12-month financing", "description": "0% financing on furniture purchases"}]'::jsonb),

('Carrefour', 'International hypermarket chain', 'shopping', 10,
  ARRAY['Shopping frequency', 'Category preferences', 'Loyalty points'],
  '[{"title": "Double loyalty points", "description": "Earn 2x points when paying with bank card"}, {"title": "Weekly cashback", "description": "Up to 3% cashback on groceries"}]'::jsonb),

-- Entertainment
('Netflix', 'Global streaming entertainment service', 'entertainment', 8,
  ARRAY['Subscription status', 'Payment history', 'Plan type'],
  '[{"title": "2 months free", "description": "Get 2 months free on annual subscription"}, {"title": "Premium upgrade", "description": "Free upgrade to Premium plan for 3 months"}]'::jsonb),

('Spotify', 'Music and podcast streaming platform', 'entertainment', 6,
  ARRAY['Subscription tier', 'Payment regularity'],
  '[{"title": "50% off Premium", "description": "Half price Premium for first 6 months"}, {"title": "Free trial extension", "description": "Extended 3-month free trial"}]'::jsonb),

('Shahid VIP', 'Arab world''s leading streaming platform', 'entertainment', 7,
  ARRAY['Subscription status', 'Viewing preferences'],
  '[{"title": "Annual discount", "description": "30% off annual subscription"}, {"title": "Bundle offer", "description": "Free sports package for 6 months"}]'::jsonb),

-- Telecom
('Etisalat (e&)', 'UAE''s leading telecommunications company', 'telecom', 20,
  ARRAY['Bill payment history', 'Plan type', 'Payment regularity', 'Account tenure'],
  '[{"title": "Data bonus", "description": "20GB free data monthly"}, {"title": "Device financing", "description": "0% financing on devices"}, {"title": "Bill discount", "description": "10% off monthly bill"}]'::jsonb),

('du', 'UAE telecommunications provider', 'telecom', 20,
  ARRAY['Payment history', 'Plan details', 'Usage patterns'],
  '[{"title": "Roaming discount", "description": "50% off international roaming"}, {"title": "Upgrade bonus", "description": "Free plan upgrade for 3 months"}]'::jsonb),

-- Utilities
('DEWA', 'Dubai Electricity and Water Authority', 'utilities', 25,
  ARRAY['Payment history', 'Consumption patterns', 'Account status'],
  '[{"title": "Green rewards", "description": "Earn rewards for energy efficiency"}, {"title": "Auto-pay bonus", "description": "5% discount on bills with auto-pay"}]'::jsonb),

('ADDC', 'Abu Dhabi Distribution Company', 'utilities', 25,
  ARRAY['Utility payment history', 'Account standing'],
  '[{"title": "Loyalty rewards", "description": "Points for on-time payments"}, {"title": "Smart meter savings", "description": "Insights to reduce bills"}]'::jsonb),

-- Transport
('Salik', 'Dubai toll gate system', 'transport', 15,
  ARRAY['Top-up frequency', 'Usage patterns', 'Auto-recharge status'],
  '[{"title": "Auto top-up bonus", "description": "10% bonus on auto top-up"}, {"title": "Trip rewards", "description": "Earn points per trip"}]'::jsonb),

('Emirates', 'UAE''s flagship airline', 'travel', 18,
  ARRAY['Booking history', 'Skywards tier', 'Payment patterns'],
  '[{"title": "Miles bonus", "description": "Double Skywards miles on bookings"}, {"title": "Lounge access", "description": "Complimentary lounge passes"}, {"title": "Upgrade vouchers", "description": "Free upgrade vouchers quarterly"}]'::jsonb),

('Careem', 'Middle East ride-hailing platform', 'transport', 10,
  ARRAY['Ride frequency', 'Payment method', 'Subscription status'],
  '[{"title": "Ride credits", "description": "AED 50 monthly ride credits"}, {"title": "Priority pickup", "description": "Priority during peak hours"}]'::jsonb),

-- Food Delivery
('Talabat', 'Leading food delivery platform in MENA', 'food_delivery', 8,
  ARRAY['Order frequency', 'Average order value', 'Payment history'],
  '[{"title": "Free delivery", "description": "Unlimited free delivery for 3 months"}, {"title": "Cashback rewards", "description": "5% cashback on all orders"}]'::jsonb),

('Deliveroo', 'Premium food delivery service', 'food_delivery', 8,
  ARRAY['Order patterns', 'Subscription status'],
  '[{"title": "Plus membership", "description": "3 months free Deliveroo Plus"}, {"title": "Restaurant offers", "description": "Exclusive restaurant discounts"}]'::jsonb),

-- Government
('ICP (Federal Authority for Identity)', 'UAE identity and citizenship', 'government', 30,
  ARRAY['Emirates ID status', 'Visa validity', 'Residency status'],
  '[{"title": "Verified identity", "description": "Enhanced account security and higher limits"}, {"title": "Fast-track services", "description": "Priority processing for bank services"}]'::jsonb),

('Dubai Now', 'Smart Dubai government services app', 'government', 22,
  ARRAY['Services used', 'Payment history', 'Fine payments'],
  '[{"title": "Bill consolidation", "description": "Pay all government fees from one place"}, {"title": "Payment reminders", "description": "Never miss a payment deadline"}]'::jsonb);
