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
| querystring = {"status":"active"}
6
| 
7
| headers = {"Authorization": "<apiKey>"}
8
| 
9
| response = requests.get(url, headers=headers, params=querystring)
10
| 
11
| print(response.json())
```
[](/docs/api/announcements/get-announcements-public?explorer=true)
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
| "_id": "1234567890",
5
| "isDismissible": true,
6
| "title": "System Maintenance Notice",
7
| "message": "**Important Update:**\n\nPlease be aware of the upcoming maintenance scheduled for *October 31st, 2024*. The system will be unavailable from **12:00 AM** to **4:00 AM**.",
8
| "startTime": 1731439812,
9
| "severity": "info",
10
| "_status": "active",
11
| "_links": {
12
| "parent": {
13
| "href": "href",
14
| "type": "type"
15
| }
16
| },
17
| "endTime": 1731439880,
18
| "_access": {
19
| "allowed": [
20
| {
21
| "action": "action",
22
| "reason": {
23
| "effect": "allow",
24
| "resources": [
25
| "proj/*:env/*;qa_*:/flag/*"
26
| ],
27
| "notResources": [
28
| "notResources",
29
| "notResources"
30
| ],
31
| "actions": [
32
| "*"
33
| ],
34
| "notActions": [
35
| "string",
36
| "string"
37
| ],
38
| "role_name": "role_name"
39
| }
40
| },
41
| {
42
| "action": "action",
43
| "reason": {
44
| "effect": "allow",
45
| "resources": [
46
| "proj/*:env/*;qa_*:/flag/*"
47
| ],
48
| "notResources": [
49
| "notResources",
50
| "notResources"
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
| "string",
57
| "string"
58
| ],
59
| "role_name": "role_name"
60
| }
61
| }
62
| ],
63
| "denied": [
64
| {
65
| "action": "action",
66
| "reason": {
67
| "effect": "allow",
68
| "resources": [
69
| "proj/*:env/*;qa_*:/flag/*"
70
| ],
71
| "notResources": [
72
| "notResources",
73
| "notResources"
74
| ],
75
| "actions": [
76
| "*"
77
| ],
78
| "notActions": [
79
| "string",
80
| "string"
81
| ],
82
| "role_name": "role_name"
83
| }
84
| },
85
| {
86
| "action": "action",
87
| "reason": {
88
| "effect": "allow",
89
| "resources": [
90
| "proj/*:env/*;qa_*:/flag/*"
91
| ],
92
| "notResources": [
93
| "notResources",
94
| "notResources"
95
| ],
96
| "actions": [
97
| "*"
98
| ],
99
| "notActions": [
100
| "string",
101
| "string"
102
| ],
103
| "role_name": "role_name"
104
| }
105
| }
106
| ]
107
| }
108
| },
109
| {
110
| "_id": "1234567890",
111
| "isDismissible": true,
112
| "title": "System Maintenance Notice",
113
| "message": "**Important Update:**\n\nPlease be aware of the upcoming maintenance scheduled for *October 31st, 2024*. The system will be unavailable from **12:00 AM** to **4:00 AM**.",
114
| "startTime": 1731439812,
115
| "severity": "info",
116
| "_status": "active",
117
| "_links": {
118
| "parent": {
119
| "href": "href",
120
| "type": "type"
121
| }
122
| },
123
| "endTime": 1731439880,
124
| "_access": {
125
| "allowed": [
126
| {
127
| "action": "action",
128
| "reason": {
129
| "effect": "allow",
130
| "resources": [
131
| "proj/*:env/*;qa_*:/flag/*"
132
| ],
133
| "notResources": [
134
| "notResources",
135
| "notResources"
136
| ],
137
| "actions": [
138
| "*"
139
| ],
140
| "notActions": [
141
| "string",
142
| "string"
143
| ],
144
| "role_name": "role_name"
145
| }
146
| },
147
| {
148
| "action": "action",
149
| "reason": {
150
| "effect": "allow",
151
| "resources": [
152
| "proj/*:env/*;qa_*:/flag/*"
153
| ],
154
| "notResources": [
155
| "notResources",
156
| "notResources"
157
| ],
158
| "actions": [
159
| "*"
160
| ],
161
| "notActions": [
162
| "string",
163
| "string"
164
| ],
165
| "role_name": "role_name"
166
| }
167
| }
168
| ],
169
| "denied": [
170
| {
171
| "action": "action",
172
| "reason": {
173
| "effect": "allow",
174
| "resources": [
175
| "proj/*:env/*;qa_*:/flag/*"
176
| ],
177
| "notResources": [
178
| "notResources",
179
| "notResources"
180
| ],
181
| "actions": [
182
| "*"
183
| ],
184
| "notActions": [
185
| "string",
186
| "string"
187
| ],
188
| "role_name": "role_name"
189
| }
190
| },
191
| {
192
| "action": "action",
193
| "reason": {
194
| "effect": "allow",
195
| "resources": [
196
| "proj/*:env/*;qa_*:/flag/*"
197
| ],
198
| "notResources": [
199
| "notResources",
200
| "notResources"
201
| ],
202
| "actions": [
203
| "*"
204
| ],
205
| "notActions": [
206
| "string",
207
| "string"
208
| ],
209
| "role_name": "role_name"
210
| }
211
| }
212
| ]
213
| }
214
| }
215
| ],
216
| "_links": {
217
| "self": {
218
| "href": "href",
219
| "type": "type"
220
| },
221
| "first": {
222
| "href": "href",
223
| "type": "type"
224
| },
225
| "last": {
226
| "href": "href",
227
| "type": "type"
228
| },
229
| "next": {
230
| "href": "href",
231
| "type": "type"
232
| },
233
| "prev": {
234
| "href": "href",
235
| "type": "type"
236
| }
237
| }
238
| }
```
Get announcements
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
statusenumOptional
Filter announcements by status.
Allowed values:activeinactivescheduled
limitintegerOptional
The number of announcements to return.
offsetintegerOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
### Response
Announcement response
itemslist of objects
Show 10 properties
_linksobject
Show 5 properties
### Errors
400
Bad Request Error
403
Forbidden Error
404
Not Found Error
429
Too Many Requests Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs