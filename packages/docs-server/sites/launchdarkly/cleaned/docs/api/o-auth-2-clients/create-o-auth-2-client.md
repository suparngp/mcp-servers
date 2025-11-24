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
/api/v2/oauth/clients
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/oauth/clients"
4
| 
5
| payload = {}
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
[](/docs/api/o-auth-2-clients/create-o-auth-2-client?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_links": {
3
| "parent": {
4
| "href": "/api/v2/oauth/clients",
5
| "type": "application/json"
6
| },
7
| "self": {
8
| "href": "/api/v2/oauth/clients/50666563-9144-4125-b822-33f308227e45",
9
| "type": "application/json"
10
| }
11
| },
12
| "name": "string",
13
| "_accountId": "string",
14
| "_clientId": "string",
15
| "redirectUri": "string",
16
| "_creationDate": 1,
17
| "description": "string",
18
| "_clientSecret": "string"
19
| }
```
Create (register) a LaunchDarkly OAuth2 client. OAuth2 clients allow you to build custom integrations using LaunchDarkly as your identity provider.
### Authentication
Authorizationstring
API Key authentication via header
### Request
This endpoint expects an object.
namestringOptional
The name of your new LaunchDarkly OAuth 2.0 client.
redirectUristringOptional
The redirect URI for your new OAuth 2.0 application. This should be an absolute URL conforming with the standard HTTPS protocol.
descriptionstringOptional
Description of your OAuth 2.0 client.
### Response
OAuth 2.0 client response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
namestring
Client name
_accountIdstring
The account ID the client is registered under
_clientIdstring
The client's unique ID
redirectUristring
The client's redirect URI
_creationDatelong
Timestamp of client creation date
descriptionstring or null
Client description
_clientSecretstring or null
The client secret. This will only be shown upon creation.
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs