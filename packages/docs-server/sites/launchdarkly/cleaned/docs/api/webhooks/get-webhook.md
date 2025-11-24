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
/api/v2/webhooks/:id
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/webhooks/id \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/webhooks/get-webhook?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {},
3
| "_id": "57be1db38b75bf0772d11384",
4
| "url": "http://www.example.com",
5
| "on": true,
6
| "tags": [
7
| "examples"
8
| ],
9
| "name": "Example hook",
10
| "secret": "frobozz",
11
| "statements": [
12
| {
13
| "effect": "allow",
14
| "resources": [
15
| "proj/*:env/*;qa_*:/flag/*"
16
| ],
17
| "notResources": [
18
| "string"
19
| ],
20
| "actions": [
21
| "*"
22
| ],
23
| "notActions": [
24
| "string"
25
| ]
26
| }
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
| }
72
| }
```
Get a single webhook by ID.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
idstringRequired`format: "string"`
The ID of the webhook
### Response
Webhook response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The ID of this webhook
urlstring
The URL to which LaunchDarkly sends an HTTP POST payload for this webhook
onboolean
Whether or not this webhook is enabled
tagslist of strings
List of tags for this webhook
namestring or null
A human-readable name for this webhook
secretstring or null
The secret for this webhook
statementslist of objects or null
Represents a Custom role policy, defining a resource kinds filter the webhook responds to.
Show 5 properties
_accessobject or null
Details on the allowed and denied actions for this webhook
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