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
 * [Create and register a LaunchDarkly OAuth client](#create-and-register-a-launchdarkly-oauth-client)
 * [Verify a LaunchDarkly OAuth client](#verify-a-launchdarkly-oauth-client)
## Overview
This topic explains how to register a LaunchDarkly OAuth 2.0 client so you can develop your own applications with secure delegated access to LaunchDarkly.
## Create and register a LaunchDarkly OAuth client
Registering a LaunchDarkly OAuth client allows you to build custom integrations that let members log into your application with their LaunchDarkly account. To learn more, read [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations).
You must have Admin privileges or an access token created by a member with Admin privileges that grants you permission to the `acct` resource.
You can create and manage LaunchDarkly OAuth clients using the [LaunchDarkly OAuth2 client API](/docs/api/o-auth-2-clients). This API acknowledges creation of your client with a response containing a unique `_clientSecret`. If you lose your client secret, you will have to register a new client. LaunchDarkly does not store client secrets in plain text.
##### Store your client secret in a secure place
It is critically important that you store your client secret securely. Access to the client secret would allow attackers to read and modify LaunchDarkly data on behalf of the team members who have authorized your application.
LaunchDarkly OAuth clients do not support multiple redirect URIs or URIs with query parameters.
##### Non-standard redirect URIs
LaunchDarkly verifies submitted redirect URIs against the standard HTTP protocol format. If you wish to register a client with a redirect URI that does not conform to the HTTP protocol, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
## Verify a LaunchDarkly OAuth client
By default, LaunchDarkly OAuth clients are unverified, meaning they provide identity verification only to members of your LaunchDarkly organization. LaunchDarkly offers partners the option to “verify” an OAuth client to allow people outside of your LaunchDarkly organization to log in with their LaunchDarkly account. If you wish to implement a verified LaunchDarkly OAuth client, visit the [Partners page](https://launchdarkly.com/partner-program/) to become a LaunchDarkly partner.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs