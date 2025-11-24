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
/api/v2/integration-capabilities/big-segment-store
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/integration-capabilities/big-segment-store"
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
[](/docs/api/persistent-store-integrations-beta/get-big-segment-store-integrations?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {
3
| "self": {
4
| "href": "string",
5
| "type": "string"
6
| },
7
| "parent": {
8
| "href": "string",
9
| "type": "string"
10
| }
11
| },
12
| "items": [
13
| {
14
| "_links": {
15
| "self": {
16
| "href": "string",
17
| "type": "string"
18
| },
19
| "parent": {
20
| "href": "string",
21
| "type": "string"
22
| },
23
| "project": {
24
| "href": "string",
25
| "type": "string"
26
| },
27
| "environment": {
28
| "href": "string",
29
| "type": "string"
30
| }
31
| },
32
| "_id": "12ab3c4d5ef1a2345bcde67f",
33
| "integrationKey": "redis",
34
| "projectKey": "default",
35
| "environmentKey": "development",
36
| "config": {},
37
| "on": true,
38
| "tags": [],
39
| "name": "Development environment configuration",
40
| "version": 1,
41
| "_status": {
42
| "available": true,
43
| "potentiallyStale": false,
44
| "lastSync": 1,
45
| "lastError": 1,
46
| "errors": [
47
| {
48
| "statusCode": 1,
49
| "message": "string",
50
| "timestamp": 1
51
| }
52
| ]
53
| },
54
| "_access": {
55
| "denied": [
56
| {
57
| "action": "string",
58
| "reason": {
59
| "effect": "allow",
60
| "resources": [
61
| "proj/*:env/*;qa_*:/flag/*"
62
| ],
63
| "notResources": [
64
| "string"
65
| ],
66
| "actions": [
67
| "*"
68
| ],
69
| "notActions": [
70
| "string"
71
| ],
72
| "role_name": "string"
73
| }
74
| }
75
| ],
76
| "allowed": [
77
| {
78
| "action": "string",
79
| "reason": {
80
| "effect": "allow",
81
| "resources": [
82
| "proj/*:env/*;qa_*:/flag/*"
83
| ],
84
| "notResources": [
85
| "string"
86
| ],
87
| "actions": [
88
| "*"
89
| ],
90
| "notActions": [
91
| "string"
92
| ],
93
| "role_name": "string"
94
| }
95
| }
96
| ]
97
| }
98
| }
99
| ]
100
| }
```
List all big segment store integrations.
### Authentication
Authorizationstring
API Key authentication via header
### Response
Big segment store collection response
_linksobject
The location and content type of related resources
Show 2 properties
itemslist of objects
An array of persistent store integration configurations
Show 12 properties
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