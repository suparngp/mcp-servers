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
/api/v2/tokens/:id
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/tokens/id \
---|--- 
2
| -H "Authorization: <apiKey>"
```
[](/docs/api/access-tokens/get-token?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "string",
3
| "ownerId": "string",
4
| "memberId": "string",
5
| "creationDate": 1,
6
| "lastModified": 1,
7
| "_links": {
8
| "parent": {
9
| "href": "/api/v2/tokens",
10
| "type": "application/json"
11
| },
12
| "self": {
13
| "href": "/api/v2/tokens/61095542756dba551110ae21",
14
| "type": "application/json"
15
| }
16
| },
17
| "_member": {
18
| "_links": {
19
| "self": {
20
| "href": "/api/v2/members/569f183514f4432160000007",
21
| "type": "application/json"
22
| }
23
| },
24
| "_id": "569f183514f4432160000007",
25
| "role": "admin",
26
| "email": "ariel@acme.com",
27
| "firstName": "Ariel",
28
| "lastName": "Flores"
29
| },
30
| "name": "Example reader token",
31
| "description": "A reader token used in testing and examples",
32
| "customRoleIds": [],
33
| "inlineRole": [],
34
| "role": "reader",
35
| "token": "1234",
36
| "serviceToken": false,
37
| "defaultApiVersion": 20220603,
38
| "lastUsed": 1
39
| }
```
Get a single access token by ID.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
idstringRequired`format: "string"`
The ID of the access token
### Response
Access token response
_idstring
The ID of the access token
ownerIdstring
The ID of the owner of the account for the access token
memberIdstring
The ID of the member who created the access token
creationDatelong
Timestamp of when the access token was created
lastModifiedlong
Timestamp of the last modification of the access token
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_memberobject or null
Details on the member who created the access token
Show 6 properties
namestring or null
A human-friendly name for the access token
descriptionstring or null
A description for the access token
customRoleIdslist of strings or null
A list of custom role IDs to use as access limits for the access token
inlineRolelist of objects or null
An array of policy statements, with three attributes: effect, resources, actions. May be used in place of a role.
Show 5 properties
rolestring or null
Base role for the token
tokenstring or null
The token value. When creating or resetting, contains the entire token value. Otherwise, contains the last four characters.
serviceTokenboolean or null
Whether this is a service token or a personal token
defaultApiVersioninteger or null
The default API version for this token
lastUsedlong or null
Timestamp of when the access token was last used
### Errors
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