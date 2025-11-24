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
/api/v2/destinations
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/destinations"
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
[](/docs/api/data-export-destinations/get-destinations?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {
3
| "self": {
4
| "href": "/api/v2/destinations",
5
| "type": "application/json"
6
| }
7
| },
8
| "items": [
9
| {
10
| "_id": "610addeadbeefaa86ec9a7d4",
11
| "_links": {
12
| "parent": {
13
| "href": "/api/v2/destinations",
14
| "type": "application/json"
15
| },
16
| "self": {
17
| "href": "/api/v2/destinations/my-project/my-environment/610addeadbeefaa86ec9a7d4",
18
| "type": "application/json"
19
| }
20
| },
21
| "name": "example-destination",
22
| "kind": "google-pubsub",
23
| "version": 1,
24
| "config": null,
25
| "on": true,
26
| "_access": {
27
| "denied": [
28
| {
29
| "action": "string",
30
| "reason": {
31
| "effect": "allow",
32
| "resources": [
33
| "proj/*:env/*;qa_*:/flag/*"
34
| ],
35
| "notResources": [
36
| "string"
37
| ],
38
| "actions": [
39
| "*"
40
| ],
41
| "notActions": [
42
| "string"
43
| ],
44
| "role_name": "string"
45
| }
46
| }
47
| ],
48
| "allowed": [
49
| {
50
| "action": "string",
51
| "reason": {
52
| "effect": "allow",
53
| "resources": [
54
| "proj/*:env/*;qa_*:/flag/*"
55
| ],
56
| "notResources": [
57
| "string"
58
| ],
59
| "actions": [
60
| "*"
61
| ],
62
| "notActions": [
63
| "string"
64
| ],
65
| "role_name": "string"
66
| }
67
| }
68
| ]
69
| }
70
| }
71
| ]
72
| }
```
Get a list of Data Export destinations configured across all projects and environments.
### Authentication
Authorizationstring
API Key authentication via header
### Response
Destination collection response
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
itemslist of objects or null
An array of Data Export destinations
Show 8 properties
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