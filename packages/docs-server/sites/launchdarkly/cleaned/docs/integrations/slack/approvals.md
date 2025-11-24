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
 * [View approvals in Slack](#view-approvals-in-slack)
 * [Review approvals in Slack](#review-approvals-in-slack)
 * [View replies on approval requests in Slack](#view-replies-on-approval-requests-in-slack)
## Overview
This topic explains how to manage approvals for flag and segment changes using the Slack app. Approvals let you request review for changes make to a flag or segment. You can view and act on approval requests from within the LaunchDarkly Slack app.
To use this feature, you must have installed and configured the LaunchDarkly Slack app. To learn more, read [Set up the Slack app](/docs/integrations/slack/setting-up#set-up-the-slack-app).
To learn more about approvals, read [Approvals](/docs/home/releases/approvals).
## View approvals in Slack
Here’s how to create approval requests and view them with the Slack app:
 1. In LaunchDarkly, navigate to the feature flag or segment that you wish to change and make your needed changes to the flag targeting, status, or variations.
 2. Request approval for your changes by clicking **Review and save** , then adding a reviewer in the **Request approval** field. For more details, read [Requesting approvals](/docs/home/releases/approval-requests).
 3. In Slack, click the new notification the LaunchDarkly app creates. The notification contains a link to the approval request.
![A Slack notification from the LaunchDarkly app.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3eae91fc00663c8622187e3d509c50a54d5b0d63edfad67c544bf2b2570e5de3/assets/images/__third_party/slack-ld-app-notification.png)
A Slack notification from the LaunchDarkly app.
Any reviewers that you added to the approval request also receive a Slack notification if they have authorized the LaunchDarkly app.
## Review approvals in Slack
Here’s how to manage approval requests that ask for your review:
 1. Click the Slack notification that you receive from the LaunchDarkly app.
 2. Click **Review** to create your review on the request.
![The Review button on the Slack notification.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/74078e2fe1efe04d56d90ec316324b9adba13baa2a2365cb605db45e7a46064f/assets/images/__third_party/slack-approval-click-review.png)
The Review button on the Slack notification.
 1. Review the targeting changes, and then choose an action for your review.
 * **Approve and apply changes** : Approve the changes and apply them immediately.
 * **Approve changes** : Approve the changes without applying them. The original requester, or any account member with an appropriate role can apply the changes you approved.
 * **Decline changes** : Deny the changes.
 * **Comment only** : Leave a comment on the requested changes.
![The review actions.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d92140989e4c2a892a0db4abd43cceacfcba52fcd9164d15a971445ba3078834/assets/images/__third_party/slack-choose-a-review-setting.png)
The review actions.
 1. (Optional) Add a comment if you want to include a comment with your review.
 2. Click **Submit** to submit your review.
## View replies on approval requests in Slack
You receive threaded replies to the original approval request for each review others submit.
Here’s how to view updates to the approval request:
 1. Go to the LaunchDarkly app in your Slack account.
 2. Click into a thread to view comments, approvals, and declines on the approval request.
![A reply thread on a review request.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8a9d52b210840f3fca649de3a267ccfdbdcab3596e2beec709c27a7f71aa2b70/assets/images/__third_party/slack-app-reply-thread.png)
A reply thread on a review request.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs