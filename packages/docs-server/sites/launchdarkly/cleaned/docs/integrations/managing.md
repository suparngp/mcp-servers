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
 * [Check configuration statuses](#check-configuration-statuses)
 * [The error log](#the-error-log)
 * [Validate connections](#validate-connections)
## Overview
This topic explains how to manage push-based LaunchDarkly integrations. In a push-based integration, LaunchDarkly delivers events to the third-party integration through an integration service and logs whether the integration’s configuration successfully received the event.
LaunchDarkly provides several tools to help set up and maintain push-based integrations, including status tables, error logs, and connection validation tests.
These tools are available for the following integrations:
 * [AppDynamics](/docs/integrations/appdynamics)
 * [Datadog events](/docs/integrations/datadog/events)
 * [Dynatrace events](/docs/integrations/dynatrace/events)
 * [Elastic (ELK) Stack](/docs/integrations/elastic-stack)
 * [Honeycomb events](/docs/integrations/honeycomb/events)
 * [New Relic One events](/docs/integrations/new-relic/events)
 * [Microsoft Teams](/docs/integrations/microsoft-teams)
 * [Splunk](/docs/integrations/splunk)
 * [Splunk Observability Cloud](/docs/integrations/splunk-observability/events)
## Check configuration statuses
LaunchDarkly provides a status table on the **Integrations** page for each push-based integration’s configuration. The status table provides information about event successes and failures.
To view the status table, click the **expand arrow** next to the **Add integration** button for the integration you want to view:
![The status table for Microsoft Teams integration connections with the expand arrow called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8a94b14ecf1711a725e0e2ad54158008c5340bb1cfdbe6b47e5b65573655a673/assets/images/auto/manage-integrations-status-table-arrow-callout.auto.png)
The status table for Microsoft Teams integration connections with the expand arrow called out.
The status table contains the following information:
 * **Success events** : The total number of events LaunchDarkly successfully delivered since you created the integration configuration.
 * **Most recent success** : How long ago LaunchDarkly delivered the last successful event.
 * **Errors** : The total number of errors LaunchDarkly received from integration events since you created the integration configuration.
 * **Most recent error** : How long ago LaunchDarkly received the most recent error. Click the link in this column to view the configuration’s error log.
## The error log
The error log shows a list of the most recent errors a given integration configuration has received.
To read an error log, click the link in the “Most recent error” column of a configuration’s status table:
![The status table for an integration with an error log link called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/fb3584a4a3816df867b0d9fa1ce0119871e84e5bd34f314273334793267bc9ed/assets/images/auto/manage-integrations-error-log-link-callout.auto.png)
The status table for an integration with an error log link called out.
Error log entries contain the following information:
 * **Status code** : The HTTP status code returned by the integration service.
 * **Response body** : The HTTP response body returned by the integration service.
 * **Event timestamp** : The timestamp when the error occurred. Your web browser determines the timezone.
Here is an image of the error log:
![An integration error log.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7438f473ad5741a2658352998e975c0369e77c159ba9453a69e9895fe54d6086/assets/images/__toPlaywright_newIA/manage-integrations-error-log.png)
An integration error log.
## Validate connections
After configuring an integration, you can test the connection to LaunchDarkly from the **Integrations** page.
To test a connection:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations**
 3. Find the integration you want to validate from the “Integrations” list.
 4. Click the **expand arrow** next to the **Add integration** button. The list of configurations for that integration appears.
 5. Next to the configuration you want to test, click either:
 * the **pencil** icon, or
 * the **three-dot** overview menu and select “Edit integration configuration.” The “Edit configuration” panel appears.
![The configuration overflow menu with the "Edit integration configuration" option called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c3f67fc477a1853420126287499e3616d81fee97b626f370c0660f239fd3c09b/assets/images/auto/manage-integrations-edit-integration-callout.auto.png)
The configuration overflow menu with the "Edit integration configuration" option called out.
 1. Click **Validate Connection**.
 * If your connection is valid and LaunchDarkly delivered the test event successfully, then a success message appears.
 * If your connection is not valid and LaunchDarkly could not deliver the test event successfully, then an error message appears with an HTTP status code.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs