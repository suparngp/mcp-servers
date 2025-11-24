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
/api/v2/projects/:projectKey/ai-tools
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/ai-tools"
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
[](/docs/api/ai-configs-beta/list-ai-tools?explorer=true)
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
| "key": "key",
5
| "schema": "{}",
6
| "version": 0,
7
| "createdAt": 6,
8
| "_access": {
9
| "denied": [
10
| {
11
| "action": "action",
12
| "reason": {
13
| "effect": "allow",
14
| "resources": [
15
| "proj/*:env/*;qa_*:/flag/*"
16
| ],
17
| "notResources": [
18
| "notResources",
19
| "notResources"
20
| ],
21
| "actions": [
22
| "*"
23
| ],
24
| "notActions": [
25
| "string",
26
| "string"
27
| ],
28
| "role_name": "role_name"
29
| }
30
| },
31
| {
32
| "action": "action",
33
| "reason": {
34
| "effect": "allow",
35
| "resources": [
36
| "proj/*:env/*;qa_*:/flag/*"
37
| ],
38
| "notResources": [
39
| "notResources",
40
| "notResources"
41
| ],
42
| "actions": [
43
| "*"
44
| ],
45
| "notActions": [
46
| "string",
47
| "string"
48
| ],
49
| "role_name": "role_name"
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
| "action": "action",
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
| "notResources",
63
| "notResources"
64
| ],
65
| "actions": [
66
| "*"
67
| ],
68
| "notActions": [
69
| "string",
70
| "string"
71
| ],
72
| "role_name": "role_name"
73
| }
74
| },
75
| {
76
| "action": "action",
77
| "reason": {
78
| "effect": "allow",
79
| "resources": [
80
| "proj/*:env/*;qa_*:/flag/*"
81
| ],
82
| "notResources": [
83
| "notResources",
84
| "notResources"
85
| ],
86
| "actions": [
87
| "*"
88
| ],
89
| "notActions": [
90
| "string",
91
| "string"
92
| ],
93
| "role_name": "role_name"
94
| }
95
| }
96
| ]
97
| },
98
| "_links": {
99
| "self": {
100
| "href": "href",
101
| "type": "type"
102
| },
103
| "parent": {
104
| "href": "href",
105
| "type": "type"
106
| }
107
| },
108
| "_maintainer": {
109
| "_id": "string",
110
| "email": "string",
111
| "role": "string",
112
| "kind": "kind"
113
| },
114
| "description": "description"
115
| },
116
| {
117
| "key": "key",
118
| "schema": "{}",
119
| "version": 0,
120
| "createdAt": 6,
121
| "_access": {
122
| "denied": [
123
| {
124
| "action": "action",
125
| "reason": {
126
| "effect": "allow",
127
| "resources": [
128
| "proj/*:env/*;qa_*:/flag/*"
129
| ],
130
| "notResources": [
131
| "notResources",
132
| "notResources"
133
| ],
134
| "actions": [
135
| "*"
136
| ],
137
| "notActions": [
138
| "string",
139
| "string"
140
| ],
141
| "role_name": "role_name"
142
| }
143
| },
144
| {
145
| "action": "action",
146
| "reason": {
147
| "effect": "allow",
148
| "resources": [
149
| "proj/*:env/*;qa_*:/flag/*"
150
| ],
151
| "notResources": [
152
| "notResources",
153
| "notResources"
154
| ],
155
| "actions": [
156
| "*"
157
| ],
158
| "notActions": [
159
| "string",
160
| "string"
161
| ],
162
| "role_name": "role_name"
163
| }
164
| }
165
| ],
166
| "allowed": [
167
| {
168
| "action": "action",
169
| "reason": {
170
| "effect": "allow",
171
| "resources": [
172
| "proj/*:env/*;qa_*:/flag/*"
173
| ],
174
| "notResources": [
175
| "notResources",
176
| "notResources"
177
| ],
178
| "actions": [
179
| "*"
180
| ],
181
| "notActions": [
182
| "string",
183
| "string"
184
| ],
185
| "role_name": "role_name"
186
| }
187
| },
188
| {
189
| "action": "action",
190
| "reason": {
191
| "effect": "allow",
192
| "resources": [
193
| "proj/*:env/*;qa_*:/flag/*"
194
| ],
195
| "notResources": [
196
| "notResources",
197
| "notResources"
198
| ],
199
| "actions": [
200
| "*"
201
| ],
202
| "notActions": [
203
| "string",
204
| "string"
205
| ],
206
| "role_name": "role_name"
207
| }
208
| }
209
| ]
210
| },
211
| "_links": {
212
| "self": {
213
| "href": "href",
214
| "type": "type"
215
| },
216
| "parent": {
217
| "href": "href",
218
| "type": "type"
219
| }
220
| },
221
| "_maintainer": {
222
| "_id": "string",
223
| "email": "string",
224
| "role": "string",
225
| "kind": "kind"
226
| },
227
| "description": "description"
228
| }
229
| ],
230
| "totalCount": 1,
231
| "_links": {
232
| "self": {
233
| "href": "href",
234
| "type": "type"
235
| },
236
| "first": {
237
| "href": "href",
238
| "type": "type"
239
| },
240
| "last": {
241
| "href": "href",
242
| "type": "type"
243
| },
244
| "next": {
245
| "href": "href",
246
| "type": "type"
247
| },
248
| "prev": {
249
| "href": "href",
250
| "type": "type"
251
| }
252
| }
253
| }
```
Get a list of all AI tools in the given project.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Query Parameters
sortstringOptional
A sort to apply to the list of AI Configs.
limitintegerOptional
The number of AI Configs to return.
offsetintegerOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
filterstringOptional
A filter to apply to the list of AI Configs.
### Response
Successful response
itemslist of objects
Show 8 properties
totalCountinteger
_linksobject or null
Show 5 properties
### Errors
400
Bad Request Error
403
Forbidden Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs