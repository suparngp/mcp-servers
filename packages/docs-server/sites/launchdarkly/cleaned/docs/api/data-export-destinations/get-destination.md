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
/api/v2/destinations/:projectKey/:environmentKey/:id
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/destinations/projectKey/environmentKey/id"
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
[](/docs/api/data-export-destinations/get-destination?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "610addeadbeefaa86ec9a7d4",
3
| "_links": {
4
| "parent": {
5
| "href": "/api/v2/destinations",
6
| "type": "application/json"
7
| },
8
| "self": {
9
| "href": "/api/v2/destinations/my-project/my-environment/610addeadbeefaa86ec9a7d4",
10
| "type": "application/json"
11
| }
12
| },
13
| "name": "example-destination",
14
| "kind": "google-pubsub",
15
| "version": 1,
16
| "config": null,
17
| "on": true,
18
| "_access": {
19
| "denied": [
20
| {
21
| "action": "string",
22
| "reason": {
23
| "effect": "allow",
24
| "resources": [
25
| "proj/*:env/*;qa_*:/flag/*"
26
| ],
27
| "notResources": [
28
| "string"
29
| ],
30
| "actions": [
31
| "*"
32
| ],
33
| "notActions": [
34
| "string"
35
| ],
36
| "role_name": "string"
37
| }
38
| }
39
| ],
40
| "allowed": [
41
| {
42
| "action": "string",
43
| "reason": {
44
| "effect": "allow",
45
| "resources": [
46
| "proj/*:env/*;qa_*:/flag/*"
47
| ],
48
| "notResources": [
49
| "string"
50
| ],
51
| "actions": [
52
| "*"
53
| ],
54
| "notActions": [
55
| "string"
56
| ],
57
| "role_name": "string"
58
| }
59
| }
60
| ]
61
| }
62
| }
```
Get a single Data Export destination by ID.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
idstringRequired`format: "string"`
The Data Export destination ID
### Response
Destination response
_idstring or null
The ID of this Data Export destination
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
namestring or null
A human-readable name for your Data Export destination
kindenum or null
The type of Data Export destination
Show 9 enum values
versiondouble or null
configany or null
An object with the configuration parameters required for the destination type
onboolean or null
Whether the export is on, that is, the status of the integration
_accessobject or null
Details on the allowed and denied actions for this Data Export destination
Show 2 properties
### Errors
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