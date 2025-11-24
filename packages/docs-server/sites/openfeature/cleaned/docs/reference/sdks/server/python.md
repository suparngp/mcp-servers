[Skip to main content](#__docusaurus_skipToContent_fallback)
Check out our [KubeCon NA '25 recap, and our new training course!](/blog/kubecon-na-2025-recap)
On this page
[![Specification](https://img.shields.io/static/v1?label=Specification&message=v0.8.0&color=red&style=for-the-badge)](https://github.com/open-feature/spec/releases/tag/v0.8.0)[![Latest version](https://img.shields.io/static/v1?label=release&message=v0.8.3&color=blue&style=for-the-badge)](https://github.com/open-feature/python-sdk/releases/tag/v0.8.3) 
[![Build status](https://github.com/open-feature/python-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/open-feature/python-sdk/actions/workflows/merge.yml)[![Codecov](https://codecov.io/gh/open-feature/python-sdk/branch/main/graph/badge.svg?token=FQ1I444HB3)](https://codecov.io/gh/open-feature/python-sdk)[![Min python version](https://img.shields.io/badge/python->=3.9-blue.svg)](https://www.python.org/downloads/)[![Repo status](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
## Quick start[​](#quick-start "Direct link to Quick start")
**MCP Install** 📋 Copy Prompt
Follow the [MCP Getting Started](/docs/reference/other-technologies/mcp) guide to quickly set up the OpenFeature MCP server and connect your AI tool.
 * Run this prompt: `"Install OpenFeature into this app"`
**Quick Install:**
[📦 Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=OpenFeature&config=eyJjb21tYW5kIjogIm5weCIsICJhcmdzIjogWyIteSIsICJAb3BlbmZlYXR1cmUvbWNwIl19Cg==)[📦 Install in VS Code](https://vscode.dev/redirect/mcp/install?name=OpenFeature&config=%7B%22command%22%3A%20%22npx%22%2C%20%22args%22%3A%20%5B%22-y%22%2C%20%22%40openfeature%2Fmcp%22%5D%7D)
```
claude mcp add --transport stdio openfeature npx -y @openfeature/mcp 
```
### Requirements[​](#requirements "Direct link to Requirements")
 * Python 3.9+
### Install[​](#install "Direct link to Install")
#### Pip install[​](#pip-install "Direct link to Pip install")
```
pip install openfeature-sdk==0.8.3 
```
#### requirements.txt[​](#requirementstxt "Direct link to requirements.txt")
```
openfeature-sdk==0.8.3 
```
```
pip install -r requirements.txt 
```
### Usage[​](#usage "Direct link to Usage")
```
from openfeature import api 
from openfeature.provider.in_memory_provider import InMemoryFlag, InMemoryProvider 
# flags defined in memory 
my_flags ={ 
"v2_enabled": InMemoryFlag("on",{"on":True,"off":False}) 
} 
# configure a provider 
api.set_provider(InMemoryProvider(my_flags)) 
# create a client 
client = api.get_client() 
# get a bool flag value 
flag_value = client.get_boolean_value("v2_enabled",False) 
print("Value: "+str(flag_value)) 
```
## Features[​](#features "Direct link to Features")
Status | Features | Description 
---|---|--- 
✅ | [Providers](#providers) | Integrate with a commercial, open source, or in-house feature management tool. 
✅ | [Targeting](#targeting) | Contextually-aware flag evaluation using [evaluation context](/docs/reference/concepts/evaluation-context). 
✅ | [Hooks](#hooks) | Add functionality to various stages of the flag evaluation life-cycle. 
✅ | [Logging](#logging) | Integrate with popular logging packages. 
✅ | [Domains](#domains) | Logically bind clients with providers. 
✅ | [Eventing](#eventing) | React to state changes in the provider or flag management system. 
✅ | [Shutdown](#shutdown) | Gracefully clean up a provider during application shutdown. 
✅ | [Transaction Context Propagation](#transaction-context-propagation) | Set a specific [evaluation context](/docs/reference/concepts/evaluation-context) for a transaction (e.g. an HTTP request or a thread) 
✅ | [Extending](#extending) | Extend OpenFeature with custom providers and hooks. 
Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌
### Providers[​](#providers "Direct link to Providers")
[Providers](/docs/reference/concepts/provider) are an abstraction between a flag management system and the OpenFeature SDK. Look [here](/ecosystem/?instant_search%5BrefinementList%5D%5Btype%5D%5B0%5D=Provider&instant_search%5BrefinementList%5D%5Btechnology%5D%5B0%5D=Python) for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the [develop a provider](#develop-a-provider) section to learn how to build it yourself.
Once you've added a provider as a dependency, it can be registered with OpenFeature like this:
```
from openfeature import api 
from openfeature.provider.no_op_provider import NoOpProvider 
api.set_provider(NoOpProvider()) 
open_feature_client = api.get_client() 
```
In some situations, it may be beneficial to register multiple providers in the same application. This is possible using [domains](#domains), which is covered in more detail below.
### Targeting[​](#targeting "Direct link to Targeting")
Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as [targeting](/specification/glossary#targeting). If the flag management system you're using supports targeting, you can provide the input data using the [evaluation context](/docs/reference/concepts/evaluation-context).
```
from openfeature.api import( 
 get_client, 
 get_provider, 
 set_provider, 
 get_evaluation_context, 
 set_evaluation_context, 
) 
global_context = EvaluationContext( 
 targeting_key="targeting_key1", attributes={"application":"value1"} 
) 
request_context = EvaluationContext( 
 targeting_key="targeting_key2", attributes={"email": request.form['email']} 
) 
## set global context 
set_evaluation_context(global_context) 
# merge second context 
client = get_client(name="No-op Provider") 
client.get_string_value("email","fallback", request_context) 
```
### Hooks[​](#hooks "Direct link to Hooks")
[Hooks](/docs/reference/concepts/hooks) allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look [here](/ecosystem/?instant_search%5BrefinementList%5D%5Btype%5D%5B0%5D=Hook&instant_search%5BrefinementList%5D%5Btechnology%5D%5B0%5D=Python) for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the [develop a hook](#develop-a-hook) section to learn how to build it yourself.
Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.
```
from openfeature.api import add_hooks 
from openfeature.flag_evaluation import FlagEvaluationOptions 
# set global hooks at the API-level 
add_hooks([MyHook()]) 
# or configure them in the client 
client = OpenFeatureClient() 
client.add_hooks([MyHook()]) 
# or at the invocation-level 
options = FlagEvaluationOptions(hooks=[MyHook()]) 
client.get_boolean_flag("my-flag",False, flag_evaluation_options=options) 
```
### Logging[​](#logging "Direct link to Logging")
The OpenFeature SDK logs to the `openfeature` logger using the `logging` package from the Python Standard Library.
### Domains[​](#domains "Direct link to Domains")
Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the global provider is used.
```
from openfeature import api 
# Registering the default provider 
api.set_provider(MyProvider()); 
# Registering a provider to a domain 
api.set_provider(MyProvider(),"my-domain"); 
# A client bound to the default provider 
default_client = api.get_client(); 
# A client bound to the MyProvider provider 
domain_scoped_client = api.get_client("my-domain"); 
```
Domains can be defined on a provider during registration. For more details, please refer to the [providers](#providers) section.
### Eventing[​](#eventing "Direct link to Eventing")
Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (PROVIDER_READY on success, PROVIDER_ERROR on failure) are dispatched for every provider. Some providers support additional events, such as PROVIDER_CONFIGURATION_CHANGED.
Please refer to the documentation of the provider you're using to see what events are supported.
```
from openfeature import api 
from openfeature.provider import ProviderEvent 
defon_provider_ready(event_details: EventDetails): 
print(f"Provider {event_details.provider_name} is ready") 
api.add_handler(ProviderEvent.PROVIDER_READY, on_provider_ready) 
client = api.get_client() 
defon_provider_ready(event_details: EventDetails): 
print(f"Provider {event_details.provider_name} is ready") 
client.add_handler(ProviderEvent.PROVIDER_READY, on_provider_ready) 
```
### Transaction Context Propagation[​](#transaction-context-propagation "Direct link to Transaction Context Propagation")
Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler) and by using the transaction context propagator it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread).
You can implement a different transaction context propagator by implementing the `TransactionContextPropagator` class exported by the OpenFeature SDK. In most cases you can use `ContextVarsTransactionContextPropagator` as it works for `threads` and `asyncio` using [Context Variables](https://peps.python.org/pep-0567/).
The following example shows a **multithreaded** Flask application using transaction context propagation to propagate the request ip and user id into request scoped transaction context.
```
from flask import Flask, request 
from openfeature import api 
from openfeature.evaluation_context import EvaluationContext 
from openfeature.transaction_context import ContextVarsTransactionContextPropagator 
# Initialize the Flask app 
app = Flask(__name__) 
# Set the transaction context propagator 
api.set_transaction_context_propagator(ContextVarsTransactionContextPropagator()) 
# Middleware to set the transaction context 
# You can call api.set_transaction_context anywhere you have information, 
# you want to have available in the code-paths below the current one. 
@app.before_request 
defset_request_transaction_context(): 
 ip = request.headers.get("X-Forwarded-For", request.remote_addr) 
 user_id = request.headers.get("User-Id")# Assuming we're getting the user ID from a header 
 evaluation_context = EvaluationContext(targeting_key=user_id, attributes={"ipAddress": ip}) 
 api.set_transaction_context(evaluation_context) 
defcreate_response()->str: 
# This method can be anywhere in our code. 
# The feature flag evaluation will automatically contain the transaction context merged with other context 
 new_response = api.get_client().get_string_value("response-message","Hello User!") 
returnf"Message from server: {new_response}" 
# Example route where we use the transaction context 
@app.route('/greeting') 
defsome_endpoint(): 
return create_response() 
```
This also works for asyncio based implementations e.g. FastApi as seen in the following example:
```
from fastapi import FastAPI, Request 
from openfeature import api 
from openfeature.evaluation_context import EvaluationContext 
from openfeature.transaction_context import ContextVarsTransactionContextPropagator 
# Initialize the FastAPI app 
app = FastAPI() 
# Set the transaction context propagator 
api.set_transaction_context_propagator(ContextVarsTransactionContextPropagator()) 
# Middleware to set the transaction context 
@app.middleware("http") 
asyncdefset_request_transaction_context(request: Request, call_next): 
 ip = request.headers.get("X-Forwarded-For", request.client.host) 
 user_id = request.headers.get("User-Id")# Assuming we're getting the user ID from a header 
 evaluation_context = EvaluationContext(targeting_key=user_id, attributes={"ipAddress": ip}) 
 api.set_transaction_context(evaluation_context) 
 response =await call_next(request) 
return response 
defcreate_response()->str: 
# This method can be located anywhere in our code. 
# The feature flag evaluation will automatically include the transaction context merged with other context. 
 new_response = api.get_client().get_string_value("response-message","Hello User!") 
returnf"Message from server: {new_response}" 
# Example route where we use the transaction context 
@app.get('/greeting') 
asyncdefsome_endpoint(): 
return create_response() 
```
### Asynchronous Feature Retrieval[​](#asynchronous-feature-retrieval "Direct link to Asynchronous Feature Retrieval")
The OpenFeature API supports asynchronous calls, enabling non-blocking feature evaluations for improved performance, especially useful in concurrent or latency-sensitive scenarios. If a provider _hasn't_ implemented asynchronous calls, the client can still be used asynchronously, but calls will be blocking (synchronous).
```
import asyncio 
from openfeature import api 
from openfeature.provider.in_memory_provider import InMemoryFlag, InMemoryProvider 
my_flags ={"v2_enabled": InMemoryFlag("on",{"on":True,"off":False})} 
api.set_provider(InMemoryProvider(my_flags)) 
client = api.get_client() 
flag_value =await client.get_boolean_value_async("v2_enabled",False)# API calls are suffixed by _async 
print("Value: "+str(flag_value)) 
```
See the [develop a provider](#develop-a-provider) for how to support asynchronous functionality in providers.
### Shutdown[​](#shutdown "Direct link to Shutdown")
The OpenFeature API provides a shutdown function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.
```
from openfeature import api 
api.shutdown() 
```
## Extending[​](#extending "Direct link to Extending")
### Develop a provider[​](#develop-a-provider "Direct link to Develop a provider")
To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in [the existing contrib repository](https://github.com/open-feature/python-sdk-contrib) available under the OpenFeature organization. You’ll then need to write the provider by implementing the `AbstractProvider` class exported by the OpenFeature SDK.
```
from typing import List, Optional, Union 
from openfeature.evaluation_context import EvaluationContext 
from openfeature.flag_evaluation import FlagResolutionDetails 
from openfeature.hook import Hook 
from openfeature.provider import AbstractProvider, Metadata 
classMyProvider(AbstractProvider): 
defget_metadata(self)-> Metadata: 
... 
defget_provider_hooks(self)-> List[Hook]: 
return[] 
defresolve_boolean_details( 
 self, 
 flag_key:str, 
 default_value:bool, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[bool]: 
... 
defresolve_string_details( 
 self, 
 flag_key:str, 
 default_value:str, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[str]: 
... 
defresolve_integer_details( 
 self, 
 flag_key:str, 
 default_value:int, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[int]: 
... 
defresolve_float_details( 
 self, 
 flag_key:str, 
 default_value:float, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[float]: 
... 
defresolve_object_details( 
 self, 
 flag_key:str, 
 default_value: Union[dict,list], 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[Union[dict,list]]: 
... 
```
Providers can also be extended to support async functionality. To support add asynchronous calls to a provider:
 * Implement the `AbstractProvider` as shown above.
 * Define asynchronous calls for each data type.
```
classMyProvider(AbstractProvider): 
... 
asyncdefresolve_boolean_details_async( 
 self, 
 flag_key:str, 
 default_value:bool, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[bool]: 
... 
asyncdefresolve_string_details_async( 
 self, 
 flag_key:str, 
 default_value:str, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[str]: 
... 
asyncdefresolve_integer_details_async( 
 self, 
 flag_key:str, 
 default_value:int, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[int]: 
... 
asyncdefresolve_float_details_async( 
 self, 
 flag_key:str, 
 default_value:float, 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[float]: 
... 
asyncdefresolve_object_details_async( 
 self, 
 flag_key:str, 
 default_value: Union[dict,list], 
 evaluation_context: Optional[EvaluationContext]=None, 
)-> FlagResolutionDetails[Union[dict,list]]: 
... 
```
> Built a new provider? [Let us know](https://github.com/open-feature/openfeature.dev/issues/new?assignees=&labels=provider&projects=&template=document-provider.yaml&title=%5BProvider%5D%3A+) so we can add it to the docs!
### Develop a hook[​](#develop-a-hook "Direct link to Develop a hook")
To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in [the existing contrib repository](https://github.com/open-feature/python-sdk-contrib) available under the OpenFeature organization. Implement your own hook by creating a hook that inherits from the `Hook` class. Any of the evaluation life-cycle stages (`before`/`after`/`error`/`finally_after`) can be override to add the desired business logic.
```
from openfeature.hook import Hook 
classMyHook(Hook): 
defafter(self, hook_context: HookContext, details: FlagEvaluationDetails, hints:dict): 
print("This runs after the flag has been evaluated") 
```
> Built a new hook? [Let us know](https://github.com/open-feature/openfeature.dev/issues/new?assignees=&labels=hook&projects=&template=document-hook.yaml&title=%5BHook%5D%3A+) so we can add it to the docs!
 * [Quick start](#quick-start)
 * [Requirements](#requirements)
 * [Install](#install)
 * [Usage](#usage)
 * [Features](#features)
 * [Providers](#providers)
 * [Targeting](#targeting)
 * [Hooks](#hooks)
 * [Logging](#logging)
 * [Domains](#domains)
 * [Eventing](#eventing)
 * [Transaction Context Propagation](#transaction-context-propagation)
 * [Asynchronous Feature Retrieval](#asynchronous-feature-retrieval)
 * [Shutdown](#shutdown)
 * [Extending](#extending)
 * [Develop a provider](#develop-a-provider)
 * [Develop a hook](#develop-a-hook)