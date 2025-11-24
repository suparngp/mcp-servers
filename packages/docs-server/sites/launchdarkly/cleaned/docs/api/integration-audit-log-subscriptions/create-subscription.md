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
/api/v2/integrations/:integrationKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/integrations/integrationKey"
4
| 
5
| payload = {
6
| "name": "Example audit log subscription.",
7
| "config": {
8
| "optional": "an optional property",
9
| "required": "the required property",
10
| "url": "https://example.com"
11
| },
12
| "statements": [
13
| {
14
| "effect": "allow",
15
| "resources": ["proj/*:env/*:flag/*;testing-tag"],
16
| "actions": ["*"]
17
| }
18
| ],
19
| "on": False,
20
| "tags": ["testing-tag"]
21
| }
22
| headers = {
23
| "Authorization": "<apiKey>",
24
| "Content-Type": "application/json"
25
| }
26
| 
27
| response = requests.post(url, json=payload, headers=headers)
28
| 
29
| print(response.json())
```
[](/docs/api/integration-audit-log-subscriptions/create-subscription?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_links": {},
3
| "_id": "1234a56b7c89d012345e678f",
4
| "kind": "datadog",
5
| "name": "Example Datadog integration",
6
| "config": {},
7
| "statements": [
8
| {
9
| "effect": "allow",
10
| "resources": [
11
| "proj/*:env/*;qa_*:/flag/*"
12
| ],
13
| "notResources": [
14
| "string"
15
| ],
16
| "actions": [
17
| "*"
18
| ],
19
| "notActions": [
20
| "string"
21
| ]
22
| }
23
| ],
24
| "on": true,
25
| "tags": [
26
| "testing"
27
| ],
28
| "_access": {
29
| "denied": [
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
| ],
50
| "allowed": [
51
| {
52
| "action": "string",
53
| "reason": {
54
| "effect": "allow",
55
| "resources": [
56
| "proj/*:env/*;qa_*:/flag/*"
57
| ],
58
| "notResources": [
59
| "string"
60
| ],
61
| "actions": [
62
| "*"
63
| ],
64
| "notActions": [
65
| "string"
66
| ],
67
| "role_name": "string"
68
| }
69
| }
70
| ]
71
| },
72
| "_status": {
73
| "successCount": 1,
74
| "lastSuccess": 1,
75
| "lastError": 1,
76
| "errorCount": 1,
77
| "errors": [
78
| {
79
| "statusCode": 1,
80
| "responseBody": "string",
81
| "timestamp": 1
82
| }
83
| ]
84
| },
85
| "url": "string",
86
| "apiKey": "string"
87
| }
```
Create an audit log subscription. 
For each subscription, you must specify the set of resources you wish to subscribe to audit log notifications for. You can describe these resources using a custom role policy. To learn more, read [Custom role concepts](https://launchdarkly.com/docs/home/account/role-concepts).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
integrationKeystringRequired`format: "string"`
The integration key
### Request
This endpoint expects an object.
namestringRequired
A human-friendly name for your audit log subscription.
configmap from strings to anyRequired
The unique set of fields required to configure an audit log subscription integration of this type. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> at https://github.com/launchdarkly/integration-framework/tree/main/integrations for a full list of fields for the integration you wish to configure.
statementslist of objectsOptional
The set of resources you wish to subscribe to audit log notifications for.
Show 5 properties
onbooleanOptional
Whether or not you want your subscription to actively send events.
tagslist of stringsOptional
An array of tags for this subscription.
urlstringOptional
Slack webhook receiver URL. Only necessary for legacy Slack webhook integrations.
apiKeystringOptional
Datadog API key. Only necessary for legacy Datadog webhook integrations.
### Response
Integration response
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
_idstring or null
The ID for this integration audit log subscription
kindstring or null
The type of integration
namestring or null
A human-friendly name for the integration
configmap from strings to any or null
Details on configuration for an integration of this type. Refer to the `formVariables` field in the corresponding `manifest.json` for a full list of fields for each integration.
statementslist of objects or null
Represents a Custom role policy, defining a resource kinds filter the integration audit log subscription responds to.
Show 5 properties
onboolean or null
Whether the integration is currently active
tagslist of strings or null
An array of tags for this integration
_accessobject or null
Details on the allowed and denied actions for this subscription
Show 2 properties
_statusobject or null
Details on the most recent successes and errors for this integration
Show 5 properties
urlstring or null
Slack webhook receiver URL. Only used for legacy Slack webhook integrations.
apiKeystring or null
Datadog API key. Only used for legacy Datadog webhook integrations.
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
The unique set of fields required to configure an audit log subscription integration of this type. Refer to the `formVariables` field in the corresponding `manifest.json` at <https://github.com/launchdarkly/integration-framework/tree/main/integrations> for a full list of fields for the integration you wish to configure.