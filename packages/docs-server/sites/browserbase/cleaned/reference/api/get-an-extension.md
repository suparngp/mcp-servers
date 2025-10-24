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
 * Projects API
 * Contexts API
 * Extensions API
 * [POSTUpload an Extension](/reference/api/upload-an-extension)
 * [GETGet an Extension](/reference/api/get-an-extension)
 * [DELDelete an Extension](/reference/api/delete-an-extension)
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Extensions API
Get an Extension
Get an Extension
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/extensions/{id} \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
{
 "id": "<string>",
 "createdAt": "2023-11-07T05:31:56Z",
 "updatedAt": "2023-11-07T05:31:56Z",
 "fileName": "<string>",
 "projectId": "<string>"
}
```
GET
/
v1
/
extensions
/
{id}
Try it
Get an Extension
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/extensions/{id} \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
{
 "id": "<string>",
 "createdAt": "2023-11-07T05:31:56Z",
 "updatedAt": "2023-11-07T05:31:56Z",
 "fileName": "<string>",
 "projectId": "<string>"
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
[​](#response-file-name)
fileName
string
required
Minimum length: `1`
[​](#response-project-id)
projectId
string
required
The Project ID linked to the uploaded Extension.
Was this page helpful?
YesNo
[Upload an Extension](/reference/api/upload-an-extension)[Delete an Extension](/reference/api/delete-an-extension)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.