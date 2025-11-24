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
/api/v2/members
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/members"
4
| 
5
| payload = [{ "email": "sandy@acme.com" }]
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
[](/docs/api/account-members/post-members?explorer=true)
201Created
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
| "_id": "507f1f77bcf86cd799439011",
6
| "role": "reader",
7
| "email": "ariel@acme.com",
8
| "_pendingInvite": false,
9
| "_verified": true,
10
| "customRoles": [
11
| "devOps",
12
| "backend-devs"
13
| ],
14
| "mfa": "string",
15
| "_lastSeen": 1,
16
| "creationDate": 1,
17
| "firstName": "Ariel",
18
| "lastName": "Flores",
19
| "_pendingEmail": "string",
20
| "excludedDashboards": [
21
| "string"
22
| ],
23
| "_lastSeenMetadata": {
24
| "tokenId": "5b52207f8ca8e631d31fdb2b"
25
| },
26
| "_integrationMetadata": {
27
| "externalId": "string",
28
| "externalStatus": {
29
| "display": "string",
30
| "value": "string"
31
| },
32
| "externalUrl": "string",
33
| "lastChecked": 1
34
| },
35
| "teams": [
36
| {
37
| "customRoleKeys": [
38
| "access-to-test-projects"
39
| ],
40
| "key": "team-key-123abc",
41
| "name": "QA Team",
42
| "_links": {}
43
| }
44
| ],
45
| "permissionGrants": [
46
| {
47
| "resource": "team/qa-team",
48
| "actionSet": "string",
49
| "actions": [
50
| "maintainTeam"
51
| ]
52
| }
53
| ],
54
| "oauthProviders": [
55
| "string"
56
| ],
57
| "version": 1,
58
| "roleAttributes": {}
59
| }
60
| ],
61
| "_links": {},
62
| "totalCount": 1
63
| }
```
Invite one or more new members to join an account. Each member is sent an invitation. Members with Admin or Owner roles may create new members, as well as anyone with a `createMember` permission for "member/\\*". If a member cannot be invited, the entire request is rejected and no members are invited from that request. Each member _must_ have an `email` field and either a `role` or a `customRoles` field. If any of the fields are not populated correctly, the request is rejected with the reason specified in the "message" field of the response. Valid base role names that you can provide for the `role` field include `reader`, `writer`, `admin`, `owner/admin`, and `no_access`. To learn more about base roles, read [Organization roles](https://launchdarkly.com/docs/home/account/roles/organization-roles). If you are using the `customRoles` field instead, you can provide the key for any role that you have created, or for any preset [organization role](https://launchdarkly.com/docs/home/account/roles/organization-roles) or [project role](https://launchdarkly.com/docs/home/account/roles/project-roles) provided by LaunchDarkly. Some preset roles additionally require that you specify `roleAttributes`. To learn more, read [Using role scope](https://launchdarkly.com/docs/home/account/roles/role-scope). Requests to create account members will not work if SCIM is enabled for the account. _No more than 50 members may be created per request._ A request may also fail because of conflicts with existing members. These conflicts are reported using the additional `code` and `invalid_emails` response fields with the following possible values for `code`: - **email_already_exists_in_account**: A member with this email address already exists in this account. - **email_taken_in_different_account**: A member with this email address exists in another account. - **duplicate_email**s: This request contains two or more members with the same email address. A request that fails for one of the above reasons returns an HTTP response code of 400 (Bad Request). 
### Authentication
Authorizationstring
API Key authentication via header
### Request
This endpoint expects a list of objects.
emailstringRequired
The member's email
passwordstringOptional
The member's password
firstNamestringOptional
The member's first name
lastNamestringOptional
The member's last name
roleenumOptional
The member's initial role, if you are using a base role for the initial role
Allowed values:readerwriteradminno_access
customRoleslist of stringsOptional
An array of the member's initial roles, if you are using custom roles or preset roles provided by LaunchDarkly
teamKeyslist of stringsOptional
An array of the member's teams
roleAttributesmap from strings to lists of stringsOptional
An object of role attributes for the member
### Response
Member collection response
itemslist of objects
An array of members
Show 21 properties
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of members returned
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Invite one or more new members to join an account. Each member is sent an invitation. Members with Admin or Owner roles may create new members, as well as anyone with a `createMember` permission for “member/*”. If a member cannot be invited, the entire request is rejected and no members are invited from that request.
Each member _must_ have an `email` field and either a `role` or a `customRoles` field. If any of the fields are not populated correctly, the request is rejected with the reason specified in the “message” field of the response.
Valid base role names that you can provide for the `role` field include `reader`, `writer`, `admin`, `owner/admin`, and `no_access`. To learn more about base roles, read [Organization roles](https://launchdarkly.com/docs/home/account/roles/organization-roles).
If you are using the `customRoles` field instead, you can provide the key for any role that you have created, or for any preset [organization role](https://launchdarkly.com/docs/home/account/roles/organization-roles) or [project role](https://launchdarkly.com/docs/home/account/roles/project-roles) provided by LaunchDarkly. Some preset roles additionally require that you specify `roleAttributes`. To learn more, read [Using role scope](https://launchdarkly.com/docs/home/account/roles/role-scope).
Requests to create account members will not work if SCIM is enabled for the account.
_No more than 50 members may be created per request._
A request may also fail because of conflicts with existing members. These conflicts are reported using the additional `code` and `invalid_emails` response fields with the following possible values for `code`:
 * **email_already_exists_in_account** : A member with this email address already exists in this account.
 * **email_taken_in_different_account** : A member with this email address exists in another account.
 * **duplicate_email** s: This request contains two or more members with the same email address.
A request that fails for one of the above reasons returns an HTTP response code of 400 (Bad Request).