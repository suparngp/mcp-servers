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
 * [About feature stores](#about-feature-stores)
 * [The feature store request property](#the-feature-store-request-property)
 * [The validation request property](#the-validation-request-property)
## Overview
This topic explains how to use the feature stores integration framework capability.
## About feature stores
Feature stores let LaunchDarkly write feature flag data to a given provider. To learn more, read [Persistent data stores](/docs/sdk/concepts/data-stores).
The feature store capability lets you to specify an endpoint that can receive a payload containing up-to-date flag data from LaunchDarkly.
In addition to `formVariables`, the `featureStore` has two properties:
 * [`featureStoreRequest`](/docs/integrations/partner-integrations/feature-stores#the-feature-store-request-property)
 * (optional) [`validationRequest`](/docs/integrations/partner-integrations/feature-stores#the-validation-request-property)
To learn more about form variables, read [Using form variables](/docs/integrations/partner-integrations/form-variables).
### The feature store request property
This specifies the request `endpoint` that LaunchDarkly makes when flag data is updated. You can do this using an `endpoint` and a `parser`. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
In addition to the form variables defined in your manifest, you can use the special variable `_featureStoreKey`. `_featureStoreKey` is provided by LaunchDarkly, and is unique per environment.
### The validation request property
Specifying an optional validation request lets members verify that they have properly filled out the details to correctly make a request.
The `parser` object lets LaunchDarkly interpret the response of the validation request. It allows a mapping of success and errors for the given response body of the request in the form of a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). The `parser` object has two properties: a required `success` and an optional `error`.
Here is an example `parser` object:
A parser object
```
1
| "parser": {
---|--- 
2
| "success": "/success",
3
| "error": "/error"
4
| },
```
Choose an endpoint with a response that will indicate that the specified form variables are correct, but has no side effects.
Here is an example `featureStore` capability:
The featureStore capability
```
1
| "featureStoreRequest": {
---|--- 
2
| "endpoint": {
3
| "url": "https://example.com/{{accountId}}/dictionary/{{dictId}}/item/{{_featureStoreKey}}",
4
| "method": "PUT",
5
| "headers": [
6
| {
7
| "name": "Authorization",
8
| "value": "Bearer {{apiToken}}"
9
| },
10
| {
11
| "name": "Content-Type",
12
| "value": "text/plain"
13
| }
14
| ]
15
| }
16
| },
17
| "validationRequest": {
18
| "endpoint": {
19
| "url": "https://example.com/{{accountId}}/dictionary/{{dictId}}/items",
20
| "method": "GET",
21
| "headers": [
22
| {
23
| "name": "Authorization",
24
| "value": "Bearer {{apiToken}}"
25
| }
26
| ]
27
| },
28
| "parser": {
29
| "success": "/success"
30
| }
31
| }
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs