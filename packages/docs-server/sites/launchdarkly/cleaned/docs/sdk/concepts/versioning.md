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
 * [What is semantic versioning?](#what-is-semantic-versioning)
 * [Understanding LaunchDarkly’s SDK versioning policy](#understanding-launchdarklys-sdk-versioning-policy)
 * [Modifying unintentional behavior](#modifying-unintentional-behavior)
 * [Adding new functionality](#adding-new-functionality)
 * [Introducing breaking changes](#introducing-breaking-changes)
 * [Supported versions](#supported-versions)
## Overview
This topic explains LaunchDarkly’s SDK versioning policy, which is based on the semantic versioning standard.
To set up notifications about version updates and end of life notices, read [Version notifications](/docs/sdk/concepts/version-notifications).
## What is semantic versioning?
In summary, the semantic versioning standard specifies that each version should be uniquely labeled by an identifier made up of three components:
 * **major** version number
 * **minor** version number
 * **patch** version number
These components are separated by periods. For example: The version `1.2.3` has a major version of `1`, a minor version of `2`, and a patch version of `3`.
For pre-release versions, we may suffix the version with an identifier indicating the version’s pre-release status, like `-beta1` or `-alpha2`.
When we release a new version, we increment one of the major, minor, or patch components. Differentiating between new versions is based on the kinds of changes introduced in the new version.
As is conventional in the semantic versioning standard:
 * The major version component increments when the version contains breaking changes.
 * The minor version component increments when the version contains new functionality that is backwards compatible.
 * The patch version component increments when the version contains backwards compatible bug fixes.
To learn more, read [Semantic Versioning 2.0.0](http://semver.org/).
## Understanding LaunchDarkly’s SDK versioning policy
The semantic versioning standard is a set of guidelines, not rigid rules. Different products and companies interpret the standard in ways that make sense to them.
At LaunchDarkly, we version our SDKs based on the following criteria:
 * [Modifying unintentional behavior](/docs/sdk/concepts/versioning#modifying-unintentional-behavior)
 * [Adding new functionality](/docs/sdk/concepts/versioning#adding-new-functionality)
 * [Introducing breaking changes](/docs/sdk/concepts/versioning#introducing-breaking-changes)
## Modifying unintentional behavior
We release a patch version to modify a behavior if correcting that behavior does not change any documented types, properties, methods, or parameters.
We release a patch version to modify a behavior when:
 * the behavior is unintended and does not work as documented (a “bug”), or
 * the behavior works as intended at the time of release but is later found to cause problems
##### What qualifies as "documented" behavior?
“Documented” behavior is behavior that is referenced or explained in technical documentation we provide about LaunchDarkly, or behavior that exists in the public API.
## Adding new functionality
“New functionality” is not a term that applies to all new behavior.
It means providing you the ability to do something with the SDK that you could not do before and that involves a new type, property, method, optional parameter, or supported parameter value.
New functionality qualifies as a minor version release.
## Introducing breaking changes
A “breaking change” occurs when a type, property, method, parameter, or allowable parameter value is no longer defined or no longer produces the results or behavior you want when you use it according to the documentation we provide.
The qualifications for a breaking change can vary from platform to platform. On a platform like Node.js, which does not have the same kind of public and private visibility systems as Java or .NET, it can be difficult to distinguish between internal code and APIs.
In cases like this, internal methods or properties can exist that LaunchDarkly cannot prevent application code from accessing, including methods and properties which are excluded from all documentation and from explicit interface declarations. We consider methods and properties like that, such as TypeScript declarations, to be internal. We do not consider breaking these internal references to be breaking changes as long as the underlying behavior persists. We will not release a major version solely to resolve an internal breakage.
Examples of breaking changes that would qualify for a major version release include:
 * the application code no longer compiles (in a compiled language)
 * the application or SDK is unable to do the thing you want it to do, even when you use it correctly
For information on breaking changes and how to upgrade safely between major versions, look for the relevant migration guide for your SDK: Find the reference guide for your SDK from the [complete list of SDKs](/docs/sdk), then use the left navigation in that documentation topic to find the migration guide for your version.
For details on non-breaking changes in minor or patch versions of an SDK, review the details in the GitHub release: Find the reference guide for your SDK from the [complete list of SDKs](/docs/sdk), then click the “GitHub repository” link in the “SDK quick links” callout.
## Supported versions
You can view the currently supported versions of all LaunchDarkly SDKs at [Supported versions](/docs/sdk/concepts/supported-versions).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs