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
/api/v2/projects/:projectKey/layers/:layerKey
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/projects/projectKey/layers/layerKey \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '{
5
| "instructions": [
6
| {
7
| "experimentKey": "checkout-button-color",
8
| "kind": "updateExperimentReservation",
9
| "reservationPercent": 25
10
| }
11
| ],
12
| "comment": "Example comment describing the update",
13
| "environmentKey": "production"
14
| }'
```
[](/docs/api/layers/update-layer?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "key": "checkout-flow",
3
| "name": "Checkout Flow",
4
| "description": "The checkout flow for the application",
5
| "createdAt": 1,
6
| "randomizationUnit": "user",
7
| "environments": {}
8
| }
```
Update a layer by adding, changing, or removing traffic reservations for experiments, or by changing layer name or description. Updating a layer uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating layers. <details> <summary>Click to expand instructions for <strong>updating layers</strong></summary> #### updateName Updates the layer name. ##### Parameters - `name`: The new layer name. Here's an example: ```json { "instructions": [{ "kind": "updateName", "name": "New name" }] } ``` #### updateDescription Updates the layer description. ##### Parameters - `description`: The new description. Here's an example: ```json { "instructions": [{ "kind": "updateDescription", "description": "New description" }] } ``` #### updateExperimentReservation Adds or updates a traffic reservation for an experiment in a layer. ##### Parameters - `experimentKey`: The key of the experiment whose reservation you are adding to or updating in the layer. - `reservationPercent`: The amount of traffic in the layer to reserve. Must be an integer. Zero is allowed until iteration start. Here's an example: ```json { "environmentKey": "production", "instructions": [{ "kind": "updateExperimentReservation", "experimentKey": "exp-key", "reservationPercent": 10 }] } ``` #### removeExperiment Removes a traffic reservation for an experiment from a layer. ##### Parameters - `experimentKey`: The key of the experiment whose reservation you want to remove from the layer. Here's an example: ```json { "environmentKey": "production", "instructions": [{ "kind": "removeExperiment", "experimentKey": "exp-key" }] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
layerKeystringRequired`format: "string"`
The layer key
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
The instructions to perform when updating. This should be an array with objects that look like <code>{“kind”: “update_action”}</code>. Some instructions also require a <code>value</code> field in the array element.
commentstringOptional
Optional comment describing the update
environmentKeystringOptional
The environment key used for making environment specific updates. For example, updating the reservation of an experiment
### Response
Layer response
keystring
The key of the layer
namestring
The name of the layer
descriptionstring
The description of the layer
createdAtlong
The date and time when the layer was created
randomizationUnitstring or null
The unit of randomization for the layer
environmentsmap from strings to objects or null
The layer configurations for each requested environment
Show 1 properties
### Errors
400
Bad Request Error
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
Update a layer by adding, changing, or removing traffic reservations for experiments, or by changing layer name or description. Updating a layer uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating layers.
Click to expand instructions for **updating layers**
#### updateName
Updates the layer name.
##### Parameters
 * `name`: The new layer name.
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
| "name": "New name"
5
| }]
6
| }
```
#### updateDescription
Updates the layer description.
##### Parameters
 * `description`: The new description.
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
| "description": "New description"
5
| }]
6
| }
```
#### updateExperimentReservation
Adds or updates a traffic reservation for an experiment in a layer.
##### Parameters
 * `experimentKey`: The key of the experiment whose reservation you are adding to or updating in the layer.
 * `reservationPercent`: The amount of traffic in the layer to reserve. Must be an integer. Zero is allowed until iteration start.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "production",
3
| "instructions": [{
4
| "kind": "updateExperimentReservation",
5
| "experimentKey": "exp-key",
6
| "reservationPercent": 10
7
| }]
8
| }
```
#### removeExperiment
Removes a traffic reservation for an experiment from a layer.
##### Parameters
 * `experimentKey`: The key of the experiment whose reservation you want to remove from the layer.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "production",
3
| "instructions": [{
4
| "kind": "removeExperiment",
5
| "experimentKey": "exp-key"
6
| }]
7
| }
```