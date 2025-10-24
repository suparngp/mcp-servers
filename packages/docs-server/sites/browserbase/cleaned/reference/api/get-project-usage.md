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
Get Project Usage
Get Project Usage
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/projects/{id}/usage \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
{
 "browserMinutes": 1,
 "proxyBytes": 1
}
```
GET
/
v1
/
projects
/
{id}
/
usage
Try it
Get Project Usage
cURL
Copy
Ask AI
```
curl --request GET \
 --url https://api.browserbase.com/v1/projects/{id}/usage \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
{
 "browserMinutes": 1,
 "proxyBytes": 1
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
[​](#response-browser-minutes)
browserMinutes
integer
required
Required range: `x >= 0`
[​](#response-proxy-bytes)
proxyBytes
integer
required
Required range: `x >= 0`
Was this page helpful?
YesNo
[Get a Project](/reference/api/get-a-project)[Create a Context](/reference/api/create-a-context)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.