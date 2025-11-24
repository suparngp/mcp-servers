`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Flagship Blog](/docs/blog)
 * [5 takeaways from my first PyCon JP conference](/docs/blog/pyconjp-25-takeaways)
 * [Dungeons & Downtimes: XP gained from our adventure](/docs/blog/dungeons-downtimes)
 * [Reverse Proxy for custom domains](/docs/blog/reverse-proxy-custom-domains)
 * [Adventures in dogfooding: Guarded Releases](/docs/blog/dogfooding-guardian-edition)
 * [A quick tool for npm package scanning](/docs/blog/npm-breach-supply-chain-security)
 * [My DEF CON 33 experience](/docs/blog/defcon-33-takeaways)
 * [Make every launch a big deal](/docs/blog/celebrating-every-launch)
 * [A tale of three rate limiters](/docs/blog/rate-limiters)
 * [My good friend Claude](/docs/blog/my-good-friend-claude)
 * [My approach to React app architecture in 2025](/docs/blog/react-architecture-2025)
 * [Fun with JS streams](/docs/blog/fun-js-streams)
 * [Moonshots XXII: Hack to the Future recap](/docs/blog/2025-hackathon-recap)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [What’s in the (tool)box?](#whats-in-the-toolbox)
 * [Chasing the (work)flow](#chasing-the-workflow)
 * [Multitasking](#multitasking)
 * [Wrangling context](#wrangling-context)
 * [Claude: Daily Driver](#claude-daily-driver)
 * [A note on mental disengagement](#a-note-on-mental-disengagement)
 * [Conclusion](#conclusion)
 * [Links and readings](#links-and-readings)
_Published August 27th, 2025_
![Portrait of Alexis Georges.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/9e3616fe8140a186803c04f06fe9382e9a4734ee538d163c464af5194858ff81/assets/images/authors/alexis-georges.jpeg)
by Alexis Georges, LaunchDarkly Engineer
It took me a while to get past my AI-curmudgeon phase, and boy am I glad I did! I let my distaste for hype bring me down. No, I don’t believe pattern-matching will solve all the world’s problems any more than I used to. No, I don’t believe we’re about to lose our jobs anytime soon. In my mind, there’s more nuance to that. Instead, I’ve come to realize that these tools are just like the other tools of the trade: they require trial and error, patience, and involve many tradeoffs. In a sense, nothing has changed. Except, everything did change. One thing I’m a little bit obsessed about these days is exploring how agent(s) can help us execute faster. What can they reliably automate for us? What anticlimactic years-old migration can they help us drive forward to speed up our frontend CI? Which parts of our process can they help us unlock? In this post, I want to talk about the tools I use on a daily basis, some of the workflows I’ve been experimenting with, some things that worked well, and some that did not work so well.
## What’s in the (tool)box?
I believe that variability between LLMs and related tools is mostly ephemeral, and so I’ve decided I’m better off sticking with a set of tools that complement each other well. I do still experiment with all the newness, but sticking with one tool has at least given me a point of reference. You only truly love someone by accepting all of them, the good and the less good. And, I love Claude.
 * Agent: [Claude Code](https://www.anthropic.com/claude-code)
 * Multitasking: [git worktree](https://git-scm.com/docs/git-worktree)
 * Editor: [Zed](http://zed.dev/)
 * Terminal: [Ghostty](https://ghostty.org/)
 * Git: [gitui](https://github.com/gitui-org/gitui) + a bunch of Claude-authored shell helpers
Claude Code has become my friend. Is it the best model? No. Is it the best terminal UI (TUI)? Nope. I don’t know that it’s the best at anything. But I have thoroughly enjoyed working with it. We’ve stuck together, and I’ve begun to develop a feel for what these models are capable of, minus the thrash from switching tools.
 * It performs as well as any other model for the tasks I’m using it on, relatively speaking. My current stance is that tooling around the models is more important than the model stats du jour for now. Getting comfortable working with them and learning how to apply them to meaningful work is what I’m interested in.
 * It’s well-documented.
 * It’s extensible: hooks, custom commands, sub-agents, etc.
 * It’s designed thoughtfully:
 * My favorite example is pressing Escape twice to jump back to a previous message to fork the conversation.
 * LLMs can go down rabbit holes; Escape to interrupt FTW.
 * It’s helped me **separate thinking and planning from executing** : it literally has a planning mode (Shift + Tab twice), which I’ve thoroughly enjoyed. I love thinking about systems, how to make them more robust, how to extend them, how to maintain them, etc., and having Claude think with me—instead of trying to move to execution—has been liberating.
If you’ve interacted with LLMs, you’ve no doubt run into frustrating situations where it just won’t listen. Putting those aside, there are things I do hope these aspects of Claude Code improve over time:
 * UI can be janky at times
 * I frequently move around my terminal panes while it’s working, and it’s jarring to see its pane flashing as it updates. (They use Ink under the hood, a React terminal renderer, so everything re-renders constantly, which is not ideal for TUIs.)
 * Context size warnings give me anxiety
 * LLMs have limited context windows, and you learn to work with that. But if there’s one thing that gives me anxiety is seeing the little “Context left until auto-compact: 4%”. Anthropic has [docs](https://docs.anthropic.com/en/docs/claude-code/costs#reduce-token-usage) on fine-tuning this, but I haven’t gotten around to that yet.
## Chasing the (work)flow
I’ve used Claude Code for a variety of tasks, like designing new systems, planning and executing a migration, asking questions about one of our codebases, etc… One of my favorite applications of non-deterministic LLMs is to generate _deterministic_ scripts. That is such a clutch. Another one: asking Claude to help me create and/or configure _other_ tools!
### Multitasking
You know when you’re heads down on your P0 for the week, and something comes in that needs your attention? You commit/stash, create a new branch, do some work, commit, push, check out your previous branch, etc. I’ve always found this terrible. Until I learned about `git worktree`: imagine being able to have multiple branches checked out at the same time? No need to move between branches; you do your work on whichever branch makes sense. When you’re done, you put up a PR and remove the worktree. Voilà! Now you can have a few Claudes working on a few things in parallel. Game changer. (You do need to find your own parallelization limit here; for my brain it’s ~2-3 on a very good day.) **But I’m lazy** , and there’s no way I could remember all the `git worktree` commands. Claude to the rescue! In this scenario, I was the user and Claude was the builder, and together we built a `git worktree` helper for my shell (Fish) in about 10 minutes. 🤝 It even helped me update my terminal prompt to add a bit of flair 💅 when inside a work tree directory.
Now, Zed. It’s ridiculously fast. It uses few resources. It’s thoughtfully designed. My favorite detail: before committing to a tab-completion, press ⎇ to preview. So good. It does have its own agent, too, which works as well as Cursor’s last time I tried it (but it’s been a while). But the thing I demand above all else from my editor is speed, and I get that from Zed. ❤️
Finally, Ghostty. It’s a relatively new terminal. Nothing fancy, except it’s OS-native, fast, easy to configure, and supports all the things I’m accustomed to, like split panes, etc. And it also has thoughtful touches, like the quick terminal:
With the quick terminal, I can have plenty of tabs/panes, and still summon Claude Code from anywhere with ⌘+`.
### Wrangling context
Context engineering has definitely been a challenge, but it’s a fact that we need to accept. Here are some things I’ve found useful when working with Claude. First, make sure it knows about things you believe it should know about. Don’t assume anything with agents.
 * `claude -r`: pick a session to start from
 * `/memory` will show you the `CLAUDE.md` files it knows about.
 * `/clear` to throw away your context without having to restart your session
 * my favorite: ask it questions! “can you tell me how we manage feature flags on the frontend?” you’ll quickly find out if it found the right context.
