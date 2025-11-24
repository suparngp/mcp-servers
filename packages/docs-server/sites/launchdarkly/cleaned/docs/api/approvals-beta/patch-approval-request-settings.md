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
PATCH
/api/v2/approval-requests/projects/:projectKey/settings
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/approval-requests/projects/default/settings"
4
| 
5
| payload = {
6
| "environmentKey": "environmentKey",
7
| "resourceKind": "resourceKind",
8
| "autoApplyApprovedChanges": True,
9
| "bypassApprovalsForPendingChanges": False,
10
| "canApplyDeclinedChanges": True,
11
| "canReviewOwnRequest": False,
12
| "minNumApprovals": 1,
13
| "required": True,
14
| "requiredApprovalTags": ["require-approval"],
15
| "serviceKind": "launchdarkly",
16
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258"
17
| }
18
| headers = {
19
| "LD-API-Version": "beta",
20
| "Authorization": "<apiKey>",
21
| "Content-Type": "application/json"
22
| }
23
| 
24
| response = requests.patch(url, json=payload, headers=headers)
25
| 
26
| print(response.json())
```
[](/docs/api/approvals-beta/patch-approval-request-settings?explorer=true)
200Updated
```
1
| {}
---|--- 
```
Perform a partial update to approval request settings
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
Approval request settings to update
environmentKeystringRequired
resourceKindstringRequired
autoApplyApprovedChangesboolean or nullOptional
Automatically apply changes that have been approved by all reviewers. This field is only applicable for approval services other than LaunchDarkly. 
bypassApprovalsForPendingChangesbooleanOptional
Whether to skip approvals for pending changes
canApplyDeclinedChangesbooleanOptional
Allow applying the change as long as at least one person has approved
canReviewOwnRequestbooleanOptional
Allow someone who makes an approval request to apply their own change
minNumApprovalsintegerOptional
Sets the amount of approvals required before a member can apply a change. The minimum is one and the maximum is five. 
requiredbooleanOptional
If approvals are required for this environment
requiredApprovalTagslist of stringsOptional
Require approval only on flags with the provided tags. Otherwise all flags will require approval. 
serviceConfigmap from strings to anyOptional
Arbitrary service-specific configuration
serviceKindstringOptional
Which service to use for managing approvals
serviceKindConfigurationIdstring or nullOptional
Optional integration configuration ID of a custom approval integration. This is an Enterprise-only feature.
### Response
Successful response
environmentsmap from strings to objects or null
Environment-specific overrides.
Show 10 properties
_defaultobject or null
Configuration that controls how changes to a resource are gated by approvals.
Show 10 properties
_strictobject or null
Configuration that controls how changes to a resource are gated by approvals.
Show 10 properties
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