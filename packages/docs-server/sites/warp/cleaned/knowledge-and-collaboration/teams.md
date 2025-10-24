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
 * [What is a team?](#what-is-a-team)
 * [Creating a team](#creating-a-team)
 * [Inviting new team members](#inviting-new-team-members)
 * [Restricting team invites by domain](#restricting-team-invites-by-domain)
 * [Joining a team](#joining-a-team)
 * [Leaving and deleting teams](#leaving-and-deleting-teams)
 * [Team discoverability](#team-discoverability)
 * [Transferring team admin](#transferring-team-admin)
 * [Team roles and permissions](#team-roles-and-permissions)
Was this helpful?
## 
[](#what-is-a-team)
What is a team?
A team is a group of Warp users who can collaborate on the command line together. Warp teams can share a dedicated workspace in Warp Drive. [Learn about pricing](https://www.warp.dev/pricing) and see our [Pricing FAQ](/support-and-billing/plans-and-pricing).
Currently, each Warp user can only be an admin or member of one team at a time.
Teams Demo
## 
[](#creating-a-team)
Creating a team
You can create a new team in the following ways:
 * Warp Drive, + Create a team
 * `Settings > Teams`
Before you can invite team members, you will need to give your team a meaningful name. We suggest using a name to represent your organization, company, or project. 
You can rename the team by going to `Settings > Teams` and clicking on the team name, entering the new name, and pressing `ENTER` to accept.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-912c5f1cedfe6117a4f41db2b40fb97cf29907c1%252Fteam-creation-settings.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=986cc3b4&sv=2)
If you create a team, you become the team’s admin and will be the only person who can delete the team. Reference [Team roles and permissions](/knowledge-and-collaboration/teams#team-roles-and-permissions) for more info.
### 
[](#inviting-new-team-members)
Inviting new team members
Under `Settings > Teams` you can copy the invite link for your Warp team and paste it to your clipboard.
If you’re on a paid plan, upgrading will automatically include all team members in your billing. Adding new members after upgrading will also add them as paid seats.
For more details on how team member billing works, please see our billing FAQs:
[What counts as a team member and how does billing work for members?](/support-and-billing/plans-and-pricing#what-counts-as-a-team-member-and-how-does-billing-work-for-members)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b8ce320cfed05ef448e4ee97e8c7be4dbc7c6214%252Fteams-invite-demo.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=88a16f78&sv=2)
Teams settings panel
When you share this link with your teammates directly (we suggest using a secure channel like Slack or email), they will be able to join your team in Warp.
## 
[](#restricting-team-invites-by-domain)
Restricting team invites by domain
Sometimes you may want to control your team so that people can only join if they also authenticate with a specific email domain, such as your company’s email domain.
Toggle on Restrict by domain to set an explicit allowlist.
If you share an invite link with somebody who’s using Warp with a domain that does not match your allowlist, they will be prompted to authenticate from an emailed link sent to a matching domain to join your team.
## 
[](#joining-a-team)
Joining a team
If you have received an invite link, you can use that link to sign up or log in and join your team in Warp. If your team is using domain restriction, you will need to authenticate you have access to a specific domain before you can join your team.
## 
[](#leaving-and-deleting-teams)
Leaving and deleting teams
If you’re a member of a team, you can visit `Settings > Teams` to leave a team at any time. Team admins (who created teams) may delete a team only after removing all team members.
## 
[](#team-discoverability)
Team discoverability
Team admins can make their teams discoverable to colleagues from the same email domain. This feature is available under `Settings > Teams > Make team discoverable`.
While discoverability is enabled, any new user who joins the team will add a prorated charge to the team's next month's bill. See more in our [pricing docs](/support-and-billing/plans-and-pricing#what-counts-as-a-team-member-and-how-does-billing-work-for-members).
## 
[](#transferring-team-admin)
Transferring team admin
Team admins can transfer their role to another team member by going to `Settings > Teams > Transfer admin` and selecting the member to whom you'd like to transfer the admin role.
## 
[](#team-roles-and-permissions)
Team roles and permissions
If you're a Team admin, and you choose to [delete your Warp](/privacy/privacy#manage-your-data) account, the deletion flow will require that you assign a team member as the new admin.
Admin
Member
This is the Warp user who created a team. There can only be one.
All team members who belong to a team.
Create a team
✓
Restrict by domain
✓
Invite members
✓
✓
Remove team members
✓
Leave a team
✓
Delete a team
✓
Transfer admin
✓
[Manage billing](/support-and-billing/plans-and-pricing)
✓
[PreviousRules](/knowledge-and-collaboration/rules)[NextAdmin Panel](/knowledge-and-collaboration/admin-panel)
Last updated 22 days ago
Was this helpful?