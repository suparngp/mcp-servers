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
 * [Create your own approval application](#create-your-own-approval-application)
 * [Authentication](#authentication)
 * [Requests from LaunchDarkly to your application](#requests-from-launchdarkly-to-your-application)
 * [creationRequest and required response](#creationrequest-and-required-response)
 * [statusRequest and required response](#statusrequest-and-required-response)
 * [postApplyRequest and required response](#postapplyrequest-and-required-response)
 * [deletionRequest and required response](#deletionrequest-and-required-response)
 * [memberListRequest and optional response](#memberlistrequest-and-optional-response)
 * [Review your approval request externally](#review-your-approval-request-externally)
## Overview
This topic describes how to create your own approval application, which serves as an intermediary between LaunchDarkly approvals and your workflow management application. This is the first step required in building a [custom approvals integration](/docs/integrations/custom-approvals). Only customers with complex workflow management or approval systems in third-party applications that LaunchDarkly does not integrate with directly are likely to need a custom approvals integration.
## Create your own approval application
To use custom approvals, you must create and host your own approval application. This might be a standalone application, or it might be a middleware application that you deploy between LaunchDarkly and your existing third-party workflow management system, such as ServiceNow. If you are working with a third-party workflow management system, then your application should transform outgoing LaunchDarkly requests related to approval flows and forward them to the approval service of your choice.
You can find the configuration for the full integration and associated requests in our public [integration frameworks repository](https://github.com/launchdarkly/integration-framework/blob/main/integrations/custom-approvals/manifest.json).
## Authentication
LaunchDarkly will send requests to your application using the request header `"Authorization": "Bearer <API_KEY>"`. LaunchDarkly will save an encrypted version of this key and use it to authenticate all outgoing requests from our service to yours.
You specify both the `API_KEY` and the `BASE_URL` that LaunchDarkly should use when you define the [integration configuration](/docs/integrations/custom-approvals/add-integration-config) for custom approvals integration. LaunchDarkly saves this information as part of the integration configuration, and uses it only to construct outgoing requests from LaunchDarkly to your custom application.
## Requests from LaunchDarkly to your application
LaunchDarkly will make the following requests to your application:
 * [`creationRequest`](/docs/integrations/custom-approvals/custom-app#creationrequest-and-required-response): LaunchDarkly sends this upon approval request creation. The input from the `additionalApprovalFormVariables` defined on your [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config) will be merged into the body of this request.
 * [`statusRequest`](/docs/integrations/custom-approvals/custom-app#statusrequest-and-required-response): LaunchDarkly sends this every five minutes, or whenever the approval request page in LaunchDarkly is refreshed.
 * [`postApplyRequest`](/docs/integrations/custom-approvals/custom-app#postapplyrequest-and-required-response): LaunchDarkly sends this after a LaunchDarkly approval request has been applied.
 * [`deletionRequest`](/docs/integrations/custom-approvals/custom-app#deletionrequest-and-required-response): LaunchDarkly sends this whenever a LaunchDarkly approval request is deleted.
 * [`memberListRequest`](/docs/integrations/custom-approvals/custom-app#memberlistrequest-and-optional-response): (optional) LaunchDarkly sends this upon setup, and every four hours thereafter, to associate LaunchDarkly member resources with corresponding external user objects.
The `custom-approvals` [integration manifest](https://github.com/launchdarkly/integration-framework/blob/main/integrations/custom-approvals/manifest.json) defines generic versions of these requests. The following sections describe the requests in more detail.
### creationRequest and required response
Here’s the specification for the `creationRequest` that LaunchDarkly sends:
Request element | Description 
---|--- 
Method | `POST` 
URL | `<BASE_URL>/api/approvals` 
Specify the `BASE_URL` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). 
Headers | `{ "Content-Type": "application/json", "Authorization": "Bearer <API_KEY>"}` 
Specify the `API_KEY` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). 
Request body (sample) | ```
| 1
| {
---|--- 
2
| "_site": {
3
| "href":"https://app.launchdarkly.com/default/sample-env/features/sample-flag/approvals/66a8e20c0754610fae1fcf5d"
4
| },
5
| "_id":"66a8e20c0754610fae1fcf5d",
6
| "details":"Created approval request: this is an example comment
7
| Requested change is:
8
| Turn on the flag",
9
| "project": {
10
| "name":"Default Project",
11
| "key":"default",
12
| "tags":["sample", "sample-2"]
13
| },
14
| "environment": {
15
| "name":"Sample Environment",
16
| "key":"sample-environment",
17
| "tags":["sample"]
18
| },
19
| "flag": {
20
| "name":"Sample Flag",
21
| "key":"sample-flag",
22
| "tags":["sample"]
23
| },
24
| "shortDescription":"Jane Doe requested approval for changes to the flag Sample Flag in 'Sample Environment'",
25
| "timestamp": "1746196607127",
26
| "comment": "this is an example comment",
27
| "approvalFormVariables": {
28
| "yourCustomVariable1": "blue",
29
| "yourCustomVariable2": "green"
30
| }
31
| }
```
LaunchDarkly expects the following response from your application:
Response element | Description 
---|--- 
HTTP Code | `2xx` 
Body | ```
| { 
--- 
 "_id": <APPROVAL_ID>, // as taken from the request from LD 
 "status": { 
 "value": "approved", 
 "display": "Approved" 
 } 
 } 
```
LaunchDarkly considers `status` values of `approved` or `declined` as approved or declined requests. The `display` can be any string and is displayed in the LaunchDarkly user interface. 
### statusRequest and required response
Here’s the specification for the `statusRequest` that LaunchDarkly sends:
Request element | Description 
---|--- 
Method | `GET` 
URL | `<BASE_URL>/api/approvals/<APPROVAL_ID>/status` 
Specify the `BASE_URL` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). The `APPROVAL_ID` will be one of the `approvalId` values that LaunchDarkly has already sent in a [`creationRequest`](/docs/integrations/custom-approvals/custom-app#creationrequest-and-required-response). 
Headers | `{ "Authorization": "Bearer <API_KEY>"}` 
Specify the `API_KEY` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). 
Request body (sample) | The request asks for the status of the `APPROVAL_ID`. The request body is empty. 
LaunchDarkly expects the following response from your application:
Response element | Description 
---|--- 
HTTP Code | `2xx` 
Body | ```
| { 
--- 
 "status": { 
 "value": "pending", 
 "display": "Pending review" 
 } 
} 
```
LaunchDarkly considers `status` values of `approved` or `declined` as approved or declined requests. The `display` can be any string and is displayed in the LaunchDarkly user interface. 
The `display` string that LaunchDarkly receives when loading the approvals request page displays at the bottom of the right-hand sidebar:
![The approval status is requested from your custom app every five minutes or upon page refresh.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b785f13499ba183f500076571e783b122d69c4885418d3a30d8a77094101cda5/assets/images/__toPlaywright_newIA/approved-approval-status.png)
The approval status is requested from your custom app every five minutes or upon page refresh.
### postApplyRequest and required response
Here’s the specification for the `postApplyRequest` that LaunchDarkly will send:
Request element | Description 
---|--- 
Method | `POST` 
URL | `<BASE_URL>/api/approvals/<APPROVAL_ID>/apply` 
Specify the `BASE_URL` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). The `APPROVAL_ID` will be one of the `approvalId` values that LaunchDarkly has already sent in a [`creationRequest`](/docs/integrations/custom-approvals/custom-app#creationrequest-and-required-response). 
Headers | `{ "Content-Type": "application/json", "Authorization": "Bearer <API_KEY>"}` 
Specify the `API_KEY` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). 
Request body (sample) | The request indicates that `APPROVAL_ID` has been applied in LaunchDarkly. The request body is empty. 
LaunchDarkly expects the following response from your application:
Response element | Description 
---|--- 
HTTP Code | `2xx` 
Body | ```
| { 
--- 
 "status": { 
 "value": "declined", 
 "display": "declined" 
 } 
 } 
```
LaunchDarkly considers `status` values of `approved` or `declined` as approved or declined requests. The `display` can be any string and is displayed in the LaunchDarkly user interface. 
### deletionRequest and required response
Here’s the specification for the `deletionRequest` that LaunchDarkly will send:
Request element | Description 
---|--- 
Method | `POST` 
URL | `<BASE_URL>/api/approvals/<APPROVAL_ID>/cancel` 
Specify the `BASE_URL` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). The `APPROVAL_ID` will be one of the `approvalId` values that LaunchDarkly has already sent in a [`creationRequest`](/docs/integrations/custom-approvals/custom-app#creationrequest-and-required-response). 
Headers | `{ "Content-Type": "application/json", "Authorization": "Bearer <API_KEY>"}` 
Specify the `API_KEY` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). 
Request body (sample) | The request indicates that `APPROVAL_ID` has been deleted in LaunchDarkly. The request body is empty. 
LaunchDarkly expects the following response from your application:
Response element | Description 
---|--- 
HTTP Code | `2xx` 
Body | ```
| { 
--- 
 "status": { 
 "value": "cancelled", 
 "display": "Cancelled" 
 } 
 } 
```
LaunchDarkly considers `status` values of `approved` or `declined` as approved or declined requests. The `display` can be any string and is displayed in the LaunchDarkly user interface. 
### memberListRequest and optional response
Here’s the specification for the `memberListRequest` that LaunchDarkly will send:
Request element | Description 
---|--- 
Method | `GET` 
URL | `<BASE_URL>/api/members` 
Headers | `{ "Authorization": "Bearer <API_KEY>"}` 
Specify the `API_KEY` that LaunchDarkly should use in the [custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config). 
Request body (sample) | The request asks for LaunchDarkly members. The request body is empty. 
Responding to this request is optional. If implemented, LaunchDarkly expects the following response from your application:
Response element | Description 
---|--- 
HTTP Code | `2xx` 
Body | ```
| { 
--- 
 "members": [ 
 { 
 "name": "Jane Doe", 
 "email": "jdoe@example.com" 
 }, 
 { 
 "name": "Sandy Smith", 
 "email": "ssmith@example.com" 
 }, 
 ... etc 
 ] 
 } 
```
### Review your approval request externally
In addition to facilitating the synchronization of your external approval request and your LaunchDarkly approval request, your application should also provide a route to _review_ your external approval request externally, either by providing or by forwarding the user to a UI for providing reviews. LaunchDarkly assumes that this will be hosted at `<BASE_URL>/approvals?approvalID=<APPROVAL_ID>` and will provide a “Review in [Your App Name]” button on the “Review approval request” page linking to this external URL:
![An example of a link to review your approval request in an external approvals app called Custom Approvals.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/04831e7e375b084e2990bb6ebbfd8b08283b87c2ef77ff30fc949ebc459cacf2/assets/images/__toPlaywright_newIA/review-custom-approvals-link-required.png)
An example of a link to review your approval request in an external approvals app called Custom Approvals.
It may also display like this once it is reviewed or if reviews are not required on your environment:
![Another example of a link to review your approval request in an external approvals app called Custom Approvals.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b445c873396df6baeef923eda868628b7bd652b57caa7fc11e3413739daa1c5a/assets/images/__toPlaywright_newIA/review-custom-approvals-link.png)
Another example of a link to review your approval request in an external approvals app called Custom Approvals.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs