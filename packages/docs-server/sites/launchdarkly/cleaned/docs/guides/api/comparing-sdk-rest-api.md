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
 * [Using the LaunchDarkly SDK](#using-the-launchdarkly-sdk)
 * [Access and documentation for the LaunchDarkly SDK](#access-and-documentation-for-the-launchdarkly-sdk)
 * [Using the LaunchDarkly REST API](#using-the-launchdarkly-rest-api)
 * [Access and documentation for the LaunchDarkly REST API](#access-and-documentation-for-the-launchdarkly-rest-api)
 * [Client libraries](#client-libraries)
 * [Using other LaunchDarkly public APIs](#using-other-launchdarkly-public-apis)
 * [Conclusion](#conclusion)
## Overview
This guide explains the differences between LaunchDarkly’s SDKs and LaunchDarkly’s REST API and associated client libraries, and when you should use each.
## Using the LaunchDarkly SDK
As a LaunchDarkly customer, you must set up an SDK to integrate LaunchDarkly with your code.
When your application starts up, your code should initialize the LaunchDarkly SDK you’re working with. When a customer encounters a feature flag in your application, your code should use the SDK to evaluate the feature flag and retrieve the appropriate flag variation for that customer. We provide both client-side and server-side SDKs, in a variety of languages, to support your use case and tech stack.
The SDKs are specialized for the tasks of evaluating feature flags in your application and generating analytics events based on those evaluations. Constraining the SDKs to these use cases lets us keep them relatively small and easy to embed in your application.
To get started, read [Setting up an SDK](/docs/home/getting-started/setting-up). To determine which type of SDK to use, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side). When you’re ready to begin your implementation, read [Implementation guidelines for LaunchDarkly SDKs](/docs/sdk/concepts/getting-started#implementation-guidelines-for-launchdarkly-sdks).
### Access and documentation for the LaunchDarkly SDK
To configure a LaunchDarkly SDK, you need either an SDK key, a mobile key, or client-side ID for your SDK. These keys provide access to retrieve the flag data needed for evaluations, and to send analytics events. Which type of SDK you use in your application determines which key you need when you configure the SDK.
The keys are specific to each project and environment. You can copy them from an environment’s **overflow menu** from the Environments list.
To copy an environment’s key:
 1. Click the project dropdown. The project menu appears:
![The project menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e7170a6ea679fd8c8210aa3660093eb18394effdc9571d713b907cbce33e24c0/assets/images/auto/project-menu-dropdown.auto.png)
The project menu.
 1. Select **Project settings**.
 2. Select **Environments**. The **Environments** list appears.
 3. Click the **overflow menu** for the environment you want to copy the key for.
 4. Click **SDK key** , **Mobile key** , or **Client-side key** to copy the key to your clipboard.
The key is copied to your clipboard.
![A list of environments within a project, with the overflow menu visible.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2be8ccac411c23c6dc87ba460ff57e14520e8bc6be5c092a17d628eff12c8411/assets/images/auto/environment-edit-environment.auto.png)
A list of environments within a project, with the overflow menu visible.
LaunchDarkly SDKs are updated periodically. To learn more, read [Versioning policy](/docs/sdk/concepts/versioning). To find the currently supported version of all SDKs, read [Supported versions](/docs/sdk/concepts/supported-versions).
To learn more about a particular LaunchDarkly SDK, read the SDK reference guide for the SDK at [Client-side SDKs](/docs/sdk/client-side), [Server-side SDKs](/docs/sdk/server-side), or [Edge SDKs](/docs/sdk/edge). Each reference guide documents how to get started with the SDK, and links to information on the supported features, the SDK API documentation, the SDK’s GitHub repository, and sample applications that use the SDK.
## Using the LaunchDarkly REST API
As a LaunchDarkly customer, you’re never required to use the REST API or its associated client libraries. If you want to, you can perform all of the functions available in the REST API through the LaunchDarkly user interface (UI).
However, you may find it convenient to perform your feature management programmatically, rather than through the UI. For example, with the LaunchDarkly REST API you can perform the following:
 * Create, update, and search for account members, teams, projects, environments, and feature flags
 * Toggle feature flags
 * Query data about contexts that have evaluated feature flags in your application
 * Build custom integrations
 * Export raw data to destinations outside of LaunchDarkly
To get started, read [The LaunchDarkly API](/docs/home/infrastructure/api).
##### Use the LaunchDarkly SDKs to evaluate flags
We do _not_ recommend using the REST API to evaluate feature flags in your application’s code. For that, use the LaunchDarkly SDKs. The SDKs include features like caching of flag values and streaming of updates that you won’t receive automatically when using the REST API to evaluate flag values. To learn more, read [Getting started with SDKs](/docs/sdk/concepts/getting-started) and [Comparing LaunchDarkly’s SDKs and REST API](/docs/guides/api/comparing-sdk-rest-api).
### Access and documentation for the LaunchDarkly REST API
To use the REST API, you need an API access token. You can generate access tokens in the **Organization settings** , from the **Authorization** page. Depending on your use case, you may prefer a personal access token or a service token. To authenticate to the LaunchDarkly API, add an `Authorization` header with your access token to your requests. To learn more, read [API access tokens](/docs/home/account/api).
The LaunchDarkly REST API is updated frequently, to support the latest features in the LaunchDarkly product. If breaking changes to the API are required, we release a new version. To set the API version for each request, add an `LD-API-Version` header to the request. To learn more, read [Versioning](/docs/api#versioning).
To get started using the LaunchDarkly API, read the tutorial [Using the LaunchDarkly REST API](/docs/guides/api/rest-api). To learn more, read the [API documentation](/docs/api).
### Client libraries
Periodically, we auto-generate client libraries in several common languages based on the OpenAPI specification of our REST API. The client libraries allow you to make calls to the LaunchDarkly REST API endpoints directly from the language you’re already working in. To learn more, read [OpenAPI and client libraries](/docs/api#openapi-swagger-and-client-libraries). To access the client libraries directly, visit the [collection of client libraries on GitHub](https://github.com/search?q=topic%3Alaunchdarkly-api+org%3Alaunchdarkly&type=Repositories).
## Using other LaunchDarkly public APIs
Outside of the official LaunchDarkly REST API, we occasionally provide supplemental API endpoints. These API endpoints:
 * are still in beta
 * are not yet incorporated into our REST API framework or client libraries, although they may be in the future
 * correspond to features that are not yet available through the LaunchDarkly user interface (UI)
To learn more about the currently available supplemental public APIs, read:
 * [Importing metric events](/docs/home/metrics/import-events)
## Conclusion
This guide discussed several ways you can interact with LaunchDarkly, including through the LaunchDarkly SDK, the LaunchDarkly REST API, client libraries, and other publicly available APIs. Understanding which of these options to use when helps you streamline the implementation of your application.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs