`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Overview](/docs/api)
 * [Access Tokens](/docs/api/access-tokens)
 * [Account Members](/docs/api/account-members)
 * [Account Usage Beta](/docs/api/account-usage-beta)
 * [AI Configs Beta](/docs/api/ai-configs-beta)
 * [Announcements](/docs/api/announcements)
 * [Applications Beta](/docs/api/applications-beta)
 * [Approvals](/docs/api/approvals)
 * [Approvals Beta](/docs/api/approvals-beta)
 * [Audit Log](/docs/api/audit-log)
 * [Code References](/docs/api/code-references)
 * [Contexts](/docs/api/contexts)
 * [Context Settings](/docs/api/context-settings)
 * [Custom Roles](/docs/api/custom-roles)
 * [Data Export Destinations](/docs/api/data-export-destinations)
 * [Environments](/docs/api/environments)
 * [Experiments](/docs/api/experiments)
 * [Feature Flags](/docs/api/feature-flags)
 * [Feature Flags Beta](/docs/api/feature-flags-beta)
 * [Flag Import Configurations Beta](/docs/api/flag-import-configurations-beta)
 * [Flag Links Beta](/docs/api/flag-links-beta)
 * [Flag Triggers](/docs/api/flag-triggers)
 * [Follow Flags](/docs/api/follow-flags)
 * [Holdouts Beta](/docs/api/holdouts-beta)
 * [Insights Charts Beta](/docs/api/insights-charts-beta)
 * [Insights Deployments Beta](/docs/api/insights-deployments-beta)
 * [Insights Flag Events Beta](/docs/api/insights-flag-events-beta)
 * [Insights Pull Requests Beta](/docs/api/insights-pull-requests-beta)
 * [Insights Repositories Beta](/docs/api/insights-repositories-beta)
 * [Insights Scores Beta](/docs/api/insights-scores-beta)
 * [Integration Audit Log Subscriptions](/docs/api/integration-audit-log-subscriptions)
 * [Integration Delivery Configurations Beta](/docs/api/integration-delivery-configurations-beta)
 * [Integrations Beta](/docs/api/integrations-beta)
 * [Layers](/docs/api/layers)
 * [Metrics](/docs/api/metrics)
 * [Metrics Beta](/docs/api/metrics-beta)
 * [O Auth2clients](/docs/api/o-auth-2-clients)
 * [Persistent Store Integrations Beta](/docs/api/persistent-store-integrations-beta)
 * [Projects](/docs/api/projects)
 * [Relay Proxy Configurations](/docs/api/relay-proxy-configurations)
 * [Release Pipelines Beta](/docs/api/release-pipelines-beta)
 * [Releases Beta](/docs/api/releases-beta)
 * [Scheduled Changes](/docs/api/scheduled-changes)
 * [Segments](/docs/api/segments)
 * [Tags](/docs/api/tags)
 * [Teams](/docs/api/teams)
 * [Teams Beta](/docs/api/teams-beta)
 * [Users](/docs/api/users)
 * [Users Beta](/docs/api/users-beta)
 * [User Settings](/docs/api/user-settings)
 * [Views Beta](/docs/api/views-beta)
 * [Webhooks](/docs/api/webhooks)
 * [Workflows](/docs/api/workflows)
 * [Workflow Templates](/docs/api/workflow-templates)
 * [Other](/docs/api/other)
 * Release Policies Beta
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [This feature is in beta](#this-feature-is-in-beta)
 * [Filtering applications and application versions](#filtering-applications-and-application-versions)
 * [Supported fields and operators](#supported-fields-and-operators)
 * [Sorting applications and application versions](#sorting-applications-and-application-versions)
> ### This feature is in beta
> To use this feature, pass in a header including the `LD-API-Version` key with value set to `beta`. Use this header with each call. To learn more, read [Beta resources](https://launchdarkly.com/docs/api#beta-resources).
> Resources that are in beta are still undergoing testing and development. They may change without notice, including becoming backwards incompatible.
The applications API lets you create, update, delete, and search for applications and application versions.
Each application includes information about the app you’re creating, and a set of versions of the app that you’ve released. You can use applications to target particular application versions in your feature flags more easily, and to handle unsupported application versions more gracefully.
In addition to creating applications through the applications API, you can also create applications in the LaunchDarkly user interface. To learn more, read [Applications and application versions](https://launchdarkly.com/docs/home/releases/applications). LaunchDarkly also creates applications and application versions automatically when a LaunchDarkly SDK evaluates a feature flag for a context that includes application information. To learn more, read [Automatic environment attributes](https://launchdarkly.com/docs/sdk/features/environment-attributes).
You can use an application in any project in your LaunchDarkly account.
### Filtering applications and application versions
The `filter` parameter supports the following operators: `equals`, `notEquals`, `anyOf`, `startsWith`.
You can also combine filters in the following ways:
 * Use a comma (`,`) as an AND operator
 * Use a vertical bar (`|`) as an OR operator
 * Use parentheses (`()`) to group filters
#### Supported fields and operators
You can only filter certain fields in applications when using the `filter` parameter. Additionally, you can only filter some fields with certain operators.
When you search for applications, the `filter` parameter supports the following fields and operators:
Field | Description | Supported operators 
---|---|--- 
`key` | The application or application version key, a unique identifier | `equals`, `notEquals`, `anyOf` 
`name` | The application name or application version name | `equals`, `notEquals`, `anyOf`, `startsWith` 
`autoAdded` | Whether the application or application version was automatically created because it was included in a context when a LaunchDarkly SDK evaluated a feature flag, or was created through the LaunchDarkly UI or REST API | `equals`, `notEquals` 
`kind` | The application kind, one of `mobile`, `server`, `browser`. Only available for [Get applications](https://launchdarkly.com/docs/api/applications-beta/get-applications). | `equals`, `notEquals`, `anyOf` 
`supported` | Whether a mobile application version is supported or unsupported. Only available for [Get application versions by application key](https://launchdarkly.com/docs/api/applications-beta/get-application-versions). | `equals`, `notEquals` 
For example, the filter `?filter=kind anyOf ["mobile", "server"]` matches applications whose `kind` is either `mobile` or `server`. The filter is not case-sensitive.
The documented values for `filter` query parameters are prior to URL encoding. For example, the `[` in `?filter=kind anyOf ["mobile", "server"]` must be encoded to `%5B`.
### Sorting applications and application versions
LaunchDarkly supports the following fields for sorting:
 * `name` sorts by application name.
 * `creationDate` sorts by the creation date of the application.
By default, the sort is in ascending order. Use `-` to sort in descending order. For example, `?sort=name` sorts the response by application name in ascending order, and `?sort=-name` sorts in descending order.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs