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
/api/v2/segments/:projectKey/:segmentKey/expiring-targets/:environmentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/segments/projectKey/segmentKey/expiring-targets/environmentKey"
4
| 
5
| payload = { "instructions": [
6
| {
7
| "kind": "updateExpiringTarget",
8
| "contextKey": "user@email.com",
9
| "contextKind": "user",
10
| "targetType": "included",
11
| "value": 1587582000000,
12
| "version": 0
13
| }
14
| ] }
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
[](/docs/api/segments/patch-expiring-targets-for-segment?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "_id": "12ab3c45de678910abc12345",
5
| "_version": 1,
6
| "expirationDate": 1,
7
| "contextKind": "user",
8
| "contextKey": "context-key-123abc",
9
| "_resourceId": {
10
| "environmentKey": "environment-key-123abc",
11
| "key": "segment-key-123abc",
12
| "kind": "string",
13
| "projectKey": "project-key-123abc",
14
| "flagKey": "string"
15
| },
16
| "targetType": "included",
17
| "variationId": "cc4332e2-bd4d-4fe0-b509-dfd2caf8dd73"
18
| }
19
| ],
20
| "_links": {},
21
| "totalInstructions": 1,
22
| "successfulInstructions": 1,
23
| "failedInstructions": 1,
24
| "errors": [
25
| {
26
| "instructionIndex": 1,
27
| "message": "example error message"
28
| }
29
| ]
30
| }
```
Update expiring context targets for a segment. Updating a context target expiration uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). If the request is well-formed but any of its instructions failed to process, this operation returns status code `200`. In this case, the response `errors` array will be non-empty. ### Instructions Semantic patch requests support the following `kind` instructions for updating expiring context targets. <details> <summary>Click to expand instructions for <strong>updating expiring context targets</strong></summary> #### addExpiringTarget Schedules a date and time when LaunchDarkly will remove a context from segment targeting. The segment must already have the context as an individual target. ##### Parameters - `targetType`: The type of individual target for this context. Must be either `included` or `excluded`. - `contextKey`: The context key. - `contextKind`: The kind of context being targeted. - `value`: The date when the context should expire from the segment targeting, in Unix milliseconds. Here's an example: ```json { "instructions": [{ "kind": "addExpiringTarget", "targetType": "included", "contextKey": "user-key-123abc", "contextKind": "user", "value": 1754092860000 }] } ``` #### updateExpiringTarget Updates the date and time when LaunchDarkly will remove a context from segment targeting. ##### Parameters - `targetType`: The type of individual target for this context. Must be either `included` or `excluded`. - `contextKey`: The context key. - `contextKind`: The kind of context being targeted. - `value`: The new date when the context should expire from the segment targeting, in Unix milliseconds. - `version`: (Optional) The version of the expiring target to update. If included, update will fail if version doesn't match current version of the expiring target. Here's an example: ```json { "instructions": [{ "kind": "updateExpiringTarget", "targetType": "included", "contextKey": "user-key-123abc", "contextKind": "user", "value": 1754179260000 }] } ``` #### removeExpiringTarget Removes the scheduled expiration for the context in the segment. ##### Parameters - `targetType`: The type of individual target for this context. Must be either `included` or `excluded`. - `contextKey`: The context key. - `contextKind`: The kind of context being targeted. Here's an example: ```json { "instructions": [{ "kind": "removeExpiringTarget", "targetType": "included", "contextKey": "user-key-123abc", "contextKind": "user", }] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
segmentKeystringRequired`format: "string"`
The segment key
### Request
This endpoint expects an object.
instructionslist of objectsRequired
Semantic patch instructions for the desired changes to the resource
Show 6 properties
commentstringOptional
Optional description of changes
### Response
Expiring target response
itemslist of objects
A list of the results from each instruction
Show 8 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalInstructionsinteger or null
successfulInstructionsinteger or null
failedInstructionsinteger or null
errorslist of objects or null
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
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update expiring context targets for a segment. Updating a context target expiration uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
If the request is well-formed but any of its instructions failed to process, this operation returns status code `200`. In this case, the response `errors` array will be non-empty.
### Instructions
Semantic patch requests support the following `kind` instructions for updating expiring context targets.
Click to expand instructions for **updating expiring context targets**
#### addExpiringTarget
Schedules a date and time when LaunchDarkly will remove a context from segment targeting. The segment must already have the context as an individual target.
##### Parameters
 * `targetType`: The type of individual target for this context. Must be either `included` or `excluded`.
 * `contextKey`: The context key.
 * `contextKind`: The kind of context being targeted.
 * `value`: The date when the context should expire from the segment targeting, in Unix milliseconds.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addExpiringTarget",
4
| "targetType": "included",
5
| "contextKey": "user-key-123abc",
6
| "contextKind": "user",
7
| "value": 1754092860000
8
| }]
9
| }
```
#### updateExpiringTarget
Updates the date and time when LaunchDarkly will remove a context from segment targeting.
##### Parameters
 * `targetType`: The type of individual target for this context. Must be either `included` or `excluded`.
 * `contextKey`: The context key.
 * `contextKind`: The kind of context being targeted.
 * `value`: The new date when the context should expire from the segment targeting, in Unix milliseconds.
 * `version`: (Optional) The version of the expiring target to update. If included, update will fail if version doesn’t match current version of the expiring target.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "updateExpiringTarget",
4
| "targetType": "included",
5
| "contextKey": "user-key-123abc",
6
| "contextKind": "user",
7
| "value": 1754179260000
8
| }]
9
| }
```
#### removeExpiringTarget
Removes the scheduled expiration for the context in the segment.
##### Parameters
 * `targetType`: The type of individual target for this context. Must be either `included` or `excluded`.
 * `contextKey`: The context key.
 * `contextKind`: The kind of context being targeted.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeExpiringTarget",
4
| "targetType": "included",
5
| "contextKey": "user-key-123abc",
6
| "contextKind": "user",
7
| }]
8
| }
```