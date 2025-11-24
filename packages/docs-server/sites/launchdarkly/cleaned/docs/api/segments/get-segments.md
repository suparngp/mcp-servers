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
/api/v2/segments/:projectKey/:environmentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/segments/projectKey/environmentKey"
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
[](/docs/api/segments/get-segments?explorer=true)
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
| "name": "Example segment",
5
| "tags": [
6
| "testing"
7
| ],
8
| "creationDate": 1,
9
| "lastModifiedDate": 1,
10
| "key": "segment-key-123abc",
11
| "_links": {},
12
| "rules": [
13
| {
14
| "clauses": [
15
| {
16
| "attribute": "email",
17
| "op": "endsWith",
18
| "values": [
19
| ".edu"
20
| ],
21
| "negate": false,
22
| "_id": "12ab3c45de678910fab12345"
23
| }
24
| ],
25
| "_id": "1234a56b7c89d012345e678f"
26
| }
27
| ],
28
| "version": 1,
29
| "deleted": false,
30
| "generation": 1,
31
| "description": "Bundle our sample customers together",
32
| "included": [
33
| "user-key-123abc"
34
| ],
35
| "excluded": [
36
| "user-key-123abc"
37
| ],
38
| "includedContexts": [
39
| {
40
| "values": [
41
| "string"
42
| ],
43
| "contextKind": "string"
44
| }
45
| ],
46
| "excludedContexts": [
47
| {
48
| "values": [
49
| "string"
50
| ],
51
| "contextKind": "string"
52
| }
53
| ],
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
| },
98
| "_flags": [
99
| {
100
| "name": "Example flag",
101
| "key": "flag-key-123abc",
102
| "_links": {},
103
| "_site": {
104
| "href": "string",
105
| "type": "string"
106
| }
107
| }
108
| ],
109
| "unbounded": false,
110
| "unboundedContextKind": "string",
111
| "_unboundedMetadata": {
112
| "envId": "string",
113
| "segmentId": "string",
114
| "version": 1,
115
| "includedCount": 1,
116
| "excludedCount": 1,
117
| "lastModified": 1,
118
| "deleted": true
119
| },
120
| "_external": "amplitude",
121
| "_externalLink": "https://analytics.amplitude.com/org/1234/cohort/123abc",
122
| "_importInProgress": false
123
| }
124
| ],
125
| "_links": {},
126
| "totalCount": 1
127
| }
```
Get a list of all segments in the given project. Segments can be rule-based, list-based, or synced. Big segments include larger list-based segments and synced segments. Some fields in the response only apply to big segments. ### Filtering segments The `filter` parameter supports the following operators: `equals`, `anyOf`, and `exists`. You can also combine filters in the following ways: - Use a comma (`,`) as an AND operator - Use a vertical bar (`|`) as an OR operator - Use parentheses (`()`) to group filters #### Supported fields and operators You can only filter certain fields in segments when using the `filter` parameter. Additionally, you can only filter some fields with certain operators. When you search for segments, the `filter` parameter supports the following fields and operators: |<div style="width:120px">Field</div> |Description |Supported operators | |---|---|---| | `excludedKeys` | The segment keys of segments to exclude from the results. | `anyOf` | | `external` | Whether the segment is a synced segment. | `exists` | | `includedKeys` | The segment keys of segments to include in the results. | `anyOf` | | `query` | A "fuzzy" search across segment key, name, and description. Supply a string or list of strings to the operator. | `equals` | | `tags` | The segment tags. | `anyOf` | | `unbounded` | Whether the segment is a standard segment (`false`) or a big segment (`true`). Standard segments include rule-based segments and smaller list-based segments. Big segments include larger list-based segments and synced segments. | `equals` | Here are a few examples: * The filter `?filter=tags anyOf ["enterprise", "beta"],query equals "toggle"` matches segments with "toggle" in their key, name, or description that also have "enterprise" or "beta" as a tag. * The filter `?filter=excludedKeys anyOf ["segmentKey1", "segmentKey2"]` excludes the segments with those keys from the results. * The filter `?filter=unbounded equals true` matches larger list-based segments and synced segments. The documented values for `filter` query parameters are prior to URL encoding. For example, the `[` in `?filter=tags anyOf ["enterprise", "beta"]` must be encoded to `%5B`. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Query Parameters
limitlongOptional
The number of segments to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
sortstringOptional`format: "string"`
Accepts sorting order and fields. Fields can be comma separated. Possible fields are ‘creationDate’, ‘name’, ‘lastModified’. Example: `sort=name` sort by names ascending or `sort=-name,creationDate` sort by names descending and creationDate ascending.
filterstringOptional`format: "string"`
Accepts filter by `excludedKeys`, `external`, `includedKeys`, `query`, `tags`, `unbounded`, `view`. To learn more about the filter syntax, read the ‘Filtering segments’ section above.
### Response
Segment collection response
itemslist of objects
An array of segments
Show 23 properties
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The total number of segments
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
Get a list of all segments in the given project.
Segments can be rule-based, list-based, or synced. Big segments include larger list-based segments and synced segments. Some fields in the response only apply to big segments.
### Filtering segments
The `filter` parameter supports the following operators: `equals`, `anyOf`, and `exists`.
You can also combine filters in the following ways:
 * Use a comma (`,`) as an AND operator
 * Use a vertical bar (`|`) as an OR operator
 * Use parentheses (`()`) to group filters
#### Supported fields and operators
You can only filter certain fields in segments when using the `filter` parameter. Additionally, you can only filter some fields with certain operators.
When you search for segments, the `filter` parameter supports the following fields and operators:
Field | Description | Supported operators 
---|---|--- 
`excludedKeys` | The segment keys of segments to exclude from the results. | `anyOf` 
`external` | Whether the segment is a synced segment. | `exists` 
`includedKeys` | The segment keys of segments to include in the results. | `anyOf` 
`query` | A “fuzzy” search across segment key, name, and description. Supply a string or list of strings to the operator. | `equals` 
`tags` | The segment tags. | `anyOf` 
`unbounded` | Whether the segment is a standard segment (`false`) or a big segment (`true`). Standard segments include rule-based segments and smaller list-based segments. Big segments include larger list-based segments and synced segments. | `equals` 
Here are a few examples:
 * The filter `?filter=tags anyOf ["enterprise", "beta"],query equals "toggle"` matches segments with “toggle” in their key, name, or description that also have “enterprise” or “beta” as a tag.
 * The filter `?filter=excludedKeys anyOf ["segmentKey1", "segmentKey2"]` excludes the segments with those keys from the results.
 * The filter `?filter=unbounded equals true` matches larger list-based segments and synced segments.
The documented values for `filter` query parameters are prior to URL encoding. For example, the `[` in `?filter=tags anyOf ["enterprise", "beta"]` must be encoded to `%5B`.