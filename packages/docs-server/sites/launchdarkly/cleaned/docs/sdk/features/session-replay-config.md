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
 * [Client-side SDKs](#client-side-sdks)
 * [Mobile SDKs](#mobile-sdks)
 * [JavaScript](#javascript)
 * [Privacy](#privacy)
 * [Record canvas](#record-canvas)
 * [Retrieve session URLs on the client](#retrieve-session-urls-on-the-client)
 * [Add session properties](#add-session-properties)
 * [Record styles, images, and videos](#record-styles-images-and-videos)
 * [Canvas and WebGL](#canvas-and-webgl)
 * [Working with iframes](#working-with-iframes)
 * [Using a proxy](#using-a-proxy)
 * [React Web](#react-web)
 * [Record canvas](#record-canvas-1)
 * [Manually control session recording](#manually-control-session-recording)
 * [Retrieve session URLs on the client](#retrieve-session-urls-on-the-client-1)
 * [Add session properties](#add-session-properties-1)
 * [Vue](#vue)
 * [Record canvas](#record-canvas-2)
 * [Manually control session recording](#manually-control-session-recording-1)
 * [Retrieve session URLs on the client](#retrieve-session-urls-on-the-client-2)
 * [Add session properties](#add-session-properties-2)
 * [Android](#android)
 * [Privacy](#privacy-1)
 * [Sensitive keywords](#sensitive-keywords)
 * [Custom masking with MaskMatcher](#custom-masking-with-maskmatcher)
## Overview
This topic explains how to configure the SDK session replay plugin.
The session replay plugin supports several features, including privacy controls, WebGL capture (JavaScript SDKs), manual control of session recording, and retrieving session URLs on the client. After the SDK and session replay plugin are initialized, you can access these features from within your application.
The session replay plugin is available in JavaScript-based client-side SDKs and mobile SDKs. To get started with the session replay plugin, read the observability reference guide for your SDK. Use the docs site navigation on the left, or find your SDK under [Observability SDKs](/docs/sdk/observability#observability-sdks).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/session-replay-config#client-side-sdks)
 * [Mobile SDKs](/docs/sdk/features/session-replay-config#mobile-sdks)
## Client-side SDKs
This feature is available in the observability plugin for the following client-side SDKs:
 * [JavaScript](/docs/sdk/features/session-replay-config#javascript)
 * [React Web](/docs/sdk/features/session-replay-config#react-web)
 * [Vue](/docs/sdk/features/session-replay-config#vue)
## Mobile SDKs
This feature is available in the observability plugin for the following mobile SDKs:
 * [Android](/docs/sdk/features/session-replay-config#android)
### JavaScript
###### Expand JavaScript code sample
The session replay plugin supports the following features. After the SDK and session replay plugin are initialized, you can access these from within your application.
#### Privacy
When you [configure the plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options), you can choose from the following privacy settings:
 * set `privacySetting` to `default` to obfuscate all inputs and any text that matches commonly used regex expressions for personally identifiable information (PII).
 * set `privacySetting` to `strict` to obfuscate all HTML DOM text and images.
 * set `privacySetting` to `none` if you don’t want to obfuscate anything.
By default, `strict` privacy mode is enabled. This provides the safest option as no PII should be captured, but it may limit session replay usability.
With `default` privacy mode, the plugin obfuscates all inputs and any text that matches commonly used regex expressions for personally identifiable information (PII). This functionality offers a base level protection from recording info such as addresses, phone numbers, social security numbers, and more. It does not obfuscate any images or media content. It may obfuscate other, non-PII text if that text matches the expressions that the plugin is using.
###### Expand Regex expressions used in default privacy mode
Here are the regex expressions that the plugins use when `privacySetting` is set to `default`:
Regex obfuscated when 'privacySetting' is 'default'
```
Email: '[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*' 
--- 
SSN: '[0-9]{3}-?[0-9]{2}-?[0-9]{4}' 
Phone number: '[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}' 
Credit card: '[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}' 
Unformatted SSN, phone number, credit card: '[0-9]{9,16}' 
Address: '[0-9]{1,5}.?[0-9]{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}' 
IP address: '(?:[0-9]{1,3}.){3}[0-9]{1,3}' 
```
If you need additional customization, you can define a function to edit or remove data in request/response pairs, and add include the function in the `networkRecording.requestResponseSanitizer` option in the plugin. To learn more, read [`RequestResponsePair`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/modules/client.html#requestresponsepair) and [`HighlightOptions`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/types/client_types_types.HighlightOptions.html).
In addition to setting the `privacySetting` for the plugins, you can also make adjustments at the HTML element level:
 * Add `class="highlight-block"` to elements that should be ignored. When the session recording is replayed, an empty placeholder replaces the content.
 * Add `class="highlight-mask"` to obfuscate specific HTML elements.
 * Add `class="highlight-ignore"` to input elements to preserve the styling of the input element, but ignore all end user input. This class is only available for `<input>` elements.
 * When `privacySetting` is `default`, you can override obfuscation on a per HTML element basis by adding the `data-hl-record="true"` attribute to the recorded HTML tag.
You can also customize the class names and selectors used for privacy settings:
 * Set `maskTextClass` to specify a custom class name or RegExp for masking text elements. Default is `'highlight-mask'`.
 * Set `maskTextSelector` to specify a CSS selector for masking text elements and their descendants.
 * Set `ignoreClass` to specify a custom class name for ignoring input elements. Default is `'highlight-ignore'`.
 * Set `ignoreSelector` to specify a CSS selector for ignoring input elements.
 * Set `blockClass` to specify a custom class name or RegExp for blocking elements completely. Default is `'highlight-block'`.
 * Set `blockSelector` to specify a CSS selector for blocking elements completely.
Here’s an example of using custom privacy classes:
Custom privacy classes example
```
1
| new SessionReplay({
---|--- 
2
| maskTextClass: 'my-mask-class',
3
| maskTextSelector: '[data-sensitive="true"]',
4
| ignoreClass: 'my-ignore-class', 
5
| ignoreSelector: '[data-ignore-input="true"]',
6
| blockClass: 'my-block-class',
7
| blockSelector: '[data-block="true"]'
8
| })
```
#### Record canvas
The session replay plugin can record a snapshot bitmap of an `HTMLCanvasElement` for WebGL capture.
To set this up, pass the following options when you initialize the plugin:
Recording options, JS SDK v3.7+
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'context-key-123abc'
4
| };
5
| 
6
| const client = initialize('client-side-id-123abc', context, {
7
| plugins: [
8
| new SessionReplay({
9
| enableCanvasRecording: true, // enable canvas recording
10
| samplingStrategy: {
11
| canvas: 2, // snapshot at 2 fps
12
| canvasMaxSnapshotDimension: 480, // snapshot at a max 480p resolution
13
| },
14
| })
15
| ]
16
| });
```
To learn more, read [`snapshot`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#snapshot).
#### Retrieve session URLs on the client
The session replay plugin also provides options for retrieving details about the current recorded session. This can be useful for building a custom integration with the session replay data.
`getSession` returns details of the current recording session, including a URL to view the session, and a URL for the exact time the method is called, relative to the session recording. For example, suppose an error is thrown in your app and you want to save the session URL to another application. You can use the session details `urlWithTimestamp` to set the player to the time when the error occurs.
Here’s how:
Get session details
```
1
| LDRecord.getSession().then(({url, urlWithTimestamp}) => {
---|--- 
2
| console.log(url, urlWithTimestamp);
3
| });
```
To learn more, read [`getSession`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#getsession).
To determine whether the current session is recording, use `getRecordingState`:
Get session details
```
1
| // returns 'NotRecording' or 'Recording'
---|--- 
2
| const recordingState = LDRecord.getRecordingState();
```
To learn more, read [`getRecordingState`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#getrecordingstate).
#### Add session properties
Use `LDRecord.addSessionProperties()` to add custom session-level properties. These properties are attached to the current session and are searchable in LaunchDarkly, but unlike `track()` events, they do not create timeline events.
Here’s how:
Add session properties
```
1
| LDRecord.addSessionProperties({
---|--- 
2
| plan: 'pro',
3
| favoriteColor: 'purple',
4
| });
```
Session properties are useful for attaching metadata to sessions that you want to search or filter by later, without cluttering the timeline with track events.
To learn more, read [`addSessionProperties`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#addsessionproperties).
#### Record styles, images, and videos
When you [configure the plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options) for the session replay plugin, you can explicitly request to inline stylesheets, images, or videos into the recording. This means that assets that are local to the client are serialized into the session replay recording and will be valid on replay. Some common reasons to turn on these settings include: firewall blocking CSS stylesheet access at time of replay, `<video>` tags that reference `blob:` in-memory video streams, and images that are transformed client-side.
Here’s how:
Inline options
```
1
| const options = {
---|--- 
2
| plugins: [
3
| new SessionReplay({
4
| inlineStylesheet: true,
5
| inlineImages: true,
6
| inlineVideos: true,
7
| },
8
| })
9
| ]
10
| };
```
Inlining may negatively affect performance, so we only recommend setting these options if you are encountering issues with client-local stylesheets or images. Turning the settings on can also trigger CORS errors. To learn more, read [`inlineStylesheet`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/types/client_types_types.HighlightOptions.html#default-9), [`inlineImages`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/types/client_types_types.HighlightOptions.html#default-8), and [`inlineVideos`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/types/client_types_types.HighlightOptions.html#default-10).
#### Canvas and WebGL
When you [configure the plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options) for the session replay plugin, you can set up recording of `<canvas>` elements. This includes `<canvas>` elements that use WebGL.
Here’s how:
Recording options
```
1
| const options = {
---|--- 
2
| plugins: [
3
| new SessionReplay({
4
| enableCanvasRecording: true, // enable canvas recording
5
| samplingStrategy: {
6
| canvasManualSnapshot: 2, // snapshot at 2 fps
7
| canvasMaxSnapshotDimension: 480, // snapshot at a max 480p resolution
8
| },
9
| })
10
| ]
11
| };
```
For WebGL canvas recording, the `canvasManualSnapshot` option is used to enable manual capture of the canvas. This is necessary to avoid capturing the WebGL buffer while it is no longer in memory.
The `samplingStrategy` options include the following:
 * `samplingStrategy.canvas` is the frame per second rate used to record the HTML canvas with automated recording. This is the recommended default approach. We recommend using a value of less than 5 to ensure the recording is not too large and does not have issues with playback.
 * `samplingStrategy.canvasManualSnapshot` is the frame per second rate used in manual snapshotting mode. Manual mode may be necessary in some cases, especially for WebGL applications.
 * `samplingStrategy.canvasFactor` is the resolution scaling factor applied to both dimensions of the canvas.
 * `samplingStrategy.canvasMaxSnapshotDimension` is the maximum recording resolution of the largest dimension of the canvas.
 * `samplingStrategy.canvasClearWebGLBuffer` disables WebGL buffer clearing when set to `false`. This may help if the canvas flickers when recording.
 * `samplingStrategy.canvasInitialSnapshotDelay` is the time in milliseconds to wait before the initial snapshot of canvas/video elements.
After you configure the plugin to your specifications, hook into your WebGL rendering code and call `snapshot`:
Record snapshot
```
1
| engine.runRenderLoop(() => {
---|--- 
2
| scene.render()
3
| LDRecord.snapshot(canvasElementRef.current)
4
| })
```
##### Working with iframes
You can record `<canvas>` elements within an `<iframe>`. However, you should be aware of the following caveats:
 * The iframe will not load if the source’s origin has a restrictive `X-Frame-Options` header.
 * If the iframe source becomes invalid after some time, or does not render content when inserted into a different domain, the session recording will not show the content that the end user saw.
By default, LaunchDarkly only supports recording same-origin iframes. If you can initialize the SDK and observability plugin within the `iframe`, you can record the events as a separate session.
In some cases, you may need to record a [cross-origin iframe](https://learn.microsoft.com/en-us/skype-sdk/ucwa/cross_domainiframe). These are `<iframe>` elements in your application that reference a domain considered to be part of a [different origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). When your iframe uses a `src` tag pointing to a different origin, the iframe is not accessible from the parent page. However, the iframe can still emit messages that the parent page can hear.
To support cross-origin iframes, set the `recordCrossOriginIframe` option to `true` when you initialize the SDK in both the parent window and the iframe.
Here’s how:
Plugin options
```
1
| const options = {
---|--- 
2
| plugins: [
3
| new SessionReplay({
4
| recordCrossOriginIframe: true
5
| })
6
| ]
7
| };
```
If your application is deployed into a cross-origin iframe of a parent application that you do not control, set the `recordCrossOriginIframe` option to `false`. This starts the recording for the iframe in standalone mode, and records a session with just the contents of the iframe.
To learn more, read `recordCrossOriginIframe` in [`HighlightOptions`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/types/client_types_types.HighlightOptions.html).
#### Using a proxy
If your sessions are not appearing in LaunchDarkly, it may be that requests to LaunchDarkly are being blocked. This may be happening for any of several reasons, including third-party browser extensions, browser configuration, or VPN settings.
If you have access to your domain’s DNS settings, you can set up a proxy from your domain to LaunchDarkly to avoid having requests blocked.
Here’s how:
 1. On your domain, add two `CNAME` records:
 * A `CNAME` record that points `pub.ld.<your_domain>` to `pub.observability.app.launchdarkly.com`.
 * A `CNAME` record that points `otel.ld.<your_domain>` to `otel.observability.app.launchdarkly.com`. This record is optional if you are only using the session replay plugin, but required if you are also using the [observability plugin](/docs/sdk/features/observability-config-client-side).
Together, these records mean that if you have an app running at `<your_domain>`, your DNS records will point `pub.ld.<your_domain>` and `otel.ld.<your_domain>` to the LaunchDarkly servers.
 2. In your application, set the `backendUrl` option when you [configure the observability plugin](/docs/sdk/observability/javascript#configure-the-plugin-options). Set the `backendUrl` option to `pub.ld.<your_domain>`.
Here’s how:
Plugin options
```
1
| // the examples assume your_domain is acme.com
---|--- 
2
| 
3
| const options = {
4
| plugins: [
5
| new SessionReplay({
6
| backendUrl: 'https://pub.ld.acme.com',
7
| })
8
| ]
9
| };
```
### React Web
###### Expand React Web code sample
The session replay plugin supports the following features. After the SDK and session replay plugin are initialized, you can access these from within your application.
#### Record canvas
The session replay plugin can record a snapshot bitmap of an `HTMLCanvasElement` for WebGL capture.
To set this up, pass the following options when you initialize the plugin:
Recording options, React Web SDK v3.7+
```
1
| const LDProvider = withLDProvider({
---|--- 
2
| clientSideID: 'client-side-id-123abc',
3
| context,
4
| options: {
5
| plugins: [
6
| new SessionReplay({
7
| enableCanvasRecording: true, // enable canvas recording
8
| samplingStrategy: {
9
| canvas: 2, // snapshot at 2 fps
10
| canvasMaxSnapshotDimension: 480, // snapshot at a max 480p resolution
11
| },
12
| })
13
| ]
14
| }
15
| })(App);
```
To learn more, read [`snapshot`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#snapshot).
#### Manually control session recording
By default, sessions are automatically recorded after you initialize the session replay plugin. If you want to control recording manually, set `manualStart` to `true` in the plugin options:
Recording options, React Web SDK v3.7+
```
1
| const LDProvider = withLDProvider({
---|--- 
2
| clientSideID: 'client-side-id-123abc',
3
| context,
4
| options: {
5
| plugins: [
6
| new SessionReplay({ manualStart: true })
7
| ]
8
| }
9
| })(App);
```
Then, start session replay yourself:
Start recording
```
1
| LDRecord.start({
---|--- 
2
| forceNew: true, //start a new recording session
3
| silent: false // if true, console.warn messages created in this method are skipped
4
| });
```
To stop session replay:
Stop recording
```
1
| LDRecord.stop();
---|--- 
```
To learn more, read [`start`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#start) and [`stop`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#stop).
#### Retrieve session URLs on the client
The session replay plugin also provides options for retrieving details about the current recorded session. This can be useful for building a custom integration with the session replay data.
`getSession` returns details of the current recording session, including a URL to view the session, and a URL for the exact time the method is called, relative to the session recording. For example, suppose an error is thrown in your app and you want to save the session URL to another application. You can use the session details `urlWithTimestamp` to set the player to the time when the error occurs.
Here’s how:
Get session details
```
1
| LDRecord.getSession().then(({url, urlWithTimestamp}) => {
---|--- 
2
| console.log(url, urlWithTimestamp);
3
| });
```
To learn more, read [`getSession`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#getsession).
To determine whether the current session is recording, use `getRecordingState`:
Get session details
```
1
| // returns 'NotRecording' or 'Recording'
---|--- 
2
| const recordingState = LDRecord.getRecordingState();
```
To learn more, read [`getRecordingState`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#getrecordingstate).
#### Add session properties
Use `LDRecord.addSessionProperties()` to add custom session-level properties. These properties are attached to the current session and are searchable in LaunchDarkly, but unlike `track()` events, they do not create timeline events.
Here’s how:
Add session properties
```
1
| LDRecord.addSessionProperties({
---|--- 
2
| plan: 'pro',
3
| favoriteColor: 'purple',
4
| });
```
Session properties are useful for attaching metadata to sessions that you want to search or filter by later, without cluttering the timeline with track events.
To learn more, read [`addSessionProperties`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#addsessionproperties).
### Vue
###### Expand Vue code sample
The session replay plugin supports the following features. After the SDK and session replay plugin are initialized, you can access these from within your application.
#### Record canvas
The session replay plugin can record a snapshot bitmap of an `HTMLCanvasElement` for WebGL capture.
To set this up, pass the following options when you initialize the plugin:
Recording options, Vue SDK v2.4+
```
1
| // main.js
---|--- 
2
| 
3
| const app = createApp(App)
4
| app.use(LDPlugin, {
5
| clientSideID: 'client-side-id-123abc',
6
| options: {
7
| plugins: [
8
| new SessionReplay({
9
| enableCanvasRecording: true, // enable canvas recording
10
| samplingStrategy: {
11
| canvas: 2, // snapshot at 2 fps
12
| canvasMaxSnapshotDimension: 480, // snapshot at a max 480p resolution
13
| },
14
| ]
15
| }
16
| })
17
| app.mount(#app)
```
#### Manually control session recording
By default, sessions are automatically recorded after you initialize the session replay plugin. If you want to control recording manually, set `manualStart` to `true` in the plugin options:
Recording options, Vue SDK v2.4+
```
1
| // main.js
---|--- 
2
| 
3
| const app = createApp(App)
4
| app.use(LDPlugin, {
5
| clientSideID: 'client-side-id-123abc',
6
| options: {
7
| plugins: [
8
| new SessionReplay({ manualStart: true })
9
| ]
10
| }
11
| })
12
| app.mount(#app)
```
Then, start session replay yourself:
Start recording
```
1
| LDRecord.start({
---|--- 
2
| forceNew: true, //start a new recording session
3
| silent: false // if true, console.warn messages created in this method are skipped
4
| });
```
To stop session replay:
Stop recording
```
1
| LDRecord.stop();
---|--- 
```
To learn more, read [`start`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#start) and [`stop`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#stop).
#### Retrieve session URLs on the client
The session replay plugin also provides options for retrieving details about the current recorded session. This can be useful for building a custom integration with the session replay data.
`getSession` returns details of the current recording session, including a URL to view the session, and a URL for the exact time the method is called, relative to the session recording. For example, suppose an error is thrown in your app and you want to save the session URL to another application. You can use the session details `urlWithTimestamp` to set the player to the time when the error occurs.
Here’s how:
Get session details
```
1
| LDRecord.getSession().then(({url, urlWithTimestamp}) => {
---|--- 
2
| console.log(url, urlWithTimestamp);
3
| });
```
To learn more, read [`getSession`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#getsession).
To determine whether the current session is recording, use `getRecordingState`:
Get session details
```
1
| // returns 'NotRecording' or 'Recording'
---|--- 
2
| const recordingState = LDRecord.getRecordingState();
```
To learn more, read [`getRecordingState`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#getrecordingstate).
#### Add session properties
Use `LDRecord.addSessionProperties()` to add custom session-level properties. These properties are attached to the current session and are searchable in LaunchDarkly, but unlike `track()` events, they do not create timeline events.
Here’s how:
Add session properties
```
1
| LDRecord.addSessionProperties({
---|--- 
2
| plan: 'pro',
3
| favoriteColor: 'purple',
4
| });
```
Session properties are useful for attaching metadata to sessions that you want to search or filter by later, without cluttering the timeline with track events.
To learn more, read [`addSessionProperties`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html#addsessionproperties).
### Android
###### Expand Android code sample
The session replay plugin for Android supports the following features. After the SDK and session replay plugin are initialized, you can access these from within your application.
#### Privacy
The Android session replay plugin uses `PrivacyProfile` to control how UI elements are masked. By default, all masking options are enabled. Session replay for Android uses Jetpack Compose semantics to identify and mask UI elements. Test thoroughly before releasing to ensure masking meets your requirements.
Here’s how to configure privacy settings:
Privacy profile configuration
```
1
| import com.launchdarkly.observability.replay.PrivacyProfile
---|--- 
2
| 
3
| val ldConfig = LDConfig.Builder(AutoEnvAttributes.Enabled)
4
| .mobileKey("mobile-key-123abc")
5
| .plugins(
6
| Components.plugins().setPlugins(
7
| listOf(
8
| Observability(
9
| this@BaseApplication,
10
| Options(
11
| instrumentations = listOf(
12
| ReplayInstrumentation(
13
| options = ReplayOptions(
14
| privacyProfile = PrivacyProfile(
15
| maskTextInputs = true,
16
| maskText = false,
17
| maskSensitive = true
18
| )
19
| )
20
| )
21
| )
22
| )
23
| )
24
| )
25
| )
26
| )
27
| .build()
```
##### Sensitive keywords
When `maskSensitive` is enabled, the SDK automatically masks any Compose UI text or content descriptions containing pre-determined keywords (case-insensitive). For the most up to date set of keywords, read [`PrivacyProfile`](https://github.com/launchdarkly/observability-sdk/blob/main/sdk/%40launchdarkly/observability-android/lib/src/main/kotlin/com/launchdarkly/observability/replay/PrivacyProfile.kt).
##### Custom masking with MaskMatcher
You can implement custom masking logic using the `MaskMatcher` interface. This allows you to define your own logic for which UI elements should be masked based on Jetpack Compose semantics.
Here’s how:
Custom MaskMatcher
```
1
| import androidx.compose.ui.semantics.SemanticsNode
---|--- 
2
| import androidx.compose.ui.semantics.SemanticsProperties
3
| import androidx.compose.ui.semantics.getOrNull
4
| import com.launchdarkly.observability.replay.MaskMatcher
5
| import com.launchdarkly.observability.replay.PrivacyProfile
6
| 
7
| // Create a custom matcher that masks elements with specific tags
8
| class CustomTagMatcher : MaskMatcher {
9
| override fun isMatch(node: SemanticsNode): Boolean {
10
| val testTag = node.config.getOrNull(SemanticsProperties.TestTag)
11
| return testTag == "sensitive-data" || testTag == "pii"
12
| }
13
| }
14
| 
15
| // Use the custom matcher in your privacy profile
16
| val ldConfig = LDConfig.Builder(AutoEnvAttributes.Enabled)
17
| .mobileKey("mobile-key-123abc")
18
| .plugins(
19
| Components.plugins().setPlugins(
20
| listOf(
21
| Observability(
22
| this@BaseApplication,
23
| Options(
24
| instrumentations = listOf(
25
| ReplayInstrumentation(
26
| options = ReplayOptions(
27
| privacyProfile = PrivacyProfile(
28
| maskTextInputs = true,
29
| maskText = false,
30
| maskSensitive = true,
31
| maskAdditionalMatchers = listOf(CustomTagMatcher())
32
| )
33
| )
34
| )
35
| )
36
| )
37
| )
38
| )
39
| )
40
| )
41
| .build()
```
The `MaskMatcher` interface requires implementing a single method:
 * `isMatch(node: SemanticsNode): Boolean` - Returns `true` if the node is a match, `false` otherwise.
Custom matchers should execute synchronously and avoid heavy operations to prevent performance issues during screen captures.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs