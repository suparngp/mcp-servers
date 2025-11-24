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
/api/v2/projects/:projectKey/release-pipelines/:pipelineKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/release-pipelines/pipelineKey"
4
| 
5
| headers = {"Authorization": "<apiKey>"}
6
| 
7
| response = requests.get(url, headers=headers)
8
| 
9
| print(response.json())
```
[](/docs/api/release-pipelines-beta/get-release-pipeline-by-key?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "createdAt": "1684262711507",
3
| "key": "standard-pipeline",
4
| "name": "Standard Pipeline",
5
| "phases": [
6
| {
7
| "id": "1234a56b7c89d012345e678f",
8
| "audiences": [
9
| {
10
| "name": "Phase 1 - Testing",
11
| "environment": {
12
| "_links": {
13
| "self": {
14
| "href": "/api/v2/projects/my-project/environments/my-environment",
15
| "type": "application/json"
16
| }
17
| },
18
| "key": "environment-key-123abc",
19
| "name": "My Environment",
20
| "color": "F5A623"
21
| },
22
| "configuration": {
23
| "releaseStrategy": "string",
24
| "requireApproval": true,
25
| "notifyMemberIds": [
26
| "1234a56b7c89d012345e678f"
27
| ],
28
| "notifyTeamKeys": [
29
| "example-reviewer-team"
30
| ],
31
| "releaseGuardianConfiguration": {
32
| "monitoringWindowMilliseconds": 60000,
33
| "rolloutWeight": 50,
34
| "rollbackOnRegression": true,
35
| "randomizationUnit": "user"
36
| }
37
| },
38
| "segmentKeys": [
39
| "segment-key-123abc"
40
| ]
41
| }
42
| ],
43
| "name": "Phase 1 - Testing",
44
| "configuration": {}
45
| }
46
| ],
47
| "description": "Standard pipeline to roll out to production",
48
| "tags": [
49
| "example-tag"
50
| ],
51
| "_version": 1,
52
| "_access": {
53
| "denied": [
54
| {
55
| "action": "string",
56
| "reason": {
57
| "effect": "allow",
58
| "resources": [
59
| "proj/*:env/*;qa_*:/flag/*"
60
| ],
61
| "notResources": [
62
| "string"
63
| ],
64
| "actions": [
65
| "*"
66
| ],
67
| "notActions": [
68
| "string"
69
| ],
70
| "role_name": "string"
71
| }
72
| }
73
| ],
74
| "allowed": [
75
| {
76
| "action": "string",
77
| "reason": {
78
| "effect": "allow",
79
| "resources": [
80
| "proj/*:env/*;qa_*:/flag/*"
81
| ],
82
| "notResources": [
83
| "string"
84
| ],
85
| "actions": [
86
| "*"
87
| ],
88
| "notActions": [
89
| "string"
90
| ],
91
| "role_name": "string"
92
| }
93
| }
94
| ]
95
| },
96
| "isProjectDefault": true,
97
| "_isLegacy": true
98
| }
```
Get a release pipeline by key
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
pipelineKeystringRequired`format: "string"`
The release pipeline key
### Response
Release pipeline response
createdAtdatetime
Timestamp of when the release pipeline was created
keystring
The release pipeline key
namestring
The release pipeline name
phaseslist of objects
An ordered list of the release pipeline phases. Each phase is a logical grouping of one or more environments that share attributes for rolling out changes.
Show 4 properties
descriptionstring or null
The release pipeline description
tagslist of strings or null
A list of the release pipeline's tags
_versioninteger or null
The release pipeline version
_accessobject or null
Details on the allowed and denied actions for this release pipeline
Show 2 properties
isProjectDefaultboolean or null
Whether this release pipeline is the default pipeline for the project
_isLegacyboolean or null
Whether this release pipeline is a legacy pipeline
### Errors
404
Not Found Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs