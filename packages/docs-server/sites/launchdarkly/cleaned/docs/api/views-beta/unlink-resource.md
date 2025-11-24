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
DELETE
/api/v2/projects/:projectKey/views/:viewKey/link/:resourceType
cURL
```
1
| curl -X DELETE https://app.launchdarkly.com/api/v2/projects/default/views/my-view/link/flags \
---|--- 
2
| -H "LD-API-Version: beta" \
3
| -H "Authorization: <apiKey>" \
4
| -H "Content-Type: application/json" \
5
| -d '{
6
| "keys": [
7
| "keys",
8
| "keys"
9
| ],
10
| "comment": ""
11
| }'
```
[](/docs/api/views-beta/unlink-resource?explorer=true)
200Deleted
```
1
| {
---|--- 
2
| "successCount": 0,
3
| "failureCount": 6,
4
| "failedResources": [
5
| {
6
| "resourceKey": "resourceKey",
7
| "resourceType": "flag",
8
| "errorMessage": "errorMessage",
9
| "environmentId": "environmentId"
10
| },
11
| {
12
| "resourceKey": "resourceKey",
13
| "resourceType": "flag",
14
| "errorMessage": "errorMessage",
15
| "environmentId": "environmentId"
16
| }
17
| ]
18
| }
```
Unlink one or multiple resources from a view: - Unlink flags using flag keys - Unlink segments using segment IDs - Unlink AI configs using AI config keys - Unlink metrics using metric keys 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
viewKeystringRequired
resourceTypeenumRequired
Allowed values:flagssegmentsaiConfigsmetrics
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
The resource to link to the view. Flags are identified by key. Segments are identified by segment ID.
ViewLinkRequestKeysobjectRequired
Show 2 properties
OR
ViewLinkRequestSegmentIdentifiersobjectRequired
Show 2 properties
### Response
Successful response with unlink details
successCountinteger
The number of resources successfully unlinked.
failureCountinteger
The number of resources that failed to unlink.
failedResourceslist of objects or null
Details of resources that failed to unlink.
Show 4 properties
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
Unlink one or multiple resources from a view:
 * Unlink flags using flag keys
 * Unlink segments using segment IDs
 * Unlink AI configs using AI config keys
 * Unlink metrics using metric keys