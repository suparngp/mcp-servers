Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Skills
Using Agent Skills with the API
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
* [](/en/docs/intro)
* [](/en/api/overview)
##### Using the APIs
 * [Overview](/en/api/overview)
 * [Rate limits](/en/api/rate-limits)
 * [Service tiers](/en/api/service-tiers)
 * [Errors](/en/api/errors)
 * [Handling stop reasons](/en/api/handling-stop-reasons)
 * [Beta headers](/en/api/beta-headers)
##### API reference
 * Messages
 * Models
 * Message Batches
 * Files
 * Skills
 * [Using Skills](/en/api/skills-guide)
 * Skill Management
 * Skill Versions
 * Admin API
 * Experimental APIs
 * Text Completions (Legacy)
##### SDKs
 * [Client SDKs](/en/api/client-sdks)
 * [OpenAI SDK compatibility](/en/api/openai-sdk)
 * Agent SDK
##### Examples
 * [Messages examples](/en/api/messages-examples)
 * [Message Batches examples](/en/api/messages-batch-examples)
##### 3rd-party APIs
 * [Amazon Bedrock API](/en/api/claude-on-amazon-bedrock)
 * [Vertex AI API](/en/api/claude-on-vertex-ai)
##### Using the Admin API
 * [Admin API overview](/en/api/administration-api)
 * [Usage and Cost API](/en/api/usage-cost-api)
 * [Claude Code Analytics API](/en/api/claude-code-analytics-api)
##### Support & configuration
 * [Versions](/en/api/versioning)
 * [IP addresses](/en/api/ip-addresses)
 * [Supported regions](/en/api/supported-regions)
 * [Getting help](/en/api/getting-help)
