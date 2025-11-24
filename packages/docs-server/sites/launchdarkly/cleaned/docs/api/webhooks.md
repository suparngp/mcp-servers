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
 * [Designating the payload](#designating-the-payload)
 * [Webhook delivery order](#webhook-delivery-order)
 * [Signing the webhook](#signing-the-webhook)
 * [Understanding connection retries](#understanding-connection-retries)
The webhooks API lets you build your own integrations that subscribe to activities in LaunchDarkly. When you generate an activity in LaunchDarkly, such as when you change a flag or you create a project, LaunchDarkly sends an HTTP POST payload to the webhook’s URL. Use webhooks to update external issue trackers, update support tickets, notify customers of new feature rollouts, and more.
Several of the endpoints in the webhooks API require a webhook ID. The webhook ID is returned as part of the [Creates a webhook](https://launchdarkly.com/docs/api/webhooks/post-webhook) and [List webhooks](https://launchdarkly.com/docs/api/webhooks/get-all-webhooks) responses. It is the `_id` field, or the `_id` field of each element in the `items` array.
## Designating the payload
The webhook payload is identical to an audit log entry. To learn more, read [Get audit log entry](https://launchdarkly.com/docs/api/audit-log/get-audit-log-entry).
Here’s a sample payload:
> ### Webhook delivery order
> Webhooks may not be delivered in chronological order. We recommend using the payload’s “date” field as a timestamp to reorder webhooks as they are received.
```
1
| {
---|--- 
2
| "_links": {
3
| "canonical": {
4
| "href": "/api/v2/projects/alexis/environments/test",
5
| "type": "application/json"
6
| },
7
| "parent": {
8
| "href": "/api/v2/auditlog",
9
| "type": "application/json"
10
| },
11
| "self": {
12
| "href": "/api/v2/auditlog/57c0a8e29969090743529965",
13
| "type": "application/json"
14
| },
15
| "site": {
16
| "href": "/settings#/projects",
17
| "type": "text/html"
18
| }
19
| },
20
| "_id": "57c0a8e29969090743529965",
21
| "date": 1472243938774,
22
| "accesses": [
23
| {
24
| "action": "updateName",
25
| "resource": "proj/alexis:env/test"
26
| }
27
| ],
28
| "kind": "environment",
29
| "name": "Testing",
30
| "description": "- Changed the name from ~~Test~~ to *Testing*",
31
| "member": {
32
| "_links": {
33
| "parent": {
34
| "href": "/internal/account/members",
35
| "type": "application/json"
36
| },
37
| "self": {
38
| "href": "/internal/account/members/548f6741c1efad40031b18ae",
39
| "type": "application/json"
40
| }
41
| },
42
| "_id": "548f6741c1efad40031b18ae",
43
| "email": "ariel@acme.com",
44
| "firstName": "Ariel",
45
| "lastName": "Flores"
46
| },
47
| "titleVerb": "changed the name of",
48
| "title": "[Ariel Flores](mailto:ariel@acme.com) changed the name of [Testing](https://app.launchdarkly.com/settings#/projects)",
49
| "target": {
50
| "_links": {
51
| "canonical": {
52
| "href": "/api/v2/projects/alexis/environments/test",
53
| "type": "application/json"
54
| },
55
| "site": {
56
| "href": "/settings#/projects",
57
| "type": "text/html"
58
| }
59
| },
60
| "name": "Testing",
61
| "resources": ["proj/alexis:env/test"]
62
| }
63
| }
```
## Signing the webhook
Optionally, you can define a `secret` when you create a webhook. If you define the secret, the webhook `POST` request will include an `X-LD-Signature header`, whose value will contain an HMAC SHA256 hex digest of the webhook payload, using the `secret` as the key.
Compute the signature of the payload using the same shared secret in your code to verify that the webhook was triggered by LaunchDarkly.
## Understanding connection retries
If LaunchDarkly receives a non-`2xx` response to a webhook `POST`, it will retry the delivery one time. Webhook delivery is not guaranteed. If you build an integration on webhooks, make sure it is tolerant of delivery failures.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs