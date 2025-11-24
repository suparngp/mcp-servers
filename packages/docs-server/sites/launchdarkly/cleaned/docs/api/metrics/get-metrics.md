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
/api/v2/metrics/:projectKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/metrics/projectKey"
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
[](/docs/api/metrics/get-metrics?explorer=true)
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
| "_id": "5902deadbeef667524a01290",
5
| "_versionId": "version-id-123abc",
6
| "key": "metric-key-123abc",
7
| "name": "My metric",
8
| "kind": "custom",
9
| "_links": {
10
| "parent": {
11
| "href": "/api/v2/metrics/my-project",
12
| "type": "application/json"
13
| },
14
| "self": {
15
| "href": "/api/v2/metrics/my-project/my-metric",
16
| "type": "application/json"
17
| }
18
| },
19
| "tags": [],
20
| "_creationDate": 1,
21
| "dataSource": {
22
| "key": "string",
23
| "environmentKey": "string",
24
| "_name": "string",
25
| "_integrationKey": "string"
26
| },
27
| "experimentCount": 0,
28
| "metricGroupCount": 0,
29
| "activeExperimentCount": 2,
30
| "activeGuardedRolloutCount": 1,
31
| "_version": 1,
32
| "_attachedFlagCount": 0,
33
| "_site": {
34
| "href": "string",
35
| "type": "string"
36
| },
37
| "_access": {
38
| "denied": [
39
| {
40
| "action": "string",
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
| "string"
48
| ],
49
| "actions": [
50
| "*"
51
| ],
52
| "notActions": [
53
| "string"
54
| ],
55
| "role_name": "string"
56
| }
57
| }
58
| ],
59
| "allowed": [
60
| {
61
| "action": "string",
62
| "reason": {
63
| "effect": "allow",
64
| "resources": [
65
| "proj/*:env/*;qa_*:/flag/*"
66
| ],
67
| "notResources": [
68
| "string"
69
| ],
70
| "actions": [
71
| "*"
72
| ],
73
| "notActions": [
74
| "string"
75
| ],
76
| "role_name": "string"
77
| }
78
| }
79
| ]
80
| },
81
| "lastModified": {
82
| "date": "2021-08-05T19:46:31.148082Z"
83
| },
84
| "maintainerId": "569fdeadbeef1644facecafe",
85
| "_maintainer": {
86
| "_links": {
87
| "self": {
88
| "href": "/api/v2/members/569f183514f4432160000007",
89
| "type": "application/json"
90
| }
91
| },
92
| "_id": "569f183514f4432160000007",
93
| "role": "admin",
94
| "email": "ariel@acme.com",
95
| "firstName": "Ariel",
96
| "lastName": "Flores"
97
| },
98
| "description": "string",
99
| "category": "Error monitoring",
100
| "isNumeric": true,
101
| "successCriteria": "HigherThanBaseline",
102
| "unit": "string",
103
| "eventKey": "Order placed",
104
| "randomizationUnits": [
105
| "user"
106
| ],
107
| "filters": {
108
| "type": "contextAttribute",
109
| "op": "string",
110
| "values": [
111
| "JP"
112
| ],
113
| "negate": false,
114
| "attribute": "country",
115
| "contextKind": "user"
116
| },
117
| "unitAggregationType": "average",
118
| "analysisType": "mean",
119
| "percentileValue": 95,
120
| "eventDefault": {
121
| "disabled": true,
122
| "value": 0
123
| },
124
| "archived": true,
125
| "archivedAt": 1,
126
| "selector": "string",
127
| "urls": [
128
| {}
129
| ]
130
| }
131
| ],
132
| "_links": {
133
| "self": {
134
| "href": "/api/v2/metrics/my-project?limit=20",
135
| "type": "application/json"
136
| }
137
| },
138
| "totalCount": 1
139
| }
```
Get a list of all metrics for the specified project. ### Filtering metrics The `filter` parameter supports the following operators: `contains`, `equals`, `anyOf`. #### Supported fields and operators You can only filter certain fields in metrics when using the `filter` parameter. Additionally, you can only filter some fields with certain operators. When you search for metrics, the `filter` parameter supports the following fields and operators: |<div style="width:120px">Field</div> |Description |Supported operators | |---|---|---| | `eventKind` | The metric event kind. One of `custom`, `pageview`, `click`. | `equals` | | `hasConnections` | Whether the metric has connections to experiments or guarded rollouts. One of `true`, `false`. | `equals` | | `isNumeric` | Whether the metric is numeric. One of `true`, `false`. | `equals` | | `maintainerIds` | A comma-separated list of metric maintainer IDs. | `anyOf` | | `maintainerTeamKey` | The metric maintainer team key. | `equals` | | `metricUsedIn` | Filter by where the metric is used. One of `experiments`, `guarded_rollouts`, `any`, `none`. | `equals` | | `query` | A "fuzzy" search across metric key and name. Supply a string or list of strings to the operator. | `equals` | | `tags` | The metric tags. | `contains` | | `unitAggregationType` | The metric's unit aggregation type. One of `sum`, `average`. | `equals` | For example, the filter `?filter=tags contains ["tag1", "tag2", "tag3"]` matches metrics that have all three tags. The documented values for `filter` query parameters are prior to URL encoding. For example, the `[` in `?filter=tags contains ["tag1", "tag2", "tag3"]` must be encoded to `%5B`. ### Expanding the metric list response LaunchDarkly supports expanding the "List metrics" response. By default, the expandable field is **not** included in the response. To expand the response, append the `expand` query parameter and add the following supported field: - `experimentCount` includes the number of experiments from the specific project that use the metric For example, `expand=experimentCount` includes the `experimentCount` field for each metric in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response.
limitlongOptional
The number of metrics to return in the response. Defaults to 20. Maximum limit is 50.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.
sortstringOptional`format: "string"`
A field to sort the items by. Prefix field by a dash ( - ) to sort in descending order. This endpoint supports sorting by `createdAt` or `name`.
filterstringOptional`format: "string"`
A comma-separated list of filters. This endpoint accepts filtering by `query`, `tags`, 'eventKind', 'isNumeric', 'unitAggregationType`, `hasConnections`, `maintainerIds`, `maintainerTeamKey`, `view`, `dataSourceKeys`, and `metricUsedIn`. To learn more about the filter syntax, read the 'Filtering metrics' section above.
### Response
Metrics collection response
itemslist of objects or null
An array of metrics
Show 36 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
### Errors
401
Unauthorized Error
404
Not Found Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Get a list of all metrics for the specified project.
### Filtering metrics
The `filter` parameter supports the following operators: `contains`, `equals`, `anyOf`.
#### Supported fields and operators
You can only filter certain fields in metrics when using the `filter` parameter. Additionally, you can only filter some fields with certain operators.
When you search for metrics, the `filter` parameter supports the following fields and operators:
Field | Description | Supported operators 
---|---|--- 
`eventKind` | The metric event kind. One of `custom`, `pageview`, `click`. | `equals` 
`hasConnections` | Whether the metric has connections to experiments or guarded rollouts. One of `true`, `false`. | `equals` 
`isNumeric` | Whether the metric is numeric. One of `true`, `false`. | `equals` 
`maintainerIds` | A comma-separated list of metric maintainer IDs. | `anyOf` 
`maintainerTeamKey` | The metric maintainer team key. | `equals` 
`metricUsedIn` | Filter by where the metric is used. One of `experiments`, `guarded_rollouts`, `any`, `none`. | `equals` 
`query` | A “fuzzy” search across metric key and name. Supply a string or list of strings to the operator. | `equals` 
`tags` | The metric tags. | `contains` 
`unitAggregationType` | The metric’s unit aggregation type. One of `sum`, `average`. | `equals` 
For example, the filter `?filter=tags contains ["tag1", "tag2", "tag3"]` matches metrics that have all three tags.
The documented values for `filter` query parameters are prior to URL encoding. For example, the `[` in `?filter=tags contains ["tag1", "tag2", "tag3"]` must be encoded to `%5B`.
### Expanding the metric list response
LaunchDarkly supports expanding the “List metrics” response. By default, the expandable field is **not** included in the response.
To expand the response, append the `expand` query parameter and add the following supported field:
 * `experimentCount` includes the number of experiments from the specific project that use the metric
For example, `expand=experimentCount` includes the `experimentCount` field for each metric in the response.
A comma-separated list of filters. This endpoint accepts filtering by `query`, `tags`, ‘eventKind’, ‘isNumeric’, ‘unitAggregationType`, `hasConnections`, `maintainerIds`, `maintainerTeamKey`, `view`, `dataSourceKeys`, and `metricUsedIn`. To learn more about the filter syntax, read the ‘Filtering metrics’ section above.