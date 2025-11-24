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
/api/v2/projects/:projectKey/ai-configs/:configKey/variations/:variationKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/ai-configs/configKey/variations/variationKey"
4
| 
5
| payload = {
6
| "comment": "comment",
7
| "description": "description",
8
| "instructions": "instructions",
9
| "messages": [
10
| {
11
| "content": "content",
12
| "role": "role"
13
| },
14
| {
15
| "content": "content",
16
| "role": "role"
17
| }
18
| ],
19
| "model": "{}",
20
| "modelConfigKey": "modelConfigKey",
21
| "name": "name",
22
| "published": True,
23
| "state": "state",
24
| "tools": [
25
| {
26
| "key": "key",
27
| "version": 0
28
| },
29
| {
30
| "key": "key",
31
| "version": 0
32
| }
33
| ],
34
| "toolKeys": ["toolKeys", "toolKeys"],
35
| "judgeConfiguration": { "judges": [
36
| {
37
| "judgeConfigKey": "judgeConfigKey",
38
| "samplingRate": 0.7061401
39
| },
40
| {
41
| "judgeConfigKey": "judgeConfigKey",
42
| "samplingRate": 0.7061401
43
| }
44
| ] }
45
| }
46
| headers = {
47
| "LD-API-Version": "beta",
48
| "Authorization": "<apiKey>",
49
| "Content-Type": "application/json"
50
| }
51
| 
52
| response = requests.patch(url, json=payload, headers=headers)
53
| 
54
| print(response.json())
```
[](/docs/api/ai-configs-beta/patch-ai-config-variation?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "key": "key",
3
| "_id": "_id",
4
| "model": "{}",
5
| "name": "name",
6
| "createdAt": 6,
7
| "version": 1,
8
| "_links": {
9
| "parent": {
10
| "href": "href",
11
| "type": "type"
12
| }
13
| },
14
| "color": "color",
15
| "comment": "comment",
16
| "description": "description",
17
| "instructions": "instructions",
18
| "messages": [
19
| {
20
| "content": "content",
21
| "role": "role"
22
| },
23
| {
24
| "content": "content",
25
| "role": "role"
26
| }
27
| ],
28
| "modelConfigKey": "modelConfigKey",
29
| "state": "state",
30
| "_archivedAt": 5,
31
| "_publishedAt": 5,
32
| "tools": [
33
| {
34
| "key": "key",
35
| "version": 2
36
| },
37
| {
38
| "key": "key",
39
| "version": 2
40
| }
41
| ],
42
| "judgeConfiguration": {
43
| "judges": [
44
| {
45
| "judgeConfigKey": "judgeConfigKey",
46
| "samplingRate": 0.7061401
47
| },
48
| {
49
| "judgeConfigKey": "judgeConfigKey",
50
| "samplingRate": 0.7061401
51
| }
52
| ]
53
| },
54
| "judgingConfigKeys": [
55
| "judgingConfigKeys",
56
| "judgingConfigKeys"
57
| ]
58
| }
```
Edit an existing variation of an AI Config. This creates a new version of the variation. The request body must be a JSON object of the fields to update. The values you include replace the existing values for the fields. Here's an example: ``` { "messages": [ { "role": "system", "content": "The new message" } ] } ``` 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
configKeystringRequired
variationKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
AI Config variation object to update
commentstringOptional
Human-readable description of what this patch changes
descriptionstringOptional
Description for agent when AI Config is in agent mode.
instructionsstringOptional
Instructions for agent when AI Config is in agent mode.
messageslist of objectsOptional
Show 2 properties
modelobjectOptional
modelConfigKeystringOptional
namestringOptional
publishedbooleanOptional
statestringOptional
One of 'archived', 'published'
toolslist of objectsOptional
List of tools to use for this variation. The latest version of the tool will be used.
Show 2 properties
toolKeyslist of stringsOptional
List of tool keys to use for this variation. The latest version of the tool will be used.
judgeConfigurationobjectOptional
Show 1 properties
### Response
AI Config variation updated
keystring
_idstring
modelobject
namestring
createdAtlong
versioninteger
_linksobject or null
Show 1 properties
colorstring or null
commentstring or null
descriptionstring or null
Returns the description for the agent. This is only returned for agent variations.
instructionsstring or null
Returns the instructions for the agent. This is only returned for agent variations.
messageslist of objects or null
Show 2 properties
modelConfigKeystring or null
statestring or null
_archivedAtlong or null
_publishedAtlong or null
toolslist of objects or null
Show 2 properties
judgeConfigurationobject or null
Show 1 properties
judgingConfigKeyslist of strings or null
### Errors
400
Bad Request Error
403
Forbidden Error
404
Not Found Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Edit an existing variation of an AI Config. This creates a new version of the variation.
The request body must be a JSON object of the fields to update. The values you include replace the existing values for the fields.
Here’s an example:
```
 { 
--- 
 "messages": [ 
 { 
 "role": "system", 
 "content": "The new message" 
 } 
 ] 
 } 
```