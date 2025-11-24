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
/api/v2/users/:projectKey/:environmentKey/:userKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/users/projectKey/environmentKey/userKey"
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
[](/docs/api/users/get-user?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "lastPing": "2022-06-28T23:21:29.176609596Z",
3
| "environmentId": "string",
4
| "ownerId": "string",
5
| "user": {
6
| "key": "user-key-123abc",
7
| "secondary": "2398127",
8
| "ip": "10.10.10.10",
9
| "country": "United States",
10
| "email": "sandy@example.com",
11
| "firstName": "Sandy",
12
| "lastName": "Smith",
13
| "avatar": "http://example.com/avatar.png",
14
| "name": "Sandy Smith",
15
| "anonymous": false,
16
| "custom": {},
17
| "privateAttrs": [
18
| "string"
19
| ]
20
| },
21
| "sortValue": null,
22
| "_links": {
23
| "parent": {
24
| "href": "/api/v2/users/my-project/my-environment",
25
| "type": "application/json"
26
| },
27
| "self": {
28
| "href": "/api/v2/users/my-project/my-environment/my-user",
29
| "type": "application/json"
30
| },
31
| "settings": {
32
| "href": "/api/v2/users/my-project/my-environment/my-user/flags",
33
| "type": "text/html"
34
| },
35
| "site": {
36
| "href": "/my-project/my-environment/users/my-user",
37
| "type": "text/html"
38
| }
39
| },
40
| "_access": {
41
| "denied": [
42
| {
43
| "action": "string",
44
| "reason": {
45
| "effect": "allow",
46
| "resources": [
47
| "proj/*:env/*;qa_*:/flag/*"
48
| ],
49
| "notResources": [
50
| "string"
51
| ],
52
| "actions": [
53
| "*"
54
| ],
55
| "notActions": [
56
| "string"
57
| ],
58
| "role_name": "string"
59
| }
60
| }
61
| ],
62
| "allowed": [
63
| {
64
| "action": "string",
65
| "reason": {
66
| "effect": "allow",
67
| "resources": [
68
| "proj/*:env/*;qa_*:/flag/*"
69
| ],
70
| "notResources": [
71
| "string"
72
| ],
73
| "actions": [
74
| "*"
75
| ],
76
| "notActions": [
77
| "string"
78
| ],
79
| "role_name": "string"
80
| }
81
| }
82
| ]
83
| }
84
| }
```
> ### Use contexts instead > > After you have upgraded your LaunchDarkly SDK to use contexts instead of users, you should use [Get context instances](https://launchdarkly.com/docs/api/contexts/get-context-instances) instead of this endpoint. Get a user by key. The `user` object contains all attributes sent in `variation` calls for that key. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
userKeystringRequired`format: "string"`
The user key
### Response
User response
lastPingdatetime or null
Timestamp of the last time this user was seen
environmentIdstring or null
The environment ID
ownerIdstring or null
The ID of the member who is the owner for this account
userobject or null
Details on the user
Show 12 properties
sortValueany or null
If this record is returned as part of a list, the value used to sort the list. This is only included when the `sort` query parameter is specified. It is a time, in Unix milliseconds, if the sort is by `lastSeen`. It is a user key if the sort is by `userKey`.
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
_accessobject or null
Details on the allowed and denied actions for this user
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
> After you have upgraded your LaunchDarkly SDK to use contexts instead of users, you should use [Get context instances](https://launchdarkly.com/docs/api/contexts/get-context-instances) instead of this endpoint.
Get a user by key. The `user` object contains all attributes sent in `variation` calls for that key.