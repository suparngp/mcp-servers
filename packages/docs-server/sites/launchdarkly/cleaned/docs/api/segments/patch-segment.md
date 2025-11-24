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
PATCH
/api/v2/segments/:projectKey/:environmentKey/:segmentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/segments/projectKey/environmentKey/segmentKey"
4
| 
5
| payload = { "patch": [
6
| {
7
| "op": "replace",
8
| "path": "/description",
9
| "value": None
10
| },
11
| {
12
| "op": "add",
13
| "path": "/tags/0",
14
| "value": None
15
| }
16
| ] }
17
| headers = {
18
| "Authorization": "<apiKey>",
19
| "Content-Type": "application/json"
20
| }
21
| 
22
| response = requests.patch(url, json=payload, headers=headers)
23
| 
24
| print(response.json())
```
[](/docs/api/segments/patch-segment?explorer=true)
200Updated
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
Update a segment. The request body must be a valid semantic patch, JSON patch, or JSON merge patch. To learn more the different formats, read [Updates](https://launchdarkly.com/docs/api#updates). ### Using semantic patches on a segment To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). The body of a semantic patch request for updating segments requires an `environmentKey` in addition to `instructions` and an optional `comment`. The body of the request takes the following properties: * `comment` (string): (Optional) A description of the update. * `environmentKey` (string): (Required) The key of the LaunchDarkly environment. * `instructions` (array): (Required) A list of actions the update should perform. Each action in the list must be an object with a `kind` property that indicates the instruction. If the action requires parameters, you must include those parameters as additional fields in the object. ### Instructions Semantic patch requests support the following `kind` instructions for updating segments. <details> <summary>Click to expand instructions for <strong>updating segment details and settings</strong></summary> #### addTags Adds tags to the segment. ##### Parameters - `values`: A list of tags to add. Here's an example: ```json { "instructions": [{ "kind": "addTags", "values": ["tag1", "tag2"] }] } ``` #### removeTags Removes tags from the segment. ##### Parameters - `values`: A list of tags to remove. Here's an example: ```json { "instructions": [{ "kind": "removeTags", "values": ["tag1", "tag2"] }] } ``` #### updateName Updates the name of the segment. ##### Parameters - `value`: Name of the segment. Here's an example: ```json { "instructions": [{ "kind": "updateName", "value": "Updated segment name" }] } ``` </details> <details> <summary>Click to expand instructions for <strong>updating segment individual targets</strong></summary> #### addExcludedTargets Adds context keys to the individual context targets excluded from the segment for the specified `contextKind`. Returns an error if this causes the same context key to be both included and excluded. ##### Parameters - `contextKind`: The context kind the targets should be added to. - `values`: List of keys. Here's an example: ```json { "instructions": [{ "kind": "addExcludedTargets", "contextKind": "org", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### addExcludedUsers Adds user keys to the individual user targets excluded from the segment. Returns an error if this causes the same user key to be both included and excluded. If you are working with contexts, use `addExcludedTargets` instead of this instruction. ##### Parameters - `values`: List of user keys. Here's an example: ```json { "instructions": [{ "kind": "addExcludedUsers", "values": [ "user-key-123abc", "user-key-456def" ] }] } ``` #### addIncludedTargets Adds context keys to the individual context targets included in the segment for the specified `contextKind`. Returns an error if this causes the same context key to be both included and excluded. ##### Parameters - `contextKind`: The context kind the targets should be added to. - `values`: List of keys. Here's an example: ```json { "instructions": [{ "kind": "addIncludedTargets", "contextKind": "org", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### addIncludedUsers Adds user keys to the individual user targets included in the segment. Returns an error if this causes the same user key to be both included and excluded. If you are working with contexts, use `addIncludedTargets` instead of this instruction. ##### Parameters - `values`: List of user keys. Here's an example: ```json { "instructions": [{ "kind": "addIncludedUsers", "values": [ "user-key-123abc", "user-key-456def" ] }] } ``` #### removeExcludedTargets Removes context keys from the individual context targets excluded from the segment for the specified `contextKind`. ##### Parameters - `contextKind`: The context kind the targets should be removed from. - `values`: List of keys. Here's an example: ```json { "instructions": [{ "kind": "removeExcludedTargets", "contextKind": "org", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### removeExcludedUsers Removes user keys from the individual user targets excluded from the segment. If you are working with contexts, use `removeExcludedTargets` instead of this instruction. ##### Parameters - `values`: List of user keys. Here's an example: ```json { "instructions": [{ "kind": "removeExcludedUsers", "values": [ "user-key-123abc", "user-key-456def" ] }] } ``` #### removeIncludedTargets Removes context keys from the individual context targets included in the segment for the specified `contextKind`. ##### Parameters - `contextKind`: The context kind the targets should be removed from. - `values`: List of keys. Here's an example: ```json { "instructions": [{ "kind": "removeIncludedTargets", "contextKind": "org", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### removeIncludedUsers Removes user keys from the individual user targets included in the segment. If you are working with contexts, use `removeIncludedTargets` instead of this instruction. ##### Parameters - `values`: List of user keys. Here's an example: ```json { "instructions": [{ "kind": "removeIncludedUsers", "values": [ "user-key-123abc", "user-key-456def" ] }] } ``` </details> <details> <summary>Click to expand instructions for <strong>updating segment targeting rules</strong></summary> #### addClauses Adds the given clauses to the rule indicated by `ruleId`. ##### Parameters - `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, if not provided, defaults to `user`. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. - `ruleId`: ID of a rule in the segment. Here's an example: ```json { "instructions": [{ "kind": "addClauses", "clauses": [ { "attribute": "email", "negate": false, "op": "contains", "values": ["value1"] } ], "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", }] } ``` #### addRule Adds a new targeting rule to the segment. The rule may contain `clauses`. ##### Parameters - `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, if not provided, defaults to `user`. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. - `description`: A description of the rule. Here's an example: ```json { "instructions": [{ "kind": "addRule", "clauses": [ { "attribute": "email", "op": "contains", "negate": false, "values": ["@launchdarkly.com"] } ], "description": "Targeting rule for LaunchDarkly employees", }] } ``` #### addValuesToClause Adds `values` to the values of the clause that `ruleId` and `clauseId` indicate. Does not update the context kind, attribute, or operator. ##### Parameters - `ruleId`: ID of a rule in the segment. - `clauseId`: ID of a clause in that rule. - `values`: Array of strings, case sensitive. Here's an example: ```json { "instructions": [{ "kind": "addValuesToClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed", "values": ["beta_testers"] }] } ``` #### removeClauses Removes the clauses specified by `clauseIds` from the rule indicated by `ruleId`. ##### Parameters - `ruleId`: ID of a rule in the segment. - `clauseIds`: Array of IDs of clauses in the rule. Here's an example: ```json { "instructions": [{ "kind": "removeClauses", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseIds": ["10a58772-3121-400f-846b-b8a04e8944ed", "36a461dc-235e-4b08-97b9-73ce9365873e"] }] } ``` #### removeRule Removes the targeting rule specified by `ruleId`. Does nothing if the rule does not exist. ##### Parameters - `ruleId`: ID of a rule in the segment. Here's an example: ```json { "instructions": [{ "kind": "removeRule", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" }] } ``` #### removeValuesFromClause Removes `values` from the values of the clause indicated by `ruleId` and `clauseId`. Does not update the context kind, attribute, or operator. ##### Parameters - `ruleId`: ID of a rule in the segment. - `clauseId`: ID of a clause in that rule. - `values`: Array of strings, case sensitive. Here's an example: ```json { "instructions": [{ "kind": "removeValuesFromClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed", "values": ["beta_testers"] }] } ``` #### reorderRules Rearranges the rules to match the order given in `ruleIds`. Returns an error if `ruleIds` does not match the current set of rules in the segment. ##### Parameters - `ruleIds`: Array of IDs of all targeting rules in the segment. Here's an example: ```json { "instructions": [{ "kind": "reorderRules", "ruleIds": ["a902ef4a-2faf-4eaf-88e1-ecc356708a29", "63c238d1-835d-435e-8f21-c8d5e40b2a3d"] }] } ``` #### updateClause Replaces the clause indicated by `ruleId` and `clauseId` with `clause`. ##### Parameters - `ruleId`: ID of a rule in the segment. - `clauseId`: ID of a clause in that rule. - `clause`: New `clause` object, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, if not provided, defaults to `user`. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. Here's an example: ```json { "instructions": [{ "kind": "updateClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10c7462a-2062-45ba-a8bb-dfb3de0f8af5", "clause": { "contextKind": "user", "attribute": "country", "op": "in", "negate": false, "values": ["Mexico", "Canada"] } }] } ``` #### updateRuleDescription Updates the description of the segment targeting rule. ##### Parameters - `description`: The new human-readable description for this rule. - `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the segment. Here's an example: ```json { "instructions": [{ "kind": "updateRuleDescription", "description": "New rule description", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" }] } ``` #### updateRuleRolloutAndContextKind For a rule that includes a percentage of targets, updates the percentage and the context kind of the targets to include. ##### Parameters - `ruleId`: The ID of a targeting rule in the segment that includes a percentage of targets. - `weight`: The weight, in thousandths of a percent (0-100000). - `contextKind`: The context kind. Here's an example: ```json { "instructions": [{ "kind": "reorderRules", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "weight": "20000", "contextKind": "device" }] } ``` </details> <details> <summary>Click to expand instructions for <strong>working with Big Segments</strong></summary> A "big segment" is a segment that is either a synced segment, or a list-based segment with more than 15,000 entries that includes only one targeted context kind. LaunchDarkly uses different implementations for different types of segments so that all of your segments have good performance. The following semantic patch instructions apply only to these [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments). #### addBigSegmentExcludedTargets For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Adds context keys to the context targets excluded from the segment. Returns an error if this causes the same context key to be both included and excluded. ##### Parameters - `values`: List of context keys. Here's an example: ```json { "instructions": [{ "kind": "addBigSegmentExcludedTargets", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### addBigSegmentIncludedTargets For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Adds context keys to the context targets included in the segment. Returns an error if this causes the same context key to be both included and excluded. ##### Parameters - `values`: List of context keys. Here's an example: ```json { "instructions": [{ "kind": "addBigSegmentIncludedTargets", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### processBigSegmentImport For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Processes a segment import. ##### Parameters - `importId`: The ID of the import. The import ID is returned in the `Location` header as part of the [Create big segment import](https://launchdarkly.com/docs/api/segments/create-big-segment-import) request. Here's an example: ```json { "instructions": [{ "kind": "processBigSegmentImport", "importId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" }] } ``` #### removeBigSegmentExcludedTargets For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Removes context keys from the context targets excluded from the segment. ##### Parameters - `values`: List of context keys. Here's an example: ```json { "instructions": [{ "kind": "removeBigSegmentExcludedTargets", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` #### removeBigSegmentIncludedTargets For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Removes context keys from the context targets included in the segment. ##### Parameters - `values`: List of context keys. Here's an example: ```json { "instructions": [{ "kind": "removeBigSegmentIncludedTargets", "values": [ "org-key-123abc", "org-key-456def" ] }] } ``` </details> ### Using JSON patches on a segment If you do not include the header described above, you can use a [JSON patch](https://launchdarkly.com/docs/api#updates-using-json-patch) or [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7386) representation of the desired changes. For example, to update the description for a segment with a JSON patch, use the following request body: ```json { "patch": [ { "op": "replace", "path": "/description", "value": "new description" } ] } ``` To update fields in the segment that are arrays, set the `path` to the name of the field and then append `/<array index>`. Use `/0` to add the new entry to the beginning of the array. Use `/-` to add the new entry to the end of the array. For example, to add a rule to a segment, use the following request body: ```json { "patch":[ { "op": "add", "path": "/rules/0", "value": { "clauses": [{ "contextKind": "user", "attribute": "email", "op": "endsWith", "values": [".edu"], "negate": false }] } } ] } ``` To add or remove targets from segments, we recommend using semantic patch. Semantic patch for segments includes specific instructions for adding and removing both included and excluded targets. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
segmentKeystringRequired`format: "string"`
The segment key
### Request
This endpoint expects an object.
patchlist of objectsRequired
A JSON patch representation of the change to make
Show 3 properties
commentstringOptional
Optional comment
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
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update a segment. The request body must be a valid semantic patch, JSON patch, or JSON merge patch. To learn more the different formats, read [Updates](https://launchdarkly.com/docs/api#updates).
### Using semantic patches on a segment
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
The body of a semantic patch request for updating segments requires an `environmentKey` in addition to `instructions` and an optional `comment`. The body of the request takes the following properties:
 * `comment` (string): (Optional) A description of the update.
 * `environmentKey` (string): (Required) The key of the LaunchDarkly environment.
 * `instructions` (array): (Required) A list of actions the update should perform. Each action in the list must be an object with a `kind` property that indicates the instruction. If the action requires parameters, you must include those parameters as additional fields in the object.
### Instructions
Semantic patch requests support the following `kind` instructions for updating segments.
Click to expand instructions for **updating segment details and settings**
#### addTags
Adds tags to the segment.
##### Parameters
 * `values`: A list of tags to add.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addTags",
4
| "values": ["tag1", "tag2"]
5
| }]
6
| }
```
#### removeTags
Removes tags from the segment.
##### Parameters
 * `values`: A list of tags to remove.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeTags",
4
| "values": ["tag1", "tag2"]
5
| }]
6
| }
```
#### updateName
Updates the name of the segment.
##### Parameters
 * `value`: Name of the segment.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "updateName",
4
| "value": "Updated segment name"
5
| }]
6
| }
```
Click to expand instructions for **updating segment individual targets**
#### addExcludedTargets
Adds context keys to the individual context targets excluded from the segment for the specified `contextKind`. Returns an error if this causes the same context key to be both included and excluded.
##### Parameters
 * `contextKind`: The context kind the targets should be added to.
 * `values`: List of keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addExcludedTargets",
4
| "contextKind": "org",
5
| "values": [ "org-key-123abc", "org-key-456def" ]
6
| }]
7
| }
```
#### addExcludedUsers
Adds user keys to the individual user targets excluded from the segment. Returns an error if this causes the same user key to be both included and excluded. If you are working with contexts, use `addExcludedTargets` instead of this instruction.
##### Parameters
 * `values`: List of user keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addExcludedUsers",
