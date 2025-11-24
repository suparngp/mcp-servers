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
/api/v2/flags/:projectKey/:flagKey/release
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/flags/projectKey/flagKey/release \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '[
5
| {
6
| "op": "replace",
7
| "path": "/phases/0/complete",
8
| "value": null
9
| }
10
| ]'
```
[](/docs/api/releases-beta/patch-release-by-flag-key?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "name": "Example release pipeline",
3
| "releasePipelineKey": "example-release-pipeline",
4
| "releasePipelineDescription": "Our release pipeline for typical testing and deployment",
5
| "phases": [
6
| {
7
| "_id": "1234a56b7c89d012345e678f",
8
| "_name": "Phase 1 - Testing",
9
| "complete": true,
10
| "_creationDate": 1,
11
| "_audiences": [
12
| {
13
| "_id": "1234a56b7c89d012345e678g",
14
| "name": "Phase 1 - Testing",
15
| "_links": {},
16
| "environment": {
17
| "_links": {
18
| "self": {
19
| "href": "/api/v2/projects/my-project/environments/my-environment",
20
| "type": "application/json"
21
| }
22
| },
23
| "key": "environment-key-123abc",
24
| "name": "My Environment",
25
| "color": "F5A623"
26
| },
27
| "configuration": {
28
| "releaseStrategy": "string",
29
| "requireApproval": true,
30
| "notifyMemberIds": [
31
| "1234a56b7c89d012345e678f"
32
| ],
33
| "notifyTeamKeys": [
34
| "example-reviewer-team"
35
| ],
36
| "releaseGuardianConfiguration": {
37
| "monitoringWindowMilliseconds": 60000,
38
| "rolloutWeight": 50,
39
| "rollbackOnRegression": true,
40
| "randomizationUnit": "user"
41
| }
42
| },
43
| "segmentKeys": [
44
| "segment-key-123abc"
45
| ],
46
| "status": "string",
47
| "_ruleIds": [
48
| "string"
49
| ]
50
| }
51
| ],
52
| "_completionDate": 1,
53
| "_completedBy": {
54
| "member": {
55
| "_links": {
56
| "self": {
57
| "href": "/api/v2/members/569f183514f4432160000007",
58
| "type": "application/json"
59
| }
60
| },
61
| "_id": "569f183514f4432160000007",
62
| "role": "admin",
63
| "email": "ariel@acme.com",
64
| "firstName": "Ariel",
65
| "lastName": "Flores"
66
| },
67
| "token": {
68
| "_links": {},
69
| "_id": "string",
70
| "name": "DevOps token",
71
| "ending": "2345",
72
| "serviceToken": false
73
| }
74
| },
75
| "status": "string",
76
| "started": true,
77
| "_startedDate": 1,
78
| "configuration": {}
79
| }
80
| ],
81
| "_version": 1,
82
| "_links": {},
83
| "_releaseVariationId": "string",
84
| "_canceledAt": 1
85
| }
```
This endpoint is only available for releases that are part of a legacy release pipeline. Releases for new release pipelines should use the [Update phase status for release](https://launchdarkly.com/docs/api/releases-beta/update-phase-status) endpoint. Update currently active release for a flag. Updating releases requires the [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) format. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates). You can only use this endpoint to mark a release phase complete or incomplete. To indicate which phase to update, use the array index in the `path`. For example, to mark the first phase of a release as complete, use the following request body: ``` [ { "op": "replace", "path": "/phase/0/complete", "value": true } ] ``` 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
flagKeystringRequired`format: "string"`
The flag key
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Release response
namestring
The release pipeline name
releasePipelineKeystring
The release pipeline key
releasePipelineDescriptionstring
The release pipeline description
phaseslist of objects
An ordered list of the release pipeline phases
Show 11 properties
_versioninteger
The release version
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
_releaseVariationIdstring or null
The chosen release variation ID to use across all phases of a release
_canceledAtlong or null
Timestamp of when the release was canceled
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
This endpoint is only available for releases that are part of a legacy release pipeline. Releases for new release pipelines should use the [Update phase status for release](https://launchdarkly.com/docs/api/releases-beta/update-phase-status) endpoint.
Update currently active release for a flag. Updating releases requires the [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) format. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
You can only use this endpoint to mark a release phase complete or incomplete. To indicate which phase to update, use the array index in the `path`. For example, to mark the first phase of a release as complete, use the following request body:
```
 [ 
--- 
 { 
 "op": "replace", 
 "path": "/phase/0/complete", 
 "value": true 
 } 
 ] 
```