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
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Considerations with worker-based servers](#considerations-with-worker-based-servers)
 * [Using a Rails application](#using-a-rails-application)
 * [Using Puma](#using-puma)
 * [Using Spring](#using-spring)
 * [Using Unicorn](#using-unicorn)
 * [Using Passenger](#using-passenger)
 * [Using httplog](#using-httplog)
 * [Evaluate a context](#evaluate-a-context)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the server-side Ruby SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/ruby-server-sdk/) 
GitHub repository | [ruby-server-sdk](https://github.com/launchdarkly/ruby-server-sdk) 
Sample applications | [Ruby](https://github.com/launchdarkly/hello-ruby) 
[Rails with bootstrapping](https://github.com/launchdarkly/hello-bootstrap-rails) 
Published module | [RubyGems](https://rubygems.org/gems/launchdarkly-server-sdk) 
##### SDK version compatibility
The LaunchDarkly Ruby SDK, version 8.0 and higher, is compatible with Ruby 3.0.
The LaunchDarkly Ruby SDK, version 7.x, is compatible with Ruby 2.7 and higher.
Prior to version 7.0, the LaunchDarkly Ruby SDK also supported Ruby 2.5 and 2.6.
## Get started
After you complete the [Get started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your Ruby application.
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application using your application’s dependency manager. Refer to the [SDK releases page](https://github.com/launchdarkly/ruby-server-sdk/releases) to identify the latest version if you want to depend on a specific version.
If you are using Bundler, you can add `gem "launchdarkly-server-sdk"` to your Gemfile and run `bundle install`. Otherwise, you can install the gem directly:
Shell
```
$
| gem install launchdarkly-server-sdk
---|--- 
```
Next, import the LaunchDarkly client in your application code. This step may not be necessary if you are using a framework that automatically loads all dependencies, as Rails does.
Here’s how:
Ruby
```
1
| require 'ldclient-rb'
---|--- 
```
##### The Ruby SDK uses an SDK key
The Ruby SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you install and import the SDK, create a single, shared instance of `LDClient`. Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
Here’s how:
Ruby
```
1
| client = LaunchDarkly::LDClient.new("sdk-key-123abc")
---|--- 
```
##### Worker-based servers require specific setup
The Ruby SDK uses multiple background threads to operate correctly. If the SDK is deployed to an environment which forks from the main process, the SDK may not operate as expected. To learn more about this problem and how to fix it, refer to [Considerations with worker-based servers](/docs/sdk/server-side/ruby#considerations-with-worker-based-servers), below.
### Considerations with worker-based servers
The LaunchDarkly SDK relies on multiple threads to operate correctly. These threads provide essential functionality, including delivering flag updates and sending event data.
If the main process which instantiated the SDK is itself forked, the SDK will still evaluate flags, but it will be unable to receive changes to those flags in that child process. This is because threads do not survive the forking process in Ruby.
The good news is the LaunchDarkly SDK _is_ compatible with process-forking servers. However, there are a few considerations:
 1. You should initialize a new client before the forking process.
 2. After you have forked the worker process, you can call `postfork` to reinitialize the client. This way, your client will accurately reflect flag changes in the forked thread.
Here’s how:
Ruby SDK v8.11+
```
1
| # 1. Create the client before forking.
---|--- 
2
| client = LaunchDarkly::LDClient.new("sdk-key-123abc")
3
| 
4
| # 2. From the newly forked process, reinitialize the client by calling `postfork`.
5
| # Examples for specific servers are shown below.
6
| client.postfork
```
Any configuration that you provide to the SDK must survive the forking process independently. We recommend that you add any [listeners](/docs/sdk/features/monitoring#ruby) or [hooks](/docs/sdk/features/hooks#ruby) after the `postfork` call, unless you are certain they can survive the forking process.
If you are using the [Relay Proxy](/docs/sdk/relay-proxy), you must use Relay Proxy v8.11 or later to use `postfork`.
To learn more about the specific configuration options available in this SDK, read [`Config`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Config). To learn more about the `postfork` reinitialization, read [`postfork`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#postfork-instance_method).
###### Expand Using a Rails application
#### Using a Rails application
To use LaunchDarkly in a Rails application, initialize the client in `config/initializers/launchdarkly.rb` as shown below. This provides access to the `LDClient` globally in the Rails application and through the Rails console.
If the web server running Rails does not fork workers from this process, no further configuration is required. In all other cases, once the worker process has forked, the `postfork` method of the `LDClient` should be called. To learn more about your specific server, refer to the example server integrations below.
Ruby
```
1
| Rails.configuration.client = LaunchDarkly::LDClient.new("sdk-key-123abc")
---|--- 
```
###### Expand Using Puma
#### Using Puma
If you use the [Puma](https://github.com/puma/puma) web server, we recommend reinitializing the client in `on_worker_boot`:
Ruby Puma initialization with RailsRuby Puma initialization
```
1
| on_worker_boot do
---|--- 
2
| Rails.configuration.client.postfork
3
| end
```
###### Expand Using Spring
#### Using Spring
To use LaunchDarkly with the Rails application preloader [Spring](https://github.com/rails/spring), we recommend using an `after_fork` callback in the `config/spring.rb` file to reinitialize the client:
Ruby Spring initialization with RailsRuby Spring initialization
```
1
| Spring.after_fork do
---|--- 
2
| Rails.configuration.client.postfork
3
| end
```
###### Expand Using Unicorn
#### Using Unicorn
If you use [Unicorn](https://bogomips.org/unicorn/), specify an `after_fork` hook in your unicorn.rb config file:
Ruby Unicorn initialization with RailsRuby Unicorn initialization
```
1
| after_fork do |server,worker|
---|--- 
2
| Rails.configuration.client.postfork
3
| end
```
###### Expand Using Passenger
#### Using Passenger
If you use the [Passenger](https://www.phusionpassenger.com/library/indepth/ruby/spawn_methods/#smart-spawning-hooks) web server, we recommend reinitializing the client in `config.ru`, or from any code called while loading `config.ru`:
Ruby Passenger initialization with RailsRuby Passenger initialization
```
1
| if defined?(PhusionPassenger)
---|--- 
2
| PhusionPassenger.on_event(:starting_worker_process) do |forked|
3
| Rails.configuration.client.postfork
4
| end
5
| end
```
###### Expand Using httplog
#### Using httplog
If you are using the Rails `httplog` library, you should include `launchdarkly.com` in the `url_blacklist_pattern` attribute of `httplog`’s configuration.
By default, the Rails `httplog` library buffers the entire response to a request. However, in the LaunchDarkly SDKs, the streaming request remains open. Therefore, the `httplog` library intercepts the request but never returns the response from LaunchDarkly indicating that initialization is complete. This means the Ruby SDK may not complete initialization and also may not log an error. If your application makes flag evaluations before the SDK initialization is complete, you may receive the message: `[LDClient] Client has not finished initializing; feature store unavailable, returning default value`.
When you include `launchdarkly.com` in the `url_blacklist_pattern` attribute of `httplog`’s configuration, then `httplog` will not intercept the response, and SDK initialization will complete. This lets you use flags as expected.
To learn more, read the [`httplog` Configuration documentation](https://www.rubydoc.info/gems/httplog/1.1.1#configuration).
### Evaluate a context
You can use `client` to check which variation a particular context will receive for a given feature flag. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons). For more information about how contexts are specified, read [Context configuration](/docs/sdk/features/context-config).
Here’s how:
Ruby SDK v7.0+
```
1
| context = LaunchDarkly::LDContext.with_key("user-key-123abc")
---|--- 
2
| show_feature = client.variation("flag-key-123abc", context, false)
3
| if show_feature
4
| # application code to show the feature
5
| else
6
| # the code to run if the feature is off
7
| end
```
## Shut down the client
Shut down the client when your application terminates. This frees the resources the worker threads were using and provides an explicit signal for the Ruby SDK to send the remaining event data back to LaunchDarkly. To learn more, read [Shutting down](/docs/sdk/features/shutdown#ruby).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#ruby)
 * [Big segments](/docs/sdk/features/big-segments#ruby)
 * [Configuration](/docs/sdk/features/config#ruby), including
 * [Application metadata configuration](/docs/sdk/features/app-config#ruby)
 * [Migration configuration](/docs/sdk/features/migration-config#ruby)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#ruby)
 * [Context configuration](/docs/sdk/features/context-config#ruby)
 * [Evaluating flags](/docs/sdk/features/evaluating#ruby)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#ruby)
 * [Flushing events](/docs/sdk/features/flush#ruby)
 * [Getting all flags](/docs/sdk/features/all-flags#ruby)
 * [Hooks](/docs/sdk/features/hooks#ruby)
 * [Identifying and changing contexts](/docs/sdk/features/identify#ruby)
 * [Logging configuration](/docs/sdk/features/logging#ruby)
 * [Migrations](/docs/sdk/features/migrations#ruby)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#ruby)
 * [Offline mode](/docs/sdk/features/offline-mode#ruby)
 * [OpenTelemetry](/docs/sdk/features/opentelemetry-server-side#ruby)
 * [Private attributes](/docs/sdk/features/private-attributes#ruby)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#ruby)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#ruby)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#ruby)
 * [Secure mode](/docs/sdk/features/secure-mode#ruby)
 * [Sending custom events](/docs/sdk/features/events#ruby)
 * [Shutting down](/docs/sdk/features/shutdown#ruby)
 * [Storing data](/docs/sdk/features/storing-data#ruby)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#ruby)
 * [Test data sources](/docs/sdk/features/test-data-sources#ruby)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#ruby)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs