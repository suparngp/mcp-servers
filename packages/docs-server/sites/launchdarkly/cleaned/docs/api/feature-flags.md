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
On this page
 * [Sample feature flag representation](#sample-feature-flag-representation)
 * [Anatomy of a feature flag](#anatomy-of-a-feature-flag)
 * [Top-level attributes](#top-level-attributes)
 * [Per-environment configurations](#per-environment-configurations)
 * [Individual context targets](#individual-context-targets)
 * [Targeting rules](#targeting-rules)
 * [The fallthrough rule](#the-fallthrough-rule)
 * [The off variation](#the-off-variation)
 * [Percentage rollouts](#percentage-rollouts)
The feature flags API allows you to list, create, and modify feature flags and their targeting. For example, you can control percentage rollouts, target specific contexts, or even toggle off a feature flag programmatically.
## Sample feature flag representation
Every feature flag has a set of top-level attributes, as well as an `environments` map containing the flag rollout and targeting rules specific to each environment. To learn more, read [Using feature flags](https://launchdarkly.com/docs/home/flags/create).
Click to expand an example of a **complete feature flag representation**
```
1
| {
---|--- 
2
| "name": "Alternate product page",
3
| "kind": "boolean",
4
| "description": "This is a description",
5
| "key": "alternate.page",
6
| "_version": 2,
7
| "creationDate": 1418684722483,
8
| "includeInSnippet": true,
9
| "clientSideAvailability" {
10
| "usingMobileKey": false,
11
| "usingEnvironmentId": true,
12
| },
13
| "variations": [
14
| {
15
| "value": true,
16
| "name": "true",
17
| "_id": "86208e6e-468f-4425-b334-7f318397f95c"
18
| },
19
| {
20
| "value": false,
21
| "name": "false",
22
| "_id": "7b32de80-f346-4276-bb77-28dfa7ddc2d8"
23
| }
24
| ],
25
| "variationJsonSchema": null,
26
| "defaults": {
27
| "onVariation": 0,
28
| "offVariation": 1
29
| },
30
| "temporary": false,
31
| "tags": ["ops", "experiments"],
32
| "_links": {
33
| "parent": {
34
| "href": "/api/v2/flags/default",
35
| "type": "application/json"
36
| },
37
| "self": {
38
| "href": "/api/v2/flags/default/alternate.page",
39
| "type": "application/json"
40
| }
41
| },
42
| "maintainerId": "548f6741c1efad40031b18ae",
43
| "_maintainer": {
44
| "_links": {
45
| "self": {
46
| "href": "/api/v2/members/548f6741c1efad40031b18ae",
47
| "type": "application/json"
48
| }
49
| },
50
| "_id": "548f6741c1efad40031b18ae",
51
| "firstName": "Ariel",
52
| "lastName": "Flores",
53
| "role": "reader",
54
| "email": "ariel@acme.com"
55
| },
56
| "goalIds": [],
57
| "experiments": {
58
| "baselineIdx": 0,
59
| "items": []
60
| },
61
| "environments": {
62
| "production": {
63
| "on": true,
64
| "archived": false,
65
| "salt": "YWx0ZXJuYXRlLnBhZ2U=",
66
| "sel": "45501b9314dc4641841af774cb038b96",
67
| "lastModified": 1469326565348,
68
| "version": 61,
69
| "targets": [{
70
| "values": ["user-key-123abc"],
71
| "variation": 0,
72
| "contextKind": "user"
73
| }],
74
| "contextTargets": [{
75
| "values": [],
76
| "variation": 0,
77
| "contextKind": "user"
78
| }, {
79
| "values": ["org-key-123abc"],
80
| "variation": 0,
81
| "contextKind": "organization"
82
| }],
83
| "rules": [
84
| {
85
| "_id": "f3ea72d0-e473-4e8b-b942-565b790ffe18",
86
| "variation": 0,
87
| "clauses": [
88
| {
89
| "_id": "6b81968e-3744-4416-9d64-74547eb0a7d1",
90
| "attribute": "groups",
91
| "op": "in",
92
| "values": ["Top Customers"],
93
| "contextKind": "user",
94
| "negate": false
95
| },
96
| {
97
| "_id": "9d60165d-82b8-4b9a-9136-f23407ba1718",
98
| "attribute": "email",
99
| "op": "endsWith",
100
| "values": ["gmail.com"],
101
| "contextKind": "user",
102
| "negate": false
103
| }
104
| ],
105
| "trackEvents": false,
106
| "ref": "73257308-472b-4d9c-a556-10aa7adbf857"
107
| }
108
| ],
109
| "fallthrough": {
110
| "rollout": {
111
| "variations": [
112
| {
113
| "variation": 0,
114
| "weight": 60000
115
| },
116
| {
117
| "variation": 1,
118
| "weight": 40000
119
| }
120
| ],
121
| "contextKind": "user"
122
| }
123
| },
124
| "offVariation": 1,
125
| "prerequisites": [],
126
| "_site": {
127
| "href": "/default/production/features/alternate.page",
128
| "type": "text/html"
129
| },
130
| "_environmentName": "Production",
131
| "trackEvents": false,
132
| "trackEventsFallthrough": false,
133
| "_summary": {
134
| "variations": {
135
| "0": {
136
| "rules": 1,
137
| "nullRules": 0,
138
| "targets": 2,
139
| "rollout": 60000
140
| },
141
| "1": {
142
| "rules": 0,
143
| "nullRules": 0,
144
| "targets": 0,
145
| "isOff": true,
146
| "rollout": 40000
147
| }
148
| },
149
| "prerequisites": 0
150
| }
151
| }
152
| }
```
## Anatomy of a feature flag
This section describes the sample feature flag representation in more detail.
### Top-level attributes
Most of the top-level attributes have a straightforward interpretation, for example `name` and `description`.
The `variations` array represents the different variation values that a feature flag has. For a boolean flag, there are two variations: `true` and `false`. Multivariate flags have more variation values, and those values could be any JSON type: numbers, strings, objects, or arrays. In targeting rules, the variations are referred to by their index into this array.
To update these attributes, read [Update feature flag](/docs/api/feature-flags#operation/patchFeatureFlag), especially the instructions for **updating flag settings**.
### Per-environment configurations
Each entry in the `environments` map contains a JSON object that represents the environment-specific flag configuration data available in the flag’s targeting page. To learn more, read [Targeting with flags](https://launchdarkly.com/docs/home/flags/target).
To update per-environment information for a flag, read [Update feature flag](/docs/api/feature-flags#operation/patchFeatureFlag), especially the instructions for **turning flags on and off** and **working with targeting and variations**.
### Individual context targets
The `targets` and `contextTargets` arrays in the per-environment configuration data correspond to the individual context targeting on the flag’s targeting page. To learn more, read [Individual targeting](https://launchdarkly.com/docs/home/flags/individual-targeting).
Each object in the `targets` and `contextTargets` arrays represents a list of context keys assigned to a particular variation. The `targets` array includes contexts with `contextKind` of “user” and the `contextTargets` array includes contexts with context kinds other than “user.”
For example:
```
1
| {
---|--- 
2
| ...
3
| "environments" : {
4
| "production" : {
5
| ...
6
| "targets": [
7
| {
8
| "values": ["user-key-123abc"],
9
| "variation": 0,
10
| "contextKind": "user"
11
| }
12
| ],
13
| "contextTargets": [
14
| {
15
| "values": ["org-key-123abc"],
16
| "variation": 0,
17
| "contextKind": "organization"
18
| }
19
| ]
20
| }
21
| }
22
| }
```
The `targets` array means that any user context instance with the key `user-key-123abc` receives the first variation listed in the `variations` array. The `contextTargets` array means that any organization context with the key `org-key-123abc` receives the first variation listed in the `variations` array. Recall that the variations are stored at the top level of the flag JSON in an array, and the per-environment configuration rules point to indexes into this array. If this is a boolean flag, both contexts are receiving the `true` variation.
### Targeting rules
The `rules` array corresponds to the rules section of the flag’s targeting page. This is where you can express complex rules on attributes with conditions and operators. For example, you might create a rule that specifies “roll out the `true` variation to 80% of contexts whose email address ends with `gmail.com`”. To learn more, read [Targeting rules](https://launchdarkly.com/docs/home/flags/targeting-rules).
### The fallthrough rule
The `fallthrough` object is a special rule that contains no conditions. It is the rollout strategy that is applied when none of the individual or custom targeting rules match. In the LaunchDarkly UI, it is called the “Default rule.”
### The off variation
The off variation represents the variation to serve if the feature flag targeting is turned off, meaning the `on` attribute is `false`. For boolean flags, this is usually `false`. For multivariate flags, set the off variation to whatever variation represents the control or baseline behavior for your application. If you don’t set the off variation, LaunchDarkly will serve the fallback value defined in your code.
### Percentage rollouts
When you work with targeting rules and with the default rule, you can specify either a single variation or a percentage rollout. The `weight` attribute defines the percentage rollout for each variation. Weights range from 0 (a 0% rollout) to 100000 (a 100% rollout). The weights are scaled by a factor of 1000 so that fractions of a percent can be represented without using floating-point. For example, a weight of `60000` means that 60% of contexts will receive that variation. The sum of weights across all variations should be 100%.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs