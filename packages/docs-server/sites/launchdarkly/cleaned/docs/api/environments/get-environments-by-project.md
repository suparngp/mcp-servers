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
/api/v2/projects/:projectKey/environments
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments"
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
[](/docs/api/environments/get-environments-by-project?explorer=true)
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
| "_links": {
5
| "self": {
6
| "href": "/api/v2/projects/my-project/environments/my-environment",
7
| "type": "application/json"
8
| }
9
| },
10
| "_id": "57be1db38b75bf0772d11384",
11
| "key": "environment-key-123abc",
12
| "name": "My Environment",
13
| "apiKey": "sdk-xxx",
14
| "mobileKey": "mob-xxx",
15
| "color": "F5A623",
16
| "defaultTtl": 5,
17
| "secureMode": true,
18
| "defaultTrackEvents": false,
19
| "requireComments": true,
20
| "confirmChanges": true,
21
| "tags": [
22
| "ops"
23
| ],
24
| "critical": true,
25
| "_access": {
26
| "denied": [
27
| {
28
| "action": "string",
29
| "reason": {
30
| "effect": "allow",
31
| "resources": [
32
| "proj/*:env/*;qa_*:/flag/*"
33
| ],
34
| "notResources": [
35
| "string"
36
| ],
37
| "actions": [
38
| "*"
39
| ],
40
| "notActions": [
41
| "string"
42
| ],
43
| "role_name": "string"
44
| }
45
| }
46
| ],
47
| "allowed": [
48
| {
49
| "action": "string",
50
| "reason": {
51
| "effect": "allow",
52
| "resources": [
53
| "proj/*:env/*;qa_*:/flag/*"
54
| ],
55
| "notResources": [
56
| "string"
57
| ],
58
| "actions": [
59
| "*"
60
| ],
61
| "notActions": [
62
| "string"
63
| ],
64
| "role_name": "string"
65
| }
66
| }
67
| ]
68
| },
69
| "approvalSettings": {
70
| "required": true,
71
| "bypassApprovalsForPendingChanges": false,
72
| "minNumApprovals": 1,
73
| "canReviewOwnRequest": false,
74
| "canApplyDeclinedChanges": true,
75
| "serviceKind": "launchdarkly",
76
| "serviceConfig": {},
77
| "requiredApprovalTags": [
78
| "require-approval"
79
| ],
80
| "autoApplyApprovedChanges": true,
81
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
82
| "resourceKind": "string"
83
| },
84
| "resourceApprovalSettings": {}
85
| }
86
| ],
87
| "_links": {},
88
| "totalCount": 2
89
| }
```
Return a list of environments for the specified project. By default, this returns the first 20 environments. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the `_links` field that returns. If those links do not appear, the pages they refer to don't exist. For example, the `first` and `prev` links will be missing from the response on the first page, because there is no previous page and you cannot return to the first page when you are already on the first page. ### Filtering environments LaunchDarkly supports two fields for filters: - `query` is a string that matches against the environments' names and keys. It is not case sensitive. - `tags` is a `+`-separated list of environment tags. It filters the list of environments that have all of the tags in the list. For example, the filter `filter=query:abc,tags:tag-1+tag-2` matches environments with the string `abc` in their name or key and also are tagged with `tag-1` and `tag-2`. The filter is not case-sensitive. The documented values for `filter` query parameters are prior to URL encoding. For example, the `+` in `filter=tags:tag-1+tag-2` must be encoded to `%2B`. ### Sorting environments LaunchDarkly supports the following fields for sorting: - `createdOn` sorts by the creation date of the environment. - `critical` sorts by whether the environments are marked as critical. - `name` sorts by environment name. For example, `sort=name` sorts the response by environment name in ascending order. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
### Query Parameters
limitlongOptional
The number of environments to return in the response. Defaults to 20.
offsetlongOptional
Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form `field:value`.
sortstringOptional`format: "string"`
A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order.
### Response
Environments collection response
itemslist of objects
An array of environments
Show 17 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of environments returned
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
405
Method Not Allowed Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Return a list of environments for the specified project.
By default, this returns the first 20 environments. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the `_links` field that returns. If those links do not appear, the pages they refer to don’t exist. For example, the `first` and `prev` links will be missing from the response on the first page, because there is no previous page and you cannot return to the first page when you are already on the first page.
### Filtering environments
LaunchDarkly supports two fields for filters:
 * `query` is a string that matches against the environments’ names and keys. It is not case sensitive.
 * `tags` is a `+`-separated list of environment tags. It filters the list of environments that have all of the tags in the list.
For example, the filter `filter=query:abc,tags:tag-1+tag-2` matches environments with the string `abc` in their name or key and also are tagged with `tag-1` and `tag-2`. The filter is not case-sensitive.
The documented values for `filter` query parameters are prior to URL encoding. For example, the `+` in `filter=tags:tag-1+tag-2` must be encoded to `%2B`.
### Sorting environments
LaunchDarkly supports the following fields for sorting:
 * `createdOn` sorts by the creation date of the environment.
 * `critical` sorts by whether the environments are marked as critical.
 * `name` sorts by environment name.
For example, `sort=name` sorts the response by environment name in ascending order.