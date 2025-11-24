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
/api/v2/approval-requests
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/approval-requests"
4
| 
5
| payload = {
6
| "resourceId": "proj/projKey:env/envKey:flag/flagKey",
7
| "description": "Requesting to update targeting",
8
| "instructions": [{}]
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
[](/docs/api/approvals/post-approval-request?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_id": "12ab3c45de678910abc12345",
3
| "_version": 1,
4
| "creationDate": 1,
5
| "serviceKind": "string",
6
| "reviewStatus": "pending",
7
| "allReviews": [
8
| {
9
| "_id": "12ab3c45de678910abc12345",
10
| "kind": "approve",
11
| "creationDate": 1,
12
| "comment": "Approved!",
13
| "memberId": "12ab3c45de678910abc12345",
14
| "serviceTokenId": "12ab3c45de678910abc12345"
15
| }
16
| ],
17
| "notifyMemberIds": [
18
| "1234a56b7c89d012345e678f"
19
| ],
20
| "status": "pending",
21
| "instructions": [
22
| {}
23
| ],
24
| "conflicts": [
25
| {
26
| "instruction": {},
27
| "reason": "string"
28
| }
29
| ],
30
| "_links": {},
31
| "requestorId": "12ab3c45de678910abc12345",
32
| "description": "example: request approval from someone",
33
| "appliedDate": 1,
34
| "appliedByMemberId": "1234a56b7c89d012345e678f",
35
| "appliedByServiceTokenId": "1234a56b7c89d012345e678f",
36
| "executionDate": 1,
37
| "operatingOnId": "12ab3c45de678910abc12345",
38
| "integrationMetadata": {
39
| "externalId": "string",
40
| "externalStatus": {
41
| "display": "string",
42
| "value": "string"
43
| },
44
| "externalUrl": "string",
45
| "lastChecked": 1
46
| },
47
| "source": {
48
| "key": "source-flag-key-123abc",
49
| "version": 1
50
| },
51
| "customWorkflowMetadata": {
52
| "name": "Example workflow name",
53
| "stage": {
54
| "index": 0,
55
| "name": "Stage 1"
56
| }
57
| },
58
| "resourceId": "string",
59
| "approvalSettings": {
60
| "required": true,
61
| "bypassApprovalsForPendingChanges": false,
62
| "minNumApprovals": 1,
63
| "canReviewOwnRequest": false,
64
| "canApplyDeclinedChanges": true,
65
| "serviceKind": "launchdarkly",
66
| "serviceConfig": {},
67
| "requiredApprovalTags": [
68
| "require-approval"
69
| ],
70
| "autoApplyApprovedChanges": true,
71
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
72
| "resourceKind": "string"
73
| }
74
| }
```
Create an approval request. This endpoint requires a list of `instructions`, in semantic patch format, that will be applied when the approval request is approved and applied. ### Flags If you are creating an approval request for a flag, you can use the following `instructions`: - `addVariation` - `removeVariation` - `updateVariation` - `updateDefaultVariation` For details on using these instructions, read [Update feature flag](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag). To create an approval for a flag specific to an environment, use [Create approval request for a flag](https://launchdarkly.com/docs/api/approvals/post-approval-request-for-flag). ### AI Configs If you are creating an approval request for an AI Config, you can use the semantic patch instructions listed under [Update AI Config targeting](https://launchdarkly.com/docs/api/ai-configs-beta/patch-ai-config-targeting). ### Segments If you are creating an approval request for a segment, you can use the semantic patch instructions listed under [Patch segment](https://launchdarkly.com/docs/api/segments/patch-segment). 
### Authentication
Authorizationstring
API Key authentication via header
### Request
This endpoint expects an object.
resourceIdstringRequired
String representation of the resource specifier
descriptionstringRequired
A brief description of the changes you're requesting
instructionslist of maps from strings to anyRequired
List of instructions in semantic patch format to be applied to the feature flag. Review the [Update feature flag](https://launchdarkly.com/docs/ld-docs/api/feature-flags/patch-feature-flag) documentation for details on available instructions.
commentstringOptional
Optional comment describing the approval request
notifyMemberIdslist of stringsOptional
An array of member IDs. These members are notified to review the approval request.
notifyTeamKeyslist of stringsOptional
An array of team keys. The members of these teams are notified to review the approval request.
integrationConfigmap from strings to anyOptional
Additional approval request fields for third-party integration approval systems. If you are using a third-party integration to manage approval requests, these additional fields will be described in the <code>manifest.json</code> for that integration, at https://github.com/launchdarkly/integration-framework.
### Response
Approval request response
_idstring
The ID of this approval request
_versioninteger
Version of the approval request
creationDatelong
Timestamp of when the approval request was created
serviceKindstring
The approval service for this request. May be LaunchDarkly or an external approval service, such as ServiceNow or JIRA.
reviewStatusenum
Current status of the review of this approval request
Allowed values:approveddeclinedpending
allReviewslist of objects
An array of individual reviews of this approval request
Show 6 properties
notifyMemberIdslist of strings
An array of member IDs. These members are notified to review the approval request.
statusenum
Current status of the approval request
Allowed values:pendingcompletedfailedscheduled
instructionslist of maps from strings to any
List of instructions in semantic patch format to be applied to the feature flag
conflictslist of objects
Details on any conflicting approval requests
Show 2 properties
_linksmap from strings to any
The location and content type of related resources
requestorIdstring or null
The ID of the member who requested the approval
descriptionstring or null
A human-friendly name for the approval request
appliedDatelong or null
Timestamp of when the approval request was applied
appliedByMemberIdstring or null
The member ID of the member who applied the approval request
appliedByServiceTokenIdstring or null
The service token ID of the service token which applied the approval request
executionDatelong or null
Timestamp for when instructions will be executed
operatingOnIdstring or null
ID of scheduled change to edit or delete
integrationMetadataobject or null
Details about the object in an external service corresponding to this approval request, such as a ServiceNow change request or a JIRA ticket, if an external approval service is being used
Show 4 properties
sourceobject or null
Details about the source feature flag, if copied
Show 2 properties
customWorkflowMetadataobject or null
Details about the custom workflow, if this approval request is part of a custom workflow
Show 2 properties
resourceIdstring or null
String representation of a resource
approvalSettingsobject or null
The settings for this approval
Show 11 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Create an approval request.
This endpoint requires a list of `instructions`, in semantic patch format, that will be applied when the approval request is approved and applied.
### Flags
If you are creating an approval request for a flag, you can use the following `instructions`:
 * `addVariation`
 * `removeVariation`
 * `updateVariation`
 * `updateDefaultVariation`
For details on using these instructions, read [Update feature flag](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag).
To create an approval for a flag specific to an environment, use [Create approval request for a flag](https://launchdarkly.com/docs/api/approvals/post-approval-request-for-flag).
### AI Configs
If you are creating an approval request for an AI Config, you can use the semantic patch instructions listed under [Update AI Config targeting](https://launchdarkly.com/docs/api/ai-configs-beta/patch-ai-config-targeting).
### Segments
If you are creating an approval request for a segment, you can use the semantic patch instructions listed under [Patch segment](https://launchdarkly.com/docs/api/segments/patch-segment).
Additional approval request fields for third-party integration approval systems. If you are using a third-party integration to manage approval requests, these additional fields will be described in the `manifest.json` for that integration, at <https://github.com/launchdarkly/integration-framework>.