On this page
 * [Quick Links](#quick-links)
 * [Overview](#overview)
 * [Using Skills](#using-skills)
 * [Prerequisites](#prerequisites)
 * [Using Skills in Messages](#using-skills-in-messages)
 * [Container Parameter](#container-parameter)
 * [Downloading Generated Files](#downloading-generated-files)
 * [Multi-Turn Conversations](#multi-turn-conversations)
 * [Long-Running Operations](#long-running-operations)
 * [Using Multiple Skills](#using-multiple-skills)
 * [Managing Custom Skills](#managing-custom-skills)
 * [Creating a Skill](#creating-a-skill)
 * [Listing Skills](#listing-skills)
 * [Retrieving a Skill](#retrieving-a-skill)
 * [Deleting a Skill](#deleting-a-skill)
 * [Versioning](#versioning)
 * [How Skills Are Loaded](#how-skills-are-loaded)
 * [Use Cases](#use-cases)
 * [Organizational Skills](#organizational-skills)
 * [Personal Skills](#personal-skills)
 * [Example: Financial Modeling](#example%3A-financial-modeling)
 * [Limits and Constraints](#limits-and-constraints)
 * [Request Limits](#request-limits)
 * [Environment Constraints](#environment-constraints)
 * [Best Practices](#best-practices)
 * [When to Use Multiple Skills](#when-to-use-multiple-skills)
 * [Version Management Strategy](#version-management-strategy)
 * [Prompt Caching Considerations](#prompt-caching-considerations)
 * [Error Handling](#error-handling)
 * [Next Steps](#next-steps)
Agent Skills extend Claude’s capabilities through organized folders of instructions, scripts, and resources. This guide shows you how to use both pre-built and custom Skills with the Claude API.
For complete API reference including request/response schemas and all parameters, see:
 * [Skill Management API Reference](/en/api/skills/list-skills) - CRUD operations for Skills
 * [Skill Versions API Reference](/en/api/skills/list-skill-versions) - Version management
## 
[​](#quick-links)
Quick Links
## [Get started with Agent Skills Create your first Skill ](/en/docs/agents-and-tools/agent-skills/quickstart)## [Create Custom Skills Best practices for authoring Skills ](/en/docs/agents-and-tools/agent-skills/best-practices)
## 
[​](#overview)
Overview
For a deep dive into the architecture and real-world applications of Agent Skills, read our engineering blog: [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
Skills integrate with the Messages API through the code execution tool. Whether using pre-built Skills managed by Anthropic or custom Skills you’ve uploaded, the integration shape is identical—both require code execution and use the same `container` structure.
### 
[​](#using-skills)
Using Skills
Skills integrate identically in the Messages API regardless of source. You specify Skills in the `container` parameter with a `skill_id`, `type`, and optional `version`, and they execute in the code execution environment. **You can use Skills from two sources:** Aspect | Anthropic Skills | Custom Skills 
---|---|--- 
**Type value** | `anthropic` | `custom` 
**Skill IDs** | Short names: `pptx`, `xlsx`, `docx`, `pdf` | Generated: `skill_01AbCdEfGhIjKlMnOpQrStUv` 
**Version format** | Date-based: `20251013` or `latest` | Epoch timestamp: `1759178010641129` or `latest` 
**Management** | Pre-built and maintained by Anthropic | Upload and manage via [Skills API](/en/api/skills/create-skill) 
**Availability** | Available to all users | Private to your workspace 
Both skill sources are returned by the [List Skills endpoint](/en/api/skills/list-skills) (use the `source` parameter to filter). The integration shape and execution environment are identical—the only difference is where the Skills come from and how they’re managed.
### 
[​](#prerequisites)
Prerequisites
To use Skills, you need:
 1. **Anthropic API key** from the [Console](https://console.anthropic.com/settings/keys)
 2. **Beta headers** :
 * `code-execution-2025-08-25` - Enables code execution (required for Skills)
 * `skills-2025-10-02` - Enables Skills API
 * `files-api-2025-04-14` - For uploading/downloading files to/from container
 3. **Code execution tool** enabled in your requests
* * *
## 
[​](#using-skills-in-messages)
Using Skills in Messages
### 
[​](#container-parameter)
Container Parameter
Skills are specified using the `container` parameter in the Messages API. You can include up to 8 Skills per request. The structure is identical for both Anthropic and custom Skills—specify the required `type` and `skill_id`, and optionally include `version` to pin to a specific version:
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {
 "type": "anthropic",
 "skill_id": "pptx",
 "version": "latest"
 }
 ]
 },
 messages=[{
 "role": "user",
 "content": "Create a presentation about renewable energy"
 }],
 tools=[{
 "type": "code_execution_20250825",
 "name": "code_execution"
 }]
)
```
### 
[​](#downloading-generated-files)
Downloading Generated Files
When Skills create documents (Excel, PowerPoint, PDF, Word), they return `file_id` attributes in the response. You must use the Files API to download these files. **How it works:**
 1. Skills create files during code execution
 2. Response includes `file_id` for each created file
 3. Use Files API to download the actual file content
 4. Save locally or process as needed
**Example: Creating and downloading an Excel file**
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
# Step 1: Use a Skill to create a file
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {"type": "anthropic", "skill_id": "xlsx", "version": "latest"}
 ]
 },
 messages=[{
 "role": "user",
 "content": "Create an Excel file with a simple budget spreadsheet"
 }],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
# Step 2: Extract file IDs from the response
def extract_file_ids(response):
 file_ids = []
 for item in response.content:
 if item.type == 'bash_code_execution_tool_result':
 content_item = item.content
 if content_item.type == 'bash_code_execution_result':
 for file in content_item.content:
 if hasattr(file, 'file_id'):
 file_ids.append(file.file_id)
 return file_ids
# Step 3: Download the file using Files API
for file_id in extract_file_ids(response):
 file_metadata = client.beta.files.retrieve_metadata(
 file_id=file_id,
 betas=["files-api-2025-04-14"]
 )
 file_content = client.beta.files.download(
 file_id=file_id,
 betas=["files-api-2025-04-14"]
 )
 # Step 4: Save to disk
 file_content.write_to_file(file_metadata.filename)
 print(f"Downloaded: {file_metadata.filename}")
```
**Additional Files API operations:**
Python
TypeScript
Shell
Copy
```
# Get file metadata
file_info = client.beta.files.retrieve_metadata(
 file_id=file_id,
 betas=["files-api-2025-04-14"]
)
print(f"Filename: {file_info.filename}, Size: {file_info.size_bytes} bytes")
# List all files
files = client.beta.files.list(betas=["files-api-2025-04-14"])
for file in files.data:
 print(f"{file.filename} - {file.created_at}")
# Delete a file
client.beta.files.delete(
 file_id=file_id,
 betas=["files-api-2025-04-14"]
)
```
For complete details on the Files API, see the [Files API documentation](/en/api/files-content).
### 
[​](#multi-turn-conversations)
Multi-Turn Conversations
Reuse the same container across multiple messages by specifying the container ID:
Python
TypeScript
Copy
```
# First request creates container
response1 = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {"type": "anthropic", "skill_id": "xlsx", "version": "latest"}
 ]
 },
 messages=[{"role": "user", "content": "Analyze this sales data"}],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
# Continue conversation with same container
messages = [
 {"role": "user", "content": "Analyze this sales data"},
 {"role": "assistant", "content": response1.content},
 {"role": "user", "content": "What was the total revenue?"}
]
response2 = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "id": response1.container.id, # Reuse container
 "skills": [
 {"type": "anthropic", "skill_id": "xlsx", "version": "latest"}
 ]
 },
 messages=messages,
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
```
### 
[​](#long-running-operations)
Long-Running Operations
Skills may perform operations that require multiple turns. Handle `pause_turn` stop reasons:
Python
TypeScript
Shell
Copy
```
messages = [{"role": "user", "content": "Process this large dataset"}]
max_retries = 10
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {"type": "custom", "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv", "version": "latest"}
 ]
 },
 messages=messages,
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
# Handle pause_turn for long operations
for i in range(max_retries):
 if response.stop_reason != "pause_turn":
 break
 messages.append({"role": "assistant", "content": response.content})
 response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "id": response.container.id,
 "skills": [
 {"type": "custom", "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv", "version": "latest"}
 ]
 },
 messages=messages,
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
 )
```
The response may include a `pause_turn` stop reason, which indicates that the API paused a long-running Skill operation. You can provide the response back as-is in a subsequent request to let Claude continue its turn, or modify the content if you wish to interrupt the conversation and provide additional guidance.
### 
[​](#using-multiple-skills)
Using Multiple Skills
Combine multiple Skills in a single request to handle complex workflows:
Python
TypeScript
Shell
Copy
```
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {
 "type": "anthropic",
 "skill_id": "xlsx",
 "version": "latest"
 },
 {
 "type": "anthropic",
 "skill_id": "pptx",
 "version": "latest"
 },
 {
 "type": "custom",
 "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
 "version": "latest"
 }
 ]
 },
 messages=[{
 "role": "user",
 "content": "Analyze sales data and create a presentation"
 }],
 tools=[{
 "type": "code_execution_20250825",
 "name": "code_execution"
 }]
)
```
* * *
## 
[​](#managing-custom-skills)
Managing Custom Skills
### 
[​](#creating-a-skill)
Creating a Skill
Upload your custom Skill to make it available in your workspace. You can upload using either a directory path or individual file objects.
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
# Option 1: Using files_from_dir helper (Python only, recommended)
from anthropic.lib import files_from_dir
skill = client.beta.skills.create(
 display_title="Financial Analysis",
 files=files_from_dir("/path/to/financial_analysis_skill"),
 betas=["skills-2025-10-02"]
)
# Option 2: Using a zip file
skill = client.beta.skills.create(
 display_title="Financial Analysis",
 files=[("skill.zip", open("financial_analysis_skill.zip", "rb"))],
 betas=["skills-2025-10-02"]
)
# Option 3: Using file tuples (filename, file_content, mime_type)
skill = client.beta.skills.create(
 display_title="Financial Analysis",
 files=[
 ("financial_skill/SKILL.md", open("financial_skill/SKILL.md", "rb"), "text/markdown"),
 ("financial_skill/analyze.py", open("financial_skill/analyze.py", "rb"), "text/x-python"),
 ],
 betas=["skills-2025-10-02"]
)
print(f"Created skill: {skill.id}")
print(f"Latest version: {skill.latest_version}")
```
**Requirements:**
 * Must include a SKILL.md file at the top level
 * All files must specify a common root directory in their paths
 * Total upload size must be under 8MB
 * YAML frontmatter requirements:
 * `name`: Maximum 64 characters, lowercase letters/numbers/hyphens only, no XML tags, no reserved words (“anthropic”, “claude”)
 * `description`: Maximum 1024 characters, non-empty, no XML tags
For complete request/response schemas, see the [Create Skill API reference](/en/api/skills/create-skill).
### 
[​](#listing-skills)
Listing Skills
Retrieve all Skills available to your workspace, including both Anthropic pre-built Skills and your custom Skills. Use the `source` parameter to filter by skill type:
Python
TypeScript
Shell
Copy
```
# List all Skills
skills = client.beta.skills.list(
 betas=["skills-2025-10-02"]
)
for skill in skills.data:
 print(f"{skill.id}: {skill.display_title} (source: {skill.source})")
# List only custom Skills
custom_skills = client.beta.skills.list(
 source="custom",
 betas=["skills-2025-10-02"]
)
```
See the [List Skills API reference](/en/api/skills/list-skills) for pagination and filtering options.
### 
[​](#retrieving-a-skill)
Retrieving a Skill
Get details about a specific Skill:
Python
TypeScript
Shell
Copy
```
skill = client.beta.skills.retrieve(
 skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv",
 betas=["skills-2025-10-02"]
)
print(f"Skill: {skill.display_title}")
print(f"Latest version: {skill.latest_version}")
print(f"Created: {skill.created_at}")
```
### 
[​](#deleting-a-skill)
Deleting a Skill
To delete a Skill, you must first delete all its versions:
Python
TypeScript
Shell
Copy
```
# Step 1: Delete all versions
versions = client.beta.skills.versions.list(
 skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv",
 betas=["skills-2025-10-02"]
)
for version in versions.data:
 client.beta.skills.versions.delete(
 skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv",
 version=version.version,
 betas=["skills-2025-10-02"]
 )
# Step 2: Delete the Skill
client.beta.skills.delete(
 skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv",
 betas=["skills-2025-10-02"]
)
```
Attempting to delete a Skill with existing versions will return a 400 error.
### 
[​](#versioning)
Versioning
Skills support versioning to manage updates safely: **Anthropic-Managed Skills** :
 * Versions use date format: `20251013`
 * New versions released as updates are made
 * Specify exact versions for stability
**Custom Skills** :
 * Auto-generated epoch timestamps: `1759178010641129`
 * Use `"latest"` to always get the most recent version
 * Create new versions when updating Skill files
Python
TypeScript
Shell
Copy
```
# Create a new version
from anthropic.lib import files_from_dir
new_version = client.beta.skills.versions.create(
 skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv",
 files=files_from_dir("/path/to/updated_skill"),
 betas=["skills-2025-10-02"]
)
# Use specific version
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [{
 "type": "custom",
 "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
 "version": new_version.version
 }]
 },
 messages=[{"role": "user", "content": "Use updated Skill"}],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
# Use latest version
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [{
 "type": "custom",
 "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
 "version": "latest"
 }]
 },
 messages=[{"role": "user", "content": "Use latest Skill version"}],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
```
See the [Create Skill Version API reference](/en/api/skills/create-skill-version) for complete details.
* * *
## 
[​](#how-skills-are-loaded)
How Skills Are Loaded
When you specify Skills in a container:
 1. **Metadata Discovery** : Claude sees metadata for each Skill (name, description) in the system prompt
 2. **File Loading** : Skill files are copied into the container at `/skills/{directory}/`
 3. **Automatic Use** : Claude automatically loads and uses Skills when relevant to your request
 4. **Composition** : Multiple Skills compose together for complex workflows
The progressive disclosure architecture ensures efficient context usage—Claude only loads full Skill instructions when needed.
* * *
## 
[​](#use-cases)
Use Cases
### 
[​](#organizational-skills)
Organizational Skills
**Brand & Communications**
 * Apply company-specific formatting (colors, fonts, layouts) to documents
 * Generate communications following organizational templates
 * Ensure consistent brand guidelines across all outputs
**Project Management**
 * Structure notes with company-specific formats (OKRs, decision logs)
 * Generate tasks following team conventions
 * Create standardized meeting recaps and status updates
**Business Operations**
 * Create company-standard reports, proposals, and analyses
 * Execute company-specific analytical procedures
 * Generate financial models following organizational templates
### 
[​](#personal-skills)
Personal Skills
**Content Creation**
 * Custom document templates
 * Specialized formatting and styling
 * Domain-specific content generation
**Data Analysis**
 * Custom data processing pipelines
 * Specialized visualization templates
 * Industry-specific analytical methods
**Development & Automation**
 * Code generation templates
 * Testing frameworks
 * Deployment workflows
### 
[​](#example%3A-financial-modeling)
Example: Financial Modeling
Combine Excel and custom DCF analysis Skills:
Python
TypeScript
Shell
Copy
```
# Create custom DCF analysis Skill
from anthropic.lib import files_from_dir
dcf_skill = client.beta.skills.create(
 display_title="DCF Analysis",
 files=files_from_dir("/path/to/dcf_skill"),
 betas=["skills-2025-10-02"]
)
# Use with Excel to create financial model
response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {"type": "anthropic", "skill_id": "xlsx", "version": "latest"},
 {"type": "custom", "skill_id": dcf_skill.id, "version": "latest"}
 ]
 },
 messages=[{
 "role": "user",
 "content": "Build a DCF valuation model for a SaaS company with the attached financials"
 }],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
```
* * *
## 
[​](#limits-and-constraints)
Limits and Constraints
### 
[​](#request-limits)
Request Limits
 * **Maximum Skills per request** : 8
 * **Maximum Skill upload size** : 8MB (all files combined)
 * **YAML frontmatter requirements** :
 * `name`: Maximum 64 characters, lowercase letters/numbers/hyphens only, no XML tags, no reserved words
 * `description`: Maximum 1024 characters, non-empty, no XML tags
### 
[​](#environment-constraints)
Environment Constraints
Skills run in the code execution container with these limitations:
 * **No network access** - Cannot make external API calls
 * **No runtime package installation** - Only pre-installed packages available
 * **Isolated environment** - Each request gets a fresh container
See the [code execution tool documentation](/en/docs/agents-and-tools/tool-use/code-execution-tool) for available packages.
* * *
## 
[​](#best-practices)
Best Practices
### 
[​](#when-to-use-multiple-skills)
When to Use Multiple Skills
Combine Skills when tasks involve multiple document types or domains: **Good use cases:**
 * Data analysis (Excel) + presentation creation (PowerPoint)
 * Report generation (Word) + export to PDF
 * Custom domain logic + document generation
**Avoid:**
 * Including unused Skills (impacts performance)
### 
[​](#version-management-strategy)
Version Management Strategy
**For production:**
Copy
```
# Pin to specific versions for stability
container={
 "skills": [{
 "type": "custom",
 "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
 "version": "1759178010641129" # Specific version
 }]
}
```
**For development:**
Copy
```
# Use latest for active development
container={
 "skills": [{
 "type": "custom",
 "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
 "version": "latest" # Always get newest
 }]
}
```
### 
[​](#prompt-caching-considerations)
Prompt Caching Considerations
When using prompt caching, note that changing the Skills list in your container will break the cache:
Python
TypeScript
Shell
Copy
```
# First request creates cache
response1 = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02", "prompt-caching-2024-07-31"],
 container={
 "skills": [
 {"type": "anthropic", "skill_id": "xlsx", "version": "latest"}
 ]
 },
 messages=[{"role": "user", "content": "Analyze sales data"}],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
# Adding/removing Skills breaks cache
response2 = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02", "prompt-caching-2024-07-31"],
 container={
 "skills": [
 {"type": "anthropic", "skill_id": "xlsx", "version": "latest"},
 {"type": "anthropic", "skill_id": "pptx", "version": "latest"} # Cache miss
 ]
 },
 messages=[{"role": "user", "content": "Create a presentation"}],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
```
For best caching performance, keep your Skills list consistent across requests.
### 
[​](#error-handling)
Error Handling
Handle Skill-related errors gracefully:
Python
TypeScript
Copy
```
try:
 response = client.beta.messages.create(
 model="claude-sonnet-4-5-20250929",
 max_tokens=4096,
 betas=["code-execution-2025-08-25", "skills-2025-10-02"],
 container={
 "skills": [
 {"type": "custom", "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv", "version": "latest"}
 ]
 },
 messages=[{"role": "user", "content": "Process data"}],
 tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
 )
except anthropic.BadRequestError as e:
 if "skill" in str(e):
 print(f"Skill error: {e}")
 # Handle skill-specific errors
 else:
 raise
```
* * *
## 
[​](#next-steps)
Next Steps
## [API Reference Complete API reference with all endpoints ](/en/api/skills/create-skill)## [Authoring Guide Best practices for writing effective Skills ](/en/docs/agents-and-tools/agent-skills/best-practices)## [Code Execution Tool Learn about the code execution environment ](/en/docs/agents-and-tools/tool-use/code-execution-tool)
Was this page helpful?
YesNo
[Delete a File](/en/api/files-delete)[Create Skill](/en/api/skills/create-skill)
Assistant
Responses are generated using AI and may contain mistakes.