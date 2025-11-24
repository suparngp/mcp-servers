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
/api/v2/teams/:teamKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/teams/teamKey"
4
| 
5
| payload = {
6
| "instructions": [
7
| {
8
| "kind": "updateDescription",
9
| "value": "New description for the team"
10
| }
11
| ],
12
| "comment": "Optional comment about the update"
13
| }
14
| headers = {
15
| "Authorization": "<apiKey>",
16
| "Content-Type": "application/json"
17
| }
18
| 
19
| response = requests.patch(url, json=payload, headers=headers)
20
| 
21
| print(response.json())
```
[](/docs/api/teams/patch-team?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "description": "Description for this team.",
3
| "key": "team-key-123abc",
4
| "name": "Example team",
5
| "_access": {
6
| "denied": [
7
| {
8
| "action": "string",
9
| "reason": {
10
| "effect": "allow",
11
| "resources": [
12
| "proj/*:env/*;qa_*:/flag/*"
13
| ],
14
| "notResources": [
15
| "string"
16
| ],
17
| "actions": [
18
| "*"
19
| ],
20
| "notActions": [
21
| "string"
22
| ],
23
| "role_name": "string"
24
| }
25
| }
26
| ],
27
| "allowed": [
28
| {
29
| "action": "string",
30
| "reason": {
31
| "effect": "allow",
32
| "resources": [
33
| "proj/*:env/*;qa_*:/flag/*"
34
| ],
35
| "notResources": [
36
| "string"
37
| ],
38
| "actions": [
39
| "*"
40
| ],
41
| "notActions": [
42
| "string"
43
| ],
44
| "role_name": "string"
45
| }
46
| }
47
| ]
48
| },
49
| "_creationDate": 1,
50
| "_links": {
51
| "parent": {
52
| "href": "/api/v2/teams",
53
| "type": "application/json"
54
| },
55
| "roles": {
56
| "href": "/api/v2/teams/example-team/roles",
57
| "type": "application/json"
58
| },
59
| "self": {
60
| "href": "/api/v2/teams/example-team",
61
| "type": "application/json"
62
| }
63
| },
64
| "_lastModified": 1,
65
| "_version": 3,
66
| "_idpSynced": true,
67
| "roleAttributes": {},
68
| "roles": {
69
| "totalCount": 1,
70
| "items": [
71
| {
72
| "key": "role-key-123abc",
73
| "name": "Example role",
74
| "projects": {
75
| "totalCount": 1,
76
| "items": [
77
| {
78
| "_id": "57be1db38b75bf0772d11383",
79
| "_links": {
80
| "environments": {
81
| "href": "/api/v2/projects/example-project/environments",
82
| "type": "application/json"
83
| },
84
| "self": {
85
| "href": "/api/v2/projects/example-project",
86
| "type": "application/json"
87
| }
88
| },
89
| "key": "project-key-123abc",
90
| "name": "Example project"
91
| }
92
| ]
93
| },
94
| "appliedOn": 1
95
| }
96
| ],
97
| "_links": {
98
| "self": {
99
| "href": "/api/v2/teams/example-team/roles?limit=25",
100
| "type": "application/json"
101
| }
102
| }
103
| },
104
| "members": {
105
| "totalCount": 15
106
| },
107
| "projects": {
108
| "totalCount": 1,
109
| "items": [
110
| {
111
| "_id": "57be1db38b75bf0772d11383",
112
| "_links": {
113
| "environments": {
114
| "href": "/api/v2/projects/example-project/environments",
115
| "type": "application/json"
116
| },
117
| "self": {
118
| "href": "/api/v2/projects/example-project",
119
| "type": "application/json"
120
| }
121
| },
122
| "key": "project-key-123abc",
123
| "name": "Example project"
124
| }
125
| ]
126
| },
127
| "maintainers": {
128
| "totalCount": 1,
129
| "items": [
130
| {
131
| "_links": {
132
| "self": {
133
| "href": "/api/v2/members/569f183514f4432160000007",
134
| "type": "application/json"
135
| }
136
| },
137
| "_id": "569f183514f4432160000007",
138
| "role": "reader",
139
| "email": "ariel@acme.com",
140
| "firstName": "Ariel",
141
| "lastName": "Flores"
142
| }
143
| ],
144
| "_links": {
145
| "self": {
146
| "href": "/api/v2/teams/example-team/maintainers?limit=20",
147
| "type": "application/json"
148
| }
149
| }
150
| }
151
| }
```
Perform a partial update to a team. Updating a team uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating teams. Several of the instructions require one or more member IDs as parameters. The member ID is returned as part of the [List account members](https://launchdarkly.com/docs/api/account-members/get-members) response. It is the `_id` field of each element in the `items` array. <details> <summary>Click to expand instructions for <strong>updating teams</strong></summary> #### addCustomRoles Adds custom roles to the team. Team members will have these custom roles granted to them. ##### Parameters - `values`: List of custom role keys. Here's an example: ```json { "instructions": [{ "kind": "addCustomRoles", "values": [ "example-custom-role" ] }] } ``` #### addMembers Adds members to the team. ##### Parameters - `values`: List of member IDs to add. Here's an example: ```json { "instructions": [{ "kind": "addMembers", "values": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### addPermissionGrants Adds permission grants to members for the team. For example, a permission grant could allow a member to act as a team maintainer. A permission grant may have either an `actionSet` or a list of `actions` but not both at the same time. The members do not have to be team members to have a permission grant for the team. ##### Parameters - `actionSet`: Name of the action set. - `actions`: List of actions. - `memberIDs`: List of member IDs. Here's an example: ```json { "instructions": [{ "kind": "addPermissionGrants", "actions": [ "updateTeamName", "updateTeamDescription" ], "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### addRoleAttribute Adds a role attribute to a team. Team members will have these role attribute values scoped for all custom roles granted to them. ##### Parameters - `key`: The role attribute key to add. - `values`: List of role attribute values for that key. Here's an example: ```json { "instructions": [ { "kind": "addRoleAttribute", "key": "testAttribute", "values": ["someNewValue", "someOtherNewValue"] } ] } ``` #### removeCustomRoles Removes custom roles from the team. The app will no longer grant these custom roles to the team members. ##### Parameters - `values`: List of custom role keys. Here's an example: ```json { "instructions": [{ "kind": "removeCustomRoles", "values": [ "example-custom-role" ] }] } ``` #### removeMembers Removes members from the team. ##### Parameters - `values`: List of member IDs to remove. Here's an example: ```json { "instructions": [{ "kind": "removeMembers", "values": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### removePermissionGrants Removes permission grants from members for the team. A permission grant may have either an `actionSet` or a list of `actions` but not both at the same time. The `actionSet` and `actions` must match an existing permission grant. ##### Parameters - `actionSet`: Name of the action set. - `actions`: List of actions. - `memberIDs`: List of member IDs. Here's an example: ```json { "instructions": [{ "kind": "removePermissionGrants", "actions": [ "updateTeamName", "updateTeamDescription" ], "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### removeRoleAttribute Removes a role attribute from the team. ##### Parameters - `key`: The role attribute key to remove. Here's an example: ```json { "instructions": [ { "kind": "removeRoleAttribute", "key": "testAttribute" } ] } ``` #### replaceMembers Replaces the existing members of the team with the new members. ##### Parameters - `values`: List of member IDs of the new members. Here's an example: ```json { "instructions": [{ "kind": "replaceMembers", "values": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ] }] } ``` #### replaceRoleAttributes Replaces the existing role attributes for the team with new role attributes. ##### Parameters - `value`: A map of role attribute keys to lists of role attribute values Here's an example: ```json { "instructions": [{ "kind": "replaceRoleAttributes", "value": { "testAttribute": [ "someNewValue", "someOtherNewValue" ], "projectRoleAttribute": [ "project1", "project2"] } }] } ``` #### updateDescription Updates the description of the team. ##### Parameters - `value`: The new description. Here's an example: ```json { "instructions": [{ "kind": "updateDescription", "value": "Updated team description" }] } ``` #### updateName Updates the name of the team. ##### Parameters - `value`: The new name. Here's an example: ```json { "instructions": [{ "kind": "updateName", "value": "Updated team name" }] } ``` #### updateRoleAttribute Updates a role attribute on the team. Any existing values for the given key will be replaced with the new values. Team members will have these role attribute values scoped for all custom roles granted to them. ##### Parameters - `key`: The role attribute key to update. - `values`: List of role attribute values for that key. Here's an example: ```json { "instructions": [ { "kind": "updateRoleAttribute", "key": "testAttribute", "values": ["someNewValue", "someOtherNewValue"] } ] } ``` </details> ### Expanding the teams response LaunchDarkly supports four fields for expanding the "Update team" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: * `members` includes the total count of members that belong to the team. * `roles` includes a paginated list of the custom roles that you have assigned to the team. * `projects` includes a paginated list of the projects that the team has any write access to. * `maintainers` includes a paginated list of the maintainers that you have assigned to the team. For example, `expand=members,roles` includes the `members` and `roles` fields in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
teamKeystringRequired`format: "string"`
The team key
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above.
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
The instructions to perform when updating. This should be an array with objects that look like <code>{“kind”: “update_action”}</code>. Some instructions also require additional parameters as part of this object.
commentstringOptional
Optional comment describing the update
### Response
Teams response
descriptionstring or null
A description of the team
keystring or null
The team key
namestring or null
A human-friendly name for the team
_accessobject or null
Details on the allowed and denied actions for this team
Show 2 properties
_creationDatelong or null
Timestamp of when the team was created
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
_lastModifiedlong or null
Timestamp of when the team was most recently updated
_versioninteger or null
The team version
_idpSyncedboolean or null
Whether the team has been synced with an external identity provider (IdP). Team sync is available to customers on an Enterprise plan.
roleAttributesmap from strings to lists of strings or null
A map of role attributes for the team
rolesobject or null
Paginated list of the custom roles assigned to this team. Only included if specified in the `expand` query parameter.
Show 3 properties
membersobject or null
Details on the total count of members that belong to the team. Only included if specified in the `expand` query parameter.
Show 1 properties
projectsobject or null
Paginated list of the projects that the team has any write access to. Only included if specified in the `expand` query parameter.
Show 2 properties
maintainersobject or null
Paginated list of the maintainers assigned to this team. Only included if specified in the `expand` query parameter.
Show 3 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
404
Not Found Error
405
Method Not Allowed Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Perform a partial update to a team. Updating a team uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating teams. Several of the instructions require one or more member IDs as parameters. The member ID is returned as part of the [List account members](https://launchdarkly.com/docs/api/account-members/get-members) response. It is the `_id` field of each element in the `items` array.
Click to expand instructions for **updating teams**
#### addCustomRoles
Adds custom roles to the team. Team members will have these custom roles granted to them.
##### Parameters
 * `values`: List of custom role keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addCustomRoles",
4
| "values": [ "example-custom-role" ]
5
| }]
6
| }
```
#### addMembers
Adds members to the team.
##### Parameters
 * `values`: List of member IDs to add.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addMembers",
4
| "values": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ]
5
| }]
6
| }
```
#### addPermissionGrants
Adds permission grants to members for the team. For example, a permission grant could allow a member to act as a team maintainer. A permission grant may have either an `actionSet` or a list of `actions` but not both at the same time. The members do not have to be team members to have a permission grant for the team.
##### Parameters
 * `actionSet`: Name of the action set.
 * `actions`: List of actions.
 * `memberIDs`: List of member IDs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addPermissionGrants",
4
| "actions": [ "updateTeamName", "updateTeamDescription" ],
5
| "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ]
6
| }]
7
| }
```
#### addRoleAttribute
Adds a role attribute to a team. Team members will have these role attribute values scoped for all custom roles granted to them.
##### Parameters
 * `key`: The role attribute key to add.
 * `values`: List of role attribute values for that key.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [
3
| {
4
| "kind": "addRoleAttribute",
5
| "key": "testAttribute",
6
| "values": ["someNewValue", "someOtherNewValue"]
7
| }
8
| ]
9
| }
```
#### removeCustomRoles
Removes custom roles from the team. The app will no longer grant these custom roles to the team members.
##### Parameters
 * `values`: List of custom role keys.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeCustomRoles",
4
| "values": [ "example-custom-role" ]
5
| }]
6
| }
```
#### removeMembers
Removes members from the team.
##### Parameters
 * `values`: List of member IDs to remove.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removeMembers",
4
| "values": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ]
5
| }]
6
| }
```
#### removePermissionGrants
Removes permission grants from members for the team. A permission grant may have either an `actionSet` or a list of `actions` but not both at the same time. The `actionSet` and `actions` must match an existing permission grant.
##### Parameters
 * `actionSet`: Name of the action set.
 * `actions`: List of actions.
 * `memberIDs`: List of member IDs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "removePermissionGrants",
4
| "actions": [ "updateTeamName", "updateTeamDescription" ],
5
| "memberIDs": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ]
6
| }]
7
| }
```
#### removeRoleAttribute
Removes a role attribute from the team.
##### Parameters
 * `key`: The role attribute key to remove.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [
3
| {
4
| "kind": "removeRoleAttribute",
5
| "key": "testAttribute"
6
| }
7
| ]
8
| }
```
#### replaceMembers
Replaces the existing members of the team with the new members.
##### Parameters
 * `values`: List of member IDs of the new members.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceMembers",
4
| "values": [ "1234a56b7c89d012345e678f", "507f1f77bcf86cd799439011" ]
5
| }]
6
| }
```
#### replaceRoleAttributes
Replaces the existing role attributes for the team with new role attributes.
##### Parameters
 * `value`: A map of role attribute keys to lists of role attribute values
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceRoleAttributes",
4
| "value": {
5
| "testAttribute": [ "someNewValue", "someOtherNewValue" ],
6
| "projectRoleAttribute": [ "project1", "project2"]
7
| }
8
| }]
9
| }
```
#### updateDescription
Updates the description of the team.
##### Parameters
 * `value`: The new description.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "updateDescription",
4
| "value": "Updated team description"
5
| }]
6
| }
```
#### updateName
Updates the name of the team.
##### Parameters
 * `value`: The new name.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "updateName",
4
| "value": "Updated team name"
5
| }]
6
| }
```
#### updateRoleAttribute
Updates a role attribute on the team. Any existing values for the given key will be replaced with the new values. Team members will have these role attribute values scoped for all custom roles granted to them.
##### Parameters
 * `key`: The role attribute key to update.
 * `values`: List of role attribute values for that key.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [
3
| {
4
| "kind": "updateRoleAttribute",
5
| "key": "testAttribute",
6
| "values": ["someNewValue", "someOtherNewValue"]
7
| }
8
| ]
9
| }
```
### Expanding the teams response
LaunchDarkly supports four fields for expanding the “Update team” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `members` includes the total count of members that belong to the team.
 * `roles` includes a paginated list of the custom roles that you have assigned to the team.
 * `projects` includes a paginated list of the projects that the team has any write access to.
 * `maintainers` includes a paginated list of the maintainers that you have assigned to the team.
For example, `expand=members,roles` includes the `members` and `roles` fields in the response.