Now, eventually, you will need to leave or compact your session. This is inevitable when working on a relatively large chunk of work. What’s worked well for me is to apply the same “incremental” approach here: ask Claude to save the plan and its status to a document. I treat such documents as temporary CLAUDE.md: I encode rationale, planning, process, commands, etc., so I can quickly get Claude up and running again. Like a game save checkpoint.
And lastly, I’ve also been dabbling with something I’m very excited about: persisting context locally to notes. I’ve been dabbling with [Obsidian + MCP](https://github.com/jacksteamdev/obsidian-mcp-tools). I’ve started using it as a destination for all sorts of things with Claude as my interpreter: great articles I want to index (summarized, tagged, etc), project notes and ideas, learnings, LD-specifics (I can never remember the details of our [event schema](/home/integrations/data-export/schema-reference!)
### Claude: Daily Driver
Claude can be extended in many ways. Here’s what I’m experimenting with at the moment:
 * `/create-pr`: custom command to create a pull request against the current repo that asks for a JIRA issue key and relies on our GitHub PR template for description.
 * `PostToolUse` linter: custom hook that runs our linter/formatter on files that Claude modifies.
 * 🚧 Sadly, this isn’t awesome right now because our frontend tooling is still quite slow. We’re working on improving that!
 * But one cool tidbit: Claude wrote a little Python script to run all the necessary checks instead of trying to wrangle shell commands to only run relevant checks. (I do wonder if hooks can invoke custom agents. 🤔)
 * `@code-reviewer`: agent that runs all our lint checks Trying this instead of the hook so I can make sure all that work happens out of my main (LLM) context, on-demand. Asking Claude to incorporate this agent into your verification plan can help you automate further.
 * `@feature-flagger`: **“Build this thing, flag it, and enable it on catfood for my team”.** (Small way of dogfooding [LaunchDarkly’s nascent MCP server](/docs/home/getting-started/mcp) too!)
Ok, but real **talk**. The single most effective trick for me has been to talk to it; I’ve found that more effective for getting things moving in the direction I want. Automations help, but not everything can be automated. And they come with tradeoffs. Like agents, who need to be orchestrated carefully to mitigate the effect of context branching. Speaking of talking, I’ve been trying out using dictation. Takes some getting used to for sure, but it’s kinda fun, and it’s been quite reliable in my few attempts.
## A note on mental disengagement
Effectiveness has been a double-edged sword for me. LLMs and the information density of natural language feel magic. It’s easy to ask for the world, sit back, relax, and go scroll Twitter… (I’ve **never** done that.) I do struggle with this, though. It can be almost too easy to feel productive, with little to show in the end. And if you don’t pay attention and disengage your quality barometer, you’ll waste time in the long run. Ultimately, staying close to the model has been the most effective “hack”. It helps me catch the effect of a vague prompt, a broken tool call, etc., early. I interrupt Claude frequently to tweak its trajectory. Custom hooks, commands, and agents can help for sure, though, like any tool, they come with tradeoffs. Stay engaged!
## Conclusion
If there’s one thing I hope you take away from this post, it’s that while these tools are in their infancy, often overhyped, and chock-full of tradeoffs— they have **potential**! We need to play with them, experiment, and understand what’s effective and what is less so. What works well? What does not work well? As builders, we have to figure that out! If something doesn’t work well, what can we do to make it better? It can be discouraging, just plain weird (did you know asking Claude to “SUPERTHINK” is a documented thing? 🤣). But you’re a builder! Ignore the hype. Rely on what you know, research, experiment, collaborate, and solve problems! With a little help from our new friends.
## Links and readings
 * [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/overview)
 * [Prompts are code, .json/.md files are state](https://mariozechner.at/posts/2025-06-02-prompts-are-code/)
 * [Coding with LLMs in the summer of 2025 (an update) - <antirez>](<https://antirez.com/news/154>)
 * [Why I’m Betting Against AI Agents in 2025 (Despite Building Them)](https://utkarshkanwat.com/writing/betting-against-agents/)
 * [fast | catherine jue](https://www.catherinejue.com/fast)
 * [Zed — The editor for what’s next](https://zed.dev/)
 * [gitui](https://github.com/gitui-org/gitui)
 * [Ghostty](https://ghostty.org/)
 * [Obsidian](https://obsidian.md/)
 * [Ted Chiang on Ezra Klein’s podcast](https://www.nytimes.com/2021/03/30/podcasts/ezra-klein-podcast-ted-chiang-transcript.html)
 * I think a lot about this, almost every time I interact with Claude. ❤️
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs