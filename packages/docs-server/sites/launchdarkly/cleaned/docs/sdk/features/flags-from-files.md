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
 * [Create a flag data file](#create-a-flag-data-file)
 * [Configure the client to use a file](#configure-the-client-to-use-a-file)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how to run feature flags from a file when you’re using a server-side SDK.
##### Do not use file-based flag values in production environments
Always configure production environments to receive flag updates from LaunchDarkly. Only use file-based flags in testing and pre-production environments, or in local development. We do not support using flags from files in a production environment.
If you use flags from files in a production environment, you need to propagate flag changes to the file whenever one of your flags is updated in the LaunchDarkly UI.
If you perform automated tests or prototyping, you might want to run application code that uses feature flags without connecting to LaunchDarkly. LaunchDarkly SDKs in offline mode return the fallback value for each flag evaluation. This is not a property of the flag. It is the value that you specified as a fallback in your program code when you evaluated the flag.
However, in some server-side SDKs, you can use files to configure the feature flag state you desire instead of offline mode. Offline mode uses only fallback values.
##### Reading flags from files is only available for server-side SDKs
If you are looking for other ways to test server-side SDKs, you can also use [Test data sources](/docs/sdk/features/test-data-sources).
If you are looking for ways to test client-side SDKs, consider [Test data sources](/docs/sdk/features/test-data-sources) or [Unit testing with Jest](/docs/guides/sdk/unit-tests) instead. To learn more, read [Testing code that uses feature flags](/docs/guides/flags/testing-code).
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.” To learn more, read [Contexts](/docs/home/flags/contexts).
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
## Create a flag data file
Flag data files can be either JSON or YAML.
They contain up to three properties:
 * `flags`: These are feature flag definitions. These can contain all the same kinds of rules and targets that you can define in a LaunchDarkly feature flag, which allows the flag to produce different values for different contexts or users.
 * `flagValues`: These are simplified feature flags that specify only a value, and produce the same value for all contexts or users.
 * `segments`: These are segment definitions. You only use this property if you have feature flags that use segments.
##### Only standard segments are supported in files
Only rule-based segments and smaller list-based segments are supported in the file definition. Synced segments and larger list-based segments, collectively known as big segments, cannot be read from files. To learn more, read [Segments](/docs/home/flags/segments).
##### YAML files have limitations
In some of the SDKs, YAML support requires an additional dependency. YAML is not available in PHP or C++.
The format of the data in `flags` and `segments` is defined by the LaunchDarkly application and is subject to change. Rather than trying to construct these objects yourself, it’s simpler to request existing flags directly from the LaunchDarkly server in JSON format and use this output as the starting point for your file.
Get the flags from `https://sdk.launchdarkly.com/sdk/latest-all`, or `https://sdk.launchdarkly.com/sdk/poll` if using [data saving mode](/docs/sdk/features/data-saving-mode). Pass your SDK key in the `Authorization` header.
For instance, in your terminal, you could use this command:
ConsoleConsole, federalConsole, EU
```
$
| curl -H "Authorization: sdk-key-123abc" https://sdk.launchdarkly.com/sdk/latest-all >flagdata.json
---|--- 
```
The output looks like this, but with many more properties:
JSON output
```
1
| {
---|--- 
2
| "flags": {
3
| "flag-key-1": {
4
| "key": "flag-key-1",
5
| "on": true,
6
| "variations": [ "a", "b" ]
7
| }
8
| },
9
| "segments": {
10
| "segment-key-1": {
11
| "key": "segment-key-1",
12
| "includes": [ "context-key-1" ]
13
| }
14
| }
15
| }
```
Data in this format lets the SDK exactly duplicate all the kinds of flag behavior LaunchDarkly supports. However, in most cases you do not need this level of complexity. You may want to simply set specific flag keys to specific values.
For that, you can use a much simpler format.
Here’s how:
JSONYAML
```
1
| {
---|--- 
2
| "flagValues": {
3
| "my-string-flag-key": "value-1",
4
| "my-boolean-flag-key": true,
5
| "my-integer-flag-key": 3
6
| }
7
| }
```
If you want some flags to have simple values and others to have complex behavior, you can specify both `flags` and `flagValues`. However, it generates an error if you use the same flag key or segment key more than once, either in a single file or across multiple files.
## Configure the client to use a file
You can specify either a single file or multiple files. In all of the SDKs that support this feature except Haskell, PHP, and C++, you can also specify whether the SDK should reload the file data if it detects that you have modified a file. For example, you could verify that your application behaves correctly when a flag changes.
The examples below show how to configure the client to use two data files called `file1.json` and `file2.json`. The client assumes these two files are in the current working directory, but you can specify any relative or absolute file path. It also enables automatic reloading, if supported.
If you do not want your code to connect to LaunchDarkly at all, you must also prevent the SDK from sending analytics events. We’ve included the option to disable events in these examples.
Because there is no connection to LaunchDarkly, you do not have to use a valid SDK key. The SDK key parameter is still required, but you can use any string.
If any of the specified files is missing or invalid, the SDK does not use any of the file data and logs an error message instead.
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/flags-from-files#net-server-side)
 * [C++](/docs/sdk/features/flags-from-files#c-server-side)
 * [Erlang](/docs/sdk/features/flags-from-files#erlang)
 * [Go](/docs/sdk/features/flags-from-files#go)
 * [Haskell](/docs/sdk/features/flags-from-files#haskell)
 * [Java](/docs/sdk/features/flags-from-files#java)
 * [Node.js (server-side)](/docs/sdk/features/flags-from-files#nodejs-server-side)
 * [PHP](/docs/sdk/features/flags-from-files#php)
 * [Python](/docs/sdk/features/flags-from-files#python)
 * [Ruby](/docs/sdk/features/flags-from-files#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To configure the client:
C#
```
1
| using LaunchDarkly.Sdk.Server;
---|--- 
2
| using LaunchDarkly.Sdk.Server.Integrations;
3
| 
4
| var config = Configuration.Builder("sdk key")
5
| .DataSource(
6
| FileData.DataSource()
7
| .FilePaths("file1.json", "file2.json")
8
| .AutoUpdate(true)
9
| )
10
| .Events(Components.NoEvents())
11
| .Build()
12
| 
13
| var client = new LDClient(config);
```
If you want to use YAML instead of JSON, you must [provide a YAML parser](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.FileDataSourceBuilder.html#LaunchDarkly_Sdk_Server_Integrations_FileDataSourceBuilder_Parser_).
To learn more, read [`FileData`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.FileData.html).
### C++ (server-side)
###### Expand C++ code sample
To configure the client:
C++
```
1
| #include <launchdarkly/integrations/file_data.h>
---|--- 
2
| 
3
| const char *filenames[2] = {
4
| "file1.json",
5
| "file2.json"
6
| };
7
| LDConfigSetDataSource(config, LDFileDataInit(2, filenames));
8
| LDConfigSetSendEvents(config, LDBooleanFalse);
9
| 
10
| // Call LDClientInit with config as usual.
```
To learn more, read [`LDFileDataInit`](https://launchdarkly.github.io/c-server-sdk/file__data_8h.html).
### Erlang
###### Expand Erlang code sample
To configure the client:
Erlang
```
1
| ldclient:start_instance("sdk-key-123abc", #{
---|--- 
2
| file_datasource => true,
3
| send_events => false,
4
| file_paths => ["file1.json", "file2.yaml"],
5
| feature_store => ldclient_storage_map,
6
| file_auto_update => true,
7
| file_poll_interval => 1000
8
| })
9
| 
10
| %% In the Erlang SDK automatic reloading uses a polling mechanism.
11
| %% The default interval is 1000ms, but you can control it with
12
| %% the file_poll_interval configuration.
```
### Go
###### Expand Go code sample
Go SDK v6.0
```
1
| import (
---|--- 
2
| "time"
3
| 
4
| ld "github.com/launchdarkly/go-server-sdk/v6"
5
| "github.com/launchdarkly/go-server-sdk/v6/ldcomponents"
6
| "github.com/launchdarkly/go-server-sdk/v6/ldfiledata"
7
| "github.com/launchdarkly/go-server-sdk/v6/ldfilewatch"
8
| )
9
| 
10
| var config ld.Config
11
| config.DataSource = ldfiledata.DataSource().
12
| FilePaths("file1.json", "file2.json").
13
| Reloader(ldfilewatch.WatchFiles)
14
| config.Events = ldcomponents.NoEvents()
15
| 
16
| client, _ := ld.MakeCustomClient("sdk key", config, 5*time.Second)
```
### Haskell
###### Expand Haskell code sample
To configure the client:
Haskell
```
1
| let config = LD.configSetDataSourceFactory (Just $ FileData.dataSourceFactory ["./testData/flags.json"]) $ LD.makeConfig "sdk-key-123abc"
---|--- 
2
| client <- LD.makeClient config
```
### Java
###### Expand Java code sample
To configure the client:
Java
```
1
| import com.launchdarkly.sdk.server.*;
---|--- 
2
| import com.launchdarkly.sdk.server.integrations.*;
3
| 
4
| LDConfig config = new LDConfig.Builder()
5
| .dataSource(
6
| FileData.dataSource()
7
| .filePaths("file1.json", "file2.json")
8
| .autoUpdate(true)
9
| )
10
| .events(Components.noEvents())
11
| .build();
12
| 
13
| LDClient client = new LDClient("sdk key", config);
```
To learn more, read [`FileData`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/FileData.html).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To configure the client:
Node.js SDK v8.x (JavaScript)Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import { init } from '@launchdarkly/node-server-sdk');
---|--- 
2
| import { FileDataSourceFactory } from '@launchdarkly/node-server-sdk/integrations';
3
| 
4
| const fileData = new FileDataSourceFactory({
5
| paths: [ 'file1.json', 'file2.json' ]
6
| });
7
| 
8
| const options = {
9
| updateProcessor: fileData.getFactory()
10
| };
11
| 
12
| const client = init('sdk-key-123abc', options);
```
To learn more, read [`FileDataSourceFactory`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/classes/integrations.FileDataSourceFactory.html).
### PHP
###### Expand PHP code sample
To configure the client:
PHP
```
1
| // Automatic reloading is not supported in PHP, because normally in PHP
---|--- 
2
| // the entire in-memory application state is recreated for each request.
3
| 
4
| $fr = LaunchDarkly\Integrations\Files::featureRequester([
5
| 'file1.json',
6
| 'file2.json'
7
| ]);
8
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", [
9
| 'feature_requester' => $fr,
10
| 'send_events' => false
11
| ]);
```
To learn more, read [`Files`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Integrations-Files.html).
### Python
###### Expand Python code sample
To configure the client:
Python
```
1
| import ldclient
---|--- 
2
| from ldclient.config import Config
3
| from ldclient.integrations import Files
4
| 
5
| data_source_callback = Files.new_data_source(paths=["file1.json", "file2.json"],
6
| auto_update=True)
7
| 
8
| config = Config('sdk-key-123abc', update_processor_class=data_source_callback, send_events=False)
9
| 
10
| ldclient.set_config(config)
11
| client = ldclient.get()
```
In the Python SDK, if you want to use YAML files instead of JSON you must install the `pyyaml` package. Also, automatic reloading uses an inefficient file-polling mechanism. We recommend installing the `watchdog` package.
To learn more, read [`Files`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-integrations.html#ldclient.integrations.Files).
### Ruby
###### Expand Ruby code sample
To configure the client:
Ruby
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| data_source = LaunchDarkly::Integrations::FileData.data_source(
4
| paths: [ "file1.json", "file2.json" ],
5
| auto_update: true
6
| )
7
| 
8
| config = LaunchDarkly::Config.new(
9
| data_source: data_source,
10
| send_events: false
11
| )
12
| 
13
| client = LaunchDarkly::LDClient.new("sdk key", config)
```
In the Ruby SDK, automatic reloading uses an inefficient file-polling mechanism unless you install the `listen` gem.
To learn more, read [`FileData`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Integrations/FileData.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs