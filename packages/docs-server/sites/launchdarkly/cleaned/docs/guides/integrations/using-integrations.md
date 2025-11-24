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
 * [Types of integrations](#types-of-integrations)
 * [Code references](#code-references)
 * [Collaboration tools](#collaboration-tools)
 * [Data Export destinations](#data-export-destinations)
 * [Edge tools](#edge-tools)
 * [Environments as a service](#environments-as-a-service)
 * [Experimentation and metric integrations](#experimentation-and-metric-integrations)
 * [Integrated development environment (IDE) connectors](#integrated-development-environment-ide-connectors)
 * [Internal developer platform (IDP) integrations](#internal-developer-platform-idp-integrations)
 * [Observability tools](#observability-tools)
 * [Workflow management tools](#workflow-management-tools)
 * [Other developer tools](#other-developer-tools)
 * [Building your own integration](#building-your-own-integration)
 * [Conclusion](#conclusion)
## Overview
This guide explains how using LaunchDarkly with external tools enhances your team’s ability to collaborate, track performance, manage workflows, and react when issues arise. LaunchDarkly offers many integrations with third-party services that let your existing tools work in concert with your feature flagging practices.
## Types of integrations
LaunchDarkly’s integrations span the following categories:
 * [Code references](/docs/guides/integrations/using-integrations#code-references)
 * [Collaboration tools](/docs/guides/integrations/using-integrations#collaboration-tools)
 * [Data Export destinations](/docs/guides/integrations/using-integrations#data-export-destinations)
 * [Edge tools](/docs/guides/integrations/using-integrations#edge-tools)
 * [Environments as a service](/docs/guides/integrations/using-integrations#environments-as-a-service)
 * [Experimentation and metric integrations](/docs/guides/integrations/using-integrations#experimentation-and-metric-integrations)
 * [Integrated development environment (IDE) connectors](/docs/guides/integrations/using-integrations#integrated-development-environment-ide-connectors)
 * [Internal developer platform (IDP) integrations](/docs/guides/integrations/using-integrations#internal-developer-platform-idp-integrations)
 * [Observability tools](/docs/guides/integrations/using-integrations#observability-tools)
 * [Workflow management tools](/docs/guides/integrations/using-integrations#workflow-management-tools)
 * [Other developer tools](/docs/guides/integrations/using-integrations#other-developer-tools)
For a list of all supported integrations, visit the **Integrations** page in your LaunchDarkly app by clicking the **gear** icon in the left sidenav, then **Integrations** , or read the [Integrations documentation](/docs/integrations).
To learn about common problems integrations can help solve, read [Integrations use cases](/docs/guides/integrations/integrations-use-cases).
## Code references
The LaunchDarkly code references tool integrates with your continuous integration (CI) tool to identify where LaunchDarkly flags occur in your code.
A best practice for managing feature flags is archiving flags you no longer need. Identifying where those flags are referenced in code can be difficult, especially if you have more than one repository to search through. Code references help solve this. When using code references, you can view a flag’s **Code references** tab to find out everywhere that flag appears in your code.
Here is an image of the code references tab:
![The code references tab for a feature flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/63cf303b64f7d39f099930445161a160996827f4024918f21d6137d8b84e7edf/assets/images/__LD_UI_no_test/flag-code-references.png)
The code references tab for a feature flag.
To learn more, read [Code references](/docs/home/flags/code-references).
LaunchDarkly offers code references integrations:
 * [Bitbucket code references](/docs/home/flags/code-references/bitbucket)
 * [CircleCI code references](/docs/home/flags/code-references/circleci)
 * [Custom configuration with ld-find-code-refs](/docs/home/flags/code-references/custom-config)
 * [GitHub code references](/docs/home/flags/code-references/github-actions)
 * [GitLab code references](/docs/home/flags/code-references/gitlab)
## Collaboration tools
When teams are distributed, it is useful to be able to centralize information about your feature flags in messaging and collaboration tools that many teams in your organization use.
We have integrations that allow LaunchDarkly to send notifications and give authorized members the ability to trigger flag changes from different apps.
Here is an example of an approval request in Slack:
![An approval request in Slack.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d92140989e4c2a892a0db4abd43cceacfcba52fcd9164d15a971445ba3078834/assets/images/__third_party/slack-choose-a-review-setting.png)
An approval request in Slack.
LaunchDarkly integrates with the following collaboration tools:
 * [Confluence](/docs/integrations/confluence)
 * [Microsoft Teams](/docs/integrations/microsoft-teams)
 * [Slack app](/docs/integrations/slack)
## Data Export destinations
Data Export allows companies to do extremely detailed and rich analysis of flag evaluations and behavior. You can export a configurable log stream to a destination such as Amazon Kinesis, Google PubSub, or others. To learn more, read [Data Export](/docs/integrations/data-export).
## Edge tools
You can use LaunchDarkly with several edge providers. This eliminates the initial remote call to LaunchDarkly, providing zero-latency client-side feature flags with no flash of original content or shift in content layout. This means you can use your LaunchDarkly flags without an added latency from network requests.
To use each of these integrations, you also need to use the corresponding LaunchDarkly edge SDK. To learn more, read [Edge SDKs](/docs/sdk/edge).
LaunchDarkly integrates with the following edge providers:
 * [Akamai](/docs/integrations/akamai)
 * [Cloudflare](/docs/integrations/cloudflare)
 * [Netlify](/docs/integrations/netlify)
 * [Vercel](/docs/integrations/vercel)
## Environments as a service
Organizations that use ephemeral environments for development and testing need feature management specific to their ephemeral environment. This gives developers control of application features independent of other environments. It minimizes the risk of toggling features impacting other development efforts.
LaunchDarkly integrates with the following environment as a service (EaaS) providers:
 * [Okteto](/docs/integrations/okteto)
 * [Release](/docs/integrations/release)
 * [Roost.ai](/docs/integrations/roost-ai)
## Experimentation and metric integrations
LaunchDarkly provides integrations with several third-party applications related to Experimentation, which you can use in conjunction with the LaunchDarkly Experimentation product.
LaunchDarkly integrates with the following Experimentation tools:
 * [Census](/docs/integrations/census)
 * [Segment](/docs/integrations/metric-segment)
 * [Sentry](/docs/integrations/sentry)
 * [Snowplow](/docs/integrations/snowplow)
 * [Sprig](/docs/integrations/sprig)
 * [Tealium](/docs/integrations/tealium)
## Integrated development environment (IDE) connectors
You can use LaunchDarkly with your preferred IDE to do things like autocomplete feature flag keys, view lists of feature flags, and update flag settings.
Here is an example of the LaunchDarkly VSCode extension:
![The LaunchDarkly VSCode extension](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6e52f275490a50602e8501c6595cfe8b124a09e976f90494a4e33d6fd5558ba6/assets/images/__third_party/vscode-overview.png)
The LaunchDarkly VSCode extension
LaunchDarkly integrates with the following IDE connectors:
 * [IntelliJ IDEA](/docs/integrations/intellij)
 * [LaunchDarkly extension for GitHub Copilot](/docs/integrations/github-copilot-extension)
 * [Visual Studio Code (VSCode)](/docs/integrations/vscode)
## Internal developer platform (IDP) integrations
LaunchDarkly integrates with the following IDPs:
 * [Backstage, by Roadie](/docs/integrations/backstage)
 * [Compass](/docs/integrations/compass)
 * [Cortex](/docs/integrations/cortex)
 * [Port](/docs/integrations/port)
## Observability tools
LaunchDarkly offers integrations with many monitoring, observability, and application performance management (APM) tools.
Many software teams use these tools to identify anomalies. These integrations make it possible to surface flag change events and display them in context with other events or metrics being monitored and tracked inside the corresponding tool. You can even use tools like these to catch when bugs are introduced by your feature flagging practices.
Here is an example of the Honeycomb dashboard:
![A Honeycomb events graph showing LaunchDarkly flag change events, with a flag event called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ea220499e694815f8f54fbf75c000936531071b3b4de9d1f327982d79cd159dc/assets/images/__third_party/honeycomb-query.png)
A Honeycomb events graph showing LaunchDarkly flag change events, with a flag event called out.
LaunchDarkly integrates with the following observability tools:
 * [AppDynamics](/docs/integrations/appdynamics)
 * [AWS CloudWatch RUM](/docs/integrations/aws-cloudwatch-rum)
 * [Chronosphere](/docs/integrations/chronosphere)
 * [Datadog](/docs/integrations/datadog)
 * [Dynatrace](/docs/integrations/dynatrace)
 * [Elastic (ELK) Stack](/docs/integrations/elastic-stack)
 * [Grafana](/docs/integrations/grafana)
 * [Honeycomb](/docs/integrations/honeycomb)
 * [Last9](/docs/integrations/last9)
 * [Mezmo](/docs/integrations/mezmo)
 * [New Relic One](/docs/integrations/new-relic)
 * OpenTelemetry for [server-side](/docs/sdk/features/opentelemetry-server-side) and [client-side](/docs/sdk/features/opentelemetry-client-side) SDKs
 * [PagerDuty for guarded rollouts](/docs/integrations/pagerduty-guardian-edition)
 * [Splunk](/docs/integrations/splunk)
 * [Splunk Observability Cloud (formerly SignalFx)](/docs/integrations/splunk-observability)
## Workflow management tools
LaunchDarkly has integrations that support common engineering workflows and tools.
It is useful to be able to control features and feature flags from external project management tools. For example, you can associate an existing flag with a project ticket, and the flag is turned on when the ticket is approved.
Here is an example of a feature flag in a Trello card:
![Feature flags in a Trello card.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5843b09031e347f67c3d01982537c02515f4fc835a96887f431ccefad8ffc103/assets/images/__third_party/trello-card-feature-flags.png)
Feature flags in a Trello card.
LaunchDarkly integrates with the following workflow management tools:
 * [Azure DevOps](/docs/integrations/azure-devops)
 * [Custom approvals](/docs/integrations/custom-approvals)
 * [Jira Cloud](/docs/integrations/jira)
 * [ServiceNow approvals](/docs/integrations/servicenow)
 * [Sleuth](/docs/integrations/sleuth)
 * [Tray](/docs/integrations/tray)
 * [Trello](/docs/integrations/trello)
 * [Zapier](/docs/integrations/zapier)
## Other developer tools
Developer tools are where developers do much of their daily work, so we built integrations that allow you to do things like schedule ring deployments or perform internal testing directly from your tools.
LaunchDarkly integrates with several productivity apps, management apps, and developer tools:
 * [Ansible Collection](/docs/integrations/ansible)
 * [AWS CloudTrail Lake](/docs/integrations/cloudtrail)
 * [AWS PrivateLink](/docs/integrations/privatelink)
 * [Bitbucket Pipelines](/docs/integrations/bitbucket-pipelines)
 * [Bitrise Release Management](/docs/integrations/bitrise)
 * [CloudQuery](/docs/integrations/cloudquery)
 * [Convex](/docs/integrations/convex)
 * [Ditto](/docs/integrations/ditto)
 * [FullStory](/docs/integrations/fullstory)
 * [GitHub Actions](/docs/integrations/github-actions)
 * [Kosli](/docs/integrations/kosli)
 * [ngrok](/docs/integrations/ngrok)
 * [Osano](/docs/integrations/osano)
 * [Terraform](/docs/integrations/terraform)
 * [Zendesk](/docs/integrations/zendesk)
## Building your own integration
We’re building more integrations all the time as customers or partners request them. To learn how to build your own integration, read [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations).
## Conclusion
Integrations are a way to incorporate LaunchDarkly’s powerful feature-flagging capabilities into your existing processes, or to enhance LaunchDarkly’s reporting and analytics capabilities.
This guide summarized some of the integrations available in LaunchDarkly and how you can use them to help your team work better.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs