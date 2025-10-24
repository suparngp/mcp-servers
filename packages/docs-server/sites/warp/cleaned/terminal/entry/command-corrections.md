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
 * [Command Corrections](/terminal/entry/command-corrections)
 * [Command Search](/terminal/entry/command-search)
 * [Command History](/terminal/entry/command-history)
 * [Synchronized Inputs](/terminal/entry/synchronized-inputs)
 * [YAML Workflows](/terminal/entry/yaml-workflows)
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
 * [What is it](#what-is-it)
 * [How to access it](#how-to-access-it)
 * [How it works](#how-it-works)
Was this helpful?
## 
[](#what-is-it)
What is it
This feature was built on top of the open-source project [nvdn/thefuck](https://github.com/nvbn/thefuck). Here are some examples that the Warp team usually finds Command Corrections useful for:
 * Misspelled commands
 * `gti checkout myBranchName` -> `git checkout myBranchName`
 * `cd ap/sorce/executtor` -> `cd app/source/executor`
 * Missing flags
 * `git push` -> `git push –set-upstream myBranchName`
 * Add permissions
 * `./script` -> `chmod +x ./script && ./script`
## 
[](#how-to-access-it)
How to access it
 * Command Corrections is enabled by default. You can disable Command Corrections by going to `Settings > Features` > toggle “Suggest corrected commands”.
 * After an incorrect command is run, a panel with the corrected command suggestion appears above the Input Editor. `CLICK` or press the `RIGHT` arrow to insert the suggestion.
## 
[](#how-it-works)
How it works
Command Corrections Demo
#### 
[](#command-correction-rules)
Command Correction Rules:
Command
brew
cargo
cat
cd
chmod
conda
cp
docker
generic (command agnostic, e.g. mis-spelling executable name)
git
go
grep
java
ls
mkdir
npm
pip
python
sed
sudo
yarn
[PreviousCommand Entry](/terminal/entry)[NextCommand Search](/terminal/entry/command-search)
Last updated 11 months ago
Was this helpful?