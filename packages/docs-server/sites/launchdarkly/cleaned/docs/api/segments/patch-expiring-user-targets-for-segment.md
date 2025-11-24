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
/api/v2/segments/:projectKey/:segmentKey/expiring-user-targets/:environmentKey
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/segments/projectKey/segmentKey/expiring-user-targets/environmentKey \
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
| "userKey": "string",
9
| "targetType": "included",
10
| "value": 1587582000000,
11
| "version": 0,
12
| "contextKey": "contextKey",
13
| "contextKind": "user"
14
| }
15
| ]
16
| }'
```
[](/docs/api/segments/patch-expiring-user-targets-for-segment?explorer=true)
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
| "_id": "12ab3c45de678910fgh12345",
5
| "_version": 1,
6
| "expirationDate": 1,
7
| "userKey": "example-user-key",
8
| "_resourceId": {
9
| "kind": "string",
10
| "projectKey": "string",
11
| "environmentKey": "string",
12
| "flagKey": "string",
13
| "key": "string"
14
| },
15
| "targetType": "included",
16
| "variationId": "ce67d625-a8b9-4fb5-a344-ab909d9d4f4d"
17
| }
18
| ],
19
| "_links": {},
20
| "totalInstructions": 1,
21
| "successfulInstructions": 1,
22
| "failedInstructions": 0,
23
| "errors": [
24
| {
25
| "instructionIndex": 1,
26
| "message": "example error message"
27
| }
28
| ]
29
| }
```
> ### Contexts are now available > > After you have upgraded your LaunchDarkly SDK to use contexts instead of users, you should use [Update expiring targets for segment](https://launchdarkly.com/docs/api/segments/patch-expiring-targets-for-segment) instead of this endpoint. To learn more, read [Contexts](https://launchdarkly.com/docs/home/observability/contexts). Update expiring user targets for a segment. Updating a user target expiration uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). If the request is well-formed but any of its instructions failed to process, this operation returns status code `200`. In this case, the response `errors` array will be non-empty. ### Instructions Semantic patch requests support the following `kind` instructions for updating expiring user targets. <details> <summary>Click to expand instructions for <strong>updating expiring user targets</strong></summary> #### addExpireUserTargetDate Schedules a date and time when LaunchDarkly will remove a user from segment targeting. ##### Parameters - `targetType`: A segment's target type, must be either `included` or `excluded`. - `userKey`: The user key. - `value`: The date when the user should expire from the segment targeting, in Unix milliseconds. #### updateExpireUserTargetDate Updates the date and time when LaunchDarkly will remove a user from segment targeting. ##### Parameters - `targetType`: A segment's target type, must be either `included` or `excluded`. - `userKey`: The user key. - `value`: The new date when the user should expire from the segment targeting, in Unix milliseconds. - `version`: The segment version. #### removeExpireUserTargetDate Removes the scheduled expiration for the user in the segment. ##### Parameters - `targetType`: A segment's target type, must be either `included` or `excluded`. - `userKey`: The user key. </details>
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
Show 5 properties
commentstringOptional
Optional description of changes
### Response
Expiring user target response
itemslist of objects
An array of expiring user targets
Show 7 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalInstructionsinteger or null
The total count of instructions sent in the PATCH request
successfulInstructionsinteger or null
The total count of successful instructions sent in the PATCH request
failedInstructionsinteger or null
The total count of the failed instructions sent in the PATCH request
errorslist of objects or null
An array of error messages for the failed instructions
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
> ### Contexts are now available
> After you have upgraded your LaunchDarkly SDK to use contexts instead of users, you should use [Update expiring targets for segment](https://launchdarkly.com/docs/api/segments/patch-expiring-targets-for-segment) instead of this endpoint. To learn more, read [Contexts](https://launchdarkly.com/docs/home/observability/contexts).
Update expiring user targets for a segment. Updating a user target expiration uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
If the request is well-formed but any of its instructions failed to process, this operation returns status code `200`. In this case, the response `errors` array will be non-empty.
### Instructions
Semantic patch requests support the following `kind` instructions for updating expiring user targets.
Click to expand instructions for **updating expiring user targets**
#### addExpireUserTargetDate
Schedules a date and time when LaunchDarkly will remove a user from segment targeting.
##### Parameters
 * `targetType`: A segment’s target type, must be either `included` or `excluded`.
 * `userKey`: The user key.
 * `value`: The date when the user should expire from the segment targeting, in Unix milliseconds.
#### updateExpireUserTargetDate
Updates the date and time when LaunchDarkly will remove a user from segment targeting.
##### Parameters
 * `targetType`: A segment’s target type, must be either `included` or `excluded`.
 * `userKey`: The user key.
 * `value`: The new date when the user should expire from the segment targeting, in Unix milliseconds.
 * `version`: The segment version.
#### removeExpireUserTargetDate
Removes the scheduled expiration for the user in the segment.
##### Parameters
 * `targetType`: A segment’s target type, must be either `included` or `excluded`.
 * `userKey`: The user key.