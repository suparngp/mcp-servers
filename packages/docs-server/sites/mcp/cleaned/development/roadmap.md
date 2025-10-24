[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Search...
⌘K
Search...
Navigation
Roadmap
Roadmap
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Contributor Communication](/community/communication)
##### Governance
 * [Governance and Stewardship](/community/governance)
 * [SEP Guidelines](/community/sep-guidelines)
 * [Working and Interest Groups](/community/working-interest-groups)
 * [Antitrust Policy](/community/antitrust)
##### Roadmap
 * [Roadmap](/development/roadmap)
##### Examples
 * [Example Clients](/clients)
 * [Example Servers](/examples)
On this page
 * [Agents](#agents)
 * [Authentication and Security](#authentication-and-security)
 * [Validation](#validation)
 * [Registry](#registry)
 * [Multimodality](#multimodality)
 * [Get Involved](#get-involved)
Last updated: **2025-07-22**
The Model Context Protocol is rapidly evolving. This page outlines our current thinking on key priorities and direction for approximately **the next six months** , though these may change significantly as the project develops. To see what’s changed recently, check out the **[specification changelog](/specification/2025-06-18/changelog)**.
The ideas presented here are not commitments—we may solve these challenges differently than described, or some may not materialize at all. This is also not an _exhaustive_ list; we may incorporate work that isn’t mentioned here.
We value community participation! Each section links to relevant discussions where you can learn more and contribute your thoughts. For a technical view of our standardization process, visit the [Standards Track](https://github.com/orgs/modelcontextprotocol/projects/2/views/2) on GitHub, which tracks how proposals progress toward inclusion in the official [MCP specification](https://spec.modelcontextprotocol.io).
## 
[​](#agents)
Agents
As MCP increasingly becomes part of agentic workflows, we’re focusing on key improvements:
 * **Asynchronous Operations** : supporting long-running operations that may take extended periods, with resilient handling of disconnections and reconnections
## 
[​](#authentication-and-security)
Authentication and Security
We’re evolving our authorization and security resources to improve user safety and provide a better developer experience:
 * **Guides and Best Practices** : documenting specifics about deploying MCP securely in the form of guides and best practices to help developers avoid common pitfalls.
 * **Alternatives to Dynamic Client Registration (DCR)** : exploring alternatives to DCR, attempting to address operational challenges while preserving a smooth user experience.
 * **Fine-grained Authorization** : developing mechanisms and guidelines for primitive authorization for sensitive actions
 * **Enterprise Managed Authorization** : adding the capability for enterprises to simplify MCP server authorization with the help of Single Sign-On (SSO)
 * **Secure Authorization Elicitation** : enable developers to integrate secure authorization flows for downstream APIs outside the main MCP server authorization
## 
[​](#validation)
Validation
To foster a robust developer ecosystem, we plan to invest in:
 * **Reference Client Implementations** : demonstrating protocol features with high-quality AI applications
 * **Reference Server Implementation** : showcasing authentication patterns and remote deployment best practices
 * **Compliance Test Suites** : automated verification that clients, servers, and SDKs properly implement the specification
These tools will help developers confidently implement MCP while ensuring consistent behavior across the ecosystem.
## 
[​](#registry)
Registry
For MCP to reach its full potential, we need streamlined ways to distribute and discover MCP servers. We plan to develop an [**MCP Registry**](https://github.com/orgs/modelcontextprotocol/discussions/159) that will enable centralized server discovery and metadata. This registry will primarily function as an API layer that third-party marketplaces and discovery services can build upon.
## 
[​](#multimodality)
Multimodality
Supporting the full spectrum of AI capabilities in MCP, including:
 * **Additional Modalities** : video and other media types
 * **[Streaming](https://github.com/modelcontextprotocol/specification/issues/117)** : multipart, chunked messages, and bidirectional communication for interactive experiences
## 
[​](#get-involved)
Get Involved
We welcome your contributions to MCP’s future! Join our [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions) to share ideas, provide feedback, or participate in the development process.
Was this page helpful?
YesNo
[Antitrust Policy](/community/antitrust)[Example Clients](/clients)
⌘I