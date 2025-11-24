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
/api/v2/projects/:projectKey/flags/:featureFlagKey/environments/:environmentKey/workflows
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/flags/featureFlagKey/environments/environmentKey/workflows"
4
| 
5
| payload = {
6
| "name": "Progressive rollout starting in two days",
7
| "description": "Turn flag on for 10% of customers each day",
8
| "stages": [
9
| {
10
| "name": "10% rollout on day 1",
11
| "conditions": [
12
| {
13
| "scheduleKind": "relative",
14
| "waitDuration": 2,
15
| "waitDurationUnit": "calendarDay",
16
| "kind": "schedule"
17
| }
18
| ],
19
| "action": { "instructions": None }
20
| }
21
| ]
22
| }
23
| headers = {
24
| "Authorization": "<apiKey>",
25
| "Content-Type": "application/json"
26
| }
27
| 
28
| response = requests.post(url, json=payload, headers=headers)
29
| 
30
| print(response.json())
```
[](/docs/api/workflows/post-workflow?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_id": "12ab3c4d5ef1a2345bcde67f",
3
| "_version": 1,
4
| "_conflicts": [
5
| {
6
| "stageId": "12ab3c4d5ef1a2345bcde67f",
7
| "message": "string"
8
| }
9
| ],
10
| "_creationDate": 1,
11
| "_maintainerId": "12ab3c45de678910abc12345",
12
| "_links": {},
13
| "name": "Progressive rollout starting in two days",
14
| "_execution": {
15
| "status": "completed",
16
| "stopDate": 1
17
| },
18
| "description": "Turn flag on for 10% of customers each day",
19
| "kind": "custom",
20
| "stages": [
21
| {
22
| "_id": "12ab3c45de678910abc12345",
23
| "conditions": [
24
| {
25
| "_id": "string",
26
| "_execution": {
27
| "status": "completed"
28
| },
29
| "description": "string",
30
| "notifyMemberIds": [
31
| "string"
32
| ],
33
| "allReviews": [
34
| {
35
| "_id": "string",
36
| "kind": "string",
37
| "creationDate": 1,
38
| "comment": "string",
39
| "memberId": "string",
40
| "serviceTokenId": "string"
41
| }
42
| ],
43
| "reviewStatus": "string",
44
| "kind": "schedule",
45
| "scheduleKind": "relative",
46
| "waitDuration": 2,
47
| "waitDurationUnit": "calendarDay",
48
| "id": "12ab3c45de678910abc12345"
49
| }
50
| ],
51
| "action": {
52
| "kind": "patch",
53
| "instructions": [
54
| {}
55
| ]
56
| },
57
| "_execution": {
58
| "status": "completed",
59
| "stopDate": 1
60
| },
61
| "name": "10% rollout on day 1"
62
| }
63
| ],
64
| "meta": {
65
| "parameters": [
66
| {
67
| "_id": "string",
68
| "path": "string",
69
| "default": {
70
| "value": null,
71
| "booleanVariationValue": true,
72
| "ruleClause": {
73
| "attribute": "string",
74
| "op": "in",
75
| "negate": true
76
| }
77
| },
78
| "valid": true
79
| }
80
| ]
81
| },
82
| "templateKey": "example-workflow-template"
83
| }
```
> ### Workflows are in maintenance mode > > The workflows feature is in maintenance mode, and is planned for future deprecation at a date not yet specified. We will work with existing customers using workflows to migrate to a replacement solution when deprecation occurs. Create a workflow for a feature flag. You can create a workflow directly, or you can apply a template to create a new workflow. ### Creating a workflow You can use the create workflow endpoint to create a workflow directly by adding a `stages` array to the request body. For each stage, define the `name`, `conditions` when the stage should be executed, and `action` that describes the stage. For approval stages, only standard LaunchDarkly approvals are permitted. Workflows of `kind` `integration-approval` cannot be used for custom workflows. <details> <summary>Click to expand example</summary> _Example request body_ ```json { "name": "Progressive rollout starting in two days", "description": "Turn flag targeting on and increase feature rollout in 10% increments each day", "stages": [ { "name": "10% rollout on day 1", "conditions": [ { "kind": "schedule", "scheduleKind": "relative", // or "absolute" // If "scheduleKind" is "absolute", set "executionDate"; // "waitDuration" and "waitDurationUnit" will be ignored "waitDuration": 2, "waitDurationUnit": "calendarDay" }, { "kind": "ld-approval", "notifyMemberIds": [ "507f1f77bcf86cd799439011" ], "notifyTeamKeys": [ "team-key-123abc" ] } ], "action": { "instructions": [ { "kind": "turnFlagOn" }, { "kind": "updateFallthroughVariationOrRollout", "rolloutWeights": { "452f5fb5-7320-4ba3-81a1-8f4324f79d49": 90000, "fc15f6a4-05d3-4aa4-a997-446be461345d": 10000 } } ] } } ] } ``` </details> ### Creating a workflow by applying a workflow template You can also create a workflow by applying a workflow template. If you pass a valid workflow template key as the `templateKey` query parameter with the request, the API will attempt to create a new workflow with the stages defined in the workflow template with the corresponding key. #### Applicability of stages Templates are created in the context of a particular flag in a particular environment in a particular project. However, because workflows created from a template can be applied to any project, environment, and flag, some steps of the workflow may need to be updated in order to be applicable for the target resource. You can pass a `dryRun` query parameter to tell the API to return a report of which steps of the workflow template are applicable in the target project/environment/flag, and which will need to be updated. When the `dryRun` query parameter is present the response body includes a `meta` property that holds a list of parameters that could potentially be inapplicable for the target resource. Each of these parameters will include a `valid` field. You will need to update any invalid parameters in order to create the new workflow. You can do this using the `parameters` property, which overrides the workflow template parameters. #### Overriding template parameters You can use the `parameters` property in the request body to tell the API to override the specified workflow template parameters with new values that are specific to your target project/environment/flag. <details> <summary>Click to expand example</summary> _Example request body_ ```json { "name": "workflow created from my-template", "description": "description of my workflow", "parameters": [ { "_id": "62cf2bc4cadbeb7697943f3b", "path": "/clauses/0/values", "default": { "value": ["updated-segment"] } }, { "_id": "62cf2bc4cadbeb7697943f3d", "path": "/variationId", "default": { "value": "abcd1234-abcd-1234-abcd-1234abcd12" } } ] } ``` </details> If there are any steps in the template that are not applicable to the target resource, the workflow will not be created, and the `meta` property will be included in the response body detailing which parameters need to be updated. 
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
templateKeystringOptional`format: "string"`
The template key to apply as a starting point for the new workflow
dryRunbooleanOptional
Whether to call the endpoint in dry-run mode
### Request
This endpoint expects an object.
namestringRequired
The workflow name
maintainerIdstringOptional
The ID of the workflow maintainer. Defaults to the workflow creator.
descriptionstringOptional
The workflow description
stageslist of objectsOptional
A list of the workflow stages
Show 4 properties
templateKeystringOptional
The template key
### Response
Workflow response
_idstring
The ID of the workflow
_versioninteger
The version of the workflow
_conflictslist of objects
Any conflicts that are present in the workflow stages
Show 2 properties
_creationDatelong
Timestamp of when the workflow was created
_maintainerIdstring
The member ID of the maintainer of the workflow. Defaults to the workflow creator.
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
namestring
The name of the workflow
_executionobject
The current execution status of the workflow
Show 2 properties
descriptionstring or null
A brief description of the workflow
kindstring or null
The kind of workflow
stageslist of objects or null
The stages that make up the workflow. Each stage contains conditions and actions.
Show 5 properties
metaobject or null
For workflows being created from a workflow template, this value holds any parameters that could potentially be incompatible with the current project, environment, or flag
Show 1 properties
templateKeystring or null
For workflows being created from a workflow template, this value is the template's key
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
> ### Workflows are in maintenance mode
> The workflows feature is in maintenance mode, and is planned for future deprecation at a date not yet specified. We will work with existing customers using workflows to migrate to a replacement solution when deprecation occurs.
Create a workflow for a feature flag. You can create a workflow directly, or you can apply a template to create a new workflow.
### Creating a workflow
You can use the create workflow endpoint to create a workflow directly by adding a `stages` array to the request body.
For each stage, define the `name`, `conditions` when the stage should be executed, and `action` that describes the stage. For approval stages, only standard LaunchDarkly approvals are permitted. Workflows of `kind` `integration-approval` cannot be used for custom workflows.
Click to expand example
 _Example request body_
```
1
| {
---|--- 
2
| "name": "Progressive rollout starting in two days",
3
| "description": "Turn flag targeting on and increase feature rollout in 10% increments each day",
4
| "stages": [
5
| {
6
| "name": "10% rollout on day 1",
7
| "conditions": [
8
| {
9
| "kind": "schedule",
10
| "scheduleKind": "relative", // or "absolute"
11
| // If "scheduleKind" is "absolute", set "executionDate";
12
| // "waitDuration" and "waitDurationUnit" will be ignored
13
| "waitDuration": 2,
14
| "waitDurationUnit": "calendarDay"
15
| },
16
| {
17
| "kind": "ld-approval",
18
| "notifyMemberIds": [ "507f1f77bcf86cd799439011" ],
19
| "notifyTeamKeys": [ "team-key-123abc" ]
20
| }
21
| ],
22
| "action": {
23
| "instructions": [
24
| {
25
| "kind": "turnFlagOn"
26
| },
27
| {
28
| "kind": "updateFallthroughVariationOrRollout",
29
| "rolloutWeights": {
30
| "452f5fb5-7320-4ba3-81a1-8f4324f79d49": 90000,
31
| "fc15f6a4-05d3-4aa4-a997-446be461345d": 10000
32
| }
33
| }
34
| ]
35
| }
36
| }
37
| ]
38
| }
```
### Creating a workflow by applying a workflow template
You can also create a workflow by applying a workflow template. If you pass a valid workflow template key as the `templateKey` query parameter with the request, the API will attempt to create a new workflow with the stages defined in the workflow template with the corresponding key.
#### Applicability of stages
Templates are created in the context of a particular flag in a particular environment in a particular project. However, because workflows created from a template can be applied to any project, environment, and flag, some steps of the workflow may need to be updated in order to be applicable for the target resource.
You can pass a `dryRun` query parameter to tell the API to return a report of which steps of the workflow template are applicable in the target project/environment/flag, and which will need to be updated. When the `dryRun` query parameter is present the response body includes a `meta` property that holds a list of parameters that could potentially be inapplicable for the target resource. Each of these parameters will include a `valid` field. You will need to update any invalid parameters in order to create the new workflow. You can do this using the `parameters` property, which overrides the workflow template parameters.
#### Overriding template parameters
You can use the `parameters` property in the request body to tell the API to override the specified workflow template parameters with new values that are specific to your target project/environment/flag.
Click to expand example
 _Example request body_
```
1
| {
---|--- 
2
| "name": "workflow created from my-template",
3
| "description": "description of my workflow",
4
| "parameters": [
5
| {
6
| "_id": "62cf2bc4cadbeb7697943f3b",
7
| "path": "/clauses/0/values",
8
| "default": {
9
| "value": ["updated-segment"]
10
| }
11
| },
12
| {
13
| "_id": "62cf2bc4cadbeb7697943f3d",
14
| "path": "/variationId",
15
| "default": {
16
| "value": "abcd1234-abcd-1234-abcd-1234abcd12"
17
| }
18
| }
19
| ]
20
| }
```
If there are any steps in the template that are not applicable to the target resource, the workflow will not be created, and the `meta` property will be included in the response body detailing which parameters need to be updated.