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
 * [Guidelines and strategies](#guidelines-and-strategies)
 * [Use teams](#use-teams)
 * [Be mindful of base roles](#be-mindful-of-base-roles)
 * [Create a sandbox project](#create-a-sandbox-project)
 * [Delegate authority management to teams](#delegate-authority-management-to-teams)
 * [Configuration options](#configuration-options)
 * [SSO attributes](#sso-attributes)
 * [SAML configuration](#saml-configuration)
 * [SCIM configuration](#scim-configuration)
 * [Further resources](#further-resources)
##### Single sign-on is available to customers on select plans
Single sign-on is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This guide provides a high-level overview of the single sign-on (SSO) options you can use to manage access rights in LaunchDarkly.
SSO allows your team to authenticate with LaunchDarkly using the same identity provider (IdP) you use for your other internal and external services. LaunchDarkly implements SSO with the SAML 2.0 protocol. You can use SSO to manage both member login and member roles, or you can use SSO to manage member login only, and continue to manage member roles within LaunchDarkly. To learn more, read [Single sign-on](/docs/home/account/sso).
As a customer on an Enterprise or Guardian plan, after you enable SSO, System for Cross-domain Identity Management (SCIM) becomes available. SCIM facilitates user provisioning, which means your IdP can use it to create, update, and deactivate members in LaunchDarkly. Administrators can optionally turn on and configure team sync with SCIM, which lets admins sync groups in their IdP with LaunchDarkly teams. To learn more, read [Enable SCIM provisioning](/docs/home/account/scim).
## Guidelines and strategies
This section includes our recommendations when setting up SSO for your organization.
### Use teams
We recommend only assigning teams using [SAML](/docs/home/account/saml) and SCIM. This allows you to maintain a simplified mapping of IdP groups to LaunchDarkly teams. You can then assign roles to teams through the LaunchDarkly user interface (UI) or Terraform.
### Be mindful of base roles
If you assign [preset roles](/docs/home/account/roles/role-concepts#preset-roles) to a member, any [base role](/docs/home/account/roles/role-concepts#base-roles) besides Owner will be ignored. We recommend that you only assign base roles and teams using SAML and SCIM.
### Create a sandbox project
We recommend that you create at least one [project](/docs/home/account/project) that is visible to all LaunchDarkly members. This ensures users will not see an error when logging into the platform.
### Delegate authority management to teams
Some organizations opt to reduce the overhead of performing team/group mapping in the IdP. Instead, you can assign all members a “sandbox” or “no access” role at the IdP level, and add members to teams using the LaunchDarkly UI. This lets you delegate team membership management to team maintainers, who can add and remove members from teams, but cannot edit the roles or permissions assigned to the teams themselves. To learn more, read [Teams](/docs/home/account/teams).
## Configuration options
This section includes SSO attributes, and SAML and SCIM configuration options.
### SSO attributes
SAML attribute | SCIM attribute summary | Description 
---|---|--- 
`NameID` | `userName` | Must be an email address: `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`. Case-sensitive. Each email address may be associated with only one LaunchDarkly account. 
`role` | `role` | One of four base LaunchDarkly roles: Reader, Writer, Admin, No access. If unspecified, the default role is Reader. If other roles are assigned to the member, this value is ignored. 
`customRole` | `customRoleArray` | A list of keys for preset or member-created roles to give to the account member. These replace the member’s existing roles. If a member has any of these roles, they supersede the base role. The value of `customRole` is case-sensitive and must match exactly the role key in LaunchDarkly. 
In SCIM, `customRole` will be parsed as a comma-delimited strong of role keys rather than an array. Use `customRoleArray` if your IdP sends an array. 
`firstName` | `givenName` | First or given name. 
`lastName` | `familyName` | Last or surname. 
`teamKey` | `teamKey` | A list of the keys of the teams that the account member belongs to. These replace the member’s existing teams. The elements of the teamKey list are case-sensitive, and each element of the list must exactly match a team key in LaunchDarkly. 
### SAML configuration
Name | Value | Notes 
---|---|--- 
Entity ID | `app.launchdarkly.com` | If you are adding multiple LaunchDarkly accounts to the same IdP, we can generate a unique entity ID for each account. 
NameID format | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` | You must use email address as the NameID format. This value is case-sensitive and globally unique in the LaunchDarkly platform. 
Metadata URL | | You can find SAML settings under **Settings** , **Security** , then **Edit SAML configuration**. 
ACS URL | | You can find SAML settings under **Settings** , **Security** , then **Edit SAML configuration**. 
Sign response | Yes | Required 
Sign assertions | Yes | Required 
Just-in-time provisioning | Yes | Only supported for IdP-initiated authentication. We recommend that all members log in using the link on your IdP’s dashboard. 
Sign authentication requests | Yes | Optional. Enable under “Advanced settings” on the SAML configuration panel. 
Encrypt SAML assertions | Yes | Enable under “Advanced settings” on the SAML configuration panel. 
Single sign-out | Partial | A sign-out redirect can be enabled upon request. 
### SCIM configuration
Name | Value 
---|--- 
SCIM-based URI | `https://app.launchdarkly.com/trust/scim/v2` 
Authorization method | `oauth2` 
Authorization URI | `https://app.launchdarkly.com/trust/oauth/authorize` 
Access token URI | `https://app.launchdarkly.com/trust/oauth/token` 
Unique Identifier field for account members | `userName` 
OAuth Client ID and Client Secret | To generate these, [contact Support](https://support.launchdarkly.com/hc/en-us). 
## Further resources
 * [Single sign-on](/docs/home/account/sso): LaunchDarkly SSO documentation.
 * [SCIM](/docs/home/account/scim): Enable and configure SCIM in LaunchDarkly.
 * [Test drive mode](/docs/home/account/saml#test-drive-mode): Test-drive mode lets you test your SSO integration before deploying.
 * [Custom attributes](/docs/home/account/saml#set-custom-attributes): Supported SAML/SCIM attributes.
 * [Supported IdPs](/docs/home/account/sso#supported-external-identity-providers): List of supported IdP integrations.
 * [Okta](/docs/home/account/okta): LaunchDarkly Okta integration documentation.
 * [SAML Tracer Chrome plugin](https://chromewebstore.google.com/detail/mpdajninpobndbfcldcmbpnnbhibjmch): Chrome Extension that allows you to capture, view and debug SAML requests. Not required.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs