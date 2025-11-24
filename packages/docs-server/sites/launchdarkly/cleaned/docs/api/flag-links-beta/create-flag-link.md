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
/api/v2/flag-links/projects/:projectKey/flags/:featureFlagKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/flag-links/projects/projectKey/flags/featureFlagKey"
4
| 
5
| payload = {
6
| "key": "flag-link-key-123abc",
7
| "deepLink": "https://example.com/archives/123123123",
8
| "title": "Example link title",
9
| "description": "Example link description"
10
| }
11
| headers = {
12
| "Authorization": "<apiKey>",
13
| "Content-Type": "application/json"
14
| }
15
| 
16
| response = requests.post(url, json=payload, headers=headers)
17
| 
18
| print(response.json())
```
[](/docs/api/flag-links-beta/create-flag-link?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_links": {},
3
| "_id": "1234a56b7c89d012345e678f",
4
| "_deepLink": "https://example.com/archives/123123123",
5
| "_timestamp": {
6
| "milliseconds": 1,
7
| "seconds": 1,
8
| "rfc3339": "string",
9
| "simple": "string"
10
| },
11
| "_createdAt": 1,
12
| "_key": "flag-link-key-123abc",
13
| "_integrationKey": "string",
14
| "title": "Example link title",
15
| "description": "Example link description",
16
| "_metadata": {},
17
| "_member": {
18
| "_links": {},
19
| "_id": "string",
20
| "firstName": "string",
21
| "lastName": "string"
22
| }
23
| }
```
Create a new flag link. Flag links let you reference external resources and associate them with your flags.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
featureFlagKeystringRequired`format: "string"`
The feature flag key
### Request
This endpoint expects an object.
keystringOptional
The flag link key
integrationKeystringOptional
The integration key for an integration whose `manifest.json` includes the `flagLink` capability, if this is a flag link for an existing integration. Do not include for URL flag links.
timestamplongOptional
The time, in Unix milliseconds, to mark this flag link as associated with the external URL. If omitted, defaults to the creation time of this flag link.
deepLinkstringOptional
The URL for the external resource you are linking the flag to
titlestringOptional
The title of the flag link
descriptionstringOptional
The description of the flag link
metadatamap from strings to stringsOptional
The metadata required by this integration in order to create a flag link, if this is a flag link for an existing integration. Defined in the integration’s `manifest.json` file under `flagLink`.
### Response
Flag link response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The ID of this flag link
_deepLinkstring
The URL for the external resource the flag is linked to
_timestampobject
The time to mark this flag link as associated with the external URL. Defaults to the creation time of the flag link, but can be set to another time during creation.
Show 4 properties
_createdAtlong
Timestamp of when the flag link was created
_keystring or null
The flag link key
_integrationKeystring or null
The integration key for an integration whose `manifest.json` includes the `flagLink` capability, if this is a flag link for an existing integration
titlestring or null
The title of the flag link
descriptionstring or null
The description of the flag link
_metadatamap from strings to strings or null
The metadata required by this integration in order to create a flag link, if this is a flag link for an existing integration. Defined in the integration’s `manifest.json` file under `flagLink`.
_memberobject or null
Details on the member associated with this flag link
Show 4 properties
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