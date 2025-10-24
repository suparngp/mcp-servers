[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [How To: Write SQL Commands inside a Postgres REPL](/university/developer-workflows/backend/how-to-write-sql-commands-inside-a-postgres-repl)
 * [How To: Create Priority Matrix for Database Optimization](/university/developer-workflows/backend/how-to-create-priority-matrix-for-database-optimization)
 * [Frontend / UI](/university/developer-workflows/frontend-ui)
 * [Testing & Security](/university/developer-workflows/testing-and-security)
 * End-To-End Builds
 * [Building a Real-time Chat App (Github MCP + Railway )](/university/end-to-end-builds/building-a-real-time-chat-app-github-mcp-+-railway)
 * [Building a Chrome Extension (D3.js + Javascript + HTML + CSS)](/university/end-to-end-builds/building-a-chrome-extension-d3.js-+-javascript-+-html-+-css)
 * MCP Servers
 * [Puppeteer MCP: Scraping Amazon Web Reviews ](/university/mcp-servers/puppeteer-mcp-scraping-amazon-web-reviews)
 * [Sentry MCP: Fix Sentry Error in Empower Website](/university/mcp-servers/sentry-mcp-fix-sentry-error-in-empower-website)
 * [Context7 MCP: Update Astro Project with Best Practices](/university/mcp-servers/context7-mcp-update-astro-project-with-best-practices)
 * [Figma Remote MCP: Create a Website from a Figma File from Scratch](/university/mcp-servers/figma-remote-mcp-create-a-website-from-a-figma-file-from-scratch)
 * [Linear MCP: Retrieve issue data](/university/mcp-servers/linear-mcp-retrieve-issue-data)
 * [Linear MCP: Updating Tickets with a Lean Build Approach](/university/mcp-servers/linear-mcp-updating-tickets-with-a-lean-build-approach)
 * [SQLite and Stripe MCP: Basic Queries You Can Make After Set Up](/university/mcp-servers/sqlite-and-stripe-mcp-basic-queries-you-can-make-after-set-up)
 * Terminal / Command Line Tips
 * [Improve Your Kubernetes Workflow (kubectl + helm)](/university/terminal-command-line-tips/improve-your-kubernetes-workflow-kubectl-+-helm)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=c5dAwvMCRiTxUOdDicqy)
 * [Intro](#intro)
 * [The Problem](#the-problem)
 * [The Prompt](#the-prompt)
 * [Review the Matrix](#review-the-matrix)
Was this helpful?
Learn how to generate a data-driven optimization matrix that ranks database issues by impact, risk, and effort.
1
### 
[](#intro)
Intro
This tutorial teaches you how to prompt Warp to audit and optimize your **database performance** automatically.
It analyzes SQL queries, identifies common inefficiencies, and generates a **priority matrix** for improvements.
2
### 
[](#the-problem)
The Problem
When you tell AI to “optimize a query,” that could mean _anything_ — faster, safer, or simpler. Instead, use Warp to clarify intent and return measurable outcomes.
3
### 
[](#the-prompt)
The Prompt
Paste this into Warp’s AI input:
Warp prompt
Copy```
# **Comprehensive Database Query Analysis and Optimization Guide**
This guide provides a structured, repeatable approach for analyzing, profiling, and optimizing database performance within your application.
---
## **PHASE 1: Query Discovery & Cataloging**
### **Step 1 — Identify All Queries**
Scan the entire codebase and locate every SQL or ORM-based query. This includes:
- All **raw SQL queries**, including stored procedures 
- **ORM-generated queries** (capture the actual SQL being produced) 
- **Dynamic query builders** and their permutations 
- **Background job queries** that may run at scale 
- **Admin or reporting queries** that could lock tables 
### **Step 2 — Document Key Details**
For each query discovered, record the following:
- **File location and function name** 
- **Frequency of execution** (per request, batch job, or cron schedule) 
- **Typical data volume processed**
---
## **PHASE 2: Performance Analysis**
For each identified query, generate and analyze a detailed **execution plan**.
### **Execution Plan Commands**
```sql
-- PostgreSQL
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON);
-- MySQL
EXPLAIN FORMAT=JSON;
```
### **Extract the Following Metrics**
- Total execution time 
- Rows examined vs. rows returned ratio 
- Index usage (full table scans, index scans, seeks) 
- Join methods (nested loop, hash, merge) 
- Memory usage and temporary file creation 
- Buffer pool hit ratio 
---
## **PHASE 3: Identify Specific Problems**
### **1. N+1 Query Detection**
**Problem:** Loading users and their posts separately 
**Found in:** `/api/users/controller.js:45` 
**Impact:** 100 queries for 100 users instead of one batched query 
#### **Current Implementation**
```js
const users = await db.query('SELECT * FROM users');
for (const user of users) {
 user.posts = await db.query('SELECT * FROM posts WHERE user_id = ?', [user.id]);
}
```
#### **Optimized Version**
```js
const usersWithPosts = await db.query(`
 SELECT u.*,
 COALESCE(json_agg(p.*) FILTER (WHERE p.id IS NOT NULL), '[]') AS posts
 FROM users u
 LEFT JOIN posts p ON p.user_id = u.id
 GROUP BY u.id;
`);
```
---
### **2. Missing Index Analysis**
**Finding:** Full table scan on `orders` table (2M rows) 
**Query:**
```sql
SELECT * FROM orders WHERE status = 'pending' AND created_at > ?;
```
**Recommendation:**
```sql
CREATE INDEX idx_orders_status_created ON orders(status, created_at);
```
**Impact:** Query time reduced from **3.2s → 0.045s**
---
### **3. Inefficient JOIN Patterns**
**Problem:** Queries join through unnecessary intermediate tables. 
**Solution:** Simplify relationships using direct joins or indexed subqueries where possible.
---
### **4. Subquery Optimization**
**Inefficient Query:**
```sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products WHERE category_id = p.category_id);
```
**Optimized (Using Window Function):**
```sql
WITH product_stats AS (
 SELECT *,
 AVG(price) OVER (PARTITION BY category_id) AS avg_category_price
 FROM products
)
SELECT * FROM product_stats WHERE price > avg_category_price;
```
---
## **PHASE 4: Advanced Optimizations**
### **Caching Strategies**
Use caching for:
- User-specific data with low update frequency 
- Expensive aggregations that can be pre-computed 
#### **Implementation**
```js
// Add caching layer with TTL
const getCachedOrQuery = async (key, query, ttl = 3600) => {
 const cached = await redis.get(key);
 if (cached) return JSON.parse(cached);
 const result = await db.query(query);
 await redis.setex(key, ttl, JSON.stringify(result));
 return result;
};
```
---
### **Recommended Connection Configuration**
```json
{
 "connectionLimit": 50,
 "queueLimit": 100,
 "acquireTimeout": 30000,
 "waitForConnections": true,
 "idleTimeout": 300000,
 "enableKeepAlive": true,
 "keepAliveInitialDelay": 10
}
```
---
### **Batch Operation Optimization**
**Problem:** Records are inserted one by one 
**Found in:** `/jobs/import-data.js`
**Current Implementation:** 
1000 individual `INSERT` statements 
**Optimized:**
```sql
INSERT INTO users (name, email, created_at) VALUES
 ($1, $2, $3),
 ($4, $5, $6),
 ... -- batch in groups of 1000
```
---
### **Pagination Optimization**
```sql
SELECT * FROM posts
WHERE created_at < $cursor
ORDER BY created_at DESC
LIMIT 20;
```
---
## **PHASE 5: Monitoring & Maintenance**
### **1. Slow Query Logging Setup**
#### **PostgreSQL**
```sql
ALTER SYSTEM SET log_min_duration_statement = '1000'; -- Log queries over 1s
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_duration = on;
```
#### **MySQL**
```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL log_output = 'TABLE';
```
---
### **2. Query Performance Testing**
```js
describe('Query Performance', () => {
 test('User listing should complete under 100ms', async () => {
 const start = Date.now();
 await db.query('SELECT * FROM users LIMIT 1000');
 expect(Date.now() - start).toBeLessThan(100);
 });
});
```
---
## **PHASE 6: Deliverables**
### **Deliverable Outputs**
- **Optimization Script:** A single SQL file with all index creations, ordered by performance impact. 
- **Code Changes PR:** Includes all query optimizations with before/after comparison results.
### **Performance Report**
- Baseline metrics vs. optimized metrics 
- Expected resource savings (CPU, memory, I/O) 
- Risk assessment for each change 
### **Monitoring Dashboard**
Define recurring queries to track query performance over time.
---
## **PRIORITY MATRIX**
Rank each optimization by:
- **Impact:** Query frequency × time saved 
- **Risk:** Low / Medium / High 
- **Effort:** Quick fix / Moderate / Complex refactor 
> Focus on **high-impact**, **low-risk**, **low-effort** items first.
---
### **Summary**
This workflow ensures the AI:
1. Systematically identifies all queries 
2. Analyzes them using database-specific profiling tools 
3. Provides **actionable, tested solutions** 
4. Considers the full application context 
5. Delivers **implementation-ready optimizations**
```
Warp will locate all SQL usage, test each query, and score them using explain-plan data.
4
### 
[](#review-the-matrix)
Review the Matrix
The output includes:
 * Query locations
 * Performance metrics
 * Recommended fixes
 * A **graph** mapping impact vs effort
A well-tuned database is the heart of your web stack — don’t skip it.
[PreviousHow To: Write SQL Commands inside a Postgres REPL](/university/developer-workflows/backend/how-to-write-sql-commands-inside-a-postgres-repl)[NextFrontend / UI](/university/developer-workflows/frontend-ui)
Last updated 15 days ago
Was this helpful?