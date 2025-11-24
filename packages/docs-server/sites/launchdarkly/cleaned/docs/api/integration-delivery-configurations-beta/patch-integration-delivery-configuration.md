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
/api/v2/integration-capabilities/featureStore/:projectKey/:environmentKey/:integrationKey/:id
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/integration-capabilities/featureStore/projectKey/environmentKey/integrationKey/id \
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
[](/docs/api/integration-delivery-configurations-beta/patch-integration-delivery-configuration?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_links": {
3
| "self": {
4
| "href": "string",
5
| "type": "string"
6
| },
7
| "parent": {
8
| "href": "string",
9
| "type": "string"
10
| },
11
| "project": {
12
| "href": "string",
13
| "type": "string"
14
| },
15
| "environment": {
16
| "href": "string",
17
| "type": "string"
18
| }
19
| },
20
| "_id": "12ab3c4d5ef1a2345bcde67f",
21
| "integrationKey": "example-integration-key",
22
| "projectKey": "default",
23
| "environmentKey": "development",
24
| "config": {},
25
| "on": true,
26
| "tags": [],
27
| "name": "Development environment configuration",
28
| "version": 1,
29
| "_access": {
30
| "denied": [
31
| {
32
| "action": "string",
33
| "reason": {
34
| "effect": "allow",
35
| "resources": [
36
| "proj/*:env/*;qa_*:/flag/*"
37
| ],
38
| "notResources": [
39
| "string"
40
| ],
41
| "actions": [
42
| "*"
43
| ],
44
| "notActions": [
45
| "string"
46
| ],
47
| "role_name": "string"
48
| }
49
| }
50
| ],
51
| "allowed": [
52
| {
53
| "action": "string",
54
| "reason": {
55
| "effect": "allow",
56
| "resources": [
57
| "proj/*:env/*;qa_*:/flag/*"
58
| ],
59
| "notResources": [
60
| "string"
61
| ],
62
| "actions": [
63
| "*"
64
| ],
65
| "notActions": [
66
| "string"
67
| ],
68
| "role_name": "string"
69
| }
70
| }
71
| ]
72
| }
73
| }
```
Update an integration delivery configuration. Updating an integration delivery configuration uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
integrationKeystringRequired`format: "string"`
The integration key
idstringRequired`format: "string"`
The configuration ID
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Integration delivery configuration response
_linksobject
The location and content type of related resources
Show 4 properties
_idstring
The integration ID
integrationKeystring
The integration key
projectKeystring
The project key
environmentKeystring
The environment key
configmap from strings to any
The delivery configuration for the given integration provider. Only included when requesting a single integration by ID. Refer to the `formVariables` field in the corresponding `manifest.json` for a full list of fields for each integration.
onboolean
Whether the configuration is turned on
tagslist of strings
List of tags for this configuration
namestring
Name of the configuration
versioninteger
Version of the current configuration
_accessobject or null
Details on the allowed and denied actions for this configuration
Show 2 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
422
Unprocessable Entity Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update an integration delivery configuration. Updating an integration delivery configuration uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).