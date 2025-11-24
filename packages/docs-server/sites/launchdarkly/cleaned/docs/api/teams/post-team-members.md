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
/api/v2/teams/:teamKey/members
cURL
```
1
| curl -X POST https://app.launchdarkly.com/api/v2/teams/teamKey/members \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: multipart/form-data" \
4
| -F file=@<file1>
```
[](/docs/api/teams/post-team-members?explorer=true)
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
| "status": "error",
5
| "value": "new-team-member@acme.com",
6
| "message": "string"
7
| }
8
| ]
9
| }
```
Add multiple members to an existing team by uploading a CSV file of member email addresses. Your CSV file must include email addresses in the first column. You can include data in additional columns, but LaunchDarkly ignores all data outside the first column. Headers are optional. To learn more, read [Manage team members](https://launchdarkly.com/docs/home/account/manage-teams#manage-team-members). **Members are only added on a `201` response.** A `207` indicates the CSV file contains a combination of valid and invalid entries. A `207` results in no members being added to the team. On a `207` response, if an entry contains bad input, the `message` field contains the row number as well as the reason for the error. The `message` field is omitted if the entry is valid. Example `207` response: ```json { "items": [ { "status": "success", "value": "new-team-member@acme.com" }, { "message": "Line 2: empty row", "status": "error", "value": "" }, { "message": "Line 3: email already exists in the specified team", "status": "error", "value": "existing-team-member@acme.com" }, { "message": "Line 4: invalid email formatting", "status": "error", "value": "invalid email format" } ] } ``` Message | Resolution --- | --- Empty row | This line is blank. Add an email address and try again. Duplicate entry | This email address appears in the file twice. Remove the email from the file and try again. Email already exists in the specified team | This member is already on your team. Remove the email from the file and try again. Invalid formatting | This email address is not formatted correctly. Fix the formatting and try again. Email does not belong to a LaunchDarkly member | The email address doesn't belong to a LaunchDarkly account member. Invite them to LaunchDarkly, then re-add them to the team. On a `400` response, the `message` field may contain errors specific to this endpoint. Example `400` response: ```json { "code": "invalid_request", "message": "Unable to process file" } ``` Message | Resolution --- | --- Unable to process file | LaunchDarkly could not process the file for an unspecified reason. Review your file for errors and try again. File exceeds 25mb | Break up your file into multiple files of less than 25mbs each. All emails have invalid formatting | None of the email addresses in the file are in the correct format. Fix the formatting and try again. All emails belong to existing team members | All listed members are already on this team. Populate the file with member emails that do not belong to the team and try again. File is empty | The CSV file does not contain any email addresses. Populate the file and try again. No emails belong to members of your LaunchDarkly organization | None of the email addresses belong to members of your LaunchDarkly account. Invite these members to LaunchDarkly, then re-add them to the team. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
teamKeystringRequired`format: "string"`
The team key
### Request
This endpoint expects a multipart form containing an optional file.
filefileOptional
CSV file containing email addresses
### Response
201
Team member imports response
itemslist of objects or null
An array of details about the members requested to be added to this team
Show 3 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
405
Method Not Allowed Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Add multiple members to an existing team by uploading a CSV file of member email addresses. Your CSV file must include email addresses in the first column. You can include data in additional columns, but LaunchDarkly ignores all data outside the first column. Headers are optional. To learn more, read [Manage team members](https://launchdarkly.com/docs/home/account/manage-teams#manage-team-members).
**Members are only added on a`201` response.** A `207` indicates the CSV file contains a combination of valid and invalid entries. A `207` results in no members being added to the team.
On a `207` response, if an entry contains bad input, the `message` field contains the row number as well as the reason for the error. The `message` field is omitted if the entry is valid.
Example `207` response:
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "status": "success",
5
| "value": "new-team-member@acme.com"
6
| },
7
| {
8
| "message": "Line 2: empty row",
9
| "status": "error",
10
| "value": ""
11
| },
12
| {
13
| "message": "Line 3: email already exists in the specified team",
14
| "status": "error",
15
| "value": "existing-team-member@acme.com"
16
| },
17
| {
18
| "message": "Line 4: invalid email formatting",
19
| "status": "error",
20
| "value": "invalid email format"
21
| }
22
| ]
23
| }
```
Message | Resolution 
---|--- 
Empty row | This line is blank. Add an email address and try again. 
Duplicate entry | This email address appears in the file twice. Remove the email from the file and try again. 
Email already exists in the specified team | This member is already on your team. Remove the email from the file and try again. 
Invalid formatting | This email address is not formatted correctly. Fix the formatting and try again. 
Email does not belong to a LaunchDarkly member | The email address doesn’t belong to a LaunchDarkly account member. Invite them to LaunchDarkly, then re-add them to the team. 
On a `400` response, the `message` field may contain errors specific to this endpoint.
Example `400` response:
```
1
| {
---|--- 
2
| "code": "invalid_request",
3
| "message": "Unable to process file"
4
| }
```
Message | Resolution 
---|--- 
Unable to process file | LaunchDarkly could not process the file for an unspecified reason. Review your file for errors and try again. 
File exceeds 25mb | Break up your file into multiple files of less than 25mbs each. 
All emails have invalid formatting | None of the email addresses in the file are in the correct format. Fix the formatting and try again. 
All emails belong to existing team members | All listed members are already on this team. Populate the file with member emails that do not belong to the team and try again. 
File is empty | The CSV file does not contain any email addresses. Populate the file and try again. 
No emails belong to members of your LaunchDarkly organization | None of the email addresses belong to members of your LaunchDarkly account. Invite these members to LaunchDarkly, then re-add them to the team.