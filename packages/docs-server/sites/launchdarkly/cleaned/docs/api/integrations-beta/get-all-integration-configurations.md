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
/api/v2/integration-configurations/keys/:integrationKey
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/integration-configurations/keys/integrationKey \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/integrations-beta/get-all-integration-configurations?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "_links": {},
5
| "_id": "string",
6
| "name": "Example Datadog integration",
7
| "_createdAt": 1,
8
| "_integrationKey": "datadog",
9
| "tags": [
10
| "testing"
11
| ],
12
| "enabled": true,
13
| "_access": {
14
| "denied": [
15
| {
16
| "action": "string",
17
| "reason": {
18
| "effect": "allow",
19
| "resources": [
20
| "proj/*:env/*;qa_*:/flag/*"
21
| ],
22
| "notResources": [
23
| "string"
24
| ],
25
| "actions": [
26
| "*"
27
| ],
28
| "notActions": [
29
| "string"
30
| ],
31
| "role_name": "string"
32
| }
33
| }
34
| ],
35
| "allowed": [
36
| {
37
| "action": "string",
38
| "reason": {
39
| "effect": "allow",
40
| "resources": [
41
| "proj/*:env/*;qa_*:/flag/*"
42
| ],
43
| "notResources": [
44
| "string"
45
| ],
46
| "actions": [
47
| "*"
48
| ],
49
| "notActions": [
50
| "string"
51
| ],
52
| "role_name": "string"
53
| }
54
| }
55
| ]
56
| },
57
| "configValues": {},
58
| "capabilityConfig": {
59
| "approvals": {
60
| "additionalFormVariables": [
61
| {}
62
| ]
63
| },
64
| "auditLogEventsHook": {
65
| "statements": [
66
| {
67
| "effect": "allow",
68
| "resources": [
69
| "proj/*:env/*;qa_*:/flag/*"
70
| ],
71
| "notResources": [
72
| "string"
73
| ],
74
| "actions": [
75
| "*"
76
| ],
77
| "notActions": [
78
| "string"
79
| ]
80
| }
81
| ]
82
| }
83
| }
84
| }
85
| ],
86
| "_links": {}
87
| }
```
Get all integration configurations with the specified integration key. (Excludes [persistent store](https://launchdarkly.com/docs/api/persistent-store-integrations-beta) and [flag import configurations](https://launchdarkly.com/docs/api/flag-import-configurations-beta).).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
integrationKeystringRequired`format: "string"`
Integration key
### Response
List of Integration Configurations
itemslist of objects
An array of integration configurations
Show 10 properties
_linksmap from strings to objects
The location and content type of related resources
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
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs