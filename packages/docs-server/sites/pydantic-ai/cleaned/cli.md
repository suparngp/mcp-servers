[ Skip to content ](#command-line-interface-cli)
# Command Line Interface (CLI)
**Pydantic AI** comes with a CLI, `clai` (pronounced "clay") which you can use to interact with various LLMs from the command line. It provides a convenient way to chat with language models and quickly get answers right in the terminal.
We originally developed this CLI for our own use, but found ourselves using it so frequently that we decided to share it as part of the Pydantic AI package.
We plan to continue adding new features, such as interaction with MCP servers, access to tools, and more.
## Usage
You'll need to set an environment variable depending on the provider you intend to use.
E.g. if you're using OpenAI, set the `OPENAI_API_KEY` environment variable:
```
exportOPENAI_API_KEY='your-api-key-here'
```
Then with [`uvx`](https://docs.astral.sh/uv/guides/tools/), run:
```
uvx
```
Or to install `clai` globally [with `uv`](https://docs.astral.sh/uv/guides/tools/#installing-tools), run:
```
uv
```
Or with `pip`, run:
```
pip
```
Either way, running `clai` will start an interactive session where you can chat with the AI model. Special commands available in interactive mode:
 * `/exit`: Exit the session
 * `/markdown`: Show the last response in markdown format
 * `/multiline`: Toggle multiline input mode (use Ctrl+D to submit)
 * `/cp`: Copy the last response to clipboard
### Help
To get help on the CLI, use the `--help` flag:
```
uvx
```
### Choose a model
You can specify which model to use with the `--model` flag:
```
uvx
```
(a full list of models available can be printed with `uvx clai --list-models`)
### Custom Agents
You can specify a custom agent using the `--agent` flag with a module path and variable name:
custom_agent.py```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-5', instructions='You always respond in Italian.')
```
Then run:
```
uvx"What's the weather today?"
```
The format must be `module:variable` where:
 * `module` is the importable Python module path
 * `variable` is the name of the Agent instance in that module
Additionally, you can directly launch CLI mode from an `Agent` instance using `Agent.to_cli_sync()`:
agent_to_cli_sync.py```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-5', instructions='You always respond in Italian.')
agent.to_cli_sync()
```
You can also use the async interface with `Agent.to_cli()`:
agent_to_cli.py```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-5', instructions='You always respond in Italian.')
async defmain():
 await agent.to_cli()
```
_(You'll need to add`asyncio.run(main())` to run `main`)_
### Message History
Both `Agent.to_cli()` and `Agent.to_cli_sync()` support a `message_history` parameter, allowing you to continue an existing conversation or provide conversation context:
agent_with_history.py```
frompydantic_aiimport (
 Agent,
 ModelMessage,
 ModelRequest,
 ModelResponse,
 TextPart,
 UserPromptPart,
)
agent = Agent('openai:gpt-5')
# Create some conversation history
message_history: list[ModelMessage] = [
 ModelRequest([UserPromptPart(content='What is 2+2?')]),
 ModelResponse([TextPart(content='2+2 equals 4.')])
]
# Start CLI with existing conversation context
agent.to_cli_sync(message_history=message_history)
```
The CLI will start with the provided conversation history, allowing the agent to refer back to previous exchanges and maintain context throughout the session.