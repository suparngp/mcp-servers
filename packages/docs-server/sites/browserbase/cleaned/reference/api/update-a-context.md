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
Update a Context
Update a Context
cURL
Copy
Ask AI
```
curl --request PUT \
 --url https://api.browserbase.com/v1/contexts/{id} \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
{
 "id": "<string>",
 "uploadUrl": "<string>",
 "publicKey": "<string>",
 "cipherAlgorithm": "<string>",
 "initializationVectorSize": 123
}
```
PUT
/
v1
/
contexts
/
{id}
Try it
Update a Context
cURL
Copy
Ask AI
```
curl --request PUT \
 --url https://api.browserbase.com/v1/contexts/{id} \
 --header 'X-BB-API-Key: <api-key>'
```
200
Copy
Ask AI
```
{
 "id": "<string>",
 "uploadUrl": "<string>",
 "publicKey": "<string>",
 "cipherAlgorithm": "<string>",
 "initializationVectorSize": 123
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
[​](#response-upload-url)
uploadUrl
string
required
An upload URL to upload a custom user-data-directory.
Minimum length: `1`
[​](#response-public-key)
publicKey
string
required
The public key to encrypt the user-data-directory.
[​](#response-cipher-algorithm)
cipherAlgorithm
string
required
The cipher algorithm used to encrypt the user-data-directory. AES-256-CBC is currently the only supported algorithm.
[​](#response-initialization-vector-size)
initializationVectorSize
integer
required
The initialization vector size used to encrypt the user-data-directory. [Read more about how to use it](/features/contexts).
Was this page helpful?
YesNo
[Get a Context](/reference/api/get-a-context)[Delete a Context](/reference/api/delete-a-context)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.