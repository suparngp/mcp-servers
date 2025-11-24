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
 * [How merging accounts works](#how-merging-accounts-works)
 * [What you can and cannot transfer](#what-you-can-and-cannot-transfer)
 * [Prerequisites](#prerequisites)
 * [Concepts](#concepts)
 * [Account](#account)
 * [Account members](#account-members)
 * [Contexts](#contexts)
 * [Merge LaunchDarkly accounts](#merge-launchdarkly-accounts)
 * [Back up source account data](#back-up-source-account-data)
 * [Back up the change history](#back-up-the-change-history)
 * [Back up other account data](#back-up-other-account-data)
 * [Conclusion](#conclusion)
## Overview
This tutorial explains how to use a LaunchDarkly Labs utility to merge two existing LaunchDarkly projects in different accounts. The utility exports information from a source project, and imports it into a destination project, which can be in a different account. You might want to do this when you upgrade the LaunchDarkly plan you subscribe to, or if your organization has multiple LaunchDarkly accounts that you want to combine into one.
##### This guide uses experimental functions
This guide relies on functions that we created, but that we did not extensively test and do not formally support. For best results, test the procedure on accounts and projects that do not contain business-critical data before you modify production environments.
##### Consider identical projects instead
Instead of merging two projects, you can use the LaunchDarkly Terraform integration to provision multiple identical LaunchDarkly projects. To learn more, read [Terraform](/docs/integrations/terraform).
### How merging accounts works
When you merge projects from one account into another, you designate one account and its projects as the “destination” account and transfer data objects to it from “source” projects in different accounts. After the process completes, you can delete the source account. Data objects that have been transferred into the destination account behave like any other object. There is no hierarchical difference between objects from different accounts.
When you merge projects from one account to another, we recommend that you choose what data objects you want to transfer, instead of trying to transfer everything. The less you try to transfer, the less likely you are to introduce errors. Only transfer data objects that are operationally important, and leave behind anything that you are not actively using.
We suggest tagging all the objects that you want to transfer, if that is feasible, to help you verify your transfer. In addition, verify that there are no duplicate flag keys between accounts.
##### Only experienced LaunchDarkly administrators should merge accounts
Merging projects from one account to another is not a common behavior. It could impact an end user’s experience of your product. Plan extensively before you merge LaunchDarkly accounts.
### What you can and cannot transfer
Not all data objects can transfer from one account to another. However, you can back up some data before you merge projects across accounts. To learn more, read [Backing up source account data](/docs/guides/account/merge-accounts#back-up-source-account-data).
The Project migrator scripts transfer projects, rule-based segments, and flag targeting.
Here is what you cannot transfer:
 * The change history does not transfer between accounts.
 * SDK keys do not transfer between accounts.
 * Custom roles do not transfer between accounts. You must grant custom roles to new account members in the primary account after the merge completes.
 * Data from running experiments does not transfer between accounts. If you merge a source project into the destination project while the source project has experiments running, the experiment cannot match its context targeting to the context targeting options in the destination project. To prevent data loss, stop experiments during the merge and resume them in the destination project after.
 * Context data from the **Contexts** list. This data is account-specific and cannot transfer between accounts.
 * Flag metadata, including flag status, the flag evaluations graph, and the time when flags were most recently evaluated.
 * Uploaded segments and synced segments. Rule-based segments are transferred.
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * A LaunchDarkly Admin role, or a [base role](/docs/home/account/roles) of Admin or Owner, for each account you want to merge
 * Comfort running command-line scripts
 * Security approval from your organization to temporarily store LaunchDarkly account data on your local machine
 * Authority to implement a change freeze on both the source and destination projects during the migration
 * A LaunchDarkly [API access token](/docs/home/account/api) with write access to your account
 * Recent backups of your flag environments and settings for the source account. To learn more, read [Backing up source account data](/docs/guides/account/merge-accounts#back-up-source-account-data).
 * Backups of your change history for the source account. To learn more, read [Backing up source account data](/docs/guides/account/merge-accounts#back-up-source-account-data).
## Concepts
In order to use this guide, you should understand the following concepts:
### Account
A LaunchDarkly account contains projects and environments.
### Account members
Account members are people who work at your organization or have access rights to your organization’s LaunchDarkly environment for another reason, such as contractors or part-time employees. To learn more, read [Members](/docs/home/account/members).
### Contexts
Contexts are people, services, machines, or other resources that encounter feature flags in your product. Contexts are not account members. To learn more, read [Contexts](/docs/home/flags/contexts).
## Merge LaunchDarkly accounts
To merge your LaunchDarkly accounts, migrate data objects from each project in the source account to a project or projects in the destination account.
##### The source and destination project should have different names
Your source project and your destination project should not have the same project name. If they do, some data objects, including segments, may not transfer correctly. If this happens, you will receive an error message that includes the status code `404` and a reference to `/segments/undefined`.
Here’s how:
 1. Implement a change freeze on both LaunchDarkly accounts. Stop all changes to the projects, flags, segments, and webhooks that you plan to migrate.
 2. Install Deno on your local machine. To learn how, read [Deno’s documentation](https://deno.land/).
 3. Navigate to the **LaunchDarkly Labs** repo in GitHub and clone the [Project migrator script repo](https://github.com/launchdarkly-labs/ld-migration-scripts).
 4. Create a local copy of data from your source project:
Export from source project
```
$
| deno run --allow-env --allow-read --allow-net --allow-write source.ts -p <SOURCE PROJECT> -k <LD API KEY>
---|--- 
```
 5. Migrate the source data to your destination project:
Migrate to destination project
```
$
| deno run --allow-env --allow-read --allow-net --allow-write migrate.ts -p <SOURCE PROJECT> -k <LD API KEY> -d <DESTINATION PROJECT>
---|--- 
```
 6. Verify that the migration completed successfully by checking in your destination project for data from your source project. For example, if you tagged objects in your source project that you wanted to merge into the destination project, verify that those tagged objects now appear in your destination project.
After you verify that the project merge has completed successfully, you may deprecate the source project.
 1. Delete your local copy of the source project data.
 2. Optionally, repeat for other projects in the source account. After you have merged all projects from the source account, you may deprecate the source account.
## Back up source account data
Because LaunchDarkly is cloud-based software, it does not have built-in data backup features available. Customers rarely need to back up existing data, because it is always available in the cloud. However, for the specific case of merging two accounts, there are some existing features that support backing up the data from the source account for record-keeping purposes. You can use these features to preserve the history of the source account before you merge it with the destination account.
### Back up the change history
You can download the contents of your change history by using the LaunchDarkly REST API to produce a list of all change history entries. You may need to call this API endpoint multiple times to get a full export of change history.
To learn more, read [Audit log](/docs/api/audit-log).
### Back up other account data
For other data, like environment information, you may be able to use LaunchDarkly’s Data Export feature to review some historical events and data from an account.
To learn more, read [Data Export](/docs/integrations/data-export).
## Conclusion
In this guide, you learned how to transfer data objects from projects in one LaunchDarkly account into another, effectively merging the accounts. You also learned how to back up some data from one account to preserve its history before merging.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs