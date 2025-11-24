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
 * [Migrating your API access tokens](#migrating-your-api-access-tokens)
 * [Updating your request header](#updating-your-request-header)
 * [Migrating your client libraries](#migrating-your-client-libraries)
 * [Working with paginated endpoints](#working-with-paginated-endpoints)
 * [Example: Working with paginated endpoints](#example-working-with-paginated-endpoints)
 * [Changes to the access tokens API](#changes-to-the-access-tokens-api)
 * [Changes to the account members API](#changes-to-the-account-members-api)
 * [Changes to the custom roles API](#changes-to-the-custom-roles-api)
 * [Changes to the feature flags API](#changes-to-the-feature-flags-api)
 * [Changes to the segments API](#changes-to-the-segments-api)
 * [Changes to the teams API](#changes-to-the-teams-api)
 * [Changes to the workflows API](#changes-to-the-workflows-api)
 * [Removal of deprecated users APIs](#removal-of-deprecated-users-apis)
## Overview
This topic explains changes in the `20240415` version of the LaunchDarkly REST API and how to migrate to that version.
**The`20240415` REST API version includes breaking changes. We strongly recommend upgrading to the latest API version as soon as possible.** All customers will be required to use version `20240415` as of January 1, 2027.
The `20220603` REST API version reaches its end of life on December 31, 2026
The `20220603` REST API version reaches its end of life on December 31, 2026. After this date, you will no longer be able to access version `20220603`, and must upgrade to version `20240415`.
Specifically, the `20240415` version:
 * changes several endpoints from unpaginated to paginated result sets, following common industry best practices
 * removes a few infrequently used or less performant filters from some endpoints
 * removes the previously deprecated Users, Users (beta), and User settings APIs
These changes are focused on improving performance and stability of the API. There are two ways to upgrade to the latest API version:
 * Create a new access token and set it to use the latest version, `20240415`. Replace all uses of your existing access token with this new token.
 * Update the `LD-API-Version` header in all of your requests to `20240415`. Here’s how:
To use the new version, update your request header
```
LD-API-Version: 20240415 
--- 
```
The following sections describe how to migrate your API access tokens, the details of the API changes, and how to work with the new version. You can find a summary of these changes under [Versioning](/docs/api#versioning) in the [LaunchDarkly REST API documentation](/docs/api). This section also includes the End of Life (EOL) information for each REST API version. The `20220603` version has reached EOL as of April 15, 2025.
If you have questions or would like assistance during this transition, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
##### No LaunchDarkly SDKs are being deprecated as part of this work
This guide applies **only** to the LaunchDarkly REST APIs. No LaunchDarkly SDKs are being deprecated as part of the changes described in this guide.
To learn more about the differences between these offerings, read [Comparing LaunchDarkly’s SDKs and REST API](/docs/guides/api/comparing-sdk-rest-api). To review information on currently supported LaunchDarkly SDK versions, read [Supported versions](/docs/sdk/concepts/supported-versions).
## Migrating your API access tokens
When you create a new API access token, by default its version is now `20240415`.
Only currently supported versions are available when you create new access tokens. However, you may have older API access tokens that are set to unsupported versions.
To upgrade your integration to use a new API version, you can either create a new access token, or explicitly set the `LD-API-Version` header in each request. We recommend that you set the API version header explicitly.
### Updating your request header
To use the new version, update your request header to include `LD-API-Version: 20240415`. For example:
Example curl
```
$
| curl -X GET 'https://app.launchdarkly.com/api/v2/projects/MY-PROJECT-KEY' \
---|--- 
>
| -H 'LD-API-Version: 20240415' \
>
| -H 'Authorization: EXAMPLE-API-ACCESS-TOKEN' \
>
| -H 'Content-Type: application/json'
```
##### Best practice: Set the header for every client or integration
We recommend that you set the API version header explicitly in any client or integration you build. Only rely on the access token API version during manual testing.
## Migrating your client libraries
If you are using the LaunchDarkly REST API through one of our [generated client libraries](/docs/api#openapi-swagger-and-client-libraries), upgrade to version 16.x or later to use the `20240415` version.
## Working with paginated endpoints
The following endpoints previously served unpaginated results, and now serve paginated results in version `20240415`:
 * [List access tokens](/docs/api/access-tokens/get-tokens)
 * [List custom roles](/docs/api/custom-roles/get-custom-roles)
 * [List feature flags](/docs/api/feature-flags/get-feature-flags)
 * [List segments](/docs/api/segments/get-segments)
In each case, you can use the `limit` and `offset` query parameters to page through the results.
To page through the results, repeat each request, increasing the `offset` by the `limit` each time, until one of the following is true:
 * you have found the particular result you are looking for
 * the `items` array in the response is empty
 * the `offset` is greater than the `totalCount` in the response, if available
Each paginated endpoint includes a default page size, typically 20. You can customize this as needed using the `limit` query parameter.
### Example: Working with paginated endpoints
For example, previously your request may have looked like:
Previous API version, unpaginated request to 'List feature flags'
```
curl -X GET 'https://app.launchdarkly.com/api/v2/flags/{projectKey}' \ 
--- 
 -H 'LD-API-Version: 20240415' \ 
 -H 'Authorization: EXAMPLE-API-ACCESS-TOKEN' 
```
Now, it should look like:
20240415 API version, paginated request to 'List feature flags'
```
curl -X GET 'https://app.launchdarkly.com/api/v2/flags/{projectKey}?limit=20&offset=0' \ 
--- 
 -H 'LD-API-Version: 20240415' \ 
 -H 'Authorization: EXAMPLE-API-ACCESS-TOKEN' 
```
You should repeat this request, increasing the `offset` by the `limit` each time, until you find the result you are looking for, or have paged through all of the results.
## Changes to the access tokens API
In the `20240415` API version, the [List access tokens](/docs/api/access-tokens/get-tokens) endpoint is now paginated. It has a default page size of 25. The maximum for the `limit` query parameter is 1000.
## Changes to the account members API
In the `20240415` API version, the [List account members](/docs/api/account-members/get-members) endpoint no longer supports the `accessCheck` filter. Additionally, the maximum for the `limit` query parameter is now 1000.
## Changes to the custom roles API
In the `20240415` API version, the [List custom roles](/docs/api/custom-roles/get-custom-roles) endpoint is now paginated. It has a default page size of 20. The maximum for the `limit` query parameter is 1000.
## Changes to the feature flags API
In the `20240415` API version, the [List feature flags](/docs/api/feature-flags/get-feature-flags) endpoint is now paginated. It has a default page size of 20. The maximum for the `limit` query parameter is 100.
Additionally, the following filters are no longer available:
 * `followerId`
 * `hasDataExport`
 * `status`
 * `contextKindTargeted`
 * `segmentTargeted`
The `compare` query parameter has also been removed.
Finally, the `environments` field is now only included in the response if the request is filtered by environment, using the `env` query parameter.
## Changes to the segments API
In the `20240415` API version, the [List segments](/docs/api/segments/get-segments) endpoint is now paginated. It has a default page size of 20. The maximum for the `limit` query parameter is 50.
## Changes to the teams API
In the `20240415` API version, the [List teams](/docs/api/teams/get-teams) endpoint no longer supports expanding the `projects` or `roles` fields in the response.
Additionally, the maximum for the `limit` query parameter is now 100.
## Changes to the workflows API
In the `20240415` API version, the [Get workflows](/docs/api/workflows/get-workflows) endpoint is now paginated. It has a default page size of 20. The maximum for the `limit` query parameter is 200.
Additionally, the `_conflicts` field in the response is no longer available.
## Removal of deprecated users APIs
The Users API, Users (beta) API, and User settings API were deprecated in May 2023. Following the release of the `20240415` API version, these deprecated APIs are being removed completely.
If you were using… | …you should now use 
---|--- 
Users API: Find users (`getSearchUsers`) | Contexts API: [Search for context instances](/docs/api/contexts/search-context-instances) (`searchContextInstances`) 
Users API: List users (`getUsers`) | Contexts API: [Search for contexts](/docs/api/contexts/search-contexts) (`searchContexts`) 
Users API: Get user (`getUser`) | Contexts API: [Get context instances](/docs/api/contexts/get-context-instances) (`getContextInstances`) 
Users API: Delete user (`deleteUser`) | Contexts API: [Delete context instances](/docs/api/contexts/delete-context-instances) (`deleteContextInstances`) 
Users (beta) API: Get user attribute names (`getUserAttributeNames`) | Contexts API: [Get context attribute names](/docs/api/contexts/get-context-attribute-names) (`getContextAttributeNames`) 
User settings API: List flag settings for user (`getUserFlagSettings`) | No direct equivalent. Contexts API: [Evaluate flags for context instance](/docs/api/contexts/get-contexts) (`evaluateContextInstance`) may be equivalent in some situations. 
User settings API: Get flag setting for user (`getUserFlagSetting`) | No direct equivalent. Consider using the [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons) feature in the LaunchDarkly SDK. 
User settings API: Update flag settings for user (`putFlagSetting`) | Context settings API: [Update flag settings for context](/docs/api/context-settings/put-context-flag-setting) (`putContextFlagSetting`) 
User settings API: Get expiring dates on flags for user (`getExpiringFlagsForUser`) | No direct equivalent. 
User settings API: Update expiring user target for flags (`patchExpiringFlagsForUser`) | Feature flags API: [Update expiring context targets on feature flag](/docs/api/feature-flags/patch-expiring-targets) (`patchExpiringTargets`), use the semantic patch instruction `addExpiringTarget` 
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs