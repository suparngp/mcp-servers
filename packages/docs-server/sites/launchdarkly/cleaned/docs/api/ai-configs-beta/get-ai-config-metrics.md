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
/api/v2/projects/:projectKey/ai-configs/:configKey/metrics
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/ai-configs/configKey/metrics"
4
| 
5
| querystring = {"from":"1","to":"1","env":"env"}
6
| 
7
| headers = {
8
| "LD-API-Version": "beta",
9
| "Authorization": "<apiKey>"
10
| }
11
| 
12
| response = requests.get(url, headers=headers, params=querystring)
13
| 
14
| print(response.json())
```
[](/docs/api/ai-configs-beta/get-ai-config-metrics?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "inputTokens": 0,
3
| "outputTokens": 6,
4
| "totalTokens": 1,
5
| "generationSuccessCount": 5,
6
| "generationErrorCount": 2,
7
| "thumbsUp": 7,
8
| "thumbsDown": 9,
9
| "durationMs": 3,
10
| "timeToFirstTokenMs": 2,
11
| "satisfactionRating": 0.4145608,
12
| "inputCost": 7.386281948385884,
13
| "outputCost": 1.2315135367772556,
14
| "judgeAccuracy": 0.10246457,
15
| "judgeRelevance": 0.14894159,
16
| "judgeToxicity": 0.6846853,
17
| "generationCount": 5
18
| }
```
Retrieve usage metrics for an AI Config by config key.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
configKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Query Parameters
fromintegerRequired
The starting time, as milliseconds since epoch (inclusive).
tointegerRequired
The ending time, as milliseconds since epoch (exclusive). May not be more than 100 days after `from`.
envstringRequired
An environment key. Only metrics from this environment will be included.
### Response
Metrics computed
inputTokensinteger or null
outputTokensinteger or null
totalTokensinteger or null
generationSuccessCountinteger or null
Number of successful generations
generationErrorCountinteger or null
Number of generations with errors
thumbsUpinteger or null
thumbsDowninteger or null
durationMsinteger or null
timeToFirstTokenMsinteger or null
satisfactionRatingdouble or null
A value between 0 and 1 representing satisfaction rating
inputCostdouble or null
Cost of input tokens in USD
outputCostdouble or null
Cost of output tokens in USD
judgeAccuracydouble or null
Average accuracy judge score (0.0-1.0)
judgeRelevancedouble or null
Average relevance judge score (0.0-1.0)
judgeToxicitydouble or null
Average toxicity judge score (0.0-1.0)
generationCountinteger or nullDeprecated
Number of attempted generations
### Errors
400
Bad Request Error
403
Forbidden Error
404
Not Found Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs