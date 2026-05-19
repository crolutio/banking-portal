## ADDED Requirements

### Requirement: Products page exists in RM workspace
The system SHALL provide a page at `/rm-workspace/products` that displays all products from the `products` table in the banking DB.

#### Scenario: RM navigates to products page
- **WHEN** the RM navigates to `/rm-workspace/products`
- **THEN** the page SHALL display all products with their name and full description

#### Scenario: No products in database
- **WHEN** the products table is empty
- **THEN** the page SHALL display a message indicating no products are available

### Requirement: Products page is accessible from RM sidebar
The RM sidebar navigation SHALL include a "Products" link that navigates to `/rm-workspace/products`.

#### Scenario: RM views sidebar
- **WHEN** the user role is `relationship_manager`
- **THEN** the sidebar SHALL show a "Products" item linking to `/rm-workspace/products`

#### Scenario: Non-RM user
- **WHEN** the user role is not `relationship_manager`
- **THEN** the sidebar SHALL NOT show the "Products" item (RM sidebar is only shown to RMs)

### Requirement: Products displayed as browsable cards
Each product SHALL be rendered as a card showing the product name as the title and the full description as the body. Products SHALL be displayed in a responsive grid layout.

#### Scenario: Viewing on desktop
- **WHEN** the RM views the products page on a wide screen
- **THEN** products SHALL be displayed in a multi-column grid

#### Scenario: Viewing on mobile
- **WHEN** the RM views the products page on a narrow screen
- **THEN** products SHALL stack into a single column
