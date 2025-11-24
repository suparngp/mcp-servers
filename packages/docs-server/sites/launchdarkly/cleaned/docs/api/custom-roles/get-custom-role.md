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
/api/v2/roles/:customRoleKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/roles/customRoleKey"
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
[](/docs/api/custom-roles/get-custom-role?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "1234a56b7c89d012345e678f",
3
| "_links": {},
4
| "key": "example-custom-role",
5
| "name": "Example custom role",
6
| "policy": [
7
| {
8
| "effect": "allow",
9
| "resources": [
10
| "proj/*:env/*;qa_*:/flag/*"
11
| ],
12
| "notResources": [
13
| "string"
14
| ],
15
| "actions": [
16
| "*"
17
| ],
18
| "notActions": [
19
| "string"
20
| ]
21
| }
22
| ],
23
| "_access": {
24
| "denied": [
25
| {
26
| "action": "string",
27
| "reason": {
28
| "effect": "allow",
29
| "resources": [
30
| "proj/*:env/*;qa_*:/flag/*"
31
| ],
32
| "notResources": [
33
| "string"
34
| ],
35
| "actions": [
36
| "*"
37
| ],
38
| "notActions": [
39
| "string"
40
| ],
41
| "role_name": "string"
42
| }
43
| }
44
| ],
45
| "allowed": [
46
| {
47
| "action": "string",
48
| "reason": {
49
| "effect": "allow",
50
| "resources": [
51
| "proj/*:env/*;qa_*:/flag/*"
52
| ],
53
| "notResources": [
54
| "string"
55
| ],
56
| "actions": [
57
| "*"
58
| ],
59
| "notActions": [
60
| "string"
61
| ],
62
| "role_name": "string"
63
| }
64
| }
65
| ]
66
| },
67
| "description": "This custom role is just an example",
68
| "basePermissions": "string",
69
| "resourceCategory": "string",
70
| "assignedTo": {
71
| "membersCount": 1,
72
| "teamsCount": 1
73
| },
74
| "_presetBundleVersion": 1,
75
| "_presetStatements": [
76
| {
77
| "effect": "allow",
78
| "resources": [
79
| "proj/*:env/*;qa_*:/flag/*"
80
| ],
81
| "notResources": [
82
| "string"
83
| ],
84
| "actions": [
85
| "*"
86
| ],
87
| "notActions": [
88
| "string"
89
| ]
90
| }
91
| ]
92
| }
```
Get a single custom role by key or ID
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
customRoleKeystringRequired`format: "string"`
The custom role key or ID
### Response
Custom role response
_idstring
The ID of the custom role
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
keystring
The key of the custom role
namestring
The name of the custom role
policylist of objects
An array of the policies that comprise this custom role
Show 5 properties
_accessobject or null
Details on the allowed and denied actions for this custom role
Show 2 properties
descriptionstring or null
The description of the custom role
basePermissionsstring or null
Base permissions to use for this role. Defaults to reader. Recommended to set this to no_access in all cases.
resourceCategorystring or null
The category of resources this role is intended to manage. Can be `organization`, `project`, or `any`. Once set, this field cannot be changed.
assignedToobject or null
The number of teams and members this role is assigned to
Show 2 properties
_presetBundleVersioninteger or null
If created from a preset, the preset bundle version
_presetStatementslist of objects or null
If created from a preset, the read-only statements copied from the preset
Show 5 properties
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