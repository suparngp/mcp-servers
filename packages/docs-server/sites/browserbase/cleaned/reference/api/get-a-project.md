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
 * [GETList Projects](/reference/api/list-projects)
 * [GETGet a Project](/reference/api/get-a-project)
 * [GETGet Project Usage](/reference/api/get-project-usage)
 * Contexts API
 * Extensions API
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Projects API
Get a Project
Get a Project
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/projects/{id} \
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
 "name": "<string>",
 "ownerId": "<string>",
 "defaultTimeout": 10830,
 "concurrency": 2
}
```
GET
/
v1
/
projects
/
{id}
Try it
Get a Project
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/projects/{id} \
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
 "name": "<string>",
 "ownerId": "<string>",
 "defaultTimeout": 10830,
 "concurrency": 2
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
[​](#response-name)
name
string
required
Minimum length: `1`
[​](#response-owner-id)
ownerId
string
required
[​](#response-default-timeout)
defaultTimeout
integer
required
Required range: `60 <= x <= 21600`
[​](#response-concurrency)
concurrency
integer
required
The maximum number of sessions that this project can run concurrently.
Required range: `x >= 1`
Was this page helpful?
YesNo
[List Projects](/reference/api/list-projects)[Get Project Usage](/reference/api/get-project-usage)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.