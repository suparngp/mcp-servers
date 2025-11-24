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
 * [About approvals](#about-approvals)
 * [Configuration](#configuration)
 * [The environment form variables property](#the-environment-form-variables-property)
 * [The flag form variables property](#the-flag-form-variables-property)
 * [Lifecycle requests](#lifecycle-requests)
 * [The creation request property](#the-creation-request-property)
 * [The status request property](#the-status-request-property)
 * [The post apply request property](#the-post-apply-request-property)
 * [The deletion request property](#the-deletion-request-property)
 * [The member list request property](#the-member-list-request-property)
 * [Approval parsers](#approval-parsers)
 * [Approval status parser](#approval-status-parser)
 * [Member list parser](#member-list-parser)
## Overview
This topic explains how to use the approvals integration framework capability.
## About approvals
LaunchDarkly’s approvals feature gives account members the ability to request approval for changes to feature flags in LaunchDarkly. To learn more, read about the [Approvals feature workflow](/docs/home/releases/approvals).
You can use the approval capability to specify third-party approval systems in LaunchDarkly. Once you enable them, these approval systems prevent changes to feature flags until an external approval process completes successfully.
## Configuration
You can specify global configuration details, such as API keys and subdomains, using [`formVariables`](/docs/integrations/partner-integrations/form-variables). Additionally, you can utilize the `approval` capability’s `environmentFormVariables` and `flagFormVariables` properties to provide more granular configuration options.
### The environment form variables property
The optional `environmentFormVariables` property provides an additional point of configuration for settings that are environment-specific. The settings appear as additional fields in the environment’s “Approval settings” panel. To learn more, read [Configuring approvals for an environment](/docs/home/releases/approval-config).
For example, the [ServiceNow manifest](https://github.com/launchdarkly/integration-framework/blob/main/integrations/servicenow/manifest.json) uses `environmentFormVariables` to give members the ability to specify a different change request template for different environments.
### The flag form variables property
The optional `flagFormVariables` property adds additional integration-specific fields to the “Request approval” dialog for members to complete each time they create an approval request. The `flagFormVariables` schema matches the schema for the global `formVariables` property.
## Lifecycle requests
The approval capability makes several distinct requests to the third-party integration service throughout the lifecycle of a feature flag approval request.
These requests are as follows:
 * [`creationRequest`](/docs/integrations/partner-integrations/approvals#the-creation-request-property)
 * [`statusRequest`](/docs/integrations/partner-integrations/approvals#the-status-request-property)
 * [`postApplyRequest`](/docs/integrations/partner-integrations/approvals#the-post-apply-request-property)
 * [`deletionRequest`](/docs/integrations/partner-integrations/approvals#the-deletion-request-property)
 * [`memberListRequest`](/docs/integrations/partner-integrations/approvals#the-member-list-request-property)
Here is a sequence diagram of the requests:
![A sequence diagram of approval requests.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/855510802e2538382c99f0968582e9fc76ea280efd430a724f319216b6731340/assets/images/__not_from_LD_app_UI/integrations-lifecycle-requests.png)
A sequence diagram of approval requests.
### The creation request property
The `creationRequest` property describes the approval creation HTTP request and the parser it uses to process the JSON response.
The following fields specify the request and response parsing:
 * `endpoint`: A templatable URL, method, and set of headers. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
 * (optional) `jsonBody`: A template string used to represent the JSON payload sent in the approval creation HTTP request.
 * (optional) `parser`: A mapping of property names to locations in the JSON response payload specified by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). To learn more, read [Approval status parser](/docs/integrations/partner-integrations/approvals#approval-status-parser).
### The status request property
The `statusRequest` property describes the approval status check HTTP request and the parser it uses to determine if the approval should be considered approved or rejected.
The following fields specify the request and response parsing:
 * `endpoint`: A templatable URL, method, and set of headers. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
 * (optional) `jsonBody`: A template string used to represent the JSON payload sent in the approval status HTTP request.
 * (optional) `parser`: A mapping of property names to locations in the JSON response payload specified by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). To learn more, read [Approval status parser](/docs/integrations/partner-integrations/approvals#approval-status-parser).
### The post apply request property
The `postApplyRequest` property describes the HTTP request to make after you have applied the changes applied in LaunchDarkly.
The following fields specify the request and response parsing:
 * `endpoint`: A templatable URL, method, and set of headers. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
 * (optional) `jsonBody`: A template string used to represent the JSON payload sent in the approval status HTTP request.
 * (optional) `parser`: A mapping of property names to locations in the JSON response payload specified by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). To learn more, read [Approval status parser](/docs/integrations/partner-integrations/approvals#approval-status-parser).
### The deletion request property
The `deletionRequest` property describes the HTTP request to make after you have rejected the changes in LaunchDarkly.
The following fields specify the request and response parsing:
 * `endpoint`: A templatable URL, method, and set of headers. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
 * (optional) `jsonBody`: A template string used to represent the JSON payload sent in the approval status HTTP request.
 * (optional) `parser`: A mapping of property names to locations in the JSON response payload specified by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). To learn more, read [Approval status parser](/docs/integrations/partner-integrations/approvals#approval-status-parser).
### The member list request property
The `memberListRequest` describes the HTTP request used to fetch third-party member IDs and map them to LaunchDarkly members. LaunchDarkly makes this request immediately after configuring the integration.
The following fields specify the request and response parsing:
 * `endpoint`: A templatable URL, method and set of headers. To learn more, read [Endpoints](/docs/integrations/partner-integrations/endpoints).
 * (optional) `jsonBody`: A template string used to represent the JSON payload sent in the approval status HTTP request.
 * (optional) `parser`: A mapping of property names to locations in the JSON response payload specified by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901). To learn more, read [Member list parser](/docs/integrations/partner-integrations/approvals#member-list-parser).
## Approval parsers
There are two kinds of approval parsers: approval status parsers and member list parsers.
### Approval status parser
You can use the approval status parser to retrieve and coerce relevant data from the `approval` capability’s lifecycle requests.
The following properties specify this parser:
 * `statusValue`: The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP response body that indicates the status of the approval request, typically numeric.
 * (optional) `statusDisplay`: The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP response body that indicates the human-readable status of the approval request. If you do not specify `statusDisplay`, the LaunchDarkly UI will display the `statusValue`.
 * `approvalMatcher`: A regex pattern LaunchDarkly uses to determine if it should consider the parsed `statusValue` “approved.”
 * (optional) `rejectionMatcher`: A regex pattern LaunchDarkly uses to determine if it should consider the parsed `statusValue` “rejected.”
 * `urlTemplate`: A template string representing the canonical URL hosted on the third-party service.
### Member list parser
You can use the member list parser to retrieve and coerce lists of third-party member IDs and email addresses. This list of member data is used to associate the third-party member with the LaunchDarkly member.
The following properties specify this parser:
 * `memberArrayPath`: The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP response body that contains the list of member information.
 * `memberItems`: an object containing two required properties, `email` and `memberId`. These properties are [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representations of relative locations in a single-member item that correspond to the member’s email address and ID, respectively.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs