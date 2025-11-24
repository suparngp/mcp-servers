`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [About AI metrics](#about-ai-metrics)
 * [AI SDKs](#ai-sdks)
 * [.NET AI](#net-ai)
 * [Go AI](#go-ai)
 * [Node.js (server-side) AI](#nodejs-server-side-ai)
 * [Python AI](#python-ai)
 * [Ruby AI](#ruby-ai)
## Overview
This topic explains how to record metrics from your AI model generation, including duration, generation, satisfaction, and several token-related metrics. For each AI SDK, the function to record metrics takes a completion from your AI model generation, so you can make the call to your AI model provider and record metrics from model generation in one step.
This feature is available for AI SDKs only.
LaunchDarkly’s AI SDKs are designed for use with LaunchDarkly’s AI Configs. They are currently in a pre-1.0 release and under active development.
## About AI metrics
To help you track how your AI model generation is performing, the AI SDKs provide options to record metrics from your model generation. LaunchDarkly displays these metrics on the [AI Config **Monitoring** tab](/docs/home/ai-configs/monitor) in the user interface.
All SDKs include individual `track*` methods to record the following metrics:
 * duration
 * token usage
 * generation success
 * generation error
 * time to first token
 * output satisfaction
Each AI SDK includes a method to retrieve all metrics that have been automatically collected.
Additionally, some AI SDKs include provider-specific `track_[model]_metric` methods, which are available to use if your AI Config uses `completion` mode. These methods take the result of the provider-specific call as a parameter, and record all of the following metrics:
 * duration
 * token usage
 * generation success
 * generation error
The provider-specific methods are a useful shorthand if you’re working with those providers. You can always call the `track*` methods manually to record additional metrics.
Both the individual `track*` methods and the provider-specific `track_[model]_metric` methods are called from the `tracker`. The `tracker` is associated with a specific [customization call](/docs/sdk/features/ai-config), and is returned for AI Configs in either `completion` mode or `agent` mode.
## AI SDKs
This feature is available for all of the AI SDKs:
 * [.NET AI](/docs/sdk/features/ai-metrics#net-ai)
 * [Go AI](/docs/sdk/features/ai-metrics#go-ai)
 * [Node.js (server-side) AI](/docs/sdk/features/ai-metrics#nodejs-server-side-ai)
 * [Python AI](/docs/sdk/features/ai-metrics#python-ai)
 * [Ruby AI](/docs/sdk/features/ai-metrics#ruby-ai)
### .NET AI
###### Expand .NET AI SDK code sample
Use the `TrackRequest` function to record metrics from your AI model generation.
The `tracker` is returned from your call to [customize the AI Config](/docs/sdk/features/ai-config#net-ai), and is specific to that AI Config. Make sure to call `Config` again each time you use the tracker and generate content from your AI model, so that your metrics are correctly associated with the customized AI Config variation.
Here’s how to call any AI model provider and record metrics from your AI model generation:
.NET AI SDK, any model
```
1
| if (tracker.Config.Enabled == true) {
---|--- 
2
| 
3
| var response = tracker.TrackRequest(Task.Run(() =>
4
| {
5
| // Make request to a provider, which automatically tracks metrics in LaunchDarkly.
6
| // When sending the request to a provider, use details from tracker.Config.
7
| // For instance, you can pass tracker.Config.Model and tracker.Config.Messages.
8
| // Optionally, return response metadata, for example to do your own additional logging.
9
| //
10
| // CAUTION: If the call inside of Task.Run() throws an exception,
11
| // the SDK will re-throw that exception
12
| 
13
| return new Response
14
| {
15
| Usage = new Usage { Total = 1, Input = 1, Output = 1 }, /* Token usage data */
16
| Metrics = new Metrics { LatencyMs = 100 } /* Metrics data */
17
| };
18
| }
19
| ));
20
| 
21
| } else {
22
| 
23
| // Application path to take when the tracker.Config is disabled
24
| 
25
| }
```
If you would like to do any additional tracking, besides what LaunchDarkly provides, it is your responsibility to fill in the `Response` object with the data you want to track.
You can also use the SDK’s other `Track*` functions to record these metrics manually. The `TrackRequest` function is expecting a response, so you may need to do this if your application requires streaming.
Each of the `Track*` functions sends data back to LaunchDarkly. The [**Monitoring** tab](/docs/home/ai-configs/monitor) of the AI Config in the LaunchDarkly UI aggregates data from the `Track*` functions from across all variations of the AI Config.
Here’s how to record metrics manually:
Track durationTrack token usageTrack output satisfaction rateTrack generation (success)Track generation (error)Track time to first token
```
1
| /// Track your own start and stop time.
---|--- 
2
| 
3
| /// Set duration to the time (in ms) that your AI model generation takes.
4
| /// The duration may include network latency, depending on how you calculate it.
5
| 
6
| tracker.TrackDuration(response.Metrics.LatencyMs);
```
Make sure to call `Config` again each time you use the tracker and generate content from your AI model.
The SDK automatically flushes these pending analytics events to LaunchDarkly at regular intervals. If you have a short-lived application, you may need to explicitly request that the underlying LaunchDarkly client deliver any pending analytics events to LaunchDarkly, using [`flush()`](/docs/sdk/features/flush) or [`close()`](/docs/sdk/features/shutdown).
Here’s how:
Flush tracking events
```
1
| baseClient.Flush();
---|--- 
```
To learn more, read [`LDAIConfigTracker`](https://launchdarkly.github.io/dotnet-core/pkgs/sdk/server-ai/api/LaunchDarkly.Sdk.Server.Ai.LdAiConfigTracker.html).
### Go AI
###### Expand Go AI SDK code sample
Use the `TrackRequest()` function to record metrics from your AI model generation.
The `tracker` is returned from your call to [customize the AI Config](/docs/sdk/features/ai-config#go-ai), and is specific to that AI Config. Make sure to call `Config()` again each time you use the tracker and generate content from your AI model, so that your metrics are correctly associated with the customized AI Config variation.
Here’s how to call any AI model provider and record metrics from your AI model generation:
Go AI SDK, any model
```
1
| if cfg.Enabled() {
---|--- 
2
| 
3
| response, err := tracker.TrackRequest(func(config *Config) (ProviderResponse, error) {
4
| 
5
| // Make request to a provider, which automatically tracks metrics in LaunchDarkly.
6
| // When sending the request to a provider, use details from config.
7
| // For instance, you can pass a model parameter (config.ModelParam) or messages (config.Messages).
8
| // Optionally, return response metadata, for example to do your own additional logging.
9
| 
10
| return ProviderResponse{
11
| Usage: TokenUsage{
12
| Total: 1, // Token usage data
13
| },
14
| Metrics: Metrics{
15
| Latency: 10 * time.Millisecond, // Metrics data
16
| },
17
| }, nil
18
| })
19
| 
20
| } else {
21
| 
22
| // Application path to take when the cfg.config is disabled
23
| 
24
| }
```
Alternatively, you can use the SDK’s other `Track*` functions to record these metrics manually. The `TrackRequest` function is expecting a response, so you may need to do this if your application requires streaming.
Each of the `Track*` functions sends data back to LaunchDarkly. To review the metrics that have been recorded, use `GetSummary`:
Get automatically recorded metrics
```
1
| summary := tracker.GetSummary();
---|--- 
2
| 
3
| // recorded metrics available in summary.Duration, summary.Feedback,
4
| // summary.Tokens, summary.Success, summary.TrackTimeToFirstToken
```
To learn more, read [`GetSummary`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/ldai#Tracker.GetSummary) and [`MetricSummary`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/ldai#MetricSummary).
The [**Monitoring** tab](/docs/home/ai-configs/monitor) of the AI Config in the LaunchDarkly UI aggregates data from the `Track*` functions from across all variations of the AI Config.
Here’s how to record metrics manually:
Track durationTrack token usageTrack output satisfaction rateTrack generation (success)Track generation (error)Track time to first token
```
1
| // Track your own start and stop time.
---|--- 
2
| 
3
| // Set duration to the time that your AI model generation takes.
4
| // The duration may include network latency, depending on how you calculate it.
5
| 
6
| tracker.TrackDuration(10 * time.Millisecond);
```
The SDK automatically flushes these pending analytics events to LaunchDarkly at regular intervals. If you have a short-lived application, you may need to explicitly request that the underlying LaunchDarkly client deliver any pending analytics events to LaunchDarkly, using [`flush()`](/docs/sdk/features/flush) or [`close()`](/docs/sdk/features/shutdown).
Here’s how:
Flush tracking events
```
1
| client.Flush();
---|--- 
```
To learn more, read [`Tracker`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/ldai#Tracker).
### Node.js (server-side) AI
###### Expand Node.js (server-side) AI SDK code sample
If your AI Config uses `completion` mode, the Node.js (server-side) AI SDK provides several options for making a request to your generative AI provider and recording metrics from your AI model generation. You can use any of the following options:
 * If you are working with OpenAI or Bedrock Converse, use the `trackOpenAIMetrics` or `trackBedrockConverseMetrics` functions, respectively, to record metrics. These functions take the result of your generative operation as a parameter.
 * If you are working with Vercel, use either of the `trackVercelAISDKGenerateTextMetrics` or `trackVercelAISDKStreamTextMetrics` functions to record metrics. These functions take the result of a generative operation from any provider supported by the Vercel AI SDK as a parameter.
 * If you are using a generative AI provider or framework for which the SDK does not provide a convenience function, use the SDK’s other `track*` functions to record metrics manually.
If your AI Config uses `agent` mode, you can access the `instructions` returned from the `agent()` call to send to your AI model. Use the `tracker` returned in this call to record metrics.
In the following examples, the `tracker` is from your call to [customize the AI Config](/docs/sdk/features/ai-config#nodejs-server-side-ai), and is specific to that AI Config. Make sure to call `config` again each time you use the tracker and generate content from your AI model, so that your metrics are correctly associated with the customized AI Config variation.
Here’s how:
Using OpenAI model, completion modeUsing Bedrock model, completion modeAccessing instructions and recording metrics, agent mode
```
1
| const { tracker } = aiConfig;
---|--- 
2
| 
3
| if (aiConfig.enabled) {
4
| 
5
| // Pass in the result of the OpenAI operation.
6
| // When you call the OpenAI operation, use details from aiConfig.
7
| // For instance, you can pass aiConfig.messages
8
| // and aiConfig.model to your specific OpenAI operation.
9
| //
10
| // CAUTION: If the call inside of trackOpenAIMetrics throws an exception,
11
| // the SDK will re-throw that exception
12
| 
13
| const completion = await tracker.trackOpenAIMetrics(async () =>
14
| client.chat.completions.create({
15
| messages: aiConfig.messages || [],
16
| model: aiConfig.model?.name || 'gpt-4',
17
| temperature: (aiConfig.model?.parameters?.temperature as number) ?? 0.5,
18
| maxTokens: (aiConfig.model?.parameters?.maxTokens as number) ?? 4096,
19
| }),
20
| );
21
| 
22
| } else {
23
| 
24
| // Application path to take when the aiConfig is disabled
25
| 
26
| }
```
Here’s how to make a request using the Vercel AI SDK’s [`generateText`](https://ai-sdk.dev/docs/ai-sdk-core/generating-text#generatetext) or [`streamText`](https://ai-sdk.dev/docs/ai-sdk-core/generating-text#streamtext), and record the metrics:
Using Vercel and generateTextUsing Vercel and streamText
```
1
| const { tracker } = aiConfig;
---|--- 
2
| 
3
| // Pass in the result of the Vercel AI SDK's generateText function.
4
| // When you call generateText, use details from the aiConfig,
5
| // mapped to the input format required for the Vercel AI SDK.
6
| //
7
| // CAUTION: The toVercelAISDK function may throw an exception
8
| // if a Vercel AI SDK model cannot be determined.
9
| 
10
| const completion = await tracker.trackVercelAISDKGenerateTextMetrics(
11
| generateText(
12
| aiConfig.toVercelAISDK(vercelProvider, vercelProviderOptions)
13
| )
14
| )
```
To learn more, read [`trackVercelAISDKGenerateTextMetrics`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIConfigTracker.html#trackVercelAISDKGenerateTextMetrics), [`trackVercelAISDKStreamTextMetrics`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIConfigTracker.html#trackVercelAISDKStreamTextMetrics), and [`toVercelAISDK`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIConfig.html#toVercelAISDK).
You can also use the SDK’s other `track*` functions to record these metrics manually. You may need to do this if you are using a model for which the SDK does not provide a convenience `track[Model]Metrics` function, and you are not using the Vercel AI SDK. The `track[Model]Metrics` functions are expecting a response, so you may also need to do this if your application requires streaming.
Each of the `track*` functions sends data back to LaunchDarkly. To review the metrics that have been recorded, use `getSummary`:
Get automatically recorded metrics, completion modeGet automatically recorded metrics, agent mode
```
1
| const summary = aiConfig.tracker.getSummary();
---|--- 
2
| 
3
| // recorded metrics available in summary.durationMs, summary.feedback,
4
| // summary.tokens, summary.success, summary.timeToFirstTokenMs
```
To learn more, read [`getSummary`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIConfigTracker.html#getSummary).
The [**Monitoring** tab](/docs/home/ai-configs/monitor) of the AI Config in the LaunchDarkly UI aggregates data from the `track*` functions from across all variations of the AI Config.
Here’s how to record metrics manually:
Track durationTrack token usageTrack output satisfaction rateTrack generation (success)Track generation (error)Track time to first token
```
1
| // Track your own start and stop time.
---|--- 
2
| 
3
| // Set duration to the time (in ms) that your AI model generation takes.
4
| // The duration may include network latency, depending on how you calculate it.
5
| 
6
| aiConfig.tracker.trackDuration(duration);
```
In `completion` mode, the `tracker` is returned from the `config()` call, so you can access it directly, as in the examples above. Make sure to call `config()` again each time you use the tracker and generate content from your AI model.
In `agent` mode, the `tracker` is part of the `agent` returned from the `agent()` or `agents()` call. If you are working in `agent` mode, replace `tracker` with `agent.tracker` in the examples above.
The SDK automatically flushes these pending analytics events to LaunchDarkly at regular intervals. If you have a short-lived application, you may need to explicitly request that the underlying LaunchDarkly client deliver any pending analytics events to LaunchDarkly, using [`flush()`](/docs/sdk/features/flush) or [`close()`](/docs/sdk/features/shutdown).
Here’s how:
Flush tracking events
```
1
| ldClient.flush();
---|--- 
```
To learn more, read [`LDAIConfigTracker`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIConfigTracker.html).
### Python AI
###### Expand Python AI SDK code sample
If your AI Config uses `completion` mode, use one of the `track_[model]_metrics` functions to record metrics from your AI model generation. The SDK provides separate `track_[model]_metrics` functions for several of the models that you can select when you set up your [AI Config variations](/docs/home/ai-configs/create-variation) in the LaunchDarkly user interface.
If your AI Config uses `agent` mode, you can access the `instructions` returned from the customized AI Config to send to your AI model. Use the `tracker` returned as part of the `agent()` or `agents()` functions to record metrics.
The `tracker` is returned from your call to [customize the AI Config](/docs/sdk/features/ai-config#python-ai), and is specific to that AI Config. Make sure to call `config` again each time you use the tracker and generate content from your AI model, so that your metrics are correctly associated with the customized AI Config variation.
Here’s how:
Using OpenAI model, completion modeUsing Bedrock model, completion modeAccessing instructions and recording metrics, agent mode
```
1
| if config.enabled:
---|--- 
2
| # Pass in the result of the OpenAI operation.
3
| # When calling the OpenAI operation, use details from config.
4
| # For instance, you can pass config.model.name
5
| # and config.messages[0].content to your specific OpenAI operation.
6
| #
7
| # CAUTION: If the call inside of track_openai_metrics throws an exception,
8
| # the SDK will re-throw that exception
9
| 
10
| messages = [] if config.messages is None else config.messages
11
| completion = tracker.track_openai_metrics(
12
| lambda:
13
| openai_client.chat.completions.create(
14
| model=config.model.name,
15
| messages=[message.to_dict() for message in messages],
16
| )
17
| )
18
| else:
19
| # Application path to take when the config is disabled
```
You can also use the SDK’s other `track*` functions to record these metrics manually. You may need to do this if you are using a model for which the SDK does not provide a convenience `track_[model]_metrics` function. The `track_[model]_metrics` functions are expecting a response, so you may also need to do this if your application requires streaming.
Each of the `track*` functions sends data back to LaunchDarkly. To review the metrics that have been recorded, use `get_summary`:
Get automatically recorded metrics, completion modeGet automatically recorded metrics, agent mode
```
1
| tracker.get_summary()
---|--- 
2
| 
3
| # recorded metrics available in tracker.get_summary().duration, .feedback,
4
| # .success, .usage, and .time_to_first_token
```
To learn more, read [`get_summary`](https://launchdarkly-python-sdk-ai.readthedocs.io/en/latest/api-main.html#ldai.tracker.LDAIConfigTracker.get_summary) and [`LDAIMetricSummary`](https://launchdarkly-python-sdk-ai.readthedocs.io/en/latest/api-main.html#ldai.tracker.LDAIMetricSummary).
The [**Monitoring** tab](/docs/home/ai-configs/monitor) of the AI Config in the LaunchDarkly UI aggregates data from the `track*` functions from across all variations of the AI Config.
Here’s how to record metrics manually:
Track durationTrack token usageTrack output satisfaction rateTrack generation (success)Track generation (error)Track time to first token
```
1
| # Track your own start and stop time.
---|--- 
2
| 
3
| # Set duration to the time (in ms) that your AI model generation takes.
4
| # The duration may include network latency, depending on how you calculate it.
5
| 
6
| tracker.track_duration(duration)
```
In `completion` mode, the `tracker` is returned from the `config()` call, so you can access it directly, as in the examples above. Make sure to call `config()` again each time you use the tracker and generate content from your AI model.
In `agent` mode, the `tracker` is part of the `agent` returned from the `agent()` or `agents()` call. If you are working in `agent` mode, replace `tracker` with `agent.tracker` in the examples above.
The SDK automatically flushes these pending analytics events to LaunchDarkly at regular intervals. If you have a short-lived application, you may need to explicitly request that the underlying LaunchDarkly client deliver any pending analytics events to LaunchDarkly, using [`flush()`](/docs/sdk/features/flush) or [`close()`](/docs/sdk/features/shutdown).
Here’s how:
Flush tracking events
```
1
| ldclient.get().flush()
---|--- 
```
To learn more, read [`LDAIConfigTracker`](https://launchdarkly-python-sdk-ai.readthedocs.io/en/latest/api-main.html#ldai.tracker.LDAIConfigTracker).
### Ruby AI
###### Expand Ruby AI SDK code sample
Use one of the `track_[model]_metrics` functions to record metrics from your AI model generation. The SDK provides separate `track_[model]_metrics` functions for several of the models that you can select when you set up your [AI Config variations](/docs/home/ai-configs/create-variation) in the LaunchDarkly user interface.
The `tracker` is returned as part of your call to [customize the AI Config](/docs/sdk/features/ai-config#ruby-ai), and is specific to that AI Config. Make sure to call `config` again each time you use the tracker and generate content from your AI model, so that your metrics are correctly associated with the customized AI Config variation.
Here’s how to use a provider-specific function to call OpenAI or Bedrock providers and record metrics from your AI model generation:
Using OpenAI modelUsing Bedrock modelBedrock helper function
```
1
| if ai_config.enabled
---|--- 
2
| # Pass in the result of the OpenAI operation.
3
| # When calling the OpenAI operation, use details from ai_config.
4
| # For instance, you can pass ai_config.model.name
5
| # and ai_config.messages to your specific OpenAI operation.
6
| #
7
| # CAUTION: If the call inside of track_openai_metrics throws an exception,
8
| # the SDK will re-throw that exception
9
| 
10
| completion = ai_config.tracker.track_openai_metrics(
11
| openai_client.chat.completions.create(
12
| model: ai_config.model.name,
13
| messages: ai_config.messages.map(&:to_h)
14
| )
15
| )
16
| else
17
| # Application path to take when the ai_config is disabled
18
| end
```
You can also use the SDK’s other `track*` functions to record these metrics manually. You may need to do this if you are using a model for which the SDK does not provide a convenience `track_[model]_metrics` function. The `track_[model]_metrics` functions are expecting a response, so you may also need to do this if your application requires streaming.
Each of the `track*` functions sends data back to LaunchDarkly. To review the metrics that have been recorded, use the `summary` property in the `tracker`:
Get automatically recorded metrics
```
1
| ai_config.tracker.summary
---|--- 
2
| 
3
| # recorded metrics available in tracker.summary include: duration, feedback,
4
| # success, usage, and time_to_first_token
```
To learn more, read [`summary`](https://launchdarkly.github.io/ruby-server-sdk-ai/LaunchDarkly/Server/AI/AIConfigTracker.html#summary-instance_method) and [`MetricSummary`](https://launchdarkly.github.io/ruby-server-sdk-ai/LaunchDarkly/Server/AI/MetricSummary.html).
The [**Monitoring** tab](/docs/home/ai-configs/monitor) of the AI Config in the LaunchDarkly UI aggregates data from the `track*` functions from across all variations of the AI Config.
Here’s how to record metrics manually:
Track durationTrack token usageTrack output satisfaction rateTrack generation (success)Track generation (error)Track time to first token
```
1
| # Track your own start and stop time.
---|--- 
2
| 
3
| # Set duration to the time (in ms) that your AI model generation takes.
4
| # The duration may include network latency, depending on how you calculate it.
5
| 
6
| ai_config.tracker.track_duration(duration)
```
Make sure to call `config` again each time you use the tracker and generate content from your AI model.
The SDK automatically flushes these pending analytics events to LaunchDarkly at regular intervals. If you have a short-lived application, you may need to explicitly request that the underlying LaunchDarkly client deliver any pending analytics events to LaunchDarkly, using [`flush`](/docs/sdk/features/flush) or [`close`](/docs/sdk/features/shutdown).
Here’s how:
Flush tracking events
```
1
| ld_client.flush()
---|--- 
```
To learn more, read [`ConfigTracker`](https://launchdarkly.github.io/ruby-server-sdk-ai/LaunchDarkly/Server/AI/AIConfigTracker.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs