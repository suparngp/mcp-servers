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
/api/v2/projects/:projectKey/flags/:featureFlagKey/environments/:environmentKey/scheduled-changes/:id
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/flags/featureFlagKey/environments/environmentKey/scheduled-changes/id"
4
| 
5
| payload = {
6
| "instructions": [
7
| {
8
| "kind": "replaceScheduledChangesInstructions",
9
| "value": [{ "kind": "turnFlagOff" }]
10
| }
11
| ],
12
| "comment": "Optional comment describing the update to the scheduled changes"
13
| }
14
| headers = {
15
| "Authorization": "<apiKey>",
16
| "Content-Type": "application/json"
17
| }
18
| 
19
| response = requests.patch(url, json=payload, headers=headers)
20
| 
21
| print(response.json())
```
[](/docs/api/scheduled-changes/patch-flag-config-scheduled-change?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_id": "string",
3
| "_creationDate": 1,
4
| "_maintainerId": "12ab3c45de678910abc12345",
5
| "_version": 1,
6
| "executionDate": 1,
7
| "instructions": [
8
| {}
9
| ],
10
| "conflicts": null,
11
| "_links": {}
12
| }
```
Update a scheduled change, overriding existing instructions with the new ones. Updating a scheduled change uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating scheduled changes. <details> <summary>Click to expand instructions for <strong>updating scheduled changes</strong></summary> #### deleteScheduledChange Removes the scheduled change. Here's an example: ```json { "instructions": [{ "kind": "deleteScheduledChange" }] } ``` #### replaceScheduledChangesInstructions Removes the existing scheduled changes and replaces them with the new instructions. ##### Parameters - `value`: An array of the new actions to perform when the execution date for these scheduled changes arrives. Supported scheduled actions are `turnFlagOn` and `turnFlagOff`. Here's an example that replaces the scheduled changes with new instructions to turn flag targeting off: ```json { "instructions": [ { "kind": "replaceScheduledChangesInstructions", "value": [ {"kind": "turnFlagOff"} ] } ] } ``` #### updateScheduledChangesExecutionDate Updates the execution date for the scheduled changes. ##### Parameters - `value`: the new execution date, in Unix milliseconds. Here's an example: ```json { "instructions": [ { "kind": "updateScheduledChangesExecutionDate", "value": 1754092860000 } ] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
featureFlagKeystringRequired`format: "string"`
The feature flag key
environmentKeystringRequired`format: "string"`
The environment key
idstringRequired`format: "string"`
The scheduled change ID
### Query Parameters
ignoreConflictsbooleanOptional
Whether to succeed (`true`) or fail (`false`) when these new instructions conflict with existing scheduled changes
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
The instructions to perform when updating. This should be an array with objects that look like <code>{“kind”: “update_action”}</code>. Some instructions also require a <code>value</code> field in the array element.
commentstringOptional
Optional comment describing the update to the scheduled changes
### Response
Scheduled changes response
_idstring
The ID of this scheduled change
_creationDatelong
Timestamp of when the scheduled change was created
_maintainerIdstring
The ID of the scheduled change maintainer
_versioninteger
Version of the scheduled change
executionDatelong
When the scheduled changes should be executed
instructionslist of maps from strings to any
The actions to perform on the execution date for these scheduled changes
conflictsany or null
Details on any conflicting scheduled changes
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
405
Method Not Allowed Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update a scheduled change, overriding existing instructions with the new ones. Updating a scheduled change uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating scheduled changes.
Click to expand instructions for **updating scheduled changes**
#### deleteScheduledChange
Removes the scheduled change.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{ "kind": "deleteScheduledChange" }]
3
| }
```
#### replaceScheduledChangesInstructions
Removes the existing scheduled changes and replaces them with the new instructions.
##### Parameters
 * `value`: An array of the new actions to perform when the execution date for these scheduled changes arrives. Supported scheduled actions are `turnFlagOn` and `turnFlagOff`.
Here’s an example that replaces the scheduled changes with new instructions to turn flag targeting off:
```
1
| {
---|--- 
2
| "instructions": [
3
| {
4
| "kind": "replaceScheduledChangesInstructions",
5
| "value": [ {"kind": "turnFlagOff"} ]
6
| }
7
| ]
8
| }
```
#### updateScheduledChangesExecutionDate
Updates the execution date for the scheduled changes.
##### Parameters
 * `value`: the new execution date, in Unix milliseconds.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [
3
| {
4
| "kind": "updateScheduledChangesExecutionDate",
5
| "value": 1754092860000
6
| }
7
| ]
8
| }
```