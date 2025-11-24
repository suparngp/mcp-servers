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
GET
/api/v2/projects/:projectKey/flags/:featureFlagKey/environments/:environmentKey/workflows/:workflowId
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/flags/featureFlagKey/environments/environmentKey/workflows/workflowId"
4
| 
5
| headers = {"Authorization": "<apiKey>"}
6
| 
7
| response = requests.get(url, headers=headers)
8
| 
9
| print(response.json())
```
[](/docs/api/workflows/get-custom-workflow?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "12ab3c4d5ef1a2345bcde67f",
3
| "_version": 1,
4
| "_conflicts": [
5
| {
6
| "stageId": "12ab3c4d5ef1a2345bcde67f",
7
| "message": "string"
8
| }
9
| ],
10
| "_creationDate": 1,
11
| "_maintainerId": "12ab3c45de678910abc12345",
12
| "_links": {},
13
| "name": "Progressive rollout starting in two days",
14
| "_execution": {
15
| "status": "completed",
16
| "stopDate": 1
17
| },
18
| "description": "Turn flag on for 10% of customers each day",
19
| "kind": "custom",
20
| "stages": [
21
| {
22
| "_id": "12ab3c45de678910abc12345",
23
| "conditions": [
24
| {
25
| "_id": "string",
26
| "_execution": {
27
| "status": "completed"
28
| },
29
| "description": "string",
30
| "notifyMemberIds": [
31
| "string"
32
| ],
33
| "allReviews": [
34
| {
35
| "_id": "string",
36
| "kind": "string",
37
| "creationDate": 1,
38
| "comment": "string",
39
| "memberId": "string",
40
| "serviceTokenId": "string"
41
| }
42
| ],
43
| "reviewStatus": "string",
44
| "kind": "schedule",
45
| "scheduleKind": "relative",
46
| "waitDuration": 2,
47
| "waitDurationUnit": "calendarDay",
48
| "id": "12ab3c45de678910abc12345"
49
| }
50
| ],
51
| "action": {
52
| "kind": "patch",
53
| "instructions": [
54
| {}
55
| ]
56
| },
57
| "_execution": {
58
| "status": "completed",
59
| "stopDate": 1
60
| },
61
| "name": "10% rollout on day 1"
62
| }
63
| ],
64
| "meta": {
65
| "parameters": [
66
| {
67
| "_id": "string",
68
| "path": "string",
69
| "default": {
70
| "value": null,
71
| "booleanVariationValue": true,
72
| "ruleClause": {
73
| "attribute": "string",
74
| "op": "in",
75
| "negate": true
76
| }
77
| },
78
| "valid": true
79
| }
80
| ]
81
| },
82
| "templateKey": "example-workflow-template"
83
| }
```
Get a specific workflow by ID.
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
workflowIdstringRequired`format: "string"`
The workflow ID
### Response
Workflow response
_idstring
The ID of the workflow
_versioninteger
The version of the workflow
_conflictslist of objects
Any conflicts that are present in the workflow stages
Show 2 properties
_creationDatelong
Timestamp of when the workflow was created
_maintainerIdstring
The member ID of the maintainer of the workflow. Defaults to the workflow creator.
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
namestring
The name of the workflow
_executionobject
The current execution status of the workflow
Show 2 properties
descriptionstring or null
A brief description of the workflow
kindstring or null
The kind of workflow
stageslist of objects or null
The stages that make up the workflow. Each stage contains conditions and actions.
Show 5 properties
metaobject or null
For workflows being created from a workflow template, this value holds any parameters that could potentially be incompatible with the current project, environment, or flag
Show 1 properties
templateKeystring or null
For workflows being created from a workflow template, this value is the template's key
### Errors
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