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
/api/v2/projects/:projectKey/release-pipelines/:pipelineKey/releases
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/release-pipelines/pipelineKey/releases"
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
[](/docs/api/release-pipelines-beta/get-all-release-progressions-for-release-pipeline?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "activeCount": 3,
3
| "completedCount": 1,
4
| "items": [
5
| {
6
| "_createdAt": 1,
7
| "flagKey": "flag-key-123abc",
8
| "_links": {},
9
| "_completedAt": 1,
10
| "activePhaseId": "1234a56b7c89d012345e678f"
11
| }
12
| ],
13
| "phases": [
14
| {
15
| "_id": "1234a56b7c89d012345e678f",
16
| "name": "Phase 1 - Testing",
17
| "releaseCount": 2
18
| }
19
| ],
20
| "totalCount": 8,
21
| "_links": {}
22
| }
```
Get details on the progression of all releases, across all flags, for a release pipeline
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
pipelineKeystringRequired`format: "string"`
The pipeline key
### Query Parameters
filterstringOptional`format: "string"`
Accepts filter by `status` and `activePhaseId`. `status` can take a value of `completed` or `active`. `activePhaseId` takes a UUID and will filter results down to releases active on the specified phase. Providing `status equals completed` along with an `activePhaseId` filter will return an error as they are disjoint sets of data. The combination of `status equals active` and `activePhaseId` will return the same results as `activePhaseId` alone.
limitlongOptional
The maximum number of items to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
### Response
Release progression collection
activeCountinteger
The number of active releases
completedCountinteger
The number of completed releases
itemslist of objects
A list of details for each release, across all flags, for this release pipeline
Show 5 properties
phaseslist of objects
A list of details for each phase, across all releases, for this release pipeline
Show 3 properties
totalCountinteger
The total number of releases for this release pipeline
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
### Errors
404
Not Found Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Accepts filter by `status` and `activePhaseId`. `status` can take a value of `completed` or `active`. `activePhaseId` takes a UUID and will filter results down to releases active on the specified phase. Providing `status equals completed` along with an `activePhaseId` filter will return an error as they are disjoint sets of data. The combination of `status equals active` and `activePhaseId` will return the same results as `activePhaseId` alone.