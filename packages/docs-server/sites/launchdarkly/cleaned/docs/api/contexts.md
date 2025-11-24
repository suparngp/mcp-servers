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
 * [Filtering contexts and context instances](#filtering-contexts-and-context-instances)
 * [after](#after)
 * [anyOf](#anyof)
 * [before](#before)
 * [contains](#contains)
 * [equals](#equals)
 * [exists](#exists)
 * [notEquals](#notequals)
 * [startsWith](#startswith)
 * [Supported fields and operators](#supported-fields-and-operators)
Contexts are people, services, machines, or other resources that encounter feature flags in your product. Contexts are identified by their `kind`, which describes the type of resources encountering flags, and by their `key`. Each unique combination of one or more contexts that have encountered a feature flag in your product is called a context instance.
When you use the LaunchDarkly SDK to evaluate a flag, you provide a context to that call. LaunchDarkly records the key and attributes of each context instance. You can view these in the LaunchDarkly user interface from the **Contexts** list, or use the Context APIs. To learn more, read [Contexts](https://launchdarkly.com/docs/home/observability/contexts).
LaunchDarkly provides APIs for you to:
 * retrieve contexts, context instances, and context attribute names and values
 * search for contexts or context instances
 * delete context instances
 * fetch context kinds
 * create and update context kinds
To learn more about context kinds, read [Context kinds](https://launchdarkly.com/docs/home/observability/context-kinds).
Contexts are always scoped within a project and an environment. Each environment has its own set of context instance records.
Several of the endpoints in the contexts API require a context instance ID or application ID. Both of these IDs are returned as part of the [Search for context instances](https://launchdarkly.com/docs/api/contexts/search-context-instances) response. The context instance ID is the `id` field of each element in the `items` array. The application ID is the `applicationId` field of each element in the `items` array. By default, the application ID is set to the SDK you are using. In the LaunchDarkly UI, the application ID and application version appear on the context details page in the “From source” field. You can change the application ID as part of your SDK configuration. To learn more, read [Application metadata configuration](https://launchdarkly.com/docs/sdk/features/app-config).
### Filtering contexts and context instances
When you [search for contexts](https://launchdarkly.com/docs/api/contexts/search-contexts) or [context instances](https://launchdarkly.com/docs/api/contexts/search-context-instances), you can filter the results using fields and operators with the `filter` parameter. Specify `filter` either as a query parameter or as a request body parameter.
The `filter` parameter supports the following operators: `after`, `anyOf`, `before`, `contains`, `equals`, `exists`, `notEquals`, `startsWith`.
Expand for details on operators and syntax
#### after
Returns contexts or context instances if the date field value occurs after the specified time. For example:
 * `myField after "2022-09-21T19:03:15+00:00"`
#### anyOf
Returns contexts or context instances if any field value matches any of the provided values. For example:
 * `myField anyOf [44]`
 * `myField anyOf ["phone","tablet"]`
 * `myField anyOf [true]"`
#### before
Returns contexts or context instances if the date field value occurs before the provided time. For example:
 * `myField before "2022-09-21T19:03:15+00:00"`
#### contains
Returns contexts or context instances if the field’s list of values contains all of the provided values. For example:
 * `myListField contains 44`
 * `myListField contains ["phone","tablet"]`
 * `myListField contains true`
#### equals
Returns contexts or context instances only if the field value exactly matches the provided value. For example:
 * `myField equals 44`
 * `myField equals "device"`
 * `myField equals true`
 * `myField equals [1,2,3,4]`
 * `myField equals ["hello","goodbye"]`
#### exists
Returns contexts or context instances based on whether the specified field exists. For example:
 * `myField exists true`
 * `myField exists false`
 * `*.name exists true`
#### notEquals
Returns contexts or context instances if the field value does not exactly match the provided value. For example:
 * `myField notEquals 44`
 * `myField notEquals "device"`
 * `myField notEquals true`
 * `myField notEquals [1,2,3,4]`
 * `myField notEquals ["hello","goodbye"]`
#### startsWith
Returns contexts or context instances if a singular string field value begins with the provided substring. For example:
 * `myField startsWith "do"`
You can also combine filters in the following ways:
 * Use a comma (`,`) as an AND operator
 * Use a vertical bar (`|`) as an OR operator
 * Use parentheses `()` to group filters
For example:
 * `myField notEquals 0, myField notEquals 1` returns contexts or context instances where `myField` is not 0 and is not 1
 * `myFirstField equals "device",(mySecondField equals "iPhone"|mySecondField equals "iPad")` returns contexts or context instances where `myFirstField` is equal to “device” and `mySecondField` is equal to either “iPhone” or “iPad”
#### Supported fields and operators
The `filter` parameter accepts different field types depending on whether you search for contexts or context instances. Also, you can only filter some fields using certain operators.
When you search for [contexts](https://launchdarkly.com/docs/api/contexts/search-contexts), the `filter` parameter supports the following fields and operators:
Field | Description | Supported operators 
---|---|--- 
`applicationId` | An identifier that represents the application where the LaunchDarkly SDK is running. | `equals`, `notEquals`, `anyOf` 
`id` | The unique identifier for the context. | `equals`, `notEquals`, `anyOf` 
`key` | The context key. | `equals`, `notEquals`, `anyOf`, `startsWith` 
`kind` | The context kind. | `equals`, `notEquals`, `anyOf` 
`kinds` | A list of all kinds found in the context. Supply a list of strings to the operator. | `equals`, `anyOf`, `contains` 
`kindKey` | The kind and key for the context, joined with a `:`. For example, `user:user-key-abc123`. | `equals`, `notEquals`, `anyOf` 
`kindKeys` | A list of all kinds and keys found in the context. Join the kind and key with a `:`. For example, `user:user-key-abc123`. Supply a list of strings to the operator. | `equals`, `anyOf`, `contains` 
`q` | A “fuzzy” search across context attribute values and the context key. Supply a string or list of strings to the operator. | `equals` 
`name` | The name for the context. | `equals`, `notEquals`, `exists`, `anyOf`, `startsWith` 
`<a kind>.<an attribute name>` | A kind and the name of any attribute that appears in a context of that kind, for example, `user.email`. To filter all kinds use `*` in place of the kind. For example, `*.email`. You can use either a literal attribute name or a JSON path to specify the attribute. If you use a JSON path, then you must escape the `/` character using `~1`, and escape the `~` character using `~0`. For example, use `user.job/title` or `user./job~1title` to filter the `/job/title` field in a user context kind. If the field or value includes whitespace, enclose it in double quotes. | `equals`, `notEquals`, `exists`, `startsWith`, `before`, `after`. 
When searching for [context instances](https://launchdarkly.com/docs/api/contexts/search-context-instances), the `filter` parameter supports the following fields and operators:
Field | Description | Supported operators 
---|---|--- 
`applicationId` | An identifier representing the application where the LaunchDarkly SDK is running. | `equals`, `notEquals`, `anyOf` 
`id` | The unique identifier for the context instance. | `equals`, `notEquals`, `anyOf` 
`kinds` | A list of all kinds found in the context instance. Supply a list of strings to the operator. | `equals`, `anyOf`, `contains` 
`kindKeys` | A list of all kinds and keys found in the context instance. The kind and key are joined with `:`. For example, `user:user-key-abc123`. Supply a list of strings to the operator. | `equals`, `anyOf`, `contains` 
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs