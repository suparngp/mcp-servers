`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Overview](/docs/api)
 * [Access Tokens](/docs/api/access-tokens)
 * [Account Members](/docs/api/account-members)
 * [Account Usage Beta](/docs/api/account-usage-beta)
 * [AI Configs Beta](/docs/api/ai-configs-beta)
 * [Announcements](/docs/api/announcements)
 * [Applications Beta](/docs/api/applications-beta)
 * [Approvals](/docs/api/approvals)
 * [Approvals Beta](/docs/api/approvals-beta)
 * [Audit Log](/docs/api/audit-log)
 * [Code References](/docs/api/code-references)
 * [Contexts](/docs/api/contexts)
 * [Context Settings](/docs/api/context-settings)
 * [Custom Roles](/docs/api/custom-roles)
 * [Data Export Destinations](/docs/api/data-export-destinations)
 * [Environments](/docs/api/environments)
 * [Experiments](/docs/api/experiments)
 * [Feature Flags](/docs/api/feature-flags)
 * [Feature Flags Beta](/docs/api/feature-flags-beta)
 * [Flag Import Configurations Beta](/docs/api/flag-import-configurations-beta)
 * [Flag Links Beta](/docs/api/flag-links-beta)
 * [Flag Triggers](/docs/api/flag-triggers)
 * [Follow Flags](/docs/api/follow-flags)
 * [Holdouts Beta](/docs/api/holdouts-beta)
 * [Insights Charts Beta](/docs/api/insights-charts-beta)
 * [Insights Deployments Beta](/docs/api/insights-deployments-beta)
 * [Insights Flag Events Beta](/docs/api/insights-flag-events-beta)
 * [Insights Pull Requests Beta](/docs/api/insights-pull-requests-beta)
 * [Insights Repositories Beta](/docs/api/insights-repositories-beta)
 * [Insights Scores Beta](/docs/api/insights-scores-beta)
 * [Integration Audit Log Subscriptions](/docs/api/integration-audit-log-subscriptions)
 * [Integration Delivery Configurations Beta](/docs/api/integration-delivery-configurations-beta)
 * [Integrations Beta](/docs/api/integrations-beta)
 * [Layers](/docs/api/layers)
 * [Metrics](/docs/api/metrics)
 * [Metrics Beta](/docs/api/metrics-beta)
 * [O Auth2clients](/docs/api/o-auth-2-clients)
 * [Persistent Store Integrations Beta](/docs/api/persistent-store-integrations-beta)
 * [Projects](/docs/api/projects)
 * [Relay Proxy Configurations](/docs/api/relay-proxy-configurations)
 * [Release Pipelines Beta](/docs/api/release-pipelines-beta)
 * [Releases Beta](/docs/api/releases-beta)
 * [Scheduled Changes](/docs/api/scheduled-changes)
 * [Segments](/docs/api/segments)
 * [Tags](/docs/api/tags)
 * [Teams](/docs/api/teams)
 * [Teams Beta](/docs/api/teams-beta)
 * [Users](/docs/api/users)
 * [Users Beta](/docs/api/users-beta)
 * [User Settings](/docs/api/user-settings)
 * [Views Beta](/docs/api/views-beta)
 * [Webhooks](/docs/api/webhooks)
 * [Workflows](/docs/api/workflows)
 * [Workflow Templates](/docs/api/workflow-templates)
 * [Other](/docs/api/other)
 * Release Policies Beta
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
PATCH
/api/v2/teams
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/teams"
4
| 
5
| payload = {
6
| "instructions": [
7
| {
8
| "kind": "addMembersToTeams",
9
| "memberIDs": ["1234a56b7c89d012345e678f"],
10
| "teamKeys": ["example-team-1", "example-team-2"]
11
| }
12
| ],
13
| "comment": "Optional comment about the update"
14
| }
15
| headers = {
16
| "Authorization": "<apiKey>",
17
| "Content-Type": "application/json"
18
| }
19
| 
20
| response = requests.patch(url, json=payload, headers=headers)
21
| 
22
| print(response.json())
```
[](/docs/api/teams-beta/patch-teams?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "memberIDs": [
3
| "1234a56b7c89d012345e678f"
4
| ],
5
| "teamKeys": [
6
| "example-team-1"
7
| ],
8
| "errors": [
9
| {
10
| "example-team-2": "example failure message"
11
| }
12
| ]
13
| }
```
Perform a partial update to multiple teams. Updating teams uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating teams. <details> <summary>Click to expand instructions for <strong>updating teams</strong></summary> #### addMembersToTeams Add the members to teams. ##### Parameters - `memberIDs`: List of member IDs to add. - `teamKeys`: List of teams to update. Here's an example: ```json { "instructions": [{ "kind": "addMembersToTeams", "memberIDs": [ "1234a56b7c89d012345e678f" ], "teamKeys": [ "example-team-1", "example-team-2" ] }] } ``` #### addAllMembersToTeams Add all members to the team. Members that match any of the filters are **excluded** from the update. ##### Parameters - `teamKeys`: List of teams to update. - `filterLastSeen`: (Optional) A JSON object with one of the following formats: - `{"never": true}` - Members that have never been active, such as those who have not accepted their invitation to LaunchDarkly, or have not logged in after being provisioned via SCIM. - `{"noData": true}` - Members that have not been active since LaunchDarkly began recording last seen timestamps. - `{"before": 1608672063611}` - Members that have not been active since the provided value, which should be a timestamp in Unix epoch milliseconds. - `filterQuery`: (Optional) A string that matches against the members' emails and names. It is not case sensitive. - `filterRoles`: (Optional) A `|` separated list of roles and custom roles. For the purposes of this filtering, `Owner` counts as `Admin`. - `filterTeamKey`: (Optional) A string that matches against the key of the team the members belong to. It is not case sensitive. - `ignoredMemberIDs`: (Optional) A list of member IDs. Here's an example: ```json { "instructions": [{ "kind": "addAllMembersToTeams", "teamKeys": [ "example-team-1", "example-team-2" ], "filterLastSeen": { "never": true } }] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
The instructions to perform when updating. This should be an array with objects that look like <code>{“kind”: “update_action”}</code>. Some instructions also require additional parameters as part of this object.
commentstringOptional
Optional comment describing the update
### Response
Teams response
memberIDslist of strings or null
A list of member IDs of the members who were added to the teams.
teamKeyslist of strings or null
A list of team keys of the teams that were successfully updated.
errorslist of maps from strings to strings or null
A list of team keys and errors for the teams whose updates failed.
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Perform a partial update to multiple teams. Updating teams uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating teams.
Click to expand instructions for **updating teams**
#### addMembersToTeams
Add the members to teams.
##### Parameters
 * `memberIDs`: List of member IDs to add.
 * `teamKeys`: List of teams to update.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addMembersToTeams",
4
| "memberIDs": [
5
| "1234a56b7c89d012345e678f"
6
| ],
7
| "teamKeys": [
8
| "example-team-1",
9
| "example-team-2"
10
| ]
11
| }]
12
| }
```
#### addAllMembersToTeams
Add all members to the team. Members that match any of the filters are **excluded** from the update.
##### Parameters
 * `teamKeys`: List of teams to update.
 * `filterLastSeen`: (Optional) A JSON object with one of the following formats:
 * `{"never": true}` - Members that have never been active, such as those who have not accepted their invitation to LaunchDarkly, or have not logged in after being provisioned via SCIM.
 * `{"noData": true}` - Members that have not been active since LaunchDarkly began recording last seen timestamps.
 * `{"before": 1608672063611}` - Members that have not been active since the provided value, which should be a timestamp in Unix epoch milliseconds.
 * `filterQuery`: (Optional) A string that matches against the members’ emails and names. It is not case sensitive.
 * `filterRoles`: (Optional) A `|` separated list of roles and custom roles. For the purposes of this filtering, `Owner` counts as `Admin`.
 * `filterTeamKey`: (Optional) A string that matches against the key of the team the members belong to. It is not case sensitive.
 * `ignoredMemberIDs`: (Optional) A list of member IDs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addAllMembersToTeams",
4
| "teamKeys": [
5
| "example-team-1",
6
| "example-team-2"
7
| ],
8
| "filterLastSeen": { "never": true }
9
| }]
10
| }
```