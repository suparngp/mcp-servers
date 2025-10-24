[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Schema Reference
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Specification](/specification/draft)
 * [Key Changes](/specification/draft/changelog)
 * [Architecture](/specification/draft/architecture)
##### Base Protocol
 * [Overview](/specification/draft/basic)
 * [Lifecycle](/specification/draft/basic/lifecycle)
 * [Transports](/specification/draft/basic/transports)
 * [Authorization](/specification/draft/basic/authorization)
 * [Security Best Practices](/specification/draft/basic/security_best_practices)
 * Utilities
##### Client Features
 * [Roots](/specification/draft/client/roots)
 * [Sampling](/specification/draft/client/sampling)
 * [Elicitation](/specification/draft/client/elicitation)
##### Server Features
 * [Overview](/specification/draft/server)
 * [Prompts](/specification/draft/server/prompts)
 * [Resources](/specification/draft/server/resources)
 * [Tools](/specification/draft/server/tools)
 * Utilities
 * [Schema Reference](/specification/draft/schema)
On this page
 * [Common Types](#common-types)
 * [Annotations](#annotations)
 * [AudioContent](#audiocontent)
 * [BlobResourceContents](#blobresourcecontents)
 * [BooleanSchema](#booleanschema)
 * [ClientCapabilities](#clientcapabilities)
 * [ContentBlock](#contentblock)
 * [Cursor](#cursor)
 * [EmbeddedResource](#embeddedresource)
 * [EmptyResult](#emptyresult)
 * [EnumSchema](#enumschema)
 * [Error](#error)
 * [Icon](#icon)
 * [ImageContent](#imagecontent)
 * [Implementation](#implementation)
 * [JSONRPCError](#jsonrpcerror)
 * [JSONRPCNotification](#jsonrpcnotification)
 * [JSONRPCRequest](#jsonrpcrequest)
 * [JSONRPCResponse](#jsonrpcresponse)
 * [LoggingLevel](#logginglevel)
 * [ModelHint](#modelhint)
 * [ModelPreferences](#modelpreferences)
 * [NumberSchema](#numberschema)
 * [PrimitiveSchemaDefinition](#primitiveschemadefinition)
 * [ProgressToken](#progresstoken)
 * [Prompt](#prompt)
 * [PromptArgument](#promptargument)
 * [PromptMessage](#promptmessage)
 * [PromptReference](#promptreference)
 * [RequestId](#requestid)
 * [Resource](#resource)
 * [ResourceContents](#resourcecontents)
 * [ResourceLink](#resourcelink)
 * [ResourceTemplate](#resourcetemplate)
 * [ResourceTemplateReference](#resourcetemplatereference)
 * [Result](#result)
 * [Role](#role)
 * [Root](#root)
 * [SamplingMessage](#samplingmessage)
 * [ServerCapabilities](#servercapabilities)
 * [StringSchema](#stringschema)
 * [TextContent](#textcontent)
 * [TextResourceContents](#textresourcecontents)
 * [Tool](#tool)
 * [ToolAnnotations](#toolannotations)
 * [completion/complete](#completion%2Fcomplete)
 * [CompleteRequest](#completerequest)
 * [CompleteResult](#completeresult)
 * [elicitation/create](#elicitation%2Fcreate)
 * [ElicitRequest](#elicitrequest)
 * [ElicitResult](#elicitresult)
 * [initialize](#initialize)
 * [InitializeRequest](#initializerequest)
 * [InitializeResult](#initializeresult)
 * [logging/setLevel](#logging%2Fsetlevel)
 * [SetLevelRequest](#setlevelrequest)
 * [notifications/cancelled](#notifications%2Fcancelled)
 * [CancelledNotification](#cancellednotification)
 * [notifications/initialized](#notifications%2Finitialized)
 * [InitializedNotification](#initializednotification)
 * [notifications/message](#notifications%2Fmessage)
 * [LoggingMessageNotification](#loggingmessagenotification)
 * [notifications/progress](#notifications%2Fprogress)
 * [ProgressNotification](#progressnotification)
 * [notifications/prompts/list_changed](#notifications%2Fprompts%2Flist-changed)
 * [PromptListChangedNotification](#promptlistchangednotification)
 * [notifications/resources/list_changed](#notifications%2Fresources%2Flist-changed)
 * [ResourceListChangedNotification](#resourcelistchangednotification)
 * [notifications/resources/updated](#notifications%2Fresources%2Fupdated)
 * [ResourceUpdatedNotification](#resourceupdatednotification)
 * [notifications/roots/list_changed](#notifications%2Froots%2Flist-changed)
 * [RootsListChangedNotification](#rootslistchangednotification)
 * [notifications/tools/list_changed](#notifications%2Ftools%2Flist-changed)
 * [ToolListChangedNotification](#toollistchangednotification)
 * [ping](#ping)
 * [PingRequest](#pingrequest)
 * [prompts/get](#prompts%2Fget)
 * [GetPromptRequest](#getpromptrequest)
 * [GetPromptResult](#getpromptresult)
 * [prompts/list](#prompts%2Flist)
 * [ListPromptsRequest](#listpromptsrequest)
 * [ListPromptsResult](#listpromptsresult)
 * [resources/list](#resources%2Flist)
 * [ListResourcesRequest](#listresourcesrequest)
 * [ListResourcesResult](#listresourcesresult)
 * [resources/read](#resources%2Fread)
 * [ReadResourceRequest](#readresourcerequest)
 * [ReadResourceResult](#readresourceresult)
 * [resources/subscribe](#resources%2Fsubscribe)
 * [SubscribeRequest](#subscriberequest)
 * [resources/templates/list](#resources%2Ftemplates%2Flist)
 * [ListResourceTemplatesRequest](#listresourcetemplatesrequest)
 * [ListResourceTemplatesResult](#listresourcetemplatesresult)
 * [resources/unsubscribe](#resources%2Funsubscribe)
 * [UnsubscribeRequest](#unsubscriberequest)
 * [roots/list](#roots%2Flist)
 * [ListRootsRequest](#listrootsrequest)
 * [ListRootsResult](#listrootsresult)
 * [sampling/createMessage](#sampling%2Fcreatemessage)
 * [CreateMessageRequest](#createmessagerequest)
 * [CreateMessageResult](#createmessageresult)
 * [tools/call](#tools%2Fcall)
 * [CallToolRequest](#calltoolrequest)
 * [CallToolResult](#calltoolresult)
 * [tools/list](#tools%2Flist)
 * [ListToolsRequest](#listtoolsrequest)
 * [ListToolsResult](#listtoolsresult)
## 
[​](#common-types)
Common Types
### 
[​](#annotations)
`Annotations`
interface Annotations { 
[audience](#annotations-audience)?: [Role](#role)[]; 
[lastModified](#annotations-lastmodified)?: string; 
[priority](#annotations-priority)?: number; 
}
Optional annotations for the client. The client can use annotations to inform how objects are used or displayed
`Optional`audience[](#annotations-audience)
audience?: [Role](#role)[]
Describes who the intended customer of this object or data is.
It can include multiple entries to indicate content useful for multiple audiences (e.g., `[“user”, “assistant”]`).
`Optional`lastModified[](#annotations-lastmodified)
lastModified?: string
The moment the resource was last modified, as an ISO 8601 formatted string.
Should be an ISO 8601 formatted string (e.g., “2025-01-12T15:00:58Z”).
Examples: last activity timestamp in an open file, timestamp when the resource was attached, etc.
`Optional`priority[](#annotations-priority)
priority?: number
Describes how important this data is for operating the server.
A value of 1 means “most important,” and indicates that the data is effectively required, while 0 means “least important,” and indicates that the data is entirely optional.
TJS-type[](#tjs-type)
number
### 
[​](#audiocontent)
`AudioContent`
interface AudioContent { 
[_meta](#audiocontent-_meta)?: { [key: string]: unknown }; 
[annotations](#audiocontent-annotations)?: [Annotations](#annotations); 
[data](#audiocontent-data): string; 
[mimeType](#audiocontent-mimetype): string; 
[type](#): “audio”; 
}
Audio provided to or from an LLM.
`Optional`_meta[](#audiocontent-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#audiocontent-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
data[](#audiocontent-data)
data: string
The base64-encoded audio data.
mimeType[](#audiocontent-mimetype)
mimeType: string
The MIME type of the audio. Different providers may support different audio types.
### 
[​](#blobresourcecontents)
`BlobResourceContents`
interface BlobResourceContents { 
[_meta](#blobresourcecontents-_meta)?: { [key: string]: unknown }; 
[blob](#blobresourcecontents-blob): string; 
[mimeType](#blobresourcecontents-mimetype)?: string; 
[uri](#blobresourcecontents-uri): string; 
}
The contents of a specific resource or sub-resource.
`Optional`_meta[](#blobresourcecontents-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [ResourceContents](#resourcecontents).[_meta](#resourcecontents-_meta)
blob[](#blobresourcecontents-blob)
blob: string
A base64-encoded string representing the binary data of the item.
`Optional`mimeType[](#blobresourcecontents-mimetype)
mimeType?: string
The MIME type of this resource, if known.
Inherited from [ResourceContents](#resourcecontents).[mimeType](#resourcecontents-mimetype)
uri[](#blobresourcecontents-uri)
uri: string
The URI of this resource.
Inherited from [ResourceContents](#resourcecontents).[uri](#resourcecontents-uri)
### 
[​](#booleanschema)
`BooleanSchema`
interface BooleanSchema { 
[default](#)?: boolean; 
[description](#)?: string; 
[title](#)?: string; 
[type](#): “boolean”; 
}
### 
[​](#clientcapabilities)
`ClientCapabilities`
interface ClientCapabilities { 
[elicitation](#clientcapabilities-elicitation)?: object; 
[experimental](#clientcapabilities-experimental)?: { [key: string]: object }; 
[roots](#clientcapabilities-roots)?: { listChanged?: boolean }; 
[sampling](#clientcapabilities-sampling)?: object; 
}
Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
`Optional`elicitation[](#clientcapabilities-elicitation)
elicitation?: object
Present if the client supports elicitation from the server.
`Optional`experimental[](#clientcapabilities-experimental)
experimental?: { [key: string]: object }
Experimental, non-standard capabilities that the client supports.
`Optional`roots[](#clientcapabilities-roots)
roots?: { listChanged?: boolean }
Present if the client supports listing roots.
Type declaration
 * `Optional`listChanged?: boolean
Whether the client supports notifications for changes to the roots list.
`Optional`sampling[](#clientcapabilities-sampling)
sampling?: object
Present if the client supports sampling from an LLM.
### 
[​](#contentblock)
`ContentBlock`
ContentBlock: 
| [TextContent](#textcontent) 
| [ImageContent](#imagecontent) 
| [AudioContent](#audiocontent) 
| [ResourceLink](#resourcelink) 
| [EmbeddedResource](#embeddedresource)
### 
[​](#cursor)
`Cursor`
Cursor: string
An opaque token used to represent a cursor for pagination.
### 
[​](#embeddedresource)
`EmbeddedResource`
interface EmbeddedResource { 
[_meta](#embeddedresource-_meta)?: { [key: string]: unknown }; 
[annotations](#embeddedresource-annotations)?: [Annotations](#annotations); 
[resource](#): [TextResourceContents](#textresourcecontents) | [BlobResourceContents](#blobresourcecontents); 
[type](#): “resource”; 
}
The contents of a resource, embedded into a prompt or tool call result.
It is up to the client how best to render embedded resources for the benefit of the LLM and/or the user.
`Optional`_meta[](#embeddedresource-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#embeddedresource-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
### 
[​](#emptyresult)
`EmptyResult`
EmptyResult: [Result](#result)
A response that indicates success but carries no data.
### 
[​](#enumschema)
`EnumSchema`
interface EnumSchema { 
[default](#)?: string; 
[description](#)?: string; 
[enum](#): string[]; 
[enumNames](#)?: string[]; 
[title](#)?: string; 
[type](#): “string”; 
}
### 
[​](#error)
`Error`
interface Error { 
[code](#error-code): number; 
[data](#error-data)?: unknown; 
[message](#error-message): string; 
}
code[](#error-code)
code: number
The error type that occurred.
`Optional`data[](#error-data)
data?: unknown
Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
message[](#error-message)
message: string
A short description of the error. The message SHOULD be limited to a concise single sentence.
### 
[​](#icon)
`Icon`
interface Icon { 
[mimeType](#icon-mimetype)?: string; 
[sizes](#icon-sizes)?: string[]; 
[src](#icon-src): string; 
[theme](#icon-theme)?: “light” | “dark”; 
}
An optionally-sized icon that can be displayed in a user interface.
`Optional`mimeType[](#icon-mimetype)
mimeType?: string
Optional MIME type override if the source MIME type is missing or generic. For example: `“image/png”`, `“image/jpeg”`, or `“image/svg+xml”`.
`Optional`sizes[](#icon-sizes)
sizes?: string[]
Optional array of strings that specify sizes at which the icon can be used. Each string should be in WxH format (e.g., `“48x48”`, `“96x96”`) or `“any”` for scalable formats like SVG.
If not provided, the client should assume that the icon can be used at any size.
src[](#icon-src)
src: string
A standard URI pointing to an icon resource. May be an HTTP/HTTPS URL or a `data:` URI with Base64-encoded image data.
Consumers SHOULD takes steps to ensure URLs serving icons are from the same domain as the client/server or a trusted domain.
Consumers SHOULD take appropriate precautions when consuming SVGs as they can contain executable JavaScript.
`Optional`theme[](#icon-theme)
theme?: “light” | “dark”
Optional specifier for the theme this icon is designed for. `light` indicates the icon is designed to be used with a light background, and `dark` indicates the icon is designed to be used with a dark background.
If not provided, the client should assume the icon can be used with any theme.
### 
[​](#imagecontent)
`ImageContent`
interface ImageContent { 
[_meta](#imagecontent-_meta)?: { [key: string]: unknown }; 
[annotations](#imagecontent-annotations)?: [Annotations](#annotations); 
[data](#imagecontent-data): string; 
[mimeType](#imagecontent-mimetype): string; 
[type](#): “image”; 
}
An image provided to or from an LLM.
`Optional`_meta[](#imagecontent-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#imagecontent-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
data[](#imagecontent-data)
data: string
The base64-encoded image data.
mimeType[](#imagecontent-mimetype)
mimeType: string
The MIME type of the image. Different providers may support different image types.
### 
[​](#implementation)
`Implementation`
interface Implementation { 
[icons](#implementation-icons)?: [Icon](#icon)[]; 
[name](#implementation-name): string; 
[title](#implementation-title)?: string; 
[version](#): string; 
[websiteUrl](#implementation-websiteurl)?: string; 
}
Describes the MCP implementation
`Optional`icons[](#implementation-icons)
icons?: [Icon](#icon)[]
Optional set of sized icons that the client can display in a user interface.
Clients that support rendering icons MUST support at least the following MIME types:
 * `image/png` - PNG images (safe, universal compatibility)
 * `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:
 * `image/svg+xml` - SVG images (scalable but requires security precautions)
 * `image/webp` - WebP images (modern, efficient format)
Inherited from Icons.icons
name[](#implementation-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`title[](#implementation-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
`Optional`websiteUrl[](#implementation-websiteurl)
websiteUrl?: string
An optional URL of the website for this implementation.
### 
[​](#jsonrpcerror)
`JSONRPCError`
interface JSONRPCError { 
[error](#): [Error](#error); 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
}
A response to a request that indicates an error occurred.
### 
[​](#jsonrpcnotification)
`JSONRPCNotification`
interface JSONRPCNotification { 
[jsonrpc](#): “2.0”; 
[method](#): string; 
[params](#jsonrpcnotification-params)?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }; 
}
A notification which does not expect a response.
`Optional`params[](#jsonrpcnotification-params)
params?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from Notification.params
### 
[​](#jsonrpcrequest)
`JSONRPCRequest`
interface JSONRPCRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): string; 
[params](#jsonrpcrequest-params)?: { 
_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }; 
[key: string]: unknown; 
}; 
}
A request that expects a response.
`Optional`params[](#jsonrpcrequest-params)
params?: { 
_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }; 
[key: string]: unknown; 
}
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
 * `Optional`progressToken?: [ProgressToken](#progresstoken)
If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
Inherited from Request.params
### 
[​](#jsonrpcresponse)
`JSONRPCResponse`
interface JSONRPCResponse { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[result](#): [Result](#result); 
}
A successful (non-error) response to a request.
### 
[​](#logginglevel)
`LoggingLevel`
LoggingLevel: 
| “debug” 
| “info” 
| “notice” 
| “warning” 
| “error” 
| “critical” 
| “alert” 
| “emergency”
The severity of a log message.
These map to syslog message severities, as specified in RFC-5424: [](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1)<https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1>
### 
[​](#modelhint)
`ModelHint`
interface ModelHint { 
[name](#modelhint-name)?: string; 
}
Hints to use for model selection.
Keys not declared here are currently left unspecified by the spec and are up to the client to interpret.
`Optional`name[](#modelhint-name)
name?: string
A hint for a model name.
The client SHOULD treat this as a substring of a model name; for example:
 * `claude-3-5-sonnet` should match `claude-3-5-sonnet-20241022`
 * `sonnet` should match `claude-3-5-sonnet-20241022`, `claude-3-sonnet-20240229`, etc.
 * `claude` should match any Claude model
The client MAY also map the string to a different provider’s model name or a different model family, as long as it fills a similar niche; for example:
 * `gemini-1.5-flash` could match `claude-3-haiku-20240307`
### 
[​](#modelpreferences)
`ModelPreferences`
interface ModelPreferences { 
[costPriority](#modelpreferences-costpriority)?: number; 
[hints](#modelpreferences-hints)?: [ModelHint](#modelhint)[]; 
[intelligencePriority](#modelpreferences-intelligencepriority)?: number; 
[speedPriority](#modelpreferences-speedpriority)?: number; 
}
The server’s preferences for model selection, requested of the client during sampling.
Because LLMs can vary along multiple dimensions, choosing the “best” model is rarely straightforward. Different models excel in different areas—some are faster but less capable, others are more capable but more expensive, and so on. This interface allows servers to express their priorities across multiple dimensions to help clients make an appropriate selection for their use case.
These preferences are always advisory. The client MAY ignore them. It is also up to the client to decide how to interpret these preferences and how to balance them against other considerations.
`Optional`costPriority[](#modelpreferences-costpriority)
costPriority?: number
How much to prioritize cost when selecting a model. A value of 0 means cost is not important, while a value of 1 means cost is the most important factor.
TJS-type[](#tjs-type)
number
`Optional`hints[](#modelpreferences-hints)
hints?: [ModelHint](#modelhint)[]
Optional hints to use for model selection.
If multiple hints are specified, the client MUST evaluate them in order (such that the first match is taken).
The client SHOULD prioritize these hints over the numeric priorities, but MAY still use the priorities to select from ambiguous matches.
`Optional`intelligencePriority[](#modelpreferences-intelligencepriority)
intelligencePriority?: number
How much to prioritize intelligence and capabilities when selecting a model. A value of 0 means intelligence is not important, while a value of 1 means intelligence is the most important factor.
TJS-type[](#tjs-type-1)
number
`Optional`speedPriority[](#modelpreferences-speedpriority)
speedPriority?: number
How much to prioritize sampling speed (latency) when selecting a model. A value of 0 means speed is not important, while a value of 1 means speed is the most important factor.
TJS-type[](#tjs-type-2)
number
### 
[​](#numberschema)
`NumberSchema`
interface NumberSchema { 
[default](#)?: number; 
[description](#)?: string; 
[maximum](#)?: number; 
[minimum](#)?: number; 
[title](#)?: string; 
[type](#): “number” | “integer”; 
}
### 
[​](#primitiveschemadefinition)
`PrimitiveSchemaDefinition`
PrimitiveSchemaDefinition: 
| [StringSchema](#stringschema) 
| [NumberSchema](#numberschema) 
| [BooleanSchema](#booleanschema) 
| [EnumSchema](#enumschema)
Restricted schema definitions that only allow primitive types without nested objects or arrays.
### 
[​](#progresstoken)
`ProgressToken`
ProgressToken: string | number
A progress token, used to associate progress notifications with the original request.
### 
[​](#prompt)
`Prompt`
interface Prompt { 
[_meta](#prompt-_meta)?: { [key: string]: unknown }; 
[arguments](#prompt-arguments)?: [PromptArgument](#promptargument)[]; 
[description](#prompt-description)?: string; 
[icons](#prompt-icons)?: [Icon](#icon)[]; 
[name](#prompt-name): string; 
[title](#prompt-title)?: string; 
}
A prompt or prompt template that the server offers.
`Optional`_meta[](#prompt-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`arguments[](#prompt-arguments)
arguments?: [PromptArgument](#promptargument)[]
A list of arguments to use for templating the prompt.
`Optional`description[](#prompt-description)
description?: string
An optional description of what this prompt provides
`Optional`icons[](#prompt-icons)
icons?: [Icon](#icon)[]
Optional set of sized icons that the client can display in a user interface.
Clients that support rendering icons MUST support at least the following MIME types:
 * `image/png` - PNG images (safe, universal compatibility)
 * `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:
 * `image/svg+xml` - SVG images (scalable but requires security precautions)
 * `image/webp` - WebP images (modern, efficient format)
Inherited from Icons.icons
name[](#prompt-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`title[](#prompt-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
### 
[​](#promptargument)
`PromptArgument`
interface PromptArgument { 
[description](#promptargument-description)?: string; 
[name](#promptargument-name): string; 
[required](#promptargument-required)?: boolean; 
[title](#promptargument-title)?: string; 
}
Describes an argument that a prompt can accept.
`Optional`description[](#promptargument-description)
description?: string
A human-readable description of the argument.
name[](#promptargument-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`required[](#promptargument-required)
required?: boolean
Whether this argument must be provided.
`Optional`title[](#promptargument-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
### 
[​](#promptmessage)
`PromptMessage`
interface PromptMessage { 
[content](#): [ContentBlock](#contentblock); 
[role](#): [Role](#role); 
}
Describes a message returned as part of a prompt.
This is similar to `SamplingMessage`, but also supports the embedding of resources from the MCP server.
### 
[​](#promptreference)
`PromptReference`
interface PromptReference { 
[name](#promptreference-name): string; 
[title](#promptreference-title)?: string; 
[type](#): “ref/prompt”; 
}
Identifies a prompt.
name[](#promptreference-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`title[](#promptreference-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
### 
[​](#requestid)
`RequestId`
RequestId: string | number
A uniquely identifying ID for a request in JSON-RPC.
### 
[​](#resource)
`Resource`
interface Resource { 
[_meta](#resource-_meta)?: { [key: string]: unknown }; 
[annotations](#resource-annotations)?: [Annotations](#annotations); 
[description](#resource-description)?: string; 
[icons](#resource-icons)?: [Icon](#icon)[]; 
[mimeType](#resource-mimetype)?: string; 
[name](#resource-name): string; 
[size](#resource-size)?: number; 
[title](#resource-title)?: string; 
[uri](#resource-uri): string; 
}
A known resource that the server is capable of reading.
`Optional`_meta[](#resource-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#resource-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
`Optional`description[](#resource-description)
description?: string
A description of what this resource represents.
This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.
`Optional`icons[](#resource-icons)
icons?: [Icon](#icon)[]
Optional set of sized icons that the client can display in a user interface.
Clients that support rendering icons MUST support at least the following MIME types:
 * `image/png` - PNG images (safe, universal compatibility)
 * `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:
 * `image/svg+xml` - SVG images (scalable but requires security precautions)
 * `image/webp` - WebP images (modern, efficient format)
Inherited from Icons.icons
`Optional`mimeType[](#resource-mimetype)
mimeType?: string
The MIME type of this resource, if known.
name[](#resource-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`size[](#resource-size)
size?: number
The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.
This can be used by Hosts to display file sizes and estimate context window usage.
`Optional`title[](#resource-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
uri[](#resource-uri)
uri: string
The URI of this resource.
### 
[​](#resourcecontents)
`ResourceContents`
interface ResourceContents { 
[_meta](#resourcecontents-_meta)?: { [key: string]: unknown }; 
[mimeType](#resourcecontents-mimetype)?: string; 
[uri](#resourcecontents-uri): string; 
}
The contents of a specific resource or sub-resource.
`Optional`_meta[](#resourcecontents-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`mimeType[](#resourcecontents-mimetype)
mimeType?: string
The MIME type of this resource, if known.
uri[](#resourcecontents-uri)
uri: string
The URI of this resource.
### 
[​](#resourcelink)
`ResourceLink`
interface ResourceLink { 
[_meta](#resourcelink-_meta)?: { [key: string]: unknown }; 
[annotations](#resourcelink-annotations)?: [Annotations](#annotations); 
[description](#resourcelink-description)?: string; 
[icons](#resourcelink-icons)?: [Icon](#icon)[]; 
[mimeType](#resourcelink-mimetype)?: string; 
[name](#resourcelink-name): string; 
[size](#resourcelink-size)?: number; 
[title](#resourcelink-title)?: string; 
[type](#): “resource_link”; 
[uri](#resourcelink-uri): string; 
}
A resource that the server is capable of reading, included in a prompt or tool call result.
Note: resource links returned by tools are not guaranteed to appear in the results of `resources/list` requests.
`Optional`_meta[](#resourcelink-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Resource](#resource).[_meta](#resource-_meta)
`Optional`annotations[](#resourcelink-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
Inherited from [Resource](#resource).[annotations](#resource-annotations)
`Optional`description[](#resourcelink-description)
description?: string
A description of what this resource represents.
This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.
Inherited from [Resource](#resource).[description](#resource-description)
`Optional`icons[](#resourcelink-icons)
icons?: [Icon](#icon)[]
Optional set of sized icons that the client can display in a user interface.
Clients that support rendering icons MUST support at least the following MIME types:
 * `image/png` - PNG images (safe, universal compatibility)
 * `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:
 * `image/svg+xml` - SVG images (scalable but requires security precautions)
 * `image/webp` - WebP images (modern, efficient format)
Inherited from [Resource](#resource).[icons](#resource-icons)
`Optional`mimeType[](#resourcelink-mimetype)
mimeType?: string
The MIME type of this resource, if known.
Inherited from [Resource](#resource).[mimeType](#resource-mimetype)
name[](#resourcelink-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from [Resource](#resource).[name](#resource-name)
`Optional`size[](#resourcelink-size)
size?: number
The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.
This can be used by Hosts to display file sizes and estimate context window usage.
Inherited from [Resource](#resource).[size](#resource-size)
`Optional`title[](#resourcelink-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from [Resource](#resource).[title](#resource-title)
uri[](#resourcelink-uri)
uri: string
The URI of this resource.
Inherited from [Resource](#resource).[uri](#resource-uri)
### 
[​](#resourcetemplate)
`ResourceTemplate`
interface ResourceTemplate { 
[_meta](#resourcetemplate-_meta)?: { [key: string]: unknown }; 
[annotations](#resourcetemplate-annotations)?: [Annotations](#annotations); 
[description](#resourcetemplate-description)?: string; 
[icons](#resourcetemplate-icons)?: [Icon](#icon)[]; 
[mimeType](#resourcetemplate-mimetype)?: string; 
[name](#resourcetemplate-name): string; 
[title](#resourcetemplate-title)?: string; 
[uriTemplate](#resourcetemplate-uritemplate): string; 
}
A template description for resources available on the server.
`Optional`_meta[](#resourcetemplate-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#resourcetemplate-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
`Optional`description[](#resourcetemplate-description)
description?: string
A description of what this template is for.
This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.
`Optional`icons[](#resourcetemplate-icons)
icons?: [Icon](#icon)[]
Optional set of sized icons that the client can display in a user interface.
Clients that support rendering icons MUST support at least the following MIME types:
 * `image/png` - PNG images (safe, universal compatibility)
 * `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:
 * `image/svg+xml` - SVG images (scalable but requires security precautions)
 * `image/webp` - WebP images (modern, efficient format)
Inherited from Icons.icons
`Optional`mimeType[](#resourcetemplate-mimetype)
mimeType?: string
The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
name[](#resourcetemplate-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`title[](#resourcetemplate-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
uriTemplate[](#resourcetemplate-uritemplate)
uriTemplate: string
A URI template (according to RFC 6570) that can be used to construct resource URIs.
### 
[​](#resourcetemplatereference)
`ResourceTemplateReference`
interface ResourceTemplateReference { 
[type](#): “ref/resource”; 
[uri](#resourcetemplatereference-uri): string; 
}
A reference to a resource or resource template definition.
uri[](#resourcetemplatereference-uri)
uri: string
The URI or URI template of the resource.
### 
[​](#result)
`Result`
interface Result { 
[_meta](#result-_meta)?: { [key: string]: unknown }; 
[key: string]: unknown; 
}
`Optional`_meta[](#result-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
### 
[​](#role)
`Role`
Role: “user” | “assistant”
The sender or recipient of messages and data in a conversation.
### 
[​](#root)
`Root`
interface Root { 
[_meta](#root-_meta)?: { [key: string]: unknown }; 
[name](#root-name)?: string; 
[uri](#root-uri): string; 
}
Represents a root directory or file that the server can operate on.
`Optional`_meta[](#root-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`name[](#root-name)
name?: string
An optional name for the root. This can be used to provide a human-readable identifier for the root, which may be useful for display purposes or for referencing the root in other parts of the application.
uri[](#root-uri)
uri: string
The URI identifying the root. This _must_ start with file:// for now. This restriction may be relaxed in future versions of the protocol to allow other URI schemes.
### 
[​](#samplingmessage)
`SamplingMessage`
interface SamplingMessage { 
[content](#): [TextContent](#textcontent) | [ImageContent](#imagecontent) | [AudioContent](#audiocontent); 
[role](#): [Role](#role); 
}
Describes a message issued to or received from an LLM API.
### 
[​](#servercapabilities)
`ServerCapabilities`
interface ServerCapabilities { 
[completions](#servercapabilities-completions)?: object; 
[experimental](#servercapabilities-experimental)?: { [key: string]: object }; 
[logging](#servercapabilities-logging)?: object; 
[prompts](#servercapabilities-prompts)?: { listChanged?: boolean }; 
[resources](#servercapabilities-resources)?: { listChanged?: boolean; subscribe?: boolean }; 
[tools](#servercapabilities-tools)?: { listChanged?: boolean }; 
}
Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
`Optional`completions[](#servercapabilities-completions)
completions?: object
Present if the server supports argument autocompletion suggestions.
`Optional`experimental[](#servercapabilities-experimental)
experimental?: { [key: string]: object }
Experimental, non-standard capabilities that the server supports.
`Optional`logging[](#servercapabilities-logging)
logging?: object
Present if the server supports sending log messages to the client.
`Optional`prompts[](#servercapabilities-prompts)
prompts?: { listChanged?: boolean }
Present if the server offers any prompt templates.
Type declaration
 * `Optional`listChanged?: boolean
Whether this server supports notifications for changes to the prompt list.
`Optional`resources[](#servercapabilities-resources)
resources?: { listChanged?: boolean; subscribe?: boolean }
Present if the server offers any resources to read.
Type declaration
 * `Optional`listChanged?: boolean
Whether this server supports notifications for changes to the resource list.
 * `Optional`subscribe?: boolean
Whether this server supports subscribing to resource updates.
`Optional`tools[](#servercapabilities-tools)
tools?: { listChanged?: boolean }
Present if the server offers any tools to call.
Type declaration
 * `Optional`listChanged?: boolean
Whether this server supports notifications for changes to the tool list.
### 
[​](#stringschema)
`StringSchema`
interface StringSchema { 
[default](#)?: string; 
[description](#)?: string; 
[format](#)?: “uri” | “email” | “date” | “date-time”; 
[maxLength](#)?: number; 
[minLength](#)?: number; 
[title](#)?: string; 
[type](#): “string”; 
}
### 
[​](#textcontent)
`TextContent`
interface TextContent { 
[_meta](#textcontent-_meta)?: { [key: string]: unknown }; 
[annotations](#textcontent-annotations)?: [Annotations](#annotations); 
[text](#textcontent-text): string; 
[type](#): “text”; 
}
Text provided to or from an LLM.
`Optional`_meta[](#textcontent-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#textcontent-annotations)
annotations?: [Annotations](#annotations)
Optional annotations for the client.
text[](#textcontent-text)
text: string
The text content of the message.
### 
[​](#textresourcecontents)
`TextResourceContents`
interface TextResourceContents { 
[_meta](#textresourcecontents-_meta)?: { [key: string]: unknown }; 
[mimeType](#textresourcecontents-mimetype)?: string; 
[text](#textresourcecontents-text): string; 
[uri](#textresourcecontents-uri): string; 
}
The contents of a specific resource or sub-resource.
`Optional`_meta[](#textresourcecontents-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [ResourceContents](#resourcecontents).[_meta](#resourcecontents-_meta)
`Optional`mimeType[](#textresourcecontents-mimetype)
mimeType?: string
The MIME type of this resource, if known.
Inherited from [ResourceContents](#resourcecontents).[mimeType](#resourcecontents-mimetype)
text[](#textresourcecontents-text)
text: string
The text of the item. This must only be set if the item can actually be represented as text (not binary data).
uri[](#textresourcecontents-uri)
uri: string
The URI of this resource.
Inherited from [ResourceContents](#resourcecontents).[uri](#resourcecontents-uri)
### 
[​](#tool)
`Tool`
interface Tool { 
[_meta](#tool-_meta)?: { [key: string]: unknown }; 
[annotations](#tool-annotations)?: [ToolAnnotations](#toolannotations); 
[description](#tool-description)?: string; 
[icons](#tool-icons)?: [Icon](#icon)[]; 
[inputSchema](#tool-inputschema): { 
properties?: { [key: string]: object }; 
required?: string[]; 
type: “object”; 
}; 
[name](#tool-name): string; 
[outputSchema](#tool-outputschema)?: { 
properties?: { [key: string]: object }; 
required?: string[]; 
type: “object”; 
}; 
[title](#tool-title)?: string; 
}
Definition for a tool the client can call.
`Optional`_meta[](#tool-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
`Optional`annotations[](#tool-annotations)
annotations?: [ToolAnnotations](#toolannotations)
Optional additional tool information.
Display name precedence order is: title, annotations.title, then name.
`Optional`description[](#tool-description)
description?: string
A human-readable description of the tool.
This can be used by clients to improve the LLM’s understanding of available tools. It can be thought of like a “hint” to the model.
`Optional`icons[](#tool-icons)
icons?: [Icon](#icon)[]
Optional set of sized icons that the client can display in a user interface.
Clients that support rendering icons MUST support at least the following MIME types:
 * `image/png` - PNG images (safe, universal compatibility)
 * `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
Clients that support rendering icons SHOULD also support:
 * `image/svg+xml` - SVG images (scalable but requires security precautions)
 * `image/webp` - WebP images (modern, efficient format)
Inherited from Icons.icons
inputSchema[](#tool-inputschema)
inputSchema: { 
properties?: { [key: string]: object }; 
required?: string[]; 
type: “object”; 
}
A JSON Schema object defining the expected parameters for the tool.
name[](#tool-name)
name: string
Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).
Inherited from BaseMetadata.name
`Optional`outputSchema[](#tool-outputschema)
outputSchema?: { 
properties?: { [key: string]: object }; 
required?: string[]; 
type: “object”; 
}
An optional JSON Schema object defining the structure of the tool’s output returned in the structuredContent field of a CallToolResult.
`Optional`title[](#tool-title)
title?: string
Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology.
If not provided, the name should be used for display (except for Tool, where `annotations.title` should be given precedence over using `name`, if present).
Inherited from BaseMetadata.title
### 
[​](#toolannotations)
`ToolAnnotations`
interface ToolAnnotations { 
[destructiveHint](#toolannotations-destructivehint)?: boolean; 
[idempotentHint](#toolannotations-idempotenthint)?: boolean; 
[openWorldHint](#toolannotations-openworldhint)?: boolean; 
[readOnlyHint](#toolannotations-readonlyhint)?: boolean; 
[title](#toolannotations-title)?: string; 
}
Additional properties describing a Tool to clients.
NOTE: all properties in ToolAnnotations are **hints**. They are not guaranteed to provide a faithful description of tool behavior (including descriptive properties like `title`).
Clients should never make tool use decisions based on ToolAnnotations received from untrusted servers.
`Optional`destructiveHint[](#toolannotations-destructivehint)
destructiveHint?: boolean
If true, the tool may perform destructive updates to its environment. If false, the tool performs only additive updates.
(This property is meaningful only when `readOnlyHint == false`)
Default: true
`Optional`idempotentHint[](#toolannotations-idempotenthint)
idempotentHint?: boolean
If true, calling the tool repeatedly with the same arguments will have no additional effect on its environment.
(This property is meaningful only when `readOnlyHint == false`)
Default: false
`Optional`openWorldHint[](#toolannotations-openworldhint)
openWorldHint?: boolean
If true, this tool may interact with an “open world” of external entities. If false, the tool’s domain of interaction is closed. For example, the world of a web search tool is open, whereas that of a memory tool is not.
Default: true
`Optional`readOnlyHint[](#toolannotations-readonlyhint)
readOnlyHint?: boolean
If true, the tool does not modify its environment.
Default: false
`Optional`title[](#toolannotations-title)
title?: string
A human-readable title for the tool.
## 
[​](#completion%2Fcomplete)
`completion/complete`
### 
[​](#completerequest)
`CompleteRequest`
interface CompleteRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “completion/complete”; 
[params](#completerequest-params): { 
argument: { name: string; value: string }; 
context?: { arguments?: { [key: string]: string } }; 
ref: [PromptReference](#promptreference) | [ResourceTemplateReference](#resourcetemplatereference); 
}; 
}
A request from the client to the server, to ask for completion options.
params[](#completerequest-params)
params: { 
argument: { name: string; value: string }; 
context?: { arguments?: { [key: string]: string } }; 
ref: [PromptReference](#promptreference) | [ResourceTemplateReference](#resourcetemplatereference); 
}
Type declaration
 * argument: { name: string; value: string }
The argument’s information
 * name: string
The name of the argument
 * value: string
The value of the argument to use for completion matching.
 * `Optional`context?: { arguments?: { [key: string]: string } }
Additional, optional context for completions
 * `Optional`arguments?: { [key: string]: string }
Previously-resolved variables in a URI template or prompt.
 * ref: [PromptReference](#promptreference) | [ResourceTemplateReference](#resourcetemplatereference)
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#completeresult)
`CompleteResult`
interface CompleteResult { 
[_meta](#completeresult-_meta)?: { [key: string]: unknown }; 
[completion](#completeresult-completion): { hasMore?: boolean; total?: number; values: string[] }; 
[key: string]: unknown; 
}
The server’s response to a completion/complete request
`Optional`_meta[](#completeresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
completion[](#completeresult-completion)
completion: { hasMore?: boolean; total?: number; values: string[] }
Type declaration
 * `Optional`hasMore?: boolean
Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
 * `Optional`total?: number
The total number of completion options available. This can exceed the number of values actually sent in the response.
 * values: string[]
An array of completion values. Must not exceed 100 items.
## 
[​](#elicitation%2Fcreate)
`elicitation/create`
### 
[​](#elicitrequest)
`ElicitRequest`
interface ElicitRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “elicitation/create”; 
[params](#elicitrequest-params): { 
message: string; 
requestedSchema: { 
properties: { [key: string]: [PrimitiveSchemaDefinition](#primitiveschemadefinition) }; 
required?: string[]; 
type: “object”; 
}; 
}; 
}
A request from the server to elicit additional information from the user via the client.
params[](#elicitrequest-params)
params: { 
message: string; 
requestedSchema: { 
properties: { [key: string]: [PrimitiveSchemaDefinition](#primitiveschemadefinition) }; 
required?: string[]; 
type: “object”; 
}; 
}
Type declaration
 * message: string
The message to present to the user.
 * requestedSchema: { 
properties: { [key: string]: [PrimitiveSchemaDefinition](#primitiveschemadefinition) }; 
required?: string[]; 
type: “object”; 
}
A restricted subset of JSON Schema. Only top-level properties are allowed, without nesting.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#elicitresult)
`ElicitResult`
interface ElicitResult { 
[_meta](#elicitresult-_meta)?: { [key: string]: unknown }; 
[action](#elicitresult-action): “accept” | “decline” | “cancel”; 
[content](#elicitresult-content)?: { [key: string]: string | number | boolean }; 
[key: string]: unknown; 
}
The client’s response to an elicitation request.
`Optional`_meta[](#elicitresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
action[](#elicitresult-action)
action: “accept” | “decline” | “cancel”
The user action in response to the elicitation.
 * “accept”: User submitted the form/confirmed the action
 * “decline”: User explicitly decline the action
 * “cancel”: User dismissed without making an explicit choice
`Optional`content[](#elicitresult-content)
content?: { [key: string]: string | number | boolean }
The submitted form data, only present when action is “accept”. Contains values matching the requested schema.
## 
[​](#initialize)
`initialize`
### 
[​](#initializerequest)
`InitializeRequest`
interface InitializeRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “initialize”; 
[params](#initializerequest-params): { 
capabilities: [ClientCapabilities](#clientcapabilities); 
clientInfo: [Implementation](#implementation); 
protocolVersion: string; 
}; 
}
This request is sent from the client to the server when it first connects, asking it to begin initialization.
params[](#initializerequest-params)
params: { 
capabilities: [ClientCapabilities](#clientcapabilities); 
clientInfo: [Implementation](#implementation); 
protocolVersion: string; 
}
Type declaration
 * capabilities: [ClientCapabilities](#clientcapabilities)
 * clientInfo: [Implementation](#implementation)
 * protocolVersion: string
The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#initializeresult)
`InitializeResult`
interface InitializeResult { 
[_meta](#initializeresult-_meta)?: { [key: string]: unknown }; 
[capabilities](#): [ServerCapabilities](#servercapabilities); 
[instructions](#initializeresult-instructions)?: string; 
[protocolVersion](#initializeresult-protocolversion): string; 
[serverInfo](#): [Implementation](#implementation); 
[key: string]: unknown; 
}
After receiving an initialize request from the client, the server sends this response.
`Optional`_meta[](#initializeresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
`Optional`instructions[](#initializeresult-instructions)
instructions?: string
Instructions describing how to use the server and its features.
This can be used by clients to improve the LLM’s understanding of available tools, resources, etc. It can be thought of like a “hint” to the model. For example, this information MAY be added to the system prompt.
protocolVersion[](#initializeresult-protocolversion)
protocolVersion: string
The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
## 
[​](#logging%2Fsetlevel)
`logging/setLevel`
### 
[​](#setlevelrequest)
`SetLevelRequest`
interface SetLevelRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “logging/setLevel”; 
[params](#setlevelrequest-params): { level: [LoggingLevel](#logginglevel) }; 
}
A request from the client to the server, to enable or adjust logging.
params[](#setlevelrequest-params)
params: { level: [LoggingLevel](#logginglevel) }
Type declaration
 * level: [LoggingLevel](#logginglevel)
The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/message.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
## 
[​](#notifications%2Fcancelled)
`notifications/cancelled`
### 
[​](#cancellednotification)
`CancelledNotification`
interface CancelledNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/cancelled”; 
[params](#cancellednotification-params): { reason?: string; requestId: [RequestId](#requestid) }; 
}
This notification can be sent by either side to indicate that it is cancelling a previously-issued request.
The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.
This notification indicates that the result will be unused, so any associated processing SHOULD cease.
A client MUST NOT attempt to cancel its `initialize` request.
params[](#cancellednotification-params)
params: { reason?: string; requestId: [RequestId](#requestid) }
Type declaration
 * `Optional`reason?: string
An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
 * requestId: [RequestId](#requestid)
The ID of the request to cancel.
This MUST correspond to the ID of a request previously issued in the same direction.
Overrides [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Finitialized)
`notifications/initialized`
### 
[​](#initializednotification)
`InitializedNotification`
interface InitializedNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/initialized”; 
[params](#initializednotification-params)?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }; 
}
This notification is sent from the client to the server after initialization has finished.
`Optional`params[](#initializednotification-params)
params?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Fmessage)
`notifications/message`
### 
[​](#loggingmessagenotification)
`LoggingMessageNotification`
interface LoggingMessageNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/message”; 
[params](#loggingmessagenotification-params): { data: unknown; level: [LoggingLevel](#logginglevel); logger?: string }; 
}
JSONRPCNotification of a log message passed from server to client. If no logging/setLevel request has been sent from the client, the server MAY decide which messages to send automatically.
params[](#loggingmessagenotification-params)
params: { data: unknown; level: [LoggingLevel](#logginglevel); logger?: string }
Type declaration
 * data: unknown
The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
 * level: [LoggingLevel](#logginglevel)
The severity of this log message.
 * `Optional`logger?: string
An optional name of the logger issuing this message.
Overrides [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Fprogress)
`notifications/progress`
### 
[​](#progressnotification)
`ProgressNotification`
interface ProgressNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/progress”; 
[params](#progressnotification-params): { 
message?: string; 
progress: number; 
progressToken: [ProgressToken](#progresstoken); 
total?: number; 
}; 
}
An out-of-band notification used to inform the receiver of a progress update for a long-running request.
params[](#progressnotification-params)
params: { 
message?: string; 
progress: number; 
progressToken: [ProgressToken](#progresstoken); 
total?: number; 
}
Type declaration
 * `Optional`message?: string
An optional message describing the current progress.
 * progress: number
The progress thus far. This should increase every time progress is made, even if the total is unknown.
TJS-type[](#tjs-type)
number
 * progressToken: [ProgressToken](#progresstoken)
The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
 * `Optional`total?: number
Total number of items to process (or total progress required), if known.
TJS-type[](#tjs-type-1)
number
Overrides [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Fprompts%2Flist-changed)
`notifications/prompts/list_changed`
### 
[​](#promptlistchangednotification)
`PromptListChangedNotification`
interface PromptListChangedNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/prompts/list_changed”; 
[params](#promptlistchangednotification-params)?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }; 
}
An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.
`Optional`params[](#promptlistchangednotification-params)
params?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Fresources%2Flist-changed)
`notifications/resources/list_changed`
### 
[​](#resourcelistchangednotification)
`ResourceListChangedNotification`
interface ResourceListChangedNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/resources/list_changed”; 
[params](#resourcelistchangednotification-params)?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }; 
}
An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.
`Optional`params[](#resourcelistchangednotification-params)
params?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Fresources%2Fupdated)
`notifications/resources/updated`
### 
[​](#resourceupdatednotification)
`ResourceUpdatedNotification`
interface ResourceUpdatedNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/resources/updated”; 
[params](#resourceupdatednotification-params): { uri: string }; 
}
A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a resources/subscribe request.
params[](#resourceupdatednotification-params)
params: { uri: string }
Type declaration
 * uri: string
The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
Overrides [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Froots%2Flist-changed)
`notifications/roots/list_changed`
### 
[​](#rootslistchangednotification)
`RootsListChangedNotification`
interface RootsListChangedNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/roots/list_changed”; 
[params](#rootslistchangednotification-params)?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }; 
}
A notification from the client to the server, informing it that the list of roots has changed. This notification should be sent whenever the client adds, removes, or modifies any root. The server should then request an updated list of roots using the ListRootsRequest.
`Optional`params[](#rootslistchangednotification-params)
params?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#notifications%2Ftools%2Flist-changed)
`notifications/tools/list_changed`
### 
[​](#toollistchangednotification)
`ToolListChangedNotification`
interface ToolListChangedNotification { 
[jsonrpc](#): “2.0”; 
[method](#): “notifications/tools/list_changed”; 
[params](#toollistchangednotification-params)?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }; 
}
An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.
`Optional`params[](#toollistchangednotification-params)
params?: { _meta?: { [key: string]: unknown }; [key: string]: unknown }
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [JSONRPCNotification](#jsonrpcnotification).[params](#jsonrpcnotification-params)
## 
[​](#ping)
`ping`
### 
[​](#pingrequest)
`PingRequest`
interface PingRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “ping”; 
[params](#pingrequest-params)?: { 
_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }; 
[key: string]: unknown; 
}; 
}
A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.
`Optional`params[](#pingrequest-params)
params?: { 
_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }; 
[key: string]: unknown; 
}
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
 * `Optional`progressToken?: [ProgressToken](#progresstoken)
If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
Inherited from [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
## 
[​](#prompts%2Fget)
`prompts/get`
### 
[​](#getpromptrequest)
`GetPromptRequest`
interface GetPromptRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “prompts/get”; 
[params](#getpromptrequest-params): { arguments?: { [key: string]: string }; name: string }; 
}
Used by the client to get a prompt provided by the server.
params[](#getpromptrequest-params)
params: { arguments?: { [key: string]: string }; name: string }
Type declaration
 * `Optional`arguments?: { [key: string]: string }
Arguments to use for templating the prompt.
 * name: string
The name of the prompt or prompt template.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#getpromptresult)
`GetPromptResult`
interface GetPromptResult { 
[_meta](#getpromptresult-_meta)?: { [key: string]: unknown }; 
[description](#getpromptresult-description)?: string; 
[messages](#): [PromptMessage](#promptmessage)[]; 
[key: string]: unknown; 
}
The server’s response to a prompts/get request from the client.
`Optional`_meta[](#getpromptresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
`Optional`description[](#getpromptresult-description)
description?: string
An optional description for the prompt.
## 
[​](#prompts%2Flist)
`prompts/list`
### 
[​](#listpromptsrequest)
`ListPromptsRequest`
interface ListPromptsRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “prompts/list”; 
[params](#listpromptsrequest-params)?: { cursor?: string }; 
}
Sent from the client to request a list of prompts and prompt templates the server has.
`Optional`params[](#listpromptsrequest-params)
params?: { cursor?: string }
Type declaration
 * `Optional`cursor?: string
An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.
Inherited from PaginatedRequest.params
### 
[​](#listpromptsresult)
`ListPromptsResult`
interface ListPromptsResult { 
[_meta](#listpromptsresult-_meta)?: { [key: string]: unknown }; 
[nextCursor](#listpromptsresult-nextcursor)?: string; 
[prompts](#): [Prompt](#prompt)[]; 
[key: string]: unknown; 
}
The server’s response to a prompts/list request from the client.
`Optional`_meta[](#listpromptsresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from PaginatedResult._meta
`Optional`nextCursor[](#listpromptsresult-nextcursor)
nextCursor?: string
An opaque token representing the pagination position after the last returned result. If present, there may be more results available.
Inherited from PaginatedResult.nextCursor
## 
[​](#resources%2Flist)
`resources/list`
### 
[​](#listresourcesrequest)
`ListResourcesRequest`
interface ListResourcesRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “resources/list”; 
[params](#listresourcesrequest-params)?: { cursor?: string }; 
}
Sent from the client to request a list of resources the server has.
`Optional`params[](#listresourcesrequest-params)
params?: { cursor?: string }
Type declaration
 * `Optional`cursor?: string
An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.
Inherited from PaginatedRequest.params
### 
[​](#listresourcesresult)
`ListResourcesResult`
interface ListResourcesResult { 
[_meta](#listresourcesresult-_meta)?: { [key: string]: unknown }; 
[nextCursor](#listresourcesresult-nextcursor)?: string; 
[resources](#): [Resource](#resource)[]; 
[key: string]: unknown; 
}
The server’s response to a resources/list request from the client.
`Optional`_meta[](#listresourcesresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from PaginatedResult._meta
`Optional`nextCursor[](#listresourcesresult-nextcursor)
nextCursor?: string
An opaque token representing the pagination position after the last returned result. If present, there may be more results available.
Inherited from PaginatedResult.nextCursor
## 
[​](#resources%2Fread)
`resources/read`
### 
[​](#readresourcerequest)
`ReadResourceRequest`
interface ReadResourceRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “resources/read”; 
[params](#readresourcerequest-params): { uri: string }; 
}
Sent from the client to the server, to read a specific resource URI.
params[](#readresourcerequest-params)
params: { uri: string }
Type declaration
 * uri: string
The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#readresourceresult)
`ReadResourceResult`
interface ReadResourceResult { 
[_meta](#readresourceresult-_meta)?: { [key: string]: unknown }; 
[contents](#): ([TextResourceContents](#textresourcecontents) | [BlobResourceContents](#blobresourcecontents))[]; 
[key: string]: unknown; 
}
The server’s response to a resources/read request from the client.
`Optional`_meta[](#readresourceresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
## 
[​](#resources%2Fsubscribe)
`resources/subscribe`
### 
[​](#subscriberequest)
`SubscribeRequest`
interface SubscribeRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “resources/subscribe”; 
[params](#subscriberequest-params): { uri: string }; 
}
Sent from the client to request resources/updated notifications from the server whenever a particular resource changes.
params[](#subscriberequest-params)
params: { uri: string }
Type declaration
 * uri: string
The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
## 
[​](#resources%2Ftemplates%2Flist)
`resources/templates/list`
### 
[​](#listresourcetemplatesrequest)
`ListResourceTemplatesRequest`
interface ListResourceTemplatesRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “resources/templates/list”; 
[params](#listresourcetemplatesrequest-params)?: { cursor?: string }; 
}
Sent from the client to request a list of resource templates the server has.
`Optional`params[](#listresourcetemplatesrequest-params)
params?: { cursor?: string }
Type declaration
 * `Optional`cursor?: string
An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.
Inherited from PaginatedRequest.params
### 
[​](#listresourcetemplatesresult)
`ListResourceTemplatesResult`
interface ListResourceTemplatesResult { 
[_meta](#listresourcetemplatesresult-_meta)?: { [key: string]: unknown }; 
[nextCursor](#listresourcetemplatesresult-nextcursor)?: string; 
[resourceTemplates](#): [ResourceTemplate](#resourcetemplate)[]; 
[key: string]: unknown; 
}
The server’s response to a resources/templates/list request from the client.
`Optional`_meta[](#listresourcetemplatesresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from PaginatedResult._meta
`Optional`nextCursor[](#listresourcetemplatesresult-nextcursor)
nextCursor?: string
An opaque token representing the pagination position after the last returned result. If present, there may be more results available.
Inherited from PaginatedResult.nextCursor
## 
[​](#resources%2Funsubscribe)
`resources/unsubscribe`
### 
[​](#unsubscriberequest)
`UnsubscribeRequest`
interface UnsubscribeRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “resources/unsubscribe”; 
[params](#unsubscriberequest-params): { uri: string }; 
}
Sent from the client to request cancellation of resources/updated notifications from the server. This should follow a previous resources/subscribe request.
params[](#unsubscriberequest-params)
params: { uri: string }
Type declaration
 * uri: string
The URI of the resource to unsubscribe from.
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
## 
[​](#roots%2Flist)
`roots/list`
### 
[​](#listrootsrequest)
`ListRootsRequest`
interface ListRootsRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “roots/list”; 
[params](#listrootsrequest-params)?: { 
_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }; 
[key: string]: unknown; 
}; 
}
Sent from the server to request a list of root URIs from the client. Roots allow servers to ask for specific directories or files to operate on. A common example for roots is providing a set of repositories or directories a server should operate on.
This request is typically used when the server needs to understand the file system structure or access specific locations that the client has permission to read from.
`Optional`params[](#listrootsrequest-params)
params?: { 
_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }; 
[key: string]: unknown; 
}
Type declaration
 * [key: string]: unknown
 * `Optional`_meta?: { progressToken?: [ProgressToken](#progresstoken); [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
 * `Optional`progressToken?: [ProgressToken](#progresstoken)
If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
Inherited from [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#listrootsresult)
`ListRootsResult`
interface ListRootsResult { 
[_meta](#listrootsresult-_meta)?: { [key: string]: unknown }; 
[roots](#): [Root](#root)[]; 
[key: string]: unknown; 
}
The client’s response to a roots/list request from the server. This result contains an array of Root objects, each representing a root directory or file that the server can operate on.
`Optional`_meta[](#listrootsresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
## 
[​](#sampling%2Fcreatemessage)
`sampling/createMessage`
### 
[​](#createmessagerequest)
`CreateMessageRequest`
interface CreateMessageRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “sampling/createMessage”; 
[params](#createmessagerequest-params): { 
includeContext?: “none” | “thisServer” | “allServers”; 
maxTokens: number; 
messages: [SamplingMessage](#samplingmessage)[]; 
metadata?: object; 
modelPreferences?: [ModelPreferences](#modelpreferences); 
stopSequences?: string[]; 
systemPrompt?: string; 
temperature?: number; 
}; 
}
A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
params[](#createmessagerequest-params)
params: { 
includeContext?: “none” | “thisServer” | “allServers”; 
maxTokens: number; 
messages: [SamplingMessage](#samplingmessage)[]; 
metadata?: object; 
modelPreferences?: [ModelPreferences](#modelpreferences); 
stopSequences?: string[]; 
systemPrompt?: string; 
temperature?: number; 
}
Type declaration
 * `Optional`includeContext?: “none” | “thisServer” | “allServers”
A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
 * maxTokens: number
The requested maximum number of tokens to sample (to prevent runaway completions).
The client MAY choose to sample fewer tokens than the requested maximum.
 * messages: [SamplingMessage](#samplingmessage)[]
 * `Optional`metadata?: object
Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
 * `Optional`modelPreferences?: [ModelPreferences](#modelpreferences)
The server’s preferences for which model to select. The client MAY ignore these preferences.
 * `Optional`stopSequences?: string[]
 * `Optional`systemPrompt?: string
An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
 * `Optional`temperature?: number
TJS-type[](#tjs-type)
number
Overrides [JSONRPCRequest](#jsonrpcrequest).[params](#jsonrpcrequest-params)
### 
[​](#createmessageresult)
`CreateMessageResult`
interface CreateMessageResult { 
[_meta](#createmessageresult-_meta)?: { [key: string]: unknown }; 
[content](#): [TextContent](#textcontent) | [ImageContent](#imagecontent) | [AudioContent](#audiocontent); 
[model](#createmessageresult-model): string; 
[role](#): [Role](#role); 
[stopReason](#createmessageresult-stopreason)?: string; 
[key: string]: unknown; 
}
The client’s response to a sampling/create_message request from the server. The client should inform the user before returning the sampled message, to allow them to inspect the response (human in the loop) and decide whether to allow the server to see it.
`Optional`_meta[](#createmessageresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
model[](#createmessageresult-model)
model: string
The name of the model that generated the message.
`Optional`stopReason[](#createmessageresult-stopreason)
stopReason?: string
The reason why sampling stopped, if known.
## 
[​](#tools%2Fcall)
`tools/call`
### 
[​](#calltoolrequest)
`CallToolRequest`
interface CallToolRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “tools/call”; 
[params](#): { arguments?: { [key: string]: unknown }; name: string }; 
}
Used by the client to invoke a tool provided by the server.
### 
[​](#calltoolresult)
`CallToolResult`
interface CallToolResult { 
[_meta](#calltoolresult-_meta)?: { [key: string]: unknown }; 
[content](#calltoolresult-content): [ContentBlock](#contentblock)[]; 
[isError](#calltoolresult-iserror)?: boolean; 
[structuredContent](#calltoolresult-structuredcontent)?: { [key: string]: unknown }; 
[key: string]: unknown; 
}
The server’s response to a tool call.
`Optional`_meta[](#calltoolresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from [Result](#result).[_meta](#result-_meta)
content[](#calltoolresult-content)
content: [ContentBlock](#contentblock)[]
A list of content objects that represent the unstructured result of the tool call.
`Optional`isError[](#calltoolresult-iserror)
isError?: boolean
Whether the tool call ended in an error.
If not set, this is assumed to be false (the call was successful).
Any errors that originate from the tool SHOULD be reported inside the result object, with `isError` set to true, _not_ as an MCP protocol-level error response. Otherwise, the LLM would not be able to see that an error occurred and self-correct.
However, any errors in _finding_ the tool, an error indicating that the server does not support tool calls, or any other exceptional conditions, should be reported as an MCP error response.
`Optional`structuredContent[](#calltoolresult-structuredcontent)
structuredContent?: { [key: string]: unknown }
An optional JSON object that represents the structured result of the tool call.
## 
[​](#tools%2Flist)
`tools/list`
### 
[​](#listtoolsrequest)
`ListToolsRequest`
interface ListToolsRequest { 
[id](#): [RequestId](#requestid); 
[jsonrpc](#): “2.0”; 
[method](#): “tools/list”; 
[params](#listtoolsrequest-params)?: { cursor?: string }; 
}
Sent from the client to request a list of tools the server has.
`Optional`params[](#listtoolsrequest-params)
params?: { cursor?: string }
Type declaration
 * `Optional`cursor?: string
An opaque token representing the current pagination position. If provided, the server should return results starting after this cursor.
Inherited from PaginatedRequest.params
### 
[​](#listtoolsresult)
`ListToolsResult`
interface ListToolsResult { 
[_meta](#listtoolsresult-_meta)?: { [key: string]: unknown }; 
[nextCursor](#listtoolsresult-nextcursor)?: string; 
[tools](#): [Tool](#tool)[]; 
[key: string]: unknown; 
}
The server’s response to a tools/list request from the client.
`Optional`_meta[](#listtoolsresult-_meta)
_meta?: { [key: string]: unknown }
See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
Inherited from PaginatedResult._meta
`Optional`nextCursor[](#listtoolsresult-nextcursor)
nextCursor?: string
An opaque token representing the pagination position after the last returned result. If present, there may be more results available.
Inherited from PaginatedResult.nextCursor
Was this page helpful?
YesNo
[Pagination](/specification/draft/server/utilities/pagination)
⌘I