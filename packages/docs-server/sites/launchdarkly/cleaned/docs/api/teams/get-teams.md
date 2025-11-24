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
/api/v2/teams
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/teams"
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
[](/docs/api/teams/get-teams?explorer=true)
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
| "description": "Description for this team.",
5
| "key": "team-key-123abc",
6
| "name": "Example team",
7
| "_access": {
8
| "denied": [
9
| {
10
| "action": "string",
11
| "reason": {
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
| ],
25
| "role_name": "string"
26
| }
27
| }
28
| ],
29
| "allowed": [
30
| {
31
| "action": "string",
32
| "reason": {
33
| "effect": "allow",
34
| "resources": [
35
| "proj/*:env/*;qa_*:/flag/*"
36
| ],
37
| "notResources": [
38
| "string"
39
| ],
40
| "actions": [
41
| "*"
42
| ],
43
| "notActions": [
44
| "string"
45
| ],
46
| "role_name": "string"
47
| }
48
| }
49
| ]
50
| },
51
| "_creationDate": 1,
52
| "_links": {
53
| "parent": {
54
| "href": "/api/v2/teams",
55
| "type": "application/json"
56
| },
57
| "roles": {
58
| "href": "/api/v2/teams/example-team/roles",
59
| "type": "application/json"
60
| },
61
| "self": {
62
| "href": "/api/v2/teams/example-team",
63
| "type": "application/json"
64
| }
65
| },
66
| "_lastModified": 1,
67
| "_version": 3,
68
| "_idpSynced": true,
69
| "roleAttributes": {},
70
| "roles": {
71
| "totalCount": 1,
72
| "items": [
73
| {
74
| "key": "role-key-123abc",
75
| "name": "Example role",
76
| "projects": {
77
| "totalCount": 1,
78
| "items": [
79
| {
80
| "_id": "57be1db38b75bf0772d11383",
81
| "_links": {
82
| "environments": {
83
| "href": "/api/v2/projects/example-project/environments",
84
| "type": "application/json"
85
| },
86
| "self": {
87
| "href": "/api/v2/projects/example-project",
88
| "type": "application/json"
89
| }
90
| },
91
| "key": "project-key-123abc",
92
| "name": "Example project"
93
| }
94
| ]
95
| },
96
| "appliedOn": 1
97
| }
98
| ],
99
| "_links": {
100
| "self": {
101
| "href": "/api/v2/teams/example-team/roles?limit=25",
102
| "type": "application/json"
103
| }
104
| }
105
| },
106
| "members": {
107
| "totalCount": 15
108
| },
109
| "projects": {
110
| "totalCount": 1,
111
| "items": [
112
| {
113
| "_id": "57be1db38b75bf0772d11383",
114
| "_links": {
115
| "environments": {
116
| "href": "/api/v2/projects/example-project/environments",
117
| "type": "application/json"
118
| },
119
| "self": {
120
| "href": "/api/v2/projects/example-project",
121
| "type": "application/json"
122
| }
123
| },
124
| "key": "project-key-123abc",
125
| "name": "Example project"
126
| }
127
| ]
128
| },
129
| "maintainers": {
130
| "totalCount": 1,
131
| "items": [
132
| {
133
| "_links": {
134
| "self": {
135
| "href": "/api/v2/members/569f183514f4432160000007",
136
| "type": "application/json"
137
| }
138
| },
139
| "_id": "569f183514f4432160000007",
140
| "role": "reader",
141
| "email": "ariel@acme.com",
142
| "firstName": "Ariel",
143
| "lastName": "Flores"
144
| }
145
| ],
146
| "_links": {
147
| "self": {
148
| "href": "/api/v2/teams/example-team/maintainers?limit=20",
149
| "type": "application/json"
150
| }
151
| }
152
| }
153
| }
154
| ],
155
| "_links": {
156
| "self": {
157
| "href": "/api/v2/teams?expand=maintainers%2Cmembers%2Croles%2Cprojects&limit=20",
158
| "type": "application/json"
159
| }
160
| },
161
| "totalCount": 1
162
| }
```
Return a list of teams. By default, this returns the first 20 teams. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the `_links` field that returns. If those links do not appear, the pages they refer to don't exist. For example, the `first` and `prev` links will be missing from the response on the first page, because there is no previous page and you cannot return to the first page when you are already on the first page. ### Filtering teams LaunchDarkly supports the following fields for filters: - `query` is a string that matches against the teams' names and keys. It is not case-sensitive. - A request with `query:abc` returns teams with the string `abc` in their name or key. - `nomembers` is a boolean that filters the list of teams who have 0 members - A request with `nomembers:true` returns teams that have 0 members - A request with `nomembers:false` returns teams that have 1 or more members ### Expanding the teams response LaunchDarkly supports expanding several fields in the "List teams" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: * `members` includes the total count of members that belong to the team. * `roles` includes a paginated list of the custom roles that you have assigned to the team. * `roleAttributes` includes a list of the role attributes that you have assigned to the team. * `projects` includes a paginated list of the projects that the team has any write access to. * `maintainers` includes a paginated list of the maintainers that you have assigned to the team. For example, `expand=members,maintainers` includes the `members` and `maintainers` fields in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
limitlongOptional
The number of teams to return in the response. Defaults to 20.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is constructed as `field:value`.
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response.
### Response
Teams collection response
itemslist of objects
An array of teams
Show 14 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of teams
### Errors
401
Unauthorized Error
405
Method Not Allowed Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Return a list of teams.
By default, this returns the first 20 teams. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the `_links` field that returns. If those links do not appear, the pages they refer to don’t exist. For example, the `first` and `prev` links will be missing from the response on the first page, because there is no previous page and you cannot return to the first page when you are already on the first page.
### Filtering teams
LaunchDarkly supports the following fields for filters:
 * `query` is a string that matches against the teams’ names and keys. It is not case-sensitive.
 * A request with `query:abc` returns teams with the string `abc` in their name or key.
 * `nomembers` is a boolean that filters the list of teams who have 0 members
 * A request with `nomembers:true` returns teams that have 0 members
 * A request with `nomembers:false` returns teams that have 1 or more members
### Expanding the teams response
LaunchDarkly supports expanding several fields in the “List teams” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `members` includes the total count of members that belong to the team.
 * `roles` includes a paginated list of the custom roles that you have assigned to the team.
 * `roleAttributes` includes a list of the role attributes that you have assigned to the team.
 * `projects` includes a paginated list of the projects that the team has any write access to.
 * `maintainers` includes a paginated list of the maintainers that you have assigned to the team.
For example, `expand=members,maintainers` includes the `members` and `maintainers` fields in the response.