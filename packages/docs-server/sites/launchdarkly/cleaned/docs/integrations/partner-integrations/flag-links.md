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
 * [About flag links](#about-flag-links)
 * [The header property](#the-header-property)
 * [The metadata property](#the-metadata-property)
 * [The UI blocks property](#the-ui-blocks-property)
 * [UI block elements](#ui-block-elements)
 * [The empty state property](#the-empty-state-property)
## Overview
This topic explains how to use the flag links integration framework capability.
## About flag links
Flag links let you associate feature flags with resources contained in external services, such as Slack messages and Jira issues. To learn more about the feature, read [Flag links](/docs/home/flags/links).
Here is an image of a flag link:
![A flag link in a flag's right sidebar.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/93e2174cbfae4ff1db44cb0c5ac3d7618b3d955a823719e0d67c892d6e91802c/assets/images/auto/flag-links.auto.png)
A flag link in a flag's right sidebar.
The `flagLink` capability is used to apply custom formatting and metadata to flag links that originate from your integration service. For complete examples, read the [Slack App manifest](https://github.com/launchdarkly/integration-framework/blob/main/integrations/slack-app/manifest.json) and the [Jira integration manifest](https://github.com/launchdarkly/integration-framework/blob/main/integrations/jira/manifest.json).
The `flagLink` capability has the following properties:
 * [`header`](/docs/integrations/partner-integrations/flag-links#the-header-property)
 * [`metadata`](/docs/integrations/partner-integrations/flag-links#the-metadata-property)
 * [`uiBlocks`](/docs/integrations/partner-integrations/flag-links#the-ui-blocks-property)
 * [`emptyState`](/docs/integrations/partner-integrations/flag-links#the-empty-state-property)
### The header property
This property string specifies the sentence-cased title to show for all flag links for the integration, for example, “Jira issue” or “Slack conversation.”
### The metadata property
The `metadata` object specifies the shape of the data for the flag link POST body and API response. Additionally, the metadata can be referenced in the visual representation of the flag link and may be indexed for search purposes. In the integration manifest, the `metadata` object is a mapping of a metadata key to a metadata value object that specifies the format of the metadata item.
For example, the [Jira integration](https://github.com/launchdarkly/integration-framework/blob/main/integrations/jira/manifest.json) has the following `metadata` object:
A metadata object
```
1
| "metadata": {
---|--- 
2
| "creator": {
3
| "type": "string"
4
| },
5
| "iconUrl": {
6
| "type": "uri"
7
| },
8
| "issueKey": {
9
| "type": "string"
10
| },
11
| "issueTitle": {
12
| "type": "string"
13
| }
14
| },
```
### The UI blocks property
The `uiBlocks` object specifies the look and feel of the integration’s flag links in the LaunchDarkly UI.
Any combination of the following properties can be specified:
 * `image`: An object specifying the icon or avatar used to represent the link. Handlebars templating can be utilized in the `sourceUrl` field to reference metadata submitted by the integration when the link is created.
 * `title`: An object specifying the flag link title. UI block `elements` are used to provide design flexibility.
 * `context`: An object specifying additional information about the flag link. UI block `elements` are used to shape the message.
#### UI block elements
* * *
The `title` and `context` UI blocks take advantage of UI block `elements` to provide flexible formatting.
A UI block element is an object comprised of a required `text` field and may contain one or more of the following properties:
 * `isBold` (boolean): Whether or not the text should be rendered in bold face
 * `isTimestamp` (boolean): Whether or not the text should be converted from Unix milliseconds to a human-readable format
 * `url` (string): If you provide this, the block element will link to the rendered URL
Both the `text` and `url` properties can include Handlebars template variables to reference metadata submitted by the integration when the link is created.
For example, the [Slack App integration](https://github.com/launchdarkly/integration-framework/blob/main/integrations/slack-app/manifest.json) specifies the `context` UI block as follows:
A context block
```
1
| "context": {
---|--- 
2
| "elements": [
3
| { "text": "Posted in" },
4
| { "text": "#{{{metadata.channelName}}}", "isBold": true },
5
| { "text": "View message", "url": "{{{deepLink}}}" }
6
| ]
7
| }
```
### The empty state property
This `emptyState` object specifies the message used to assist members when there have not been any flag links created for the integration.
The `emptyState` object contains two properties:
 * `title`: The title heading of the empty state message.
 * `leadText`: Text or markup content detailing how members can create flag links for this integration.
For example, the [Jira integration](https://github.com/launchdarkly/integration-framework/blob/main/integrations/jira/manifest.json) specifies the `emptyState` object as follows:
An emptyState object
```
1
| "emptyState": {
---|--- 
2
| "title": "There are no Jira issues that link to this flag.",
3
| "leadText": "Jira issues connected to this feature flag will automatically appear here."
4
| }
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs