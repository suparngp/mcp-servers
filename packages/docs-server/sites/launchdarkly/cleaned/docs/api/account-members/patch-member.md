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
/api/v2/members/:id
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/members/id"
4
| 
5
| payload = [
6
| {
7
| "op": "add",
8
| "path": "/role",
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
[](/docs/api/account-members/patch-member?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_links": {},
3
| "_id": "507f1f77bcf86cd799439011",
4
| "role": "reader",
5
| "email": "ariel@acme.com",
6
| "_pendingInvite": false,
7
| "_verified": true,
8
| "customRoles": [
9
| "devOps",
10
| "backend-devs"
11
| ],
12
| "mfa": "string",
13
| "_lastSeen": 1,
14
| "creationDate": 1,
15
| "firstName": "Ariel",
16
| "lastName": "Flores",
17
| "_pendingEmail": "string",
18
| "excludedDashboards": [
19
| "string"
20
| ],
21
| "_lastSeenMetadata": {
22
| "tokenId": "5b52207f8ca8e631d31fdb2b"
23
| },
24
| "_integrationMetadata": {
25
| "externalId": "string",
26
| "externalStatus": {
27
| "display": "string",
28
| "value": "string"
29
| },
30
| "externalUrl": "string",
31
| "lastChecked": 1
32
| },
33
| "teams": [
34
| {
35
| "customRoleKeys": [
36
| "access-to-test-projects"
37
| ],
38
| "key": "team-key-123abc",
39
| "name": "QA Team",
40
| "_links": {}
41
| }
42
| ],
43
| "permissionGrants": [
44
| {
45
| "resource": "team/qa-team",
46
| "actionSet": "string",
47
| "actions": [
48
| "maintainTeam"
49
| ]
50
| }
51
| ],
52
| "oauthProviders": [
53
| "string"
54
| ],
55
| "version": 1,
56
| "roleAttributes": {}
57
| }
```
Update a single account member. Updating a member uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates). To update fields in the account member object that are arrays, set the `path` to the name of the field and then append `/<array index>`. Use `/0` to add to the beginning of the array. Use `/-` to add to the end of the array. For example, to add a new custom role to a member, use the following request body: ``` [ { "op": "add", "path": "/customRoles/0", "value": "some-role-id" } ] ``` You can update only an account member's role or custom role using a JSON patch. Members can update their own names and email addresses though the LaunchDarkly UI. When SAML SSO or SCIM is enabled for the account, account members are managed in the Identity Provider (IdP). Requests to update account members will succeed, but the IdP will override the update shortly afterwards. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
idstringRequired`format: "string"`
The member ID
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Member response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The member's ID
rolestring
The member's base role. If the member has no additional roles, this role will be in effect.
emailstring
The member's email address
_pendingInviteboolean
Whether the member has a pending invitation
_verifiedboolean
Whether the member's email address has been verified
customRoleslist of strings
The set of additional roles, besides the base role, assigned to the member
mfastring
Whether multi-factor authentication is enabled for this member
_lastSeenlong
The member’s last session date (as Unix milliseconds since epoch)
creationDatelong
Timestamp of when the member was created
firstNamestring or null
The member's first name
lastNamestring or null
The member's last name
_pendingEmailstring or null
The member's email address before it has been verified, for accounts where email verification is required
excludedDashboardslist of strings or null
Default dashboards that the member has chosen to ignore
_lastSeenMetadataobject or null
Additional metadata associated with the member's last session, for example, whether a token was used
Show 1 properties
_integrationMetadataobject or null
Details on the member account in an external source, if this member is provisioned externally
Show 4 properties
teamslist of objects or null
Details on the teams this member is assigned to
Show 4 properties
permissionGrantslist of objects or null
A list of permission grants. Permission grants allow a member to have access to a specific action, without having to create or update a custom role.
Show 3 properties
oauthProviderslist of strings or null
A list of OAuth providers
versioninteger or null
Version of the current configuration
roleAttributesmap from strings to lists of strings or null
The role attributes for the member
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
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
Update a single account member. Updating a member uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
To update fields in the account member object that are arrays, set the `path` to the name of the field and then append `/<array index>`. Use `/0` to add to the beginning of the array. Use `/-` to add to the end of the array. For example, to add a new custom role to a member, use the following request body:
```
 [ 
--- 
 { 
 "op": "add", 
 "path": "/customRoles/0", 
 "value": "some-role-id" 
 } 
 ] 
```
You can update only an account member’s role or custom role using a JSON patch. Members can update their own names and email addresses though the LaunchDarkly UI.
When SAML SSO or SCIM is enabled for the account, account members are managed in the Identity Provider (IdP). Requests to update account members will succeed, but the IdP will override the update shortly afterwards.