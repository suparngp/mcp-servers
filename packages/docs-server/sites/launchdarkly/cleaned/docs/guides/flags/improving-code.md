`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Concepts](#concepts)
 * [Improve flag hygiene](#improve-flag-hygiene)
 * [Extend your team’s “definition of done”](#extend-your-teams-definition-of-done)
 * [Use code references to track flag hygiene](#use-code-references-to-track-flag-hygiene)
 * [Refactor flagged code to reduce merge conflicts](#refactor-flagged-code-to-reduce-merge-conflicts)
 * [Avoid additional refactoring](#avoid-additional-refactoring)
 * [Improve code quality](#improve-code-quality)
 * [Avoid passing flag state in a call interface](#avoid-passing-flag-state-in-a-call-interface)
 * [Flags can change any time](#flags-can-change-any-time)
 * [Conclusion](#conclusion)
## Overview
This guide provides best practices and suggestions for improving code that uses feature flags. These practices can improve both code quality and ease of maintenance.
You can use code in tandem with your feature flags to maintain and improve the resilience of your process, including improving flag hygiene, giving your team more flexibility, refactoring flagged code to the degree that you need and no further, and generally increasing code quality.
##### Not all best practices work for everyone
The practices we offer in this guide are subjective. What may be a best practice for one team may not work as well for another. Review the recommendations in this guide and consider carefully if they will help your team before you implement them.
## Concepts
In order to use this guide effectively, you should understand these concepts:
### Improve flag hygiene
Most of the flags added to a project are temporary, intended to be removed later. Unfortunately, most teams are worse at removing flags than adding them, because removal is usually less urgent. This can lead to a codebase cluttered with flags that are no longer relevant. At best, this makes the code harder to read; at worst, inadvertently toggling the wrong flag can cause production failures.
Teams that use flags need to ensure that their code only references flags which are currently in use. This practice is known as “flag hygiene.” Here is a selection of techniques that help maintain good flag hygiene.
To learn more about flag hygiene, read [Reducing technical debt from feature flags](/docs/guides/flags/technical-debt).
### Extend your team’s “definition of done”
Engineering teams maintain their own standards for when a task or project can be considered “done.” For example, a team may consider the code for a task to be incomplete until it has automated tests.
You can maintain flag hygiene by ensuring that the temporary flags created for a task or project are no longer referenced by any code and are archived after they’re no longer in use. Adding this as a requirement to your team’s definition of done may help streamline your codebase, because only the flags you’re actively using will be present in it.
Code standards are easier to maintain with automated checks, such as those performed by a continuous integration (CI) system. You can even automate some flag hygiene checks.
## Use code references to track flag hygiene
LaunchDarkly’s [code references](/docs/home/flags/code-references) feature keeps track of the places in your code where each flag appears. It’s particularly useful when you need to clean up old flags.
Ensure that the code references for your project are up to date by integrating the [`ld-find-code-refs`](https://github.com/launchdarkly/ld-find-code-refs/) tool with your code pipeline.
To learn more, read [Code references](/docs/home/flags/code-references).
Here is an image of the code references section for a feature flag:
![The code references section of a feature flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/63cf303b64f7d39f099930445161a160996827f4024918f21d6137d8b84e7edf/assets/images/__LD_UI_no_test/flag-code-references.png)
The code references section of a feature flag.
## Refactor flagged code to reduce merge conflicts
Merge conflicts are a common source of friction when you make code changes. Adding flag logic in the middle of a function increases the chances that both that addition and its removal later will conflict with other changes.
To reduce the chance of conflicts, refactor both the flag logic and the code for each variation into their own functions. Keep the refactoring simple so that the overall time spent implementing the flag is short.
##### The examples below do not use a real coding language
The examples below use an approximation of a real coding language to illustrate the concepts they express. The language is based on JavaScript, but is not JavaScript.
Do not use these code samples in a production environment. They will not work.
Here’s an example to demonstrate this factoring tactic. The example code is taken from a fictional app which has a search feature which queries a back-end search engine. In the existing code, the function `getSearchResults` does the work of sending the search query to the backend, checking for errors and fetching the results.
Here is an example:
pseudocode
```
1
| function getSearchResults(query, context) {
---|--- 
2
| // 1. parse the query so engine can use it
3
| 
4
| // ... query parsing logic goes here...
5
| 
6
| // 2. send the search query to the back-end search engine
7
| engineURL = SEARCH_ENGINE_URL + '/search';
8
| response = sendRequest(engineURL, parsedQuery);
9
| 
10
| // 3. check for errors
11
| if (response.body.starts_with("SEARCH ERROR")) {
12
| // if there's an error, log the response and context details
13
| log.ERROR("Search failure", response, context);
14
| return new Error("There was an internal search error.");
15
| } else {
16
| // 4. turn response into a result list, clean up the results, etc.
17
| 
18
| // ... results logic goes here...
19
| 
20
| return results;
21
| }
22
| }
```
The app’s engineering team is preparing to migrate to a new, improved search engine. To prepare for the migration, the team has created the flag `use-new-search-engine` to tell the app which search back-end to use. The code needs to include code for querying both the old and the new search engines.
Inserting the flag logic in the middle of `getSearchResults` would make it even more complicated than it is already. Instead, they extract the relevant code and move it to new functions. They take the code which sends the query to the search engine (section 2 in the code above) and also code which processes errors and results (sections 3 and 4), because the new engine returns errors and results in a different format.
The team moves these lines of code, along with code for the new search engine and code to check the flag, into their own functions:
pseudocode
```
1
| // This new version of the main function is much shorter,
---|--- 
2
| // because it delegates the central work to executeSearch()
3
| function getSearchResults(query, context) {
4
| // 1. parse the query so engine can use it
5
| 
6
| // ... query parsing logic goes here...
7
| 
8
| // 2. send the search query to the back-end search engine
9
| response = executeSearch(parsedQuery, context);
10
| return response;
11
| }
12
| 
13
| // This function only checks the value of the "use-new-search-engine" flag
14
| // and routes the query to one of the two functions below
15
| // to do the actual querying and processing
16
| 
17
| function executeSearch(query, context) {
18
| useNewEngine = ldclient.variation("use-new-search-engine", context, false);
19
| if (useNewEngine == true) {
20
| return queryNewEngine(query, context);
21
| } else {
22
| return queryOldEngine(query, context);
23
| }
24
| }
25
| 
26
| // This function queries the OLD search engine and processes the response
27
| function queryOldEngine(query, context) {
28
| engineURL = SEARCH_ENGINE_URL + '/search';
29
| response = sendRequest(engineURL, query);
30
| if (response.body.starts_with("SEARCH ERROR")) {
31
| log.ERROR("Search failure on old engine", response, context);
32
| return new Error("There was an internal search error.");
33
| } else {
34
| // turn response into result list, clean up the results, etc.
35
| 
36
| // ... results logic goes here...
37
| 
38
| return results;
39
| }
40
| }
41
| 
42
| // This function queries the NEW search engine and processes the response
43
| function queryNewEngine(query, context) {
44
| engineURL = NEW_SEARCH_ENGINE_URL + '/query';
45
| response = sendRequest(engineURL, query);
46
| if (response.type == "error") {
47
| log.ERROR("Search failure on new engine", response, context);
48
| return new Error("There was an internal search error.");
49
| } else {
50
| 
51
| // turn new-engine response into a result list
52
| 
53
| // ... results logic goes here...
54
| 
55
| return results;
56
| }
57
| }
```
The migration is expected to last a few weeks. Because the new feature is wrapped in a feature flag, the team can integrate the new search engine code before it’s been fully tested and optimized. Now, they can spend time improving the code with real production data. Because the new and old search engine code is separated into different functions, they can make those improvements without changing shared code. In addition, it’s easier to add unit tests for the new code because they can call it directly without needing to create mock flag states.
When it’s time to retire the old search engine and archive the feature flag, the cleanup is minimal and less likely to cause merge conflicts.
The cleanup steps are:
 1. Delete the `executeSearch` and `queryOldEngine` functions.
 2. Rename `queryNewEngine` to `executeSearch`.
 3. Within `queryNewEngine`, change the `log.ERROR` message from `"Search failure on new engine"` to just `"Search failure"`, because there is only one engine now.
### Avoid additional refactoring
Both `queryOldEngine` and `queryNewEngine` contain similar code. Another version of this example could even contain more lines of code which are duplicated between both functions. You might want to refactor further by moving the duplicated code into a shared function.
There are a couple of reasons not to deduplicate code.
 * The code is not intended for long-term maintenance. After the migration is finished, the duplicates are deleted.
 * There is likely to be _short-term_ maintenance as you improve `queryNewEngine`. Premature refactoring may hinder that maintenance more than it helps.
We recommend the common refactoring adage known as [_the rule of three_](https://en.wikipedia.org/wiki/Rule_of_three_\(computer_programming\)): don’t refactor for deduplication until code is duplicated three or more times.
## Improve code quality
Adding feature flags to code increases its flexibility, but can also add complexity. The more complex your code is, the more difficult it is to diagnose and correct an unexpected problem.
There are various techniques you can use to make sure that your feature flags help accomplish what you want to do with code.
Here are some guidelines you can follow to make sure you write high-quality code:
### Avoid passing flag state in a call interface
When you use a feature flag to change the behavior of a component, perform the flag evaluation _inside_ the component.
It can be tempting to add a dedicated parameter to the call interface and send the flag state from the outside. However, changing the component’s interface means that all the component’s callers have to be changed too, and then changed again once the flag is removed.
Consider the `executeSearch` function we used as an example earlier. It calls `ldclient.variation` to evaluate the flag from within its own implementation.
If we moved that call out to `getSearchResults` and sent the flag value to `executeSearch` as an argument, the abbreviated code would look like this:
pseudocode
```
1
| function getSearchResults(query, context) {
---|--- 
2
| // 1. parse the query so engine can use it
3
| // ... query parsing logic goes here...
4
| 
5
| // 2. send the search query to the back-end search engine
6
| // with the feature flag value
7
| useNewEngine = ldclient.variation("use-new-search-engine", context, false);
8
| response = executeSearch(parsedQuery, context, useNewEngine);
9
| return response;
10
| }
11
| 
12
| // `useNewEngine` is now supplied in the call
13
| function executeSearch(query, context, useNewEngine) {
14
| if (useNewEngine == true) {
15
| return queryNewEngine(query, context);
16
| } else {
17
| return queryOldEngine(query, context);
18
| }
19
| }
```
The purpose of our flag-oriented refactoring was to reduce merge conflicts by separating out the code that would need to change, and keeping it contained in dedicated functions. Unfortunately, putting the flag evaluation code in `getSearchResults` has given it more responsibility that it didn’t need, and removed the benefits of the refactoring.
In this example, the changed interface only had one caller. When changing functions and modules with many callers, there’s even greater benefit in keeping the interface the same. This is especially important given the other risks inherent in changing heavily-used code.
### Flags can change any time
The more frequently that your code is executed, the more likely it is that your code will be in the middle of executing when a vital flag is changed. If your code is constructed in a way that expects flag state to stay consistent between the start and end of a code path, it can cause problems that are particularly hard to debug.
One way to avoid this problem is to use LaunchDarkly’s custom roles feature to restrict who can access the flag.
To learn more, read [Roles](/docs/home/account/roles).
This can make it harder to change a flag, which can be good in some cases, but it also increases the friction in your development process. Instead of making change more difficult, it’s better to improve the robustness of your code.
The following example uses a service that sends batches of data through a processing pipeline. Each batch must go through three processing steps: normalization, relabeling, and storage.
A dedicated service performs each of these steps. The storage step is always the last, but the normalization and relabeling can happen in either order. Each service is responsible for sending the data batch to the next service.
There are two possible orders in which the processing steps can be performed. The order is chosen using a feature flag called `process-order` which has variations `normalize-first` and `relabel-first`.
The `normalize-first` order is:
 1. Normalization
 2. Relabeling
 3. Storage
The `relabel-first` order looks like this:
 1. Relabeling
 2. Normalization
 3. Storage
Each service is responsible for sending its output to the next step.
It’s tempting to have each service evaluate the `process-order` flag after it’s processed and use this to decide the next step. However, if the flag is flipped in the middle of processing, this could cause problems.
If the flag is set to `normalize-first`, the batch starts at the normalization service. Before that service finishes processing, someone flips the flag to enable the `relabel-first` process. When the normalization service finishes processing, it’ll evaluate the `process-order` flag and use the `relabel-first` ordering, in which the normalization step is followed by storage. This data batch should be sent to the relabeling service because it hasn’t been relabeled, but it will be sent to storage instead.
This is an example of a situation in which flag consistency is required throughout multiple steps. The flag should be evaluated once for each batch, and that value should be sent in the call from service to service.
## Conclusion
In this guide, we covered:
 * Using code references to find feature flags in your codebase
 * When and how to refactor to streamline your code
 * How to improve code quality with flags
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs