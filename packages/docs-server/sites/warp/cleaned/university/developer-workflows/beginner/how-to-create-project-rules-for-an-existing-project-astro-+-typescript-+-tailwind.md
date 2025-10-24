[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [How to: Explain Your Codebase Using Warp (Rust Codebase)](/university/developer-workflows/beginner/how-to-explain-your-codebase-using-warp-rust-codebase)
 * [How To: Create Project Rules for an Existing Project (Astro + Typescript + Tailwind)](/university/developer-workflows/beginner/how-to-create-project-rules-for-an-existing-project-astro-+-typescript-+-tailwind)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
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
 * [What Project Rules Are](#what-project-rules-are)
 * [Generate Warp.md ](#generate-warp.md)
 * [Keep the File Lean and Intentional](#keep-the-file-lean-and-intentional)
 * [Start Lean](#start-lean)
 * [Iterate and Maintain](#iterate-and-maintain)
 * [Use Sub‑directory Rules for Monorepos](#use-sub-directory-rules-for-monorepos)
Was this helpful?
This educational module is built **only** from the transcript. It shows how to create and maintain a `Warp.md` file so Warp agents always understand your project’s setup, commands, architecture, and structure.
* * *
## 
[](#what-project-rules-are)
What Project Rules Are
A **Project Rules** file (`Warp.md`) acts as your project’s AI onboarding guide. Instead of re‑explaining your setup on every prompt, you document it once and Warp will always have that context. The transcript demo walks through creating the file, opening it in a side editor, and organizing it with standard Markdown headings for clear sections.
* * *
## 
[](#generate-warp.md)
Generate `Warp.md`
Run the following **verbatim** prompts in Warp to create and verify your rules file, then open it in the editor:
Copy```
/init
```
Copy```
/open-project-rules
```
 * `/init` generates a starter `Warp.md` in your project root.
 * `/open project rules` opens it in a side editor where you can scroll and edit the content.
You'll get something that looks like this:
Copy```
# WARP.md
This file provides guidance to WARP (warp.dev) when working with code in this repository.
## Project Overview
Share Your Brewfiles is an Astro-based website that allows developers to share and discover their Homebrew package lists (Brewfiles). The platform generates personality profiles based on package usage patterns and provides a leaderboard of popular packages.
## Core Architecture
* **Frontend**: Astro 4 with React 18 components, TypeScript, and Tailwind CSS
* **Backend**: Astro API routes with Firebase integration
* **Database**: Firebase Firestore for storing brewfiles, user data, and personality summaries
* **Deployment**: Vercel with serverless functions
* **Styling**: Custom Tailwind configuration with dark theme and gradient animations
## Key Components
### API Routes (`src/pages/api/`)
* `getBrewfiles.json.ts` - Retrieves all brewfiles or a specific brewfile by ID, triggers personality generation
* `uploadBrewfile.ts` - Handles brewfile uploads with GitHub OAuth integration
* `getRankedPackages.json.ts` - Generates leaderboard data for popular packages
* `updatePersonality.ts` - Updates personality summaries for users
* `exchangeCodeForAccessToken.ts` - GitHub OAuth token exchange
* `logSearch.json.ts` - Analytics for search functionality
### Core Library Functions (`src/lib/`)
* `generatePersonality.ts` - Complex algorithm that analyzes brewfile packages and assigns personality types (15 different personalities)
* `personalityBuckets.ts` - Defines personality type metadata and descriptions
* `validateBrewfileData.ts` - Data validation for brewfile uploads
* `totalBrewData.ts` - Aggregates package statistics for leaderboards
### Type System (`src/types/`)
* `brews.ts` - Main data structures for brewfiles, users, and entries
* `personality.ts` - Personality analysis types and enums
* `packageEntry.ts` - Package metadata structures
## Development Commands
### Setup
```bash
# Install dependencies
npm install
# Set up environment (Firebase config is public but consider security)
# No additional env setup needed for development
# Development server
npm run dev
```
### Development Workflow
```bash
# Start development server with Astro
npm run dev
# Build for production
npm run build
# Preview production build
npm run preview
# Run Astro CLI commands
npm run astro
```
### Testing API Endpoints
```bash
# Test brewfile retrieval
curl "http://localhost:4321/api/getBrewfiles.json"
# Test specific brewfile by ID
curl "http://localhost:4321/api/getBrewfiles.json?id=DOCUMENT_ID"
# Test package rankings
curl "http://localhost:4321/api/getRankedPackages.json"
```
## Architecture Notes
### Personality Generation System
The core feature analyzes brewfile packages against a curated dictionary (`labelledBrewfiles.ts`) that categorizes packages by:
- Developer type (Backend, Frontend, DevOps, Security, Data, General)
- Package characteristics (AI tools, organization tools, customization, popularity rank)
- Legacy/modern status
The system calculates percentage distributions and applies complex rules to assign one of 15 personality types (Minimalist, Golden Retriever, Pragmatist, Trendy, AI, Architect, Artist, Traditionalist, Retro, Bob the Builder, Marie Kondo, Crazy Scientist, Trailblazer, Security, Wallflower).
### Firebase Integration
- Uses Firestore for data persistence
- Collection: `brewfiles` stores user brewfiles with personality summaries
- Real-time personality generation happens asynchronously after uploads
- GitHub OAuth integration for user authentication
### Path Alias System
Uses TypeScript path mapping with `@/*` pointing to `./src/*` for clean imports.
### Astro Configuration
- Server-side rendering with Vercel adapter
- React integration for interactive components
- Sitemap generation for SEO
- Prefetch enabled for performance
## Development Environment Setup
### Prerequisites
- Node.js (version compatible with Astro 4)
- Access to Firebase project (config is in source but consider security implications)
- GitHub OAuth app for testing upload functionality
### Local Development Notes
- The site uses server-side rendering so API routes work in development
- Firebase config is currently in source code - be aware of security implications
- GitHub OAuth integration requires valid access tokens for uploads
- Personality generation is computationally expensive with large datasets
### Custom Tailwind Configuration
- Dark theme with custom color palette (`bkg: #111111`)
- Custom accent colors (teal, orange, green, pink, blue variants)
- Marquee animations for scrolling elements
- Responsive typography with fluid scaling
- Container queries support
## File Structure Navigation
```
src/
├── pages/
│ ├── api/ # Astro API routes (serverless functions)
│ ├── index.astro # Homepage with hero and marquee
│ ├── brewfiles.astro # Search and browse brewfiles
│ └── leaderboard.astro # Package popularity rankings
├── components/ # Astro and React components
├── lib/ # Core business logic and utilities
├── types/ # TypeScript type definitions
├── data/ # Static data and package dictionaries
└── firebase/ # Firebase configuration
```
## Common Development Tasks
### Adding New Personality Types
1. Update `DeveloperPersonalityType` enum in `src/types/personality.ts`
2. Add detection function in `src/lib/generatePersonality.ts`
3. Update `personalityBuckets.ts` with new personality metadata
4. Add corresponding image to `public/images/`
### Modifying Package Analysis
- Update `labelledBrewfiles.ts` to modify package categorization
- Adjust percentage thresholds in personality detection functions
- Test with different brewfile compositions
### API Route Development
- All routes in `src/pages/api/` become serverless functions on Vercel
- Use `export const prerender = false;` for dynamic routes
- Handle errors consistently with try/catch blocks
```
* * *
## 
[](#keep-the-file-lean-and-intentional)
Keep the File Lean and Intentional
1
### 
[](#start-lean)
Start Lean
Everything in `warp.md` is **prepended to your prompt**. A longer file consumes more tokens and can increase compute cost. Keep only what truly matters.
2
### 
[](#iterate-and-maintain)
Iterate and Maintain
Start with `/init` boilerplate, then treat the file as a **living document**. Add the rules that help your team ship faster (e.g., branching, PR guidelines) and prune anything redundant.
If the file grows large (e.g., **500+ lines**), run it through a **prompt optimizer** to catch duplication, remove overlaps, and slim it down — exactly as advised in the transcript.
* * *
## 
[](#use-sub-directory-rules-for-monorepos)
Use Sub‑directory Rules for Monorepos
For large repos, you can generate localized rule files in sub‑trees. Navigate into a subfolder and run `/init` again to create a **directory‑scoped**`**Warp.md**`tailored to that area:
Going forward, when you give Warp a task, it will carry this context automatically — no re‑explaining needed.
[PreviousHow to: Explain Your Codebase Using Warp (Rust Codebase)](/university/developer-workflows/beginner/how-to-explain-your-codebase-using-warp-rust-codebase)[NextPower User](/university/developer-workflows/power-user)
Last updated 15 days ago
Was this helpful?