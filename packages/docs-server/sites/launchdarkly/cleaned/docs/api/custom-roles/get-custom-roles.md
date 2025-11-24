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
/api/v2/roles
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/roles \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/custom-roles/get-custom-roles?explorer=true)
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
| "_id": "1234a56b7c89d012345e678f",
5
| "_links": {},
6
| "key": "example-custom-role",
7
| "name": "Example custom role",
8
| "policy": [
9
| {
10
| "effect": "allow",
11
| "resources": [
12
| "proj/*:env/*;qa_*:/flag/*"
13
| ],
14
| "notResources": [
15
| "string"
16
| ],
17
| "actions": [
18
| "*"
19
| ],
20
| "notActions": [
21
| "string"
22
| ]
23
| }
24
| ],
25
| "_access": {
26
| "denied": [
27
| {
28
| "action": "string",
29
| "reason": {
30
| "effect": "allow",
31
| "resources": [
32
| "proj/*:env/*;qa_*:/flag/*"
33
| ],
34
| "notResources": [
35
| "string"
36
| ],
37
| "actions": [
38
| "*"
39
| ],
40
| "notActions": [
41
| "string"
42
| ],
43
| "role_name": "string"
44
| }
45
| }
46
| ],
47
| "allowed": [
48
| {
49
| "action": "string",
50
| "reason": {
51
| "effect": "allow",
52
| "resources": [
53
| "proj/*:env/*;qa_*:/flag/*"
54
| ],
55
| "notResources": [
56
| "string"
57
| ],
58
| "actions": [
59
| "*"
60
| ],
61
| "notActions": [
62
| "string"
63
| ],
64
| "role_name": "string"
65
| }
66
| }
67
| ]
68
| },
69
| "description": "This custom role is just an example",
70
| "basePermissions": "string",
71
| "resourceCategory": "string",
72
| "assignedTo": {
73
| "membersCount": 1,
74
| "teamsCount": 1
75
| },
76
| "_presetBundleVersion": 1,
77
| "_presetStatements": [
78
| {
79
| "effect": "allow",
80
| "resources": [
81
| "proj/*:env/*;qa_*:/flag/*"
82
| ],
83
| "notResources": [
84
| "string"
85
| ],
86
| "actions": [
87
| "*"
88
| ],
89
| "notActions": [
90
| "string"
91
| ]
92
| }
93
| ]
94
| }
95
| ],
96
| "_links": {},
97
| "totalCount": 1
98
| }
```
Get a complete list of custom roles. This includes project and organization roles that you create, or that are provided as presets by LaunchDarkly. It does not include base roles.
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
limitlongOptional
The maximum number of custom roles to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
### Response
Custom roles collection response
itemslist of objects
An array of custom roles
Show 12 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The total number of custom roles
### Errors
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