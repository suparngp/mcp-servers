`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Integrations](/docs/integrations)
 * [Collaboration tools](/docs/integrations/collaboration)
 * [Data Export](/docs/integrations/data-export)
 * [Edge tools](/docs/integrations/edge)
 * [Environments as a service](/docs/integrations/eaas)
 * [Experimentation and metric integrations](/docs/integrations/experimentation)
 * [IDE connectors](/docs/integrations/ide)
 * [Internal developer platforms](/docs/integrations/idp)
 * [Observability tools](/docs/integrations/observability)
 * [Segments integrations](/docs/integrations/segments)
 * [Workflow management tools](/docs/integrations/workflow)
 * [More integrations](/docs/integrations/more)
 * [Managing integrations](/docs/integrations/managing)
 * [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations)
 * [Building partner integrations](/docs/integrations/partner-integrations)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [About the change history events hook](#about-the-change-history-events-hook)
 * [The endpoint property](#the-endpoint-property)
 * [The templates property](#the-templates-property)
 * [The default policy property](#the-default-policy-property)
 * [The include error response body property](#the-include-error-response-body-property)
 * [Previewing your webhook](#previewing-your-webhook)
##### The LaunchDarkly change history used to be called the audit log
The LaunchDarkly change history event hook integration used to be called the audit log event hook integration, and still references the `auditLogEventsHook`.
## Overview
This topic explains how to use the change history events hook integration framework capability.
## About the change history events hook
A change history events hook is a webhook that LaunchDarkly sends whenever an event happens inside of LaunchDarkly. Each of these events results in an event being published to LaunchDarkly’s change history. You can use this capability to send data to or trigger an event in another service.
The `auditLogEventsHook` has four properties:
 * [`endpoint`](/docs/integrations/partner-integrations/audit-log#the-endpoint-property): The HTTP handler that will receive the webhook.
 * [`templates`](/docs/integrations/partner-integrations/audit-log#the-templates-property): A map of template paths relative to your integration’s directory. You can use templates to transform the raw change history events to a format that your integration expects. These templates can be any file type.
 * [`defaultPolicy`](/docs/integrations/partner-integrations/audit-log#the-default-policy-property): An array of LaunchDarkly policies. The policies determine which events to send to your webhook endpoint. To learn more, read [Using policies](/docs/home/account/roles/role-policies).
 * [`includeErrorResponseBody`](/docs/integrations/partner-integrations/audit-log#the-include-error-response-body-property) (optional): Lets you to view any errors LaunchDarkly receives when it sends events to your endpoint.
Here’s an example of a change history events hook capability that subscribes to flag events in a LaunchDarkly account:
Subscribes to flag events
```
1
| "capabilities": {
---|--- 
2
| "auditLogEventsHook": {
3
| "includeErrorResponseBody": false,
4
| "endpoint": {
5
| "url": "{{endpointUrl}}",
6
| "method": "POST",
7
| "headers": [
8
| {
9
| "name": "Content-Type",
10
| "value": "application/json"
11
| },
12
| {
13
| "name": "Authorization",
14
| "value": "Bearer {{apiToken}}"
15
| }
16
| ]
17
| },
18
| "templates": {
19
| "flag": "templates/flag.json"
20
| },
21
| "defaultPolicy": [
22
| {
23
| "effect": "allow",
24
| "actions": ["*"],
25
| "resources": ["proj/*:env/production:flag/*"]
26
| }
27
| ]
28
| }
29
| }
```
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/openapi-logo.svg)
You can also use the REST API: [Integration audit log subscriptions](/docs/api/integration-audit-log-subscriptions)
### The endpoint property
Every `auditLogEventsHook` capability must specify the endpoint LaunchDarkly should send webhook data to. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
### The templates property
Before the `auditLogEventsHook` capability sends the request to the endpoint handling your webhook, you can transform the body of the request it sends to your handler.
In your manifest, you can specify `templates` to execute when webhook events are of kinds `flag`, `project`, and `environment`. Additionally, you can specify a `default` template as a catch-all for any event without a more specific template. You can also specify a `validation` template to provide members with the ability to validate their connection by sending a test event from LaunchDarkly to your service.
Here is an example:
Specifies a template
```
1
| "templates": {
---|--- 
2
| "default": "templates/default.json.hbs",
3
| "flag": "templates/flag.json.hbs",
4
| "project": "templates/project.json.hbs",
5
| "environment": "templates/environment.json.hbs",
6
| "validation": "templates/default.json.hbs"
7
| },
```
If you don’t provide one or more templates, LaunchDarkly sends you a default JSON payload that looks like this:
Default payload
```
1
| {
---|--- 
2
| "_links": {
3
| "canonical": {
4
| "href": "/api/v2/flags/always-snippet/example-test",
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
| "href": "/api/v2/auditlog/5defebd006121dd9f7ea90d0",
13
| "type": "application/json"
14
| },
15
| "site": {
16
| "href": "/always-snippet/production/features/example-test",
17
| "type": "text/html"
18
| }
19
| },
20
| "_id": "5defebd006121dd9f7ea90d0",
21
| "_accountId": "",
22
| "timestamp": {
23
| "milliseconds": 1580778134028,
24
| "seconds": 1580778134,
25
| "rfc3339": "2020-02-04T01:02:14Z",
26
| "simple": "2020-02-04 01:02:14"
27
| },
28
| "kind": "flag",
29
| "name": "Example test",
30
| "description": "",
31
| "shortDescription": "",
32
| "comment": "This is just a test",
33
| "member": {
34
| "_links": {
35
| "parent": {
36
| "href": "/api/v2/members",
37
| "type": "application/json"
38
| },
39
| "self": {
40
| "href": "/api/v2/members/569f514183f2164430000002",
41
| "type": "application/json"
42
| }
43
| },
44
| "_id": "569f514183f2164430000002",
45
| "email": "sandy@example.com",
46
| "firstName": "Sandy",
47
| "lastName": "Smith"
48
| },
49
| "titleVerb": "",
50
| "markdownTitle": "[Sandy Smith](mailto:sandy@example.com) turned on the flag [Example test](https://app.launchdarkly.com/example-project/production/features/example-test) in `Production`",
51
| "title": "Henrietta Powell turned on the flag Example test in 'Production'",
52
| "target": {
53
| "_links": null,
54
| "name": ""
55
| }
56
| }
```
If you choose to provide one or more templates, LaunchDarkly renders your template using the context data above. Your template can be any text-based format, but you must specify the appropriate `Content-Type` header in your `endpoint.headers` property to match the content type of your template body.
LaunchDarkly uses a basic subset of the Handlebars template syntax to render your template. To learn more about Handlebars syntax, read the [Handlebars Language Guide](https://handlebarsjs.com/guide/).
In addition to the basic language syntax, LaunchDarkly supports the following built-in helpers:
 * `if`
 * `unless`
 * `each`
 * `with`
 * `lookup`
To learn more, read [Built-in Helpers](https://handlebarsjs.com/guide/builtin-helpers.html).
LaunchDarkly also supports the following custom helpers:
 * `equal`: renders a block if the string version of both arguments are equal
 * `pathEncode`: URL path encodes the string version of the argument
 * `queryEncode`: URL query encodes the string version of the argument
 * `basicAuthHeaderValue`: transforms `username` and `password` arguments into the `Authorization` header value required for a basic auth, including the `Basic ` prefix
 * `formatWithOffset`: adds an offset in seconds to a Unix milliseconds timestamp and formats the timestamp using one of the supported formats detailed below
LaunchDarkly supports the following timestamp formats:
 * `milliseconds`: Unix milliseconds
 * `seconds`: Unix seconds
 * `rfc3339`: [RFC3339 format](https://datatracker.ietf.org/doc/html/rfc3339), for example, `2020-02-04T01:02:14Z`
 * `simple`: timestamp string formatted as `yyyy-mm-dd h:MM:ss`, for example, `2020-02-04 01:03:59`
To test your templates, you can run `npm run preview $INTEGRATION_NAME` or use the [Handlebars Sandbox](http://tryhandlebarsjs.com/).
### The default policy property
People who use your integration can specify an array of LaunchDarkly policies to filter which events to send to your webhook endpoint. To learn more, read [Using policies](/docs/home/account/roles/role-policies).
To simplify onboarding your integration, you can specify a default policy which follows best practices for your integration’s use case.
Assuming your integration only cares about flag activity, we recommend the following default policy. This policy specifies that LaunchDarkly will notify your integration of all flag activity across production environments from all projects.
Here is the policy:
Default policy
```
1
| "defaultPolicy": [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["*"],
5
| "resources": ["proj/*:env/production:flag/*"]
6
| }
7
| ]
```
### The include error response body property
A static domain is one in which the domain part of the endpoint is not a template variable. For endpoints defined with static domains, you can specify the optional property `includeErrorResponseBody` in your `auditLogEventsHook` configuration to view any errors LaunchDarkly receives when it sends events to your endpoint. This is particularly useful for members troubleshooting issues with their integration.
Here is an example:
Includes error response body
```
1
| "includeErrorResponseBody": true,
---|--- 
2
| "endpoint": {
3
| "url": "https://static-domain.com/apiToken?={{apiToken}}",
4
| "method": "POST"
5
| },
```
## Previewing your webhook
To preview your integration’s templates with sample data, run `npm run preview $INTEGRATION_NAME`.
Alternatively, to produce a sample `curl` command, run `npm run curl $INTEGRATION_NAME`. This returns data with your integration’s service as if it was sent by the change history event hook capability.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs