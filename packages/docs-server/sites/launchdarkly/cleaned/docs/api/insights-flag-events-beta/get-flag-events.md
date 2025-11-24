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
/api/v2/engineering-insights/flag-events
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/flag-events"
4
| 
5
| querystring = {"projectKey":"projectKey","environmentKey":"environmentKey"}
6
| 
7
| headers = {"Authorization": "<apiKey>"}
8
| 
9
| response = requests.get(url, headers=headers, params=querystring)
10
| 
11
| print(response.json())
```
[](/docs/api/insights-flag-events-beta/get-flag-events?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "totalCount": 1200,
3
| "items": [
4
| {
5
| "id": "e3b2b0e0-9e9b-4c9a-8e9a-0e0e0e0e0e0e",
6
| "projectId": "65baa44ecc4b5bce113bb4f7",
7
| "projectKey": "default",
8
| "flagKey": "enable-new-payment-method",
9
| "eventType": "string",
10
| "eventTime": 1,
11
| "description": "Targeting rule enabled",
12
| "impact": {
13
| "size": "medium",
14
| "percentage": 50,
15
| "reason": "string",
16
| "evaluationsSummary": {
17
| "variations": [
18
| {
19
| "value": null,
20
| "before": 1000,
21
| "after": 500
22
| }
23
| ]
24
| }
25
| },
26
| "environmentId": "65baa44ecc4b5bce113bb4f7",
27
| "environmentKey": "production",
28
| "auditLogEntryId": "e3b2b0e0-9e9b-4c9a-8e9a-0e0e0e0e0e0e",
29
| "member": {
30
| "id": "65baa44ecc4b5bce113bb4f7",
31
| "email": "test@launchdarkly.com",
32
| "firstName": "string",
33
| "lastName": "string"
34
| },
35
| "actions": [
36
| "string"
37
| ],
38
| "experiments": {
39
| "totalCount": 1,
40
| "items": [
41
| {
42
| "key": "experiment-1",
43
| "name": "Experiment 1",
44
| "iteration": {
45
| "id": "65baa44ecc4b5bce113bb4f7",
46
| "status": "string",
47
| "startedAt": 1,
48
| "endedAt": 1,
49
| "_links": {}
50
| },
51
| "_links": {}
52
| }
53
| ]
54
| }
55
| }
56
| ],
57
| "_links": {
58
| "next": {
59
| "href": "/api/v2/engineering-insights/flag-events?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
60
| "type": "application/json"
61
| },
62
| "self": {
63
| "href": "/api/v2/engineering-insights/flag-events",
64
| "type": "application/json"
65
| }
66
| }
67
| }
```
Get a list of flag events ### Expanding the flag event collection response LaunchDarkly supports expanding the flag event collection response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `experiments` includes details on all of the experiments run on each flag For example, use `?expand=experiments` to include the `experiments` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
applicationKeystringOptional`format: "string"`
Comma separated list of application keys
querystringOptional`format: "string"`
Filter events by flag key
impactSizestringOptional`format: "string"`
Filter events by impact size. A small impact created a less than 20% change in the proportion of end users receiving one or more flag variations. A medium impact created between a 20%-80% change. A large impact created a more than 80% change. Options: `none`, `small`, `medium`, `large`
hasExperimentsbooleanOptional
Filter events to those associated with an experiment (`true`) or without an experiment (`false`)
globalstringOptional`format: "string"`
Filter to include or exclude global events. Default value is `include`. Options: `include`, `exclude`
expandstringOptional`format: "string"`
Expand properties in response. Options: `experiments`
limitlongOptional
The number of deployments to return. Default is 20. Maximum allowed is 100.
fromlongOptional
Unix timestamp in milliseconds. Default value is 7 days ago.
tolongOptional
Unix timestamp in milliseconds. Default value is now.
afterstringOptional`format: "string"`
Identifier used for pagination
beforestringOptional`format: "string"`
Identifier used for pagination
### Response
Flag event collection response
totalCountinteger
The total number of flag events
itemslist of objects
A list of flag events
Show 14 properties
_linksmap from strings to objects or null
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
Get a list of flag events
### Expanding the flag event collection response
LaunchDarkly supports expanding the flag event collection response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `experiments` includes details on all of the experiments run on each flag
For example, use `?expand=experiments` to include the `experiments` field in the response. By default, this field is **not** included in the response.