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
 * [Opening the Code Review panel](#opening-the-code-review-panel)
 * [Reviewing diffs](#reviewing-diffs)
 * [Opening Files from Code Review](#opening-files-from-code-review)
Was this helpful?
When you are working locally in a Git repository with uncommitted changes, the **Code Review panel** lets you inspect, edit, and manage code changes directly inside Warp. It integrates with Git and Warp's Agents, giving you the ability to:
 * Review diffs and attach them as context for the Agent
 * Apply, edit, or revert changes in real time
 * See changes made outside of Warp or by Warp's Agents automatically reflected
Any uncommitted changes appear in the panel (or compare the changes on your branch against `main` or `master` ). Switching branches or saving files updates the panel instantly, so it always reflects the current state of your codebase.
Code Review Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fk4YQEn3fXc9HQilmek0y%252Ffull%2520view.png%3Falt%3Dmedia%26token%3D08c9aa6e-5811-464b-8ad6-3f6eabcfef7a&width=768&dpr=4&quality=100&sign=92bdbb01&sv=2)
Full view of Code Review panel and terminal pane.
## 
[](#opening-the-code-review-panel)
Opening the Code Review panel
The Code Review panel can be opened in several ways. Each entry point makes it easy to inspect and manage changes without leaving your workflow.
#### 
[](#id-1.-universal-input-git-diff-chip)
1. Universal Input: Git diff chip 
In the [Universal Input](/terminal/universal-input) editor, when you’re in a Git repository with changes, the chip shows the number of files modified along with lines added and removed. Clicking the chip opens the Code Review panel with the relevant diffs.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FdDelZ9CmOSeQwDwXkCS9%252Fwhole%2520UDI%2520bar.png%3Falt%3Dmedia%26token%3D5fef63fd-bf14-401a-9d47-d49bce69b837&width=768&dpr=4&quality=100&sign=f8b995ad&sv=2)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F3JHDfp88lEZtLG0dkGB7%252Fgit%2520chip%2520tooltip%25201.png%3Falt%3Dmedia%26token%3D91b813e2-7bf8-4432-ac3a-cc3760b46f97&width=768&dpr=4&quality=100&sign=50f80ccd&sv=2)
#### 
[](#id-2.-agent-conversation-review-changes-button)
2. Agent Conversation: Review Changes Button
When an Agent makes code edits in an [Agent Conversations](/agents/using-agents/agent-conversations), a `Review changes` button appears at the bottom of the conversation. Clicking it opens the code review panel.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F8Xb0rD7AyrUc46vMwJrj%252FBlocklist%2520with%2520review%2520changes.png%3Falt%3Dmedia%26token%3Da17e62ba-113f-4670-b937-527fa81f35bc&width=768&dpr=4&quality=100&sign=bf48b318&sv=2)
Review changes at bottom of Agent Conversation.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FmieWaAP3Bhu4M8Ky1l2V%252Freview%2520changes%2520in%2520footer.png%3Falt%3Dmedia%26token%3Daf41e123-3bd2-483a-b82b-18c62b7c989e&width=768&dpr=4&quality=100&sign=8c2467c&sv=2)
#### 
[](#id-3.-agent-conversation-toolbelt-bottom-right)
3. Agent Conversation: Toolbelt (Bottom Right)
During an Agent conversation, you can view all changed files in the toolbelt chips at the persistent bottom right. From there, you can open the Code Review panel directly.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F0ySVcVnzurJmM3dIHsDF%252FCopy%2520of%2520AI%2520control%2520panel%2520buttons%2520larger%2520view.png%3Falt%3Dmedia%26token%3D5d7b0a10-e5c6-4dd7-aac2-320b68d747c2&width=768&dpr=4&quality=100&sign=50d13c2&sv=2)
#### 
[](#id-4.-pane-toolbelt-buttons)
4. Pane Toolbelt Buttons
In the top-left of any pane in a Git-tracked repository, clicking the plus/minus icon opens the Code Review panel for reviewing changes.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FY7g38DhEXZl1SNfQuWbA%252FCode%2520toolbelt%2520buttons%2520in%2520pane%2520header.png%3Falt%3Dmedia%26token%3De50a1aaa-f8d1-4cf1-bd72-0c00e42dce2c&width=768&dpr=4&quality=100&sign=54a91332&sv=2)
#### 
[](#viewing-all-edited-files)
Viewing All Edited Files
Inside the Code Review panel, you can open the file sidebar to browse all changed files in your repository. Clicking on a file will automatically scroll to that file in the panel.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FioDBACwhV6WGojwjajvC%252Fwhole%2520git%2520diff%2520view%2520with%2520one%2520file%2520collapsed.png%3Falt%3Dmedia%26token%3D4b3d4e6b-1a79-471b-b502-e45562a6ffa8&width=768&dpr=4&quality=100&sign=8cf3d3f3&sv=2)
Viewing all edited files in the code review panel, with the file sidebar open.
By default, the Code Review panel opens as a pane on the right, but you can drag it to reposition wherever you prefer.
## 
[](#reviewing-diffs)
Reviewing diffs
By default, the Code Review panel shows all **uncommitted changes** on your current branch, excluding changes to files ignored by `.gitignore`. 
Warp offers two ways to review changes:
 1. **Uncommitted changes** : view all edits you've made locally on the current branch.
 2. **Changes vs. main** : compare your branch against `main` or `master` to see what would be included in a pull request to that branch, for instance.
 1. Warp automatically detects the target branch and updates the comparison accordingly.
You can manually switch between the two views either in the Code Review panel or via the unviersal input chip:
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FArrmTLgV5RtzfmXITHxR%252Fdiff%2520dropdown%2520to%2520change%2520base%2520from%2520the%2520code%2520review%2520pane.png%3Falt%3Dmedia%26token%3D12a49d45-8041-40c1-9bf9-1c2d4c5a96a0&width=768&dpr=4&quality=100&sign=83924b58&sv=2)
Changing diff view in the Code Review Panel.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fg7r6YvOzFmBMFtOV9CUO%252Fgit%2520diff%2520change%2520base%2520dropdown.png%3Falt%3Dmedia%26token%3Dfbe41eab-eea0-4686-ac34-2931408570b1&width=768&dpr=4&quality=100&sign=92b44ecb&sv=2)
Changing diff view in the Universal input.
Any saved edits made outside of Warp (e.g. in another editor), as well as changes applied by Warp's Agents, appear automatically. The panel updates in real time, ensuring it always reflects the current state of your working file and directory.
#### 
[](#attaching-diffs-as-context)
Attaching diffs as context
The Code Review pane makes it simple to share changes with the Agent. You can attach an entire diff to a prompt so the Agent has full visibility into what was added or removed. 
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F915ZqiNoSVD5n8VYw8Wh%252FScreenshot%25202025-09-02%2520at%25207.15.53%25E2%2580%25AFPM.png%3Falt%3Dmedia%26token%3D7068c7db-8799-4f60-a0e9-9ce8c531c78b&width=768&dpr=4&quality=100&sign=dfd53c3&sv=2)
Attaching a diff as context from the Code Review panel.
This ensures responses are grounded in your latest edits, whether you’re asking for feedback, explanations, or follow-up changes. For more details, see [Selection as Context](/agents/using-agents/agent-context/selection-as-context).
#### 
[](#reverting-diffs)
Reverting diffs
The Code Review panel lets you easily undo changes at different levels. In the gutter next to each diff, you’ll see an option to revert a hunk: roll back a specific set of changes (a “diff hunk”) within a file. This removes the added or modified lines and restores the previous version.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FAimchi6OLSyadUX7T4lt%252Frevert%2520diff%2520hunk.png%3Falt%3Dmedia%26token%3D2ba4959d-de8f-4c19-9b74-435be132944f&width=768&dpr=4&quality=100&sign=72c7df09&sv=2)
When you revert, the changes are immediately updated in your working directory. The file is restored to match the selected version, so you can continue editing or commit without the reverted code.
### 
[](#opening-files-from-code-review)
Opening Files from Code Review
In addition to reviewing and editing diffs directly in the Code Review pane, you can open a file directly in Warp’s [Code Editor](/code/code-editor). Each file listed in the Code Review pane includes an expand button in the top-right corner of its diff view.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FuJ7FH5WWwAZmzAmxjjL8%252FOpen%2520file%2520in%2520new%2520tab.png%3Falt%3Dmedia%26token%3D593d4147-343d-4b39-8043-dc2e2ed336d1&width=768&dpr=4&quality=100&sign=572ac62d&sv=2)
 * Clicking the expand button opens the file in a new editor tab, allowing you to see the full file beyond just the changed lines.
 * This is useful when you need additional context around a diff, want to make broader edits, or prefer working in the full editor rather than inline.
 * Once opened, the file behaves like any other editor tab: you can scroll, edit, search, and save.
 * Any changes made in the editor automatically sync back into the Code Review pane, so the diff view always stays current.
#### 
[](#directly-editing-code-diffs)
Directly editing code diffs
Alternatively, from the Code Review panel, you are able to click and edit the diffs directly:
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FXf6UHKKjPLWkZR9arrCs%252FEditing%2520in%2520Code%2520Review%2520GIF%2520from%2520ezgif%2520%281%29.gif%3Falt%3Dmedia%26token%3D99188b11-d617-4be2-94a3-d95a8f64cc97&width=768&dpr=4&quality=100&sign=d3f070c5&sv=2)
[PreviousCodebase Context](/code/codebase-context)[NextCode Diffs in Agent Conversations](/code/reviewing-code)
Last updated 1 month ago
Was this helpful?