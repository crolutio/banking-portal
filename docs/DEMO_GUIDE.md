# Demo Guide - Banking Portal Value-Added Features

This guide provides step-by-step instructions for demonstrating the new AI-powered features.

## 🎬 Quick Start

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to** http://localhost:3000

3. **Log in** as Sarah Chen (primary demo user)

---

## 🌍 Multi-Market Demo Mode (UAE / Kenya)

The portal can demo two fully-populated markets in parallel:

| Market    | Currency | Locale | Default? |
| --------- | -------- | ------ | -------- |
| `default` | AED      | en-AE  | Yes      |
| `kenya`   | KES      | en-KE  | No       |

### Where the switcher lives

- **Header → top-right**, between the notification bell and the theme toggle.
- It's a quiet Globe icon with a small country-flag overlay — visually subtle on purpose so it doesn't distract a customer-side demo. Hover tooltip reads *"Switch market"*.
- **Visible only to RM / Risk & Compliance / Admin roles.** Customer-side demos (Sarah Chen, etc.) intentionally don't see the switcher so the live experience stays clean.

### Persistence

- The active market is saved to `localStorage` under the key `banking-agent-active-market`.
- First load on a fresh browser → defaults to `default` (UAE).
- Once you switch to Kenya, the choice persists across reloads and across role switches until you flip it back.
- To reset: open DevTools → Application → Local Storage → clear `banking-agent-active-market`, or just click the switcher and pick `Default (UAE)` again.

### How role switching interacts with markets

Roles are resolved per `(market, role)`. Switching market re-resolves who you are:

| Role                 | UAE persona          | Kenya persona     |
| -------------------- | -------------------- | ----------------- |
| Customer (retail)    | Sarah Chen           | Wanjiru Kamau     |
| Customer (business)  | Mohammed Ali         | Otieno Ouma       |
| Relationship Manager | James Rodriguez      | Peter Mwangi      |
| Risk & Compliance    | David Kim            | Grace Wanjiku     |
| Admin                | System Administrator | Njeri Otieno      |

Data follows the persona — accounts, transactions, loans, support tickets, call-center conversations, the product catalog, and every AI surface (Briefing, Copilot, Portfolio Pulse, Draft Outreach, customer chat) all switch context automatically.

### Seeding Kenya data on a fresh Supabase project

Run these scripts **in order**. They are idempotent (`ON CONFLICT DO NOTHING` upserts), so re-running is safe.

**Banking DB:**

1. `scripts/add_market_column_banking.sql` — adds the `market` column + indexes to the core banking tables; back-fills existing rows with `'default'`.
2. `scripts/patch_market_column_customers.sql` — patch for the separate `customers` table that lives in the production schema (not in local migrations).
3. `scripts/add_market_column_extras.sql` — adds `market` to `savings_goals`, `portfolio_holdings`, `watchlist`, `risk_profiles`, `reward_profiles`, `reward_activities`, `reward_redemptions`, `reward_catalog`, **plus** a `currency` column on `portfolio_holdings` so NSE KES holdings can coexist with the legacy USD portfolio.
4. `scripts/seed_kenya_customers_table.sql` — seeds the 2 Kenyan retail customers into `customers` (FK target for accounts).
5. `scripts/seed_kenya_profiles.sql` — 5 Kenyan profiles (Wanjiru, Otieno, Peter, Grace, Njeri).
6. `scripts/seed_kenya_accounts_cards.sql` — 6 accounts, 4 cards.
7. `scripts/seed_kenya_loans.sql` — 6 loans, mix of consumer + SME.
8. `scripts/seed_kenya_transactions.sql` — 96 transactions across KES + USD diaspora wallet + SME accounts.
9. `scripts/seed_kenya_support.sql` — 4 tickets, 16 messages.
10. `scripts/seed_kenya_products.sql` — 20 Kenya-flavoured products.
11. `scripts/seed_kenya_savings_goals.sql` — 6 goals (Karen apartment deposit, emergency fund, Strathmore MBA, Mara/Diani trip for Wanjiru; SME working capital + Mombasa branch fit-out for Otieno) + 13 deposit history rows.
12. `scripts/seed_kenya_investments.sql` — 9 NSE/T-bill/MMF holdings (Safaricom, Equity, KCB, EABL, COOP + CIC MMF for Wanjiru; GoK T-Bills + Sanlam MMF for Otieno) + 2 watchlist symbols + 2 risk profiles.
13. `scripts/seed_kenya_rewards.sql` — 2 reward profiles (Wanjiru Gold, Otieno Platinum) + 25 reward activities (earn + redeem) + 8 Kenya-relevant catalog items (KQ Asante miles, Java House vouchers, Naivas vouchers, Mara day trip, etc.).

**Call center DB:**

14. `scripts/add_market_column_callcenter.sql` — column + index on `customers`, `conversations`, `messages`.
15. `scripts/seed_kenya_callcenter_customers.sql` — 2 customers, same UUIDs as the banking-side profiles.
16. `scripts/seed_kenya_callcenter_conversations.sql` — 6 conversations.
17. `scripts/seed_kenya_callcenter_messages.sql` — 22 messages.

If step 15 is skipped before step 16, you'll see `FK constraint "conversations_customer_id_fkey"` — run step 15 first.

### Reverting / cleaning up

To delete only Kenya data without touching UAE (handy on a shared demo project):

```sql
-- Banking DB
DELETE FROM savings_goal_transactions WHERE market = 'kenya';
DELETE FROM savings_goals             WHERE market = 'kenya';
DELETE FROM reward_redemptions        WHERE market = 'kenya';
DELETE FROM reward_activities         WHERE market = 'kenya';
DELETE FROM reward_profiles           WHERE market = 'kenya';
DELETE FROM reward_catalog            WHERE market = 'kenya';
DELETE FROM portfolio_holdings        WHERE market = 'kenya';
DELETE FROM watchlist                 WHERE customer_id IN (SELECT id FROM profiles WHERE market = 'kenya');
DELETE FROM risk_profiles             WHERE market = 'kenya';
DELETE FROM transactions              WHERE market = 'kenya';
DELETE FROM support_messages          WHERE ticket_id IN (SELECT id FROM support_tickets WHERE market = 'kenya');
DELETE FROM support_tickets           WHERE market = 'kenya';
DELETE FROM loans                     WHERE market = 'kenya';
DELETE FROM cards                     WHERE market = 'kenya';
DELETE FROM accounts                  WHERE market = 'kenya';
DELETE FROM profiles                  WHERE market = 'kenya';
DELETE FROM customers                 WHERE market = 'kenya';
DELETE FROM products                  WHERE market = 'kenya';

-- Call center DB
DELETE FROM messages       WHERE conversation_id IN (SELECT id FROM conversations WHERE market = 'kenya');
DELETE FROM conversations  WHERE market = 'kenya';
DELETE FROM customers      WHERE market = 'kenya';
```

### Suggested demo flow (Kenya)

1. Open the portal in the RM role → confirm UAE list of clients renders (baseline).
2. Click the Globe switcher → pick **🇰🇪 Kenya**.
3. Page reloads itself — RM is now Peter Mwangi, the client list shows Wanjiru + Otieno, AUM tile shows KES.
4. Click Wanjiru → 360 page shows KES balances, KES transactions (Naivas, KPLC, M-Pesa, KRA), and the AI Briefing references KES amounts and Kenyan rails.
5. Fire any Copilot starter prompt — response talks Kenyan (M-Pesa, PesaLink, KRA, NSSF, etc.).
6. Click *Draft Outreach* → message body references KES + Kenyan locale.
7. Flip back to **🇦🇪 Default** in the switcher to return to the UAE narrative.

---

## 🎙️ Demo 0: Voice Assistant (Retell)

**Scenario**: Show the voice assistant continuing from text history.

### Steps:
1. **Open the floating chat bubble** and send 2-3 text messages.
2. **Click the microphone** to start voice mode.

### Expected Result:
- If there is **no prior chat**, the voice assistant starts with a standard greeting.
- If there **is** prior chat, the voice assistant continues using the conversation history.

**Notes**:
- Voice mode currently lives in the **floating chat bubble**.
- The context tool uses `/api/retell/context` and returns both `conversation_context` and `supabase_context`.

## 🎯 Demo 1: "The Strategist" - Loan Alternative with Savings

**Scenario**: User wants a loan for travel, but AI finds savings instead.

### Steps:

1. **Navigate** to any page (Home, Loans, or Accounts work best)

2. **Click** the demo help icon (?) next to "Bank of the Future" title

3. **Select** "Loans Page Demos" or manually type:
   ```
   I want to take a loan for my Japan trip
   ```

4. **Click** "Try Now" or send the message

### Expected Result:

✅ **AI Response Should Include**:
- Enthusiastic message about finding money without needing a loan
- Purple gradient **OptimizationResultCard** displaying:
  - Total monthly savings (e.g., AED 130/month)
  - Total annual savings (e.g., AED 1,560/year)
  - List of opportunities:
    - 🎵 Duplicate Music Streaming (Spotify + Apple Music)
    - 📱 Negotiable Telecom Bills
    - ⚡ Electricity & Water Optimization
    - 🍔 Reduce Food Delivery Orders
  - Action steps for each opportunity
  - Priority badges (High/Medium/Low)

### Key Talking Points:
- "The AI detected the user wanted a loan for travel"
- "Instead of offering a loan, it analyzed spending patterns"
- "Found real savings opportunities from actual transactions"
- "User can fund their trip without taking on debt"
- "This is 'The Strategist' mode - finding smart alternatives"

