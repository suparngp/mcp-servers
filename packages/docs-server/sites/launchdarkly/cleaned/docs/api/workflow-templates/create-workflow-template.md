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
POST
/api/v2/templates
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/templates"
4
| 
5
| payload = { "key": "string" }
6
| headers = {
7
| "Authorization": "<apiKey>",
8
| "Content-Type": "application/json"
9
| }
10
| 
11
| response = requests.post(url, json=payload, headers=headers)
12
| 
13
| print(response.json())
```
[](/docs/api/workflow-templates/create-workflow-template?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_id": "string",
3
| "_key": "string",
4
| "_creationDate": 1,
5
| "_ownerId": "string",
6
| "_maintainerId": "string",
7
| "_links": {},
8
| "name": "string",
9
| "description": "string",
10
| "stages": [
11
| {
12
| "_id": "12ab3c45de678910abc12345",
13
| "conditions": [
14
| {
15
| "_id": "string",
16
| "_execution": {
17
| "status": "completed"
18
| },
19
| "description": "string",
20
| "notifyMemberIds": [
21
| "string"
22
| ],
23
| "allReviews": [
24
| {
25
| "_id": "string",
26
| "kind": "string",
27
| "creationDate": 1,
28
| "comment": "string",
29
| "memberId": "string",
30
| "serviceTokenId": "string"
31
| }
32
| ],
33
| "reviewStatus": "string",
34
| "kind": "schedule",
35
| "scheduleKind": "relative",
36
| "waitDuration": 2,
37
| "waitDurationUnit": "calendarDay",
38
| "id": "12ab3c45de678910abc12345"
39
| }
40
| ],
41
| "action": {
42
| "kind": "patch",
43
| "instructions": [
44
| {}
45
| ]
46
| },
47
| "_execution": {
48
| "status": "completed",
49
| "stopDate": 1
50
| },
51
| "name": "10% rollout on day 1"
52
| }
53
| ]
54
| }
```
> ### Workflows are in maintenance mode
> The workflows feature is in maintenance mode, and is planned for future deprecation at a date not yet specified. We will work with existing customers using workflows to migrate to a replacement solution when deprecation occurs.
Create a template for a feature flag workflow.
### Authentication
Authorizationstring
API Key authentication via header
### Request
This endpoint expects an object.
keystringRequired
namestringOptional
descriptionstringOptional
workflowIdstringOptional
stageslist of objectsOptional
Show 4 properties
projectKeystringOptional
environmentKeystringOptional
flagKeystringOptional
### Response
Workflow template response JSON
_idstring
_keystring
_creationDatelong
_ownerIdstring
_maintainerIdstring
_linksmap from strings to objects
Show 2 properties
namestring or null
descriptionstring or null
stageslist of objects or null
Show 5 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs