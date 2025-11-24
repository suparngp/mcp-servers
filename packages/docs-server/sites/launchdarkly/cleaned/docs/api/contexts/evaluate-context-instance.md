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
/api/v2/projects/:projectKey/environments/:environmentKey/flags/evaluate
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/flags/evaluate"
4
| 
5
| payload = {
6
| "key": "user-key-123abc",
7
| "kind": "user",
8
| "otherAttribute": "other attribute value"
9
| }
10
| headers = {
11
| "Authorization": "<apiKey>",
12
| "Content-Type": "application/json"
13
| }
14
| 
15
| response = requests.post(url, json=payload, headers=headers)
16
| 
17
| print(response.json())
```
[](/docs/api/contexts/evaluate-context-instance?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "name": "SortOrder",
5
| "key": "sort.order",
6
| "_value": null,
7
| "_links": {
8
| "self": {
9
| "href": "/api/v2/projects/{projectKey}/environments/{environmentKey}/flags/evaluate",
10
| "type": "application/json"
11
| },
12
| "site": {
13
| "href": "/my-project/my-environment/features/sort.order/targeting",
14
| "type": "text/html"
15
| }
16
| },
17
| "reason": {
18
| "kind": "FALLTHROUGH"
19
| }
20
| },
21
| {
22
| "name": "AlternatePage",
23
| "key": "alternate.page",
24
| "_value": null,
25
| "_links": {
26
| "self": {
27
| "href": "/api/v2/projects/{projectKey}/environments/{environmentKey}/flags/evaluate",
28
| "type": "application/json"
29
| },
30
| "site": {
31
| "href": "/my-project/my-environment/features/alternate.page/targeting",
32
| "type": "text/html"
33
| }
34
| },
35
| "reason": {
36
| "kind": "RULE_MATCH",
37
| "ruleIndex": 1,
38
| "ruleID": "b2530cdf-14c6-4e16-b660-00239e08f19b"
39
| }
40
| }
41
| ],
42
| "_links": {
43
| "self": {
44
| "href": "/api/v2/projects/{projectKey}/environments/{environmentKey}/flags/evaluate",
45
| "type": "application/json"
46
| }
47
| },
48
| "totalCount": 2
49
| }
```
Evaluate flags for a context instance, for example, to determine the expected flag variation. **Do not use this API instead of an SDK.** The LaunchDarkly SDKs are specialized for the tasks of evaluating feature flags in your application at scale and generating analytics events based on those evaluations. This API is not designed for that use case. Any evaluations you perform with this API will not be reflected in features such as flag statuses and flag insights. Context instances evaluated by this API will not appear in the Contexts list. To learn more, read [Comparing LaunchDarkly's SDKs and REST API](https://launchdarkly.com/docs/guides/api/comparing-sdk-rest-api). ### Filtering LaunchDarkly supports the `filter` query param for filtering, with the following fields: - `query` filters for a string that matches against the flags' keys and names. It is not case sensitive. For example: `filter=query equals dark-mode`. - `tags` filters the list to flags that have all of the tags in the list. For example: `filter=tags contains ["beta","q1"]`. You can also apply multiple filters at once. For example, setting `filter=query equals dark-mode, tags contains ["beta","q1"]` matches flags which match the key or name `dark-mode` and are tagged `beta` and `q1`. 
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
The number of feature flags to return. Defaults to -1, which returns all flags
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
sortstringOptional`format: "string"`
A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form `field operator value`. Supported fields are explained above.
### Request
This endpoint expects a map from strings to any.
### Response
Flag evaluation collection response
itemslist of objects
Details on the flag evaluations for this context instance
Show 5 properties
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of flags
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
Evaluate flags for a context instance, for example, to determine the expected flag variation. **Do not use this API instead of an SDK.** The LaunchDarkly SDKs are specialized for the tasks of evaluating feature flags in your application at scale and generating analytics events based on those evaluations. This API is not designed for that use case. Any evaluations you perform with this API will not be reflected in features such as flag statuses and flag insights. Context instances evaluated by this API will not appear in the Contexts list. To learn more, read [Comparing LaunchDarkly’s SDKs and REST API](https://launchdarkly.com/docs/guides/api/comparing-sdk-rest-api).
### Filtering
LaunchDarkly supports the `filter` query param for filtering, with the following fields:
 * `query` filters for a string that matches against the flags’ keys and names. It is not case sensitive. For example: `filter=query equals dark-mode`.
 * `tags` filters the list to flags that have all of the tags in the list. For example: `filter=tags contains ["beta","q1"]`.
You can also apply multiple filters at once. For example, setting `filter=query equals dark-mode, tags contains ["beta","q1"]` matches flags which match the key or name `dark-mode` and are tagged `beta` and `q1`.