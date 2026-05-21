-- =========================================================================
-- REVERT PRODUCTS CATALOG CURRENCY: KES -> AED (Banking DB)
-- Run in Banking Supabase SQL Editor.
-- Idempotent — re-running is safe.
-- =========================================================================
--
-- Backstory: extend_products_schema.sql and seed_investment_products.sql
-- used "KES" in tagline + key_features for the Kenyan demo. We've reverted
-- the rest of the UI to AED, so this aligns the product catalog labels.
-- =========================================================================

-- Tagline column (replace literal "KES" with "AED")
UPDATE products
SET tagline = REPLACE(tagline, 'KES', 'AED')
WHERE tagline LIKE '%KES%';

-- key_features is a text array — rewrite each element with REPLACE
UPDATE products
SET key_features = (
  SELECT ARRAY_AGG(REPLACE(feature, 'KES', 'AED'))
  FROM unnest(key_features) AS feature
)
WHERE EXISTS (
  SELECT 1 FROM unnest(key_features) AS feature WHERE feature LIKE '%KES%'
);

-- Long description column too (covers seed_investment_products.sql copy)
UPDATE products
SET description = REPLACE(description, 'KES', 'AED')
WHERE description LIKE '%KES%';

-- =========================================================================
-- VERIFY — should return 0 rows
-- =========================================================================
SELECT id, name, tagline
FROM products
WHERE tagline LIKE '%KES%'
   OR description LIKE '%KES%'
   OR EXISTS (
     SELECT 1 FROM unnest(key_features) AS f WHERE f LIKE '%KES%'
   );
