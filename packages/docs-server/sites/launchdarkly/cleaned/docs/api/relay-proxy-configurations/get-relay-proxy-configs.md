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
/api/v2/account/relay-auto-configs
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/account/relay-auto-configs"
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
[](/docs/api/relay-proxy-configurations/get-relay-proxy-configs?explorer=true)
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
| "_id": "string",
5
| "name": "Relay Proxy Demo Config",
6
| "policy": [
7
| {
8
| "effect": "allow",
9
| "resources": [
10
| "proj/*:env/*;qa_*:/flag/*"
11
| ],
12
| "notResources": [
13
| "string"
14
| ],
15
| "actions": [
16
| "*"
17
| ],
18
| "notActions": [
19
| "string"
20
| ]
21
| }
22
| ],
23
| "fullKey": "string",
24
| "displayKey": "7f30",
25
| "creationDate": 1,
26
| "lastModified": 1,
27
| "_creator": {
28
| "_links": {
29
| "self": {
30
| "href": "/api/v2/members/569f183514f4432160000007",
31
| "type": "application/json"
32
| }
33
| },
34
| "_id": "569f183514f4432160000007",
35
| "role": "admin",
36
| "email": "ariel@acme.com",
37
| "firstName": "Ariel",
38
| "lastName": "Flores"
39
| },
40
| "_access": {
41
| "denied": [
42
| {
43
| "action": "string",
44
| "reason": {
45
| "effect": "allow",
46
| "resources": [
47
| "proj/*:env/*;qa_*:/flag/*"
48
| ],
49
| "notResources": [
50
| "string"
51
| ],
52
| "actions": [
53
| "*"
54
| ],
55
| "notActions": [
56
| "string"
57
| ],
58
| "role_name": "string"
59
| }
60
| }
61
| ],
62
| "allowed": [
63
| {
64
| "action": "string",
65
| "reason": {
66
| "effect": "allow",
67
| "resources": [
68
| "proj/*:env/*;qa_*:/flag/*"
69
| ],
70
| "notResources": [
71
| "string"
72
| ],
73
| "actions": [
74
| "*"
75
| ],
76
| "notActions": [
77
| "string"
78
| ],
79
| "role_name": "string"
80
| }
81
| }
82
| ]
83
| }
84
| }
85
| ]
86
| }
```
Get a list of Relay Proxy configurations in the account.
### Authentication
Authorizationstring
API Key authentication via header
### Response
Relay auto configs collection response
itemslist of objects
An array of Relay Proxy configurations
Show 9 properties
### Errors
401
Unauthorized Error
403
Forbidden Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs