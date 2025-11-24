`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Flagship Blog](/docs/blog)
 * [5 takeaways from my first PyCon JP conference](/docs/blog/pyconjp-25-takeaways)
 * [Dungeons & Downtimes: XP gained from our adventure](/docs/blog/dungeons-downtimes)
 * [Reverse Proxy for custom domains](/docs/blog/reverse-proxy-custom-domains)
 * [Adventures in dogfooding: Guarded Releases](/docs/blog/dogfooding-guardian-edition)
 * [A quick tool for npm package scanning](/docs/blog/npm-breach-supply-chain-security)
 * [My DEF CON 33 experience](/docs/blog/defcon-33-takeaways)
 * [Make every launch a big deal](/docs/blog/celebrating-every-launch)
 * [A tale of three rate limiters](/docs/blog/rate-limiters)
 * [My good friend Claude](/docs/blog/my-good-friend-claude)
 * [My approach to React app architecture in 2025](/docs/blog/react-architecture-2025)
 * [Fun with JS streams](/docs/blog/fun-js-streams)
 * [Moonshots XXII: Hack to the Future recap](/docs/blog/2025-hackathon-recap)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
_Published August 28th, 2025_
![Portrait of Chris Tarquini.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/fe8f1d7372a3c3a557a6f57bfb47003f85a4c78d180d66d2e8faa385f6cafaa1/assets/images/authors/chris-tarquini.png)
by Chris Tarquini, LaunchDarkly Staff Strategic Solutions Architect
In 2021, modern browsers and Node.js (v17+) adopted the [WHATWG Streams standard](https://streams.spec.whatwg.org/ "https://streams.spec.whatwg.org/"), unlocking a powerful new way to handle data. Streams enable structured, incremental processing of data. Similar to Unix pipelines but built directly into the web platform and runtime. Streams come with a few key benefits:
 * **Pipelines** – Compose data transformations by chaining streams, just like command-line tools.
 * **Backpressure-aware Queues** – Automatically throttle producers and consumers to avoid overloading memory or CPU.
 * **Async Iteration** – Treat streams like async iterables, making integration with modern for await…of syntax seamless and intuitive.
Streams are usually thought of in the context of I/O. Here’s how an SSE client might be implemented with streams:
```
1
| const resp = await fetch("https://stream.example.com/sse")
---|--- 
2
| const sseEventStream = resp.body.pipeThrough(new SSEParserStream())
3
| // instead of sseEventStream.getReader().read(), we can use async iteration
4
| for await (const {event, data} of sseEventStream) {
5
| // do something with each event
6
| }
```
Another use-case is to turn events into streams. I like this pattern because:
 * You can enforce FIFO ordering ensuring each event is handled to completion before handling the next event.
 * For async await, syntax looks nicer to me.
 * It’s simple to compose multiple streams to add features like batching, deduplication, and logging in a re-usable and non-intrusive way.
 * Easy to implement queuing and buffering strategies without messing with your business logic.
Here’s a simple example of creating a flag update stream using the [LaunchDarkly Node.js server SDK](/docs/sdk/server-side/node-js):
```
1
| export class FlagUpdateStream extends ReadableStream<string> {
---|--- 
2
| constructor(ldClient: LDClient) {
3
| super({
4
| start: (controller: ReadableStreamDefaultController<string>) => {
5
| function onUpdate({key}: {key: string}) {
6
| controller.enqueue(key)
7
| } 
8
| ldClient.on('failed', (error) => {
9
| controller.error(error)
10
| })
11
| ldClient.on('update', onUpdate);
12
| }
13
| });
14
| }
15
| }
```
Usage:
```
1
| const flagUpdateStream = new FlagUpdateStream(ldClient)
---|--- 
2
| for await(const flagKey of updateStream) {
3
| // do stuff
4
| }
```
This may seem somewhat trivial, and on the surface it is. But let’s take a look at how this can look with a full pipeline:
```
1
| // stream of flag updates
---|--- 
2
| const flagUpdateStream = new FlagUpdateStream(ldClient)
3
| // forwards only chunks that match the given filter function
4
| const releaseFlagFilter = new FilterStream<string>(v => v.startsWith('release-'))
5
| // input = flag keys, output = results of evaluating that flag with the given context
6
| const evaluatorStream = new FlagEvaluatorStream(ldClient, context)
7
| // input = single items, output = arrays of items
8
| const batchStream = new BatchStream({capacity: 10, flushIntervalSecs: 5})
9
| // writes to a given SNS topic, sends arrays as batch
10
| const snsStream = new SNSStream(snsClient, "arn:bla:bla:bla")
11
| // writes JSON-ified input to stdout
12
| const consoleStream = new ConsoleStream()
13
| 
14
| // build the pipeline
15
| const evaluatorPipeline = flagUpdateStream
16
| .pipeThrough(releaseFlagFilter)
17
| .pipeThrough(evaluatorStream)
18
| 
19
| // tee lets us duplicate a stream, let's use that to log to console and to sns
20
| const [log, output] = evaluatorPipeline.tee()
21
| const logPipeline = log.pipeTo(consoleStream)
22
| // SNS messages will be batched
23
| const snsPipeline = output.pipeThrough(batchStream).pipeTo(snsStream)
24
| // wait for the pipelines to end
25
| await Promise.all([logPipeline, snsPipeline])
```
Streams give us nice lego blocks that we can use to compose different solutions. Here we can easily switch out our batching, logging and destination strategies.
This general pattern was used to create a proof of concept that subscribes to updates and evaluates flags for all of their site contexts and then publishes the results to [Amazon SNS](https://aws.amazon.com/pm/sns/). Workers for their various applications will consume these queues and write the flags to their respective databases.
Now, a developer could leverage LaunchDarkly’s attribute based targeting and have the results be materialized in the database their application is already using for flags. There are obviously some caveats here, however, this system allows them to start using LaunchDarkly with no code changes and allows them to access flags from stored procedures critical to their business.
Streams make this implementation highly adaptable, letting us swap out different parts of the pipeline with ease. If you’re familiar with [RxJS](https://rxjs.dev/), these patterns may seem very familiar to you!
Anyway that’s all I have on streams. I like ‘em. Especially when combined with async iteration. Also, pro tip: you can turn any generator into a stream like this:
```
1
| // async not necessary here but you can make it async or sync
---|--- 
2
| async function* series(start, stop) {
3
| for(let i = start; i < stop; i++) yield i
4
| }
5
| const stream = ReadableStream.from(series(0,10))
```
`(ReadableStream.from(iteratable)` is an experimental API so your mileage may vary).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs