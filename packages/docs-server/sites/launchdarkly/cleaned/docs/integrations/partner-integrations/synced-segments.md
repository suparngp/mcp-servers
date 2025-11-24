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
 * [About synced segments](#about-synced-segments)
 * [Request parser properties](#request-parser-properties)
 * [Examples](#examples)
 * [Boolean property](#boolean-property)
 * [Separate named arrays](#separate-named-arrays)
 * [Single property](#single-property)
 * [Response codes and custom responses](#response-codes-and-custom-responses)
 * [Testing](#testing)
## Overview
This topic explains how to use the synced segments integration framework capability.
## About synced segments
In LaunchDarkly, segments are lists of contexts that are used to manage flag targeting behavior in bulk. As a partner, you can use the synced segments integration framework capability to create and synchronize resources contained in external services, such as Amplitude cohorts or Segment Audiences, with LaunchDarkly segments. To learn more about segments, read [Segments](/docs/home/flags/segments).
The `syncedSegment` capability consists of a request parser. The properties of the parser describe the information about the segment to create or update.
Many of the parser properties are required, for example, the properties that specify the name and ID of the cohort you are updating.
Then, you have three options for how to send cohort information:
 * Use a [boolean property](/docs/integrations/partner-integrations/synced-segments#boolean-property) to indicate whether a member should be added or removed
 * Use [separate named arrays](/docs/integrations/partner-integrations/synced-segments#separate-named-arrays), one for members being added and one for members being removed
 * Use a [single `action` property](/docs/integrations/partner-integrations/synced-segments#single-property) to indicate whether the set of members should be added or removed
The combination of the request parser’s `memberArrayPath`, `addMemberArrayPath`, `removeMemberArrayPath`, and `memberArrayParser` properties describe which option you are using and where the integration framework can expect to find the cohort information.
### Request parser properties
The following properties specify the `requestParser`:
Property | Description 
---|--- 
`environmentIdPath` | (required) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains a valid LaunchDarkly client-side ID. 
`contextKindPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the segment’s context kind. If not specified, the context kind will default to `user`. To learn more about context kinds and where you can find a list of context kinds LaunchDarkly has observed, read [Context kinds](/docs/home/flags/context-kinds). 
`cohortIdPath` | (required) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the external resource’s ID. This field has a recommended limit of 128 characters. 
`cohortNamePath` | (required) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the external resource’s name. 
`cohortUrlPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the external resource’s URL. 
`jsonResponseBody` | A template string used to represent the JSON response body required by the external service. 
`arrayInclusion` | (optional) If the request contains a single property that defines the type of message being sent, for example,`add_members` or `remove_members`, the `arrayInclusion` property is required. It has the following properties of its own:
 * `path` (required): The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the action to be performed.
 * `matcher` (required): A regex pattern LaunchDarkly uses to determine if it should consider the parsed `path` action value as an added member. If the value does not match the regex provided, the member will be removed.
`memberArrayPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the list of members to be added or removed. 
Use this if you are using the [boolean property](/docs/integrations/partner-integrations/synced-segments#boolean-property) or [single `action` property](/docs/integrations/partner-integrations/synced-segments#single-property) to send cohort information. 
`addMemberArrayPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the list of members to be added or removed. 
Use this if you are using [separate named arrays](/docs/integrations/partner-integrations/synced-segments#separate-named-arrays) to send cohort information. Required if `removeMemberArrayPath` is specified. 
`removeMemberArrayPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the list of members to be added or removed. 
Use this if you are using [separate named arrays](/docs/integrations/partner-integrations/synced-segments#separate-named-arrays) to send cohort information. Required if `addMemberArrayPath` is specified. 
`memberArrayParser` | (optional) An object describing how to interpret the information about each member. All paths are relative to the parent member array path, that is, either `memberArrayPath` or `addMemberArrayPath` and `removeMemberArrayPath`. 
The following properties specify the embedded `memberArrayParser`:
Property | Description 
---|--- 
`memberIdPath` | (required) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the member’s ID, relative to the `memberArrayPath`. 
`booleanMembershipPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains a boolean property to indicate whether a member is to be added or removed. Required if `memberArrayPath` is specified. 
`cohortIdPath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the external resource’s ID. This value will override the cohort name for a single member. 
`cohortNamePath` | (optional) The [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) representation of a location in the HTTP request body that contains the external resource’s name. This value will override the cohort ID for a single member. 
## Examples
The following sections contain examples of different types of request bodies and the manifest definitions of synced segment capabilities that would successfully parse them.
### Boolean property
In the request body, use a boolean property to indicate whether a member is added or removed:
Example request bodyExample manifest (excerpt)
```
1
| {
---|--- 
2
| "environmentId": "abcd123",
3
| "contextKind": "organization",
4
| "batch": [
5
| {
6
| "userId": "user-1234",
7
| "cohortName": "Segment 1234",
8
| "cohortId": "segment-1234",
9
| "cohortUrl": "https://example.com",
10
| "value": true
11
| },
12
| {
13
| "userId": "user-5678",
14
| "cohortName": "Segment 1235",
15
| "cohortId": "segment-12345",
16
| "cohortUrl": "https://example.com",
17
| "value": false
18
| }
19
| ]
20
| }
```
### Separate named arrays
In the request body, use separate named arrays containing lists of members to add and remove. In the manifest, the `memberArrayParser` describes how to parse the `addMemberArrayPath` and `removeMemberArrayPath` arrays:
Example request bodyExample manifest (excerpt)
```
1
| {
---|--- 
2
| "id_token": "CustomerIdToken",
3
| "action_type": "segment.users.sync",
4
| "customer_config": {
5
| "fields": [
6
| {
7
| "field_id": "workspace",
8
| "field_display_name": "Workspace",
9
| "value": {
10
| "id": "abcd123",
11
| "display_name": "Workspace 1"
12
| }
13
| }
14
| ]
15
| },
16
| "data": {
17
| "segment": {
18
| "id": "segment-1234",
19
| "name": "Segment 1234"
20
| },
21
| "add": [
22
| {
23
| "id": "user-123"
24
| },
25
| {
26
| "id": "user-456"
27
| }
28
| ],
29
| "remove": [
30
| {
31
| "id": "user-789"
32
| },
33
| {
34
| "id": "user-101112"
35
| }
36
| ]
37
| }
38
| }
```
### Single property
In the request body, use a single `action` property for the entire batch to indicate whether the batch should be added or removed:
Example request bodyExample manifest (excerpt)
```
1
| {
---|--- 
2
| "action": "add_members",
3
| "parameters": {
4
| "integration_project_id": "abcd123",
5
| "integration_cohort_name": "Segment 1234",
6
| "integration_cohort_id": "segment-1234",
7
| "integration_cohort_description": "description",
8
| "integration_session_id": "integration_session_id",
9
| "members": [
10
| {
11
| "email": "user-1234@customer.com",
12
| "integration_distinct_id": "user-1234",
13
| "first_name": "John",
14
| "last_name": "Doe",
15
| "phone_number": "xxx-xxx-xxxx"
16
| },
17
| {
18
| "email": "user-5678@customer.com",
19
| "integration_distinct_id": "user-5678",
20
| "first_name": "Jane",
21
| "last_name": "Doe",
22
| "phone_number": "xxx-xxx-xxxx"
23
| }
24
| ]
25
| }
26
| }
```
### Response codes and custom responses
By default, LaunchDarkly returns one of the following response codes:
 * `204`, success
 * `400`, parsing problem
 * `403`, unauthorized
 * `409`, conflict
 * `429`, rate limited, read [Rate limiting](/docs/api#rate-limiting) for details on the `X-Ratelimit-Reset` header
 * `500`, internal error
If you require a custom response, you can specify that with the `jsonResponseBody` in the `syncedSegments` object in your integration manifest. The `jsonResponseBody` supports Handlebars templating directly in the manifest.
Here is an example manifest excerpt that specifies a `jsonResponseBody`:
Example manifest (excerpt)
```
1
| "capabilities": {
---|--- 
2
| "syncedSegment": {
3
| "requestParser": {
4
| ...
5
| },
6
| "jsonResponseBody": "{ \"environmentId\": \"{{requestBody.environmentId}}\", \"projectKey\": \"{{projectKey}}\", \"envKey\": \"{{environmentKey}}\", \"segmentKey\": \"{{segmentKey}}\", \"segmentUrl\": \"{{segmentUrl}}\", {{#if errorMessage}}\"status\":\"failure\", \"error\": {\"message\": \"{{{errorMessage}}}\", \"code\": {{statusCode}} }{{else}}\"status\": \"success\"{{/if}} }"
7
| }
8
| }
```
## Testing
After you have an initial implementation of your synced segments capability, you can test it using LaunchDarkly’s integration validation server. To learn more, read [Validating an integration](/docs/integrations/partner-integrations/validating).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs