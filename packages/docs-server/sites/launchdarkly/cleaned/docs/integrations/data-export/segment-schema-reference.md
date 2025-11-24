`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Integrations](/docs/integrations)
 * [Collaboration tools](/docs/integrations/collaboration)
 * [Data Export](/docs/integrations/data-export)
 * [Edge tools](/docs/integrations/edge)
 * [Environments as a service](/docs/integrations/eaas)
 * [Experimentation and metric integrations](/docs/integrations/experimentation)
 * [IDE connectors](/docs/integrations/ide)
 * [Internal developer platforms](/docs/integrations/idp)
 * [Observability tools](/docs/integrations/observability)
 * [Segments integrations](/docs/integrations/segments)
 * [Workflow management tools](/docs/integrations/workflow)
 * [More integrations](/docs/integrations/more)
 * [Managing integrations](/docs/integrations/managing)
 * [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations)
 * [Building partner integrations](/docs/integrations/partner-integrations)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Additional properties](#additional-properties)
 * [Feature events](#feature-events)
 * [Click events](#click-events)
 * [Page view events](#page-view-events)
 * [Custom events](#custom-events)
## Overview
This topic explains the different event kinds for Segment Data Export destinations. The JSON schemas for Segment are formatted differently than LaunchDarkly’s. The `index`, `identify`, and `summary` event kinds are **not available** in Segment Data Export destinations, and other events are exported with different labels.
To learn more about the Segment destination, read [Segment’s documentation](https://segment.com/docs/).
There are four different event kinds exported to Segment. They are:
 * [Feature events](/docs/integrations/data-export/segment-schema-reference#feature-events): This event is emitted when a feature flag is evaluated.
 * [Click events](/docs/integrations/data-export/segment-schema-reference#click-events): This event is emitted when an end user clicks on a CSS selector for which they have configured a metric in an experiment.
 * [Page view events](/docs/integrations/data-export/segment-schema-reference#page-view-events): This event is emitted when an end user loads a page associated with an experiment metrics.
 * [Custom events](/docs/integrations/data-export/segment-schema-reference#custom-events): This event is emitted when LaunchDarkly SDK sends a `custom` event.
LaunchDarkly no longer supports `alias` events for SDKs upgraded to contexts. LaunchDarkly continues to support sending and receiving alias events for older SDK versions. For a list of SDKs that still support `alias` events, read [Aliasing users](/docs/sdk/features/aliasing-users).
### Additional properties
Segment events include additional information about different LaunchDarkly properties. These properties are included in all event kinds.
These properties are:
Property name | Property details 
---|--- 
`event` | The event kind. This field maps onto [Segment’s event field](https://segment.com/docs/connections/spec/track/). 
`environment` | The LaunchDarkly environment ID, also called the client-side ID, corresponding to the event. 
`project` | The LaunchDarkly project ID corresponding to the event. 
`key` | The flag key corresponding to the event. In the case of Experimentation events, this will be the metric key for the experiment. 
`userId` | The key of the user object or user context kind associated with the emitted event. For example, in client-side SDKs, this is the key of the currently identified user. This field maps onto [Segment’s userId field](https://segment.com/docs/connections/spec/track/). 
`contextKeys` | An object of `contextKind: contextKey` pairs for each context kind in the event. 
## Feature events
This table explains `feature` event properties:
Property name | Description 
---|--- 
`value` | The value of the evaluated flag. 
`flagVersion` | The version of the evaluated flag. 
`inExperiment` | `true` if this flag evaluation was allocated to an experiment. 
To learn more, read Allocating experiment audiences](/home/experimentation/allocation). 
`reasonKind` | The evaluation reason for the flag. 
To learn more, read [Evaluation reasons](/docs/sdk/concepts/evaluation-reasons). 
`prereqOf` | Set to another flag’s key if this flag evaluation was only performed in order to determine whether the prerequisite values were met for the indicated flag. 
To learn more, read [Flag prerequisites](/docs/home/flags/prereqs). 
`default` | Indicates whether the flag value was the result of the default variation being evaluated. 
`variation` | The variation of the flag requested. The SDK stores flag variation values in an array. This value corresponds to the index of the variation the array. Boolean flags show as `0` or `1` for `true` and `false`. For other flags, the array index starts at `0` for their different variations. 
`variationName` | The evaluated variation’s name, if it exists. If the evaluated variation doesn’t have a name, this field doesn’t appear. 
## Click events
This table explains `click` event properties:
Property name | Description 
---|--- 
`url` | The URL from which a user context triggered a flag evaluation. 
`selector` | The CSS selector corresponding to the `click` event. 
## Page view events
This table explains `page view` event properties:
Property name | Description 
---|--- 
`url` | The URL from which a user context triggered a flag evaluation. 
## Custom events
Custom events contain the properties listed under [Additional properties](/docs/integrations/data-export/segment-schema-reference#additional-properties).
This table explains `custom` event properties not listed in that section:
Property name | Description 
---|--- 
`metricValue` | The numeric value of a metric if it is specified in the event. If no metric value was provided, this field doesn’t appear. 
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs