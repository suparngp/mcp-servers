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
Create Session Uploads
Create Session Uploads
cURL
Copy
Ask AI
```
curl --request POST \
 --url https://api.browserbase.com/v1/sessions/{id}/uploads \
 --header 'Content-Type: multipart/form-data' \
 --header 'X-BB-API-Key: <api-key>' \
 --form file=@example-file
```
200
Copy
Ask AI
```
{
 "message": "<string>"
}
```
POST
/
v1
/
sessions
/
{id}
/
uploads
Try it
Create Session Uploads
cURL
Copy
Ask AI
```
curl --request POST \
 --url https://api.browserbase.com/v1/sessions/{id}/uploads \
 --header 'Content-Type: multipart/form-data' \
 --header 'X-BB-API-Key: <api-key>' \
 --form file=@example-file
```
200
Copy
Ask AI
```
{
 "message": "<string>"
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
multipart/form-data
[​](#body-file)
file
file
required
#### Response
200 - application/json
The request has succeeded.
[​](#response-message)
message
string
required
Was this page helpful?
YesNo
[Session Recording](/reference/api/session-recording)[List Projects](/reference/api/list-projects)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.