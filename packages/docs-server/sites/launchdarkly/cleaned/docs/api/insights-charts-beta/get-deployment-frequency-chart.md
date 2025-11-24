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
/api/v2/engineering-insights/charts/deployments/frequency
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/charts/deployments/frequency"
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
[](/docs/api/insights-charts-beta/get-deployment-frequency-chart?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "metadata": {
3
| "summary": {},
4
| "xAxis": {
5
| "unit": "count"
6
| },
7
| "yAxis": {
8
| "unit": "count"
9
| },
10
| "name": "deploymentFrequency",
11
| "metrics": {}
12
| },
13
| "series": [
14
| {
15
| "metadata": {
16
| "name": "string",
17
| "count": 1,
18
| "bounds": [
19
| {
20
| "name": "equal",
21
| "value": 100
22
| }
23
| ]
24
| },
25
| "data": [
26
| {
27
| "x": 1617225600000,
28
| "y": 100,
29
| "values": {}
30
| }
31
| ]
32
| }
33
| ]
34
| }
```
Get deployment frequency chart data. Engineering insights displays deployment frequency data in the [deployment frequency metric view](https://launchdarkly.com/docs/home/observability/deployments). ### Expanding the chart response LaunchDarkly supports expanding the chart response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `metrics` includes details on the metrics related to deployment frequency For example, use `?expand=metrics` to include the `metrics` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
projectKeystringOptional`format: "string"`
The project key
environmentKeystringOptional`format: "string"`
The environment key
applicationKeystringOptional`format: "string"`
Comma separated list of application keys
fromdatetimeOptional
Unix timestamp in milliseconds. Default value is 7 days ago.
todatetimeOptional
Unix timestamp in milliseconds. Default value is now.
bucketTypestringOptional`format: "string"`
Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`.
bucketMslongOptional
Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds).
groupBystringOptional`format: "string"`
Options: `application`, `kind`
expandstringOptional`format: "string"`
Options: `metrics`
### Response
Chart response
metadataobject
Metadata for the chart
Show 5 properties
serieslist of objects
Series data for the chart
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
Get deployment frequency chart data. Engineering insights displays deployment frequency data in the [deployment frequency metric view](https://launchdarkly.com/docs/home/observability/deployments).
### Expanding the chart response
LaunchDarkly supports expanding the chart response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `metrics` includes details on the metrics related to deployment frequency
For example, use `?expand=metrics` to include the `metrics` field in the response. By default, this field is **not** included in the response.