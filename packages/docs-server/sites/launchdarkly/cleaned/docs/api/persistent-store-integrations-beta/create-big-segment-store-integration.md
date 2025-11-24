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
/api/v2/integration-capabilities/big-segment-store/:projectKey/:environmentKey/:integrationKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/integration-capabilities/big-segment-store/projectKey/environmentKey/integrationKey"
4
| 
5
| payload = {
6
| "config": {
7
| "optional": "example value for optional formVariables property for sample-integration",
8
| "required": "example value for required formVariables property for sample-integration"
9
| },
10
| "on": False,
11
| "tags": ["example-tag"],
12
| "name": "Example persistent store integration"
13
| }
14
| headers = {
15
| "Authorization": "<apiKey>",
16
| "Content-Type": "application/json"
17
| }
18
| 
19
| response = requests.post(url, json=payload, headers=headers)
20
| 
21
| print(response.json())
```
[](/docs/api/persistent-store-integrations-beta/create-big-segment-store-integration?explorer=true)
201Created
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
| "integrationKey": "redis",
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
| "_status": {
30
| "available": true,
31
| "potentiallyStale": false,
32
| "lastSync": 1,
33
| "lastError": 1,
34
| "errors": [
35
| {
36
| "statusCode": 1,
37
| "message": "string",
38
| "timestamp": 1
39
| }
40
| ]
41
| },
42
| "_access": {
43
| "denied": [
44
| {
45
| "action": "string",
46
| "reason": {
47
| "effect": "allow",
48
| "resources": [
49
| "proj/*:env/*;qa_*:/flag/*"
50
| ],
51
| "notResources": [
52
| "string"
53
| ],
54
| "actions": [
55
| "*"
56
| ],
57
| "notActions": [
58
| "string"
59
| ],
60
| "role_name": "string"
61
| }
62
| }
63
| ],
64
| "allowed": [
65
| {
66
| "action": "string",
67
| "reason": {
68
| "effect": "allow",
69
| "resources": [
70
| "proj/*:env/*;qa_*:/flag/*"
71
| ],
72
| "notResources": [
73
| "string"
74
| ],
75
| "actions": [
76
| "*"
77
| ],
78
| "notActions": [
79
| "string"
80
| ],
81
| "role_name": "string"
82
| }
83
| }
84
| ]
85
| }
86
| }
```
Create a persistent store integration. If you are using server-side SDKs, segments synced from external tools and larger list-based segments require a persistent store within your infrastructure. LaunchDarkly keeps the persistent store up to date and consults it during flag evaluation. You can use either Redis or DynamoDB as your persistent store. When you create a persistent store integration, the fields in the `config` object in the request vary depending on which persistent store you use. If you are using Redis to create your persistent store integration, you will need to know: * Your Redis host * Your Redis port * Your Redis username * Your Redis password * Whether or not LaunchDarkly should connect using TLS If you are using DynamoDB to create your persistent store integration, you will need to know: * Your DynamoDB table name. The table must have the following schema: * Partition key: `namespace` (string) * Sort key: `key` (string) * Your DynamoDB Amazon Web Services (AWS) region. * Your AWS role Amazon Resource Name (ARN). This is the role that LaunchDarkly will assume to manage your DynamoDB table. * The External ID you specified when creating your Amazon Resource Name (ARN). To learn more, read [Segment configuration](https://launchdarkly.com/docs/home/flags/segment-config). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
integrationKeystringRequired`format: "string"`
The integration key, either `redis` or `dynamodb`
### Request
This endpoint expects an object.
configmap from strings to anyRequired
The global integration settings, as specified by the `formVariables` in the `manifest.json` for this integration.
onbooleanOptional
Whether the integration configuration is active. Default value is false.
tagslist of stringsOptional
Tags to associate with the integration
namestringOptional
Name to identify the integration
### Response
Big segment store response
_linksobject
The location and content type of related resources
Show 4 properties
_idstring
The integration ID
integrationKeyenum
The integration key
Allowed values:redisdynamodb
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
_statusobject
Details on the connection status of the persistent store integration
Show 5 properties
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
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Create a persistent store integration.
If you are using server-side SDKs, segments synced from external tools and larger list-based segments require a persistent store within your infrastructure. LaunchDarkly keeps the persistent store up to date and consults it during flag evaluation.
You can use either Redis or DynamoDB as your persistent store. When you create a persistent store integration, the fields in the `config` object in the request vary depending on which persistent store you use.
If you are using Redis to create your persistent store integration, you will need to know:
 * Your Redis host
 * Your Redis port
 * Your Redis username
 * Your Redis password
 * Whether or not LaunchDarkly should connect using TLS
If you are using DynamoDB to create your persistent store integration, you will need to know:
 * Your DynamoDB table name. The table must have the following schema:
 * Partition key: `namespace` (string)
 * Sort key: `key` (string)
 * Your DynamoDB Amazon Web Services (AWS) region.
 * Your AWS role Amazon Resource Name (ARN). This is the role that LaunchDarkly will assume to manage your DynamoDB table.
 * The External ID you specified when creating your Amazon Resource Name (ARN).
To learn more, read [Segment configuration](https://launchdarkly.com/docs/home/flags/segment-config).