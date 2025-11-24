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
 * [HIPAA requirements](#hipaa-requirements)
 * [Send PHI to LaunchDarkly](#send-phi-to-launchdarkly)
## Overview
This guide explains what to consider when you need to send Protected Health Information (PHI) to LaunchDarkly, and how to enable HIPAA compliance for your LaunchDarkly account.
By following these recommendations, you can support your organization’s requirements for HIPAA compliance. Before LaunchDarkly can support your HIPAA compliance, you must review and implement the guidelines in this topic.
When you pass user data through LaunchDarkly, consider whether the customers affected are protected by laws that restrict which data you can transmit or LaunchDarkly can view. Depending on the requirements of your organization, you may want to limit or completely restrict the data you send to LaunchDarkly.
To learn more about limiting the data you pass through LaunchDarkly, you can read [Minimizing LaunchDarkly’s access to user data](/docs/guides/account/user-data).
## Prerequisites
In order to enable secure PHI transmission in LaunchDarkly, you must have the following prerequisites:
 * An existing LaunchDarkly account
 * A Business Associate Agreement (BAA) with LaunchDarkly. To start the BAA process, contact your LaunchDarkly Account Executive.
## HIPAA requirements
The HIPAA privacy law dictates policies to protect all individually identifiable health information that is held or transmitted. When a provider or service uses personally identifiable information (PII) in conjunction with information about an individual’s physical or mental health or condition, health care, or payment for that health care, it becomes Protected Health Information (PHI).
To learn more about what types of information make PHI, read [The 18 HIPAA Identifiers](https://www.luc.edu/its/aboutus/itspoliciesguidelines/hipaainformation/the18hipaaidentifiers/).
LaunchDarkly supports HIPAA compliant operations, but we require additional agreements from existing customers to ensure it.
##### Configuring LaunchDarkly correctly does not guarantee that your app is HIPAA compliant
There are many different requirements for ensuring apps and software are HIPAA compliant. LaunchDarkly is probably one of many third-party services your app uses to receive and transmit data. Configuring LaunchDarkly to support confidential PHI does not guarantee that other third-party services you use, or that your app itself, are HIPAA compliant.
## Send PHI to LaunchDarkly
After you enter into a BAA with LaunchDarkly, you can pass PHI through some fields in your LaunchDarkly account. When a BAA is in place, LaunchDarkly will handle data in specific fields differently based on the assumption that those fields may contain PHI.
Only send LaunchDarkly PHI in the following fields:
 * Context objects
 * Flag targeting rules
Do not send LaunchDarkly PHI in any other field. There is no way for LaunchDarkly to determine if information in text fields is PHI, and there are no safeguards in place to prevent you from transmitting PHI in other fields.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs