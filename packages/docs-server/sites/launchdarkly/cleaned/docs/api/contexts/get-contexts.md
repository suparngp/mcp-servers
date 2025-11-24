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
/api/v2/projects/:projectKey/environments/:environmentKey/contexts/:kind/:key
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/contexts/kind/key"
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
[](/docs/api/contexts/get-contexts?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_environmentId": "57be1db38b75bf0772d11384",
3
| "items": [
4
| {
5
| "context": null,
6
| "lastSeen": "2022-04-15T15:00:57.526470334Z",
7
| "applicationId": "GoSDK/1.2",
8
| "_links": {
9
| "parent": {
10
| "href": "/api/v2/projects/my-project/environments/my-environment",
11
| "type": "application/json"
12
| },
13
| "self": {
14
| "href": "/api/v2/projects/my-project/environments/my-env/contexts/organization:launch-darkly:user:henry?filter=applicationId:\"GoSDK/1.2\"",
15
| "type": "application/json"
16
| },
17
| "site": {
18
| "href": "/my-project/my-environment/context/organization:launch-darkly:user:henry",
19
| "type": "text/html"
20
| }
21
| },
22
| "_access": {
23
| "denied": [
24
| {
25
| "action": "string",
26
| "reason": {
27
| "effect": "allow",
28
| "resources": [
29
| "proj/*:env/*;qa_*:/flag/*"
30
| ],
31
| "notResources": [
32
| "string"
33
| ],
34
| "actions": [
35
| "*"
36
| ],
37
| "notActions": [
38
| "string"
39
| ],
40
| "role_name": "string"
41
| }
42
| }
43
| ],
44
| "allowed": [
45
| {
46
| "action": "string",
47
| "reason": {
48
| "effect": "allow",
49
| "resources": [
50
| "proj/*:env/*;qa_*:/flag/*"
51
| ],
52
| "notResources": [
53
| "string"
54
| ],
55
| "actions": [
56
| "*"
57
| ],
58
| "notActions": [
59
| "string"
60
| ],
61
| "role_name": "string"
62
| }
63
| }
64
| ]
65
| },
66
| "associatedContexts": 0
67
| }
68
| ],
69
| "_links": {
70
| "next": {
71
| "href": "/app.launchdarkly.com/api/v2/projects/my-project/environments/my-environment/contexts?filter=kind:{\"equals\": [\"organization\"]}&limit=2&continuationToken=QAGFKH1313KUGI2351",
72
| "type": "application/json"
73
| },
74
| "self": {
75
| "href": "/api/v2/projects/my-proj/environments/my-env/contexts?filter=kind:{\"equals\": [\"organization\"]}&limit=2&continuationToken=QAGFKH1313KUGI2351",
76
| "type": "application/json"
77
| }
78
| },
79
| "totalCount": 100,
80
| "continuationToken": "QAGFKH1313KUGI2351"
81
| }
```
Get contexts based on kind and key.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
kindstringRequired`format: "string"`
The context kind
keystringRequired`format: "string"`
The context key
### Query Parameters
limitlongOptional
Specifies the maximum number of items in the collection to return (max: 50, default: 20)
continuationTokenstringOptional`format: "string"`
Limits results to contexts with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead.
sortstringOptional`format: "string"`
Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.
filterstringOptional`format: "string"`
A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).
includeTotalCountbooleanOptional
Specifies whether to include or omit the total count of matching contexts. Defaults to true.
### Response
Contexts collection response
_environmentIdstring
The environment ID where the context was evaluated
itemslist of objects
A collection of contexts. Can include multiple versions of contexts that have the same `kind` and `key`, but different `applicationId`s.
Show 6 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of contexts
continuationTokenstring or null
An obfuscated string that references the last context instance on the previous page of results. You can use this for pagination, however, we recommend using the `next` link instead.
### Errors
400
Bad Request Error
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