4
| "values": [ "user-key-123abc", "user-key-456def" ]
5
| }]
6
| }
```
#### addIncludedTargets
Adds context keys to the individual context targets included in the segment for the specified `contextKind`. Returns an error if this causes the same context key to be both included and excluded.
##### Parameters
 * `contextKind`: The context kind the targets should be added to.
 * `values`: List of keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addIncludedTargets",
4
| "contextKind": "org",
5
| "values": [ "org-key-123abc", "org-key-456def" ]
6
| }]
7
| }
```
#### addIncludedUsers
Adds user keys to the individual user targets included in the segment. Returns an error if this causes the same user key to be both included and excluded. If you are working with contexts, use `addIncludedTargets` instead of this instruction.
##### Parameters
 * `values`: List of user keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addIncludedUsers",
4
| "values": [ "user-key-123abc", "user-key-456def" ]
5
| }]
6
| }
```
#### removeExcludedTargets
Removes context keys from the individual context targets excluded from the segment for the specified `contextKind`.
##### Parameters
 * `contextKind`: The context kind the targets should be removed from.
 * `values`: List of keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeExcludedTargets",
4
| "contextKind": "org",
5
| "values": [ "org-key-123abc", "org-key-456def" ]
6
| }]
7
| }
```
#### removeExcludedUsers
Removes user keys from the individual user targets excluded from the segment. If you are working with contexts, use `removeExcludedTargets` instead of this instruction.
##### Parameters
 * `values`: List of user keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeExcludedUsers",
4
| "values": [ "user-key-123abc", "user-key-456def" ]
5
| }]
6
| }
```
#### removeIncludedTargets
Removes context keys from the individual context targets included in the segment for the specified `contextKind`.
##### Parameters
 * `contextKind`: The context kind the targets should be removed from.
 * `values`: List of keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeIncludedTargets",
4
| "contextKind": "org",
5
| "values": [ "org-key-123abc", "org-key-456def" ]
6
| }]
7
| }
```
#### removeIncludedUsers
Removes user keys from the individual user targets included in the segment. If you are working with contexts, use `removeIncludedTargets` instead of this instruction.
##### Parameters
 * `values`: List of user keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeIncludedUsers",
4
| "values": [ "user-key-123abc", "user-key-456def" ]
5
| }]
6
| }
```
Click to expand instructions for **updating segment targeting rules**
#### addClauses
Adds the given clauses to the rule indicated by `ruleId`.
##### Parameters
 * `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, if not provided, defaults to `user`. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
 * `ruleId`: ID of a rule in the segment.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addClauses",
4
| "clauses": [
5
| {
6
| "attribute": "email",
7
| "negate": false,
8
| "op": "contains",
9
| "values": ["value1"]
10
| }
11
| ],
12
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
13
| }]
14
| }
```
#### addRule
Adds a new targeting rule to the segment. The rule may contain `clauses`.
##### Parameters
 * `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, if not provided, defaults to `user`. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
 * `description`: A description of the rule.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addRule",
