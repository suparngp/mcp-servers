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
 * [When to use a two-stage migration](#when-to-use-a-two-stage-migration)
 * [When to use a four-stage migration](#when-to-use-a-four-stage-migration)
 * [When to use a six-stage migration](#when-to-use-a-six-stage-migration)
 * [Conclusion](#conclusion)
## Overview
This guide explains how you can use migration flags to perform technology migrations and modernizations of varying degrees of complexity.
Migration and modernization projects are common in software development. Generally, a technology migration is the process of switching from an old implementation of some functionality to a new implementation. You may perform a migration to separate a monolithic application into multiple microservices, to change from one third-party vendor to another, to optimize database cluster performance, or for many other reasons. Modernization projects apply modern technology and computing methodologies, including cloud, agile, and containerization, to an organization’s conventional infrastructure, architecture, or products.
Migrations can come with an ample amount of risk. For example, moving from one database to another requires careful planning and execution to maintain data integrity. To reduce risk, you perform a migration in a series of stages. Movement from one stage to the next is done in incremental steps. You can use migration flags to manage the transition between stages from within your existing LaunchDarkly project.
Using migration flags to facilitate migrations limits or eliminates downtime, which lets you perform the migration with minimal impact on your end users. Depending on the complexity of your migration requirements, you can use migration flags to perform migrations with different numbers of stages. Migration flags also let you limit the scope of a change to a small group or percentage of recipients, so if an unexpected outcome occurs, you can change the flag’s rollout and revert to a previous stage with few or no consequences.
Migrations can have two, four, or six stages. The table below explains the read/write behavior of each stage. Remember that not all migrations will use all stages.
Stage | Read from | Write to | Authoritative 
---|---|---|--- 
off | old | old | old 
dualwrite | old | old, new | old 
shadow | both | old, new | old 
live | both | new, old | new 
rampdown | new | new, old | new 
complete | new | new | new 
## Prerequisites
To use this guide, you should understand:
 * What migration flags are and how their variations work. To learn more, read [Migration flags](/docs/home/flags/migration).
 * How to use LaunchDarkly’s SDKs to manage migrations and modernizations. To learn more, read [Migrations](/docs/sdk/features/migrations).
 * How applications use a database to read and write data.
## When to use a two-stage migration
Some types of migration require only two stages:
 * `off`: data is read from and written to the old system
 * `complete`: data is read from and written to the new system
In a two-stage migration, you switch directly from the old system, data source, or implementation, to the new one. You might choose this migration type when you know you cannot run the old and new systems simultaneously. You can perform an incremental migration by performing a percentage rollout to the “complete” variation. For example, you may decide to increase the rollout by 10% every hour until the “complete” variation reaches 100%.
As a real-world example, imagine you are migrating your email service from one provider to another. The migration flag’s “off” variation is linked to your original email provider, while the “complete” variation is linked to the new provider. It makes sense to move directly from one provider to another, with no stages that share data between them.
## When to use a four-stage migration
For some types of migrations, you need to use two systems at the same time, with one system considered the authoritative version while the result from the other implementation is registered, but not returned. A four-stage migration assumes there are two systems or implementations that can both be used simultaneously and for the same purpose, and that you can compare the executions of the two systems for consistency and performance. Only one version is considered authoritative.
This results in four stages:
 * `off`: data is read from and written to only the old system
 * `shadow`: data is read from and written to both systems, but returned from only the old system
 * `live`: data is read from and written to both systems, but returned from only the new system
 * `complete`: data is read from and written to only the new system
A four-stage migration does not migrate the underlying data from one system to another. This type of migration might consist of two different implementations using the same underlying data, or two different systems to receive the same data, but the application does not perform both reads and writes.
As a real-world example, imagine you need to dual-write to both a legacy service and a new one for some period of time, such as two weeks. The observability services are consuming and presenting the metrics or logs. When the application is fully migrated to the new service, the migration can be considered complete.
Similarly, you might use a four-stage migration when you need to compare the performance of services, such as two versions of the same API endpoint. Decomposing a monolith into microservices might require testing as you move microservices out, so a four-stage migration is the best option.
## When to use a six-stage migration
Six-stage migrations migrate data from one system of record to another, and may be the most common type of migration. Six-stage migrations can decrease your reliance on technology that might otherwise surround the migration, such as additional testing or flags to enable things before or after a shorter migration. Instead, you can perform a migration elegantly, with one flag. If you need to stop reads from one part of the system during the migration, you can do so without losing data integrity, because both systems can still be written to, depending on what stage you’re in.
Additionally, for types of migration that affect persistent state, there may be a requirement to replicate data between implementations. This replication may be performed by a third-party tool, with data changes in the old implementation automatically applied to the new implementation. Alternatively, a snapshot from the old implementation could be applied to the new implementation, backfilling data while in-band writes are simultaneously applied to both old and new implementations to maintain data consistency.
The stages of this migration type are:
 * `off`: data is read from, written to, and returned from only the old system.
 * `dualwrite`: data is read from only the old system, but written to both the old and the new system. Data is returned from the old system. When the data in the new system is identical to the data in the old system, you can proceed to the next stage.
 * `shadow`: data is read from and written to both systems. Data is returned from the old system. At this stage, the new system is essentially running silently in parallel with the old system.
 * `live`: data is read from and written to both systems. Data is returned from the new system. At this stage, the old system is functionally a backup of the new system.
 * `rampdown`: data is read from the new system and written to both systems. Data is returned from the new system.
 * `complete`: data is read from, written to, and returned from only the new system. At this stage, you can safely deprecate the old system.
As a real-world example, imagine you are performing a database migration. A more granular migration means more opportunities to revert to previous stages, or selectively read or write to only one database, which can help preserve data integrity or prevent cascading technical failures. In this case, and for complex table or schema migrations, a six-stage migration flag is the most appropriate for your needs.
## Conclusion
In this guide, you learned about the different types of migration and when to use them.
To learn how to implement migration flags in LaunchDarkly, read [Migration flags](/docs/home/flags/migration). To learn how to configure your SDK to perform the reads and writes at each stage, read [Migration configuration](/docs/sdk/features/migration-config). To learn how to monitor the progress of your migrations, read [Migration flag metrics](/docs/home/flags/migration-metrics) and [Understanding potential migration issues](/docs/home/flags/target-migration#understanding-potential-migration-issues).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs