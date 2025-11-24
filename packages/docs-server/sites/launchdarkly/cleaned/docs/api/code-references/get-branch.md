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
/api/v2/code-refs/repositories/:repo/branches/:branch
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/code-refs/repositories/repo/branches/branch \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/code-references/get-branch?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "name": "main",
3
| "head": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
4
| "syncTime": 1,
5
| "_links": {},
6
| "updateSequenceId": 25,
7
| "references": [
8
| {
9
| "path": "/main/index.js",
10
| "hunks": [
11
| {
12
| "startingLineNumber": 45,
13
| "lines": "var enableFeature = 'enable-feature';",
14
| "projKey": "default",
15
| "flagKey": "enable-feature",
16
| "aliases": [
17
| "enableFeature",
18
| "EnableFeature"
19
| ]
20
| }
21
| ],
22
| "hint": "javascript"
23
| }
24
| ]
25
| }
```
Get a specific branch in a repository.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
repostringRequired`format: "string"`
The repository name
branchstringRequired`format: "string"`
The url-encoded branch name
### Query Parameters
projKeystringOptional`format: "string"`
Filter results to a specific project
flagKeystringOptional`format: "string"`
Filter results to a specific flag key
### Response
Branch response
namestring
The branch name
headstring
An ID representing the branch HEAD. For example, a commit SHA.
syncTimelong
A timestamp indicating when the branch was last synced
_linksmap from strings to any
The location and content type of related resources
updateSequenceIdlong or null
An optional ID used to prevent older data from overwriting newer data
referenceslist of objects or null
An array of flag references found on the branch
Show 3 properties
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