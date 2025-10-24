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
 * [POSTCreate a Context](/reference/api/create-a-context)
 * [GETGet a Context](/reference/api/get-a-context)
 * [PUTUpdate a Context](/reference/api/update-a-context)
 * [DELDelete a Context](/reference/api/delete-a-context)
 * Extensions API
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Contexts API
Delete a Context
Delete a Context
cURL
Copy
Ask AI
```
curl --request DELETE \
 --url https://api.browserbase.com/v1/contexts/{id} \
 --header 'X-BB-API-Key: <api-key>'
```
DELETE
/
v1
/
contexts
/
{id}
Try it
Delete a Context
cURL
Copy
Ask AI
```
curl --request DELETE \
 --url https://api.browserbase.com/v1/contexts/{id} \
 --header 'X-BB-API-Key: <api-key>'
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
204
There is no content to send for this request, but the headers may be useful.
Was this page helpful?
YesNo
[Update a Context](/reference/api/update-a-context)[Upload an Extension](/reference/api/upload-an-extension)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.