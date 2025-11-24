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
/api/v2/flag-statuses/:projectKey/:environmentKey
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/flag-statuses/projectKey/environmentKey \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/feature-flags/get-feature-flag-statuses?explorer=true)
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
| "href": "/api/v2/flag-statuses/my-project/my-environment",
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
| "name": "inactive",
11
| "_links": {
12
| "parent": {
13
| "href": "/api/v2/flags/my-project/my-flag",
14
| "type": "application/json"
15
| },
16
| "self": {
17
| "href": "/api/v2/flag-statuses/my-project/my-flag",
18
| "type": "application/json"
19
| }
20
| },
21
| "lastRequested": "2020-02-05T18:17:01.514Z",
22
| "default": null
23
| }
24
| ]
25
| }
```
Get a list of statuses for all feature flags. The status includes the last time the feature flag was requested, as well as a state, which is one of the following: - `new`: You created the flag fewer than seven days ago and it has never been requested. - `active`: LaunchDarkly is receiving requests for this flag, but there are either multiple variations configured, or it is toggled off, or there have been changes to configuration in the past seven days. - `inactive`: You created the feature flag more than seven days ago, and hasn't been requested within the past seven days. - `launched`: LaunchDarkly is receiving requests for this flag, it is toggled on, there is only one variation configured, and there have been no changes to configuration in the past seven days. To learn more, read [Flag statuses](https://launchdarkly.com/docs/home/observability/flag-status). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Response
Flag Statuses collection response
_linksmap from strings to objects
Show 2 properties
itemslist of objects or null
Show 4 properties
### Errors
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
Get a list of statuses for all feature flags. The status includes the last time the feature flag was requested, as well as a state, which is one of the following:
 * `new`: You created the flag fewer than seven days ago and it has never been requested.
 * `active`: LaunchDarkly is receiving requests for this flag, but there are either multiple variations configured, or it is toggled off, or there have been changes to configuration in the past seven days.
 * `inactive`: You created the feature flag more than seven days ago, and hasn’t been requested within the past seven days.
 * `launched`: LaunchDarkly is receiving requests for this flag, it is toggled on, there is only one variation configured, and there have been no changes to configuration in the past seven days.
To learn more, read [Flag statuses](https://launchdarkly.com/docs/home/observability/flag-status).