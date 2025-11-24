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
 * [Prepare your Snowflake instance](#prepare-your-snowflake-instance)
 * [Connect your LaunchDarkly environment to Snowflake](#connect-your-launchdarkly-environment-to-snowflake)
##### Data Export is an add-on feature
Data Export is available as an add-on to select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To add Data Export to your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to create and test a Snowflake destination for Data Export. By exporting your LaunchDarkly experiment data to the same Snowflake warehouse as your other data, you can build custom reports in Snowflake to answer product behavior questions.
You can also run warehouse native experiments using data coming directly from your Snowflake warehouse. To learn more, read [Snowflake native Experimentation](/docs/home/warehouse-native/snowflake).
## Prerequisites
To configure the Snowflake Data Export integration, you must have the following prerequisites:
 * You must have the `SECURITYADMIN` and `SYSADMIN` roles in Snowflake
 * You must have a [LaunchDarkly role](/docs/home/account/roles) that allows you to [add and edit integrations](/docs/home/account/roles/role-actions#integration-actions)
 * You need to allow LaunchDarkly’s data transfer service’s static IP address: `35.192.85.117`
 * You must know your Snowflake account URL. You can retrieve your Snowflake account/server URL by navigating to the user menu in Snowflake, hovering on **Account** , then clicking **View account details** :
![The "Copy account URL" option in Snowflake.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f733aef43ec4af715c6b16f9afb33a16b40694442b55605f4507afebfa09b742/assets/images/__third_party/snowflake-copy-account-url.png)
The "Copy account URL" option in Snowflake.
 * If you use network policies within your Snowflake account, you will need to create or update your policy to allow traffic from LaunchDarkly:
Snowflake network policy
```
1
| CREATE NETWORK RULE LD_EXPORT.EXPORT_<ProjKey__EnvKey>.LD_DATA_EXPORT_NETWORK_RULE TYPE = IPV4 MODE = INGRESS VALUE_LIST = ('35.192.85.117');
---|--- 
2
| 
3
| CREATE NETWORK POLICY LD_DATA_EXPORT_NETWORK_POLICY
4
| ALLOWED_NETWORK_RULE_LIST=(LD_DATA_EXPORT_NETWORK_RULE);
5
| 
6
| ALTER USER LD_EXPORT_USER_<ProjKey__EnvKey> SET NETWORK_POLICY = LD_DATA_EXPORT_NETWORK_POLICY;
```
You can use the Snowflake Data Export integration in all AWS regions.
## Prepare your Snowflake instance
You must prepare a separate Snowflake user and schema for each LaunchDarkly project/environment you want to set up for export. The database, warehouse, and role are shared among environments.
First, in Snowflake, create a warehouse and database. You can skip this step if you have already created the warehouse and database below, and are only setting up an additional project/environment.
Snowflake warehouse and database
```
1
| begin;
---|--- 
2
| 
3
| -- These variables should not be changed
4
| set warehouse_name = 'LD_EXPORT_WH'; -- all letters must be uppercase
5
| set database_name = 'LD_EXPORT'; -- all letters must be uppercase
6
| 
7
| use role sysadmin;
8
| 
9
| -- Create a warehouse for data transfer service
10
| create warehouse if not exists identifier($warehouse_name)
11
| warehouse_size = xsmall
12
| warehouse_type = standard
13
| auto_suspend = 60
14
| auto_resume = true
15
| initially_suspended = true;
16
| 
17
| -- Create database for data transfer service
18
| create database if not exists identifier($database_name);
19
| 
20
| commit;
```
Next, create a role with the required privileges on the database and warehouse. You will create a single role for all environments:
Snowflake role
```
1
| begin;
---|--- 
2
| 
3
| -- These variables should not be changed
4
| set role_name = 'LD_EXPORT_ROLE'; -- all letters must be uppercase
5
| set warehouse_name = 'LD_EXPORT_WH'; -- all letters must be uppercase
6
| set database_name = 'LD_EXPORT'; -- all letters must be uppercase
7
| 
8
| -- Change role to securityadmin for role steps
9
| use role securityadmin;
10
| 
11
| -- Create role for data transfer service
12
| create role if not exists identifier($role_name);
13
| 
14
| -- Establish SYSADMIN as the parent of the new role. Note: this does not grant the access privileges of SYSADMIN to the new role.
15
| grant role identifier($role_name) to role SYSADMIN;
16
| 
17
| -- Change role to sysadmin for warehouse / database steps
18
| use role sysadmin;
19
| 
20
| -- Grant service role access to warehouse
21
| grant usage
22
| on warehouse identifier($warehouse_name)
23
| to role identifier($role_name);
24
| 
25
| -- Grant service role access to database
26
| grant monitor, usage
27
| on database identifier($database_name)
28
| to role identifier($role_name);
29
| 
30
| commit;
```
## Connect your LaunchDarkly environment to Snowflake
In this section, you are working in LaunchDarkly and Snowflake simultaneously. We recommend having two browser windows or tabs open to easily switch back and forth between the two applications.
Begin by configuring the Snowflake Data Export integration in LaunchDarkly:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Snowflake Data Export.”
 3. Click **Add integration**. The [“Create a destination” panel](https://app.launchdarkly.com/settings/integrations/destinations/new?kind=snowflake-v2) appears.
 4. (Optional) Give your integration a human-readable **Name**.
 5. Choose a **Project and environment** to export data from.
 6. Enter your **Snowflake account URL**. A Snowflake SQL script appears.
![A Snowflake SQL script generated in LaunchDarkly.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/30714e52064f2b53c80a7cd4bbd17e0ed9bc2a5333597ec1b991f49b2828b9af/assets/images/__toPlaywright_newIA/snowflake-data-export-script.png)
A Snowflake SQL script generated in LaunchDarkly.
 1. Copy the provided Snowflake SQL script and, in Snowflake, paste it into a worksheet.
 2. In Snowflake, run the Snowflake worksheet. This creates the necessary Snowflake resources.
 3. In LaunchDarkly, test the integration by clicking **Test connection**.
 4. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 5. Click **Save destination**. The new Snowflake destination appears in the list of destinations.
Your Snowflake Data Export integration is now complete. If you plan to use Snowflake native Experimentation, the next step is to [set up the Snowflake integration for warehouse native experiments](/docs/home/warehouse-native/snowflake-configure).
Snowflake Data Export runs an hourly job, on the hour, that publishes raw LaunchDarkly data in your Snowflake account. You can expect the new data to be available in your Snowflake account within 10-15 minutes after the hour.
To view the different event kinds for Snowflake Data Export destinations, read [Warehouse Data Export schema reference](/docs/integrations/data-export/warehouse-schema-reference).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs