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
/api/v2/projects/:projectKey/ai-configs/:configKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/ai-configs/configKey"
4
| 
5
| headers = {
6
| "LD-API-Version": "beta",
7
| "Authorization": "<apiKey>"
8
| }
9
| 
10
| response = requests.get(url, headers=headers)
11
| 
12
| print(response.json())
```
[](/docs/api/ai-configs-beta/get-ai-config?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "description": "description",
3
| "key": "key",
4
| "name": "name",
5
| "tags": [
6
| "tags",
7
| "tags"
8
| ],
9
| "version": 0,
10
| "variations": [
11
| {
12
| "key": "key",
13
| "_id": "_id",
14
| "model": "{}",
15
| "name": "name",
16
| "createdAt": 6,
17
| "version": 1,
18
| "_links": {
19
| "parent": {
20
| "href": "href",
21
| "type": "type"
22
| }
23
| },
24
| "color": "color",
25
| "comment": "comment",
26
| "description": "description",
27
| "instructions": "instructions",
28
| "messages": [
29
| {
30
| "content": "content",
31
| "role": "role"
32
| },
33
| {
34
| "content": "content",
35
| "role": "role"
36
| }
37
| ],
38
| "modelConfigKey": "modelConfigKey",
39
| "state": "state",
40
| "_archivedAt": 5,
41
| "_publishedAt": 5,
42
| "tools": [
43
| {
44
| "key": "key",
45
| "version": 2
46
| },
47
| {
48
| "key": "key",
49
| "version": 2
50
| }
51
| ],
52
| "judgeConfiguration": {
53
| "judges": [
54
| {
55
| "judgeConfigKey": "judgeConfigKey",
56
| "samplingRate": 0.7061401
57
| },
58
| {
59
| "judgeConfigKey": "judgeConfigKey",
60
| "samplingRate": 0.7061401
61
| }
62
| ]
63
| },
64
| "judgingConfigKeys": [
65
| "judgingConfigKeys",
66
| "judgingConfigKeys"
67
| ]
68
| },
69
| {
70
| "key": "key",
71
| "_id": "_id",
72
| "model": "{}",
73
| "name": "name",
74
| "createdAt": 6,
75
| "version": 1,
76
| "_links": {
77
| "parent": {
78
| "href": "href",
79
| "type": "type"
80
| }
81
| },
82
| "color": "color",
83
| "comment": "comment",
84
| "description": "description",
85
| "instructions": "instructions",
86
| "messages": [
87
| {
88
| "content": "content",
89
| "role": "role"
90
| },
91
| {
92
| "content": "content",
93
| "role": "role"
94
| }
95
| ],
96
| "modelConfigKey": "modelConfigKey",
97
| "state": "state",
98
| "_archivedAt": 5,
99
| "_publishedAt": 5,
100
| "tools": [
101
| {
102
| "key": "key",
103
| "version": 2
104
| },
105
| {
106
| "key": "key",
107
| "version": 2
108
| }
109
| ],
110
| "judgeConfiguration": {
111
| "judges": [
112
| {
113
| "judgeConfigKey": "judgeConfigKey",
114
| "samplingRate": 0.7061401
115
| },
116
| {
117
| "judgeConfigKey": "judgeConfigKey",
118
| "samplingRate": 0.7061401
119
| }
120
| ]
121
| },
122
| "judgingConfigKeys": [
123
| "judgingConfigKeys",
124
| "judgingConfigKeys"
125
| ]
126
| }
127
| ],
128
| "createdAt": 9,
129
| "updatedAt": 3,
130
| "_access": {
131
| "denied": [
132
| {
133
| "action": "action",
134
| "reason": {
135
| "effect": "allow",
136
| "resources": [
137
| "proj/*:env/*;qa_*:/flag/*"
138
| ],
139
| "notResources": [
140
| "notResources",
141
| "notResources"
142
| ],
143
| "actions": [
144
| "*"
145
| ],
146
| "notActions": [
147
| "string",
148
| "string"
149
| ],
150
| "role_name": "role_name"
151
| }
152
| },
153
| {
154
| "action": "action",
155
| "reason": {
156
| "effect": "allow",
157
| "resources": [
158
| "proj/*:env/*;qa_*:/flag/*"
159
| ],
160
| "notResources": [
161
| "notResources",
162
| "notResources"
163
| ],
164
| "actions": [
165
| "*"
166
| ],
167
| "notActions": [
168
| "string",
169
| "string"
170
| ],
171
| "role_name": "role_name"
172
| }
173
| }
174
| ],
175
| "allowed": [
176
| {
177
| "action": "action",
178
| "reason": {
179
| "effect": "allow",
180
| "resources": [
181
| "proj/*:env/*;qa_*:/flag/*"
182
| ],
183
| "notResources": [
184
| "notResources",
185
| "notResources"
186
| ],
187
| "actions": [
188
| "*"
189
| ],
190
| "notActions": [
191
| "string",
192
| "string"
193
| ],
194
| "role_name": "role_name"
195
| }
196
| },
197
| {
198
| "action": "action",
199
| "reason": {
200
| "effect": "allow",
201
| "resources": [
202
| "proj/*:env/*;qa_*:/flag/*"
203
| ],
204
| "notResources": [
205
| "notResources",
206
| "notResources"
207
| ],
208
| "actions": [
209
| "*"
210
| ],
211
| "notActions": [
212
| "string",
213
| "string"
214
| ],
215
| "role_name": "role_name"
216
| }
217
| }
218
| ]
219
| },
220
| "_links": {
221
| "self": {
222
| "href": "href",
223
| "type": "type"
224
| },
225
| "parent": {
226
| "href": "href",
227
| "type": "type"
228
| }
229
| },
230
| "_maintainer": {
231
| "_id": "string",
232
| "email": "string",
233
| "role": "string",
234
| "kind": "kind"
235
| },
236
| "mode": "completion",
237
| "evaluationMetricKeys": [
238
| "evaluationMetricKeys",
239
| "evaluationMetricKeys"
240
| ]
241
| }
```
Retrieve a specific AI Config by its key.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
configKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Response
AI Config found
descriptionstring
keystring
namestring
tagslist of strings
versioninteger
variationslist of objects
Show 19 properties
createdAtlong
updatedAtlong
_accessobject or null
Show 2 properties
_linksobject or null
The location and content type of related resources
Show 2 properties
_maintainerobject or null
Show 2 variants
modeenum or nullDefaults to `completion`
Allowed values:agentcompletionjudge
evaluationMetricKeyslist of strings or null
List of evaluation metric keys for this AI config
### Errors
400
Bad Request Error
403
Forbidden Error
404
Not Found Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs