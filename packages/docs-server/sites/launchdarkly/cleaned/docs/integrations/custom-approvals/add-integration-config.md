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
 * [Add the custom approvals integration](#add-the-custom-approvals-integration)
## Overview
This topic describes how to add a custom approvals integration within LaunchDarkly. This is the second step required when building a [custom approvals integration](/docs/integrations/custom-approvals). Only customers with complex workflow management or approval systems in third-party applications that LaunchDarkly does not integrate with directly are likely to need a custom approvals integration.
## Add the custom approvals integration
After you [create your own approval application](/docs/integrations/custom-approvals/custom-app), you must set up an integration configuration to connect LaunchDarkly and your approval application.
To configure your custom approvals integration in LaunchDarkly:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and search for the “Custom approvals” integration.
 3. Click **Add integration**. A “Create configuration” panel appears.
 4. Set the **Status** of the integration to **On**.
 5. (Optional) Enter a **Name** for the integration. This is the name that will appear when you update your LaunchDarkly environment approval settings to use your custom approvals integration.
 6. Enter the **API Token** that LaunchDarkly should use to authenticate when sending requests to your approval application.
 7. Enter the **Custom approval service base URL** of your custom approval service. This is where LaunchDarkly will send requests.
 8. (Optional) Enter the **Additional form variables**. This is a JSON schema describing the information that a LaunchDarkly account member needs to enter when they create an approval request.
###### Expand for JSON schema details
Here is an example of the additional form variables JSON schema:
Example additional form variables JSON schema
```
1
| [
---|--- 
2
| {
3
| // required
4
| // how your custom approvals application references this field
5
| // LaunchDarkly uses the value here as a key
6
| // in the "additionalFormVariables" object
7
| // in the creationRequest that LaunchDarkly sends to your application
8
| // in the creationRequest that LaunchDarkly sends to your application
9
| "key": "exampleKey",
10
| 
11
| // required
12
| // name of the field displayed in the LaunchDarkly approval request UI
13
| "name": "Example field",
14
| 
15
| // required
16
| // field type, can be any of 'string', 'boolean', 'uri', 'enum', and 'dynamicEnum'
17
| "type": "string",
18
| 
19
| // required
20
| // field description displayed in the LaunchDarkly approval request UI
21
| "description": "Example description",
22
| 
23
| // optional
24
| // placeholder text displayed in the LaunchDarkly approval request UI
25
| "placeholder": "Example description",
26
| 
27
| // optional
28
| // whether the field is optional
29
| // if not specified, defaults to false
30
| "isOptional": false,
31
| 
32
| // optional
33
| // value if field left unspecified in the LaunchDarkly approval request UI
34
| "defaultValue": null,
35
| 
36
| // optional
37
| // array of allowed strings for enum-type fields
38
| "allowedValues": null,
39
| 
40
| // required if type is set to dynamicEnum
41
| // defines the request for getting dynamic options and the paths to parse them out of the response
42
| "dynamicOptions": {
43
| "endpoint": { // required. hostname must match the baseURL of the integration configuration
44
| "url": "https://your-application-host.com/api/colors",
45
| "method": "GET", // can only be GET
46
| "headers": [
47
| {
48
| "name": "Authorization",
49
| "value": "Bearer {{ apiKey }}" // apiKey will auto-fill with the apiKey defined on the integration configuration
50
| }
51
| ]
52
| },
53
| "parser": {
54
| "optionsPath": "/data",
55
| "optionsItems": {
56
| "label": "/name",
57
| "value": "/value"
58
| }
59
| }
60
| }
61
| },
62
| {
63
| // additional fields
64
| }
65
| ]
```
 1. Click **Save configuration**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs