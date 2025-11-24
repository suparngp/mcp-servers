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
 * [Configuring the Relay Proxy](#configuring-the-relay-proxy)
 * [Using a configuration file](#using-a-configuration-file)
 * [Using environment variables](#using-environment-variables)
 * [Deploying the Relay Proxy](#deploying-the-relay-proxy)
 * [Starting the Relay Proxy from a Docker image](#starting-the-relay-proxy-from-a-docker-image)
 * [Using Helm to run the Relay Proxy in Kubernetes](#using-helm-to-run-the-relay-proxy-in-kubernetes)
 * [Downloading a Relay Proxy standalone release binary](#downloading-a-relay-proxy-standalone-release-binary)
 * [Building within an existing Go app](#building-within-an-existing-go-app)
## Overview
This topic explains how to configure and deploy the Relay Proxy.
## Configuring the Relay Proxy
After you have downloaded or built the Relay Proxy, you need to set its configuration options.
You can set these options by either:
 * using a configuration file, or
 * using environment variables.
If you are using Relay Proxy Enterprise, you can also use automatic configuration. To learn more, read [Automatic configuration](/docs/sdk/relay-proxy/automatic-configuration).
##### Relay Proxy metrics only appear when an SDK is connected
Some of the Relay Proxy configuration options enable you to export metrics, including the number of connections and requests. The Relay Proxy only exports metrics when an SDK is connected to it. To learn more, read the Relay Proxy GitHub repository’s [Metrics integrations](https://github.com/launchdarkly/ld-relay/blob/v8/docs/metrics.md).
Expand each section below to learn how to configure the Relay Proxy.
###### Expand Using a configuration file
### Using a configuration file
It’s common to use a configuration file when you deploy the Relay Proxy from a release binary or build it from source.
You can also use a configuration file when you run the Relay Proxy from a Docker container, but it is less convenient to do because you must place the configuration file at `/ldr/ld-relay.conf`.
To learn more about the supported configuration options, read the Relay Proxy GitHub repository’s [Configuration docs](https://github.com/launchdarkly/ld-relay/blob/v8/docs/configuration.md). To learn about Relay Proxy logging level options, read [Logging](https://github.com/launchdarkly/ld-relay/blob/v8/docs/logging.md).
To use a configuration file:
 1. Create a new file:
Basic exampleMultiple environments
```
 # A single environment which only proxies server-side SDKs 
--- 
 [environment "Production"] 
 sdkKey = "sdk-key-123abc" 
```
 2. Run the Relay Proxy binary while passing an argument to identify your configuration file’s location. The following example assumes that the configuration file is in your current directory and named `ld-relay.conf`, and that the `ld-relay` binary is in `$GOPATH/bin`.
Run the following code:
Run the binary
```
$
| $GOPATH/bin/ld-relay --config ./ld-relay.conf
---|--- 
```
If you’re using Relay Proxy Enterprise and want to enable automatic configuration or use it in offline mode, read [Enable automatic configuration](/docs/sdk/relay-proxy/automatic-configuration#enable-automatic-configuration) or [Enable offline mode](/docs/sdk/relay-proxy/offline#enable-offline-mode).
###### Expand Using environment variables
### Using environment variables
The other way to configure your Relay Proxy is with environment variables. This method is available regardless of how you deploy the Relay Proxy, although it is most commonly used with Docker containers.
To learn more about supported environment variables, read the Relay Proxy GitHub repository’s [Configuration file format and environment variables](https://github.com/launchdarkly/ld-relay/blob/v8/docs/configuration.md#configuration-file-format-and-environment-variables). To learn about Relay Proxy logging level options, read [Logging](https://github.com/launchdarkly/ld-relay/blob/v8/docs/logging.md).
To use environment variables:
 1. Confirm that all of your Relay Proxy configuration values are specified with the appropriate environment variables.
For example, to specify the SDK key for an environment named `MyEnvName`:
Specify the SDK key for an environment
```
$
| export LD_ENV_MyEnvName=<sdk-key-123abc>
---|--- 
```
 2. Run the Relay Proxy binary while passing the `--from-env` argument. The following command assumes that the `ld-relay` binary is in `$GOPATH/bin`.
Run the binary
```
$
| $GOPATH/bin/ld-relay --from-env
---|--- 
```
If you’re using Relay Proxy Enterprise and want to enable automatic configuration or use it in offline mode, read [Enable automatic configuration](/docs/sdk/relay-proxy/automatic-configuration#enable-automatic-configuration) or [Enable offline mode](/docs/sdk/relay-proxy/offline#enable-offline-mode).
## Deploying the Relay Proxy
You can deploy the Relay Proxy in one of four ways. In order from most common to least common, the methods are:
 * starting the Relay Proxy from a Docker image,
 * using Helm to run the Relay Proxy in Kubernetes,
 * downloading a Relay Proxy standalone release binary, or
 * building within an existing Go app.
Expand the sections below to learn how to use each method.
###### Expand Starting the Relay Proxy from a Docker image
### Starting the Relay Proxy from a Docker image
The Relay Proxy’s Docker image is available in two flavors: [“Distroless”](https://github.com/GoogleContainerTools/distroless), which is based on Debian, or [Alpine](https://alpinelinux.org/).
We recommend “Distroless” because it contains fewer 3rd party dependencies which may require patching.
Both flavors are available on [Docker Hub](https://hub.docker.com/r/launchdarkly/ld-relay). For more information, read [Using with Docker](https://github.com/launchdarkly/ld-relay/blob/v8/docs/docker.md).
##### Pin the Docker image to the most recent major version
We strongly recommend pinning the Docker image to the most recent major version. In the examples below, the `v8-` pattern floats the minor and patch versions of the Relay Proxy. You may also pin to a specific version, such as `launchdarkly/ld-relay:8.7.0-static-debian12-nonroot`.
We recommend against using the unpinned “latest” version from Docker in your production environments.
To deploy the Relay Proxy with Docker:
 1. Use `docker pull` to pull the latest Relay Proxy Docker image:
Distroless imageDistroless image, debug variantAlpine image
```
$
| docker pull launchdarkly/ld-relay:v8-static-debian12-nonroot
---|--- 
```
The `v8-` pattern floats the minor and patch versions of the Relay Proxy. You may also pin to a specific version, such as `launchdarkly/ld-relay:8.7.0-static-debian12-nonroot`.
 1. Use `docker run` to run the Relay Proxy from your Docker container while specifying your configuration details.
The simplest way to specify the configuration is with environment variables, using the `-e` option of `docker run`. An example configuration that uses environment variables appears below.
For examples and a full list of allowable variables, read the Relay Proxy GitHub repository’s [Using with Docker](https://github.com/launchdarkly/ld-relay/blob/v8/docs/docker.md) and [Configuration](https://github.com/launchdarkly/ld-relay/blob/v8/docs/configuration.md).
In the following example, the Relay Proxy is configured to have two LaunchDarkly environments.
For the first environment, the SDK key is `staging-sdk-key-123abc`, and the environment name, for the purposes of logging, is `Staging`. For the second environment, the SDK key is `prod-sdk-key-456def`, and the environment name is `Production`.
In this example, the Relay Proxy is configured to listen on port 8030, which is its default port.
The example configuration follows:
Run with a Docker container
```
$
| docker run --rm --name ld-relay \
---|--- 
>
| -e LD_ENV_Staging="staging-sdk-key-123abc" \
>
| -e LD_ENV_Production="prod-sdk-key-456def" \
>
| -p 8030:8030 \
>
| -e PORT=8030 \
>
| launchdarkly/ld-relay:v8-static-debian12-nonroot
```
###### Expand Using Helm to run the Relay Proxy in Kubernetes
### Using Helm to run the Relay Proxy in Kubernetes
We maintain a [Helm chart](https://github.com/launchdarkly/ld-relay-helm) to ease Kubernetes-based Relay Proxy deployments.
To deploy the Relay Proxy using this Helm chart:
 1. Add the LaunchDarkly Relay Proxy Helm chart repository.
Add chart repository
```
$
| helm repo add launchdarkly-ld-relay https://launchdarkly.github.io/ld-relay-helm
---|--- 
```
 2. Use `helm install` to install the chart archive and deploy the proxy into your cluster.
The fastest way to configure installation is through Helm’s `--set` flag. However, we recommend using files with the `--values` flag as this enables easier long term maintenance. In the examples below, replace `MyEnvironment` with the name of your Relay Proxy environment and `sdk-key` with your SDK key.
Here’s how:
Using command line flagsUsing values file
```
$
| helm install relay --set relay.environment.LD_ENV_environment-key-123abc=sdk-key123bc launchdarkly-ld-relay/ld-relay
---|--- 
```
You can find examples and full documentation on all configuration options in the [GitHub repository](https://github.com/launchdarkly/ld-relay-helm).
###### Expand Downloading a Relay Proxy standalone release binary
### Downloading a Relay Proxy standalone release binary
You can download one of the Relay Proxy’s most recent release binaries from our GitHub repository. This repository has all versions of the Relay Proxy releases with details about what each release improves or fixes. We recommend using the most recent release.
To learn more about Relay Proxy release binaries, [visit the GitHub repository](https://github.com/launchdarkly/ld-relay/releases).
If you want to download a release binary from the GitHub repository, you should know the following things:
 * **tar.gz** files are executables. You can use these to run the Relay Proxy directly.
 * **.deb** and **.rpm** files are intended for use with a package manager.
When executing the binary, use either a [configuration file](/docs/sdk/relay-proxy/deploying#using-a-configuration-file) or [environment variables](/docs/sdk/relay-proxy/deploying#using-environment-variables) to set up your desired configuration.
For an example of running the binary with Windows, read the Relay Proxy GitHub repository’s [Building and running in Windows](https://github.com/launchdarkly/ld-relay/blob/v8/docs/windows.md).
###### Expand Building within an existing Go app
### Building within an existing Go app
To build the Relay Proxy from source:
 1. Install Go 1.21 or higher. To install Go, read [Go’s documentation](https://golang.org/doc/install).
 2. Check out the source code from the default branch of the repository: <https://github.com/launchdarkly/ld-relay>
 3. In the directory where you checked out the code, run `go build .`
The executable binary `ld-relay` appears in the directory.
There is also a shortcut command that can replace the longer procedure above. This command downloads the code and builds it in a single step. After you enter the command, the executable binary `ld-relay` appears in `$GOPATH/bin`. You can move it to any other location.
Download and build the Relay Proxy
```
$
| go install github.com/launchdarkly/ld-relay/v8@latest
---|--- 
```
When executing the binary, use either a [configuration file](/docs/sdk/relay-proxy/deploying#using-a-configuration-file) or [environment variables](/docs/sdk/relay-proxy/deploying#using-environment-variables) to set up your desired configuration.
To learn more, read the Relay Proxy GitHub repository’s [Building within an application](https://github.com/launchdarkly/ld-relay/blob/v8/docs/in-app.md).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs