`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Tutorials](/docs/tutorials)
 * [When to use prompt-based vs agent mode in LaunchDarkly](/docs/tutorials/agent-vs-completion)
 * [When to Add Online Evals to Your AI Configs](/docs/tutorials/when-to-add-online-evals)
 * [Detecting User Frustration: Understanding Rage Clicks and Session Replay](/docs/tutorials/detecting-user-frustration-session-replay)
 * [AI Config CI/CD Pipeline: Automated Quality Gates and Safe Deployment](/docs/tutorials/aic-cicd)
 * [Resilient architecture patterns for LaunchDarkly's SDKs](/docs/tutorials/sdk-resilience-best-practices)
 * [Proving ROI with Data-Driven AI Agent Experiments](/docs/tutorials/ai-experiments-roi)
 * [A Deeper Look at LaunchDarkly Architecture: More than Feature Flags](/docs/tutorials/ld-arch-deep-dive)
 * [Add Observability to Your React Native App in 5 minutes](/docs/tutorials/react-native-observability)
 * [Smart AI Agent Targeting with MCP Tools](/docs/tutorials/multi-agent-mcp-targeting)
 * [Build a LangGraph Multi-Agent System in 20 Minutes with LaunchDarkly AI Configs](/docs/tutorials/agents-langgraph)
 * [Snowflake Cortex Completion API + LaunchDarkly SDK Integration](/docs/tutorials/snowflake-tutorial)
 * [Using AI Configs to review database changes](/docs/tutorials/ai-configs-review-database-changes)
 * [How to implement WebSockets and kill switches in a Python application](/docs/tutorials/python-flask-websockets-kill-switch-flags)
 * [4 hacks to turbocharge your Cursor productivity](/docs/tutorials/cursor-tips-and-tricks)
 * [Create a feature flag in your IDE in 5 minutes with LaunchDarkly's MCP server](/docs/tutorials/mcp-server-feature-flags)
 * [DeepSeek vs Qwen: local model showdown featuring LaunchDarkly AI Configs](/docs/tutorials/ollama-javascript)
 * [Video tutorials](/docs/tutorials/videos)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Setting up your environment](#setting-up-your-environment)
 * [Starting up the PlusOne app](#starting-up-the-plusone-app)
 * [Logs](#logs)
 * [Traces](#traces)
 * [Errors](#errors)
 * [Conclusion](#conclusion)
 * [Next Steps](#next-steps)
_Published September 25, 2025_
![portrait of Alexis Roberson.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ee16585472bee25f23f4782816ccbbd25044b846b5a0b2596cf1bfaac2f47664/assets/images/authors/alexis-roberson.png)
by Alexis Roberson
## Overview
In modern application development, feature flags are the guardrails that keep experiments controlled and rollbacks safe when conditions shift. If feature flags act as the guardrails, observability provides the visibility: the headlights (traces), mirrors (logs), and dashboard instruments (metrics) that reveal what’s happening in the environment and how well a feature is performing. Together, feature flags and observability unlock powerful insights by correlating code changes with real-time system behavior. This combination reduces time-to-diagnosis and builds greater confidence when rolling out new features.
In this post, we’ll walk through just how to add observability to a React Native application using LaunchDarkly’s observability SDK. To demonstrate the process, we’ll build on the PlusOne app, a simple counter app that includes increment (+1), reset, and error-triggering buttons. This lightweight demo provides a clean foundation to showcase how logs, traces, and errors can seamlessly flow into LaunchDarkly for monitoring and debugging.
![Screenshot final result of PlusOne app.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c7807d5d592a7c3527f5eae0f8fe70f9ad87eb25c26b3c500a6992a3ad8efd84/assets/images/tutorials/ollsdk-react-native/plusone.png)
Screenshot final result of PlusOne app.
## Prerequisites
 * LaunchDarkly account. [Sign up for a free one here](https://app.launchdarkly.com/signup).
 * Visual Studio or another code editor of choice.
All code from this tutorial can be found [on GitHub](https://github.com/arober39/PlusOne).
## Setting up your environment
Before running a React Native app, make sure your development environment is set up correctly. [You can find the full setup instructions for both Android and iOS here](https://reactnative.dev/docs/set-up-your-environment?platform=android#cocoapods).
In this tutorial, we’ll be running iOS, but keep in mind Expo Orbit, the platform we’ll be using to run our iOS simulator, requires both Xcode and Android Studio to be installed.
After going through the instructions you should have the following installed:
 * Node JS (preferably via [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/))
 * Watchman for file monitoring
 * JDK via zulu package manager.
 * [Android Studio](https://developer.android.com/studio/index.html). Don’t forget to set your Android_Home environment variables.
 * [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) for the iOS simulator.
 * [Cocoapods](https://cocoapods.org/) for iOS dependency management.
 * [Expo orbit](https://expo.dev/orbit) for running expo apps Android or iOS.
If you’re using Android, don’t forget to add your environment variables to bash or zsh profile.
Android vars
```
$
| export ANDROID_HOME=$HOME/Library/Android/sdk
---|--- 
>
| export PATH=$PATH:$ANDROID_HOME/emulator
>
| export PATH=$PATH:$ANDROID_HOME/platform-tools
```
## Starting up the PlusOne app
To get started, let’s clone the [repo](https://github.com/arober39/PlusOne) for the PlusOne app and run `npm install` to ensure the proper dependencies are present in our node_modules file.
Cloning repo
```
$
| git clone https://github.com/arober39/PlusOne
---|--- 
```
Install using npm
```
$
| cd PlusOne
---|--- 
>
| npm install
```
We’ll also need to run both the prebuild command to generate the ios file and the expo run command to run the iOS simulator.
Prebuild for iOS
```
$
| npx expo prebuild
---|--- 
```
Run expo app
```
$
| npm expo run:ios
---|--- 
```
Now we can view the iOS app in the iPhone simulator using npm.
Install using npm
```
$
| # iOS
---|--- 
>
| npm run ios
>
| 
>
| # Android
>
| npm run android
```
The app should look something like this:
![Screenshot final result of PlusOne app](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c7807d5d592a7c3527f5eae0f8fe70f9ad87eb25c26b3c500a6992a3ad8efd84/assets/images/tutorials/ollsdk-react-native/plusone.png)
Screenshot final result of PlusOne app.
Feel free to interact with the app to ensure all is working as expected.
As you can see in the code, we have three buttons: one that adds one to the displayed number, one to bring the count back to zero and an intentional Error button to test error monitoring within the LaunchDarkly UI.
```
1
| // app/index.tsx
---|--- 
2
| 
3
| import { useState } from "react";
4
| import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
5
| 
6
| export default function Index() {
7
| const [count, setCount] = useState(0);
8
| 
9
| const handleReset = () => setCount(0);
10
| const handleIncrement = () => setCount((prev) => prev + 1);
11
| 
12
| const triggerRecordedError = () => {
13
| try {
14
| throw new Error("Simulated controlled error from Plus One app")
15
| } catch (e) {
16
| alert("You intentionally threw an error")
17
| }
18
| };
19
| 
20
| return (
21
| <View style={styles.container}>
22
| <View style={styles.header}>
23
| <Text style={styles.headerText}>Plus One</Text>
24
| </View>
25
| <View style={styles.counterWrapper}>
26
| <Text style={styles.counterText}>{count}</Text>
27
| </View>
28
| <View style={styles.actionsRow}>
29
| <ButtonBox label="Reset" onPress={handleReset} />
30
| <ButtonBox label="+1" onPress={handleIncrement} />
31
| <ButtonBox label="Error" onPress={triggerRecordedError} />
32
| </View>
33
| </View>
34
| );
35
| }
36
| 
37
| type ButtonBoxProps = {
38
| label: string;
39
| onPress: () => void;
40
| };
41
| 
42
| function ButtonBox({ label, onPress }: ButtonBoxProps) {
43
| return (
44
| <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
45
| <Text style={styles.buttonText}>{label}</Text>
46
| </TouchableOpacity>
47
| );
48
| }
49
| 
50
| 
51
| /* The rest of the application code */ 
```
Now that we have verified a working app, we can add observability support by downloading the observability React Native [SDK](https://launchdarkly.com/docs/sdk/observability/react-native).
Install using npm
```
$
| npm install @launchdarkly/react-native-client-sdk
---|--- 
>
| npm install @launchdarkly/observability-react-native
```
Next, you’ll need to initialize the React Native LD client in the _layout file. Replace the in the layout file by pasting the following code.
```
1
| // app/_layout.tsx
---|--- 
2
| 
3
| import { Observability } from '@launchdarkly/observability-react-native';
4
| import { AutoEnvAttributes, LDOptions, LDProvider, ReactNativeLDClient } from '@launchdarkly/react-native-client-sdk';
5
| import { Stack } from 'expo-router';
6
| import { useEffect, useState } from 'react';
7
| 
8
| const options: LDOptions = {
9
| applicationInfo: {
10
| id: 'Plus-One',
11
| name: 'Sample Application',
12
| version: '1.0.0',
13
| versionName: 'v1',
14
| },
15
| debug: true,
16
| plugins: [
17
| new Observability({
18
| serviceName: 'my-react-native-app',
19
| serviceVersion: '1.0.0',
20
| })
21
| ],
22
| };
23
| 
24
| const userContext = { kind: 'user', key: 'test-hello' };
25
| 
26
| export default function RootLayout() {
27
| const [client, setClient] = useState<ReactNativeLDClient | null>(null);
28
| useEffect(() => {
29
| // Initialize client
30
| const featureClient = new ReactNativeLDClient(
31
| 'mob-abc123',
32
| AutoEnvAttributes.Enabled,
33
| options,
34
| );
35
| 
36
| featureClient.identify(userContext).catch((e: any) => console.log(e));
37
| 
38
| setClient(featureClient);
39
| 
40
| // Cleanup function that runs when component unmounts
41
| return () => {
42
| featureClient.close();
43
| };
44
| }, []);
45
| 
46
| if (!client) {
47
| return null;
48
| }
49
| return (
50
| <LDProvider client={client}>
51
| <Stack />
52
| </LDProvider>
53
| );
54
| }
```
First, we’re importing the Observability SDK as well as a few LD libraries to add options and attributes to the LD client.- Initialized the SDK and [plugin options](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/ReactNativeOptions.html).
 * Defined the user [context](https://launchdarkly.com/docs/home/flags/contexts).
 * Lastly, you initialized the client.
Now that you have defined your LD React Native client, you can implement different observability methods within your application logic.
We can do this by importing the LDObserve library in the app/_layout.tsx file.
```
1
| import { LDObserve } from '@launchdarkly/observability-react-native';
---|--- 
```
Then, add the recordError() method within the triggerRecordedError function inside the app/_layout.tsx file. This will allow for error messages to be sent back to the LD UI.
```
1
| const triggerRecordedError = () => {
---|--- 
2
| try {
3
| throw new Error("Simulated controlled error from Plus One app")
4
| } catch (e) {
5
| LDObserve.recordError(e as Error, {feature: "test-button"})
6
| alert("You intentionally threw an error")
7
| }
8
| };
```
Before being able to receive data in the LD UI, you’ll need to add your mobile key to the React Native LD client, which can be found by logging in to the LD UI.
![Screenshot of LD sign in page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c7cea96e3e1eca6fedd429951483e3c01edabe718a4417975056fce3168fd08e/assets/images/tutorials/ollsdk-react-native/LD_signin.png)
Screenshot of Sign in page.
Once logged in, tap the settings button at the bottom left.
![Screenshot of LD onboarding page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1fd113c91ef6a5dee5728ba7952397eea3c4e36da76374565a9f3cacc6bebeff/assets/images/tutorials/ollsdk-react-native/LD_onboardingpage.png)
Screenshot of landing page after sign in.
Navigate to the Projects page and click create to create a new project.
![Screenshot of project landing page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c6ee82f1a9f4404a83b1fe352803f314047c8bb974cd38958be7083cbacfdfda/assets/images/tutorials/ollsdk-react-native/LD_projectpage.png)
Screenshot of Project page.
Define the new Project and click Create Project.
![Screenshot of New project page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/227a30a8f1a5e34f66835cd268b63284b19ac15502566bdb1f59f0b499b479fc/assets/images/tutorials/ollsdk-react-native/createnewproject.png)
Screenshot of New project widget page.
Then, define the environment where you would like your data to be sent.
![Screenshot of create new environment widget page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ca8e4333fa5036845d8da3c345a0f5b8f4ba24886df8aa107955305275c51087/assets/images/tutorials/ollsdk-react-native/createnewenvironement.png)
Screenshot of page to create new environment.
Now, grab the mobile key by pressing the three dots for the environment and selecting the mobile key, which will copy the key to your keyboard.
![Screenshot of where to find mobile key](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/784f69d853f83d598b8769809aa1578b60133bc52369b4556ecfe04175a8737e/assets/images/tutorials/ollsdk-react-native/grabmobkey.png)
Screenshot of steps to copy mobile key
Then, add it to the app/_layout file.
```
1
| const featureClient = new ReactNativeLDClient(
---|--- 
2
| ‘mob-abc123’,
3
| AutoEnvAttributes.Enabled,
4
| options,
5
| );
```
Finally, you can generate data by interacting with your app in the iOS app simulator.
Feel free to restart the app to ensure data is displaying in real time.
```
$
| npm expo run:ios
---|--- 
```
Once you navigate back to the LD UI, you should be able to see the logs, traces, and errors under the Monitor section.
### Logs
![Screenshot of logs page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/902188cb22bd50d3b2e78c4b20b8abb34b528ac1c980cdfbfee73319ac3ee4ce/assets/images/tutorials/ollsdk-react-native/logspage.png)
Screenshot of final logs page.
### Traces
![Screenshot of traces page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/fd1d8f260e899311e1b64578a32af092d68ee0218814266e0fc04937e51919bf/assets/images/tutorials/ollsdk-react-native/tracespage.png)
Screenshot of final traces page.
### Errors
![Screenshot of errors page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8c9ff74a75b2907b02e1b14b5c5054a5590c821c7b19640757f95b3862739f95/assets/images/tutorials/ollsdk-react-native/errorspage.png)
Screenshot of final errors page.
## Conclusion
In just a few minutes, we’ve taken the PlusOne React Native app from a simple counter to a fully observable application connected to LaunchDarkly. By setting up the SDK, initializing observability plugins, and recording errors, we now have a live feedback loop where application behavior is visible in the LaunchDarkly UI. This makes it far easier to diagnose issues, validate feature flag rollouts, and ensure smooth user experiences.
## Next Steps
Looking ahead, there are many ways to expand on what we’ve built by including features like recording [custom metrics](https://launchdarkly.com/docs/sdk/features/observability-metrics) and [session replay](https://launchdarkly.com/docs/sdk/features/session-replay-config), which provide even deeper insights into app behavior. By integrating observability at the foundation of your React Native projects, you equip your team with the clarity needed to debug faster, ship features more confidently, and deliver reliable experiences to your users.
You can also read [this article](https://launchdarkly.com/blog/welcome-highlight-to-launchdarkly/) to learn more about observability and guarded releases.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs