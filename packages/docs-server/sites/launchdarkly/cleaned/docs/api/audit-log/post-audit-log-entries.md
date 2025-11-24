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
/api/v2/auditlog
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/auditlog"
4
| 
5
| payload = [{ "effect": "allow" }]
6
| headers = {
7
| "Authorization": "<apiKey>",
8
| "Content-Type": "application/json"
9
| }
10
| 
11
| response = requests.post(url, json=payload, headers=headers)
12
| 
13
| print(response.json())
```
[](/docs/api/audit-log/post-audit-log-entries?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "_links": {},
5
| "_id": "1234a56b7c89d012345e678f",
6
| "_accountId": "1234a56b7c89d012345e678f",
7
| "date": 1,
8
| "accesses": [
9
| {
10
| "action": "string",
11
| "resource": "string"
12
| }
13
| ],
14
| "kind": "string",
15
| "name": "Example feature flag",
16
| "description": "Example, turning on the flag for testing",
17
| "shortDescription": "Example, turning on the flag",
18
| "comment": "This is an automated test",
19
| "subject": {
20
| "_links": {},
21
| "name": "string",
22
| "avatarUrl": "string"
23
| },
24
| "member": {
25
| "_links": {},
26
| "_id": "507f1f77bcf86cd799439011",
27
| "email": "ariel@acme.com",
28
| "firstName": "Ariel",
29
| "lastName": "Flores"
30
| },
31
| "token": {
32
| "_links": {},
33
| "_id": "string",
34
| "name": "DevOps token",
35
| "ending": "2345",
36
| "serviceToken": false
37
| },
38
| "app": {
39
| "_links": {},
40
| "_id": "string",
41
| "isScim": true,
42
| "name": "string",
43
| "maintainerName": "string"
44
| },
45
| "titleVerb": "turned on the flag",
46
| "title": "string",
47
| "target": {
48
| "_links": {},
49
| "name": "Example flag name",
50
| "resources": [
51
| "proj/example-project:env/production:flag/example-flag"
52
| ]
53
| },
54
| "parent": {
55
| "_links": {},
56
| "name": "string",
57
| "resource": "string"
58
| }
59
| }
60
| ],
61
| "_links": {}
62
| }
```
Search your audit log entries. The query parameters let you restrict the results that return by date ranges, or a full-text search query. The request body lets you restrict the results that return by resource specifiers. LaunchDarkly uses a resource specifier syntax to name resources or collections of resources. To learn more, read [About the resource specifier syntax](https://launchdarkly.com/docs/home/account/role-resources#about-the-resource-specifier-syntax). 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
beforelongOptional
A timestamp filter, expressed as a Unix epoch time in milliseconds. All entries returned occurred before the timestamp.
afterlongOptional
A timestamp filter, expressed as a Unix epoch time in milliseconds. All entries returned occurred after the timestamp.
qstringOptional`format: "string"`
Text to search for. You can search for the full or partial name of the resource.
limitlongOptional
A limit on the number of audit log entries that return. Set between 1 and 20. The default is 10.
### Request
This endpoint expects a list of objects.
effectenumRequired
Whether this statement should allow or deny actions on the resources.
Allowed values:allowdeny
resourceslist of stringsOptional
Resource specifier strings
notResourceslist of stringsOptional
Targeted resources are the resources NOT in this list. The `resources` field must be empty to use this field.
actionslist of stringsOptional
Actions to perform on a resource
notActionslist of stringsOptional
Targeted actions are the actions NOT in this list. The `actions` field must be empty to use this field.
### Response
Audit log entries response
itemslist of objects
An array of audit log entries
Show 18 properties
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
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
Search your audit log entries. The query parameters let you restrict the results that return by date ranges, or a full-text search query. The request body lets you restrict the results that return by resource specifiers.
LaunchDarkly uses a resource specifier syntax to name resources or collections of resources. To learn more, read [About the resource specifier syntax](https://launchdarkly.com/docs/home/account/role-resources#about-the-resource-specifier-syntax).