[ Skip to content ](#bedrock)
# Bedrock
## Install
To use `BedrockConverseModel`, you need to either install `pydantic-ai`, or install `pydantic-ai-slim` with the `bedrock` optional group:
pipuv
```
pip"pydantic-ai-slim[bedrock]"
```
```
uv"pydantic-ai-slim[bedrock]"
```
## Configuration
To use [AWS Bedrock](https://aws.amazon.com/bedrock/), you'll need an AWS account with Bedrock enabled and appropriate credentials. You can use either AWS credentials directly or a pre-configured boto3 client.
`BedrockModelName` contains a list of available Bedrock models, including models from Anthropic, Amazon, Cohere, Meta, and Mistral.
## Environment variables
You can set your AWS credentials as environment variables ([among other options](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-environment-variables)):
```
exportAWS_BEARER_TOKEN_BEDROCK='your-api-key'
# or:
exportAWS_ACCESS_KEY_ID='your-access-key'
exportAWS_SECRET_ACCESS_KEY='your-secret-key'
exportAWS_DEFAULT_REGION='us-east-1'# or your preferred region
```
You can then use `BedrockConverseModel` by name:
```
frompydantic_aiimport Agent
agent = Agent('bedrock:anthropic.claude-3-sonnet-20240229-v1:0')
...
```
Or initialize the model directly with just the model name:
```
frompydantic_aiimport Agent
frompydantic_ai.models.bedrockimport BedrockConverseModel
model = BedrockConverseModel('anthropic.claude-3-sonnet-20240229-v1:0')
agent = Agent(model)
...
```
## Customizing Bedrock Runtime API
You can customize the Bedrock Runtime API calls by adding additional parameters, such as [guardrail configurations](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) and [performance settings](https://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html). For a complete list of configurable parameters, refer to the documentation for [`BedrockModelSettings`](../../api/models/bedrock/#pydantic_ai.models.bedrock.BedrockModelSettings).
customize_bedrock_model_settings.py```
frompydantic_aiimport Agent
frompydantic_ai.models.bedrockimport BedrockConverseModel, BedrockModelSettings
# Define Bedrock model settings with guardrail and performance configurations
bedrock_model_settings = BedrockModelSettings(
 bedrock_guardrail_config={
 'guardrailIdentifier': 'v1',
 'guardrailVersion': 'v1',
 'trace': 'enabled'
 },
 bedrock_performance_configuration={
 'latency': 'optimized'
 }
)
model = BedrockConverseModel(model_name='us.amazon.nova-pro-v1:0')
agent = Agent(model=model, model_settings=bedrock_model_settings)
```
## `provider` argument
You can provide a custom `BedrockProvider` via the `provider` argument. This is useful when you want to specify credentials directly or use a custom boto3 client:
```
frompydantic_aiimport Agent
frompydantic_ai.models.bedrockimport BedrockConverseModel
frompydantic_ai.providers.bedrockimport BedrockProvider
# Using AWS credentials directly
model = BedrockConverseModel(
 'anthropic.claude-3-sonnet-20240229-v1:0',
 provider=BedrockProvider(
 region_name='us-east-1',
 aws_access_key_id='your-access-key',
 aws_secret_access_key='your-secret-key',
 ),
)
agent = Agent(model)
...
```
You can also pass a pre-configured boto3 client:
```
importboto3
frompydantic_aiimport Agent
frompydantic_ai.models.bedrockimport BedrockConverseModel
frompydantic_ai.providers.bedrockimport BedrockProvider
# Using a pre-configured boto3 client
bedrock_client = boto3.client('bedrock-runtime', region_name='us-east-1')
model = BedrockConverseModel(
 'anthropic.claude-3-sonnet-20240229-v1:0',
 provider=BedrockProvider(bedrock_client=bedrock_client),
)
agent = Agent(model)
...
```