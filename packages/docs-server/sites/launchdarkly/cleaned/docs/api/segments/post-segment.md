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
| payload = {
6
| "name": "Example segment",
7
| "key": "segment-key-123abc"
8
| }
9
| headers = {
10
| "Authorization": "<apiKey>",
11
| "Content-Type": "application/json"
12
| }
13
| 
14
| response = requests.post(url, json=payload, headers=headers)
15
| 
16
| print(response.json())
```
[](/docs/api/segments/post-segment?explorer=true)
201Created
```
1
| {
---|--- 
2
| "name": "Example segment",
3
| "tags": [
4
| "testing"
5
| ],
6
| "creationDate": 1,
7
| "lastModifiedDate": 1,
8
| "key": "segment-key-123abc",
9
| "_links": {},
10
| "rules": [
11
| {
12
| "clauses": [
13
| {
14
| "attribute": "email",
15
| "op": "endsWith",
16
| "values": [
17
| ".edu"
18
| ],
19
| "negate": false,
20
| "_id": "12ab3c45de678910fab12345"
21
| }
22
| ],
23
| "_id": "1234a56b7c89d012345e678f"
24
| }
25
| ],
26
| "version": 1,
27
| "deleted": false,
28
| "generation": 1,
29
| "description": "Bundle our sample customers together",
30
| "included": [
31
| "user-key-123abc"
32
| ],
33
| "excluded": [
34
| "user-key-123abc"
35
| ],
36
| "includedContexts": [
37
| {
38
| "values": [
39
| "string"
40
| ],
41
| "contextKind": "string"
42
| }
43
| ],
44
| "excludedContexts": [
45
| {
46
| "values": [
47
| "string"
48
| ],
49
| "contextKind": "string"
50
| }
51
| ],
52
| "_access": {
53
| "denied": [
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
| ],
74
| "allowed": [
75
| {
76
| "action": "string",
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
| "string"
84
| ],
85
| "actions": [
86
| "*"
87
| ],
88
| "notActions": [
89
| "string"
90
| ],
91
| "role_name": "string"
92
| }
93
| }
94
| ]
95
| },
96
| "_flags": [
97
| {
98
| "name": "Example flag",
99
| "key": "flag-key-123abc",
100
| "_links": {},
101
| "_site": {
102
| "href": "string",
103
| "type": "string"
104
| }
105
| }
106
| ],
107
| "unbounded": false,
108
| "unboundedContextKind": "string",
109
| "_unboundedMetadata": {
110
| "envId": "string",
111
| "segmentId": "string",
112
| "version": 1,
113
| "includedCount": 1,
114
| "excludedCount": 1,
115
| "lastModified": 1,
116
| "deleted": true
117
| },
118
| "_external": "amplitude",
119
| "_externalLink": "https://analytics.amplitude.com/org/1234/cohort/123abc",
120
| "_importInProgress": false
121
| }
```
Create a new segment.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Request
This endpoint expects an object.
namestringRequired
A human-friendly name for the segment
keystringRequired
A unique key used to reference the segment
descriptionstringOptional
A description of the segment's purpose
tagslist of stringsOptional
Tags for the segment
unboundedbooleanOptional
Whether to create a standard segment (`false`) or a big segment (`true`). Standard segments include rule-based and smaller list-based segments. Big segments include larger list-based segments and synced segments. Only use a big segment if you need to add more than 15,000 individual targets.
unboundedContextKindstringOptional
For big segments, the targeted context kind.
### Response
Segment response
namestring
A human-friendly name for the segment.
tagslist of strings
Tags for the segment. Defaults to an empty array.
creationDatelong
Timestamp of when the segment was created
lastModifiedDatelong
Timestamp of when the segment was last modified
keystring
A unique key used to reference the segment
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
ruleslist of objects
An array of the targeting rules for this segment.
Show 6 properties
versioninteger
Version of the segment
deletedboolean
Whether the segment has been deleted
generationinteger
For big segments, how many times this segment has been created.
descriptionstring or null
A description of the segment’s purpose. Defaults to `null` and is omitted in the response if not provided.
includedlist of strings or null
An array of keys for included targets. Included individual targets are always segment members, regardless of segment rules. For list-based segments over 15,000 entries, also called big segments, this array is either empty or omitted.
excludedlist of strings or null
An array of keys for excluded targets. Segment rules bypass individual excluded targets, so they will never be included based on rules. Excluded targets may still be included explicitly. This value is omitted for list-based segments over 15,000 entries, also called big segments.
includedContextslist of objects or null
Show 2 properties
excludedContextslist of objects or null
Show 2 properties
_accessobject or null
Show 2 properties
_flagslist of objects or null
A list of flags targeting this segment. Only included when getting a single segment, using the `getSegment` endpoint.
Show 4 properties
unboundedboolean or null
Whether this is a standard segment (`false`) or a big segment (`true`). Standard segments include rule-based segments and smaller list-based segments. Big segments include larger list-based segments and synced segments. If omitted, the segment is a standard segment.
unboundedContextKindstring or null
For big segments, the targeted context kind.
_unboundedMetadataobject or null
Details on the external data store backing this segment. Only applies to big segments.
Show 7 properties
_externalstring or null
The external data store backing this segment. Only applies to synced segments.
_externalLinkstring or null
The URL for the external data store backing this segment. Only applies to synced segments.
_importInProgressboolean or null
Whether an import is currently in progress for the specified segment. Only applies to big segments.
### Errors
400
Bad Request Error
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