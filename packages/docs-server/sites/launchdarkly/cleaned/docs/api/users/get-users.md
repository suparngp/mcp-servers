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
/api/v2/users/:projectKey/:environmentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/users/projectKey/environmentKey"
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
[](/docs/api/users/get-users?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "totalCount": 245,
3
| "items": [
4
| {
5
| "lastPing": "2022-06-28T23:21:29.176609596Z",
6
| "environmentId": "string",
7
| "ownerId": "string",
8
| "user": {
9
| "key": "user-key-123abc",
10
| "secondary": "2398127",
11
| "ip": "10.10.10.10",
12
| "country": "United States",
13
| "email": "sandy@example.com",
14
| "firstName": "Sandy",
15
| "lastName": "Smith",
16
| "avatar": "http://example.com/avatar.png",
17
| "name": "Sandy Smith",
18
| "anonymous": false,
19
| "custom": {},
20
| "privateAttrs": [
21
| "string"
22
| ]
23
| },
24
| "sortValue": null,
25
| "_links": {
26
| "parent": {
27
| "href": "/api/v2/users/my-project/my-environment",
28
| "type": "application/json"
29
| },
30
| "self": {
31
| "href": "/api/v2/users/my-project/my-environment/my-user",
32
| "type": "application/json"
33
| },
34
| "settings": {
35
| "href": "/api/v2/users/my-project/my-environment/my-user/flags",
36
| "type": "text/html"
37
| },
38
| "site": {
39
| "href": "/my-project/my-environment/users/my-user",
40
| "type": "text/html"
41
| }
42
| },
43
| "_access": {
44
| "denied": [
45
| {
46
| "action": "string",
47
| "reason": {
48
| "effect": "allow",
49
| "resources": [
50
| "proj/*:env/*;qa_*:/flag/*"
51
| ],
52
| "notResources": [
53
| "string"
54
| ],
55
| "actions": [
56
| "*"
57
| ],
58
| "notActions": [
59
| "string"
60
| ],
61
| "role_name": "string"
62
| }
63
| }
64
| ],
65
| "allowed": [
66
| {
67
| "action": "string",
68
| "reason": {
69
| "effect": "allow",
70
| "resources": [
71
| "proj/*:env/*;qa_*:/flag/*"
72
| ],
73
| "notResources": [
74
| "string"
75
| ],
76
| "actions": [
77
| "*"
78
| ],
79
| "notActions": [
80
| "string"
81
| ],
82
| "role_name": "string"
83
| }
84
| }
85
| ]
86
| }
87
| }
88
| ],
89
| "_links": {
90
| "next": {
91
| "href": "/api/v2/users/my-project/my-environment?after=1647993600000&limit=20&searchAfter=my-user",
92
| "type": "application/json"
93
| },
94
| "self": {
95
| "href": "/api/v2/users/my-project/my-environment?after=1647993600000&limit=20",
96
| "type": "application/json"
97
| }
98
| }
99
| }
```
> ### Use contexts instead > > After you have upgraded your LaunchDarkly SDK to use contexts instead of users, you should use [Search for contexts](https://launchdarkly.com/docs/api/contexts/search-contexts) instead of this endpoint. List all users in the environment. Includes the total count of users. This is useful for exporting all users in the system for further analysis. Each page displays users up to a set `limit`. The default is 20. To page through, follow the `next` link in the `_links` object. To learn more, read [Representations](https://launchdarkly.com/docs/api#representations). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Query Parameters
limitlongOptional
The number of elements to return per page
searchAfterstringOptional`format: "string"`
Limits results to users with sort values after the value you specify. You can use this for pagination, but we recommend using the `next` link we provide instead.
### Response
Users collection response
totalCountinteger
The total number of users in the environment
itemslist of objects
Details on the users
Show 7 properties
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
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
> ### Use contexts instead
> After you have upgraded your LaunchDarkly SDK to use contexts instead of users, you should use [Search for contexts](https://launchdarkly.com/docs/api/contexts/search-contexts) instead of this endpoint.
List all users in the environment. Includes the total count of users. This is useful for exporting all users in the system for further analysis.
Each page displays users up to a set `limit`. The default is 20. To page through, follow the `next` link in the `_links` object. To learn more, read [Representations](https://launchdarkly.com/docs/api#representations).