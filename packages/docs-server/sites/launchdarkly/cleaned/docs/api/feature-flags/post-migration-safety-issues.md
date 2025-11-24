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
/api/v2/projects/:projectKey/flags/:flagKey/environments/:environmentKey/migration-safety-issues
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/flags/flagKey/environments/environmentKey/migration-safety-issues"
4
| 
5
| payload = { "instructions": [{}] }
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
[](/docs/api/feature-flags/post-migration-safety-issues?explorer=true)
200Successful
```
1
| [
---|--- 
2
| {
3
| "causingRuleId": "string",
4
| "affectedRuleIds": [
5
| "string"
6
| ],
7
| "issue": "string",
8
| "oldSystemAffected": true
9
| }
10
| ]
```
Returns the migration safety issues that are associated with the POSTed flag patch. The patch must use the semantic patch format for updating feature flags.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
flagKeystringRequired`format: "string"`
The migration flag key
environmentKeystringRequired`format: "string"`
The environment key
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
Semantic patch instructions. The same ones that are valid for flags are valid here.
commentstringOptional
### Response
200
Migration safety issues found
causingRuleIdstring or null
The ID of the rule which caused this issue
affectedRuleIdslist of strings or null
A list of the IDs of the rules which are affected by this issue. `fallthrough` is a sentinel value for the default rule.
issuestring or null
A description of the issue that `causingRuleId` has caused for `affectedRuleIds`.
oldSystemAffectedboolean or null
Whether the changes caused by `causingRuleId` bring inconsistency to the old system
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
503
Service Unavailable Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs