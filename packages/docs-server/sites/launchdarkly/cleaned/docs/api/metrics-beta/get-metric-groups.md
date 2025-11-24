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
/api/v2/projects/:projectKey/metric-groups
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects/projectKey/metric-groups \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/metrics-beta/get-metric-groups?explorer=true)
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
| "_id": "bc3e5be1-02d2-40c7-9926-26d0aacd7aab",
5
| "key": "metric-group-key-123abc",
6
| "name": "My metric group",
7
| "kind": "funnel",
8
| "_links": {
9
| "parent": {
10
| "href": "/api/v2/projects/my-project",
11
| "type": "application/json"
12
| },
13
| "self": {
14
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
15
| "type": "application/json"
16
| }
17
| },
18
| "tags": [
19
| "ops"
20
| ],
21
| "_creationDate": 1,
22
| "_lastModified": 1,
23
| "maintainer": {
24
| "member": {
25
| "_links": {
26
| "self": {
27
| "href": "/api/v2/members/569f183514f4432160000007",
28
| "type": "application/json"
29
| }
30
| },
31
| "_id": "569f183514f4432160000007",
32
| "role": "admin",
33
| "email": "ariel@acme.com",
34
| "firstName": "Ariel",
35
| "lastName": "Flores"
36
| },
37
| "team": {
38
| "customRoleKeys": [
39
| "access-to-test-projects"
40
| ],
41
| "key": "team-key-123abc",
42
| "name": "QA Team",
43
| "_links": {}
44
| }
45
| },
46
| "metrics": [
47
| {
48
| "key": "metric-key-123abc",
49
| "name": "Example metric",
50
| "kind": "custom",
51
| "_links": {
52
| "self": {
53
| "href": "/api/v2/metrics/my-project/my-metric",
54
| "type": "application/json"
55
| }
56
| },
57
| "_versionId": "version-id-123abc",
58
| "isNumeric": true,
59
| "unitAggregationType": "sum",
60
| "eventKey": "event-key-123abc",
61
| "nameInGroup": "Step 1",
62
| "randomizationUnits": [
63
| "user"
64
| ]
65
| }
66
| ],
67
| "_version": 1,
68
| "description": "Description of the metric group",
69
| "_access": {
70
| "denied": [
71
| {
72
| "action": "string",
73
| "reason": {
74
| "effect": "allow",
75
| "resources": [
76
| "proj/*:env/*;qa_*:/flag/*"
77
| ],
78
| "notResources": [
79
| "string"
80
| ],
81
| "actions": [
82
| "*"
83
| ],
84
| "notActions": [
85
| "string"
86
| ],
87
| "role_name": "string"
88
| }
89
| }
90
| ],
91
| "allowed": [
92
| {
93
| "action": "string",
94
| "reason": {
95
| "effect": "allow",
96
| "resources": [
97
| "proj/*:env/*;qa_*:/flag/*"
98
| ],
99
| "notResources": [
100
| "string"
101
| ],
102
| "actions": [
103
| "*"
104
| ],
105
| "notActions": [
106
| "string"
107
| ],
108
| "role_name": "string"
109
| }
110
| }
111
| ]
112
| },
113
| "experiments": [
114
| {
115
| "key": "experiment-key-123abc",
116
| "name": "Example experiment",
117
| "environmentId": "1234a56b7c89d012345e678f",
118
| "environmentKey": "production",
119
| "creationDate": 1,
120
| "_links": {
121
| "parent": {
122
| "href": "/api/v2/projects/my-project/environments/my-environment",
123
| "type": "application/json"
124
| },
125
| "self": {
126
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/example-experiment",
127
| "type": "application/json"
128
| }
129
| },
130
| "archivedDate": 1
131
| }
132
| ],
133
| "experimentCount": 0,
134
| "activeExperimentCount": 0,
135
| "activeGuardedRolloutCount": 0
136
| }
137
| ],
138
| "_links": {
139
| "parent": {
140
| "href": "/api/v2/projects/my-project",
141
| "type": "application/json"
142
| },
143
| "self": {
144
| "href": "/api/v2/projects/my-project/metric-groups",
145
| "type": "application/json"
146
| }
147
| },
148
| "totalCount": 1
149
| }
```
Get a list of all metric groups for the specified project. ### Expanding the metric groups response This endpoint does not support response expansion. Although the API accepts an `expand` query parameter for compatibility reasons, it does not currently modify the response. The parameter is reserved for future use. ### Filtering metric groups The `filter` parameter supports the following operators: `contains`, `equals`, `anyOf`. #### Supported fields and operators You can only filter certain fields in metrics when using the `filter` parameter. Additionally, you can only filter some fields with certain operators. When you search for metrics, the `filter` parameter supports the following fields and operators: |<div style="width:120px">Field</div> |Description |Supported operators | |---|---|---| | `experimentStatus` | The experiment's status. One of `not_started`, `running`, `stopped`, `started`. | `equals` | | `hasConnections` | Whether the metric group has connections to experiments or guarded rollouts. One of `true`, `false`. | `equals` | | `kind` | The metric group kind. One of `funnel`, `standard`. | `equals` | | `maintainerIds` | The metric maintainer IDs. | `anyOf` | | `maintainerTeamKey` | The metric maintainer team key. | `equals` | | `query` | A "fuzzy" search across metric group key and name. Supply a string or list of strings to the operator. | `equals` | ### Sorting metric groups LaunchDarkly supports the following fields for sorting: - `name` sorts by metric group name. - `createdAt` sorts by the creation date of the metric group. - `connectionCount` sorts by the number of connections to experiments the metric group has. By default, the sort is in ascending order. Use `-` to sort in descending order. For example, `?sort=name` sorts the response by metric group name in ascending order, and `?sort=-name` sorts in descending order. #### Sample query `filter=experimentStatus equals 'not_started' and query equals 'metric name'` 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
### Query Parameters
filterstringOptional`format: "string"`
Accepts filter by `experimentStatus`, `query`, `kind`, `hasConnections`, `maintainerIds`, and `maintainerTeamKey`. Example: `filter=experimentStatus equals 'running' and query equals 'test'`.
sortstringOptional`format: "string"`
A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. Read the endpoint description for a full list of available sort fields.
expandstringOptional`format: "string"`
This parameter is reserved for future use and is not currently supported on this endpoint.
limitlongOptional
The number of metric groups to return in the response. Defaults to 20. Maximum limit is 50.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.
### Response
Metric group collection response
itemslist of objects
An array of metric groups
Show 17 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
405
Method Not Allowed Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Get a list of all metric groups for the specified project.
### Expanding the metric groups response
This endpoint does not support response expansion.
Although the API accepts an `expand` query parameter for compatibility reasons, it does not currently modify the response. The parameter is reserved for future use.
### Filtering metric groups
The `filter` parameter supports the following operators: `contains`, `equals`, `anyOf`.
#### Supported fields and operators
You can only filter certain fields in metrics when using the `filter` parameter. Additionally, you can only filter some fields with certain operators.
When you search for metrics, the `filter` parameter supports the following fields and operators:
Field | Description | Supported operators 
---|---|--- 
`experimentStatus` | The experiment’s status. One of `not_started`, `running`, `stopped`, `started`. | `equals` 
`hasConnections` | Whether the metric group has connections to experiments or guarded rollouts. One of `true`, `false`. | `equals` 
`kind` | The metric group kind. One of `funnel`, `standard`. | `equals` 
`maintainerIds` | The metric maintainer IDs. | `anyOf` 
`maintainerTeamKey` | The metric maintainer team key. | `equals` 
`query` | A “fuzzy” search across metric group key and name. Supply a string or list of strings to the operator. | `equals` 
### Sorting metric groups
LaunchDarkly supports the following fields for sorting:
 * `name` sorts by metric group name.
 * `createdAt` sorts by the creation date of the metric group.
 * `connectionCount` sorts by the number of connections to experiments the metric group has.
By default, the sort is in ascending order. Use `-` to sort in descending order. For example, `?sort=name` sorts the response by metric group name in ascending order, and `?sort=-name` sorts in descending order.
#### Sample query
`filter=experimentStatus equals 'not_started' and query equals 'metric name'`