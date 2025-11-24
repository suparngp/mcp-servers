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
/api/v2/announcements
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/announcements"
4
| 
5
| payload = {
6
| "isDismissible": True,
7
| "title": "System Maintenance Notice",
8
| "message": "**Important Update:**
9
| 
10
| Please be aware of the upcoming maintenance scheduled for *October 31st, 2024*. The system will be unavailable from **12:00 AM** to **4:00 AM**.",
11
| "startTime": 1731439812,
12
| "severity": "warning",
13
| "endTime": 1731439880
14
| }
15
| headers = {
16
| "Authorization": "<apiKey>",
17
| "Content-Type": "application/json"
18
| }
19
| 
20
| response = requests.post(url, json=payload, headers=headers)
21
| 
22
| print(response.json())
```
[](/docs/api/announcements/create-announcement-public?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_id": "1234567890",
3
| "isDismissible": true,
4
| "title": "System Maintenance Notice",
5
| "message": "**Important Update:**\n\nPlease be aware of the upcoming maintenance scheduled for *October 31st, 2024*. The system will be unavailable from **12:00 AM** to **4:00 AM**.",
6
| "startTime": 1731439812,
7
| "severity": "info",
8
| "_status": "active",
9
| "_links": {
10
| "parent": {
11
| "href": "href",
12
| "type": "type"
13
| }
14
| },
15
| "endTime": 1731439880,
16
| "_access": {
17
| "allowed": [
18
| {
19
| "action": "action",
20
| "reason": {
21
| "effect": "allow",
22
| "resources": [
23
| "proj/*:env/*;qa_*:/flag/*"
24
| ],
25
| "notResources": [
26
| "notResources",
27
| "notResources"
28
| ],
29
| "actions": [
30
| "*"
31
| ],
32
| "notActions": [
33
| "string",
34
| "string"
35
| ],
36
| "role_name": "role_name"
37
| }
38
| },
39
| {
40
| "action": "action",
41
| "reason": {
42
| "effect": "allow",
43
| "resources": [
44
| "proj/*:env/*;qa_*:/flag/*"
45
| ],
46
| "notResources": [
47
| "notResources",
48
| "notResources"
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
| "string",
55
| "string"
56
| ],
57
| "role_name": "role_name"
58
| }
59
| }
60
| ],
61
| "denied": [
62
| {
63
| "action": "action",
64
| "reason": {
65
| "effect": "allow",
66
| "resources": [
67
| "proj/*:env/*;qa_*:/flag/*"
68
| ],
69
| "notResources": [
70
| "notResources",
71
| "notResources"
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
| "string",
78
| "string"
79
| ],
80
| "role_name": "role_name"
81
| }
82
| },
83
| {
84
| "action": "action",
85
| "reason": {
86
| "effect": "allow",
87
| "resources": [
88
| "proj/*:env/*;qa_*:/flag/*"
89
| ],
90
| "notResources": [
91
| "notResources",
92
| "notResources"
93
| ],
94
| "actions": [
95
| "*"
96
| ],
97
| "notActions": [
98
| "string",
99
| "string"
100
| ],
101
| "role_name": "role_name"
102
| }
103
| }
104
| ]
105
| }
106
| }
```
Create an announcement
### Authentication
Authorizationstring
API Key authentication via header
### Request
Announcement request body
isDismissiblebooleanRequired
true if the announcement is dismissible
titlestringRequired
The title of the announcement
messagestringRequired
The message of the announcement
startTimelongRequired
The start time of the announcement. This is a Unix timestamp in milliseconds.
severityenumRequired
The severity of the announcement
Allowed values:infowarningcritical
endTimelongOptional
The end time of the announcement. This is a Unix timestamp in milliseconds.
### Response
Created announcement
_idstring
The ID of the announcement
isDismissibleboolean
true if the announcement is dismissible
titlestring
The title of the announcement
messagestring
The message of the announcement
startTimelong
The start time of the announcement. This is a Unix timestamp in milliseconds.
severityenum
The severity of the announcement
Allowed values:infowarningcritical
_statusenum
The status of the announcement
Allowed values:activeinactivescheduled
_linksobject
Show 1 properties
endTimelong or null
The end time of the announcement. This is a Unix timestamp in milliseconds.
_accessobject or null
Show 2 properties
### Errors
400
Bad Request Error
403
Forbidden Error
404
Not Found Error
409
Conflict Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs