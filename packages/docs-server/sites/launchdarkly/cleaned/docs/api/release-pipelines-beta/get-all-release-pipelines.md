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
/api/v2/projects/:projectKey/release-pipelines
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/release-pipelines"
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
[](/docs/api/release-pipelines-beta/get-all-release-pipelines?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "createdAt": "1684262711507",
5
| "key": "standard-pipeline",
6
| "name": "Standard Pipeline",
7
| "phases": [
8
| {
9
| "id": "1234a56b7c89d012345e678f",
10
| "audiences": [
11
| {
12
| "name": "Phase 1 - Testing",
13
| "environment": {
14
| "_links": {
15
| "self": {
16
| "href": "/api/v2/projects/my-project/environments/my-environment",
17
| "type": "application/json"
18
| }
19
| },
20
| "key": "environment-key-123abc",
21
| "name": "My Environment",
22
| "color": "F5A623"
23
| },
24
| "configuration": {
25
| "releaseStrategy": "string",
26
| "requireApproval": true,
27
| "notifyMemberIds": [
28
| "1234a56b7c89d012345e678f"
29
| ],
30
| "notifyTeamKeys": [
31
| "example-reviewer-team"
32
| ],
33
| "releaseGuardianConfiguration": {
34
| "monitoringWindowMilliseconds": 60000,
35
| "rolloutWeight": 50,
36
| "rollbackOnRegression": true,
37
| "randomizationUnit": "user"
38
| }
39
| },
40
| "segmentKeys": [
41
| "segment-key-123abc"
42
| ]
43
| }
44
| ],
45
| "name": "Phase 1 - Testing",
46
| "configuration": {}
47
| }
48
| ],
49
| "description": "Standard pipeline to roll out to production",
50
| "tags": [
51
| "example-tag"
52
| ],
53
| "_version": 1,
54
| "_access": {
55
| "denied": [
56
| {
57
| "action": "string",
58
| "reason": {
59
| "effect": "allow",
60
| "resources": [
61
| "proj/*:env/*;qa_*:/flag/*"
62
| ],
63
| "notResources": [
64
| "string"
65
| ],
66
| "actions": [
67
| "*"
68
| ],
69
| "notActions": [
70
| "string"
71
| ],
72
| "role_name": "string"
73
| }
74
| }
75
| ],
76
| "allowed": [
77
| {
78
| "action": "string",
79
| "reason": {
80
| "effect": "allow",
81
| "resources": [
82
| "proj/*:env/*;qa_*:/flag/*"
83
| ],
84
| "notResources": [
85
| "string"
86
| ],
87
| "actions": [
88
| "*"
89
| ],
90
| "notActions": [
91
| "string"
92
| ],
93
| "role_name": "string"
94
| }
95
| }
96
| ]
97
| },
98
| "isProjectDefault": true,
99
| "_isLegacy": true
100
| }
101
| ],
102
| "totalCount": 1
103
| }
```
Get all release pipelines for a project. ### Filtering release pipelines LaunchDarkly supports the following fields for filters: - `query` is a string that matches against the release pipeline `key`, `name`, and `description`. It is not case sensitive. For example: `?filter=query:examplePipeline`. - `env` is a string that matches an environment key. For example: `?filter=env:production`. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
### Query Parameters
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form field:value. Read the endpoint description for a full list of available filter fields.
limitlongOptional
The maximum number of items to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
### Response
Release pipeline collection
itemslist of objects
An array of release pipelines
Show 10 properties
totalCountinteger
Total number of release pipelines
### Errors
404
Not Found Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Get all release pipelines for a project.
### Filtering release pipelines
LaunchDarkly supports the following fields for filters:
 * `query` is a string that matches against the release pipeline `key`, `name`, and `description`. It is not case sensitive. For example: `?filter=query:examplePipeline`.
 * `env` is a string that matches an environment key. For example: `?filter=env:production`.