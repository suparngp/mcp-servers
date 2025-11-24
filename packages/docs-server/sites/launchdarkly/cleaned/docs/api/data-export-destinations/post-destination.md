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
/api/v2/destinations/:projectKey/:environmentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/destinations/projectKey/environmentKey"
4
| 
5
| payload = {
6
| "kind": "google-pubsub",
7
| "config": None
8
| }
9
| headers = {
10
| "Authorization": "<apiKey>",
11
| "Content-Type": "application/json"
12
| }
13
| 
14
| response = requests.post(url, json=payload, headers=headers)
15
| 
16
| print(response.json())
```
[](/docs/api/data-export-destinations/post-destination?explorer=true)
201Created
```
1
| {
---|--- 
2
| "_id": "610addeadbeefaa86ec9a7d4",
3
| "_links": {
4
| "parent": {
5
| "href": "/api/v2/destinations",
6
| "type": "application/json"
7
| },
8
| "self": {
9
| "href": "/api/v2/destinations/my-project/my-environment/610addeadbeefaa86ec9a7d4",
10
| "type": "application/json"
11
| }
12
| },
13
| "name": "example-destination",
14
| "kind": "google-pubsub",
15
| "version": 1,
16
| "config": null,
17
| "on": true,
18
| "_access": {
19
| "denied": [
20
| {
21
| "action": "string",
22
| "reason": {
23
| "effect": "allow",
24
| "resources": [
25
| "proj/*:env/*;qa_*:/flag/*"
26
| ],
27
| "notResources": [
28
| "string"
29
| ],
30
| "actions": [
31
| "*"
32
| ],
33
| "notActions": [
34
| "string"
35
| ],
36
| "role_name": "string"
37
| }
38
| }
39
| ],
40
| "allowed": [
41
| {
42
| "action": "string",
43
| "reason": {
44
| "effect": "allow",
45
| "resources": [
46
| "proj/*:env/*;qa_*:/flag/*"
47
| ],
48
| "notResources": [
49
| "string"
50
| ],
51
| "actions": [
52
| "*"
53
| ],
54
| "notActions": [
55
| "string"
56
| ],
57
| "role_name": "string"
58
| }
59
| }
60
| ]
61
| }
62
| }
```
Create a new Data Export destination. In the `config` request body parameter, the fields required depend on the type of Data Export destination. <details> <summary>Click to expand <code>config</code> parameter details</summary> #### Azure Event Hubs To create a Data Export destination with a `kind` of `azure-event-hubs`, the `config` object requires the following fields: * `namespace`: The Event Hub Namespace name * `name`: The Event Hub name * `policyName`: The shared access signature policy name. You can find your policy name in the settings of your Azure Event Hubs Namespace. * `policyKey`: The shared access signature key. You can find your policy key in the settings of your Azure Event Hubs Namespace. #### Google Cloud Pub/Sub To create a Data Export destination with a `kind` of `google-pubsub`, the `config` object requires the following fields: * `project`: The Google PubSub project ID for the project to publish to * `topic`: The Google PubSub topic ID for the topic to publish to #### Amazon Kinesis To create a Data Export destination with a `kind` of `kinesis`, the `config` object requires the following fields: * `region`: The Kinesis stream's AWS region key * `roleArn`: The Amazon Resource Name (ARN) of the AWS role that will be writing to Kinesis * `streamName`: The name of the Kinesis stream that LaunchDarkly is sending events to. This is not the ARN of the stream. #### mParticle To create a Data Export destination with a `kind` of `mparticle`, the `config` object requires the following fields: * `apiKey`: The mParticle API key * `secret`: The mParticle API secret * `userIdentity`: The type of identifier you use to identify your end users in mParticle * `anonymousUserIdentity`: The type of identifier you use to identify your anonymous end users in mParticle #### Segment To create a Data Export destination with a `kind` of `segment`, the `config` object requires the following fields: * `writeKey`: The Segment write key. This is used to authenticate LaunchDarkly's calls to Segment. #### Snowflake To create a Data Export destination with a `kind` of `snowflake-v2`, the `config` object requires the following fields: * `publicKey`: The `publicKey` is returned as part of the [Generate Snowflake destination key pair](https://launchdarkly.com/docs/api/data-export-destinations/post-generate-warehouse-destination-key-pair) response. It is the `public_key` field. * `snowflakeHostAddress`: Your Snowflake account URL. </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Request
This endpoint expects an object.
namestringOptional
A human-readable name for your Data Export destination
kindenumOptional
The type of Data Export destination
Show 9 enum values
configanyOptional
An object with the configuration parameters required for the destination type
onbooleanOptional
Whether the export is on. Displayed as the integration status in the LaunchDarkly UI.
### Response
Destination response
_idstring or null
The ID of this Data Export destination
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
namestring or null
A human-readable name for your Data Export destination
kindenum or null
The type of Data Export destination
Show 9 enum values
versiondouble or null
configany or null
An object with the configuration parameters required for the destination type
onboolean or null
Whether the export is on, that is, the status of the integration
_accessobject or null
Details on the allowed and denied actions for this Data Export destination
Show 2 properties
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
Create a new Data Export destination.
In the `config` request body parameter, the fields required depend on the type of Data Export destination.
Click to expand `config` parameter details
#### Azure Event Hubs
To create a Data Export destination with a `kind` of `azure-event-hubs`, the `config` object requires the following fields:
 * `namespace`: The Event Hub Namespace name
 * `name`: The Event Hub name
 * `policyName`: The shared access signature policy name. You can find your policy name in the settings of your Azure Event Hubs Namespace.
 * `policyKey`: The shared access signature key. You can find your policy key in the settings of your Azure Event Hubs Namespace.
#### Google Cloud Pub/Sub
To create a Data Export destination with a `kind` of `google-pubsub`, the `config` object requires the following fields:
 * `project`: The Google PubSub project ID for the project to publish to
 * `topic`: The Google PubSub topic ID for the topic to publish to
#### Amazon Kinesis
To create a Data Export destination with a `kind` of `kinesis`, the `config` object requires the following fields:
 * `region`: The Kinesis stream’s AWS region key
 * `roleArn`: The Amazon Resource Name (ARN) of the AWS role that will be writing to Kinesis
 * `streamName`: The name of the Kinesis stream that LaunchDarkly is sending events to. This is not the ARN of the stream.
#### mParticle
To create a Data Export destination with a `kind` of `mparticle`, the `config` object requires the following fields:
 * `apiKey`: The mParticle API key
 * `secret`: The mParticle API secret
 * `userIdentity`: The type of identifier you use to identify your end users in mParticle
 * `anonymousUserIdentity`: The type of identifier you use to identify your anonymous end users in mParticle
#### Segment
To create a Data Export destination with a `kind` of `segment`, the `config` object requires the following fields:
 * `writeKey`: The Segment write key. This is used to authenticate LaunchDarkly’s calls to Segment.
#### Snowflake
To create a Data Export destination with a `kind` of `snowflake-v2`, the `config` object requires the following fields:
 * `publicKey`: The `publicKey` is returned as part of the [Generate Snowflake destination key pair](https://launchdarkly.com/docs/api/data-export-destinations/post-generate-warehouse-destination-key-pair) response. It is the `public_key` field.
 * `snowflakeHostAddress`: Your Snowflake account URL.