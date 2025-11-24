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
/api/v2/projects/:projectKey/environments/:environmentKey/context-instances/search
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/context-instances/search"
4
| 
5
| payload = {}
6
| headers = {
7
| "Authorization": "<apiKey>",
8
| "Content-Type": "application/json"
9
| }
10
| 
11
| response = requests.post(url, json=payload, headers=headers)
12
| 
13
| print(response.json())
```
[](/docs/api/contexts/search-context-instances?explorer=true)
200Successful
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
| "id": "b3JnOmxhdW5jaGRhcmtseQ",
6
| "context": null,
7
| "lastSeen": "2022-04-15T15:00:57.526470334Z",
8
| "applicationId": "GoSDK/1.2",
9
| "anonymousKinds": [
10
| "device",
11
| "privateKind"
12
| ],
13
| "_links": {
14
| "parent": {
15
| "href": "/api/v2/projects/my-project/environments/my-environment",
16
| "type": "application/json"
17
| },
18
| "self": {
19
| "href": "/api/v2/projects/my-project/environments/my-env/context-instances/organization:launch-darkly:user:henry?filter=applicationId:\"GoSDK/1.2\"",
20
| "type": "application/json"
21
| },
22
| "site": {
23
| "href": "/my-project/my-environment/context-instances/organization:launch-darkly:user:henry",
24
| "type": "text/html"
25
| }
26
| },
27
| "_access": {
28
| "denied": [
29
| {
30
| "action": "string",
31
| "reason": {
32
| "effect": "allow",
33
| "resources": [
34
| "proj/*:env/*;qa_*:/flag/*"
35
| ],
36
| "notResources": [
37
| "string"
38
| ],
39
| "actions": [
40
| "*"
41
| ],
42
| "notActions": [
43
| "string"
44
| ],
45
| "role_name": "string"
46
| }
47
| }
48
| ],
49
| "allowed": [
50
| {
51
| "action": "string",
52
| "reason": {
53
| "effect": "allow",
54
| "resources": [
55
| "proj/*:env/*;qa_*:/flag/*"
56
| ],
57
| "notResources": [
58
| "string"
59
| ],
60
| "actions": [
61
| "*"
62
| ],
63
| "notActions": [
64
| "string"
65
| ],
66
| "role_name": "string"
67
| }
68
| }
69
| ]
70
| }
71
| }
72
| ],
73
| "_links": {
74
| "next": {
75
| "href": "/api/v2/projects/my-project/environments/my-env/context-instances/organization:launch-darkly:user:henry?limit=2&continuationToken=2022-04-15T15:00:57.526470334Z",
76
| "type": "application/json"
77
| },
78
| "self": {
79
| "href": "/api/v2/projects/my-proj/environments/my-env/context-instances/organization:launch-darkly:user:henry-jacobs?limit=2",
80
| "type": "application/json"
81
| }
82
| },
83
| "totalCount": 100,
84
| "continuationToken": "QAGFKH1313KUGI2351"
85
| }
```
Search for context instances. You can use either the query parameters or the request body parameters. If both are provided, there is an error. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/api/contexts#filtering-contexts-and-context-instances). To learn more about context instances, read [Context instances](https://launchdarkly.com/docs/home/observability/multi-contexts#context-instances). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Query Parameters
limitlongOptional
Specifies the maximum number of items in the collection to return (max: 50, default: 20)
continuationTokenstringOptional`format: "string"`
Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead.
sortstringOptional`format: "string"`
Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.
filterstringOptional`format: "string"`
A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).
includeTotalCountbooleanOptional
Specifies whether to include or omit the total count of matching context instances. Defaults to true.
### Request
This endpoint expects an object.
filterstringOptional
A collection of context instance filters
sortstringOptional
Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.
limitintegerOptional
Specifies the maximum number of items in the collection to return (max: 50, default: 20)
continuationTokenstringOptional
Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link instead, because this value is an obfuscated string.
### Response
Context instances collection response
_environmentIdstring
The environment ID
itemslist of objects
A collection of context instances. Can include multiple versions of context instances that have the same `id`, but different `applicationId`s.
Show 7 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of unique context instances
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
Search for context instances.
You can use either the query parameters or the request body parameters. If both are provided, there is an error.
To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/api/contexts#filtering-contexts-and-context-instances). To learn more about context instances, read [Context instances](https://launchdarkly.com/docs/home/observability/multi-contexts#context-instances).