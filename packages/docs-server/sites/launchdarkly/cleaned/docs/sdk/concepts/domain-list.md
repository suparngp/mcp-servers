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
 * [Accessing LaunchDarkly by domain](#accessing-launchdarkly-by-domain)
## Overview
This topic explains which domains the LaunchDarkly SDKs connect to by default. If you are restricting access, make sure your SDK can reach these domains.
If you use the Relay Proxy, you must update your SDK’s configuration to connect to the Relay Proxy rather than using these defaults.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
If you use a federal instance of LaunchDarkly, and are not using the Relay Proxy, you must update your SDK’s configuration to connect to federal instance URLs.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration)
If you use a firewall and would like to configure access based on IP addresses, read [Public IP list](/docs/home/infrastructure/ip-list).
## Accessing LaunchDarkly by domain
The LaunchDarkly SDKs access various base uniform resource identifiers (URIs) for different services.
The server-side, client-side, and mobile SDKs use the streaming service and polling service to request flag updates. They use the events service to send data back to LaunchDarkly for Experimentation analysis.
The following table describes the default base URIs for each service for the server-side SDKs:
Service | Server-side SDKs 
---|--- 
Streaming | `https://stream.launchdarkly.com[](https://stream.launchdarkly.com/)` 
Polling | `https://sdk.launchdarkly.com[](https://sdk.launchdarkly.com/)` or `https://app.launchdarkly.com[](https://app.launchdarkly.com/)` 
Events | `https://events.launchdarkly.com[](https://events.launchdarkly.com/)` 
The following table describes the default base URIs for each service for the client-side JavaScript SDKs:
Service | Client-side JavaScript SDKs 
---|--- 
Streaming | `https://clientstream.launchdarkly.com[](https://clientstream.launchdarkly.com/)` 
Polling | `https://clientsdk.launchdarkly.com[](https://clientsdk.launchdarkly.com/)` or `https://app.launchdarkly.com[](https://app.launchdarkly.com/)` 
Events | `https://events.launchdarkly.com[](https://events.launchdarkly.com/)` 
`https://otel.observability.app.launchdarkly.com[](https://otel.observability.app.launchdarkly.com/)` and `https://pub.observability.app.launchdarkly.com[](https://pub.observability.app.launchdarkly.com/)` for the [observability SDK](/docs/sdk/observability) 
The following table describes the default base URIs for each service for the mobile SDKs:
Service | Mobile SDKs 
---|--- 
Streaming | `https://clientstream.launchdarkly.com[](https://clientstream.launchdarkly.com/)` 
Polling | `https://clientsdk.launchdarkly.com[](https://clientsdk.launchdarkly.com/)` or `https://app.launchdarkly.com[](https://app.launchdarkly.com/)` 
Events | `https://mobile.launchdarkly.com[](https://mobile.launchdarkly.com/)` 
The edge SDKs do not use the streaming service or polling service to request flag updates. They get flag data from their provider-specific store. The edge SDKs send events data back to LaunchDarkly using the `https://events.launchdarkly.com` URI.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs