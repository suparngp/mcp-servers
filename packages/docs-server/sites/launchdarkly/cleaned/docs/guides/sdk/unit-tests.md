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
 * [Migrating from users to contexts](#migrating-from-users-to-contexts)
 * [Getting started](#getting-started)
 * [Usage](#usage)
 * [Mocking flags](#mocking-flags)
 * [Resetting mocks](#resetting-mocks)
 * [Testing ldClient](#testing-ldclient)
 * [Full example](#full-example)
## Overview
This guide explains how to unit test LaunchDarkly React applications with Jest. [jest-launchdarkly-mock](https://github.com/launchdarkly/jest-launchdarkly-mock) allows you to simulate, or “mock,” flag evaluations locally. This lets you verify testing behavior happens correctly, while also letting you use the React SDK in your React application.
##### For use with LaunchDarkly React Web SDK only
The jest-launchdarkly-mock package is only compatible with the [React Web SDK](/docs/sdk/client-side/react/react-web).
## Migrating from users to contexts
The 2.x version of jest-launchdarkly-mock only operates on contexts. When you migrate from version 1.x, replace `getUser` with `getContext` and remove all references to the `alias` function because it has been removed.
## Getting started
First, install jest-launchdarkly-mock with a package manager:
yarnnpm
```
$
| yarn add -D jest-launchdarkly-mock
---|--- 
```
Then, configure Jest:
jest.config.js
```
1
| module.exports = {
---|--- 
2
| setupFiles: ['jest-launchdarkly-mock'],
3
| }
```
## Usage
The jest-launchdarkly-mock package contains three exports to help unit test LaunchDarkly in your app:
 * `mockFlags`, to mock flags at the start of each test case. This only mocks flags returned by the `useFlags` hook.
 * `resetLDMocks`, to reset.
 * `ldClientMock`, to mock the `ldClient` in the React Web SDK.
To learn more, read the [Readme](https://github.com/launchdarkly/jest-launchdarkly-mock#usage).
button.test.js
```
1
| import { mockFlags, resetLDMocks, ldClientMock } from 'jest-launchdarkly-mock'
---|--- 
```
## Mocking flags
Use the `mockFlags` function to mock flags. This only mocks flags returned by the `useFlags` hook. Pass an [LDFlagSet](https://launchdarkly.github.io/js-client-sdk/interfaces/LDFlagSet.html) containing the flag keys and values you want to mock. You can use camelCase, snake_case, kebab-case, or unchanged flag keys when mocking flags.
Here’s how:
button.test.js
```
1
| it('should click correctly', () => {
---|--- 
2
| 
3
| mockFlags({
4
| camelFlag: true,
5
| snake_flag: 'rabbit',
6
| 'kebab-flag': true,
7
| 'original-unchanged_flag': 0,
8
| })
9
| 
10
| // ...act & assert
11
| })
```
## Resetting mocks
In the setup step of your test suite, use `resetLDMocks()` to reset all mocks and ensure each test runs with a clean slate. This function resets all mocked flags and `ldClientMock`.
Here’s how:
button.test.js
```
1
| describe('button', () => {
---|--- 
2
| 
3
| beforeEach(() => {
4
| resetLDMocks()
5
| })
6
| 
7
| // ...tests
8
| })
```
## Testing `ldClient`
You can use `ldClientMock` to write tests involving the `ldClient`. This is a Jest mock of the `ldClient`. All functions of `ldClientMock` are also Jest mocks.
For example, if you have a button that calls `ldClient.identify` on click, then you can write an assertion using `ldClientMock`.
Here’s how:
button.test.js
```
1
| it('should identify on click', () => {
---|--- 
2
| // ...arrange
3
| 
4
| // act
5
| const { getByTestId } = render(<Button />)
6
| fireEvent.click(getByTestId('test-button'))
7
| 
8
| // assert: identify gets called
9
| expect(ldClientMock.identify).toBeCalledWith({ key: 'context-key-123abc' })
10
| })
```
## Full example
Putting it all together, the following is a complete example of the snippets above:
button.test.js
```
1
| import React from 'react'
---|--- 
2
| import { render, fireEvent } from '@testing-library/react'
3
| import { mockFlags, ldClientMock, resetLDMocks } from 'jest-launchdarkly-mock'
4
| 
5
| describe('button', () => {
6
| beforeEach(() => {
7
| // resets flags and ldClientMock before each test
8
| resetLDMocks()
9
| })
10
| 
11
| test('flag on', () => {
12
| // mocking a camelCased flag
13
| mockFlags({ devTestFlag: true })
14
| 
15
| const { getByTestId } = render(<Button />)
16
| 
17
| expect(getByTestId('test-button')).toBeTruthy()
18
| })
19
| 
20
| test('identify', () => {
21
| // mocking a kebab-cased-flag
22
| mockFlags({ 'dev-test-flag': true })
23
| 
24
| const { getByTestId } = render(<Button />)
25
| fireEvent.click(getByTestId('test-button'))
26
| 
27
| // asserting ldClient.identify gets called
28
| expect(ldClientMock.identify).toBeCalledWith({ key: 'context-key-123abc' })
29
| })
30
| })
```
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs