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
 * [OpenFeature providers](#openfeature-providers)
 * [Additional resources](#additional-resources)
This category contains documentation topics describing the LaunchDarkly OpenFeature providers.
OpenFeature is an open specification that provides a vendor-agnostic, community-driven API for feature flagging. Within OpenFeature, providers are responsible for performing flag evaluations. To learn more, reference the [OpenFeature documentation](https://openfeature.dev/docs/reference/intro).
LaunchDarkly offers official OpenFeature providers for several of our SDKs, [listed below](/docs/sdk/openfeature#openfeature-providers). You can use these providers in your application in place of a LaunchDarkly SDK.
LaunchDarkly also offers OpenFeature providers for a few of our SDKs in cases where the OpenFeature SDK does not yet have a specification released as v1.0. This is the case for [**Python**](https://github.com/launchdarkly/openfeature-python-server) and [**Ruby**](https://github.com/launchdarkly/openfeature-ruby-server).
In some cases, the OpenFeature community has also created OpenFeature providers compatible with LaunchDarkly SDKs. This is the case for [**Go**](https://github.com/open-feature/go-sdk-contrib/tree/main/providers/launchdarkly) and [**JavaScript**](https://github.com/open-feature/js-sdk-contrib/tree/main/libs/providers/launchdarkly-client). We welcome these community contributions but cannot officially provide support for these providers.
To learn more, read about the [OpenFeature Ecosystem](https://openfeature.dev/ecosystem?instant_search%5BrefinementList%5D%5Bvendor%5D%5B0%5D=LaunchDarkly) for LaunchDarkly.
## OpenFeature providers
[![.NET logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/79f44c483f1d70b11c055f8ce13103203f295fcf51b6c2aeb758c6d01abc40b4/assets/icons/dark/dotnet.svg)![.NET logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d573855de861cb58739933d8daa3f848469bdc49fc5fb994dcd889930f35b73e/assets/icons/light/dotnet.svg).NET](/docs/sdk/openfeature/dotnet)[![Java logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/10a70244fc7ce0ba3d3a34c1d8607b5b7d0b7258b7b52efe2f8c503e53c8b475/assets/icons/dark/java.svg)![Java logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/82a12e90c06582aa8db0822d56af2a80ed93c4f64ad452a4bf3172b9bcdf82e9/assets/icons/light/java.svg)Java](/docs/sdk/openfeature/java)[![Node.js logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1f3aa47523e5da050a12172713cd6816a2c99d78368d5b7e40ae2f5f367a2ccb/assets/icons/dark/node.svg)![Node.js logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7c5a5862da85d519e99717357af3e9e922fe7fdc4d51bdd446068905a7a38868/assets/icons/light/node.svg)Node.js](/docs/sdk/openfeature/node-js)[![PHP logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3fe62bfbac75127d4b85659acdc205c3e7c7a10fab245ceac3cf20e83bc151d0/assets/icons/dark/php.svg)![PHP logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/607c22da9cdf02e386540a900fa2574bac08be6fc7aa3099c0102f40223cf6b5/assets/icons/light/php.svg)PHP](/docs/sdk/openfeature/php)
## Additional resources
OpenFeature Provider | Sample application | Provider API documentation | GitHub repository 
---|---|---|--- 
.NET (server-side) | [Sample OpenFeature .NET provider application](https://github.com/launchdarkly/hello-openfeature-dotnet-server) | [OpenFeature .NET provider API docs](https://launchdarkly.github.io/openfeature-dotnet-server/) | [LaunchDarkly OpenFeature provider for .NET (server-side) SDK](https://github.com/launchdarkly/openfeature-dotnet-server) 
Java | [Sample OpenFeature Java provider application](https://github.com/launchdarkly/hello-openfeature-java-server) | [OpenFeature Java provider API docs](https://launchdarkly.github.io/openfeature-java-server/com/launchdarkly/openfeature/serverprovider/package-summary.html) | [LaunchDarkly OpenFeature provider for Java SDK](https://github.com/launchdarkly/openfeature-java-server) 
Node.js (server-side) | [Sample OpenFeature Node.js provider application](https://github.com/launchdarkly/hello-openfeature-node-server) | [OpenFeature Node.js provider API docs](https://launchdarkly.github.io/openfeature-node-server/) | [LaunchDarkly OpenFeature provider for Node.js (server-side) SDK](https://github.com/launchdarkly/openfeature-node-server) 
PHP | [Sample OpenFeature PHP provider application](https://github.com/launchdarkly/hello-openfeature-php-server) | [OpenFeature PHP provider API docs](https://launchdarkly.github.io/openfeature-php-server/) | [LaunchDarkly OpenFeature provider for PHP SDK](https://github.com/launchdarkly/openfeature-php-server) 
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs