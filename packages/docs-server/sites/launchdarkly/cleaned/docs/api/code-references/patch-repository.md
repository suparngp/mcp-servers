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
/api/v2/code-refs/repositories/:repo
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/code-refs/repositories/repo"
4
| 
5
| payload = [
6
| {
7
| "op": "replace",
8
| "path": "/defaultBranch",
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
[](/docs/api/code-references/patch-repository?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "name": "LaunchDarkly-Docs",
3
| "type": "github",
4
| "defaultBranch": "main",
5
| "enabled": true,
6
| "version": 3,
7
| "_links": {},
8
| "sourceLink": "https://github.com/launchdarkly/LaunchDarkly-Docs",
9
| "commitUrlTemplate": "https://github.com/launchdarkly/LaunchDarkly-Docs/commit/${sha}",
10
| "hunkUrlTemplate": "https://github.com/launchdarkly/LaunchDarkly-Docs/blob/${sha}/${filePath}#L${lineNumber}",
11
| "branches": [
12
| {
13
| "name": "main",
14
| "head": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
15
| "syncTime": 1,
16
| "_links": {},
17
| "updateSequenceId": 25,
18
| "references": [
19
| {
20
| "path": "/main/index.js",
21
| "hunks": [
22
| {
23
| "startingLineNumber": 45,
24
| "lines": "var enableFeature = 'enable-feature';",
25
| "projKey": "default",
26
| "flagKey": "enable-feature",
27
| "aliases": [
28
| "enableFeature",
29
| "EnableFeature"
30
| ]
31
| }
32
| ],
33
| "hint": "javascript"
34
| }
35
| ]
36
| }
37
| ],
38
| "_access": {
39
| "denied": [
40
| {
41
| "action": "string",
42
| "reason": {
43
| "effect": "allow",
44
| "resources": [
45
| "proj/*:env/*;qa_*:/flag/*"
46
| ],
47
| "notResources": [
48
| "string"
49
| ],
50
| "actions": [
51
| "*"
52
| ],
53
| "notActions": [
54
| "string"
55
| ],
56
| "role_name": "string"
57
| }
58
| }
59
| ],
60
| "allowed": [
61
| {
62
| "action": "string",
63
| "reason": {
64
| "effect": "allow",
65
| "resources": [
66
| "proj/*:env/*;qa_*:/flag/*"
67
| ],
68
| "notResources": [
69
| "string"
70
| ],
71
| "actions": [
72
| "*"
73
| ],
74
| "notActions": [
75
| "string"
76
| ],
77
| "role_name": "string"
78
| }
79
| }
80
| ]
81
| }
82
| }
```
Update a repository's settings. Updating repository settings uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) or [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7386) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
repostringRequired`format: "string"`
The repository name
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Repository response
namestring
The repository name
typeenum
The type of repository
Allowed values:bitbucketcustomgithubgitlab
defaultBranchstring
The repository's default branch
enabledboolean
Whether or not a repository is enabled for code reference scanning
versioninteger
The version of the repository's saved information
_linksmap from strings to any
sourceLinkstring or null
A URL to access the repository
commitUrlTemplatestring or null
A template for constructing a valid URL to view the commit
hunkUrlTemplatestring or null
A template for constructing a valid URL to view the hunk
brancheslist of objects or null
An array of the repository's branches that have been scanned for code references
Show 6 properties
_accessobject or null
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
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Update a repository’s settings. Updating repository settings uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) or [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7386) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).