---

## 💰 Demo 2: Loan Pre-Approval with DTI Analysis

**Scenario**: User requests a loan and gets instant eligibility assessment.

### Steps:

1. **Navigate** to the Loans page (/loans)

2. **Open chat** and type:
   ```
   Request a new loan for 50,000 AED
   ```
   
   Or try variations:
   - "I want to apply for a personal loan"
   - "Can I get a loan for 75,000 AED?"

3. **Send** the message

### Expected Result:

✅ **AI Response Should Include**:
- Professional explanation of eligibility
- Green/Orange gradient **LoanApprovalCard** displaying:
  - Approval status badge (Pre-Approved or Conditional)
  - Loan details (Amount, Term, Monthly Payment, Interest Rate)
  - **Color-coded DTI Ratio** progress bar:
    - Green: <35% (Excellent)
    - Yellow: 35-42% (Good)
    - Orange: 42-50% (Fair)
  - **Strengths** section (green checkmarks):
    - "Excellent debt-to-income ratio"
    - "Good credit score"
    - "Strong cash reserves"
    - "Regular income detected"
  - **Concerns** section (orange warnings):
    - "DTI approaching upper limit"
    - "Multiple existing loans"
  - **Conditions & Requirements**:
    - Document submission requirements
    - Credit bureau check needed
  - Total interest over loan term
  - Action buttons (Apply Now, Simulate Payment)

### Key Talking Points:
- "Real-time calculation based on actual financial data"
- "DTI ratio calculated from current income and debts"
- "Interest rate determined by credit score (4.99% - 9.99%)"
- "Shows maximum recommended loan amount if different from requested"
- "Transparent decision-making with specific reasons"
- "Banking policy compliant (max 50% DTI)"

---

## 🌍 Demo 3: "The Concierge" - Travel Financial Advice

**Scenario**: User mentions travel plans, AI provides financial travel tips.

### Steps:

1. **Navigate** to the Cards page (/cards)

2. **Open chat** and type:
   ```
   I'm traveling to London next week
   ```
   
   Or try:
   - "I'm going to Dubai next month"
   - "Planning a trip to Paris"

3. **Send** the message

### Expected Result:

✅ **AI Response Should Include**:
- Friendly, proactive travel advice
- Card recommendations for foreign transactions
- Advice on enabling travel notifications
- Currency exchange tips
- Expense tracking reminders
- Low/no foreign transaction fee cards
- Travel insurance suggestions

### Key Talking Points:
- "AI acts as a personal travel concierge"
- "Provides financial advice specific to destination"
- "Recommends best cards to minimize fees"
- "Proactive risk management (fraud alerts)"
- "Contextually aware of user's financial products"

---

## 📊 Demo 4: Spending Analysis & Optimization

**Scenario**: User wants to understand and optimize their spending.

### Steps:

1. **Navigate** to the Accounts page (/accounts)

2. **Open chat** and type:
   ```
   Analyze my spending and find savings opportunities
   ```
   
   Or:
   - "Where can I save money?"
   - "Optimize my monthly expenses"

3. **Send** the message

### Expected Result:

✅ **AI Response Should Include**:
- Analytical breakdown of spending patterns
- **OptimizationResultCard** with:
  - Multiple savings opportunities
  - Category-specific recommendations
  - Before/after spending comparisons
  - Actionable steps for each opportunity
  - Annual impact calculations

### Key Talking Points:
- "Comprehensive spending analysis"
- "Identifies wasteful spending patterns"
- "Finds duplicate subscriptions automatically"
- "Suggests negotiable service optimizations"
- "Calculates concrete savings potential"

---

## 🎨 Demo 5: Interactive Demo Help System

**Scenario**: Show how users can discover features through contextual help.

### Steps:

1. **Click** the help icon (?) next to "Bank of the Future" title

2. **Show different pages** to demonstrate context-aware tips:
   - Home page: General account queries
   - Loans page: Loan-specific demos
   - Cards page: Card recommendations
   - Investments page: Portfolio analysis

3. **Demonstrate interactions**:
   - Click **"Copy"** button → Copies prompt to clipboard
   - Click **"Try Now"** → Opens chat with pre-filled message
   - Show **agent-specific routing** (some prompts open specific agents)

### Key Talking Points:
- "Context-aware help system"
- "Page-specific demo suggestions"
- "One-click access to powerful features"
- "Lowers barrier to AI feature discovery"
- "Educates users on capabilities"

---

## 🔍 Demo 6: Agent System Integration

**Scenario**: Show how new features work with existing agents.

### Steps:

1. **Navigate** to AI Banker page (/ai-banker)

2. **Try different agents**:
   - **Loan Advisor**: "Should I consolidate my loans?"
   - **Spending Analyst**: "Show me my subscription payments"
   - **Investmentor**: "Analyze my portfolio risk"
   - **Savings Coach**: "Help me reach my emergency fund goal"

