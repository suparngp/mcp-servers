[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Overview
 * [Introduction](/reference/introduction)
##### SDKs
 * [Overview](/reference/sdk/overview)
 * [Node.js SDK](/reference/sdk/nodejs)
 * [Python SDK](/reference/sdk/python)
##### APIs
 * [Overview](/reference/api/overview)
 * Sessions API
 * [POSTCreate a Session](/reference/api/create-a-session)
 * [GETList Sessions](/reference/api/list-sessions)
 * [GETGet a Session](/reference/api/get-a-session)
 * [POSTUpdate a Session](/reference/api/update-a-session)
 * [GETSession Live URLs](/reference/api/session-live-urls)
 * [GETSession Downloads](/reference/api/session-downloads)
 * [GETSession Logs](/reference/api/session-logs)
 * [GETSession Recording](/reference/api/session-recording)
 * [POSTCreate Session Uploads](/reference/api/create-session-uploads)
 * Projects API
 * Contexts API
 * Extensions API
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Sessions API
Update a Session
Update a Session
cURL
Copy
Ask AI
```
curl --request POST \
 --url https://api.browserbase.com/v1/sessions/{id} \
 --header 'Content-Type: application/json' \
 --header 'X-BB-API-Key: <api-key>' \
 --data '{
 "projectId": "<string>",
 "status": "REQUEST_RELEASE"
}'
```
200
Copy
Ask AI
```
{
 "id": "<string>",
 "createdAt": "2023-11-07T05:31:56Z",
 "updatedAt": "2023-11-07T05:31:56Z",
 "projectId": "<string>",
 "startedAt": "2023-11-07T05:31:56Z",
 "endedAt": "2023-11-07T05:31:56Z",
 "expiresAt": "2023-11-07T05:31:56Z",
 "status": "RUNNING",
 "proxyBytes": 123,
 "avgCpuUsage": 1,
 "memoryUsage": 1,
 "keepAlive": true,
 "contextId": "<string>",
 "region": "us-west-2",
 "userMetadata": {}
}
```
POST
/
v1
/
sessions
/
{id}
Try it
Update a Session
cURL
Copy
Ask AI
```
curl --request POST \
 --url https://api.browserbase.com/v1/sessions/{id} \
 --header 'Content-Type: application/json' \
 --header 'X-BB-API-Key: <api-key>' \
 --data '{
 "projectId": "<string>",
 "status": "REQUEST_RELEASE"
}'
```
200
Copy
Ask AI
```
{
 "id": "<string>",
 "createdAt": "2023-11-07T05:31:56Z",
 "updatedAt": "2023-11-07T05:31:56Z",
 "projectId": "<string>",
 "startedAt": "2023-11-07T05:31:56Z",
 "endedAt": "2023-11-07T05:31:56Z",
 "expiresAt": "2023-11-07T05:31:56Z",
 "status": "RUNNING",
 "proxyBytes": 123,
 "avgCpuUsage": 1,
 "memoryUsage": 1,
 "keepAlive": true,
 "contextId": "<string>",
 "region": "us-west-2",
 "userMetadata": {}
}
```
#### Authorizations
[​](#authorization-x-bb-api-key)
X-BB-API-Key
string
header
required
Your [Browserbase API Key](https://www.browserbase.com/settings).
#### Path Parameters
[​](#parameter-id)
id
string
required
#### Body
application/json
[​](#body-project-id)
projectId
string
required
The Project ID. Can be found in [Settings](https://www.browserbase.com/settings).
[​](#body-status)
status
enum<string>
required
Set to `REQUEST_RELEASE` to request that the session complete. Use before session's timeout to avoid additional charges.
Available options:
`REQUEST_RELEASE`
#### Response
200 - application/json
The request has succeeded.
[​](#response-id)
id
string
required
[​](#response-created-at)
createdAt
string<date-time>
required
[​](#response-updated-at)
updatedAt
string<date-time>
required
[​](#response-project-id)
projectId
string
required
The Project ID linked to the Session.
[​](#response-started-at)
startedAt
string<date-time>
required
[​](#response-expires-at)
expiresAt
string<date-time>
required
[​](#response-status)
status
enum<string>
required
Available options:
`RUNNING`,
`ERROR`,
`TIMED_OUT`,
`COMPLETED`
[​](#response-proxy-bytes)
proxyBytes
integer
required
Bytes used via the [Proxy](/features/stealth-mode#proxies-and-residential-ips)
[​](#response-keep-alive)
keepAlive
boolean
required
Indicates if the Session was created to be kept alive upon disconnections
[​](#response-region)
region
enum<string>
required
The region where the Session is running.
Available options:
`us-west-2`,
`us-east-1`,
`eu-central-1`,
`ap-southeast-1`
[​](#response-ended-at)
endedAt
string<date-time>
[​](#response-avg-cpu-usage)
avgCpuUsage
integer
CPU used by the Session
Required range: `x >= 0`
[​](#response-memory-usage)
memoryUsage
integer
Memory used by the Session
Required range: `x >= 0`
[​](#response-context-id)
contextId
string
Optional. The Context linked to the Session.
[​](#response-user-metadata)
userMetadata
object
Arbitrary user metadata to attach to the session. To learn more about metadata, see [Metadata](/features/session-metadata).
Was this page helpful?
YesNo
[Get a Session](/reference/api/get-a-session)[Session Live URLs](/reference/api/session-live-urls)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.