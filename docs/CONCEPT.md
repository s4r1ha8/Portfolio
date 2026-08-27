# Sarthak Portfolio — "Don't Browse My Portfolio. Query It."

## 1. Core Concept

The portfolio is presented as if the visitor is interacting with a database/system containing information about Sarthak.

It should **not** look like a black hacker terminal.

Think **Apple-level clean UI + modern dashboard + SQL-inspired interaction**.

The key idea is:

> **Your portfolio is presented as if the visitor is interacting with a database/system containing information about you.**

The portfolio should feel like a **beautiful website whose main interaction is through queries**, not like a literal command-line terminal.

The experience should be clean, modern, visual, technical, and recruiter-friendly.

---

# 2. Imagine Opening the Website

The screen loads.

You see something minimal like this:

```text
┌─────────────────────────────────────────────────────────────┐
│  ● SYSTEM ONLINE                         SARTHAK.DEV         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   SARTHAK PATIL                                             │
│   Software Engineer • Systems • Databases                   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  Ask anything about me...                           │   │
│   │  SELECT * FROM portfolio WHERE ...                  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Quick Queries                                             │
│                                                             │
│   [ Who is Sarthak? ]                                      │
│   [ Show Projects ]                                        │
│   [ Technical Skills ]                                     │
│   [ Experience ]                                           │
│   [ Contact ]                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The important thing:

👉 It is **not actually a terminal**.  
👉 It is a **beautiful website**, but the main interaction is through queries.

---

# 3. Visitor Wants to See Projects

They click:

```text
[ Show Projects ]
```

The query input automatically types:

```sql
SELECT * FROM projects;
```

Then there is a nice animation.

The website displays the results:

```text
QUERY RESULT
3 PROJECTS FOUND
```

And below, beautiful project cards appear:

```text
┌───────────────────────┐
│  01                   │
│                       │
│  MINI-SQLITE          │
│                       │
│  Relational database  │
│  engine in C++17      │
│                       │
│  [ VIEW SYSTEM → ]    │
└───────────────────────┘

┌───────────────────────┐
│  02                   │
│                       │
│  DRIFTFUSION-TINYML   │
│                       │
│  Adaptive cognitive   │
│  state analysis       │
│                       │
│  [ VIEW SYSTEM → ]    │
└───────────────────────┘
```

So SQL is just the **theme of the portfolio's navigation**.

---

# 4. Now imagine Opening Mini-SQLite

The user clicks:

```text
[ VIEW SYSTEM → ]
```

Instead of opening a boring project page like:

> Mini-SQLite  
> Description...  
> Technologies...  
> GitHub...

The screen transforms into an **interactive system diagram**.

```text
                  MINI-SQLITE ENGINE

                        ┌───────────┐
                        │   SQL     │
                        │   QUERY   │
                        └─────┬─────┘
                              │
                              ▼
                        ┌───────────┐
                        │  PARSER   │
                        └─────┬─────┘
                              │
                              ▼
                        ┌───────────┐
                        │ EXECUTION │
                        │  ENGINE   │
                        └─────┬─────┘
                              │
                              ▼
                        ┌───────────┐
                        │  STORAGE  │
                        │  MANAGER  │
                        └───────────┘
```

Each box is clickable.

The recruiter clicks:

```text
[PARSER]
```

The panel expands:

```text
PARSER
────────────────────────

STATUS: IMPLEMENTED

RESPONSIBILITY:
Converts SQL queries into an
internal representation.

INPUT:
SELECT * FROM users;

OUTPUT:
Parsed query structure

TECH:
C++17
```

Then they can click another component.

So they are **exploring the project like they are exploring an actual system**.

---

# 5. The Homepage Itself as a Database

At the top you always have a search/query bar:

```text
┌──────────────────────────────────────────┐
│ > Query Sarthak's portfolio...           │
└──────────────────────────────────────────┘
```

A recruiter can type:

```sql
SELECT * FROM skills;
```

The page beautifully changes to:

```text
SKILL QUERY RESULT
──────────────────────────────────────

LANGUAGES

[C++]   [C]   [Python]   [SQL]

SYSTEMS

[DBMS]   [Operating Systems]

CLOUD

[AWS]

HARDWARE

[VLSI]   [TinyML]
```

Or:

```sql
SELECT * FROM experience;
```

Result:

```text
EXPERIENCE TABLE

┌───────────────┬──────────────────────────┐
│ ROLE          │ SOFTWARE ENGINEER        │
│ INTERESTS     │ DATABASES, SYSTEMS       │
│ FOCUS         │ LOW-LEVEL ENGINEERING    │
└───────────────┴──────────────────────────┘
```

---

# 6. What If Recruiters Don't Know SQL?

This is important.

**You don't force them to type SQL.**

Below the query bar, you always have normal buttons:

```text
EXPLORE

[ ABOUT ] [ PROJECTS ] [ SKILLS ] [ RESUME ]
```

Clicking the buttons simply triggers the corresponding query behind the scenes.

For example:

### They click:

```text
[ PROJECTS ]
```

Your website animates:

```sql
> SELECT * FROM projects;
```

And then shows the projects.

So:

- Recruiters who want normal navigation → use buttons
- Technical people → can manually type queries
- Curious visitors → can play around

---

# 7. The Really Cool Part — Meaningful Queries

You can support actual meaningful queries.

For example, a recruiter types:

```sql
SELECT name
FROM projects
WHERE technology = 'C++';
```

Your website responds:

```text
QUERY RESULT

1 RESULT FOUND

MINI-SQLITE
Database engine written in C++17

[ EXPLORE → ]
```

Or:

```sql
SELECT * FROM projects
WHERE domain = 'VLSI';
```

It shows:

```text
9T TCAM
VLSI Design Project
```

---

# 8. What Makes This Different From Just a SQL Terminal?

A normal terminal portfolio looks like:

```text
$ projects
> Mini-SQLite
> Portfolio
> Contact
```

That concept has been done many times.

Your idea would look more like this:

```text
╔══════════════════════════════════════════════════════════╗
║ S A R T H A K   P A T I L                               ║
║ ENGINEERING PORTFOLIO SYSTEM                             ║
║                                                          ║
║ Explore through structured queries.                      ║
║                                                          ║
║ ┌──────────────────────────────────────────────────────┐ ║
║ │ SELECT * FROM portfolio                              │ ║
║ └──────────────────────────────────────────────────────┘ ║
║                                                          ║
║  SYSTEMS            RESEARCH            CLOUD           ║
║  ● ACTIVE            ● ACTIVE            ● READY         ║
║                                                          ║
║ ┌────────────┐ ┌────────────┐ ┌────────────┐             ║
║ │ PROJECTS   │ │ SKILLS     │ │ ABOUT      │             ║
║ └────────────┘ └────────────┘ └────────────┘             ║
╚══════════════════════════════════════════════════════════╝
```

Clean. Modern. Visual.

Then SQL becomes part of the **interaction**, not the entire design.

---

# 9. Complete User Journey

## Step 1 — Recruiter Enters

> Who is this person?

They see:

```text
SARTHAK PATIL
BUILDING SYSTEMS FROM THE INSIDE OUT.

[ EXPLORE ]
```

---

## Step 2 — They Click Explore

Your interface asks:

> **What would you like to query?**

```text
[ PROJECTS ]
[ SKILLS ]
[ EXPERIENCE ]
[ ABOUT ]
```

---

## Step 3 — They Click Projects

The query animates:

```sql
SELECT * FROM projects;
```

Then:

```text
4 RESULTS RETURNED
```

Projects appear.

---

## Step 4 — They Select Mini-SQLite

Instead of a normal page, they enter the **architecture of Mini-SQLite**.

They can follow the journey:

```text
SQL QUERY
   ↓
LEXER
   ↓
PARSER
   ↓
QUERY EXECUTOR
   ↓
STORAGE ENGINE
   ↓
DATABASE FILE
```

---

## Step 5 — They Want Your Skills

They return to the main interface.

Type:

```sql
SELECT * FROM skills;
```

Skills appear.

---

## Step 6 — They Want to Contact You

They type:

```sql
SELECT * FROM contact;
```

The result:

```text
CONTACT RECORD FOUND

GitHub
LinkedIn
Email

[ LET'S CONNECT → ]
```

---

# 10. Overall Feeling / Identity

Imagine someone says:

> "Check out Sarthak's portfolio."

The recruiter opens it expecting a normal portfolio.

Instead, they see a beautifully designed **personal database system**.

Everything about you is stored as structured information:

```text
ABOUT TABLE
PROJECTS TABLE
SKILLS TABLE
EXPERIENCE TABLE
CONTACT TABLE
```

They can **query you**.

Then, when they select a project, they don't read a generic description—they **enter the system and explore how it works**.

### That's the identity of the portfolio:

> **Sarthak isn't presenting information. He's exposing a system to explore.**

And the perfect tagline could be:

# **Don't browse my portfolio. Query it.**

That is the core idea: combining the SQL concept with a modern technical system interface.

---

# 11. Important Design Direction

The site must NOT become a stereotypical "hacker portfolio".

Avoid making the entire website:

- black background
- green terminal text
- monospace-only typography
- fake command-line output everywhere
- matrix/rain effects
- excessive neon
- fake "system hacking" visuals
- unnecessary glitch effects
- terminal-window cosplay

The SQL/database concept is the **interaction model**, not an excuse to make the site look like a hacker movie.

The visual direction should be:

**clean + premium + technical + minimal + interactive + modern**

Think:

- Apple-level cleanliness
- modern dashboard interfaces
- sophisticated data visualization
- subtle SQL/database cues
- strong typography
- restrained animations
- clear information hierarchy
- excellent mobile responsiveness

The visitor should immediately understand that this is a portfolio, even though it is presented in an unconventional way.

---

# 12. Core UX Principle

The unusual interface should make the website **more memorable, not more difficult**.

A recruiter should be able to get the following information quickly even without knowing SQL:

1. Who Sarthak is
2. What Sarthak does
3. What projects Sarthak has built
4. What technologies Sarthak knows
5. What experience/achievements Sarthak has
6. Where Sarthak's work can be viewed
7. How to contact Sarthak
8. How to download the resume

The SQL interaction adds personality and technical depth, but it should never become a barrier.

---

# 13. Recommended Site Architecture

A good conceptual structure is:

```text
PORTFOLIO SYSTEM
│
├── HOME
│   ├── Identity
│   ├── Query Interface
│   ├── Quick Queries
│   └── System Status
│
├── ABOUT
│   ├── Personal Introduction
│   ├── Engineering Focus
│   └── Current Direction
│
├── PROJECTS
│   ├── Project Cards
│   ├── Filters
│   ├── Search / SQL Queries
│   └── Interactive Project Systems
│
├── SKILLS
│   ├── Languages
│   ├── Systems
│   ├── Databases
│   ├── Cloud
│   ├── VLSI / Hardware
│   └── Tools
│
├── EXPERIENCE
│   ├── Roles
│   ├── Timeline
│   └── Achievements
│
├── RESUME
│   ├── Preview
│   └── Download
│
└── CONTACT
    ├── Email
    ├── GitHub
    ├── LinkedIn
    └── Other relevant links
```

---

# 14. Query Interface — Suggested Behavior

The main input should support:

### Natural quick actions

Examples:

```text
Show projects
Show skills
Who is Sarthak?
Show experience
Show contact
Show resume
```

### SQL-like queries

Examples:

```sql
SELECT * FROM projects;
```

```sql
SELECT * FROM skills;
```

```sql
SELECT * FROM experience;
```

```sql
SELECT * FROM contact;
```

```sql
SELECT name
FROM projects
WHERE technology = 'C++';
```

```sql
SELECT * FROM projects
WHERE domain = 'VLSI';
```

### Future-friendly possibility

The interface can optionally support natural-language input:

```text
Show me all projects involving databases
```

and internally map it to a structured query.

This should be an enhancement, not a requirement for the first version.

---

# 15. Query Result Presentation

Do not simply print raw database rows.

The query engine should map results into **beautiful visual components**.

For example:

```text
SELECT * FROM projects;
```

could produce:

```text
QUERY RESULT
4 RESULTS RETURNED

┌───────────────────────┐
│ MINI-SQLITE           │
│ Relational Database   │
│ C++17                 │
│                       │
│ [ VIEW SYSTEM → ]     │
└───────────────────────┘
```

And:

```text
SELECT * FROM skills;
```

could produce grouped skill categories.

And:

```text
SELECT * FROM contact;
```

could produce large, obvious contact buttons.

SQL determines the **data selection**; the interface determines the **visual presentation**.

---

# 16. Project Pages Should Feel Like Entering a System

For each major project, especially technically complex projects, avoid a conventional project page.

Instead, provide:

```text
PROJECT
↓
OBJECTIVE
↓
ARCHITECTURE
↓
COMPONENTS
↓
DATA / SIGNAL FLOW
↓
IMPLEMENTATION
↓
RESULT
↓
TECH STACK
↓
GITHUB / DEMO
```

For Mini-SQLite, for example:

```text
SQL QUERY
   ↓
LEXER
   ↓
PARSER
   ↓
QUERY EXECUTOR
   ↓
STORAGE ENGINE
   ↓
DATABASE FILE
```

A component is clickable.

Clicking a component should reveal:

- Component name
- Status
- Responsibility
- Inputs
- Outputs
- Relevant technologies
- Short implementation explanation
- Optional code fragment
- Optional visual diagram

This makes the project feel **explorable** rather than documented.

---

# 17. Mini-SQLite Example

Use the following as placeholder/example content only. It does **not** represent the final website content.

```text
MINI-SQLITE ENGINE

                ┌───────────┐
                │   SQL     │
                │   QUERY   │
                └─────┬─────┘
                      │
                      ▼
                ┌───────────┐
                │  PARSER   │
                └─────┬─────┘
                      │
                      ▼
                ┌───────────┐
                │ EXECUTION │
                │  ENGINE   │
                └─────┬─────┘
                      │
                      ▼
                ┌───────────┐
                │  STORAGE  │
                │  MANAGER  │
                └───────────┘
```

Example expanded component:

```text
PARSER
────────────────────────

STATUS: IMPLEMENTED

RESPONSIBILITY:
Converts SQL queries into an
internal representation.

INPUT:
SELECT * FROM users;

OUTPUT:
Parsed query structure

TECH:
C++17
```

Again, this is **example placeholder content**, not the final factual portfolio copy.

---

# 18. Example Skill Interaction

Example:

```sql
SELECT * FROM skills;
```

Result:

```text
SKILL QUERY RESULT
──────────────────────────────────────

LANGUAGES

[C++]   [C]   [Python]   [SQL]

SYSTEMS

[DBMS]   [Operating Systems]

CLOUD

[AWS]

HARDWARE

[VLSI]   [TinyML]
```

The real website should replace these placeholders with the final, accurate skill set.

---

# 19. Example Experience Interaction

Example:

```sql
SELECT * FROM experience;
```

Result:

```text
EXPERIENCE TABLE

┌───────────────┬──────────────────────────┐
│ ROLE          │ SOFTWARE ENGINEER        │
│ INTERESTS     │ DATABASES, SYSTEMS       │
│ FOCUS         │ LOW-LEVEL ENGINEERING    │
└───────────────┴──────────────────────────┘
```

This is only example content.

The actual portfolio should use the final verified experience information.

---

# 20. Example Contact Interaction

Example:

```sql
SELECT * FROM contact;
```

Result:

```text
CONTACT RECORD FOUND

GitHub
LinkedIn
Email

[ LET'S CONNECT → ]
```

The real website should connect these buttons to the actual profile/contact destinations.

---

# 21. Recruiter Accessibility / Normal Navigation

A recruiter should never need to "figure out the gimmick".

There should always be obvious controls such as:

```text
[ ABOUT ] [ PROJECTS ] [ SKILLS ] [ EXPERIENCE ] [ RESUME ] [ CONTACT ]
```

Clicking `PROJECTS` can internally animate:

```sql
> SELECT * FROM projects;
```

Then show the result.

This preserves the magic while retaining standard usability.

---

# 22. Suggested Visual Language

The UI should communicate:

**"This is a software engineer's portfolio."**

rather than:

**"This is a website pretending to be a terminal."**

Recommended design qualities:

### Typography

Use a strong modern sans-serif as the primary font.

Use a monospace font selectively for:

- SQL
- query results
- code
- technical metadata
- system labels

Do not make the entire website monospace.

### Layout

Use:

- generous whitespace
- strong grid alignment
- clear cards
- structured sections
- responsive layouts
- clean borders
- subtle depth
- restrained shadows

### Animation

Use animation to communicate system behavior:

- typing queries
- query execution
- result transitions
- data loading
- component expansion
- architecture flow
- subtle hover transitions
- page/state transitions

Avoid animations that exist purely for decoration.

---

# 23. Suggested Interaction Flow

A strong first-visit flow:

```text
LANDING
   ↓
IDENTITY
   ↓
QUERY BAR
   ↓
QUICK QUERY OPTIONS
   ↓
SELECT / QUERY
   ↓
QUERY ANIMATION
   ↓
RESULTS
   ↓
INTERACTIVE EXPLORATION
```

For a project:

```text
PROJECT RESULT
   ↓
VIEW SYSTEM
   ↓
ARCHITECTURE
   ↓
COMPONENT
   ↓
COMPONENT DETAILS
   ↓
GITHUB / DEMO
```

---

# 24. Recommended Microcopy Style

Examples:

```text
SYSTEM ONLINE
```

```text
QUERY READY
```

```text
4 RESULTS RETURNED
```

```text
SYSTEM ACTIVE
```

```text
COMPONENT IMPLEMENTED
```

```text
DATABASE CONNECTED
```

```text
RECORD FOUND
```

```text
NO RESULTS
```

```text
INVALID QUERY
```

These are examples only and should be used subtly.

---

# 25. Error States Can Also Be Part of the Experience

If a visitor enters:

```sql
SELECT * FROM xyz;
```

Instead of a generic browser error, display something polished:

```text
QUERY ERROR

RELATION "xyz" DOES NOT EXIST.

Try:

[ PROJECTS ]
[ SKILLS ]
[ EXPERIENCE ]
[ ABOUT ]
```

Again, make it playful but professional.

Do not intentionally make the user struggle.

---

# 26. Empty / Loading / Query States

The interface should feel like a real system.

Possible states:

```text
READY
```

```text
QUERYING...
```

```text
PROCESSING...
```

```text
4 RESULTS RETURNED
```

```text
NO RECORDS FOUND
```

```text
QUERY ERROR
```

Animations between states should be quick and polished.

---

# 27. Responsive Behavior

The concept must work on:

- desktop
- laptop
- tablet
- mobile

On mobile, the query bar and result cards should remain easy to use.

The architecture diagrams should adapt rather than becoming tiny and unreadable.

The website must never depend on hover alone.

All important interactions need to work with touch.

---

# 28. Performance

Even though the site is visually interactive, it should remain fast.

Priorities:

- fast first load
- optimized assets
- lazy-load heavy project visualizations
- minimize unnecessary JavaScript
- avoid excessive animation
- avoid huge video backgrounds
- keep mobile performance strong

The technical idea should not come at the expense of usability.

---

# 29. Accessibility

The unconventional interface should still have standard accessibility:

- keyboard navigation
- readable contrast
- semantic HTML
- accessible buttons
- focus states
- reduced-motion support
- screen-reader-friendly labels
- forms with proper labels
- links that behave like links

Do not make the SQL interaction the only way to navigate.

---

# 30. Important Content Principle

The content shown in the examples above is **placeholder/example content**.

The website should NOT assume the examples are the final portfolio content.

Keep the architecture and interaction model separate from the actual data so the content can be replaced later.

A good implementation would have a structured data layer for:

```text
about
projects
skills
experience
contact
```

The UI can then query/render that data.

This means the actual portfolio information can evolve without redesigning the interface.

---

# 31. Strong Technical Implementation Suggestion

The most interesting implementation is to build a **small client-side portfolio query engine**.

It does not need to be a full SQL database.

It can support a carefully defined subset such as:

```text
SELECT
FROM
WHERE
ORDER BY
```

Potentially later:

```text
LIMIT
```

The portfolio data can be stored in structured JSON/TypeScript objects.

Example conceptual data:

```js
{
  projects: [...],
  skills: [...],
  experience: [...],
  about: {...},
  contact: {...}
}
```

The query engine parses supported SQL-like commands and filters this data.

This creates a genuine connection between the concept and implementation.

The website is not merely *pretending* to use SQL visually; it actually uses a small query layer to power the experience.

---

# 32. Important Scope Rule for the Query Engine

Do NOT attempt to build a full production-grade SQL database inside the portfolio.

The purpose is to create a memorable interaction.

Prioritize:

1. intuitive queries
2. fast execution
3. useful filtering
4. clean results
5. excellent animation
6. robust error handling

Avoid unnecessary complexity.

The project should remain maintainable.

---

# 33. Optional Future Enhancement — Natural Language

A future enhancement could allow:

```text
Show all my projects involving C++
```

and internally translate the request into the appropriate structured query.

Another example:

```text
What projects have I built in databases?
```

The system could internally resolve this to something conceptually similar to:

```sql
SELECT * FROM projects
WHERE domain = 'Database';
```

This should be optional.

The first version should already feel complete without AI.

---

# 34. Optional Future Enhancement — Query Suggestions

As the visitor types:

```sql
SELECT *
```

autocomplete suggestions could appear:

```text
FROM projects
FROM skills
FROM experience
FROM contact
```

For:

```sql
SELECT * FROM projects WHERE
```

suggest:

```text
technology =
domain =
status =
```

This makes the interface easier for people unfamiliar with SQL.

---

# 35. Optional Future Enhancement — Query History

A compact query history could show:

```text
RECENT QUERIES

SELECT * FROM projects;
SELECT * FROM skills;
SELECT * FROM contact;
```

Clicking an old query reruns it.

This could make the experience feel like a real interactive system.

It should remain secondary and not clutter the UI.

---

# 36. Optional Future Enhancement — Shareable Queries

A future feature could allow a query to be encoded into the URL.

For example, a URL could represent:

```sql
SELECT * FROM projects WHERE technology = 'C++';
```

Then someone opening that URL immediately sees the corresponding result.

This could be useful for sharing a specific portfolio slice.

Optional only.

---

# 37. Optional Future Enhancement — Project System Simulation

For technically complex projects, the architecture could become an interactive simulation.

For example:

```text
INPUT
  ↓
PROCESSING
  ↓
CORE LOGIC
  ↓
OUTPUT
```

Clicking a node highlights data flow.

This is especially valuable for:

- Mini-SQLite
- systems projects
- TinyML projects
- VLSI architecture
- cloud architecture

The visitor should be able to understand the project even without reading a long description.

---

# 38. Optional Future Enhancement — Real Mini-SQLite Demo

For Mini-SQLite specifically, an especially strong enhancement would be a small interactive demonstration.

The visitor could enter something like:

```sql
CREATE TABLE users (...);
```

then:

```sql
INSERT INTO users (...);
```

then:

```sql
SELECT * FROM users;
```

The portfolio could show the result and/or a visual representation of the database execution flow.

If technically feasible, this can connect to the actual Mini-SQLite project or a WebAssembly/browser-compatible build.

This would be a very strong demonstration because the portfolio itself becomes a live showcase of the database work.

Do not make this a mandatory requirement for version 1.

---

# 39. Optional Future Enhancement — Architecture Flow Animation

For Mini-SQLite:

```text
SQL QUERY
   ↓
LEXER
   ↓
PARSER
   ↓
QUERY EXECUTOR
   ↓
STORAGE ENGINE
   ↓
DATABASE FILE
```

When the visitor runs a query, animate a subtle signal moving through these stages.

For example:

```text
SELECT * FROM users;
        ↓
      LEXER
        ↓
      PARSER
        ↓
 QUERY EXECUTOR
        ↓
 STORAGE ENGINE
        ↓
     RESULT
```

This would make the project feel alive.

---

# 40. Recommended Main Information Model

Conceptually, think of the portfolio as these tables:

```text
ABOUT
PROJECTS
SKILLS
EXPERIENCE
CONTACT
```

Optional additional conceptual tables:

```text
ACHIEVEMENTS
CERTIFICATIONS
RESEARCH
EDUCATION
SOCIALS
```

These are conceptual models for the UI/query system, not necessarily literal database tables.

---

# 41. Example Conceptual Data Relationships

A project could have fields like:

```text
id
name
description
domain
technologies
status
featured
github
demo
architecture
components
```

A skill could have:

```text
name
category
level
relatedProjects
```

An experience record could have:

```text
role
organization
period
description
skills
```

The actual schema should be designed according to the final content.

---

# 42. Recruiter-First Principle

Even though this is an unusual portfolio, the recruiter experience matters more than the gimmick.

A recruiter should be able to reach:

```text
PROJECTS
RESUME
CONTACT
```

within seconds.

The interface should communicate:

> "Here is something unusual."

but also:

> "Here is everything you need."

The novelty should earn attention.

The information architecture should earn the interview.

---

# 43. Final Mental Model

Do not think:

> "I am making a portfolio with SQL styling."

Think:

> "I am building a personal information system that happens to be a portfolio."

The visitor is interacting with a structured representation of you.

They query your information.

The system returns visually designed results.

When they find a project they like, they can enter that project's system and explore how it works.

---

# 44. Final Identity

The website should feel like:

```text
Sarthak Patil
        ↓
Personal Engineering System
        ↓
Queryable Portfolio
        ↓
Interactive Projects
        ↓
Technical Storytelling
```

Not:

```text
Generic Portfolio
        ↓
About
        ↓
Skills
        ↓
Projects
        ↓
Contact
```

---

# 45. Final Tagline

The strongest tagline for the concept is:

# **Don't browse my portfolio. Query it.**

Additional possible supporting copy:

```text
A portfolio designed as an interactive engineering system.
```

or:

```text
Explore the engineer through structured queries.
```

or:

```text
A personal database of projects, systems, and ideas.
```

The primary tagline should remain:

> **Don't browse my portfolio. Query it.**

---

# 46. What the Vibe-Coding Implementation Should Ultimately Deliver

The finished website should provide:

- A clean premium landing page
- Sarthak's identity
- A SQL-inspired query bar
- Quick query buttons
- Animated query execution
- Visually rich query results
- Standard navigation for non-technical visitors
- Actual SQL-like querying for technical visitors
- Structured portfolio data
- Project filtering using queries
- Interactive project architecture pages
- Clickable system components
- Detailed component panels
- Skills query/results
- Experience query/results
- About query/results
- Contact query/results
- Resume access
- Proper error states
- Loading states
- Responsive behavior
- Accessibility
- Fast performance
- A maintainable data layer
- A small query parser/engine if practical
- A polished visual identity that avoids generic hacker-terminal aesthetics

---

# 47. Non-Negotiable Product Intent

The final result should make someone think:

> "I've never seen a portfolio presented like this."

But after the first few seconds they should also understand:

> "This is a software engineer's portfolio."

And after exploring a project they should think:

> "This person actually understands the systems they are building."

That is the purpose of the concept.

---

# 48. One-Sentence Project Definition

**Build a premium, modern, interactive portfolio that behaves like a personal database system: visitors can browse normally or query Sarthak's information using SQL-like commands, and major projects open into interactive system architectures rather than conventional project pages.**

---

# 49. Core Statement for the Vibe-Coding Agent

Build the website around this idea:

> **Don't browse my portfolio. Query it.**

This is **not** a terminal portfolio.

It is **not** an OS portfolio.

It is **not** a hacker-themed portfolio.

It is a **modern interactive database-inspired portfolio**, where SQL is the interaction language/theme and technical projects are represented as explorable systems.

The examples in this document are placeholders and visual references. Replace all example content with the final portfolio information later.

The implementation should prioritize a professional, recruiter-friendly experience while preserving the unique concept.
