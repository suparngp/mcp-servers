[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [How to access it](#how-to-access-it)
 * [How it works](#how-it-works)
 * [Visually hiding secrets](#visually-hiding-secrets)
 * [Case sensitivity](#case-sensitivity)
 * [Secret Regex List](#secret-regex-list)
Was this helpful?
## 
[](#how-to-access-it)
How to access it
Disabled by default, to enable Secret Redaction open `Settings > Privacy > Secret redaction` or type in "Secret Redaction" to toggle it in the [Command Palette](/terminal/command-palette).
## 
[](#how-it-works)
How it works
Secret Redaction attempts to detect sensitive data (including secrets, passwords, API keys, and PII) using your list of regex patterns. Any identified secret will be redacted instead of being sent to our servers or any LLM provider. Additionally, Warp Drive will prevent you from saving any secrets in plain text (workflows, MCP servers, prompts, etc.). Warp ships with a [list of recommended regex](/privacy/secret-redaction#secret-regex-list) you can easily add to the list. Additionally you can add custom regex for secrets you want to include in `Settings > Privacy > Secret redaction > Custom secret redaction`.
## 
[](#visually-hiding-secrets)
Visually hiding secrets
By default, identified secrets will be displayed with a strikethrough visual treatment, i.e. `echo ``~~password~~`.
If instead you'd prefer to visually hide the secrets as well, i.e. `echo ********`, the setting to obfuscate secrets with asterisks can be found in `Settings > Privacy > Secret redaction > Hide secrets in blocklist`.
Clicking on a secret will display a tooltip that lets you reveal the secret or copy the secret's contents. When trying to copy terminal output containing secrets, it will be copied as asterisks (e.g. `echo password` becomes `echo ********`) unless revealed or copied from the tooltip. Secret redaction is not applied in [Session Sharing](/knowledge-and-collaboration/session-sharing).
## 
[](#case-sensitivity)
Case sensitivity
Secret redaction regexes are case-sensitive by default (i.e. the regex `password` will not match the text `Password`). If you want a regex to be case-sensitive, you can prepend `(?i)` like so: `(?i)password` to ensure that `PASSWORD`, `Password`, and `password` would all match.
## 
[](#secret-regex-list)
Secret Regex List
Here is a list of the recommended regular expressions that Warp uses to identify secrets:
Secret Type
Regex Pattern
IP V4 Address
`\b((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}\b`
IP V6 Address
`\b((([0-9A-Fa-f]{1,4}:){1,6}:)|(([0-9A-Fa-f]{1,4}:){7}))([0-9A-Fa-f]{1,4})\b`
Slack App Token
`\bxapp-[0-9]+-[A-Za-z0-9_]+-[0-9]+-[a-f0-9]+\b`
Phone Number
`\b(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b`
AWS Access ID
`\b(AKIA|A3T|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{12,}\b`
MAC Address
`\b((([a-zA-z0-9]{2}[-:]){5}([a-zA-z0-9]{2}))|(([a-zA-z0-9]{2}:){5}([a-zA-z0-9]{2})))\b`
Google API Key
`\bAIza[0-9A-Za-z-_]{35}\b`
Google OAuth ID
`\b[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com\b`
Github Classic Personal Access Token
`\bghp_[A-Za-z0-9_]{36}\b`
Github Fine Grained Personal Access Token
`\bgithub_pat_[A-Za-z0-9_]{82}\b`
Github OAuth Access Token
`\bgho_[A-Za-z0-9_]{36}\b`
Github User to Server Token
`\bghu_[A-Za-z0-9_]{36}\b`
Github Server to Server Token
`\bghs_[A-Za-z0-9_]{36}\b`
Stripe Key
`\b(?:r|s)k_(test|live)_[0-9a-zA-Z]{24}\b`
Firebase Auth Domain
`\b([a-z0-9-]){1,30}(\.firebaseapp\.com)\b`
JSON web token
`\b(ey[a-zA-z0-9_\-=]{10,}\.){2}[a-zA-z0-9_\-=]{10,}\b`
OpenAI API Key
`\bsk-[a-zA-Z0-9]{48}\b`
Anthropic API Key
`\bsk-ant-api\d{0,2}-[a-zA-Z0-9\-]{80,120}\b`
Fireworks API Key
`\bfw_[a-zA-Z0-9]{24}\b`
[PreviousPrivacy](/privacy/privacy)[NextNetwork Log](/privacy/network-log)
Last updated 3 months ago
Was this helpful?