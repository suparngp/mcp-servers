[Skip to main content](#__docusaurus_skipToContent_fallback)
Check out our [KubeCon NA '25 recap, and our new training course!](/blog/kubecon-na-2025-recap)
On this page
This document describes conventions for extracting data from the OpenFeature SDK for use in telemetry signals. It primarily focuses on providing recommendations for mapping well-known fields in OpenFeature to [OpenTelemetry feature-flag event records](https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/) and other semantic conventions.
## Evaluations[​](#evaluations "Direct link to Evaluations")
Flag evaluation telemetry comprises data resolved from the provider resolution (evaluation details and flag metadata) as well as metadata about the provider itself. This is particularly relevant to telemetry-related [hooks](/specification/sections/hooks).
### Evaluation Details[​](#evaluation-details "Direct link to Evaluation Details")
The following describes how fields on the [evaluation details](/specification/types#evaluation-details) are mapped to feature flag event records:
Event Record Attribute | Source Field or Derived Value from Evaluation Details | Requirement level | Type | Notes 
---|---|---|---|--- 
`feature_flag.key` | `flag key` | `Required` | `string` | See: [flag key](/specification/glossary#flag-key) 
`feature_flag.result.variant` | `variant` | `Conditionally Required` [1](#user-content-fn-1) | `string` | See: [variant](/specification/glossary#variant) 
`feature_flag.result.value` | `value` | `Conditionally Required` [2](#user-content-fn-2) | `undefined` | See: [value](/specification/glossary#values) 
`feature_flag.result.reason` | `reason` | `Recommended` | `string` | See: [reason](/specification/types#resolution-reason) 
`error.type` | `error code` | `Conditionally Required` [3](#user-content-fn-3) | `string` | See: [error code](/specification/types#error-code), 
`error.message` | `error message` | `Conditionally Required` [3](#user-content-fn-3) | `string` | A human-readable error message associated with a failed evaluation. For programmatic purposes, refer to `error code`. 
The `error.type` and `feature_flag.result.reason` enumerations use a lowercase "snake_case" convention (see [OpenTelemetry feature-flag event records](https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/)). OpenFeature [error codes](/specification/types#error-code) and [resolution reasons](/specification/types#resolution-reason) should be transformed accordingly by integrations which include this data.
### Flag Metadata[​](#flag-metadata "Direct link to Flag Metadata")
The following describes how keys in [flag metadata](/specification/types#flag-metadata) are mapped to feature flag event records:
Event Record Attribute | Flag Metadata Key | Requirement level | Type | Notes 
---|---|---|---|--- 
`feature_flag.context.id` | `contextId` | `Recommended` | `string` | The context identifier returned in the flag metadata uniquely identifies the subject of the flag evaluation. If not available, the [targeting key](/specification/glossary#targeting-key) should be used. 
`feature_flag.set.id` | `flagSetId` | `Recommended` | `string` | A logical identifier for the [flag set](/specification/glossary#flag-set). 
`feature_flag.version` | `version` | `Recommended` | `string` | A version string (format unspecified) for the flag or [flag set](/specification/glossary#flag-set). 
Keys in flag metadata use the "camelCase" casing convention, while the OpenTelemetry standard uses a namespaced "snake_case" convention.
### Provider Metadata[​](#provider-metadata "Direct link to Provider Metadata")
Event Record Attribute | Provider Metadata Field | Requirement level | Type | Notes 
---|---|---|---|--- 
`feature_flag.provider.name` | `name` | `Recommended` | `string` | The name of the provider as defined in the `provider metadata`, available in the `hook context`. 
## History[​](#history "Direct link to History")
Feature flags in the OpenTelemetry semantic conventions are currently in development and are marked as experimental. The following table describes the history of changes to the OpenTelemetry feature flag event records as it progresses towards a stable release.
Original Field Name | New Field Name | Semantic Convention Release 
---|---|--- 
`feature_flag.variant` | `feature_flag.result.variant` | [v1.32.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.32.0) 
`feature_flag.evaluation.reason` | `feature_flag.result.reason` | [v1.32.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.32.0) 
`feature_flag.evaluation.error.message` | `error.message` | [v1.33.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.33.0) 
`feature_flag.provider_name` | `feature_flag.provider.name` | [v1.33.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.33.0) 
`value` | `feature_flag.result.value` | [v1.34.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.34.0) 
## Footnotes[​](#footnotes "Direct link to Footnotes")
## Footnotes[​](#footnote-label "Direct link to Footnotes")
 1. The `variant` field should be included whenever possible as it represents the symbolic name of the flag's returned value (e.g., "on"/"off", "control"/"treatment"). Only omit if the provider doesn't supply this information. [↩](#user-content-fnref-1)
 2. The `value` field is required when a `variant` is not available, and recommended when it is. Considerations should be made for large and/or sensitive values, which should be redacted or omitted prior to being captured in telemetry signals. [↩](#user-content-fnref-2)
 3. Include `error.type` and `error.message`, if and only if an error occurred during a flag evaluation. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)
 * [Evaluations](#evaluations)
 * [Evaluation Details](#evaluation-details)
 * [Flag Metadata](#flag-metadata)
 * [Provider Metadata](#provider-metadata)
 * [History](#history)
 * [Footnotes](#footnotes)