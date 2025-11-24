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
/api/v2/projects/:projectKey/flags/:featureFlagKey/environments/:environmentKey/workflows
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects/projectKey/flags/featureFlagKey/environments/environmentKey/workflows \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/workflows/get-workflows?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "_id": "12ab3c4d5ef1a2345bcde67f",
5
| "_version": 1,
6
| "_conflicts": [
7
| {
8
| "stageId": "12ab3c4d5ef1a2345bcde67f",
9
| "message": "string"
10
| }
11
| ],
12
| "_creationDate": 1,
13
| "_maintainerId": "12ab3c45de678910abc12345",
14
| "_links": {},
15
| "name": "Progressive rollout starting in two days",
16
| "_execution": {
17
| "status": "completed",
18
| "stopDate": 1
19
| },
20
| "description": "Turn flag on for 10% of customers each day",
21
| "kind": "custom",
22
| "stages": [
23
| {
24
| "_id": "12ab3c45de678910abc12345",
25
| "conditions": [
26
| {
27
| "_id": "string",
28
| "_execution": {
29
| "status": "completed"
30
| },
31
| "description": "string",
32
| "notifyMemberIds": [
33
| "string"
34
| ],
35
| "allReviews": [
36
| {
37
| "_id": "string",
38
| "kind": "string",
39
| "creationDate": 1,
40
| "comment": "string",
41
| "memberId": "string",
42
| "serviceTokenId": "string"
43
| }
44
| ],
45
| "reviewStatus": "string",
46
| "kind": "schedule",
47
| "scheduleKind": "relative",
48
| "waitDuration": 2,
49
| "waitDurationUnit": "calendarDay",
50
| "id": "12ab3c45de678910abc12345"
51
| }
52
| ],
53
| "action": {
54
| "kind": "patch",
55
| "instructions": [
56
| {}
57
| ]
58
| },
59
| "_execution": {
60
| "status": "completed",
61
| "stopDate": 1
62
| },
63
| "name": "10% rollout on day 1"
64
| }
65
| ],
66
| "meta": {
67
| "parameters": [
68
| {
69
| "_id": "string",
70
| "path": "string",
71
| "default": {
72
| "value": null,
73
| "booleanVariationValue": true,
74
| "ruleClause": {
75
| "attribute": "string",
76
| "op": "in",
77
| "negate": true
78
| }
79
| },
80
| "valid": true
81
| }
82
| ]
83
| },
84
| "templateKey": "example-workflow-template"
85
| }
86
| ],
87
| "totalCount": 1,
88
| "_links": {}
89
| }
```
Display workflows associated with a feature flag.
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
### Query Parameters
statusstringOptional`format: "string"`
Filter results by workflow status. Valid status filters are `active`, `completed`, and `failed`.
sortstringOptional`format: "string"`
A field to sort the items by. Prefix field by a dash ( - ) to sort in descending order. This endpoint supports sorting by `creationDate` or `stopDate`.
limitlongOptional
The maximum number of workflows to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
### Response
Workflows collection response
itemslist of objects
An array of workflows
Show 13 properties
totalCountinteger
Total number of workflows
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
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