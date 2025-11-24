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
 * [Create a service principal](#create-a-service-principal)
 * [Create a principal access token](#create-a-principal-access-token)
 * [Create a SQL warehouse](#create-a-sql-warehouse)
 * [Give catalog and schema permissions](#give-catalog-and-schema-permissions)
 * [Configure the Databricks Data Export integration](#configure-the-databricks-data-export-integration)
##### Data Export is an add-on feature
Data Export is available as an add-on to select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To add Data Export to your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to create and test a Databricks destination for Data Export. Databricks is a cloud-based data processing and analysis platform that lets you work with large sets of data. By exporting your LaunchDarkly experiment data to the same Databricks warehouse as your other data, you can build custom reports in Databricks to answer product behavior questions.
## Create a service principal
We recommended that you use a Databricks [Service principal](https://docs.databricks.com/aws/en/admin/users-groups/service-principals) to provide LaunchDarkly service access to your warehouse.
To create a new service principal, follow the Databricks instructions to [Add service principals to your account](https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals#-add-service-principals-to-your-account). You can also read [LaunchDarkly’s instructions for creating a new service principal](/docs/home/product-analytics/setup/databricks).
Ensure that the principal has **Workspace access** and **Databricks SQL access** entitlements. To learn how, read the Databricks documentation about [Access entitlements](https://docs.databricks.com/aws/en/security/auth/entitlements).
## Create a principal access token
Next, generate and provide an access token for the service principal. You can create an access token using the Databricks REST API. To learn how, read the Databricks [REST API documentation](https://docs.databricks.com/aws/en/dev-tools/auth/pat#use-the-databricks-rest-api-to-issue-personal-access-tokens).
You must provide specific values to the REST API. In the following example, set these values:
 * Replace `databricks-instance` with your Databricks workspace URL. For example, `dbc-abcd1234-5678.cloud.databricks.com`.
 * Replace `your-existing-access-token` with an existing valid PAT (string) that has permissions to create new tokens.
Provide the values for these parameters:
API access token
```
$
| curl -X POST https://<databricks-instance>/api/2.0/token/create \
---|--- 
>
| -H "Authorization: Bearer <your-existing-access-token>" \
>
| -H "Content-Type: application/json" \
>
| -d '{
>
| "comment": "New PAT using DB API",
>
| "lifetime_seconds": <lifetime-of-pat-in-seconds>
>
| }'
```
Omitting `lifetime_seconds` sets the lifetime to the maximum allowed by the workspace configuration.
You will provide the access token later when [setting up the integration](/docs/integrations/data-export/databricks#configure-the-databricks-data-export-integration) in LaunchDarkly.
## Create a SQL warehouse
Now, follow the Databricks instructions to [Create a new SQL warehouse](https://docs.databricks.com/aws/en/compute/sql-warehouse/create).
Under [permissions](https://docs.databricks.com/aws/en/compute/sql-warehouse/create#manage-a-sql-warehouse), assign the **Can use** permission to the service principal you created above.
Under **Connection details** , find and save the **Server hostname** and **HTTP path** of the warehouse. You will need these when setting up the integration in LaunchDarkly.
## Give catalog and schema permissions
Then, give the service principal you created the appropriate permissions for your [destination catalog](https://docs.databricks.com/aws/en/catalogs/) and [destination schema](https://docs.databricks.com/aws/en/schemas/).
For your destination catalog, give the service principal the `USE CATALOG` permission.
For your destination schema, give the service principal the following grants:
 * `USE SCHEMA`
 * `APPLY TAG`
 * `MODIFY`
 * `READ VOLUME`
 * `SELECT`
 * `WRITE VOLUME`
 * `CREATE MATERIALIZED VIEW`
 * `CREATE TABLE`
 * `CREATE VOLUME`
Databricks selects “Unity Catalog” for metastore type by default. If your workspace uses the [legacy Hive metastore](https://docs.databricks.com/aws/en/data-governance/unity-catalog/hive-metastore), select it instead and provide the required S3 bucket details and access keys.
## Configure the Databricks Data Export integration
Finally, in LaunchDarkly, configure the Databricks Data Export integration.
To do this:
 1. In LaunchDarkly, navigate to the [**Integrations**](https://app.launchdarkly.com/settings/integrations) page and find “Databricks Data Export.”
 2. Click **Add integration**. The “Create a destination” panel appears.
 3. Give the integration a human-readable **Name**.
 4. Select a **Project and environment** to export data from.
 5. Enter the Databricks **Server hostname** you saved when you [created a SQL warehouse](/docs/integrations/data-export/databricks#create-a-sql-warehouse).
 6. Enter the **HTTP path** of your Databricks server you saved when you created a SQL warehouse.
 7. Enter the **Databricks catalog**.
 8. Enter the Databricks **Schema** name.
 9. Enter the principal **Access token** you [created in a previous step](/docs/integrations/data-export/databricks#create-a-principal-access-token).
 10. Select a **Metastore** of “Unity Catalog” or “Hive.”
 11. Click **Test connection** to ensure your configuration is correct.
 12. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 13. Click **Save destination**. The new destination appears in the list of destinations.
Your Databricks Data Export integration is now complete.
To view the different event kinds for Databricks Data Export destinations, read [Warehouse Data Export schema reference](/docs/integrations/data-export/warehouse-schema-reference).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs