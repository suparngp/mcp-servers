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
/api/v2/integrations/:integrationKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/integrations/integrationKey"
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
[](/docs/api/integration-audit-log-subscriptions/get-subscriptions?explorer=true)
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
| "_links": {},
6
| "_id": "1234a56b7c89d012345e678f",
7
| "kind": "datadog",
8
| "name": "Example Datadog integration",
9
| "config": {},
10
| "statements": [
11
| {
12
| "effect": "allow",
13
| "resources": [
14
| "proj/*:env/*;qa_*:/flag/*"
15
| ],
16
| "notResources": [
17
| "string"
18
| ],
19
| "actions": [
20
| "*"
21
| ],
22
| "notActions": [
23
| "string"
24
| ]
25
| }
26
| ],
27
| "on": true,
28
| "tags": [
29
| "testing"
30
| ],
31
| "_access": {
32
| "denied": [
33
| {
34
| "action": "string",
35
| "reason": {
36
| "effect": "allow",
37
| "resources": [
38
| "proj/*:env/*;qa_*:/flag/*"
39
| ],
40
| "notResources": [
41
| "string"
42
| ],
43
| "actions": [
44
| "*"
45
| ],
46
| "notActions": [
47
| "string"
48
| ],
49
| "role_name": "string"
50
| }
51
| }
52
| ],
53
| "allowed": [
54
| {
55
| "action": "string",
56
| "reason": {
57
| "effect": "allow",
58
| "resources": [
59
| "proj/*:env/*;qa_*:/flag/*"
60
| ],
61
| "notResources": [
62
| "string"
63
| ],
64
| "actions": [
65
| "*"
66
| ],
67
| "notActions": [
68
| "string"
69
| ],
70
| "role_name": "string"
71
| }
72
| }
73
| ]
74
| },
75
| "_status": {
76
| "successCount": 1,
77
| "lastSuccess": 1,
78
| "lastError": 1,
79
| "errorCount": 1,
80
| "errors": [
81
| {
82
| "statusCode": 1,
83
| "responseBody": "string",
84
| "timestamp": 1
85
| }
86
| ]
87
| },
88
| "url": "string",
89
| "apiKey": "string"
90
| }
91
| ],
92
| "key": "string"
93
| }
```
Get all audit log subscriptions associated with a given integration.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
integrationKeystringRequired`format: "string"`
The integration key
### Response
Integrations collection response
_linksmap from strings to objects or null
Show 2 properties
itemslist of objects or null
Show 12 properties
keystring or null
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