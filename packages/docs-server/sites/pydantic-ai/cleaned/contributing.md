[ Skip to content ](#installation-and-setup)
# Contributing
We'd love you to contribute to Pydantic AI!
## Installation and Setup
Clone your fork and cd into the repo directory
```
gitcd
```
Install `uv` (version 0.4.30 or later), `pre-commit` and `deno`:
 * [`uv` install docs](https://docs.astral.sh/uv/getting-started/installation/)
 * [`pre-commit` install docs](https://pre-commit.com/#install)
 * [`deno` install docs](https://docs.deno.com/runtime/getting_started/installation/)
To install `pre-commit` you can run the following command:
```
uv
```
For `deno`, you can run the following, or check [their documentation](https://docs.deno.com/runtime/getting_started/installation/) for alternative installation methods:
```
curl|
```
Install `pydantic-ai`, all dependencies and pre-commit hooks
```
make
```
## Running Tests etc.
We use `make` to manage most commands you'll need to run.
For details on available commands, run:
```
makehelp
```
To run code formatting, linting, static type checks, and tests with coverage report generation, run:
```
make
```
## Documentation Changes
To run the documentation page locally, run:
```
uv
```
## Rules for adding new models to Pydantic AI
To avoid an excessive workload for the maintainers of Pydantic AI, we can't accept all model contributions, so we're setting the following rules for when we'll accept new models and when we won't. This should hopefully reduce the chances of disappointment and wasted work.
 * To add a new model with an extra dependency, that dependency needs > 500k monthly downloads from PyPI consistently over 3 months or more
 * To add a new model which uses another models logic internally and has no extra dependencies, that model's GitHub org needs > 20k stars in total
 * For any other model that's just a custom URL and API key, we're happy to add a one-paragraph description with a link and instructions on the URL to use
 * For any other model that requires more logic, we recommend you release your own Python package `pydantic-ai-xxx`, which depends on [`pydantic-ai-slim`](../install/#slim-install) and implements a model that inherits from our [`Model`](../api/models/base/#pydantic_ai.models.Model) ABC
If you're unsure about adding a model, please [create an issue](https://github.com/pydantic/pydantic-ai/issues).