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
/api/v2/account/relay-auto-configs/:id/reset
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/account/relay-auto-configs/id/reset"
4
| 
5
| headers = {"Authorization": "<apiKey>"}
6
| 
7
| response = requests.post(url, headers=headers)
8
| 
9
| print(response.json())
```
[](/docs/api/relay-proxy-configurations/reset-relay-auto-config?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "_id": "string",
3
| "name": "Relay Proxy Demo Config",
4
| "policy": [
5
| {
6
| "effect": "allow",
7
| "resources": [
8
| "proj/*:env/*;qa_*:/flag/*"
9
| ],
10
| "notResources": [
11
| "string"
12
| ],
13
| "actions": [
14
| "*"
15
| ],
16
| "notActions": [
17
| "string"
18
| ]
19
| }
20
| ],
21
| "fullKey": "string",
22
| "displayKey": "7f30",
23
| "creationDate": 1,
24
| "lastModified": 1,
25
| "_creator": {
26
| "_links": {
27
| "self": {
28
| "href": "/api/v2/members/569f183514f4432160000007",
29
| "type": "application/json"
30
| }
31
| },
32
| "_id": "569f183514f4432160000007",
33
| "role": "admin",
34
| "email": "ariel@acme.com",
35
| "firstName": "Ariel",
36
| "lastName": "Flores"
37
| },
38
| "_access": {
39
| "denied": [
40
| {
41
| "action": "string",
42
| "reason": {
43
| "effect": "allow",
44
| "resources": [
45
| "proj/*:env/*;qa_*:/flag/*"
46
| ],
47
| "notResources": [
48
| "string"
49
| ],
50
| "actions": [
51
| "*"
52
| ],
53
| "notActions": [
54
| "string"
55
| ],
56
| "role_name": "string"
57
| }
58
| }
59
| ],
60
| "allowed": [
61
| {
62
| "action": "string",
63
| "reason": {
64
| "effect": "allow",
65
| "resources": [
66
| "proj/*:env/*;qa_*:/flag/*"
67
| ],
68
| "notResources": [
69
| "string"
70
| ],
71
| "actions": [
72
| "*"
73
| ],
74
| "notActions": [
75
| "string"
76
| ],
77
| "role_name": "string"
78
| }
79
| }
80
| ]
81
| }
82
| }
```
Reset a Relay Proxy configuration's secret key with an optional expiry time for the old key.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
idstringRequired`format: "string"`
The Relay Proxy configuration ID
### Query Parameters
expirylongOptional
An expiration time for the old Relay Proxy configuration key, expressed as a Unix epoch time in milliseconds. By default, the Relay Proxy configuration will expire immediately.
### Response
Relay auto config response
_idstring
The ID of the Relay Proxy configuration
namestring
A human-friendly name for the Relay Proxy configuration
policylist of objects
A description of what environments and projects the Relay Proxy should include or exclude
Show 5 properties
fullKeystring
The Relay Proxy configuration key
displayKeystring
The last few characters of the Relay Proxy configuration key, displayed in the LaunchDarkly UI
creationDatelong
Timestamp of when the Relay Proxy configuration was created
lastModifiedlong
Timestamp of when the Relay Proxy configuration was most recently modified
_creatorobject or null
Details on the member who created this Relay Proxy configuration
Show 6 properties
_accessobject or null
Details on the allowed and denied actions for this Relay Proxy configuration
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