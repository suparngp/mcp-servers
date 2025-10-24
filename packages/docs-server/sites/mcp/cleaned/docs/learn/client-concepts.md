[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Search...
⌘K
Search...
Navigation
About MCP
Understanding MCP clients
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
##### Get started
 * [What is MCP?](/docs/getting-started/intro)
##### About MCP
 * [Architecture](/docs/learn/architecture)
 * [Servers](/docs/learn/server-concepts)
 * [Clients](/docs/learn/client-concepts)
 * [Versioning](/specification/versioning)
##### Develop with MCP
 * [Connect to local MCP servers](/docs/develop/connect-local-servers)
 * [Connect to remote MCP Servers](/docs/develop/connect-remote-servers)
 * [Build an MCP server](/docs/develop/build-server)
 * [Build an MCP client](/docs/develop/build-client)
 * [SDKs](/docs/sdk)
 * Security
##### Developer tools
 * [MCP Inspector](/docs/tools/inspector)
On this page
 * [Core Client Features](#core-client-features)
 * [Elicitation](#elicitation)
 * [Overview](#overview)
 * [Example: Holiday Booking Approval](#example%3A-holiday-booking-approval)
 * [User Interaction Model](#user-interaction-model)
 * [Roots](#roots)
 * [Overview](#overview-2)
 * [Example: Travel Planning Workspace](#example%3A-travel-planning-workspace)
 * [Design Philosophy](#design-philosophy)
 * [User Interaction Model](#user-interaction-model-2)
 * [Sampling](#sampling)
 * [Overview](#overview-3)
 * [Example: Flight Analysis Tool](#example%3A-flight-analysis-tool)
 * [User Interaction Model](#user-interaction-model-3)
MCP clients are instantiated by host applications to communicate with particular MCP servers. The host application, like Claude.ai or an IDE, manages the overall user experience and coordinates multiple clients. Each client handles one direct communication with one server. Understanding the distinction is important: the _host_ is the application users interact with, while _clients_ are the protocol-level components that enable server connections.
## 
[​](#core-client-features)
Core Client Features
In addition to making use of context provided by servers, clients may provide several features to servers. These client features allow server authors to build richer interactions. Feature | Explanation | Example 
---|---|--- 
**Sampling** | Sampling allows servers to request LLM completions through the client, enabling an agentic workflow. This approach puts the client in complete control of user permissions and security measures. | A server for booking travel may send a list of flights to an LLM and request that the LLM pick the best flight for the user. 
**Roots** | Roots allow clients to specify which directories servers should focus on, communicating intended scope through a coordination mechanism. | A server for booking travel may be given access to a specific directory, from which it can read a user’s calendar. 
**Elicitation** | Elicitation enables servers to request specific information from users during interactions, providing a structured way for servers to gather information on demand. | A server booking travel may ask for the user’s preferences on airplane seats, room type or their contact number to finalise a booking. 
### 
[​](#elicitation)
Elicitation
Elicitation enables servers to request specific information from users during interactions, creating more dynamic and responsive workflows.
#### 
[​](#overview)
Overview
Elicitation provides a structured way for servers to gather necessary information on demand. Instead of requiring all information up front or failing when data is missing, servers can pause their operations to request specific inputs from users. This creates more flexible interactions where servers adapt to user needs rather than following rigid patterns. **Elicitation flow:** The flow enables dynamic information gathering. Servers can request specific data when needed, users provide information through appropriate UI, and servers continue processing with the newly acquired context. **Elicitation components example:**
Copy
```
{
 method: "elicitation/requestInput",
 params: {
 message: "Please confirm your Barcelona vacation booking details:",
 schema: {
 type: "object",
 properties: {
 confirmBooking: {
 type: "boolean",
 description: "Confirm the booking (Flights + Hotel = $3,000)"
 },
 seatPreference: {
 type: "string",
 enum: ["window", "aisle", "no preference"],
 description: "Preferred seat type for flights"
 },
 roomType: {
 type: "string",
 enum: ["sea view", "city view", "garden view"],
 description: "Preferred room type at hotel"
 },
 travelInsurance: {
 type: "boolean",
 default: false,
 description: "Add travel insurance ($150)"
 }
 },
 required: ["confirmBooking"]
 }
 }
}
```
#### 
[​](#example%3A-holiday-booking-approval)
Example: Holiday Booking Approval
A travel booking server demonstrates elicitation’s power through the final booking confirmation process. When a user has selected their ideal vacation package to Barcelona, the server needs to gather final approval and any missing details before proceeding. The server elicits booking confirmation with a structured request that includes the trip summary (Barcelona flights June 15-22, beachfront hotel, total $3,000) and fields for any additional preferences—such as seat selection, room type, or travel insurance options. As the booking progresses, the server elicits contact information needed to complete the reservation. It might ask for traveler details for flight bookings, special requests for the hotel, or emergency contact information.
#### 
[​](#user-interaction-model)
User Interaction Model
Elicitation interactions are designed to be clear, contextual, and respectful of user autonomy: **Request presentation** : Clients display elicitation requests with clear context about which server is asking, why the information is needed, and how it will be used. The request message explains the purpose while the schema provides structure and validation. **Response options** : Users can provide the requested information through appropriate UI controls (text fields, dropdowns, checkboxes), decline to provide information with optional explanation, or cancel the entire operation. Clients validate responses against the provided schema before returning them to servers. **Privacy considerations** : Elicitation never requests passwords or API keys. Clients warn about suspicious requests and let users review data before sending.
### 
[​](#roots)
Roots
Roots define filesystem boundaries for server operations, allowing clients to specify which directories servers should focus on.
#### 
[​](#overview-2)
Overview
Roots are a mechanism for clients to communicate filesystem access boundaries to servers. They consist of file URIs that indicate directories where servers can operate, helping servers understand the scope of available files and folders. While roots communicate intended boundaries, they do not enforce security restrictions. Actual security must be enforced at the operating system level, via file permissions and/or sandboxing. **Root structure:**
Copy
```
{
 "uri": "file:///Users/agent/travel-planning",
 "name": "Travel Planning Workspace"
}
```
Roots are exclusively filesystem paths and always use the `file://` URI scheme. They help servers understand project boundaries, workspace organization, and accessible directories. The roots list can be updated dynamically as users work with different projects or folders, with servers receiving notifications through `roots/list_changed` when boundaries change.
#### 
[​](#example%3A-travel-planning-workspace)
Example: Travel Planning Workspace
A travel agent working with multiple client trips benefits from roots to organize filesystem access. Consider a workspace with different directories for various aspects of travel planning. The client provides filesystem roots to the travel planning server:
 * `file:///Users/agent/travel-planning` - Main workspace containing all travel files
 * `file:///Users/agent/travel-templates` - Reusable itinerary templates and resources
 * `file:///Users/agent/client-documents` - Client passports and travel documents
When the agent creates a Barcelona itinerary, well-behaved servers respect these boundaries—accessing templates, saving the new itinerary, and referencing client documents within the specified roots. Servers typically access files within roots by using relative paths from the root directories or by utilizing file search tools that respect the root boundaries. If the agent opens an archive folder like `file:///Users/agent/archive/2023-trips`, the client updates the roots list via `roots/list_changed`. For a complete implementation of a server that respects roots, see the [filesystem server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) in the official servers repository.
#### 
[​](#design-philosophy)
Design Philosophy
Roots serve as a coordination mechanism between clients and servers, not a security boundary. The specification requires that servers “SHOULD respect root boundaries,” and not that they “MUST enforce” them, because servers run code the client cannot control. Roots work best when servers are trusted or vetted, users understand their advisory nature, and the goal is preventing accidents rather than stopping malicious behavior. They excel at context scoping (telling servers where to focus), accident prevention (helping well-behaved servers stay in bounds), and workflow organization (such as managing project boundaries automatically).
#### 
[​](#user-interaction-model-2)
User Interaction Model
Roots are typically managed automatically by host applications based on user actions, though some applications may expose manual root management: **Automatic root detection** : When users open folders, clients automatically expose them as roots. Opening a travel workspace allows the client to expose that directory as a root, helping servers understand which itineraries and documents are in scope for the current work. **Manual root configuration** : Advanced users can specify roots through configuration. For example, adding `/travel-templates` for reusable resources while excluding directories with financial records.
### 
[​](#sampling)
Sampling
Sampling allows servers to request language model completions through the client, enabling agentic behaviors while maintaining security and user control.
#### 
[​](#overview-3)
Overview
Sampling enables servers to perform AI-dependent tasks without directly integrating with or paying for AI models. Instead, servers can request that the client—which already has AI model access—handle these tasks on their behalf. This approach puts the client in complete control of user permissions and security measures. Because sampling requests occur within the context of other operations—like a tool analyzing data—and are processed as separate model calls, they maintain clear boundaries between different contexts, allowing for more efficient use of the context window. **Sampling flow:** The flow ensures security through multiple human-in-the-loop checkpoints. Users review and can modify both the initial request and the generated response before it returns to the server. **Request parameters example:**
Copy
```
{
 messages: [
 {
 role: "user",
 content: "Analyze these flight options and recommend the best choice:\n" +
 "[47 flights with prices, times, airlines, and layovers]\n" +
 "User preferences: morning departure, max 1 layover"
 }
 ],
 modelPreferences: {
 hints: [{
 name: "claude-3-5-sonnet" // Suggested model
 }],
 costPriority: 0.3, // Less concerned about API cost
 speedPriority: 0.2, // Can wait for thorough analysis
 intelligencePriority: 0.9 // Need complex trade-off evaluation
 },
 systemPrompt: "You are a travel expert helping users find the best flights based on their preferences",
 maxTokens: 1500
}
```
#### 
[​](#example%3A-flight-analysis-tool)
Example: Flight Analysis Tool
Consider a travel booking server with a tool called `findBestFlight` that uses sampling to analyze available flights and recommend the optimal choice. When a user asks “Book me the best flight to Barcelona next month,” the tool needs AI assistance to evaluate complex trade-offs. The tool queries airline APIs and gathers 47 flight options. It then requests AI assistance to analyze these options: “Analyze these flight options and recommend the best choice: [47 flights with prices, times, airlines, and layovers] User preferences: morning departure, max 1 layover.” The client initiates the sampling request, allowing the AI to evaluate trade-offs—like cheaper red-eye flights versus convenient morning departures. The tool uses this analysis to present the top three recommendations.
#### 
[​](#user-interaction-model-3)
User Interaction Model
While not a requirement, sampling is designed to allow human-in-the-loop control. Users can maintain oversight through several mechanisms: **Approval controls** : Sampling requests may require explicit user consent. Clients can show what the server wants to analyze and why. Users can approve, deny, or modify requests. **Transparency features** : Clients can display the exact prompt, model selection, and token limits, allowing users to review AI responses before they return to the server. **Configuration options** : Users can set model preferences, configure auto-approval for trusted operations, or require approval for everything. Clients may provide options to redact sensitive information. **Security considerations** : Both clients and servers must handle sensitive data appropriately during sampling. Clients should implement rate limiting and validate all message content. The human-in-the-loop design ensures that server-initiated AI interactions cannot compromise security or access sensitive data without explicit user consent.
Was this page helpful?
YesNo
[Servers](/docs/learn/server-concepts)[Versioning](/specification/versioning)
⌘I