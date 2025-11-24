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
 * [Prerequisites](#prerequisites)
 * [Request approval for changes in ServiceNow](#request-approval-for-changes-in-servicenow)
 * [View and approve approval requests in ServiceNow](#view-and-approve-approval-requests-in-servicenow)
 * [ServiceNow field mappings](#servicenow-field-mappings)
## Overview
This topic explains how to use the ServiceNow approvals integration to request approvals for LaunchDarkly changes in ServiceNow.
## Prerequisites
In order to complete this topic, you must meet the following prerequisites.
 * You must have an existing ServiceNow account.
 * You must have completed both parts of the setup for this integration. To learn more, read [Setting up the ServiceNow approvals integrations](/docs/integrations/servicenow/setting-up).
## Request approval for changes in ServiceNow
To request approval for changes in ServiceNow, you must request approval for the change in LaunchDarkly. The ServiceNow approvals integration supports approval requests for feature flag changes only.
To request approval in LaunchDarkly:
 1. In LaunchDarkly, navigate to the feature flag that you wish to change and make your needed changes to the flag targeting, status, or variations.
 2. Click **Review and save**. The “Save changes” dialog appears.
 3. Choose one or more reviewers from the **Request approval** menu.
 4. Enter a **Comment** to add details that help your reviewers understand the changes you made.
 5. Click **Request approval**.
 6. The approvers for feature flag changes receive a notification.
## View and approve approval requests in ServiceNow
The approver for a flag change can view and, if using manual approvals, approve the request in ServiceNow. The ServiceNow approvals integration supports approval requests for feature flag changes only.
To view and approve the change request in ServiceNow:
 1. In LaunchDarkly, click the “Pending changes” section in the right sidebar, or the **checkmark** pending changes icon. The “Pending changes” panel opens.
![The "Pending changes" section of a flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1e3fb7587c9656a3c8f7f3e7d59604dff6852e79234c958660c66270cdea683c/assets/images/__toPlaywright_newIA/workflows-pending-changes-sidebar.png)
The "Pending changes" section of a flag.
 1. Next to the request you want to view, click **View**. The “Review request” screen appears.
 2. Click **Review in ServiceNow**. The change request screen in ServiceNow appears:
![A ServiceNow change request populated with LaunchDarkly approval request details.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/aa502d954659f114a517c8f27ea4077c443698e2db3222703f9a411118a0e704/assets/images/__third_party/servicenow-change-request.png)
A ServiceNow change request populated with LaunchDarkly approval request details.
 1. View or approve the request in ServiceNow. When the ServiceNow approval conditions are met, ServiceNow changes the state to “Implement.”
 * Alternatively, if ServiceNow changes the state to “Canceled,” LaunchDarkly changes the approval request status to “Declined.”
 2. Apply the approved flag changes:
 * If your LaunchDarkly environment’s approval settings specify to **Automatically apply flag changes in LaunchDarkly** , then no further action is required. The flag changes in LaunchDarkly are applied when the associated ServiceNow change request is approved.
 * If your LaunchDarkly environment’s approval settings do not specify to automatically apply flag changes, then you must apply the flag changes manually. You can do this within LaunchDarkly by clicking **Apply Changes** in the “Pending changes” panel.
After the approved flag changes are applied, the ServiceNow change request state changes to “Review.”
If you delete the approval request in LaunchDarkly, the ServiceNow change request state changes to “Canceled.”
LaunchDarkly uses ServiceNow state values from the ServiceNow APIs to determine if a change has been approved or denied in ServiceNow. To learn more, search for “State model and transitions” in [ServiceNow’s documentation](https://www.servicenow.com/docs/) and choose the article for your ServiceNow version.
Here is a table explaining the standard ServiceNow states and the equivalent LaunchDarkly approval statuses:
ServiceNow state | LaunchDarkly approval status 
---|--- 
New | Needs review 
Implement | Approved 
Review | Completed 
Canceled | Declined 
## ServiceNow field mappings
Here is a table showing the fields LaunchDarkly specifies when it creates a ServiceNow approval request:
Approval request field in ServiceNow | Description 
---|--- 
`short_description` | A brief summary of what is being requested. This is automatically generated and includes the LaunchDarkly member name, flag name, and environment. The [image of the change request screen in ServiceNow](/docs/integrations/servicenow/approvals#view-and-approve-approval-requests-in-servicenow), above, shows an example. 
`justification` | A more detailed summary of what is being requested. This includes a link back to the LaunchDarkly approval request, the member-provided comment, and an automated change description. The [image of the change request screen in ServiceNow](/docs/integrations/servicenow/approvals#view-and-approve-approval-requests-in-servicenow), above, shows an example. 
`requested_by` | The ServiceNow member ID associated with the LaunchDarkly member making the change. LaunchDarkly members are mapped to ServiceNow member IDs using email addresses. 
`start_date` | The timestamp when the approval request was created in LaunchDarkly, or the scheduled date if the approval request is for a scheduled change. 
`end_date` | The `start_date` with a small offset. 
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs