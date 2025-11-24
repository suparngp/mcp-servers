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
/api/v2/integration-capabilities/flag-import/:projectKey/:integrationKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/integration-capabilities/flag-import/projectKey/integrationKey"
4
| 
5
| payload = {
6
| "config": {
7
| "environmentId": "The ID of the environment in the external system",
8
| "ldApiKey": "An API key with create flag permissions in your LaunchDarkly account",
9
| "ldMaintainer": "The ID of the member who will be the maintainer of the imported flags",
10
| "ldTag": "A tag to apply to all flags imported to LaunchDarkly",
11
| "splitTag": "If provided, imports only the flags from the external system with this tag. Leave blank to import all flags.",
12
| "workspaceApiKey": "An API key with read permissions in the external feature management system",
13
| "workspaceId": "The ID of the workspace in the external system"
14
| },
15
| "tags": ["example-tag"],
16
| "name": "Sample configuration"
17
| }
18
| headers = {
19
| "Authorization": "<apiKey>",
20
| "Content-Type": "application/json"
21
| }
22
| 
23
| response = requests.post(url, json=payload, headers=headers)
24
| 
25
| print(response.json())
```
[](/docs/api/flag-import-configurations-beta/create-flag-import-configuration?explorer=true)
200Successful
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
| }
15
| },
16
| "_id": "12ab3c4d5ef1a2345bcde67f",
17
| "integrationKey": "split",
18
| "projectKey": "default",
19
| "config": {},
20
| "tags": [],
21
| "name": "Development environment configuration",
22
| "version": 1,
23
| "_status": {
24
| "status": "pending",
25
| "lastImport": 1,
26
| "lastError": 1,
27
| "errors": [
28
| {
29
| "integrationId": "string",
30
| "message": "string",
31
| "statusCode": 1,
32
| "timestamp": 1
33
| }
34
| ]
35
| },
36
| "_access": {
37
| "denied": [
38
| {
39
| "action": "string",
40
| "reason": {
41
| "effect": "allow",
42
| "resources": [
43
| "proj/*:env/*;qa_*:/flag/*"
44
| ],
45
| "notResources": [
46
| "string"
47
| ],
48
| "actions": [
49
| "*"
50
| ],
51
| "notActions": [
52
| "string"
53
| ],
54
| "role_name": "string"
55
| }
56
| }
57
| ],
58
| "allowed": [
59
| {
60
| "action": "string",
61
| "reason": {
62
| "effect": "allow",
63
| "resources": [
64
| "proj/*:env/*;qa_*:/flag/*"
65
| ],
66
| "notResources": [
67
| "string"
68
| ],
69
| "actions": [
70
| "*"
71
| ],
72
| "notActions": [
73
| "string"
74
| ],
75
| "role_name": "string"
76
| }
77
| }
78
| ]
79
| }
80
| }
```
Create a new flag import configuration. The `integrationKey` path parameter identifies the feature management system from which the import occurs, for example, `split`. The `config` object in the request body schema is described by the global integration settings, as specified by the <code>formVariables</code> in the <code>manifest.json</code> for this integration. It varies slightly based on the `integrationKey`.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
integrationKeystringRequired`format: "string"`
The integration key
### Request
This endpoint expects an object.
configmap from strings to anyRequired
The global configuration settings, as specified by the `formVariables` in the `manifest.json` for this configuration.
tagslist of stringsOptional
Tags to associate with the configuration
namestringOptional
Name to identify the configuration
### Response
Flag Import Configuration response
_linksobject
The location and content type of related resources
Show 3 properties
_idstring
The integration ID
integrationKeyenum
The integration key
Allowed values:splitunleash
projectKeystring
The project key
configmap from strings to any
The configuration for the given import integration. Only included when requesting a single integration by ID. Refer to the `formVariables` field in the corresponding `manifest.json` for a full list of fields for each integration.
tagslist of strings
List of tags for this configuration
namestring
Name of the configuration
versioninteger
Version of the current configuration
_statusobject
Details on the status of the import job
Show 4 properties
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
Create a new flag import configuration. The `integrationKey` path parameter identifies the feature management system from which the import occurs, for example, `split`. The `config` object in the request body schema is described by the global integration settings, as specified by the `formVariables` in the `manifest.json` for this integration. It varies slightly based on the `integrationKey`.