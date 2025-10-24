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
Session Logs
Session Logs
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/sessions/{id}/logs \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
[
 {
 "method": "<string>",
 "pageId": 123,
 "sessionId": "<string>",
 "request": {
 "timestamp": 123,
 "params": {},
 "rawBody": "<string>"
 },
 "response": {
 "timestamp": 123,
 "result": {},
 "rawBody": "<string>"
 },
 "timestamp": 123,
 "frameId": "<string>",
 "loaderId": "<string>"
 }
]
```
GET
/
v1
/
sessions
/
{id}
/
logs
Try it
Session Logs
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/sessions/{id}/logs \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
[
 {
 "method": "<string>",
 "pageId": 123,
 "sessionId": "<string>",
 "request": {
 "timestamp": 123,
 "params": {},
 "rawBody": "<string>"
 },
 "response": {
 "timestamp": 123,
 "result": {},
 "rawBody": "<string>"
 },
 "timestamp": 123,
 "frameId": "<string>",
 "loaderId": "<string>"
 }
]
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
#### Response
200 - application/json
The request has succeeded.
[​](#response-method)
method
string
required
[​](#response-page-id)
pageId
integer
required
[​](#response-session-id)
sessionId
string
required
[​](#response-request)
request
object
Show child attributes
[​](#response-response)
response
object
Show child attributes
[​](#response-timestamp)
timestamp
integer
milliseconds that have elapsed since the UNIX epoch
[​](#response-frame-id)
frameId
string
[​](#response-loader-id)
loaderId
string
Was this page helpful?
YesNo
[Session Downloads](/reference/api/session-downloads)[Session Recording](/reference/api/session-recording)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.