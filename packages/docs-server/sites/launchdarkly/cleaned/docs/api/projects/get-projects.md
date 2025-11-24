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
/api/v2/projects
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/projects/get-projects?explorer=true)
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
| "href": "/api/v2/projects",
5
| "type": "application/json"
6
| }
7
| },
8
| "items": [
9
| {
10
| "_links": {
11
| "environments": {
12
| "href": "/api/v2/projects/my-project/environments",
13
| "type": "application/json"
14
| },
15
| "self": {
16
| "href": "/api/v2/projects/my-project",
17
| "type": "application/json"
18
| }
19
| },
20
| "_id": "57be1db38b75bf0772d11383",
21
| "key": "project-key-123abc",
22
| "includeInSnippetByDefault": true,
23
| "name": "My Project",
24
| "tags": [
25
| "ops"
26
| ],
27
| "defaultClientSideAvailability": {
28
| "usingMobileKey": true,
29
| "usingEnvironmentId": true
30
| },
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
| "defaultReleasePipelineKey": "string",
76
| "environments": {
77
| "items": [
78
| {
79
| "_links": {
80
| "self": {
81
| "href": "/api/v2/projects/my-project/environments/my-environment",
82
| "type": "application/json"
83
| }
84
| },
85
| "_id": "57be1db38b75bf0772d11384",
86
| "key": "environment-key-123abc",
87
| "name": "My Environment",
88
| "apiKey": "sdk-xxx",
89
| "mobileKey": "mob-xxx",
90
| "color": "F5A623",
91
| "defaultTtl": 5,
92
| "secureMode": true,
93
| "defaultTrackEvents": false,
94
| "requireComments": true,
95
| "confirmChanges": true,
96
| "tags": [
97
| "ops"
98
| ],
99
| "critical": true,
100
| "_access": {
101
| "denied": [
102
| {
103
| "action": "string",
104
| "reason": {
105
| "effect": "allow",
106
| "resources": [
107
| "proj/*:env/*;qa_*:/flag/*"
108
| ],
109
| "notResources": [
110
| "string"
111
| ],
112
| "actions": [
113
| "*"
114
| ],
115
| "notActions": [
116
| "string"
117
| ],
118
| "role_name": "string"
119
| }
120
| }
121
| ],
122
| "allowed": [
123
| {
124
| "action": "string",
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
| "string"
132
| ],
133
| "actions": [
134
| "*"
135
| ],
136
| "notActions": [
137
| "string"
138
| ],
139
| "role_name": "string"
140
| }
141
| }
142
| ]
143
| },
144
| "approvalSettings": {
145
| "required": true,
146
| "bypassApprovalsForPendingChanges": false,
147
| "minNumApprovals": 1,
148
| "canReviewOwnRequest": false,
149
| "canApplyDeclinedChanges": true,
150
| "serviceKind": "launchdarkly",
151
| "serviceConfig": {},
152
| "requiredApprovalTags": [
153
| "require-approval"
154
| ],
155
| "autoApplyApprovedChanges": true,
156
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
157
| "resourceKind": "string"
158
| },
159
| "resourceApprovalSettings": {}
160
| }
161
| ],
162
| "_links": {},
163
| "totalCount": 2
164
| }
165
| }
166
| ],
167
| "totalCount": 1
168
| }
```
Return a list of projects. By default, this returns the first 20 projects. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the `_links` field that returns. If those links do not appear, the pages they refer to don't exist. For example, the `first` and `prev` links will be missing from the response on the first page, because there is no previous page and you cannot return to the first page when you are already on the first page. ### Filtering projects LaunchDarkly supports three fields for filters: - `query` is a string that matches against the projects' names and keys. It is not case sensitive. - `tags` is a `+`-separated list of project tags. It filters the list of projects that have all of the tags in the list. - `keys` is a `|` separated list of project keys. It filters the list to projects that have any of the keys in the list. For example, the filter `filter=query:abc,tags:tag-1+tag-2` matches projects with the string `abc` in their name or key and also are tagged with `tag-1` and `tag-2`. The filter is not case-sensitive. The documented values for `filter` query parameters are prior to URL encoding. For example, the `+` in `filter=tags:tag-1+tag-2` must be encoded to `%2B`. ### Sorting projects LaunchDarkly supports two fields for sorting: - `name` sorts by project name. - `createdOn` sorts by the creation date of the project. For example, `sort=name` sorts the response by project name in ascending order. ### Expanding the projects response LaunchDarkly supports one field for expanding the "List projects" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with the `environments` field. * `environments` includes a paginated list of the project environments. For example, `expand=environments` includes the `environments` field for each project in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
limitlongOptional
The number of projects to return in the response. Defaults to 20.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is constructed as `field:value`.
sortstringOptional`format: "string"`
A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order.
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response.
### Response
Project collection response
_linksmap from strings to objects
A link to this resource.
Show 2 properties
itemslist of objects
List of projects.
Show 10 properties
totalCountinteger or null
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Return a list of projects.
By default, this returns the first 20 projects. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the `_links` field that returns. If those links do not appear, the pages they refer to don’t exist. For example, the `first` and `prev` links will be missing from the response on the first page, because there is no previous page and you cannot return to the first page when you are already on the first page.
### Filtering projects
LaunchDarkly supports three fields for filters:
 * `query` is a string that matches against the projects’ names and keys. It is not case sensitive.
 * `tags` is a `+`-separated list of project tags. It filters the list of projects that have all of the tags in the list.
 * `keys` is a `|` separated list of project keys. It filters the list to projects that have any of the keys in the list.
For example, the filter `filter=query:abc,tags:tag-1+tag-2` matches projects with the string `abc` in their name or key and also are tagged with `tag-1` and `tag-2`. The filter is not case-sensitive.
The documented values for `filter` query parameters are prior to URL encoding. For example, the `+` in `filter=tags:tag-1+tag-2` must be encoded to `%2B`.
### Sorting projects
LaunchDarkly supports two fields for sorting:
 * `name` sorts by project name.
 * `createdOn` sorts by the creation date of the project.
For example, `sort=name` sorts the response by project name in ascending order.
### Expanding the projects response
LaunchDarkly supports one field for expanding the “List projects” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with the `environments` field.
 * `environments` includes a paginated list of the project environments.
For example, `expand=environments` includes the `environments` field for each project in the response.