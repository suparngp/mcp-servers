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
/api/v2/applications
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/applications"
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
[](/docs/api/applications-beta/get-applications?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {},
3
| "items": [
4
| {
5
| "autoAdded": true,
6
| "key": "com.launchdarkly.cafe",
7
| "kind": "mobile",
8
| "name": "LaunchDarklyCafe",
9
| "flags": {
10
| "items": [
11
| {
12
| "name": "Example flag",
13
| "key": "flag-key-123abc",
14
| "_links": {},
15
| "_site": {
16
| "href": "string",
17
| "type": "string"
18
| }
19
| }
20
| ],
21
| "totalCount": 1,
22
| "_links": {}
23
| },
24
| "_access": {
25
| "denied": [
26
| {
27
| "action": "string",
28
| "reason": {
29
| "effect": "allow",
30
| "resources": [
31
| "proj/*:env/*;qa_*:/flag/*"
32
| ],
33
| "notResources": [
34
| "string"
35
| ],
36
| "actions": [
37
| "*"
38
| ],
39
| "notActions": [
40
| "string"
41
| ],
42
| "role_name": "string"
43
| }
44
| }
45
| ],
46
| "allowed": [
47
| {
48
| "action": "string",
49
| "reason": {
50
| "effect": "allow",
51
| "resources": [
52
| "proj/*:env/*;qa_*:/flag/*"
53
| ],
54
| "notResources": [
55
| "string"
56
| ],
57
| "actions": [
58
| "*"
59
| ],
60
| "notActions": [
61
| "string"
62
| ],
63
| "role_name": "string"
64
| }
65
| }
66
| ]
67
| },
68
| "_links": {},
69
| "_version": 1,
70
| "creationDate": 1,
71
| "description": "The LaunchDarkly Cafe app",
72
| "_maintainer": {
73
| "member": {
74
| "_links": {
75
| "self": {
76
| "href": "/api/v2/members/569f183514f4432160000007",
77
| "type": "application/json"
78
| }
79
| },
80
| "_id": "569f183514f4432160000007",
81
| "role": "admin",
82
| "email": "ariel@acme.com",
83
| "firstName": "Ariel",
84
| "lastName": "Flores"
85
| },
86
| "team": {
87
| "customRoleKeys": [
88
| "access-to-test-projects"
89
| ],
90
| "key": "team-key-123abc",
91
| "name": "QA Team",
92
| "_links": {}
93
| }
94
| }
95
| }
96
| ],
97
| "totalCount": 1
98
| }
```
Get a list of applications. ### Expanding the applications response LaunchDarkly supports expanding the "Get applications" response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `flags` includes details on the flags that have been evaluated by the application For example, use `?expand=flags` to include the `flags` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
filterstringOptional`format: "string"`
Accepts filter by `key`, `name`, `kind`, and `autoAdded`. To learn more about the filter syntax, read [Filtering applications and application versions](https://launchdarkly.com/docs/api/applications-beta#filtering-applications-and-application-versions).
limitlongOptional
The number of applications to return. Defaults to 10.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
sortstringOptional`format: "string"`
Accepts sorting order and fields. Fields can be comma separated. Possible fields are `creationDate`, `name`. Examples: `sort=name` sort by names ascending, `sort=-name,creationDate` sort by names descending and creationDate ascending.
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response. Options: `flags`.
### Response
Applications response
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
itemslist of objects or null
A list of applications
Show 11 properties
totalCountinteger or null
The number of applications
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
Get a list of applications.
### Expanding the applications response
LaunchDarkly supports expanding the “Get applications” response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `flags` includes details on the flags that have been evaluated by the application
For example, use `?expand=flags` to include the `flags` field in the response. By default, this field is **not** included in the response.