4
| "clauses": [
5
| {
6
| "attribute": "email",
7
| "op": "contains",
8
| "negate": false,
9
| "values": ["@launchdarkly.com"]
10
| }
11
| ],
12
| "description": "Targeting rule for LaunchDarkly employees",
13
| }]
14
| }
```
#### addValuesToClause
Adds `values` to the values of the clause that `ruleId` and `clauseId` indicate. Does not update the context kind, attribute, or operator.
##### Parameters
 * `ruleId`: ID of a rule in the segment.
 * `clauseId`: ID of a clause in that rule.
 * `values`: Array of strings, case sensitive.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addValuesToClause",
4
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
5
| "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed",
6
| "values": ["beta_testers"]
7
| }]
8
| }
```
#### removeClauses
Removes the clauses specified by `clauseIds` from the rule indicated by `ruleId`.
##### Parameters
 * `ruleId`: ID of a rule in the segment.
 * `clauseIds`: Array of IDs of clauses in the rule.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeClauses",
4
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
5
| "clauseIds": ["10a58772-3121-400f-846b-b8a04e8944ed", "36a461dc-235e-4b08-97b9-73ce9365873e"]
6
| }]
7
| }
```
#### removeRule
Removes the targeting rule specified by `ruleId`. Does nothing if the rule does not exist.
##### Parameters
 * `ruleId`: ID of a rule in the segment.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeRule",
4
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29"
5
| }]
6
| }
```
#### removeValuesFromClause
Removes `values` from the values of the clause indicated by `ruleId` and `clauseId`. Does not update the context kind, attribute, or operator.
##### Parameters
 * `ruleId`: ID of a rule in the segment.
 * `clauseId`: ID of a clause in that rule.
 * `values`: Array of strings, case sensitive.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeValuesFromClause",
4
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
5
| "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed",
6
| "values": ["beta_testers"]
7
| }]
8
| }
```
#### reorderRules
Rearranges the rules to match the order given in `ruleIds`. Returns an error if `ruleIds` does not match the current set of rules in the segment.
##### Parameters
 * `ruleIds`: Array of IDs of all targeting rules in the segment.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "reorderRules",
4
| "ruleIds": ["a902ef4a-2faf-4eaf-88e1-ecc356708a29", "63c238d1-835d-435e-8f21-c8d5e40b2a3d"]
5
| }]
6
| }
```
#### updateClause
Replaces the clause indicated by `ruleId` and `clauseId` with `clause`.
##### Parameters
 * `ruleId`: ID of a rule in the segment.
 * `clauseId`: ID of a clause in that rule.
 * `clause`: New `clause` object, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, if not provided, defaults to `user`. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "updateClause",
4
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
5
| "clauseId": "10c7462a-2062-45ba-a8bb-dfb3de0f8af5",
6
| "clause": {
7
| "contextKind": "user",
8
| "attribute": "country",
9
| "op": "in",
10
| "negate": false,
11
| "values": ["Mexico", "Canada"]
12
| }
13
| }]
14
| }
```
#### updateRuleDescription
Updates the description of the segment targeting rule.
##### Parameters
 * `description`: The new human-readable description for this rule.
 * `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the segment.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "updateRuleDescription",
4
| "description": "New rule description",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29"
6
| }]
7
| }
```
#### updateRuleRolloutAndContextKind
For a rule that includes a percentage of targets, updates the percentage and the context kind of the targets to include.
##### Parameters
 * `ruleId`: The ID of a targeting rule in the segment that includes a percentage of targets.
 * `weight`: The weight, in thousandths of a percent (0-100000).
 * `contextKind`: The context kind.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "reorderRules",
4
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
5
| "weight": "20000",
6
| "contextKind": "device"
7
| }]
8
| }
```
Click to expand instructions for **working with Big Segments**
A “big segment” is a segment that is either a synced segment, or a list-based segment with more than 15,000 entries that includes only one targeted context kind. LaunchDarkly uses different implementations for different types of segments so that all of your segments have good performance.
The following semantic patch instructions apply only to these [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments).
#### addBigSegmentExcludedTargets
For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Adds context keys to the context targets excluded from the segment. Returns an error if this causes the same context key to be both included and excluded.
##### Parameters
 * `values`: List of context keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addBigSegmentExcludedTargets",
4
| "values": [ "org-key-123abc", "org-key-456def" ]
5
| }]
6
| }
```
#### addBigSegmentIncludedTargets
For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Adds context keys to the context targets included in the segment. Returns an error if this causes the same context key to be both included and excluded.
##### Parameters
 * `values`: List of context keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addBigSegmentIncludedTargets",
4
| "values": [ "org-key-123abc", "org-key-456def" ]
5
| }]
6
| }
```
#### processBigSegmentImport
For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Processes a segment import.
##### Parameters
 * `importId`: The ID of the import. The import ID is returned in the `Location` header as part of the [Create big segment import](https://launchdarkly.com/docs/api/segments/create-big-segment-import) request.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "processBigSegmentImport",
4
| "importId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29"
5
| }]
6
| }
```
#### removeBigSegmentExcludedTargets
For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Removes context keys from the context targets excluded from the segment.
##### Parameters
 * `values`: List of context keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeBigSegmentExcludedTargets",
4
| "values": [ "org-key-123abc", "org-key-456def" ]
5
| }]
6
| }
```
#### removeBigSegmentIncludedTargets
For use with [larger list-based segments](https://launchdarkly.com/docs/home/flags/segments-create#create-larger-list-based-segments) ONLY. Removes context keys from the context targets included in the segment.
##### Parameters
 * `values`: List of context keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeBigSegmentIncludedTargets",
4
| "values": [ "org-key-123abc", "org-key-456def" ]
5
| }]
6
| }
```
### Using JSON patches on a segment
If you do not include the header described above, you can use a [JSON patch](https://launchdarkly.com/docs/api#updates-using-json-patch) or [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7386) representation of the desired changes.
For example, to update the description for a segment with a JSON patch, use the following request body:
```
1
| {
---|--- 
2
| "patch": [
3
| {
4
| "op": "replace",
5
| "path": "/description",
6
| "value": "new description"
7
| }
8
| ]
9
| }
```
To update fields in the segment that are arrays, set the `path` to the name of the field and then append `/<array index>`. Use `/0` to add the new entry to the beginning of the array. Use `/-` to add the new entry to the end of the array.
For example, to add a rule to a segment, use the following request body:
```
1
| {
---|--- 
2
| "patch":[
3
| {
4
| "op": "add",
5
| "path": "/rules/0",
6
| "value": {
7
| "clauses": [{ "contextKind": "user", "attribute": "email", "op": "endsWith", "values": [".edu"], "negate": false }]
8
| }
9
| }
10
| ]
11
| }
```
To add or remove targets from segments, we recommend using semantic patch. Semantic patch for segments includes specific instructions for adding and removing both included and excluded targets.