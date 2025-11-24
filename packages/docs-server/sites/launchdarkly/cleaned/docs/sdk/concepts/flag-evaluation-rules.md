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
 * [Preliminary checks](#preliminary-checks)
 * [Prerequisite checks](#prerequisite-checks)
 * [Individual targeting checks](#individual-targeting-checks)
 * [Targeting rule checks](#targeting-rule-checks)
 * [Clauses](#clauses)
 * [Operators](#operators)
 * [Segments](#segments)
 * [Percentage rollouts](#percentage-rollouts)
 * [Fallthrough](#fallthrough)
## Overview
This topic explains the algorithm used to evaluate a feature flag. This document is intended to be used by developers contributing to or building server-side SDKs for LaunchDarkly.
Client-side, server-side, and edge SDKs evaluate feature flags differently:
 * Client-side SDKs evaluate [feature flags](/docs/home/getting-started/vocabulary#flag) by contacting LaunchDarkly, which runs the evaluation rules described here on the backend
 * Server-side SDKs and edge SDKs evaluate [feature flags](/docs/home/getting-started/vocabulary#flag) internally using embedded evaluation rules
 * AI SDKs customize [AI Configs](/docs/home/getting-started/vocabulary#ai-config) internally using embedded evaluation rules
SDKs evaluate flags and customize AI Configs based on an evaluation context, which may contain one or more specific contexts. The arguments needed are the _flag key_ or _AI Config key_ , the _evaluation context_ , and the _fallback variation value_.
Evaluating a flag or customizing an AI Config for an evaluation context involves the following steps:
 1. [Preliminary checks](/docs/sdk/concepts/flag-evaluation-rules#preliminary-checks): verify that targeting is on and the supplied evaluation context has a key. If targeting is off, the SDK does not complete the rest of the checks, and serves the default off variation.
 2. [Prerequisite checks](/docs/sdk/concepts/flag-evaluation-rules#prerequisite-checks) (flag evaluation only): determine whether the flag’s prerequisites are met.
 3. [Individual targeting checks](/docs/sdk/concepts/flag-evaluation-rules#individual-targeting-checks): determine whether any context in the evaluation context matches an individual context targeting rule.
 4. [Targeting rule checks](/docs/sdk/concepts/flag-evaluation-rules#targeting-rule-checks): determine whether any context matches other targeting rules.
 5. [Fallthrough](/docs/sdk/concepts/flag-evaluation-rules#fallthrough): return the variation from the default rule when on.
The result of a flag evaluation is:
 1. The evaluated variation value
 2. The evaluation reason for returning that variation
The result of an AI Config customization is the customized AI Config variation value, including the model and customized messages for the context.
Variation values are often referenced by their _index_. For example, if a flag has two variations, `true` and `false`, then `true` will be variation index 0, and `false` will be variation index 1.
As a side effect of the evaluation, the SDKs send [events](/docs/sdk/concepts/events) back to LaunchDarkly to report that the evaluation or customization has occurred. The data sent back for each evaluation, including prerequisites, follows the schema described in the [Streaming Data Export schema reference](/docs/integrations/data-export/schema-reference).
The details in the sections below are specific to server-side SDKs evaluating flags. AI SDKs follow roughly the same algorithms when customizing AI Configs; the customization call is treated as an evaluation, but the evaluation reason is not returned.
## Preliminary checks
Five preliminary checks occur before the main flag evaluation algorithm executes:
 * If the SDK is offline, return the provided fallback value with the `ERROR` evaluation reason and the corresponding error code.
 * Fetch the flag definition from the flag store. If the definition is not found, return the provided fallback value with the `ERROR` evaluation reason and the corresponding error code.
 * If the context doesn’t have a `key` attribute, or if the context key is invalid, return the provided fallback value with the `ERROR` evaluation reason and the corresponding error code.
 * If the flag is turned off, return the flag’s default off variation with the `OFF` evaluation reason.
If all the above checks pass, the evaluation algorithm proceeds with prerequisite checks.
## Prerequisite checks
A flag may have prerequisites. A prerequisite is defined by a tuple of prerequisite flag key and variation index. A prerequisite is satisfied if, for a given context, the prerequisite flag evaluates to the specified variation index.
In the prerequisite check step, the SDK iterates through each flag’s prerequisites and verifies that each prerequisite is satisfied. If a prerequisite is not satisfied, the SDK returns the flag’s off variation value, with the `PREREQUISITE_FAILED` evaluation reason and the prerequisite flag key that failed. Prerequisite evaluation is short-circuited, which means the SDK returns after the first failure.
Below are the steps for prerequisite evaluations:
 * Retrieve the prerequisite flag. If not found, the prerequisite fails.
 * If the prerequisite flag targeting is off, the prerequisite fails.
 * Evaluate the prerequisite flag for the given context with no default value.
 * If the prerequisite flag evaluation result’s variation index matches the variation index defined for the prerequisite, the prerequisite is satisfied.
Prerequisite flags themselves may also have their own prerequisites, in which case the evaluations are recursive. LaunchDarkly prevents recursive cycles during flag creation and modification.
Once all prerequisites have passed, or there were no prerequisites, the evaluation algorithm proceeds with individual targeting checks.
## Individual targeting checks
Flags may have targets. A target is a list of context keys associated with a specific variation index. SDKs iterate through flags’ targets and check whether the targets contain the given context’s key.
If a target contains the context’s key, return the associated variation with the `TARGET_MATCH` evaluation reason.
If there were no targets, or no targets matched the context, the evaluation algorithm proceeds with the targeting rule checks.
## Targeting rule checks
Flags may have rules. Rules offer more complex ways to match arbitrary context attributes and segments, and to execute controlled rollouts based on those criteria. A rule is defined as a tuple of the ID, collection of clauses, and either the variation index or a rollout plan, as described in more detail below. For a rule to match, all rules’ clauses must be satisfied.
SDKs iterate through flags’ rules to find the first rule that matches the given context. If the matched rule has a variation index, return the corresponding variation, with the rule’s ID and the `RULE_MATCH` evaluation reason. If, on the other hand, the rule has a rollout, follow the rollout logic to arrive at the variation and also return the corresponding variation, along with the rule ID and the `RULE_MATCH` evaluation reason.
If a targeting rule references any custom attributes with `null` values, then the flag skips that rule. If there were no rules, or no rules matched the context, the evaluation algorithm proceeds with the default rule when on, also called the “fallthrough” value.
## Clauses
Rules have clauses, all of which must be satisfied for a rule to match the context. Clauses are defined as a tuple of:
 * context kind: the context kind in which to find the attribute. If not specified, this defaults to `user`.
 * attribute: context attribute to consider for comparison.
 * operator: comparison to perform. To learn more, read [Operators](/docs/sdk/concepts/flag-evaluation-rules#operators).
 * values: list of arbitrary values to compare to.
 * negate: boolean, whether to negate the outcome of clause’s comparison. In the LaunchDarkly UI, negated clauses are represented as separate negated operators.
Evaluating a clause is a matter of taking the value of the given context attribute and performing the given operator comparison against the given values, and then applying whether the outcome should be negated. If this produces a positive result, the clause has been satisfied.
If the context attribute value is an array or list, then the comparison is performed for each of those attribute values, against each of the clause values. In this case, a single context attribute value match to a single clause value is enough to satisfy the clause.
If the context being evaluated is a [multi-context](/docs/home/flags/multi-contexts), the attribute lookup is performed against the associated context with matching context kind. For example, if the multi-context being evaluated includes “user” and “organization” contexts and the clause has an “organization” context kind, then the attribute reference uses the “organization” context kind.
### Operators
This table explains operators and their arguments and conditions:
Operator | Argument Types | Condition 
---|---|--- 
`in` | Any | The context attribute value exactly matches the clause value, including its type. 
`endsWith` | String | Either the clause value is an empty string, or the context attribute value ends with the clause value. 
`startsWith` | String | The context attribute value starts with the clause value. 
`matches` | String | The clause value, evaluated as a regex, matches the context attribute value. 
`contains` | String | The context attribute value contains the clause value. 
`lessThan` | Number | The context attribute value is less than the clause value. 
`lessThanOrEqual` | Number | The context attribute value is less than or equal to the clause value. 
`greaterThan` | Number | The context attribute value is greater than the clause value. 
`greaterThanOrEqual` | Number | The context attribute value is greater than or equal to the clause value. 
`before` | Integer or string parsed as timestamp. This value is a UNIX epoch time in milliseconds. | The context attribute value less than the clause value. 
`after` | Integer or string parsed as timestamp. This value is a UNIX epoch time in milliseconds. | The context attribute value greater than the clause value. 
`semVerEqual` | String parsed as semantic version | The context attribute value and the clause value are semantically equivalent. 
`semVerLessThan` | String parsed as semantic version | The context attribute value precedes the clause value. 
If negated, corresponds to the context attribute being greater than or equal to the clause value. 
`semVerGreaterThan` | String parsed as semantic version | The clause value precedes the context attribute value. 
If negated, corresponds to the context attribute being less than or equal to the clause value. 
`segmentMatch` | String | Segment match operation succeeds. For more information, read the following section. 
### Segments
Clauses’ `segmentMatch` operator allows for more fine-grained control of segments. The clause values are segment keys. To determine if this clause is satisfied, retrieve each of the segments identified by those keys and determine if the context is part of any of those segments.
Segments’ properties include a list of included contexts, a list of excluded contexts, and a list of rules of their own, which themselves contain rule clauses with one exception: segment rule clauses may not contain `segmentMatch` operators.
To evaluate whether a context is in a segment:
 * If the context’s key is in the segment’s `included` list, the result is `true`.
 * If the context’s key is in the segment’s `excluded` list, the result is `false`.
 * If neither, then iterate over the segment’s rules to determine if any match:
 * Iterate over the segment rule’s clauses:
 * Evaluate if the clause matches the context.
 * If any clause doesn’t match, the rule doesn’t match and move on to the next rule.
 * If the segment rule’s weight is `null`, the rule matches and the result is `true`.
 * Get the segment rule’s `bucketBy` value. If the value is not set, use `key`.
 * Compute the variation bucket for the context using the segment rule’s bucketing key and the segment’s salt. Otherwise, follow the same logic as for rollouts.
 * If the context’s variation bucket is less than the segment rule’s weight divided by 100,000, the rule matches and the result is `true`. Otherwise, the rule doesn’t match and move on to the next rule.
 * If the context’s key wasn’t in the included and excluded lists, and none of the rules matched, the result is `false`.
 * Return the potentially negated (depending on clause’s `negate` property) result from above.
## Percentage rollouts
You can associate rules with percentage rollouts, which provides flexibility when you assign contexts to variation buckets.
Rollouts are defined as:
 * a subset of a list of weighted variations,
 * a context kind in which to find the attribute, and
 * a name of the attribute by which to assign the context to a variation bucket.
Weighted variations are a subset of the variation index and a non-negative integer between 0 and 100,000 acting as that variation’s weight. In the LaunchDarkly user interface, you define the rollout by specifying the weight as a percentage between 0 (represented as 0) and 100 (represented as 100,000) for each variation.
To assign a context to a variation bucket and calculate the final variation:
 1. If the context’s kind does not match the rollout’s context kind, return the variation index of the first variation with weight greater than zero. For an example, read [Percentage rollout logic with multiple context kinds](/docs/home/releases/percentage-rollouts#percentage-rollout-logic-with-multiple-context-kinds).
 2. Get the context’s attribute name from the rollout to assign the context, using the rollout’s context kind to perform the attribute lookup. If the attribute is not set, use the context’s key.
 3. Get the context’s attribute value.
 4. Compute the variation bucket for the context.
 1. Concatenate the flag’s key, the flag’s salt, and the context’s attribute value. Concatenate them with periods, `.`. If there is a seed present, concatenate seed and the context’s attribute value instead.
 2. Copy the first 15 characters of the SHA1 of the above.
 3. Convert the resulting base 16 integer to a base 10 integer.
 4. Divide the resulting base 10 integer by `0xFFFFFFFFFFFFFFF` (`1152921504606846975`). The result of this division is the context’s variation bucket number.
 1. If the context kind of the rollout or the attribute value for the bucket is not found, set the context variation’s bucket number to 0.
 5. Iterate over the rollout’s weighted variations.
 1. Starting at 0, keep adding the weighted variation’s weight divided by 100,000 to the sum.
 2. When a context’s variation bucket is less than the above sum, return the weighted variation’s variation index.
## Fallthrough
Fallthrough is the last step in flag evaluation. If the evaluation process is made here, it means that all prerequisite checks passed and none of the targets or rules matched the context.
Fallthrough is defined as a single variation of a rollout. This is similar to how rules are defined, except without iterating through any IDs or clauses. If fallthrough is a variation index, then return the corresponding variation value with the `FALLTHROUGH` evaluation reason. Otherwise, go through the same rollouts steps to arrive at the variation index, and again, return the corresponding value and the `FALLTHROUGH` evaluation reason.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs