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
 * [About endpoints](#about-endpoints)
## Overview
This topic explains how to use the endpoints integration framework capability.
## About endpoints
Some capabilities require you to specify an endpoint that LaunchDarkly can make requests to. For example, you can specify an endpoint as follows:
Endpoint example
```
1
| "endpoint": {
---|--- 
2
| "url": "{{endpointUrl}}",
3
| "method": "POST",
4
| "headers": [
5
| {
6
| "name": "Content-Type",
7
| "value": "application/json"
8
| },
9
| {
10
| "name": "Authorization",
11
| "value": "Bearer {{apiToken}}"
12
| }
13
| ]
14
| },
```
This specification must include all appropriate request semantics including the URL, method, and headers.
In the example above, the properties `endpoint.url` and `endpoint.headers[].value` accept template variables. These template variables can reference any `formVariables` you’ve defined in your manifest. This lets you configure a dynamic endpoint based on the `formVariables` your integration collects from the end user. To learn more, read [Using form variables](/docs/integrations/partner-integrations/form-variables).
The templating language LaunchDarkly uses is based off of a subset of the Handlebars syntax. To learn more, read the [Handlebars documentation](https://handlebarsjs.com/).
This example uses the `endpointUrl` form variable as the URL of the endpoint and the `apiToken` as a `Bearer` token in the `Authorization` header:
Endpoint example
```
1
| "endpoint": {
---|--- 
2
| "url": "{{endpointUrl}}",
3
| "method": "POST",
4
| "headers": [
5
| {
6
| "name": "Content-Type",
7
| "value": "application/json"
8
| },
9
| {
10
| "name": "Authorization",
11
| "value": "Bearer {{apiToken}}"
12
| }
13
| ]
14
| },
```
This example uses the `apiToken` form variable as a query parameter on the URL:
Endpoint example
```
1
| "endpoint": {
---|--- 
2
| "url": "https://example.com/apiToken?={{apiToken}}",
3
| "method": "POST"
4
| },
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs