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
/api/v2/members
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/members \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '{
5
| "instructions": [
6
| {
7
| "kind": "replaceMembersRoles",
8
| "memberIDs": [
9
| "1234a56b7c89d012345e678f",
10
| "507f1f77bcf86cd799439011"
11
| ],
12
| "value": "reader"
13
| }
14
| ],
15
| "comment": "Optional comment about the update"
16
| }'
```
[](/docs/api/account-members/patch-members?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "members": [
3
| "1234a56b7c89d012345e678f"
4
| ],
5
| "errors": [
6
| {
7
| "507f1f77bcf86cd799439011": "you cannot modify your own role"
8
| }
9
| ]
10
| }
```
> ### Full use of this API resource is an Enterprise feature > > The ability to perform a partial update to multiple members is available to customers on an Enterprise plan. If you are on another plan, you can update members individually. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/). Perform a partial update to multiple members. Updating members uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating members. <details> <summary>Click to expand instructions for <strong>updating members</strong></summary> #### replaceMembersRoles Replaces the roles of the specified members. This also removes all custom roles assigned to the specified members. ##### Parameters - `value`: The new role. Must be a valid [base role](https://launchdarkly.com/docs/home/getting-started/vocabulary#base-role). To learn more, read [Roles](https://launchdarkly.com/docs/home/account/roles). - `memberIDs`: List of member IDs. Here's an example: ```json { "instructions": [{ "kind": "replaceMembersRoles", "value": "reader", "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### replaceAllMembersRoles Replaces the roles of all members. This also removes all custom roles assigned to the specified members. Members that match any of the filters are **excluded** from the update. ##### Parameters - `value`: The new role. Must be a valid [base role](https://launchdarkly.com/docs/home/getting-started/vocabulary#base-role). To learn more, read [Roles](https://launchdarkly.com/docs/home/account/roles). - `filterLastSeen`: (Optional) A JSON object with one of the following formats: - `{"never": true}` - Members that have never been active, such as those who have not accepted their invitation to LaunchDarkly, or have not logged in after being provisioned via SCIM. - `{"noData": true}` - Members that have not been active since LaunchDarkly began recording last seen timestamps. - `{"before": 1608672063611}` - Members that have not been active since the provided value, which should be a timestamp in Unix epoch milliseconds. - `filterQuery`: (Optional) A string that matches against the members' emails and names. It is not case sensitive. - `filterRoles`: (Optional) A `|` separated list of roles and custom roles. For the purposes of this filtering, `Owner` counts as `Admin`. - `filterTeamKey`: (Optional) A string that matches against the key of the team the members belong to. It is not case sensitive. - `ignoredMemberIDs`: (Optional) A list of member IDs. Here's an example: ```json { "instructions": [{ "kind": "replaceAllMembersRoles", "value": "reader", "filterLastSeen": { "never": true } }] } ``` #### replaceMembersCustomRoles Replaces the custom roles of the specified members. ##### Parameters - `values`: List of new custom roles. Must be a valid custom role key or ID. - `memberIDs`: List of member IDs. Here's an example: ```json { "instructions": [{ "kind": "replaceMembersCustomRoles", "values": [ "example-custom-role" ], "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### replaceAllMembersCustomRoles Replaces the custom roles of all members. Members that match any of the filters are **excluded** from the update. ##### Parameters - `values`: List of new roles. Must be a valid custom role key or ID. - `filterLastSeen`: (Optional) A JSON object with one of the following formats: - `{"never": true}` - Members that have never been active, such as those who have not accepted their invitation to LaunchDarkly, or have not logged in after being provisioned via SCIM. - `{"noData": true}` - Members that have not been active since LaunchDarkly began recording last seen timestamps. - `{"before": 1608672063611}` - Members that have not been active since the provided value, which should be a timestamp in Unix epoch milliseconds. - `filterQuery`: (Optional) A string that matches against the members' emails and names. It is not case sensitive. - `filterRoles`: (Optional) A `|` separated list of roles and custom roles. For the purposes of this filtering, `Owner` counts as `Admin`. - `filterTeamKey`: (Optional) A string that matches against the key of the team the members belong to. It is not case sensitive. - `ignoredMemberIDs`: (Optional) A list of member IDs. Here's an example: ```json { "instructions": [{ "kind": "replaceAllMembersCustomRoles", "values": [ "example-custom-role" ], "filterLastSeen": { "never": true } }] } ``` #### replaceMembersRoleAttributes Replaces the role attributes of the specified members. ##### Parameters - `value`: Map of role attribute keys to lists of values. - `memberIDs`: List of member IDs. Here's an example: ```json { "instructions": [{ "kind": "replaceMembersRoleAttributes", "value": { "myRoleProjectKey": ["mobile", "web"], "myRoleEnvironmentKey": ["production"] }, "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` </details>
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
Members response
memberslist of strings or null
A list of members IDs of the members who were successfully updated.
errorslist of maps from strings to strings or null
A list of member IDs and errors for the members whose updates failed.
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
> ### Full use of this API resource is an Enterprise feature
> The ability to perform a partial update to multiple members is available to customers on an Enterprise plan. If you are on another plan, you can update members individually. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
Perform a partial update to multiple members. Updating members uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating members.
Click to expand instructions for **updating members**
#### replaceMembersRoles
Replaces the roles of the specified members. This also removes all custom roles assigned to the specified members.
##### Parameters
 * `value`: The new role. Must be a valid [base role](https://launchdarkly.com/docs/home/getting-started/vocabulary#base-role). To learn more, read [Roles](https://launchdarkly.com/docs/home/account/roles).
 * `memberIDs`: List of member IDs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceMembersRoles",
4
| "value": "reader",
5
| "memberIDs": [
6
| "1234a56b7c89d012345e678f",
7
| "507f1f77bcf86cd799439011"
8
| ]
9
| }]
10
| }
```
#### replaceAllMembersRoles
Replaces the roles of all members. This also removes all custom roles assigned to the specified members.
Members that match any of the filters are **excluded** from the update.
##### Parameters
 * `value`: The new role. Must be a valid [base role](https://launchdarkly.com/docs/home/getting-started/vocabulary#base-role). To learn more, read [Roles](https://launchdarkly.com/docs/home/account/roles).
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
| "kind": "replaceAllMembersRoles",
4
| "value": "reader",
5
| "filterLastSeen": { "never": true }
6
| }]
7
| }
```
#### replaceMembersCustomRoles
Replaces the custom roles of the specified members.
##### Parameters
 * `values`: List of new custom roles. Must be a valid custom role key or ID.
 * `memberIDs`: List of member IDs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceMembersCustomRoles",
4
| "values": [ "example-custom-role" ],
5
| "memberIDs": [
6
| "1234a56b7c89d012345e678f",
7
| "507f1f77bcf86cd799439011"
8
| ]
9
| }]
10
| }
```
#### replaceAllMembersCustomRoles
Replaces the custom roles of all members. Members that match any of the filters are **excluded** from the update.
##### Parameters
 * `values`: List of new roles. Must be a valid custom role key or ID.
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
| "kind": "replaceAllMembersCustomRoles",
4
| "values": [ "example-custom-role" ],
5
| "filterLastSeen": { "never": true }
6
| }]
7
| }
```
#### replaceMembersRoleAttributes
Replaces the role attributes of the specified members.
##### Parameters
 * `value`: Map of role attribute keys to lists of values.
 * `memberIDs`: List of member IDs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceMembersRoleAttributes",
4
| "value": {
5
| "myRoleProjectKey": ["mobile", "web"],
6
| "myRoleEnvironmentKey": ["production"]
7
| },
8
| "memberIDs": [
9
| "1234a56b7c89d012345e678f",
10
| "507f1f77bcf86cd799439011"
11
| ]
12
| }]
13
| }
```