`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Download the LaunchDarkly JavaScript Client](#download-the-launchdarkly-javascript-client)
 * [Set up your Salesforce environment](#set-up-your-salesforce-environment)
 * [Using the LaunchDarkly client in a Lightning Web Component](#using-the-launchdarkly-client-in-a-lightning-web-component)
 * [Conclusion](#conclusion)
## Overview
This guide explains how to configure your Salesforce environment to use the LaunchDarkly JavaScript or React Web client-side SDKs in Lightning Web Components (LWCs).
Salesforce Lightning Web Components are an implementation of standard web components that allow you to leverage HTML, CSS, and JavaScript in a lightweight framework. To learn more, read [Introducing Lightning Web Components](https://developer.salesforce.com/docs/component-library/documentation/en/lwc).
The example code in this guide is extracted snippets. We show it here as if it is being used in a JavaScript class.
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * Basic working knowledge of the LaunchDarkly [JavaScript client-side SDK](/docs/sdk/client-side/javascript) or [React Web client-side SDK](/docs/sdk/client-side/react/react-web)
 * Basic working knowledge of [Salesforce Lightning Web Components](https://developer.salesforce.com/docs/component-library/documentation/en/lwc)
## Download the LaunchDarkly JavaScript Client
To begin, find the latest version under [Releases](https://github.com/launchdarkly/js-client-sdk/releases) in the JavaScript SDK GitHub repository. Then download the desired version from `https://unpkg.com/launchdarkly-js-client-sdk@<VERSION>/dist/ldclient.min.js`.
## Set up your Salesforce environment
Next, set up your Salesforce environment. To do this:
 1. Upload the file to your Salesforce organization as a static resource in your org
 2. [Enable Lightning Web Security](https://developer.salesforce.com/docs/platform/lwc/guide/security-lwsec-intro.html) in your org
 3. Add `https://*.launchdarkly.com` as a CSP Trusted Site, under [Manage CSP Trusted Sites](https://help.salesforce.com/s/articleView?id=sf.csp_trusted_sites.htm&type=5)
## Using the LaunchDarkly client in a Lightning Web Component
In the JavaScript file of your Lightning Web Component, import the static resource:
Import LD client
```
1
| import ldclient from '@salesforce/resourceUrl/ldclient';
---|--- 
```
Then, load the imported script for usage in the file, using the Lightning Web Component [Platform Resource Loader](https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-resource-loader/documentation):
Load script
```
1
| Promise.all([
---|--- 
2
| loadScript(this, ldclient)
3
| ])
4
| .then(() => {
5
| // Post Script Load Code Here
6
| })
```
Finally, initialize the LaunchDarkly client:
Initializing LaunchDarkly client
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'context-key-123abc'
4
| };
5
| this.LDClient = ldclient.initialize('client-side-id-123abc', context);
6
| 
7
| try {
8
| await this.LDClient.waitForInitialization(5)
9
| // initialization succeeded,
10
| // flag values are now available through the client
11
| } catch (err) {
12
| // initialization failed or did not complete before timeout
13
| }
```
You can access the flag value using a JavaScript `getter` method:
Example flag getter method
```
1
| get exampleFlag() {
---|--- 
2
| return await this.LDClient.variation['flag-key-123abc', false];
3
| }
```
To learn more, read [LWC Data Binding](https://developer.salesforce.com/docs/platform/lwc/guide/js-props-getter.html). You can then use HTML to allow feature flags to control your user interface (UI) display.
Here is an example of an LWC HTML snippet:
LWC HTML snippet
```
1
| <template if:true={exampleFlag}>
---|--- 
2
| Flag evaluation is TRUE
3
| </template>
4
| <template if:false={exampleFlag}>
5
| Flag evaluation is FALSE
6
| </template>
```
## Conclusion
In this guide, we discussed how to use the LaunchDarkly JavaScript and React Web client-side SDKs in Lightning Web Components. This allows you to leverage HTML, CSS, and JavaScript in a lightweight framework.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs