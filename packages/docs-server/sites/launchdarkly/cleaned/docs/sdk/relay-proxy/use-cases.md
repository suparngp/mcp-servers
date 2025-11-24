`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Common use cases for the Relay Proxy](#common-use-cases-for-the-relay-proxy)
 * [Reducing outbound connections to LaunchDarkly](#reducing-outbound-connections-to-launchdarkly)
 * [Using PHP](#using-php)
 * [Reducing initialization latency in short-lived and serverless environments](#reducing-initialization-latency-in-short-lived-and-serverless-environments)
 * [Using larger list-based segments or segments synced from external tools](#using-larger-list-based-segments-or-segments-synced-from-external-tools)
 * [Reducing redundant database traffic](#reducing-redundant-database-traffic)
 * [Air-gapped environments](#air-gapped-environments)
 * [Considerations for using the Relay Proxy](#considerations-for-using-the-relay-proxy)
 * [Relay Proxy and resiliency](#relay-proxy-and-resiliency)
 * [Plan considerations](#plan-considerations)
 * [SDK considerations](#sdk-considerations)
 * [Operational costs](#operational-costs)
 * [Environments requiring FIPS 140-2 validated encryption](#environments-requiring-fips-140-2-validated-encryption)
## Overview
This topic explains common use cases for implementing the LaunchDarkly Relay Proxy. It also describes the costs associated with running it, to help you decide whether it’s appropriate for your configuration.
## Common use cases for the Relay Proxy
We developed the Relay Proxy to address specific scenarios, and it works best when you use it for those purposes. The sections below describe common use cases.
If you choose to use the Relay Proxy, you must configure your SDKs to connect to it.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
### Reducing outbound connections to LaunchDarkly
A large number of servers, such as thousands or tens of thousands, can present too many outbound persistent connections to LaunchDarkly’s streaming API for a proxy or firewall to realistically handle. Use the Relay Proxy in **proxy mode** so your servers can connect directly to hosts in your own data center, instead of connecting directly to LaunchDarkly’s streaming API. On an appropriately configured host, each Relay Proxy can handle tens of thousands of concurrent connections. This dramatically reduces the number of outbound connections to the LaunchDarkly streaming API. To learn more, read [Configuring SDKs to use different modes](/docs/sdk/relay-proxy/sdk-config#configuring-sdks-to-use-different-modes).
### Using PHP
The PHP SDK communicates differently with LaunchDarkly than other LaunchDarkly SDKs because it does not support long-lived streaming connections. It must either use HTTP to poll for flags on demand, or get them from a feature store while using the Relay Proxy. We recommend using the Relay Proxy and a feature store, as it is more efficient than polling for flags on demand.
To learn more, read the Relay Proxy GitHub repository’s [Using PHP](https://github.com/launchdarkly/ld-relay/blob/v8/docs/php.md).
### Reducing initialization latency in short-lived and serverless environments
If you’re using short-lived or serverless environments and your app is very sensitive to start up run times, you can use LaunchDarkly with the Relay Proxy hosted on a long-lived server to reduce initialization latency.
Using the Relay Proxy in the same region or availability zone as your provider’s server can reduce initialization times, depending on your location. If you are billed by the millisecond, this can help lower costs.
### Using larger list-based segments or segments synced from external tools
If you want to use [larger list-based segments](/docs/home/flags/segment-types#larger-list-based-segments) or [segments synced from external tools](/docs/home/flags/synced-segments) with server-side SDKs, these segments require a persistent store within your infrastructure. LaunchDarkly keeps the persistent store up-to-date, and the LaunchDarkly SDKs consult it during flag evaluation. You can use the Relay Proxy for this. You can also use a persistent store integration.
If you are already using the Relay Proxy, we recommend also using it for list-based segments and synced segments. However, we do not recommend using the Relay Proxy if supporting segments is your only use case.
To learn more, read [SDK and integration configuration for segments](/docs/home/flags/segment-config).
### Reducing redundant database traffic
If you use a persistent data store and you have a large number of servers connected to LaunchDarkly, each server attempts to update the data store when a flag update occurs. This behavior is safe, but inefficient. Instead, you can use the Relay Proxy in **daemon mode** by setting your LaunchDarkly SDKs to daemon mode. You can then delegate flag updates to a small number of Relay Proxy instances and reduce the number of redundant update calls to your data store. To learn more, read [Persistent data stores](/docs/sdk/concepts/data-stores).
### Air-gapped environments
You may be required to operate in environments without internet connectivity. In this situation, running the Relay Proxy in **offline mode** provides the capabilities of LaunchDarkly without using our SaaS services. To learn more, read [Offline mode](/docs/sdk/relay-proxy/offline).
## Considerations for using the Relay Proxy
The default LaunchDarkly SDKs and architecture provide a high level of security, privacy, and resilience to downtime, especially when you follow [SDK best practices](/docs/tutorials/sdk-resilience-best-practices). Adding the Relay Proxy to your LaunchDarkly configuration introduces architectural complexity that may not be necessary or acceptable for smaller deployments. In addition, your LaunchDarkly plan, SDK types, and other ongoing costs can affect your decision to use the Relay Proxy.
### Relay Proxy and resiliency
When you deploy the Relay Proxy, you must carefully configure and monitor your system to ensure that it provides resilience to downtime. This requires deploying multiple Relay Proxy instances in multiple availability zones, as well as using a dedicated load balancer.
If you do not properly configure and maintain Relay Proxy instances, you may experience more downtime than when using the default LaunchDarkly SDKs alone. Read [Relay Proxy Guidelines](/docs/sdk/relay-proxy/guidelines) to understand the complete configuration requirements.
### Plan considerations
Some customers may find operating the Relay Proxy cost-prohibitive for their use case, especially customers on Developer or Foundation plans.
The Relay Proxy has certain features that are available to customers on Enterprise and Guardian plans, including automatic configuration and offline mode. Access to these features may make using the Relay Proxy more beneficial than it would be with only its standard feature set. To learn more, read [Relay Proxy Enterprise](/docs/sdk/relay-proxy/enterprise).
### SDK considerations
The LaunchDarkly client-side and server-side SDKs you use can impact your decision to use the Relay Proxy. The Relay Proxy works best with the default SDK configurations for all server-side SDKs, and for the client-side JavaScript SDK.
The Relay Proxy does not scale well when it has to maintain streaming connections with a large number of client-side SDKs, including mobile SDKs. If you’re using LaunchDarkly’s streaming architecture in a heavily used client-side or mobile application, connecting directly to LaunchDarkly’s main service may give you the best performance. You could also bootstrap flag rules from the server-side, without using the client-side SDK, in this situation.
### Operational costs
The total cost of ownership for managing the Relay Proxy at scale depends on many factors, including your onboarding process and how your organization introduces new technology.
For the ongoing machine cost, following our scaling guidelines, most customers find that they have plenty of capacity using three machines, with a load balancer in front of them. For customers who decide to use a database, there will be an ongoing machine cost for that as well. To learn more, read [Caching guidelines](/docs/sdk/relay-proxy/guidelines#caching-guidelines).
There will also likely be a cost when you turn monitoring on, which will depend on your monitoring solution. You may want to consider the cost of adding this information to your runbooks as well. To learn more, read [Monitoring the Relay Proxy](/docs/sdk/relay-proxy/monitoring).
For the ongoing personnel cost, as a general guideline we recommend that customers estimate an hour or so per week of a DevOps engineer’s time to monitor and maintain the cluster. We also recommend that your on-call rotation is familiar with this technology and that you set up your monitoring to make sure that you can capture abnormalities when they occur.
If you’re on LaunchDarkly’s Developer or Foundation plan, you can use the Relay Proxy but the operating costs associated with onboarding and maintaining it may be prohibitive. In general, customers on Enterprise and Guardian plans may be more tolerant of the infrastructural costs associated with using the Relay Proxy’s Enterprise features than customers with more limited budgets. To learn more, read [Relay Proxy guidelines](/docs/sdk/relay-proxy/guidelines).
## Environments requiring FIPS 140-2 validated encryption
If you are using the LaunchDarkly Relay Proxy in an environment that requires the use of FIPS 140-2 validated encryption modules, such as the [LaunchDarkly federal instance](/docs/home/infrastructure/federal), you may need to take additional steps to ensure compliance. To learn more, read [LaunchDarkly in environments requiring FIPS 140-2 validated encryption modules](/docs/home/infrastructure/fips-140-2-encryption).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs