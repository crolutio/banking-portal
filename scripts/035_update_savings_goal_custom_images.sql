-- Point savings_goals.image_url at assets in /public (optional DB sync; UI also remaps legacy paths).
-- Adjust WHERE clauses to match your actual goal names if they differ.

UPDATE savings_goals SET image_url = '/japan.jpg'
WHERE LOWER(name) LIKE '%japan%' OR LOWER(name) LIKE '%maldives%' OR image_url = '/maldives-beach-resort-tropical-paradise.jpg';

UPDATE savings_goals SET image_url = '/macbook-pro.jpg'
WHERE LOWER(name) LIKE '%macbook%' OR image_url = '/macbook-pro-laptop-sleek-modern.jpg';

UPDATE savings_goals SET image_url = '/emergency.webp'
WHERE LOWER(name) LIKE '%emergency%' OR image_url = '/safety-umbrella-protection-financial-security.jpg';

UPDATE savings_goals SET image_url = '/wedding.jpg'
WHERE LOWER(name) LIKE '%wedding%' OR image_url = '/wedding-celebration-rings-romantic.jpg';