3. **Show that scenarios enhance agents**:
   - With Loan Advisor: Try "Request a 40,000 AED loan" → Gets pre-approval card
   - With Spending Analyst: Try "Find ways to save money" → Gets optimization card

### Key Talking Points:
- "Scenario detection enhances, doesn't replace agents"
- "Each agent has specialized knowledge"
- "Pre-calculated data helps agents give better advice"
- "Seamless integration with existing architecture"

---

## 📱 Demo 7: Mobile & Responsive Experience

### Steps:

1. **Open browser DevTools** (F12)

2. **Toggle device toolbar** (Ctrl+Shift+M / Cmd+Shift+M)

3. **Select mobile device** (iPhone, Android)

4. **Demonstrate**:
   - Demo help popover adapts to mobile
   - Special cards are responsive
   - Chat interface works on small screens
   - All features accessible on mobile

### Key Talking Points:
- "Fully responsive design"
- "Mobile-first approach"
- "Touch-optimized interactions"
- "Same powerful features on any device"

---

## 🎯 Demo Flow Combinations

### Recommended Demo Sequence (10 minutes):

1. **Start**: "Let me show you our AI-powered banking features"

2. **The Strategist** (2 min):
   - Show loan request detection
   - Highlight savings opportunities
   - Emphasize debt-free alternative

3. **Loan Pre-Approval** (2 min):
   - Show real-time eligibility
   - Explain DTI calculation
   - Highlight transparent decision-making

4. **Demo Help** (1 min):
   - Show context-aware help
   - Demonstrate one-click feature access

5. **Existing Features** (2 min):
   - Show transactions still work
   - Demonstrate charts
   - Verify all pages accessible

6. **Q&A** (3 min)

### Alternative: Technical Deep-Dive (15 minutes):

1. **Architecture** (3 min):
   - Explain scenario detection flow
   - Show API pre-processing
   - Demonstrate markdown parsing

2. **Calculations** (4 min):
   - Show DTI formula
   - Explain interest rate tiers
   - Demonstrate savings detection logic

3. **UI Components** (3 min):
   - Inspect special card code
   - Show responsive design
   - Demonstrate accessibility features

4. **Integration** (3 min):
   - Show how it preserves existing features
   - Explain additive architecture
   - Discuss rollback strategy

5. **Q&A** (2 min)

---

## 🐛 Troubleshooting

### Issue: Special cards not rendering

**Check**:
1. Open browser console (F12)
2. Look for parsing errors
3. Verify markdown block format in AI response
4. Check that JSON is valid

**Solution**: Markdown blocks must be exact:
```
```loan-approval
{valid JSON here}
```
```

### Issue: Scenario not detected

**Check**:
1. Message must contain trigger keywords
2. Check console for scenario detection logs

**Add Debug Logging**:
```typescript
// In app/api/chat/route.ts
console.log('[Scenario]', scenario.type, scenario.confidence)
```

### Issue: Calculations seem wrong

**Verify**:
1. User has transaction data
2. Accounts have balances
3. Loans exist in database

**Test with Sarah Chen**:
- User ID: `4e140685-8f38-49ff-aae0-d6109c46873d`
- Has rich transaction history
- Has existing loans
- Good test data

---

## 📊 Success Metrics

During demos, track:
- ✅ Scenario detection accuracy
- ✅ Card rendering success rate
- ✅ User engagement with demo help
- ✅ Time to discover features
- ✅ Positive reactions to "Strategist" mode
- ✅ Understanding of DTI calculations

---

## 🎤 Demo Script Template

### Opening (30 seconds):
> "Today I'll show you how our AI doesn't just answer questions—it actively finds opportunities to help customers make better financial decisions. Watch what happens when someone asks for a loan..."

### The Strategist Demo (90 seconds):
> "Instead of immediately offering a loan, our AI analyzes their spending and says 'Wait—you don't need a loan. I found the money!' It identifies duplicate subscriptions, negotiable bills, and wasteful spending. In this case, AED 1,560 per year in savings—enough to fund the trip without debt."

### Pre-Approval Demo (90 seconds):
> "When someone does need a loan, they get instant eligibility. Real-time calculation of debt-to-income ratio, personalized interest rates based on credit score, and transparent explanations of approval decisions. All compliant with banking regulations."

### Closing (30 seconds):
> "These features enhance our existing agent system without replacing it. They work seamlessly with all current functionality. And with our context-aware demo help, users can discover these powerful features right when they need them."

---

## 📞 Support

For demo support or questions:
- Check `FEATURES_ADDED.md` for feature details
- Check `INTEGRATION_NOTES.md` for technical details
- Review code comments in implementation files

---

**Happy Demoing! 🚀**

