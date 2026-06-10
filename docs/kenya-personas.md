# Kenya RM Portfolio — Persona Playbook

> Presenter reference for the **Relationship Manager (Kenya)** demo. RM is
> **Peter Mwangi** (`11ce0003-…-0003`); all 17 clients below are assigned to him.
> Each entry has the **story**, the **signals in the data**, the **flight-risk
> level**, and the **talking point** — so you can speak to whichever client the
> audience clicks.
>
> Data lives across both DBs (see [banking](banking_db_reference.md) /
> [call-center](callcenter_db_reference.md) references). Seeded by
> `scripts/seed_kenya_rm_clients_*` + `scripts/seed_kenya_personas_*`.

## How the churn score is derived
The Retention radar scores each client 0–100 from real signals: **At-Risk segment** (+35),
**churn-keyword transactions** like external-bank transfers (+30 each), **churn-keyword
tickets** (+20), **negative call-center threads** (+25), **delinquent loans** (+15),
**low balance** (+10). Bands: **≥70 High flight risk**, **40–69 Watch**, **<40 Stable**.

## At-a-glance

| # | Client | Category | Flight risk | One-line hook |
|---|--------|----------|-------------|---------------|
| 01 | Wanjiru Kamau | HNW (Premium) | Stable | Diaspora-savvy professional; fraud-alert + M-Pesa history |
| 02 | Otieno Ouma | SME (Premium) | Watch | Business owner; cheque-clearing friction, tender sub-account |
| 04 | **Joseph Karanja** | **SME** | Watch | 🦸 Hardware business; working-capital squeeze → overdraft |
| 05 | **Aisha Mohamed** | **HNW** | Watch | 🦸 KES 14M idle; eyeing a competitor's wealth returns |
| 06 | **David Kimani** | Retail | **HIGH** | 🦸 **Churn headline** — moving funds to Equity, closing account |
| 07 | **Grace Achieng** | HNW (Premium) | Stable | 🦸 UK diaspora remittances → diaspora savings plan |
| 08 | Mary Wanjiku | Retail | Stable | KQ cabin crew saving for a UK Master's; travel card |
| 09 | Samuel Kiprop | Retail | Stable | Young engineer, KYC pending; first-time investor |
| 10 | **Faith Chebet** | Retail | **HIGH** | Lost her job; loan repayment bouncing → hardship/restructure |
| 11 | Daniel Mwangi | HNW (Premium) | Stable | Disciplined saver; mortgage + invest idle cash |
| 12 | Esther Nyambura | **SME** | Stable | "Mama Esther Groceries"; financing a 2nd shop |
| 13 | Peter Omondi | Retail | Stable | Journalist, irregular income; card declined abroad → card |
| 14 | Lucy Wairimu | HNW (Premium) | Stable | Lifestyle spender; branch waits → priority banking upsell |
| 15 | John Maina | Retail | Stable (Dormant) | Salary-passthrough only; reactivation target |
| 16 | Cynthia Adhiambo | **SME** | Stable | Adhiambo Logistics; asset finance for 2 trucks |
| 17 | Brian Mutua | Retail | Stable | Young professional building toward a car loan |
| 18 | **Catherine Njoki** | Retail | **HIGH** | Uber driver; fee-sensitive, threatening to leave |

> Filter coverage — **SME:** 02, 04, 12, 16 · **HNW/VIP-Premium:** 01, 05, 07, 11, 14 · **At-Risk/Churn:** 06, 10, 18 (+ Faith hardship) · **Dormant:** 15.

---

## The 4 hero stories (full data + call-center threads)

### 06 · David Kimani — the churn headline 🔴
- **Story:** Nine-year customer, salaried, has a mortgage with the bank. Quietly defecting to Equity.
- **Signals:** KES 1.5M transfer to Equity + savings swept out + a standing order redirecting his salary (no May salary credit); **mortgage now delinquent**; an **open account-closure ticket**; a **negative, escalated call** — *"Unless someone senior calls me, I'm closing the account by month-end."*
- **Talking point:** "Before he's said a word to his RM, the system has connected the dots across his transactions, his loan, his ticket, and his call — and put him at the top of the queue. This is the save the bank would otherwise miss."

### 04 · Joseph Karanja — SME working capital 🟣
- **Story:** Owns Karanja Hardware. Healthy turnover but a cash-flow gap between paying suppliers and customers paying him.
- **Signals:** Business account + active business loan; large Bamburi Cement supplier outflow ahead of receivables; overdraft enquiry ticket; positive chat about invoice financing.
- **Talking point:** "Set the week's focus to *SME Growth* and Joseph rises — the system spots the working-capital gap and teees up an overdraft."

### 05 · Aisha Mohamed — HNW idle cash 🟡
- **Story:** VIP. KES 14M+ across savings and a USD wallet, mostly idle. Being courted by a competitor's private bank.
- **Signals:** Large dividend + rental inflows, minimal spend; ticket + chat asking for better returns, name-checking a competitor.
- **Talking point:** "A retention *and* revenue play — move idle cash into managed products before the competitor does."

### 07 · Grace Achieng — diaspora 🟢
- **Story:** Earns in the UK, sends money home monthly; it sits idle in her current account.
- **Signals:** Recurring Wise remittances into a USD wallet; positive WhatsApp thread asking how to grow it.
- **Talking point:** "Proactive opportunity — a diaspora savings plan with preferential FX."

---

## Secondary stories (now fully enriched)

### 10 · Faith Chebet — hardship / retention 🔴
Laid off last month; **no May salary**, **personal-loan repayment bounced (NSF)**, leaning on family transfers. Open **restructure** ticket; **negative escalated call** worried about CRB listing and hinting she may move banks. *Save play: hardship restructure before it becomes a default and a defection.*

### 18 · Catherine Njoki — fee-driven churn 🔴
Uber driver, volatile weekly payouts, thin balance. The flat monthly maintenance fee galls her; open **fee-complaint ticket** + **negative call** — *"a friend has a no-fee account; if you can't match it I'll move."* *Save play: switch her to a lighter-fee product, reverse the fee as goodwill.* (A milder, different churn cause than David — good contrast.)

### 11 · Daniel Mwangi — mortgage + wealth 🟢
Deloitte manager, disciplined: KES 200k/month into a Goal Saver (now 3.4M idle). Hunting a Karen townhouse (~KES 22M). Ticket + positive chat for **mortgage pre-qual** and putting idle cash to work. *Double opportunity.*

### 12 · Esther Nyambura — SME expansion 🟣
"Mama Esther Groceries." Daily M-Pesa till settlements, paying wholesalers and shop rent. Wants a **second branch**. *Expansion loan / merchant overdraft, underwritten on till cash-flow.*

### 16 · Cynthia Adhiambo — SME asset finance 🟣
Adhiambo Logistics. Fleet fuel, driver payroll, truck repairs; won a new haulage contract and needs **two more trucks**. Already has a business loan. *Asset finance secured on the trucks + contract.*

### 14 · Lucy Wairimu — HNW service + upsell 🟡
EABL marketing manager; lifestyle spend, big savings goal. Frustrated by **40-minute branch waits**; open ticket + call asking for a dedicated contact. *Priority-banking upsell + wealth desk for idle cash.*

### 08 · Mary Wanjiku — travel + education 🟢
KQ cabin crew; constant overseas spend, card occasionally declines abroad; standing order into a "Masters fund." *Travel/multi-currency card + education savings plan.*

### 13 · Peter Omondi — irregular income + card 🟢
Nation Media journalist; lumpy freelance income, **card declined in Kampala** on assignment. *Travel-friendly credit card + income-smoothing.*

### 09 · Samuel Kiprop — onboarding + first invest 🟢
Young Safaricom engineer, **KYC pending**. Wants to finish verification and start a small money-market investment. *Complete onboarding, then a starter MMF.*

### 17 · Brian Mutua — first car loan 🟢
Young professional building a car deposit; asking about **auto-loan eligibility**. *Auto loan + start the credit relationship.*

### 15 · John Maina — dormant / reactivation ⚪
County clerk. Account is a pure pass-through — salary lands, gets withdrawn at the ATM, nothing else. Last real engagement was a **2025 balance query**, then silence. *The deliberate "dormant" example — set focus to **Dormant Reactivation** and John surfaces. Reactivation play: payroll-backed loan or auto-save nudge.*

---

## The two originals (already seeded, kept as-is)

### 01 · Wanjiru Kamau — Premium / HNW 🟢
Diaspora-savvy professional (Karen apartment goal, USD wallet, NSE holdings). Rich history: a **fraud-alert** voice escalation (Mombasa login), an M-Pesa top-up delay (resolved warmly), a Naivas daily-limit chat. Stable, well-served — the "happy power user."

### 02 · Otieno Ouma — Premium / SME 🟡
Business owner. Threads on a **business card decline at Shell Mlolongo**, **cheque clearing delays** (open, negative), and a request for a **sub-account for KEMSA tender funds**. SME cash-management opportunity + a service-friction watch item.

---

## Focus expansion clients (19–28)
> Added by `scripts/seed_kenya_focus_expansion_*` so every Focus setting surfaces
> a clearly different, varied set — with distinct stories *within* each bucket.

**Dormant Reactivation (now 5: 15 + these four — each dormant for a different reason)**
- **19 · Ann Wambui** — opened the account for one purpose (a wedding fund), completed it in 2024, now idle at a minimum balance. *Reactivation: auto-save goal / payroll switch.*
- **20 · Kevin Ochieng** — graduated; the old student account went quiet once his salary started landing elsewhere. *Reactivation: graduate/young-pro bundle + salary switch.*
- **21 · Margaret Njeri** — moved her day-to-day banking to a mobile-only fintech, keeps this account barely funded "just in case." *Reactivation: win-back, fee waiver, app push.*
- **22 · Stephen Kariuki** — tea farmer; account lights up only at the KTDA bonus/harvest season and sleeps the rest of the year. *Reactivation: flexible seasonal savings + agri-loan.*

**SME Growth (now 6 — distinct sectors)**
- **23 · Lillian Wairimu** — "Glow Salon & Spa," two branches, opening a third in a mall; busy daily till. *Fit-out loan + POS terminals across branches.*
- **24 · Patrick Omondi** — avocado/macadamia exporter to the EU; lumpy euro inflows 60 days out. *Trade finance / LPO discounting + euro FX hedging.*

**HNW Retention (now 7 — distinct wealth sources)**
- **25 · Dr. Susan Mwende** — consultant surgeon; high steady income, large idle current-account balance. *Wealth management + offshore diversification.*
- **26 · James Githinji** — just sold his stake in a company; a large liquidity event is parked in his current account. *Investment placement + estate/trust planning.*

**Churn Defence (now 5 — distinct churn causes, contrasting David's competitor-bank defection)**
- **27 · Mercy Akinyi** 🔴 — **digital-experience churn**. Tech-savvy young pro; the app keeps failing transfers and the M-Pesa link is broken — she's openly comparing a neobank and about to move her salary.
- **28 · Robert Mwangi** 🔴 — **service-reliability churn**. A double-charge dispute has dragged on three weeks; trust is gone and he's threatening to close and move his accounts.

---

## Demo chaining cheat-sheet
- **Focus → Churn Defence** → David #1; **David / Catherine / Faith / Mercy / Robert** top the Retention radar — five *different* churn reasons (competitor bank, fees, hardship, broken app, unresolved dispute).
- **Focus → SME Growth** → **Joseph / Esther / Cynthia / Lillian / Patrick / Otieno** rise — hardware, groceries, logistics, salon chain, EU exporter, tender financing.
- **Focus → HNW Retention** → **Aisha / Daniel / Lucy / Susan / James / Grace / Wanjiru** rise — idle millions, mortgage+invest, lifestyle service, surgeon, business-sale liquidity, diaspora.
- **Focus → Dormant Reactivation** → **John / Ann / Kevin / Margaret / Stephen** surface — five distinct dormancy stories.
- **Clients tab → filter SME / High Net Worth / At Risk** → covers feedback #1 (200–500 book, find anyone fast).
- The morning briefing **re-generates when you switch focus**, so the spoken narrative always matches the re-ranked set — making it obvious the setting is working.
