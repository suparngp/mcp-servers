[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Performance](/terminal/comparisons/performance)
 * [Terminal features](/terminal/comparisons/terminal-features)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [Terminal apps selected for these benchmarks](#terminal-apps-selected-for-these-benchmarks)
 * [Versions & settings used during the comparison](#versions-and-settings-used-during-the-comparison)
 * [About benchmarks](#about-benchmarks)
 * [VTE benchmark](#vte-benchmark)
 * [Average time for each of the benchmark tests](#average-time-for-each-of-the-benchmark-tests)
 * [P90 of the results](#p90-of-the-results)
 * [Termbench](#termbench)
 * [Small test sizes](#small-test-sizes)
 * [Regular test size](#regular-test-size)
Was this helpful?
## 
[](#terminal-apps-selected-for-these-benchmarks)
Terminal apps selected for these benchmarks
We chose to benchmark Warp against 4 other terminal emulator applications, based on their popularity as well as language and principles. Here is the list of the applications we chose for this comparison together with the explanation as to why we decided to include it in our comparison:
 * Terminal.app - the default terminal app available on the macOS;
 * ITerm2 - one of the most popular terminal emulators used by macOS users;
 * Alacritty & WezTerm - both of those terminals are written in Rust and are well-known for their speed and overall performance, things that Warp is aiming for.
### 
[](#versions-and-settings-used-during-the-comparison)
Versions & settings used during the comparison
Terminal
Version
Terminal size (cols / rows, window is identical pixel-wise)
Warp
v0.2022.04.01.01.37.stable_03
208 cols / 54 rows
Terminal.app
Version 2.11 (440)
188 cols / 72 rows
iTerm2
Build 3.4.15
211 cols / 78 rows
Alacritty
alacritty 0.10.1 (2844606)
286 cols / 102 rows
Wezterm
20220319-142410-0fcdea07
243 cols / 80 rows
### 
[](#about-benchmarks)
About benchmarks
We link the source code of each benchmark used, so you can easily reproduce the tests with other terminal apps. Please, note that those benchmarks are not exhaustive. Comparing terminal emulators with each other is not an easy task - right now we're checking how each of the apps behaves when dealing with lots of input and/or output.
Ideally, the benchmarks would also cover the latency (time between pressing a key and the character showing on the screen, but also a delay between the user's input and communication with the shell). We may include tests that account for that in the future.
## 
[](#vte-benchmark)
VTE benchmark
Benchmark code can be found [here](https://github.com/alacritty/vtebench) with the specific commit we used in our comparison: `93bcc32b6e0f7560e9b1a5a8b0998c04fbf9b50d`. Results in milliseconds.
### 
[](#average-time-for-each-of-the-benchmark-tests)
Average time for each of the benchmark tests
Warp avg (ms)
Terminal.app avg (ms)
iTerm avg
Alacritty avg
WezTerm avg
dense_cells
43.88
24.91
144.84
7.25
28.15
scrolling
30.06
283.34
1257.57
31.75
687.77
scrolling_bottom_region
117.34
257.23
1294.25
29.1
672.67
scrolling_bottom_small_region
114.52
227.75
1251
25.98
669.93
scrolling_fullscreen
37.4
307.03
1565.17
37.36
1205
scrolling_top_region
120.63
209.29
2212.2
84.42
682.6
scrolling_top_small_region
114.64
205.59
1216.33
21.91
663.44
unicode
66.47
34.45
93.01
16.78
1279.25
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-4fd6246c4ec142bffccc1c34655a39f5c89114d4%252Fvtebench_avg.png%3Falt%3Dmedia%26token%3D612ac808-70d3-4022-bbd2-17e400a89769&width=768&dpr=4&quality=100&sign=bfd00f70&sv=2)
VTEbench average results (logarithmic scale )
### 
[](#p90-of-the-results)
P90 of the results
Warp p90
Terminal.app p90
iTerm p90
Alacritty p90
WezTerm p90
dense_cells
52
28
189
8
32
scrolling
32
266.76
1336
32
707
scrolling_bottom_region
170
243
1398
30
686
scrolling_bottom_small_region
167
224
1331
30
679
scrolling_fullscreen
38
327
1593
41
1208
scrolling_top_region
178
222
2243
85
686
scrolling_top_small_region
167
222
1314
30
666
unicode
77
39
90
20
3883
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-2ff8b633d0763421572f9dc4ef9351c6a060108d%252Fvtebench_p90.png%3Falt%3Dmedia%26token%3Dc1f66a9f-4de9-43a7-8305-c5e2d9056ce6&width=768&dpr=4&quality=100&sign=6a592c4e&sv=2)
VTEbench p90 results (logarithmic scale )
## 
[](#termbench)
Termbench
Benchmark code can be found [here](https://github.com/cmuratori/termbench) with the specific commit we used in our comparison: `82afbc69256b4e22de913f0f02f82e0480f3dac5`.
Below you'll find results for small and regular test sizes. Note that Terminal.app only participated in the small test. Results in seconds.
### 
[](#small-test-sizes)
Small test sizes
Warp small (s)
Terminal.app small (s)
iTerm small (s)
Alacritty small
WezTerm small
ManyLine
6.7854
2.6789
8.7057
1.2532
8.9436
LongLine
9.0033
1.6473
9.0849
0.8179
11.4587
FGPerChar
1.3716
453.9888
2.6625
0.2788
0.6487
FGBGPerChar
2.8403
908.894
4.5881
0.5931
0.7283
overall result
20.0006
1367.209
25.0413
2.943
21.7793
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f9dfb0234c73af1b47538533968399d9c21ec150%252Ftermbench_small.png%3Falt%3Dmedia%26token%3D7ac7be41-ad10-4b9d-91e5-326b6ec2b29a&width=768&dpr=4&quality=100&sign=53635314&sv=2)
Termbench small results (logarithmic scale )
### 
[](#regular-test-size)
Regular test size
Warp regular (s)
iTerm regular (s)
Alacritty regular (s)
WezTerm regular
ManyLine
113.76
132.4975
19.8802
150.8175
LongLine
155.0937
126.7561
12.7859
207.3647
FGPerChar
21.8928
39.3352
4.2925
9.4265
FGBGPerChar
46.312
50.5369
8.418
13.5142
overall result
337.0585
349.1258
45.3767
381.1229
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-fed348f024a20663fe457c7e217090d1b8722764%252Ftermbench_regular.png%3Falt%3Dmedia%26token%3D1a63f27f-6e28-4c5f-b413-88a114af044b&width=768&dpr=4&quality=100&sign=5e6e36f6&sv=2)
Termbench results (logarithmic scale)
[PreviousComparisons](/terminal/comparisons)[NextTerminal features](/terminal/comparisons/terminal-features)
Last updated 4 months ago
Was this helpful?