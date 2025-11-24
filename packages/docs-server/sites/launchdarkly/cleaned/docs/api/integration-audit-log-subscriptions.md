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
On this page
 * [Configuration bodies by integrationKey](#configuration-bodies-by-integrationkey)
 * [datadog](#datadog)
 * [dynatrace](#dynatrace)
 * [elastic](#elastic)
 * [honeycomb](#honeycomb)
 * [logdna](#logdna)
 * [msteams](#msteams)
 * [new-relic-apm](#new-relic-apm)
 * [signalfx](#signalfx)
 * [splunk](#splunk)
Audit log integration subscriptions allow you to send audit log events hooks to one of dozens of external tools. For example, you can send flag change event webhooks to external third party software. To learn more, read [Building your own integrations](https://launchdarkly.com/docs/integrations/building-integrations#building-your-own-integrations).
You can use the integration subscriptions API to create, delete, and manage your integration audit log subscriptions.
Each of these operations requires an `integrationKey` that refers to the type of integration. The required `config` fields to create a subscription vary depending on the `integrationKey`. You can find a full list of the fields for each integration below.
Several of these operations require a subscription ID. The subscription ID is returned as part of the [Create audit log subscription](https://launchdarkly.com/docs/api/integration-audit-log-subscriptions/create-subscription) and [Get audit log subscriptions by integration](https://launchdarkly.com/docs/api/integration-audit-log-subscriptions/get-subscriptions) responses. It is the `_id` field, or the `_id` field of each element in the `items` array.
### Configuration bodies by integrationKey
#### datadog
`apiKey` is a sensitive value.
`hostURL` must evaluate to either `"https://api.datadoghq.com"` or `"https://api.datadoghq.eu"` and will default to the former if not explicitly defined.
```
"config": { 
--- 
 "apiKey": <string, optional>, # sensitive value 
 "hostURL": <string, optional> 
} 
```
#### dynatrace
`apiToken` is a sensitive value.
`entity` must evaluate to one of the following fields and will default to `"APPLICATION"` if not explicitly defined:
Click to expand list of fields 
“APPLICATION” 
“APPLICATION_METHOD” 
“APPLICATION_METHOD_GROUP” 
“AUTO_SCALING_GROUP” 
“AUXILIARY_SYNTHETIC_TEST” 
“AWS_APPLICATION_LOAD_BALANCER” 
“AWS_AVAILABILITY_ZONE” 
“AWS_CREDENTIALS” 
“AWS_LAMBDA_FUNCTION” 
“AWS_NETWORK_LOAD_BALANCER” 
“AZURE_API_MANAGEMENT_SERVICE” 
“AZURE_APPLICATION_GATEWAY” 
“AZURE_COSMOS_DB” 
“AZURE_CREDENTIALS” 
“AZURE_EVENT_HUB” 
“AZURE_EVENT_HUB_NAMESPACE” 
“AZURE_FUNCTION_APP” 
“AZURE_IOT_HUB” 
“AZURE_LOAD_BALANCER” 
“AZURE_MGMT_GROUP” 
“AZURE_REDIS_CACHE” 
“AZURE_REGION” 
“AZURE_SERVICE_BUS_NAMESPACE” 
“AZURE_SERVICE_BUS_QUEUE” 
“AZURE_SERVICE_BUS_TOPIC” 
“AZURE_SQL_DATABASE” 
“AZURE_SQL_ELASTIC_POOL” 
“AZURE_SQL_SERVER” 
“AZURE_STORAGE_ACCOUNT” 
“AZURE_SUBSCRIPTION” 
“AZURE_TENANT” 
“AZURE_VM” 
“AZURE_VM_SCALE_SET” 
“AZURE_WEB_APP” 
“CF_APPLICATION” 
“CF_FOUNDATION” 
“CINDER_VOLUME” 
“CLOUD_APPLICATION” 
“CLOUD_APPLICATION_INSTANCE” 
“CLOUD_APPLICATION_NAMESPACE” 
“CONTAINER_GROUP” 
“CONTAINER_GROUP_INSTANCE” 
“CUSTOM_APPLICATION” 
“CUSTOM_DEVICE” 
“CUSTOM_DEVICE_GROUP” 
“DCRUM_APPLICATION” 
“DCRUM_SERVICE” 
“DCRUM_SERVICE_INSTANCE” 
“DEVICE_APPLICATION_METHOD” 
“DISK” 
“DOCKER_CONTAINER_GROUP_INSTANCE” 
“DYNAMO_DB_TABLE” 
“EBS_VOLUME” 
“EC2_INSTANCE” 
“ELASTIC_LOAD_BALANCER” 
“ENVIRONMENT” 
“EXTERNAL_SYNTHETIC_TEST_STEP” 
“GCP_ZONE” 
“GEOLOCATION” 
“GEOLOC_SITE” 
“GOOGLE_COMPUTE_ENGINE” 
“HOST” 
“HOST_GROUP” 
“HTTP_CHECK” 
“HTTP_CHECK_STEP” 
“HYPERVISOR” 
“KUBERNETES_CLUSTER” 
“KUBERNETES_NODE” 
“MOBILE_APPLICATION” 
“NETWORK_INTERFACE” 
“NEUTRON_SUBNET” 
“OPENSTACK_PROJECT” 
“OPENSTACK_REGION” 
“OPENSTACK_VM” 
“OS” 
“PROCESS_GROUP” 
“PROCESS_GROUP_INSTANCE” 
“RELATIONAL_DATABASE_SERVICE” 
“SERVICE” 
“SERVICE_INSTANCE” 
“SERVICE_METHOD” 
“SERVICE_METHOD_GROUP” 
“SWIFT_CONTAINER” 
“SYNTHETIC_LOCATION” 
“SYNTHETIC_TEST” 
“SYNTHETIC_TEST_STEP” 
“VIRTUALMACHINE” 
“VMWARE_DATACENTER”
```
"config": { 
--- 
 "apiToken": <string, required>, 
 "url": <string, required>, 
 "entity": <string, optional> 
} 
```
#### elastic
`token` is a sensitive field.
```
"config": { 
--- 
 "url": <string, required>, 
 "token": <string, required>, 
 "index": <string, required> 
} 
```
#### honeycomb
`apiKey` is a sensitive field.
```
"config": { 
--- 
 "datasetName": <string, required>, 
 "apiKey": <string, required> 
} 
```
#### logdna
`ingestionKey` is a sensitive field.
```
"config": { 
--- 
 "ingestionKey": <string, required>, 
 "level": <string, optional> 
} 
```
#### msteams
```
"config": { 
--- 
 "url": <string, required> 
} 
```
#### new-relic-apm
`apiKey` is a sensitive field.
`domain` must evaluate to either `"api.newrelic.com"` or `"api.eu.newrelic.com"` and will default to the former if not explicitly defined.
```
"config": { 
--- 
 "apiKey": <string, required>, 
 "applicationId": <string, required>, 
 "domain": <string, optional> 
} 
```
#### signalfx
`accessToken` is a sensitive field.
```
"config": { 
--- 
 "accessToken": <string, required>, 
 "realm": <string, required> 
} 
```
#### splunk
`token` is a sensitive field.
```
"config": { 
--- 
 "base-url": <string, required>, 
 "token": <string, required>, 
 "skip-ca-verification": <boolean, required> 
} 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs