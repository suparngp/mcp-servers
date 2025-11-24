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
/api/v2/code-refs/repositories
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/code-refs/repositories \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/code-references/get-repositories?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {},
3
| "items": [
4
| {
5
| "name": "LaunchDarkly-Docs",
6
| "type": "github",
7
| "defaultBranch": "main",
8
| "enabled": true,
9
| "version": 3,
10
| "_links": {},
11
| "sourceLink": "https://github.com/launchdarkly/LaunchDarkly-Docs",
12
| "commitUrlTemplate": "https://github.com/launchdarkly/LaunchDarkly-Docs/commit/${sha}",
13
| "hunkUrlTemplate": "https://github.com/launchdarkly/LaunchDarkly-Docs/blob/${sha}/${filePath}#L${lineNumber}",
14
| "branches": [
15
| {
16
| "name": "main",
17
| "head": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
18
| "syncTime": 1,
19
| "_links": {},
20
| "updateSequenceId": 25,
21
| "references": [
22
| {
23
| "path": "/main/index.js",
24
| "hunks": [
25
| {
26
| "startingLineNumber": 45,
27
| "lines": "var enableFeature = 'enable-feature';",
28
| "projKey": "default",
29
| "flagKey": "enable-feature",
30
| "aliases": [
31
| "enableFeature",
32
| "EnableFeature"
33
| ]
34
| }
35
| ],
36
| "hint": "javascript"
37
| }
38
| ]
39
| }
40
| ],
41
| "_access": {
42
| "denied": [
43
| {
44
| "action": "string",
45
| "reason": {
46
| "effect": "allow",
47
| "resources": [
48
| "proj/*:env/*;qa_*:/flag/*"
49
| ],
50
| "notResources": [
51
| "string"
52
| ],
53
| "actions": [
54
| "*"
55
| ],
56
| "notActions": [
57
| "string"
58
| ],
59
| "role_name": "string"
60
| }
61
| }
62
| ],
63
| "allowed": [
64
| {
65
| "action": "string",
66
| "reason": {
67
| "effect": "allow",
68
| "resources": [
69
| "proj/*:env/*;qa_*:/flag/*"
70
| ],
71
| "notResources": [
72
| "string"
73
| ],
74
| "actions": [
75
| "*"
76
| ],
77
| "notActions": [
78
| "string"
79
| ],
80
| "role_name": "string"
81
| }
82
| }
83
| ]
84
| }
85
| }
86
| ]
87
| }
```
Get a list of connected repositories. Optionally, you can include branch metadata with the `withBranches` query parameter. Embed references for the default branch with `ReferencesForDefaultBranch`. You can also filter the list of code references by project key and flag key.
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
withBranchesstringOptional`format: "string"`
If set to any value, the endpoint returns repositories with associated branch data
withReferencesForDefaultBranchstringOptional`format: "string"`
If set to any value, the endpoint returns repositories with associated branch data, as well as code references for the default git branch
projKeystringOptional`format: "string"`
A LaunchDarkly project key. If provided, this filters code reference results to the specified project.
flagKeystringOptional`format: "string"`
If set to any value, the endpoint returns repositories with associated branch data, as well as code references for the default git branch
### Response
Repository collection response
_linksmap from strings to objects
Show 2 properties
itemslist of objects
An array of repositories
Show 11 properties
### Errors
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