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
[](/docs/api/account-members/get-members?explorer=true)
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
Return a list of account members. By default, this returns the first 20 members. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the returned `_links` field. These links are not present if the pages they refer to don't exist. For example, the `first` and `prev` links will be missing from the response on the first page. ### Filtering members LaunchDarkly supports the following fields for filters: - `query` is a string that matches against the members' emails and names. It is not case sensitive. - `role` is a `|` separated list of roles and custom roles. It filters the list to members who have any of the roles in the list. For the purposes of this filtering, `Owner` counts as `Admin`. - `id` is a `|` separated list of member IDs. It filters the list to members who match any of the IDs in the list. - `email` is a `|` separated list of member emails. It filters the list to members who match any of the emails in the list. - `team` is a string that matches against the key of the teams the members belong to. It is not case sensitive. - `noteam` is a boolean that filters the list of members who are not on a team if true and members on a team if false. - `lastSeen` is a JSON object in one of the following formats: - `{"never": true}` - Members that have never been active, such as those who have not accepted their invitation to LaunchDarkly, or have not logged in after being provisioned via SCIM. - `{"noData": true}` - Members that have not been active since LaunchDarkly began recording last seen timestamps. - `{"before": 1608672063611}` - Members that have not been active since the provided value, which should be a timestamp in Unix epoch milliseconds. - `accessCheck` is a string that represents a specific action on a specific resource and is in the format `<ActionSpecifier>:<ResourceSpecifier>`. It filters the list to members who have the ability to perform that action on that resource. Note: `accessCheck` is only supported in API version `20220603` and earlier. To learn more, read [Versioning](https://launchdarkly.com/docs/api#versioning). - For example, the filter `accessCheck:createApprovalRequest:proj/default:env/test:flag/alternate-page` matches members with the ability to create an approval request for the `alternate-page` flag in the `test` environment of the `default` project. - Wildcard and tag filters are not supported when filtering for access. For example, the filter `query:abc,role:admin|customrole` matches members with the string `abc` in their email or name, ignoring case, who also are either an `Owner` or `Admin` or have the custom role `customrole`. ### Sorting members LaunchDarkly supports two fields for sorting: `displayName` and `lastSeen`: - `displayName` sorts by first + last name, using the member's email if no name is set. - `lastSeen` sorts by the `_lastSeen` property. LaunchDarkly considers members that have never been seen or have no data the oldest. ### Expanding the members response LaunchDarkly supports two fields for expanding the "List members" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: * `customRoles` includes a list of the roles that you have assigned to the member. * `roleAttributes` includes a list of the role attributes that you have assigned to the member. For example, `expand=roleAttributes` includes `roleAttributes` field in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
limitlongOptional
The number of members to return in the response. Defaults to 20.
offsetlongOptional
Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above.
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response.
sortstringOptional`format: "string"`
A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order.
### Response
Members collection response
itemslist of objects
An array of members
Show 21 properties
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The number of members returned
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
Return a list of account members.
By default, this returns the first 20 members. Page through this list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the returned `_links` field. These links are not present if the pages they refer to don’t exist. For example, the `first` and `prev` links will be missing from the response on the first page.
### Filtering members
LaunchDarkly supports the following fields for filters:
 * `query` is a string that matches against the members’ emails and names. It is not case sensitive.
 * `role` is a `|` separated list of roles and custom roles. It filters the list to members who have any of the roles in the list. For the purposes of this filtering, `Owner` counts as `Admin`.
 * `id` is a `|` separated list of member IDs. It filters the list to members who match any of the IDs in the list.
 * `email` is a `|` separated list of member emails. It filters the list to members who match any of the emails in the list.
 * `team` is a string that matches against the key of the teams the members belong to. It is not case sensitive.
 * `noteam` is a boolean that filters the list of members who are not on a team if true and members on a team if false.
 * `lastSeen` is a JSON object in one of the following formats:
 * `{"never": true}` - Members that have never been active, such as those who have not accepted their invitation to LaunchDarkly, or have not logged in after being provisioned via SCIM.
 * `{"noData": true}` - Members that have not been active since LaunchDarkly began recording last seen timestamps.
 * `{"before": 1608672063611}` - Members that have not been active since the provided value, which should be a timestamp in Unix epoch milliseconds.
 * `accessCheck` is a string that represents a specific action on a specific resource and is in the format `<ActionSpecifier>:<ResourceSpecifier>`. It filters the list to members who have the ability to perform that action on that resource. Note: `accessCheck` is only supported in API version `20220603` and earlier. To learn more, read [Versioning](https://launchdarkly.com/docs/api#versioning).
 * For example, the filter `accessCheck:createApprovalRequest:proj/default:env/test:flag/alternate-page` matches members with the ability to create an approval request for the `alternate-page` flag in the `test` environment of the `default` project.
 * Wildcard and tag filters are not supported when filtering for access.
For example, the filter `query:abc,role:admin|customrole` matches members with the string `abc` in their email or name, ignoring case, who also are either an `Owner` or `Admin` or have the custom role `customrole`.
### Sorting members
LaunchDarkly supports two fields for sorting: `displayName` and `lastSeen`:
 * `displayName` sorts by first + last name, using the member’s email if no name is set.
 * `lastSeen` sorts by the `_lastSeen` property. LaunchDarkly considers members that have never been seen or have no data the oldest.
### Expanding the members response
LaunchDarkly supports two fields for expanding the “List members” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `customRoles` includes a list of the roles that you have assigned to the member.
 * `roleAttributes` includes a list of the role attributes that you have assigned to the member.
For example, `expand=roleAttributes` includes `roleAttributes` field in the response.