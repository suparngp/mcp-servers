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
/api/v2/integration-configurations/:integrationConfigurationId
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/integration-configurations/integrationConfigurationId \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '[
5
| {
6
| "op": "replace",
7
| "path": "/on",
8
| "value": null
9
| }
10
| ]'
```
[](/docs/api/integrations-beta/update-integration-configuration?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_links": {},
3
| "_id": "string",
4
| "name": "Example Datadog integration",
5
| "_createdAt": 1,
6
| "_integrationKey": "datadog",
7
| "tags": [
8
| "testing"
9
| ],
10
| "enabled": true,
11
| "_access": {
12
| "denied": [
13
| {
14
| "action": "string",
15
| "reason": {
16
| "effect": "allow",
17
| "resources": [
18
| "proj/*:env/*;qa_*:/flag/*"
19
| ],
20
| "notResources": [
21
| "string"
22
| ],
23
| "actions": [
24
| "*"
25
| ],
26
| "notActions": [
27
| "string"
28
| ],
29
| "role_name": "string"
30
| }
31
| }
32
| ],
33
| "allowed": [
34
| {
35
| "action": "string",
36
| "reason": {
37
| "effect": "allow",
38
| "resources": [
39
| "proj/*:env/*;qa_*:/flag/*"
40
| ],
41
| "notResources": [
42
| "string"
43
| ],
44
| "actions": [
45
| "*"
46
| ],
47
| "notActions": [
48
| "string"
49
| ],
50
| "role_name": "string"
51
| }
52
| }
53
| ]
54
| },
55
| "configValues": {},
56
| "capabilityConfig": {
57
| "approvals": {
58
| "additionalFormVariables": [
59
| {}
60
| ]
61
| },
62
| "auditLogEventsHook": {
63
| "statements": [
64
| {
65
| "effect": "allow",
66
| "resources": [
67
| "proj/*:env/*;qa_*:/flag/*"
68
| ],
69
| "notResources": [
70
| "string"
71
| ],
72
| "actions": [
73
| "*"
74
| ],
75
| "notActions": [
76
| "string"
77
| ]
78
| }
79
| ]
80
| }
81
| }
82
| }
```
Update an integration configuration. Updating an integration configuration uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
integrationConfigurationIdstringRequired`format: "string"`
The ID of the integration configuration
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Integration configuration response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The unique identifier for this integration configuration
namestring
A human-friendly name for the integration
_createdAtlong or null
The time the integration configuration was created
_integrationKeystring or null
The type of integration
tagslist of strings or null
An array of tags for this integration
enabledboolean or null
Whether the integration is currently active
_accessobject or null
Details on the allowed and denied actions for this integration configuration
Show 2 properties
configValuesmap from strings to any or null
Details on configuration for an integration of this type. Refer to the `formVariables` field in the corresponding `manifest.json` for a full list of fields for each integration.
capabilityConfigobject or null
The capability configuration for the integration
Show 2 properties
### Errors
400
Bad Request Error
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
Update an integration configuration. Updating an integration configuration uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).