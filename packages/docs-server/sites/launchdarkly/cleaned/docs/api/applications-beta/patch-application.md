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
/api/v2/applications/:applicationKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/applications/applicationKey"
4
| 
5
| payload = [
6
| {
7
| "op": "replace",
8
| "path": "/description",
9
| "value": None
10
| }
11
| ]
12
| headers = {
13
| "Authorization": "<apiKey>",
14
| "Content-Type": "application/json"
15
| }
16
| 
17
| response = requests.patch(url, json=payload, headers=headers)
18
| 
19
| print(response.json())
```
[](/docs/api/applications-beta/patch-application?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "autoAdded": true,
3
| "key": "com.launchdarkly.cafe",
4
| "kind": "mobile",
5
| "name": "LaunchDarklyCafe",
6
| "flags": {
7
| "items": [
8
| {
9
| "name": "Example flag",
10
| "key": "flag-key-123abc",
11
| "_links": {},
12
| "_site": {
13
| "href": "string",
14
| "type": "string"
15
| }
16
| }
17
| ],
18
| "totalCount": 1,
19
| "_links": {}
20
| },
21
| "_access": {
22
| "denied": [
23
| {
24
| "action": "string",
25
| "reason": {
26
| "effect": "allow",
27
| "resources": [
28
| "proj/*:env/*;qa_*:/flag/*"
29
| ],
30
| "notResources": [
31
| "string"
32
| ],
33
| "actions": [
34
| "*"
35
| ],
36
| "notActions": [
37
| "string"
38
| ],
39
| "role_name": "string"
40
| }
41
| }
42
| ],
43
| "allowed": [
44
| {
45
| "action": "string",
46
| "reason": {
47
| "effect": "allow",
48
| "resources": [
49
| "proj/*:env/*;qa_*:/flag/*"
50
| ],
51
| "notResources": [
52
| "string"
53
| ],
54
| "actions": [
55
| "*"
56
| ],
57
| "notActions": [
58
| "string"
59
| ],
60
| "role_name": "string"
61
| }
62
| }
63
| ]
64
| },
65
| "_links": {},
66
| "_version": 1,
67
| "creationDate": 1,
68
| "description": "The LaunchDarkly Cafe app",
69
| "_maintainer": {
70
| "member": {
71
| "_links": {
72
| "self": {
73
| "href": "/api/v2/members/569f183514f4432160000007",
74
| "type": "application/json"
75
| }
76
| },
77
| "_id": "569f183514f4432160000007",
78
| "role": "admin",
79
| "email": "ariel@acme.com",
80
| "firstName": "Ariel",
81
| "lastName": "Flores"
82
| },
83
| "team": {
84
| "customRoleKeys": [
85
| "access-to-test-projects"
86
| ],
87
| "key": "team-key-123abc",
88
| "name": "QA Team",
89
| "_links": {}
90
| }
91
| }
92
| }
```
Update an application. You can update the `description` and `kind` fields. Requires a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes to the application. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
applicationKeystringRequired`format: "string"`
The application key
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Application response
autoAddedboolean
Whether the application was automatically created because it was included in a context when a LaunchDarkly SDK evaluated a feature flag, or was created through the LaunchDarkly UI or REST API.
keystring
The unique identifier of this application
kindenum
To distinguish the kind of application
Allowed values:browsermobileserver
namestring
The name of the application
flagsobject or null
Details about the flags that have been evaluated by the application
Show 3 properties
_accessobject or null
Details on the allowed and denied actions for this application
Show 2 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
_versioninteger or null
Version of the application
creationDatelong or null
Timestamp of when the application version was created
descriptionstring or null
The application description
_maintainerobject or null
Associated maintainer member or team info for the application
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
Update an application. You can update the `description` and `kind` fields. Requires a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes to the application. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).