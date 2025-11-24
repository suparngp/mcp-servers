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
/api/v2/projects/:projectKey/flags/:featureFlagKey/environments/:environmentKey/scheduled-changes
cURL
```
1
| curl -X POST https://app.launchdarkly.com/api/v2/projects/projectKey/flags/featureFlagKey/environments/environmentKey/scheduled-changes \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '{
5
| "executionDate": 1718467200000,
6
| "instructions": [
7
| {
8
| "kind": "turnFlagOn"
9
| }
10
| ],
11
| "comment": "Optional comment describing the scheduled changes"
12
| }'
```
[](/docs/api/scheduled-changes/post-flag-config-scheduled-changes?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_id": "string",
3
| "_creationDate": 1,
4
| "_maintainerId": "12ab3c45de678910abc12345",
5
| "_version": 1,
6
| "executionDate": 1,
7
| "instructions": [
8
| {}
9
| ],
10
| "conflicts": null,
11
| "_links": {}
12
| }
```
Create scheduled changes for a feature flag. The changes you schedule may include any semantic patch instructions available when [updating a feature flag](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag#using-semantic-patches-on-a-feature-flag). If the `ignoreConficts` query parameter is false and there are conflicts between these instructions and existing scheduled changes, the request will fail. If the parameter is true and there are conflicts, the request will succeed.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
featureFlagKeystringRequired`format: "string"`
The feature flag key
environmentKeystringRequired`format: "string"`
The environment key
### Query Parameters
ignoreConflictsbooleanOptional
Whether to succeed (`true`) or fail (`false`) when these instructions conflict with existing scheduled changes
### Request
This endpoint expects an object.
executionDatelongRequired
When the scheduled changes should be executed
instructionslist of maps from strings to anyRequired
The actions to perform on the execution date for these scheduled changes. This should be an array with a single object that looks like <code>{“kind”: “scheduled_action”}</code>. Supported scheduled actions include any semantic patch instructions available when updating a feature flag.
commentstringOptional
Optional comment describing the scheduled changes
### Response
Scheduled changes response
_idstring
The ID of this scheduled change
_creationDatelong
Timestamp of when the scheduled change was created
_maintainerIdstring
The ID of the scheduled change maintainer
_versioninteger
Version of the scheduled change
executionDatelong
When the scheduled changes should be executed
instructionslist of maps from strings to any
The actions to perform on the execution date for these scheduled changes
conflictsany or null
Details on any conflicting scheduled changes
_linksmap from strings to objects or null
The location and content type of related resources
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
405
Method Not Allowed Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Create scheduled changes for a feature flag. The changes you schedule may include any semantic patch instructions available when [updating a feature flag](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag#using-semantic-patches-on-a-feature-flag). If the `ignoreConficts` query parameter is false and there are conflicts between these instructions and existing scheduled changes, the request will fail. If the parameter is true and there are conflicts, the request will succeed.