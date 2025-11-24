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
/api/v2/flags/:projectKey/:featureFlagKey/triggers/:environmentKey/:id
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/flags/projectKey/featureFlagKey/triggers/environmentKey/id \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '{}'
```
[](/docs/api/flag-triggers/patch-trigger-workflow?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_id": "string",
3
| "_version": 1,
4
| "_creationDate": 1,
5
| "_maintainerId": "12ab3c45de678910abc12345",
6
| "_maintainer": {
7
| "_links": {
8
| "self": {
9
| "href": "/api/v2/members/569f183514f4432160000007",
10
| "type": "application/json"
11
| }
12
| },
13
| "_id": "569f183514f4432160000007",
14
| "role": "admin",
15
| "email": "ariel@acme.com",
16
| "firstName": "Ariel",
17
| "lastName": "Flores"
18
| },
19
| "enabled": true,
20
| "_integrationKey": "generic-trigger",
21
| "instructions": [
22
| {}
23
| ],
24
| "_lastTriggeredAt": 1,
25
| "_recentTriggerBodies": [
26
| {
27
| "timestamp": 1,
28
| "jsonBody": {}
29
| }
30
| ],
31
| "_triggerCount": 3,
32
| "triggerURL": "string",
33
| "_links": {}
34
| }
```
Update a flag trigger. Updating a flag trigger uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating flag triggers. <details> <summary>Click to expand instructions for <strong>updating flag triggers</strong></summary> #### replaceTriggerActionInstructions Removes the existing trigger action and replaces it with the new instructions. ##### Parameters - `value`: An array of the new `kind`s of actions to perform when triggering. Supported flag actions are `turnFlagOn` and `turnFlagOff`. Here's an example that replaces the existing action with new instructions to turn flag targeting off: ```json { "instructions": [ { "kind": "replaceTriggerActionInstructions", "value": [ {"kind": "turnFlagOff"} ] } ] } ``` #### cycleTriggerUrl Generates a new URL for this trigger. You must update any clients using the trigger to use this new URL. Here's an example: ```json { "instructions": [{ "kind": "cycleTriggerUrl" }] } ``` #### disableTrigger Disables the trigger. This saves the trigger configuration, but the trigger stops running. To re-enable, use `enableTrigger`. Here's an example: ```json { "instructions": [{ "kind": "disableTrigger" }] } ``` #### enableTrigger Enables the trigger. If you previously disabled the trigger, it begins running again. Here's an example: ```json { "instructions": [{ "kind": "enableTrigger" }] } ``` </details>
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
idstringRequired`format: "string"`
The flag trigger ID
### Request
This endpoint expects an object.
commentstringOptional
Optional comment describing the update
instructionslist of maps from strings to anyOptional
The instructions to perform when updating. This should be an array with objects that look like <code>{“kind”: “trigger_action”}</code>.
### Response
Flag trigger response
_idstring or null
The ID of this flag trigger
_versioninteger or null
The flag trigger version
_creationDatelong or null
Timestamp of when the flag trigger was created
_maintainerIdstring or null
The ID of the flag trigger maintainer
_maintainerobject or null
Details on the member who maintains this flag trigger
Show 6 properties
enabledboolean or null
Whether the flag trigger is currently enabled
_integrationKeystring or null
The unique identifier of the integration for your trigger
instructionslist of maps from strings to any or null
Details on the action to perform when triggering
_lastTriggeredAtlong or null
Timestamp of when the trigger was most recently executed
_recentTriggerBodieslist of objects or null
Details on recent flag trigger requests.
Show 2 properties
_triggerCountinteger or null
Number of times the trigger has been executed
triggerURLstring or null
The unguessable URL for this flag trigger
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
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update a flag trigger. Updating a flag trigger uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating flag triggers.
Click to expand instructions for **updating flag triggers**
#### replaceTriggerActionInstructions
Removes the existing trigger action and replaces it with the new instructions.
##### Parameters
 * `value`: An array of the new `kind`s of actions to perform when triggering. Supported flag actions are `turnFlagOn` and `turnFlagOff`.
Here’s an example that replaces the existing action with new instructions to turn flag targeting off:
```
1
| {
---|--- 
2
| "instructions": [
3
| {
4
| "kind": "replaceTriggerActionInstructions",
5
| "value": [ {"kind": "turnFlagOff"} ]
6
| }
7
| ]
8
| }
```
#### cycleTriggerUrl
Generates a new URL for this trigger. You must update any clients using the trigger to use this new URL.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{ "kind": "cycleTriggerUrl" }]
3
| }
```
#### disableTrigger
Disables the trigger. This saves the trigger configuration, but the trigger stops running. To re-enable, use `enableTrigger`.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{ "kind": "disableTrigger" }]
3
| }
```
#### enableTrigger
Enables the trigger. If you previously disabled the trigger, it begins running again.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{ "kind": "enableTrigger" }]
3
| }
```