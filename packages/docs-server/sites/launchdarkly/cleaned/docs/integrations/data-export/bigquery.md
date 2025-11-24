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
 * [Create a Google Cloud service account](#create-a-google-cloud-service-account)
 * [Create staging bucket](#create-staging-bucket)
 * [Configure the BigQuery Data Export integration](#configure-the-bigquery-data-export-integration)
##### Data Export is an add-on feature
Data Export is available as an add-on to select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To add Data Export to your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to create and test a BigQuery destination for Data Export. BigQuery is a cloud-based data processing and analysis platform that lets you work with large sets of data. By exporting your LaunchDarkly experiment data to the same BigQuery warehouse as your other data, you can build custom reports in BigQuery to answer product behavior questions.
## Create a Google Cloud service account
To begin, we recommend that you use a Google Cloud [service account](https://cloud.google.com/iam/docs/service-account-overview) to provide LaunchDarkly’s export service account access to your BigQuery warehouse.
To create the service account:
 1. Follow the Google Cloud instructions to [create a service account](https://cloud.google.com/iam/docs/service-accounts-create).
 2. When you create the account, grant it the [**BigQuery User** role](https://cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.user).
Then, find your LaunchDarkly export service account email address and grant it access to your newly created Google Cloud service account.
 1. In LaunchDarkly, navigate to the [**Integrations**](https://app.launchdarkly.com/settings/integrations) page and find “BigQuery Data Export.”
 2. Click **Add integration**. The “Create a destination” panel appears.
 3. Copy the **Export service account email** address and save it for use in the next step.
 4. In Google Cloud, follow the instructions to [grant LaunchDarkly’s export service account access](https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role) to your newly created Google Cloud service account.
 5. When you grant access, assign the **Service Account User** and **Service Account Token Creator** roles.
## Create staging bucket
Next, create a Google Cloud storage bucket for staging data, and grant your service account access to it.
To do this:
 1. [Create a Google Cloud storage bucket](https://cloud.google.com/storage/docs/creating-buckets).
 2. When you create the bucket, choose a region that matches the location of your destination dataset in BigQuery.
 3. Return to the service account you created above, and grant it [access to the bucket](https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add).
 4. When you grant access, assign the [**Storage Admin** role](https://cloud.google.com/storage/docs/access-control/iam-roles#storage.admin).
## Configure the BigQuery Data Export integration
Finally, in LaunchDarkly, configure the BigQuery Data Export integration.
To do this:
 1. In LaunchDarkly, navigate to the [**Integrations**](https://app.launchdarkly.com/settings/integrations) page and find “BigQuery Data Export.”
 2. Click **Add integration**. The “Create a destination” panel appears.
 3. Give the integration a human-readable **Name**.
 4. Select a **Project and environment** to export data from.
 5. Enter the BigQuery **Project ID**.
 6. Enter the **GCS bucket name**.
 7. Enter the **GCS bucket region**.
 8. Enter the **Destination service account email**.
 9. Enter the name of the BigQuery **Schema** the service account created.
 10. Click **Test connection** to ensure your configuration is correct.
 11. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 12. Click **Save destination**. The new destination appears in the list of destinations.
Your BigQuery Data Export integration is now complete.
To view the different event kinds for BigQuery Data Export destinations, read [Warehouse Data Export schema reference](/docs/integrations/data-export/warehouse-schema-reference).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs