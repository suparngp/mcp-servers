[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [Frontend / UI](/university/developer-workflows/frontend-ui)
 * [Testing & Security](/university/developer-workflows/testing-and-security)
 * [How to: Generate Unit and Security Tests to Debug Faster](/university/developer-workflows/testing-and-security/how-to-generate-unit-and-security-tests-to-debug-faster)
 * [How To: Prevent Secrets from Leaking](/university/developer-workflows/testing-and-security/how-to-prevent-secrets-from-leaking)
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
 * [The Problem](#the-problem)
 * [The Prompt](#the-prompt)
 * [Add to Rules File](#add-to-rules-file)
 * [Recap](#recap)
Was this helpful?
Learn how to prompt Warp’s AI to generate useful unit and security tests — helping you debug faster and deploy with confidence.
* * *
1
### 
[](#the-problem)
The Problem
Building REST APIs involves a lot of overhead: validation, testing, and security. Most “auto-generated tests” from AI end up generic and incomplete — leaving gaps in reliability.
To solve this, Warp lets you run **precise, context-aware test generation** using better-structured prompts.
2
### 
[](#the-prompt)
The Prompt
Paste this into Warp’s AI input:
prompt.txt
Copy```
After implementing this API code, generate comprehensive unit tests and security tests to verify everything works correctly and securely:
1. Unit tests for each function / method
Core functionality
- Happy path with valid inputs -> expected output
- Each edge case (empty inputs, nulls, boundary values)
- Error handling for invalid inputs
- Return value types and structure
- Edge cases: empty strings, null/undefined, max values, special characters
2. SECURITY TESTS FOR EACH ENDPOINT
For every API endpoint, create security tests that check:
Input validation
Test with these malicious payloads in every user input field:
SQL Injection: " ' OR '1' = '1', "1; DROP TABLE users--", "admin'--"
NoSQL Injection: {"$gt": ""}, {"$ne": null}
Command Injection: "; ls -la", "| whoami", "$(cat /etc/passwd)"
Path Traversal: "../../../etc/passwd", "..\..\..\windows\system32"
XSS: "<script>alert('XSS')</script>", "javascript:alert(1)"
XXE (for XML): "<!DOCTYPE foo [<!ENTITY xxe SYSTEM 'file:///etc/passwd'>]>"
**Authentication Tests:**
- No token/credentials → Must return 401
- Invalid token → Must return 401
- Expired token → Must return 401
- Valid token for wrong user → Must return 403
- Token with insufficient permissions → Must return 403
**Authorization Tests:**
- User A trying to access User B's data → 403
- Regular user accessing admin endpoints → 403
- Deleted/disabled user token → 401
- Verify all role-based access controls work
**Additional Security Checks:**
- Rate limiting works (spam 100 requests → 429 response)
- Large payloads are rejected (>1MB unless specified)
- Sensitive data not exposed in errors
- Headers don't leak server info
- CORS properly configured
3 After running all tests, ensure:
✓ All unit tests pass
✓ 100% of functions have tests
✓ All security tests pass
✓ No SQL/NoSQL injection vulnerabilities
✓ Authentication is properly enforced
✓ Authorization rules are working
✓ Input validation catches malicious data
✓ Error messages don't expose sensitive info
4. Output Format
Generate 2 test files:
1. Unit_tests.[ext] - all functional tests
2. security_tests.[ext] - all security tests
Use simple assertions that clearly show:
- What is being tested
- What the expected behavior is
- Why this test matters
Keep these tests simple and focused - each test should verify ONE thing
```
3
### 
[](#add-to-rules-file)
Add to Rules File
Once you’ve validated the prompt, add it to your Warp Rules file so Warp can automatically reuse it.
Copy```
Name: Run tests after writing
Rule: run pytest mapp/tests to validate if the code you inserted works
```
Warp will then run these tests as a source of truth — deciding whether new AI-generated code is safe to merge or deploy.
4
### 
[](#recap)
Recap
You’ve learned how to:
 * Prompt for **specific test coverage**
 * Automate your **unit and security tests**
 * Use Warp’s **Rules** feature for validation
Small change in prompt structure — big jump in reliability.
[PreviousTesting & Security](/university/developer-workflows/testing-and-security)[NextHow To: Prevent Secrets from Leaking](/university/developer-workflows/testing-and-security/how-to-prevent-secrets-from-leaking)
Last updated 15 days ago
Was this helpful?