## ADDED Requirements

### Requirement: Products table has structured fields
The `products` table SHALL have the following additional columns: `category`, `icon`, `tagline`, `min_amount`, `max_amount`, `rate_pct`, `term_label`, `key_features`, `target_segment`.

#### Scenario: Schema migration applied
- **WHEN** the `extend_products_schema.sql` migration is run
- **THEN** all 9 new columns SHALL exist on the `products` table with appropriate types

#### Scenario: Existing products backfilled
- **WHEN** the migration completes
- **THEN** all 20 existing products SHALL have non-null `category`, `icon`, `tagline`, and `key_features` values

### Requirement: Investment products are seeded
The catalog SHALL include at least 8 investment products that work across markets: Treasury Bills, Government Bonds, Money Market Fund, Equity Unit Trust, Eurobond, Green Bond, REIT, and Sukuk.

#### Scenario: Investment seed script run
- **WHEN** the `seed_investment_products.sql` script is run
- **THEN** the `products` table SHALL contain at least 8 rows with `category = 'investments'`

### Requirement: Products page groups by category
The products page at `/rm-workspace/products` SHALL group products by `category` and render each group under a labeled section header.

#### Scenario: Multiple categories present
- **WHEN** the page loads with products spanning multiple categories
- **THEN** the page SHALL render one section per category with a header showing category name, icon, and product count

#### Scenario: Uncategorized products exist
- **WHEN** any product has a null or unrecognized `category`
- **THEN** those products SHALL be rendered under an "Other" section at the bottom

### Requirement: Product cards display structured information
Each product card SHALL display the product icon, name, tagline, a key metrics row (showing rate, amount range, and term if applicable), and a list of up to 5 key features.

#### Scenario: Loan product card
- **WHEN** a card renders a loan product
- **THEN** the metrics row SHALL show APR, amount range, and term, and the features list SHALL display the product's `key_features`

#### Scenario: Card product without rate
- **WHEN** a card renders a credit card or insurance product
- **THEN** the metrics row SHALL omit the rate field and show only relevant metrics (e.g., annual fee, coverage limit)

### Requirement: Product card details are expandable
Each product card SHALL include a "Details" toggle that, when expanded, reveals the full `description` text.

#### Scenario: RM expands a card
- **WHEN** the RM clicks "Details" on a product card
- **THEN** the card SHALL expand inline to show the full description text

#### Scenario: RM collapses a card
- **WHEN** the RM clicks "Details" on an expanded card
- **THEN** the card SHALL collapse back to the compact view

### Requirement: Search filters across all categories
The existing search input SHALL filter products by name, tagline, and description across all category groups, hiding empty groups.

#### Scenario: Search matches products in one category
- **WHEN** the RM types a search term that matches products in only one category
- **THEN** only that category section SHALL be visible with matching products

#### Scenario: Search yields no results
- **WHEN** the search term matches no products
- **THEN** the page SHALL display a "No products match your search" message
