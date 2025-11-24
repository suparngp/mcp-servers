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
/api/v2/projects/:projectKey/environments/:environmentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey"
4
| 
5
| payload = [
6
| {
7
| "op": "replace",
8
| "path": "/requireComments",
9
| "value": None
10
| }
11
| ]
12
| headers = {
13
| "Authorization": "<apiKey>",
14
| "Content-Type": "application/json"
15
| }
16
| 
17
| response = requests.patch(url, json=payload, headers=headers)
18
| 
19
| print(response.json())
```
[](/docs/api/environments/patch-environment?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_links": {
3
| "self": {
4
| "href": "/api/v2/projects/my-project/environments/my-environment",
5
| "type": "application/json"
6
| }
7
| },
8
| "_id": "57be1db38b75bf0772d11384",
9
| "key": "environment-key-123abc",
10
| "name": "My Environment",
11
| "apiKey": "sdk-xxx",
12
| "mobileKey": "mob-xxx",
13
| "color": "F5A623",
14
| "defaultTtl": 5,
15
| "secureMode": true,
16
| "defaultTrackEvents": false,
17
| "requireComments": true,
18
| "confirmChanges": true,
19
| "tags": [
20
| "ops"
21
| ],
22
| "critical": true,
23
| "_access": {
24
| "denied": [
25
| {
26
| "action": "string",
27
| "reason": {
28
| "effect": "allow",
29
| "resources": [
30
| "proj/*:env/*;qa_*:/flag/*"
31
| ],
32
| "notResources": [
33
| "string"
34
| ],
35
| "actions": [
36
| "*"
37
| ],
38
| "notActions": [
39
| "string"
40
| ],
41
| "role_name": "string"
42
| }
43
| }
44
| ],
45
| "allowed": [
46
| {
47
| "action": "string",
48
| "reason": {
49
| "effect": "allow",
50
| "resources": [
51
| "proj/*:env/*;qa_*:/flag/*"
52
| ],
53
| "notResources": [
54
| "string"
55
| ],
56
| "actions": [
57
| "*"
58
| ],
59
| "notActions": [
60
| "string"
61
| ],
62
| "role_name": "string"
63
| }
64
| }
65
| ]
66
| },
67
| "approvalSettings": {
68
| "required": true,
69
| "bypassApprovalsForPendingChanges": false,
70
| "minNumApprovals": 1,
71
| "canReviewOwnRequest": false,
72
| "canApplyDeclinedChanges": true,
73
| "serviceKind": "launchdarkly",
74
| "serviceConfig": {},
75
| "requiredApprovalTags": [
76
| "require-approval"
77
| ],
78
| "autoApplyApprovedChanges": true,
79
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
80
| "resourceKind": "string"
81
| },
82
| "resourceApprovalSettings": {}
83
| }
```
Update an environment. Updating an environment uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates). To update fields in the environment object that are arrays, set the `path` to the name of the field and then append `/<array index>`. Using `/0` appends to the beginning of the array. ### Approval settings This request only returns the `approvalSettings` key if the [approvals](https://launchdarkly.com/docs/home/releases/approvals/) feature is enabled. Only the `canReviewOwnRequest`, `canApplyDeclinedChanges`, `minNumApprovals`, `required` and `requiredApprovalTagsfields` are editable. If you try to patch the environment by setting both `required` and `requiredApprovalTags`, the request fails and an error appears. You can specify either required approvals for all flags in an environment or those with specific tags, but not both. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Environment response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The ID for the environment. Use this as the client-side ID for authorization in some client-side SDKs, and to associate LaunchDarkly environments with CDN integrations in edge SDKs.
keystring
A project-unique key for the new environment
namestring
A human-friendly name for the new environment
apiKeystring
The SDK key for the environment. Use this for authorization in server-side SDKs.
mobileKeystring
The mobile key for the environment. Use this for authorization in mobile SDKs.
colorstring
The color used to indicate this environment in the UI
defaultTtlinteger
The default time (in minutes) that the PHP SDK can cache feature flag rules locally
secureModeboolean
Ensures that one end user of the client-side SDK cannot inspect the variations for another end user
defaultTrackEventsboolean
Enables tracking detailed information for new flags by default
requireCommentsboolean
Whether members who modify flags and segments through the LaunchDarkly user interface are required to add a comment
confirmChangesboolean
Whether members who modify flags and segments through the LaunchDarkly user interface are required to confirm those changes
tagslist of strings
A list of tags for this environment
criticalboolean
Whether the environment is critical
_accessobject or null
Show 2 properties
approvalSettingsobject or null
Details on the approval settings for this environment
Show 11 properties
resourceApprovalSettingsmap from strings to objects or null
Details on the approval settings for this environment for each resource kind
Show 11 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
404
Not Found Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update an environment. Updating an environment uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
To update fields in the environment object that are arrays, set the `path` to the name of the field and then append `/<array index>`. Using `/0` appends to the beginning of the array.
### Approval settings
This request only returns the `approvalSettings` key if the [approvals](https://launchdarkly.com/docs/home/releases/approvals/) feature is enabled.
Only the `canReviewOwnRequest`, `canApplyDeclinedChanges`, `minNumApprovals`, `required` and `requiredApprovalTagsfields` are editable.
If you try to patch the environment by setting both `required` and `requiredApprovalTags`, the request fails and an error appears. You can specify either required approvals for all flags in an environment or those with specific tags, but not both.