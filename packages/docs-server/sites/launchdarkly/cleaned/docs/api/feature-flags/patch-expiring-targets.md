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
/api/v2/flags/:projectKey/:featureFlagKey/expiring-targets/:environmentKey
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/flags/projectKey/featureFlagKey/expiring-targets/environmentKey \
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
| "kind": "addExpireUserTargetDate",
8
| "userKey": "sandy",
9
| "value": 1686412800000,
10
| "variationId": "ce12d345-a1b2-4fb5-a123-ab123d4d5f5d"
11
| }
12
| ]
13
| }'
```
[](/docs/api/feature-flags/patch-expiring-targets?explorer=true)
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
Schedule a context for removal from individual targeting on a feature flag. The flag must already individually target the context. You can add, update, or remove a scheduled removal date. You can only schedule a context for removal on a single variation per flag. Updating an expiring target uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating expiring targets. <details> <summary>Click to expand instructions for <strong>updating expiring targets</strong></summary> #### addExpiringTarget Adds a date and time that LaunchDarkly will remove the context from the flag's individual targeting. ##### Parameters * `value`: The time, in Unix milliseconds, when LaunchDarkly should remove the context from individual targeting for this flag * `variationId`: ID of a variation on the flag * `contextKey`: The context key for the context to remove from individual targeting * `contextKind`: The kind of context represented by the `contextKey` Here's an example: ```json { "instructions": [{ "kind": "addExpiringTarget", "value": 1754006460000, "variationId": "4254742c-71ae-411f-a992-43b18a51afe0", "contextKey": "user-key-123abc", "contextKind": "user" }] } ``` #### updateExpiringTarget Updates the date and time that LaunchDarkly will remove the context from the flag's individual targeting ##### Parameters * `value`: The time, in Unix milliseconds, when LaunchDarkly should remove the context from individual targeting for this flag * `variationId`: ID of a variation on the flag * `contextKey`: The context key for the context to remove from individual targeting * `contextKind`: The kind of context represented by the `contextKey` * `version`: (Optional) The version of the expiring target to update. If included, update will fail if version doesn't match current version of the expiring target. Here's an example: ```json { "instructions": [{ "kind": "updateExpiringTarget", "value": 1754006460000, "variationId": "4254742c-71ae-411f-a992-43b18a51afe0", "contextKey": "user-key-123abc", "contextKind": "user" }] } ``` #### removeExpiringTarget Removes the scheduled removal of the context from the flag's individual targeting. The context will remain part of the flag's individual targeting until you explicitly remove it, or until you schedule another removal. ##### Parameters * `variationId`: ID of a variation on the flag * `contextKey`: The context key for the context to remove from individual targeting * `contextKind`: The kind of context represented by the `contextKey` Here's an example: ```json { "instructions": [{ "kind": "removeExpiringTarget", "variationId": "4254742c-71ae-411f-a992-43b18a51afe0", "contextKey": "user-key-123abc", "contextKind": "user" }] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
featureFlagKeystringRequired`format: "string"`
The feature flag key
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
The instructions to perform when updating
commentstringOptional
Optional comment describing the change
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
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Schedule a context for removal from individual targeting on a feature flag. The flag must already individually target the context.
You can add, update, or remove a scheduled removal date. You can only schedule a context for removal on a single variation per flag.
Updating an expiring target uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating expiring targets.
Click to expand instructions for **updating expiring targets**
#### addExpiringTarget
Adds a date and time that LaunchDarkly will remove the context from the flag’s individual targeting.
##### Parameters
 * `value`: The time, in Unix milliseconds, when LaunchDarkly should remove the context from individual targeting for this flag
 * `variationId`: ID of a variation on the flag
 * `contextKey`: The context key for the context to remove from individual targeting
 * `contextKind`: The kind of context represented by the `contextKey`
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
| "value": 1754006460000,
5
| "variationId": "4254742c-71ae-411f-a992-43b18a51afe0",
6
| "contextKey": "user-key-123abc",
7
| "contextKind": "user"
8
| }]
9
| }
```
#### updateExpiringTarget
Updates the date and time that LaunchDarkly will remove the context from the flag’s individual targeting
##### Parameters
 * `value`: The time, in Unix milliseconds, when LaunchDarkly should remove the context from individual targeting for this flag
 * `variationId`: ID of a variation on the flag
 * `contextKey`: The context key for the context to remove from individual targeting
 * `contextKind`: The kind of context represented by the `contextKey`
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
| "value": 1754006460000,
5
| "variationId": "4254742c-71ae-411f-a992-43b18a51afe0",
6
| "contextKey": "user-key-123abc",
7
| "contextKind": "user"
8
| }]
9
| }
```
#### removeExpiringTarget
Removes the scheduled removal of the context from the flag’s individual targeting. The context will remain part of the flag’s individual targeting until you explicitly remove it, or until you schedule another removal.
##### Parameters
 * `variationId`: ID of a variation on the flag
 * `contextKey`: The context key for the context to remove from individual targeting
 * `contextKind`: The kind of context represented by the `contextKey`
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
| "variationId": "4254742c-71ae-411f-a992-43b18a51afe0",
5
| "contextKey": "user-key-123abc",
6
| "contextKind": "user"
7
| }]
8
| }
```