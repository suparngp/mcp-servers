[ Skip to content ](#pydantic_aiproviders)
# `pydantic_ai.providers`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InterfaceClient]`
Abstract class for a provider.
The provider is in charge of providing an authenticated client to the API.
Each provider only supports a specific interface. A interface can be supported by multiple providers.
For example, the `OpenAIChatModel` interface can be supported by the `OpenAIProvider` and the `DeepSeekProvider`.
Source code in `pydantic_ai_slim/pydantic_ai/providers/__init__.py`
```
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
```
| ```
classProvider(ABC, Generic[InterfaceClient]):
"""Abstract class for a provider.
 The provider is in charge of providing an authenticated client to the API.
 Each provider only supports a specific interface. A interface can be supported by multiple providers.
 For example, the `OpenAIChatModel` interface can be supported by the `OpenAIProvider` and the `DeepSeekProvider`.
 """
 _client: InterfaceClient
 @property
 @abstractmethod
 defname(self) -> str:
"""The provider name."""
 raise NotImplementedError()
 @property
 @abstractmethod
 defbase_url(self) -> str:
"""The base URL for the provider API."""
 raise NotImplementedError()
 @property
 @abstractmethod
 defclient(self) -> InterfaceClient:
"""The client for the provider."""
 raise NotImplementedError()
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
"""The model profile for the named model, if available."""
 return None # pragma: no cover
 def__repr__(self) -> str:
 return f'{self.__class__.__name__}(name={self.name}, base_url={self.base_url})' # pragma: lax no cover
```
---|--- 
### name `abstractmethod` `property`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The provider name.
### base_url `abstractmethod` `property`
```
base_url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The base URL for the provider API.
### client `abstractmethod` `property`
```
client: InterfaceClient
```
The client for the provider.
### model_profile
```
model_profile(model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> ModelProfile[](../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
The model profile for the named model, if available.
Source code in `pydantic_ai_slim/pydantic_ai/providers/__init__.py`
```
46
47
48
```
| ```
defmodel_profile(self, model_name: str) -> ModelProfile | None:
"""The model profile for the named model, if available."""
 return None # pragma: no cover
```
---|--- 
### GoogleProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[Client]`
Provider for Google.
Source code in `pydantic_ai_slim/pydantic_ai/providers/google.py`
```
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
```
| ```
classGoogleProvider(Provider[Client]):
"""Provider for Google."""
 @property
 defname(self) -> str:
 return 'google-vertex' if self._client._api_client.vertexai else 'google-gla' # type: ignore[reportPrivateUsage]
 @property
 defbase_url(self) -> str:
 return str(self._client._api_client._http_options.base_url) # type: ignore[reportPrivateUsage]
 @property
 defclient(self) -> Client:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 return google_model_profile(model_name)
 @overload
 def__init__(
 self, *, api_key: str, http_client: httpx.AsyncClient | None = None, base_url: str | None = None
 ) -> None: ...
 @overload
 def__init__(
 self,
 *,
 credentials: Credentials | None = None,
 project: str | None = None,
 location: VertexAILocation | Literal['global'] | str | None = None,
 http_client: httpx.AsyncClient | None = None,
 base_url: str | None = None,
 ) -> None: ...
 @overload
 def__init__(self, *, client: Client) -> None: ...
 @overload
 def__init__(
 self,
 *,
 vertexai: bool = False,
 api_key: str | None = None,
 http_client: httpx.AsyncClient | None = None,
 base_url: str | None = None,
 ) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 credentials: Credentials | None = None,
 project: str | None = None,
 location: VertexAILocation | Literal['global'] | str | None = None,
 vertexai: bool | None = None,
 client: Client | None = None,
 http_client: httpx.AsyncClient | None = None,
 base_url: str | None = None,
 ) -> None:
"""Create a new Google provider.
 Args:
 api_key: The `API key <https://ai.google.dev/gemini-api/docs/api-key>`_ to
 use for authentication. It can also be set via the `GOOGLE_API_KEY` environment variable.
 credentials: The credentials to use for authentication when calling the Vertex AI APIs. Credentials can be
 obtained from environment variables and default credentials. For more information, see Set up
 Application Default Credentials. Applies to the Vertex AI API only.
 project: The Google Cloud project ID to use for quota. Can be obtained from environment variables
 (for example, GOOGLE_CLOUD_PROJECT). Applies to the Vertex AI API only.
 location: The location to send API requests to (for example, us-central1). Can be obtained from environment variables.
 Applies to the Vertex AI API only.
 vertexai: Force the use of the Vertex AI API. If `False`, the Google Generative Language API will be used.
 Defaults to `False` unless `location`, `project`, or `credentials` are provided.
 client: A pre-initialized client to use.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 base_url: The base URL for the Google API.
 """
 if client is None:
 # NOTE: We are keeping GEMINI_API_KEY for backwards compatibility.
 api_key = api_key or os.getenv('GOOGLE_API_KEY') or os.getenv('GEMINI_API_KEY')
 vertex_ai_args_used = bool(location or project or credentials)
 if vertexai is None:
 vertexai = vertex_ai_args_used
 http_client = http_client or cached_async_http_client(
 provider='google-vertex' if vertexai else 'google-gla'
 )
 http_options = HttpOptions(
 base_url=base_url,
 headers={'User-Agent': get_user_agent()},
 httpx_async_client=http_client,
 # TODO: Remove once https://github.com/googleapis/python-genai/issues/1565 is solved.
 async_client_args={'transport': httpx.AsyncHTTPTransport()},
 )
 if not vertexai:
 if api_key is None:
 raise UserError(
 'Set the `GOOGLE_API_KEY` environment variable or pass it via `GoogleProvider(api_key=...)`'
 'to use the Google Generative Language API.'
 )
 self._client = _SafelyClosingClient(vertexai=False, api_key=api_key, http_options=http_options)
 else:
 if vertex_ai_args_used:
 api_key = None
 if api_key is None:
 project = project or os.getenv('GOOGLE_CLOUD_PROJECT')
 # From https://github.com/pydantic/pydantic-ai/pull/2031/files#r2169682149:
 # Currently `us-central1` supports the most models by far of any region including `global`, but not
 # all of them. `us-central1` has all google models but is missing some Anthropic partner models,
 # which use `us-east5` instead. `global` has fewer models but higher availability.
 # For more details, check: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#available-regions
 location = location or os.getenv('GOOGLE_CLOUD_LOCATION') or 'us-central1'
 self._client = _SafelyClosingClient(
 vertexai=True,
 api_key=api_key,
 project=project,
 location=location,
 credentials=credentials,
 http_options=http_options,
 )
 else:
 self._client = client # pragma: no cover
```
---|--- 
#### __init__
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str),
 http_client: AsyncClient | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *,
 credentials: Credentials | None = None,
 project: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 location: (
 VertexAILocation[](#pydantic_ai.providers.google.VertexAILocation "pydantic_ai.providers.google.VertexAILocation") | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["global"] | str[](https://docs.python.org/3/library/stdtypes.html#str) | None
 ) = None,
 http_client: AsyncClient | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(*, client: Client) -> None
```
```
__init__(
 *,
 vertexai: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 http_client: AsyncClient | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 credentials: Credentials | None = None,
 project: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 location: (
 VertexAILocation[](#pydantic_ai.providers.google.VertexAILocation "pydantic_ai.providers.google.VertexAILocation") | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["global"] | str[](https://docs.python.org/3/library/stdtypes.html#str) | None
 ) = None,
 vertexai: bool[](https://docs.python.org/3/library/functions.html#bool) | None = None,
 client: Client | None = None,
 http_client: AsyncClient | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
Create a new Google provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The `API key <https://ai.google.dev/gemini-api/docs/api-key>`_ to use for authentication. It can also be set via the `GOOGLE_API_KEY` environment variable. | `None` 
`credentials` | `Credentials | None` | The credentials to use for authentication when calling the Vertex AI APIs. Credentials can be obtained from environment variables and default credentials. For more information, see Set up Application Default Credentials. Applies to the Vertex AI API only. | `None` 
`project` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The Google Cloud project ID to use for quota. Can be obtained from environment variables (for example, GOOGLE_CLOUD_PROJECT). Applies to the Vertex AI API only. | `None` 
`location` | `VertexAILocation[](#pydantic_ai.providers.google.VertexAILocation "pydantic_ai.providers.google.VertexAILocation") | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['global'] | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The location to send API requests to (for example, us-central1). Can be obtained from environment variables. Applies to the Vertex AI API only. | `None` 
`vertexai` | `bool[](https://docs.python.org/3/library/functions.html#bool) | None` | Force the use of the Vertex AI API. If `False`, the Google Generative Language API will be used. Defaults to `False` unless `location`, `project`, or `credentials` are provided. | `None` 
`client` | `Client | None` | A pre-initialized client to use. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base URL for the Google API. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/google.py`
```
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
```
| ```
def__init__(
 self,
 *,
 api_key: str | None = None,
 credentials: Credentials | None = None,
 project: str | None = None,
 location: VertexAILocation | Literal['global'] | str | None = None,
 vertexai: bool | None = None,
 client: Client | None = None,
 http_client: httpx.AsyncClient | None = None,
 base_url: str | None = None,
) -> None:
"""Create a new Google provider.
 Args:
 api_key: The `API key <https://ai.google.dev/gemini-api/docs/api-key>`_ to
 use for authentication. It can also be set via the `GOOGLE_API_KEY` environment variable.
 credentials: The credentials to use for authentication when calling the Vertex AI APIs. Credentials can be
 obtained from environment variables and default credentials. For more information, see Set up
 Application Default Credentials. Applies to the Vertex AI API only.
 project: The Google Cloud project ID to use for quota. Can be obtained from environment variables
 (for example, GOOGLE_CLOUD_PROJECT). Applies to the Vertex AI API only.
 location: The location to send API requests to (for example, us-central1). Can be obtained from environment variables.
 Applies to the Vertex AI API only.
 vertexai: Force the use of the Vertex AI API. If `False`, the Google Generative Language API will be used.
 Defaults to `False` unless `location`, `project`, or `credentials` are provided.
 client: A pre-initialized client to use.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 base_url: The base URL for the Google API.
 """
 if client is None:
 # NOTE: We are keeping GEMINI_API_KEY for backwards compatibility.
 api_key = api_key or os.getenv('GOOGLE_API_KEY') or os.getenv('GEMINI_API_KEY')
 vertex_ai_args_used = bool(location or project or credentials)
 if vertexai is None:
 vertexai = vertex_ai_args_used
 http_client = http_client or cached_async_http_client(
 provider='google-vertex' if vertexai else 'google-gla'
 )
 http_options = HttpOptions(
 base_url=base_url,
 headers={'User-Agent': get_user_agent()},
 httpx_async_client=http_client,
 # TODO: Remove once https://github.com/googleapis/python-genai/issues/1565 is solved.
 async_client_args={'transport': httpx.AsyncHTTPTransport()},
 )
 if not vertexai:
 if api_key is None:
 raise UserError(
 'Set the `GOOGLE_API_KEY` environment variable or pass it via `GoogleProvider(api_key=...)`'
 'to use the Google Generative Language API.'
 )
 self._client = _SafelyClosingClient(vertexai=False, api_key=api_key, http_options=http_options)
 else:
 if vertex_ai_args_used:
 api_key = None
 if api_key is None:
 project = project or os.getenv('GOOGLE_CLOUD_PROJECT')
 # From https://github.com/pydantic/pydantic-ai/pull/2031/files#r2169682149:
 # Currently `us-central1` supports the most models by far of any region including `global`, but not
 # all of them. `us-central1` has all google models but is missing some Anthropic partner models,
 # which use `us-east5` instead. `global` has fewer models but higher availability.
 # For more details, check: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#available-regions
 location = location or os.getenv('GOOGLE_CLOUD_LOCATION') or 'us-central1'
 self._client = _SafelyClosingClient(
 vertexai=True,
 api_key=api_key,
 project=project,
 location=location,
 credentials=credentials,
 http_options=http_options,
 )
 else:
 self._client = client # pragma: no cover
```
---|--- 
### VertexAILocation `module-attribute`
```
VertexAILocation = Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "asia-east1",
 "asia-east2",
 "asia-northeast1",
 "asia-northeast3",
 "asia-south1",
 "asia-southeast1",
 "australia-southeast1",
 "europe-central2",
 "europe-north1",
 "europe-southwest1",
 "europe-west1",
 "europe-west2",
 "europe-west3",
 "europe-west4",
 "europe-west6",
 "europe-west8",
 "europe-west9",
 "me-central1",
 "me-central2",
 "me-west1",
 "northamerica-northeast1",
 "southamerica-east1",
 "us-central1",
 "us-east1",
 "us-east4",
 "us-east5",
 "us-south1",
 "us-west1",
 "us-west4",
]
```
Regions available for Vertex AI. More details [here](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#genai-locations).
### OpenAIProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for OpenAI API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/openai.py`
```
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
```
| ```
classOpenAIProvider(Provider[AsyncOpenAI]):
"""Provider for OpenAI API."""
 @property
 defname(self) -> str:
 return 'openai'
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 return openai_model_profile(model_name)
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI) -> None: ...
 @overload
 def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 openai_client: None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None: ...
 def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new OpenAI provider.
 Args:
 base_url: The base url for the OpenAI requests. If not provided, the `OPENAI_BASE_URL` environment variable
 will be used if available. Otherwise, defaults to OpenAI's base url.
 api_key: The API key to use for authentication, if not provided, the `OPENAI_API_KEY` environment variable
 will be used if available.
 openai_client: An existing
 [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage)
 client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 # This is a workaround for the OpenAI client requiring an API key, whilst locally served,
 # openai compatible models do not always need an API key, but a placeholder (non-empty) key is required.
 if api_key is None and 'OPENAI_API_KEY' not in os.environ and base_url is not None and openai_client is None:
 api_key = 'api-key-not-set'
 if openai_client is not None:
 assert base_url is None, 'Cannot provide both `openai_client` and `base_url`'
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='openai')
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
```
---|--- 
#### __init__
```
__init__(*, openai_client: AsyncOpenAI) -> None
```
```
__init__(
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 openai_client: None = None,
 http_client: AsyncClient | None = None,
) -> None
```
```
__init__(
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: AsyncClient | None = None,
) -> None
```
Create a new OpenAI provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the OpenAI requests. If not provided, the `OPENAI_BASE_URL` environment variable will be used if available. Otherwise, defaults to OpenAI's base url. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `OPENAI_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncOpenAI | None` | An existing [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage) client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/openai.py`
```
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
```
| ```
def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new OpenAI provider.
 Args:
 base_url: The base url for the OpenAI requests. If not provided, the `OPENAI_BASE_URL` environment variable
 will be used if available. Otherwise, defaults to OpenAI's base url.
 api_key: The API key to use for authentication, if not provided, the `OPENAI_API_KEY` environment variable
 will be used if available.
 openai_client: An existing
 [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage)
 client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 # This is a workaround for the OpenAI client requiring an API key, whilst locally served,
 # openai compatible models do not always need an API key, but a placeholder (non-empty) key is required.
 if api_key is None and 'OPENAI_API_KEY' not in os.environ and base_url is not None and openai_client is None:
 api_key = 'api-key-not-set'
 if openai_client is not None:
 assert base_url is None, 'Cannot provide both `openai_client` and `base_url`'
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='openai')
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
```
---|--- 
### DeepSeekProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for DeepSeek API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/deepseek.py`
```
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
```
| ```
classDeepSeekProvider(Provider[AsyncOpenAI]):
"""Provider for DeepSeek API."""
 @property
 defname(self) -> str:
 return 'deepseek'
 @property
 defbase_url(self) -> str:
 return 'https://api.deepseek.com'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 profile = deepseek_model_profile(model_name)
 # As DeepSeekProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly.
 # This was not the case when using a DeepSeek model with another model class (e.g. BedrockConverseModel or GroqModel),
 # so we won't do this in `deepseek_model_profile` unless we learn it's always needed.
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('DEEPSEEK_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `DEEPSEEK_API_KEY` environment variable or pass it via `DeepSeekProvider(api_key=...)`'
 'to use the DeepSeek provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='deepseek')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
### BedrockModelProfile `dataclass`
Bases: `ModelProfile[](../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.ModelProfile")`
Profile for models used with BedrockModel.
ALL FIELDS MUST BE `bedrock_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
Source code in `pydantic_ai_slim/pydantic_ai/providers/bedrock.py`
```
33
34
35
36
37
38
39
40
41
42
```
| ```
@dataclass(kw_only=True)
classBedrockModelProfile(ModelProfile):
"""Profile for models used with BedrockModel.
 ALL FIELDS MUST BE `bedrock_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 """
 bedrock_supports_tool_choice: bool = False
 bedrock_tool_result_format: Literal['text', 'json'] = 'text'
 bedrock_send_back_thinking_parts: bool = False
```
---|--- 
### bedrock_amazon_model_profile
```
bedrock_amazon_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.ModelProfile") | None
```
Get the model profile for an Amazon model used via Bedrock.
Source code in `pydantic_ai_slim/pydantic_ai/providers/bedrock.py`
```
45
46
47
48
49
50
```
| ```
defbedrock_amazon_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for an Amazon model used via Bedrock."""
 profile = amazon_model_profile(model_name)
 if 'nova' in model_name:
 return BedrockModelProfile(bedrock_supports_tool_choice=True).update(profile)
 return profile
```
---|--- 
### bedrock_deepseek_model_profile
```
bedrock_deepseek_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.ModelProfile") | None
```
Get the model profile for a DeepSeek model used via Bedrock.
Source code in `pydantic_ai_slim/pydantic_ai/providers/bedrock.py`
```
53
54
55
56
57
58
```
| ```
defbedrock_deepseek_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a DeepSeek model used via Bedrock."""
 profile = deepseek_model_profile(model_name)
 if 'r1' in model_name:
 return BedrockModelProfile(bedrock_send_back_thinking_parts=True).update(profile)
 return profile # pragma: no cover
```
---|--- 
### BedrockProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[BaseClient]`
Provider for AWS Bedrock.
Source code in `pydantic_ai_slim/pydantic_ai/providers/bedrock.py`
```
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
```
| ```
classBedrockProvider(Provider[BaseClient]):
"""Provider for AWS Bedrock."""
 @property
 defname(self) -> str:
 return 'bedrock'
 @property
 defbase_url(self) -> str:
 return self._client.meta.endpoint_url
 @property
 defclient(self) -> BaseClient:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile: dict[str, Callable[[str], ModelProfile | None]] = {
 'anthropic': lambda model_name: BedrockModelProfile(
 bedrock_supports_tool_choice=True, bedrock_send_back_thinking_parts=True
 ).update(anthropic_model_profile(model_name)),
 'mistral': lambda model_name: BedrockModelProfile(bedrock_tool_result_format='json').update(
 mistral_model_profile(model_name)
 ),
 'cohere': cohere_model_profile,
 'amazon': bedrock_amazon_model_profile,
 'meta': meta_model_profile,
 'deepseek': bedrock_deepseek_model_profile,
 }
 # Split the model name into parts
 parts = model_name.split('.', 2)
 # Handle regional prefixes (e.g. "us.")
 if len(parts) > 2 and len(parts[0]) == 2:
 parts = parts[1:]
 if len(parts) < 2:
 return None
 provider = parts[0]
 model_name_with_version = parts[1]
 # Remove version suffix if it matches the format (e.g. "-v1:0" or "-v14")
 version_match = re.match(r'(.+)-v\d+(?::\d+)?
---|--- 
#### __init__
```
__init__(*, bedrock_client: BaseClient) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str),
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 region_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_read_timeout: float[](https://docs.python.org/3/library/functions.html#float) | None = None,
 aws_connect_timeout: float[](https://docs.python.org/3/library/functions.html#float) | None = None
) -> None
```
```
__init__(
 *,
 aws_access_key_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_secret_access_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_session_token: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 region_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_read_timeout: float[](https://docs.python.org/3/library/functions.html#float) | None = None,
 aws_connect_timeout: float[](https://docs.python.org/3/library/functions.html#float) | None = None
) -> None
```
```
__init__(
 *,
 bedrock_client: BaseClient | None = None,
 aws_access_key_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_secret_access_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_session_token: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 region_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 aws_read_timeout: float[](https://docs.python.org/3/library/functions.html#float) | None = None,
 aws_connect_timeout: float[](https://docs.python.org/3/library/functions.html#float) | None = None
) -> None
```
Initialize the Bedrock provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`bedrock_client` | `BaseClient | None` | A boto3 client for Bedrock Runtime. If provided, other arguments are ignored. | `None` 
`aws_access_key_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS access key ID. If not set, the `AWS_ACCESS_KEY_ID` environment variable will be used if available. | `None` 
`aws_secret_access_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS secret access key. If not set, the `AWS_SECRET_ACCESS_KEY` environment variable will be used if available. | `None` 
`aws_session_token` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS session token. If not set, the `AWS_SESSION_TOKEN` environment variable will be used if available. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key for Bedrock client. Can be used instead of `aws_access_key_id`, `aws_secret_access_key`, and `aws_session_token`. If not set, the `AWS_BEARER_TOKEN_BEDROCK` environment variable will be used if available. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base URL for the Bedrock client. | `None` 
`region_name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS region name. If not set, the `AWS_DEFAULT_REGION` environment variable will be used if available. | `None` 
`profile_name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS profile name. | `None` 
`aws_read_timeout` | `float[](https://docs.python.org/3/library/functions.html#float) | None` | The read timeout for Bedrock client. | `None` 
`aws_connect_timeout` | `float[](https://docs.python.org/3/library/functions.html#float) | None` | The connect timeout for Bedrock client. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/bedrock.py`
```
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
```
| ```
def__init__(
 self,
 *,
 bedrock_client: BaseClient | None = None,
 aws_access_key_id: str | None = None,
 aws_secret_access_key: str | None = None,
 aws_session_token: str | None = None,
 base_url: str | None = None,
 region_name: str | None = None,
 profile_name: str | None = None,
 api_key: str | None = None,
 aws_read_timeout: float | None = None,
 aws_connect_timeout: float | None = None,
) -> None:
"""Initialize the Bedrock provider.
 Args:
 bedrock_client: A boto3 client for Bedrock Runtime. If provided, other arguments are ignored.
 aws_access_key_id: The AWS access key ID. If not set, the `AWS_ACCESS_KEY_ID` environment variable will be used if available.
 aws_secret_access_key: The AWS secret access key. If not set, the `AWS_SECRET_ACCESS_KEY` environment variable will be used if available.
 aws_session_token: The AWS session token. If not set, the `AWS_SESSION_TOKEN` environment variable will be used if available.
 api_key: The API key for Bedrock client. Can be used instead of `aws_access_key_id`, `aws_secret_access_key`, and `aws_session_token`. If not set, the `AWS_BEARER_TOKEN_BEDROCK` environment variable will be used if available.
 base_url: The base URL for the Bedrock client.
 region_name: The AWS region name. If not set, the `AWS_DEFAULT_REGION` environment variable will be used if available.
 profile_name: The AWS profile name.
 aws_read_timeout: The read timeout for Bedrock client.
 aws_connect_timeout: The connect timeout for Bedrock client.
 """
 if bedrock_client is not None:
 self._client = bedrock_client
 else:
 read_timeout = aws_read_timeout or float(os.getenv('AWS_READ_TIMEOUT', 300))
 connect_timeout = aws_connect_timeout or float(os.getenv('AWS_CONNECT_TIMEOUT', 60))
 config: dict[str, Any] = {
 'read_timeout': read_timeout,
 'connect_timeout': connect_timeout,
 }
 try:
 if api_key is not None:
 session = boto3.Session(
 botocore_session=_BearerTokenSession(api_key),
 region_name=region_name,
 profile_name=profile_name,
 )
 config['signature_version'] = 'bearer'
 else:
 session = boto3.Session(
 aws_access_key_id=aws_access_key_id,
 aws_secret_access_key=aws_secret_access_key,
 aws_session_token=aws_session_token,
 region_name=region_name,
 profile_name=profile_name,
 )
 self._client = session.client( # type: ignore[reportUnknownMemberType]
 'bedrock-runtime',
 config=Config(**config),
 endpoint_url=base_url,
 )
 except NoRegionError as exc: # pragma: no cover
 raise UserError('You must provide a `region_name` or a boto3 client for Bedrock Runtime.') fromexc
```
---|--- 
### groq_moonshotai_model_profile
```
groq_moonshotai_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.ModelProfile") | None
```
Get the model profile for an MoonshotAI model used with the Groq provider.
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
```
30
31
32
33
34
```
| ```
defgroq_moonshotai_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for an MoonshotAI model used with the Groq provider."""
 return ModelProfile(supports_json_object_output=True, supports_json_schema_output=True).update(
 moonshotai_model_profile(model_name)
 )
```
---|--- 
### meta_groq_model_profile
```
meta_groq_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.ModelProfile") | None
```
Get the model profile for a Meta model used with the Groq provider.
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
```
37
38
39
40
41
42
43
44
```
| ```
defmeta_groq_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a Meta model used with the Groq provider."""
 if model_name in {'llama-4-maverick-17b-128e-instruct', 'llama-4-scout-17b-16e-instruct'}:
 return ModelProfile(supports_json_object_output=True, supports_json_schema_output=True).update(
 meta_model_profile(model_name)
 )
 else:
 return meta_model_profile(model_name)
```
---|--- 
### GroqProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncGroq]`
Provider for Groq API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
```
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
```
| ```
classGroqProvider(Provider[AsyncGroq]):
"""Provider for Groq API."""
 @property
 defname(self) -> str:
 return 'groq'
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defclient(self) -> AsyncGroq:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 prefix_to_profile = {
 'llama': meta_model_profile,
 'meta-llama/': meta_groq_model_profile,
 'gemma': google_model_profile,
 'qwen': qwen_model_profile,
 'deepseek': deepseek_model_profile,
 'mistral': mistral_model_profile,
 'moonshotai/': groq_moonshotai_model_profile,
 'compound-': groq_model_profile,
 'openai/': openai_model_profile,
 }
 for prefix, profile_func in prefix_to_profile.items():
 model_name = model_name.lower()
 if model_name.startswith(prefix):
 if prefix.endswith('/'):
 model_name = model_name[len(prefix) :]
 return profile_func(model_name)
 return None
 @overload
 def__init__(self, *, groq_client: AsyncGroq | None = None) -> None: ...
 @overload
 def__init__(
 self, *, api_key: str | None = None, base_url: str | None = None, http_client: httpx.AsyncClient | None = None
 ) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 base_url: str | None = None,
 groq_client: AsyncGroq | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new Groq provider.
 Args:
 api_key: The API key to use for authentication, if not provided, the `GROQ_API_KEY` environment variable
 will be used if available.
 base_url: The base url for the Groq requests. If not provided, the `GROQ_BASE_URL` environment variable
 will be used if available. Otherwise, defaults to Groq's base url.
 groq_client: An existing
 [`AsyncGroq`](https://github.com/groq/groq-python?tab=readme-ov-file#async-usage)
 client to use. If provided, `api_key` and `http_client` must be `None`.
 http_client: An existing `AsyncHTTPClient` to use for making HTTP requests.
 """
 if groq_client is not None:
 assert http_client is None, 'Cannot provide both `groq_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `groq_client` and `api_key`'
 assert base_url is None, 'Cannot provide both `groq_client` and `base_url`'
 self._client = groq_client
 else:
 api_key = api_key or os.getenv('GROQ_API_KEY')
 base_url = base_url or os.getenv('GROQ_BASE_URL', 'https://api.groq.com')
 if not api_key:
 raise UserError(
 'Set the `GROQ_API_KEY` environment variable or pass it via `GroqProvider(api_key=...)`'
 'to use the Groq provider.'
 )
 elif http_client is not None:
 self._client = AsyncGroq(base_url=base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='groq')
 self._client = AsyncGroq(base_url=base_url, api_key=api_key, http_client=http_client)
```
---|--- 
#### __init__
```
__init__(*, groq_client: AsyncGroq | None = None) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 http_client: AsyncClient | None = None
) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 groq_client: AsyncGroq | None = None,
 http_client: AsyncClient | None = None
) -> None
```
Create a new Groq provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `GROQ_API_KEY` environment variable will be used if available. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Groq requests. If not provided, the `GROQ_BASE_URL` environment variable will be used if available. Otherwise, defaults to Groq's base url. | `None` 
`groq_client` | `AsyncGroq | None` | An existing [`AsyncGroq`](https://github.com/groq/groq-python?tab=readme-ov-file#async-usage) client to use. If provided, `api_key` and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `AsyncHTTPClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
```
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
```
| ```
def__init__(
 self,
 *,
 api_key: str | None = None,
 base_url: str | None = None,
 groq_client: AsyncGroq | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new Groq provider.
 Args:
 api_key: The API key to use for authentication, if not provided, the `GROQ_API_KEY` environment variable
 will be used if available.
 base_url: The base url for the Groq requests. If not provided, the `GROQ_BASE_URL` environment variable
 will be used if available. Otherwise, defaults to Groq's base url.
 groq_client: An existing
 [`AsyncGroq`](https://github.com/groq/groq-python?tab=readme-ov-file#async-usage)
 client to use. If provided, `api_key` and `http_client` must be `None`.
 http_client: An existing `AsyncHTTPClient` to use for making HTTP requests.
 """
 if groq_client is not None:
 assert http_client is None, 'Cannot provide both `groq_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `groq_client` and `api_key`'
 assert base_url is None, 'Cannot provide both `groq_client` and `base_url`'
 self._client = groq_client
 else:
 api_key = api_key or os.getenv('GROQ_API_KEY')
 base_url = base_url or os.getenv('GROQ_BASE_URL', 'https://api.groq.com')
 if not api_key:
 raise UserError(
 'Set the `GROQ_API_KEY` environment variable or pass it via `GroqProvider(api_key=...)`'
 'to use the Groq provider.'
 )
 elif http_client is not None:
 self._client = AsyncGroq(base_url=base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='groq')
 self._client = AsyncGroq(base_url=base_url, api_key=api_key, http_client=http_client)
```
---|--- 
### AzureProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Azure OpenAI API.
See <https://azure.microsoft.com/en-us/products/ai-foundry> for more information.
Source code in `pydantic_ai_slim/pydantic_ai/providers/azure.py`
```
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
```
| ```
classAzureProvider(Provider[AsyncOpenAI]):
"""Provider for Azure OpenAI API.
 See <https://azure.microsoft.com/en-us/products/ai-foundry> for more information.
 """
 @property
 defname(self) -> str:
 return 'azure'
 @property
 defbase_url(self) -> str:
 assert self._base_url is not None
 return self._base_url
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 model_name = model_name.lower()
 prefix_to_profile = {
 'llama': meta_model_profile,
 'meta-': meta_model_profile,
 'deepseek': deepseek_model_profile,
 'mistralai-': mistral_model_profile,
 'mistral': mistral_model_profile,
 'cohere-': cohere_model_profile,
 'grok': grok_model_profile,
 }
 for prefix, profile_func in prefix_to_profile.items():
 if model_name.startswith(prefix):
 if prefix.endswith('-'):
 model_name = model_name[len(prefix) :]
 profile = profile_func(model_name)
 # As AzureProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 # OpenAI models are unprefixed
 return openai_model_profile(model_name)
 @overload
 def__init__(self, *, openai_client: AsyncAzureOpenAI) -> None: ...
 @overload
 def__init__(
 self,
 *,
 azure_endpoint: str | None = None,
 api_version: str | None = None,
 api_key: str | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None: ...
 def__init__(
 self,
 *,
 azure_endpoint: str | None = None,
 api_version: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncAzureOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new Azure provider.
 Args:
 azure_endpoint: The Azure endpoint to use for authentication, if not provided, the `AZURE_OPENAI_ENDPOINT`
 environment variable will be used if available.
 api_version: The API version to use for authentication, if not provided, the `OPENAI_API_VERSION`
 environment variable will be used if available.
 api_key: The API key to use for authentication, if not provided, the `AZURE_OPENAI_API_KEY` environment variable
 will be used if available.
 openai_client: An existing
 [`AsyncAzureOpenAI`](https://github.com/openai/openai-python#microsoft-azure-openai)
 client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 if openai_client is not None:
 assert azure_endpoint is None, 'Cannot provide both `openai_client` and `azure_endpoint`'
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._base_url = str(openai_client.base_url)
 self._client = openai_client
 else:
 azure_endpoint = azure_endpoint or os.getenv('AZURE_OPENAI_ENDPOINT')
 if not azure_endpoint:
 raise UserError(
 'Must provide one of the `azure_endpoint` argument or the `AZURE_OPENAI_ENDPOINT` environment variable'
 )
 if not api_key and 'AZURE_OPENAI_API_KEY' not in os.environ: # pragma: no cover
 raise UserError(
 'Must provide one of the `api_key` argument or the `AZURE_OPENAI_API_KEY` environment variable'
 )
 if not api_version and 'OPENAI_API_VERSION' not in os.environ: # pragma: no cover
 raise UserError(
 'Must provide one of the `api_version` argument or the `OPENAI_API_VERSION` environment variable'
 )
 http_client = http_client or cached_async_http_client(provider='azure')
 self._client = AsyncAzureOpenAI(
 azure_endpoint=azure_endpoint,
 api_key=api_key,
 api_version=api_version,
 http_client=http_client,
 )
 self._base_url = str(self._client.base_url)
```
---|--- 
#### __init__
```
__init__(*, openai_client: AsyncAzureOpenAI) -> None
```
```
__init__(
 *,
 azure_endpoint: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_version: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 http_client: AsyncClient | None = None
) -> None
```
```
__init__(
 *,
 azure_endpoint: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_version: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 openai_client: AsyncAzureOpenAI | None = None,
 http_client: AsyncClient | None = None
) -> None
```
Create a new Azure provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`azure_endpoint` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The Azure endpoint to use for authentication, if not provided, the `AZURE_OPENAI_ENDPOINT` environment variable will be used if available. | `None` 
`api_version` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API version to use for authentication, if not provided, the `OPENAI_API_VERSION` environment variable will be used if available. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `AZURE_OPENAI_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncAzureOpenAI | None` | An existing [`AsyncAzureOpenAI`](https://github.com/openai/openai-python#microsoft-azure-openai) client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/azure.py`
```
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
```
| ```
def__init__(
 self,
 *,
 azure_endpoint: str | None = None,
 api_version: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncAzureOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new Azure provider.
 Args:
 azure_endpoint: The Azure endpoint to use for authentication, if not provided, the `AZURE_OPENAI_ENDPOINT`
 environment variable will be used if available.
 api_version: The API version to use for authentication, if not provided, the `OPENAI_API_VERSION`
 environment variable will be used if available.
 api_key: The API key to use for authentication, if not provided, the `AZURE_OPENAI_API_KEY` environment variable
 will be used if available.
 openai_client: An existing
 [`AsyncAzureOpenAI`](https://github.com/openai/openai-python#microsoft-azure-openai)
 client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 if openai_client is not None:
 assert azure_endpoint is None, 'Cannot provide both `openai_client` and `azure_endpoint`'
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._base_url = str(openai_client.base_url)
 self._client = openai_client
 else:
 azure_endpoint = azure_endpoint or os.getenv('AZURE_OPENAI_ENDPOINT')
 if not azure_endpoint:
 raise UserError(
 'Must provide one of the `azure_endpoint` argument or the `AZURE_OPENAI_ENDPOINT` environment variable'
 )
 if not api_key and 'AZURE_OPENAI_API_KEY' not in os.environ: # pragma: no cover
 raise UserError(
 'Must provide one of the `api_key` argument or the `AZURE_OPENAI_API_KEY` environment variable'
 )
 if not api_version and 'OPENAI_API_VERSION' not in os.environ: # pragma: no cover
 raise UserError(
 'Must provide one of the `api_version` argument or the `OPENAI_API_VERSION` environment variable'
 )
 http_client = http_client or cached_async_http_client(provider='azure')
 self._client = AsyncAzureOpenAI(
 azure_endpoint=azure_endpoint,
 api_key=api_key,
 api_version=api_version,
 http_client=http_client,
 )
 self._base_url = str(self._client.base_url)
```
---|--- 
### CohereProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncClientV2]`
Provider for Cohere API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/cohere.py`
```
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
```
| ```
classCohereProvider(Provider[AsyncClientV2]):
"""Provider for Cohere API."""
 @property
 defname(self) -> str:
 return 'cohere'
 @property
 defbase_url(self) -> str:
 client_wrapper = self.client._client_wrapper # type: ignore
 return str(client_wrapper.get_base_url())
 @property
 defclient(self) -> AsyncClientV2:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 return cohere_model_profile(model_name)
 def__init__(
 self,
 *,
 api_key: str | None = None,
 cohere_client: AsyncClientV2 | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new Cohere provider.
 Args:
 api_key: The API key to use for authentication, if not provided, the `CO_API_KEY` environment variable
 will be used if available.
 cohere_client: An existing
 [AsyncClientV2](https://github.com/cohere-ai/cohere-python)
 client to use. If provided, `api_key` and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 if cohere_client is not None:
 assert http_client is None, 'Cannot provide both `cohere_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `cohere_client` and `api_key`'
 self._client = cohere_client
 else:
 api_key = api_key or os.getenv('CO_API_KEY')
 if not api_key:
 raise UserError(
 'Set the `CO_API_KEY` environment variable or pass it via `CohereProvider(api_key=...)`'
 'to use the Cohere provider.'
 )
 base_url = os.getenv('CO_BASE_URL')
 if http_client is not None:
 self._client = AsyncClientV2(api_key=api_key, httpx_client=http_client, base_url=base_url)
 else:
 http_client = cached_async_http_client(provider='cohere')
 self._client = AsyncClientV2(api_key=api_key, httpx_client=http_client, base_url=base_url)
```
---|--- 
#### __init__
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 cohere_client: AsyncClientV2 | None = None,
 http_client: AsyncClient | None = None
) -> None
```
Create a new Cohere provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `CO_API_KEY` environment variable will be used if available. | `None` 
`cohere_client` | `AsyncClientV2 | None` | An existing [AsyncClientV2](https://github.com/cohere-ai/cohere-python) client to use. If provided, `api_key` and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/cohere.py`
```
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
```
| ```
def__init__(
 self,
 *,
 api_key: str | None = None,
 cohere_client: AsyncClientV2 | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new Cohere provider.
 Args:
 api_key: The API key to use for authentication, if not provided, the `CO_API_KEY` environment variable
 will be used if available.
 cohere_client: An existing
 [AsyncClientV2](https://github.com/cohere-ai/cohere-python)
 client to use. If provided, `api_key` and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 if cohere_client is not None:
 assert http_client is None, 'Cannot provide both `cohere_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `cohere_client` and `api_key`'
 self._client = cohere_client
 else:
 api_key = api_key or os.getenv('CO_API_KEY')
 if not api_key:
 raise UserError(
 'Set the `CO_API_KEY` environment variable or pass it via `CohereProvider(api_key=...)`'
 'to use the Cohere provider.'
 )
 base_url = os.getenv('CO_BASE_URL')
 if http_client is not None:
 self._client = AsyncClientV2(api_key=api_key, httpx_client=http_client, base_url=base_url)
 else:
 http_client = cached_async_http_client(provider='cohere')
 self._client = AsyncClientV2(api_key=api_key, httpx_client=http_client, base_url=base_url)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Cerebras API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/cerebras.py`
```
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
```
| ```
classCerebrasProvider(Provider[AsyncOpenAI]):
"""Provider for Cerebras API."""
 @property
 defname(self) -> str:
 return 'cerebras'
 @property
 defbase_url(self) -> str:
 return 'https://api.cerebras.ai/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 prefix_to_profile = {'llama': meta_model_profile, 'qwen': qwen_model_profile, 'gpt-oss': harmony_model_profile}
 profile = None
 for prefix, profile_func in prefix_to_profile.items():
 model_name = model_name.lower()
 if model_name.startswith(prefix):
 profile = profile_func(model_name)
 # According to https://inference-docs.cerebras.ai/resources/openai#currently-unsupported-openai-features,
 # Cerebras doesn't support some model settings.
 unsupported_model_settings = (
 'frequency_penalty',
 'logit_bias',
 'presence_penalty',
 'parallel_tool_calls',
 'service_tier',
 )
 return OpenAIModelProfile(
 json_schema_transformer=OpenAIJsonSchemaTransformer,
 openai_unsupported_model_settings=unsupported_model_settings,
 ).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('CEREBRAS_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `CEREBRAS_API_KEY` environment variable or pass it via `CerebrasProvider(api_key=...)` '
 'to use the Cerebras provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='cerebras')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[Mistral]`
Provider for Mistral API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/mistral.py`
```
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
```
| ```
classMistralProvider(Provider[Mistral]):
"""Provider for Mistral API."""
 @property
 defname(self) -> str:
 return 'mistral'
 @property
 defbase_url(self) -> str:
 return self.client.sdk_configuration.get_server_details()[0]
 @property
 defclient(self) -> Mistral:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 return mistral_model_profile(model_name)
 @overload
 def__init__(self, *, mistral_client: Mistral | None = None) -> None: ...
 @overload
 def__init__(self, *, api_key: str | None = None, http_client: httpx.AsyncClient | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 mistral_client: Mistral | None = None,
 base_url: str | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new Mistral provider.
 Args:
 api_key: The API key to use for authentication, if not provided, the `MISTRAL_API_KEY` environment variable
 will be used if available.
 mistral_client: An existing `Mistral` client to use, if provided, `api_key` and `http_client` must be `None`.
 base_url: The base url for the Mistral requests.
 http_client: An existing async client to use for making HTTP requests.
 """
 if mistral_client is not None:
 assert http_client is None, 'Cannot provide both `mistral_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `mistral_client` and `api_key`'
 assert base_url is None, 'Cannot provide both `mistral_client` and `base_url`'
 self._client = mistral_client
 else:
 api_key = api_key or os.getenv('MISTRAL_API_KEY')
 if not api_key:
 raise UserError(
 'Set the `MISTRAL_API_KEY` environment variable or pass it via `MistralProvider(api_key=...)`'
 'to use the Mistral provider.'
 )
 elif http_client is not None:
 self._client = Mistral(api_key=api_key, async_client=http_client, server_url=base_url)
 else:
 http_client = cached_async_http_client(provider='mistral')
 self._client = Mistral(api_key=api_key, async_client=http_client, server_url=base_url)
```
---|--- 
### __init__
```
__init__(*, mistral_client: Mistral | None = None) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 http_client: AsyncClient | None = None
) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 mistral_client: Mistral | None = None,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 http_client: AsyncClient | None = None
) -> None
```
Create a new Mistral provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `MISTRAL_API_KEY` environment variable will be used if available. | `None` 
`mistral_client` | `Mistral | None` | An existing `Mistral` client to use, if provided, `api_key` and `http_client` must be `None`. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Mistral requests. | `None` 
`http_client` | `AsyncClient | None` | An existing async client to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/mistral.py`
```
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
```
| ```
def__init__(
 self,
 *,
 api_key: str | None = None,
 mistral_client: Mistral | None = None,
 base_url: str | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new Mistral provider.
 Args:
 api_key: The API key to use for authentication, if not provided, the `MISTRAL_API_KEY` environment variable
 will be used if available.
 mistral_client: An existing `Mistral` client to use, if provided, `api_key` and `http_client` must be `None`.
 base_url: The base url for the Mistral requests.
 http_client: An existing async client to use for making HTTP requests.
 """
 if mistral_client is not None:
 assert http_client is None, 'Cannot provide both `mistral_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `mistral_client` and `api_key`'
 assert base_url is None, 'Cannot provide both `mistral_client` and `base_url`'
 self._client = mistral_client
 else:
 api_key = api_key or os.getenv('MISTRAL_API_KEY')
 if not api_key:
 raise UserError(
 'Set the `MISTRAL_API_KEY` environment variable or pass it via `MistralProvider(api_key=...)`'
 'to use the Mistral provider.'
 )
 elif http_client is not None:
 self._client = Mistral(api_key=api_key, async_client=http_client, server_url=base_url)
 else:
 http_client = cached_async_http_client(provider='mistral')
 self._client = Mistral(api_key=api_key, async_client=http_client, server_url=base_url)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Fireworks AI API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/fireworks.py`
```
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
```
| ```
classFireworksProvider(Provider[AsyncOpenAI]):
"""Provider for Fireworks AI API."""
 @property
 defname(self) -> str:
 return 'fireworks'
 @property
 defbase_url(self) -> str:
 return 'https://api.fireworks.ai/inference/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 prefix_to_profile = {
 'llama': meta_model_profile,
 'qwen': qwen_model_profile,
 'deepseek': deepseek_model_profile,
 'mistral': mistral_model_profile,
 'gemma': google_model_profile,
 }
 prefix = 'accounts/fireworks/models/'
 profile = None
 if model_name.startswith(prefix):
 model_name = model_name[len(prefix) :]
 for provider, profile_func in prefix_to_profile.items():
 if model_name.startswith(provider):
 profile = profile_func(model_name)
 break
 # As the Fireworks API is OpenAI-compatible, let's assume we also need OpenAIJsonSchemaTransformer,
 # unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('FIREWORKS_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `FIREWORKS_API_KEY` environment variable or pass it via `FireworksProvider(api_key=...)`'
 'to use the Fireworks AI provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='fireworks')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Grok API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/grok.py`
```
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
```
| ```
classGrokProvider(Provider[AsyncOpenAI]):
"""Provider for Grok API."""
 @property
 defname(self) -> str:
 return 'grok'
 @property
 defbase_url(self) -> str:
 return 'https://api.x.ai/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 profile = grok_model_profile(model_name)
 # As the Grok API is OpenAI-compatible, let's assume we also need OpenAIJsonSchemaTransformer,
 # unless json_schema_transformer is set explicitly.
 # Also, Grok does not support strict tool definitions: https://github.com/pydantic/pydantic-ai/issues/1846
 return OpenAIModelProfile(
 json_schema_transformer=OpenAIJsonSchemaTransformer, openai_supports_strict_tool_definition=False
 ).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('GROK_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `GROK_API_KEY` environment variable or pass it via `GrokProvider(api_key=...)`'
 'to use the Grok provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='grok')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Together AI API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/together.py`
```
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
```
| ```
classTogetherProvider(Provider[AsyncOpenAI]):
"""Provider for Together AI API."""
 @property
 defname(self) -> str:
 return 'together'
 @property
 defbase_url(self) -> str:
 return 'https://api.together.xyz/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile = {
 'deepseek-ai': deepseek_model_profile,
 'google': google_model_profile,
 'qwen': qwen_model_profile,
 'meta-llama': meta_model_profile,
 'mistralai': mistral_model_profile,
 }
 profile = None
 model_name = model_name.lower()
 provider, model_name = model_name.split('/', 1)
 if provider in provider_to_profile:
 profile = provider_to_profile[provider](model_name)
 # As the Together API is OpenAI-compatible, let's assume we also need OpenAIJsonSchemaTransformer,
 # unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('TOGETHER_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `TOGETHER_API_KEY` environment variable or pass it via `TogetherProvider(api_key=...)`'
 'to use the Together AI provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='together')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Heroku API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/heroku.py`
```
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
```
| ```
classHerokuProvider(Provider[AsyncOpenAI]):
"""Provider for Heroku API."""
 @property
 defname(self) -> str:
 return 'heroku'
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 # As the Heroku API is OpenAI-compatible, let's assume we also need OpenAIJsonSchemaTransformer.
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 base_url: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 if openai_client is not None:
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._client = openai_client
 else:
 api_key = api_key or os.getenv('HEROKU_INFERENCE_KEY')
 if not api_key:
 raise UserError(
 'Set the `HEROKU_INFERENCE_KEY` environment variable or pass it via `HerokuProvider(api_key=...)`'
 'to use the Heroku provider.'
 )
 base_url = base_url or os.getenv('HEROKU_INFERENCE_URL', 'https://us.inference.heroku.com')
 base_url = base_url.rstrip('/') + '/v1'
 if http_client is not None:
 self._client = AsyncOpenAI(api_key=api_key, http_client=http_client, base_url=base_url)
 else:
 http_client = cached_async_http_client(provider='heroku')
 self._client = AsyncOpenAI(api_key=api_key, http_client=http_client, base_url=base_url)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for GitHub Models API.
GitHub Models provides access to various AI models through an OpenAI-compatible API. See <https://docs.github.com/en/github-models> for more information.
Source code in `pydantic_ai_slim/pydantic_ai/providers/github.py`
```
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
```
| ```
classGitHubProvider(Provider[AsyncOpenAI]):
"""Provider for GitHub Models API.
 GitHub Models provides access to various AI models through an OpenAI-compatible API.
 See <https://docs.github.com/en/github-models> for more information.
 """
 @property
 defname(self) -> str:
 return 'github'
 @property
 defbase_url(self) -> str:
 return 'https://models.github.ai/inference'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile = {
 'xai': grok_model_profile,
 'meta': meta_model_profile,
 'microsoft': openai_model_profile,
 'mistral-ai': mistral_model_profile,
 'cohere': cohere_model_profile,
 'deepseek': deepseek_model_profile,
 }
 profile = None
 # If the model name does not contain a provider prefix, we assume it's an OpenAI model
 if '/' not in model_name:
 return openai_model_profile(model_name)
 provider, model_name = model_name.lower().split('/', 1)
 if provider in provider_to_profile:
 model_name, *_ = model_name.split(':', 1) # drop tags
 profile = provider_to_profile[provider](model_name)
 # As GitHubProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new GitHub Models provider.
 Args:
 api_key: The GitHub token to use for authentication. If not provided, the `GITHUB_API_KEY`
 environment variable will be used if available.
 openai_client: An existing `AsyncOpenAI` client to use. If provided, `api_key` and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 api_key = api_key or os.getenv('GITHUB_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `GITHUB_API_KEY` environment variable or pass it via `GitHubProvider(api_key=...)`'
 ' to use the GitHub Models provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='github')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
### __init__
```
__init__() -> None
```
```
__init__(*, api_key: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> None
```
```
__init__(*, api_key: str[](https://docs.python.org/3/library/stdtypes.html#str), http_client: AsyncClient) -> None
```
```
__init__(
 *, openai_client: AsyncOpenAI | None = None
) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: AsyncClient | None = None
) -> None
```
Create a new GitHub Models provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The GitHub token to use for authentication. If not provided, the `GITHUB_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncOpenAI | None` | An existing `AsyncOpenAI` client to use. If provided, `api_key` and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/github.py`
```
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
```
| ```
def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new GitHub Models provider.
 Args:
 api_key: The GitHub token to use for authentication. If not provided, the `GITHUB_API_KEY`
 environment variable will be used if available.
 openai_client: An existing `AsyncOpenAI` client to use. If provided, `api_key` and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 api_key = api_key or os.getenv('GITHUB_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `GITHUB_API_KEY` environment variable or pass it via `GitHubProvider(api_key=...)`'
 ' to use the GitHub Models provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='github')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for OpenRouter API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/openrouter.py`
```
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
```
| ```
classOpenRouterProvider(Provider[AsyncOpenAI]):
"""Provider for OpenRouter API."""
 @property
 defname(self) -> str:
 return 'openrouter'
 @property
 defbase_url(self) -> str:
 return 'https://openrouter.ai/api/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile = {
 'google': google_model_profile,
 'openai': openai_model_profile,
 'anthropic': anthropic_model_profile,
 'mistralai': mistral_model_profile,
 'qwen': qwen_model_profile,
 'x-ai': grok_model_profile,
 'cohere': cohere_model_profile,
 'amazon': amazon_model_profile,
 'deepseek': deepseek_model_profile,
 'meta-llama': meta_model_profile,
 'moonshotai': moonshotai_model_profile,
 }
 profile = None
 provider, model_name = model_name.split('/', 1)
 if provider in provider_to_profile:
 model_name, *_ = model_name.split(':', 1) # drop tags
 profile = provider_to_profile[provider](model_name)
 # As OpenRouterProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('OPENROUTER_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `OPENROUTER_API_KEY` environment variable or pass it via `OpenRouterProvider(api_key=...)`'
 'to use the OpenRouter provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='openrouter')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Vercel AI Gateway API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/vercel.py`
```
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
```
| ```
classVercelProvider(Provider[AsyncOpenAI]):
"""Provider for Vercel AI Gateway API."""
 @property
 defname(self) -> str:
 return 'vercel'
 @property
 defbase_url(self) -> str:
 return 'https://ai-gateway.vercel.sh/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile = {
 'anthropic': anthropic_model_profile,
 'bedrock': amazon_model_profile,
 'cohere': cohere_model_profile,
 'deepseek': deepseek_model_profile,
 'mistral': mistral_model_profile,
 'openai': openai_model_profile,
 'vertex': google_model_profile,
 'xai': grok_model_profile,
 }
 profile = None
 try:
 provider, model_name = model_name.split('/', 1)
 except ValueError:
 raise UserError(f"Model name must be in 'provider/model' format, got: {model_name!r}")
 if provider in provider_to_profile:
 profile = provider_to_profile[provider](model_name)
 # As VercelProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(
 json_schema_transformer=OpenAIJsonSchemaTransformer,
 ).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 # Support Vercel AI Gateway's standard environment variables
 api_key = api_key or os.getenv('VERCEL_AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `VERCEL_AI_GATEWAY_API_KEY` or `VERCEL_OIDC_TOKEN` environment variable '
 'or pass the API key via `VercelProvider(api_key=...)` to use the Vercel provider.'
 )
 default_headers = {'http-referer': 'https://ai.pydantic.dev/', 'x-title': 'pydantic-ai'}
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(
 base_url=self.base_url, api_key=api_key, http_client=http_client, default_headers=default_headers
 )
 else:
 http_client = cached_async_http_client(provider='vercel')
 self._client = AsyncOpenAI(
 base_url=self.base_url, api_key=api_key, http_client=http_client, default_headers=default_headers
 )
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncInferenceClient]`
Provider for Hugging Face.
Source code in `pydantic_ai_slim/pydantic_ai/providers/huggingface.py`
```
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
```
| ```
classHuggingFaceProvider(Provider[AsyncInferenceClient]):
"""Provider for Hugging Face."""
 @property
 defname(self) -> str:
 return 'huggingface'
 @property
 defbase_url(self) -> str:
 return self.client.model # type: ignore
 @property
 defclient(self) -> AsyncInferenceClient:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile = {
 'deepseek-ai': deepseek_model_profile,
 'google': google_model_profile,
 'qwen': qwen_model_profile,
 'meta-llama': meta_model_profile,
 'mistralai': mistral_model_profile,
 'moonshotai': moonshotai_model_profile,
 }
 if '/' not in model_name:
 return None
 model_name = model_name.lower()
 provider, model_name = model_name.split('/', 1)
 if provider in provider_to_profile:
 return provider_to_profile[provider](model_name)
 return None
 @overload
 def__init__(self, *, base_url: str, api_key: str | None = None) -> None: ...
 @overload
 def__init__(self, *, provider_name: str, api_key: str | None = None) -> None: ...
 @overload
 def__init__(self, *, hf_client: AsyncInferenceClient, api_key: str | None = None) -> None: ...
 @overload
 def__init__(self, *, hf_client: AsyncInferenceClient, base_url: str, api_key: str | None = None) -> None: ...
 @overload
 def__init__(self, *, hf_client: AsyncInferenceClient, provider_name: str, api_key: str | None = None) -> None: ...
 @overload
 def__init__(self, *, api_key: str | None = None) -> None: ...
 def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 hf_client: AsyncInferenceClient | None = None,
 http_client: AsyncClient | None = None,
 provider_name: str | None = None,
 ) -> None:
"""Create a new Hugging Face provider.
 Args:
 base_url: The base url for the Hugging Face requests.
 api_key: The API key to use for authentication, if not provided, the `HF_TOKEN` environment variable
 will be used if available.
 hf_client: An existing
 [`AsyncInferenceClient`](https://huggingface.co/docs/huggingface_hub/v0.29.3/en/package_reference/inference_client#huggingface_hub.AsyncInferenceClient)
 client to use. If not provided, a new instance will be created.
 http_client: (currently ignored) An existing `httpx.AsyncClient` to use for making HTTP requests.
 provider_name : Name of the provider to use for inference. available providers can be found in the [HF Inference Providers documentation](https://huggingface.co/docs/inference-providers/index#partners).
 defaults to "auto", which will select the first available provider for the model, the first of the providers available for the model, sorted by the user's order in https://hf.co/settings/inference-providers.
 If `base_url` is passed, then `provider_name` is not used.
 """
 api_key = api_key or os.getenv('HF_TOKEN')
 if api_key is None:
 raise UserError(
 'Set the `HF_TOKEN` environment variable or pass it via `HuggingFaceProvider(api_key=...)`'
 'to use the HuggingFace provider.'
 )
 if http_client is not None:
 raise ValueError('`http_client` is ignored for HuggingFace provider, please use `hf_client` instead.')
 if base_url is not None and provider_name is not None:
 raise ValueError('Cannot provide both `base_url` and `provider_name`.')
 if hf_client is None:
 self._client = AsyncInferenceClient(api_key=api_key, provider=provider_name, base_url=base_url) # type: ignore
 else:
 self._client = hf_client
```
---|--- 
### __init__
```
__init__(
 *, base_url: str[](https://docs.python.org/3/library/stdtypes.html#str), api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *, provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str), api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *,
 hf_client: AsyncInferenceClient,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *,
 hf_client: AsyncInferenceClient,
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str),
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *,
 hf_client: AsyncInferenceClient,
 provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(*, api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None) -> None
```
```
__init__(
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 hf_client: AsyncInferenceClient | None = None,
 http_client: AsyncClient | None = None,
 provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
) -> None
```
Create a new Hugging Face provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Hugging Face requests. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `HF_TOKEN` environment variable will be used if available. | `None` 
`hf_client` | `AsyncInferenceClient | None` | An existing [`AsyncInferenceClient`](https://huggingface.co/docs/huggingface_hub/v0.29.3/en/package_reference/inference_client#huggingface_hub.AsyncInferenceClient) client to use. If not provided, a new instance will be created. | `None` 
`http_client` | `AsyncClient | None` | (currently ignored) An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
`provider_name` | | Name of the provider to use for inference. available providers can be found in the [HF Inference Providers documentation](https://huggingface.co/docs/inference-providers/index#partners). defaults to "auto", which will select the first available provider for the model, the first of the providers available for the model, sorted by the user's order in https://hf.co/settings/inference-providers. If `base_url` is passed, then `provider_name` is not used. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/huggingface.py`
```
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
```
| ```
def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 hf_client: AsyncInferenceClient | None = None,
 http_client: AsyncClient | None = None,
 provider_name: str | None = None,
) -> None:
"""Create a new Hugging Face provider.
 Args:
 base_url: The base url for the Hugging Face requests.
 api_key: The API key to use for authentication, if not provided, the `HF_TOKEN` environment variable
 will be used if available.
 hf_client: An existing
 [`AsyncInferenceClient`](https://huggingface.co/docs/huggingface_hub/v0.29.3/en/package_reference/inference_client#huggingface_hub.AsyncInferenceClient)
 client to use. If not provided, a new instance will be created.
 http_client: (currently ignored) An existing `httpx.AsyncClient` to use for making HTTP requests.
 provider_name : Name of the provider to use for inference. available providers can be found in the [HF Inference Providers documentation](https://huggingface.co/docs/inference-providers/index#partners).
 defaults to "auto", which will select the first available provider for the model, the first of the providers available for the model, sorted by the user's order in https://hf.co/settings/inference-providers.
 If `base_url` is passed, then `provider_name` is not used.
 """
 api_key = api_key or os.getenv('HF_TOKEN')
 if api_key is None:
 raise UserError(
 'Set the `HF_TOKEN` environment variable or pass it via `HuggingFaceProvider(api_key=...)`'
 'to use the HuggingFace provider.'
 )
 if http_client is not None:
 raise ValueError('`http_client` is ignored for HuggingFace provider, please use `hf_client` instead.')
 if base_url is not None and provider_name is not None:
 raise ValueError('Cannot provide both `base_url` and `provider_name`.')
 if hf_client is None:
 self._client = AsyncInferenceClient(api_key=api_key, provider=provider_name, base_url=base_url) # type: ignore
 else:
 self._client = hf_client
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for MoonshotAI platform (Kimi models).
Source code in `pydantic_ai_slim/pydantic_ai/providers/moonshotai.py`
```
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
```
| ```
classMoonshotAIProvider(Provider[AsyncOpenAI]):
"""Provider for MoonshotAI platform (Kimi models)."""
 @property
 defname(self) -> str:
 return 'moonshotai'
 @property
 defbase_url(self) -> str:
 # OpenAI-compatible endpoint, see MoonshotAI docs
 return 'https://api.moonshot.ai/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 profile = moonshotai_model_profile(model_name)
 # As the MoonshotAI API is OpenAI-compatible, let's assume we also need OpenAIJsonSchemaTransformer,
 # unless json_schema_transformer is set explicitly.
 # Also, MoonshotAI does not support strict tool definitions
 # https://platform.moonshot.ai/docs/guide/migrating-from-openai-to-kimi#about-tool_choice
 # "Please note that the current version of Kimi API does not support the tool_choice=required parameter."
 return OpenAIModelProfile(
 json_schema_transformer=OpenAIJsonSchemaTransformer,
 openai_supports_tool_choice_required=False,
 supports_json_object_output=True,
 ).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('MOONSHOTAI_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `MOONSHOTAI_API_KEY` environment variable or pass it via '
 '`MoonshotAIProvider(api_key=...)` to use the MoonshotAI provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='moonshotai')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for local or remote Ollama API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/ollama.py`
```
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
```
| ```
classOllamaProvider(Provider[AsyncOpenAI]):
"""Provider for local or remote Ollama API."""
 @property
 defname(self) -> str:
 return 'ollama'
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 prefix_to_profile = {
 'llama': meta_model_profile,
 'gemma': google_model_profile,
 'qwen': qwen_model_profile,
 'qwq': qwen_model_profile,
 'deepseek': deepseek_model_profile,
 'mistral': mistral_model_profile,
 'command': cohere_model_profile,
 'gpt-oss': harmony_model_profile,
 }
 profile = None
 for prefix, profile_func in prefix_to_profile.items():
 model_name = model_name.lower()
 if model_name.startswith(prefix):
 profile = profile_func(model_name)
 # As OllamaProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
"""Create a new Ollama provider.
 Args:
 base_url: The base url for the Ollama requests. If not provided, the `OLLAMA_BASE_URL` environment variable
 will be used if available.
 api_key: The API key to use for authentication, if not provided, the `OLLAMA_API_KEY` environment variable
 will be used if available.
 openai_client: An existing
 [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage)
 client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 if openai_client is not None:
 assert base_url is None, 'Cannot provide both `openai_client` and `base_url`'
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._client = openai_client
 else:
 base_url = base_url or os.getenv('OLLAMA_BASE_URL')
 if not base_url:
 raise UserError(
 'Set the `OLLAMA_BASE_URL` environment variable or pass it via `OllamaProvider(base_url=...)`'
 'to use the Ollama provider.'
 )
 # This is a workaround for the OpenAI client requiring an API key, whilst locally served,
 # openai compatible models do not always need an API key, but a placeholder (non-empty) key is required.
 api_key = api_key or os.getenv('OLLAMA_API_KEY') or 'api-key-not-set'
 if http_client is not None:
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='ollama')
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
```
---|--- 
### __init__
```
__init__(
 base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: AsyncClient | None = None,
) -> None
```
Create a new Ollama provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Ollama requests. If not provided, the `OLLAMA_BASE_URL` environment variable will be used if available. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `OLLAMA_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncOpenAI | None` | An existing [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage) client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/ollama.py`
```
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
```
| ```
def__init__(
 self,
 base_url: str | None = None,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
) -> None:
"""Create a new Ollama provider.
 Args:
 base_url: The base url for the Ollama requests. If not provided, the `OLLAMA_BASE_URL` environment variable
 will be used if available.
 api_key: The API key to use for authentication, if not provided, the `OLLAMA_API_KEY` environment variable
 will be used if available.
 openai_client: An existing
 [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage)
 client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`.
 http_client: An existing `httpx.AsyncClient` to use for making HTTP requests.
 """
 if openai_client is not None:
 assert base_url is None, 'Cannot provide both `openai_client` and `base_url`'
 assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
 assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
 self._client = openai_client
 else:
 base_url = base_url or os.getenv('OLLAMA_BASE_URL')
 if not base_url:
 raise UserError(
 'Set the `OLLAMA_BASE_URL` environment variable or pass it via `OllamaProvider(base_url=...)`'
 'to use the Ollama provider.'
 )
 # This is a workaround for the OpenAI client requiring an API key, whilst locally served,
 # openai compatible models do not always need an API key, but a placeholder (non-empty) key is required.
 api_key = api_key or os.getenv('OLLAMA_API_KEY') or 'api-key-not-set'
 if http_client is not None:
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='ollama')
 self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for LiteLLM API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/litellm.py`
```
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
```
| ```
classLiteLLMProvider(Provider[AsyncOpenAI]):
"""Provider for LiteLLM API."""
 @property
 defname(self) -> str:
 return 'litellm'
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 # Map provider prefixes to their profile functions
 provider_to_profile = {
 'anthropic': anthropic_model_profile,
 'openai': openai_model_profile,
 'google': google_model_profile,
 'mistralai': mistral_model_profile,
 'mistral': mistral_model_profile,
 'cohere': cohere_model_profile,
 'amazon': amazon_model_profile,
 'bedrock': amazon_model_profile,
 'meta-llama': meta_model_profile,
 'meta': meta_model_profile,
 'groq': groq_model_profile,
 'deepseek': deepseek_model_profile,
 'moonshotai': moonshotai_model_profile,
 'x-ai': grok_model_profile,
 'qwen': qwen_model_profile,
 }
 profile = None
 # Check if model name contains a provider prefix (e.g., "anthropic/claude-3")
 if '/' in model_name:
 provider_prefix, model_suffix = model_name.split('/', 1)
 if provider_prefix in provider_to_profile:
 profile = provider_to_profile[provider_prefix](model_suffix)
 # If no profile found, default to OpenAI profile
 if profile is None:
 profile = openai_model_profile(model_name)
 # As LiteLLMProvider is used with OpenAIModel, which uses OpenAIJsonSchemaTransformer,
 # we maintain that behavior
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(
 self,
 *,
 api_key: str | None = None,
 api_base: str | None = None,
 ) -> None: ...
 @overload
 def__init__(
 self,
 *,
 api_key: str | None = None,
 api_base: str | None = None,
 http_client: AsyncHTTPClient,
 ) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 api_base: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: AsyncHTTPClient | None = None,
 ) -> None:
"""Initialize a LiteLLM provider.
 Args:
 api_key: API key for the model provider. If None, LiteLLM will try to get it from environment variables.
 api_base: Base URL for the model provider. Use this for custom endpoints or self-hosted models.
 openai_client: Pre-configured OpenAI client. If provided, other parameters are ignored.
 http_client: Custom HTTP client to use.
 """
 if openai_client is not None:
 self._client = openai_client
 return
 # Create OpenAI client that will be used with LiteLLM's completion function
 # The actual API calls will be intercepted and routed through LiteLLM
 if http_client is not None:
 self._client = AsyncOpenAI(
 base_url=api_base, api_key=api_key or 'litellm-placeholder', http_client=http_client
 )
 else:
 http_client = cached_async_http_client(provider='litellm')
 self._client = AsyncOpenAI(
 base_url=api_base, api_key=api_key or 'litellm-placeholder', http_client=http_client
 )
```
---|--- 
### __init__
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_base: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_base: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 http_client: AsyncClient
) -> None
```
```
__init__(*, openai_client: AsyncOpenAI) -> None
```
```
__init__(
 *,
 api_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 api_base: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: AsyncClient | None = None
) -> None
```
Initialize a LiteLLM provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | API key for the model provider. If None, LiteLLM will try to get it from environment variables. | `None` 
`api_base` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Base URL for the model provider. Use this for custom endpoints or self-hosted models. | `None` 
`openai_client` | `AsyncOpenAI | None` | Pre-configured OpenAI client. If provided, other parameters are ignored. | `None` 
`http_client` | `AsyncClient | None` | Custom HTTP client to use. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/litellm.py`
```
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
```
| ```
def__init__(
 self,
 *,
 api_key: str | None = None,
 api_base: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: AsyncHTTPClient | None = None,
) -> None:
"""Initialize a LiteLLM provider.
 Args:
 api_key: API key for the model provider. If None, LiteLLM will try to get it from environment variables.
 api_base: Base URL for the model provider. Use this for custom endpoints or self-hosted models.
 openai_client: Pre-configured OpenAI client. If provided, other parameters are ignored.
 http_client: Custom HTTP client to use.
 """
 if openai_client is not None:
 self._client = openai_client
 return
 # Create OpenAI client that will be used with LiteLLM's completion function
 # The actual API calls will be intercepted and routed through LiteLLM
 if http_client is not None:
 self._client = AsyncOpenAI(
 base_url=api_base, api_key=api_key or 'litellm-placeholder', http_client=http_client
 )
 else:
 http_client = cached_async_http_client(provider='litellm')
 self._client = AsyncOpenAI(
 base_url=api_base, api_key=api_key or 'litellm-placeholder', http_client=http_client
 )
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Nebius AI Studio API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/nebius.py`
```
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
```
| ```
classNebiusProvider(Provider[AsyncOpenAI]):
"""Provider for Nebius AI Studio API."""
 @property
 defname(self) -> str:
 return 'nebius'
 @property
 defbase_url(self) -> str:
 return 'https://api.studio.nebius.com/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 provider_to_profile = {
 'meta-llama': meta_model_profile,
 'deepseek-ai': deepseek_model_profile,
 'qwen': qwen_model_profile,
 'google': google_model_profile,
 'openai': harmony_model_profile, # used for gpt-oss models on Nebius
 'mistralai': mistral_model_profile,
 'moonshotai': moonshotai_model_profile,
 }
 profile = None
 try:
 model_name = model_name.lower()
 provider, model_name = model_name.split('/', 1)
 except ValueError:
 raise UserError(f"Model name must be in 'provider/model' format, got: {model_name!r}")
 if provider in provider_to_profile:
 profile = provider_to_profile[provider](model_name)
 # As NebiusProvider is always used with OpenAIChatModel, which used to unconditionally use OpenAIJsonSchemaTransformer,
 # we need to maintain that behavior unless json_schema_transformer is set explicitly
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('NEBIUS_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `NEBIUS_API_KEY` environment variable or pass it via '
 '`NebiusProvider(api_key=...)` to use the Nebius AI Studio provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='nebius')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for OVHcloud AI Endpoints.
Source code in `pydantic_ai_slim/pydantic_ai/providers/ovhcloud.py`
```
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
```
| ```
classOVHcloudProvider(Provider[AsyncOpenAI]):
"""Provider for OVHcloud AI Endpoints."""
 @property
 defname(self) -> str:
 return 'ovhcloud'
 @property
 defbase_url(self) -> str:
 return 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1'
 @property
 defclient(self) -> AsyncOpenAI:
 return self._client
 defmodel_profile(self, model_name: str) -> ModelProfile | None:
 model_name = model_name.lower()
 prefix_to_profile = {
 'llama': meta_model_profile,
 'meta-': meta_model_profile,
 'deepseek': deepseek_model_profile,
 'mistral': mistral_model_profile,
 'gpt': harmony_model_profile,
 'qwen': qwen_model_profile,
 }
 profile = None
 for prefix, profile_func in prefix_to_profile.items():
 if model_name.startswith(prefix):
 profile = profile_func(model_name)
 # As the OVHcloud AI Endpoints API is OpenAI-compatible, let's assume we also need OpenAIJsonSchemaTransformer.
 return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)
 @overload
 def__init__(self) -> None: ...
 @overload
 def__init__(self, *, api_key: str) -> None: ...
 @overload
 def__init__(self, *, api_key: str, http_client: httpx.AsyncClient) -> None: ...
 @overload
 def__init__(self, *, openai_client: AsyncOpenAI | None = None) -> None: ...
 def__init__(
 self,
 *,
 api_key: str | None = None,
 openai_client: AsyncOpenAI | None = None,
 http_client: httpx.AsyncClient | None = None,
 ) -> None:
 api_key = api_key or os.getenv('OVHCLOUD_API_KEY')
 if not api_key and openai_client is None:
 raise UserError(
 'Set the `OVHCLOUD_API_KEY` environment variable or pass it via '
 '`OVHcloudProvider(api_key=...)` to use OVHcloud AI Endpoints provider.'
 )
 if openai_client is not None:
 self._client = openai_client
 elif http_client is not None:
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
 else:
 http_client = cached_async_http_client(provider='ovhcloud')
 self._client = AsyncOpenAI(base_url=self.base_url, api_key=api_key, http_client=http_client)
```
---|---, model_name_with_version)
 if version_match:
 model_name = version_match.group(1)
 else:
 model_name = model_name_with_version
 if provider in provider_to_profile:
 return provider_to_profile[provider](model_name)
 return None
 @overload
 def__init__(self, *, bedrock_client: BaseClient) -> None: ...
 @overload
 def__init__(
 self,
 *,
 api_key: str,
 base_url: str | None = None,
 region_name: str | None = None,
 profile_name: str | None = None,
 aws_read_timeout: float | None = None,
 aws_connect_timeout: float | None = None,
 ) -> None: ...
 @overload
 def__init__(
 self,
 *,
 aws_access_key_id: str | None = None,
 aws_secret_access_key: str | None = None,
 aws_session_token: str | None = None,
 base_url: str | None = None,
 region_name: str | None = None,
 profile_name: str | None = None,
 aws_read_timeout: float | None = None,
 aws_connect_timeout: float | None = None,
 ) -> None: ...
 def__init__(
 self,
 *,
 bedrock_client: BaseClient | None = None,
 aws_access_key_id: str | None = None,
 aws_secret_access_key: str | None = None,
 aws_session_token: str | None = None,
 base_url: str | None = None,
 region_name: str | None = None,
 profile_name: str | None = None,
 api_key: str | None = None,
 aws_read_timeout: float | None = None,
 aws_connect_timeout: float | None = None,
 ) -> None:
"""Initialize the Bedrock provider.
 Args:
 bedrock_client: A boto3 client for Bedrock Runtime. If provided, other arguments are ignored.
 aws_access_key_id: The AWS access key ID. If not set, the `AWS_ACCESS_KEY_ID` environment variable will be used if available.
 aws_secret_access_key: The AWS secret access key. If not set, the `AWS_SECRET_ACCESS_KEY` environment variable will be used if available.
 aws_session_token: The AWS session token. If not set, the `AWS_SESSION_TOKEN` environment variable will be used if available.
 api_key: The API key for Bedrock client. Can be used instead of `aws_access_key_id`, `aws_secret_access_key`, and `aws_session_token`. If not set, the `AWS_BEARER_TOKEN_BEDROCK` environment variable will be used if available.
 base_url: The base URL for the Bedrock client.
 region_name: The AWS region name. If not set, the `AWS_DEFAULT_REGION` environment variable will be used if available.
 profile_name: The AWS profile name.
 aws_read_timeout: The read timeout for Bedrock client.
 aws_connect_timeout: The connect timeout for Bedrock client.
 """
 if bedrock_client is not None:
 self._client = bedrock_client
 else:
 read_timeout = aws_read_timeout or float(os.getenv('AWS_READ_TIMEOUT', 300))
 connect_timeout = aws_connect_timeout or float(os.getenv('AWS_CONNECT_TIMEOUT', 60))
 config: dict[str, Any] = {
 'read_timeout': read_timeout,
 'connect_timeout': connect_timeout,
 }
 try:
 if api_key is not None:
 session = boto3.Session(
 botocore_session=_BearerTokenSession(api_key),
 region_name=region_name,
 profile_name=profile_name,
 )
 config['signature_version'] = 'bearer'
 else:
 session = boto3.Session(
 aws_access_key_id=aws_access_key_id,
 aws_secret_access_key=aws_secret_access_key,
 aws_session_token=aws_session_token,
 region_name=region_name,
 profile_name=profile_name,
 )
 self._client = session.client( # type: ignore[reportUnknownMemberType]
 'bedrock-runtime',
 config=Config(**config),
 endpoint_url=base_url,
 )
 except NoRegionError as exc: # pragma: no cover
 raise UserError('You must provide a `region_name` or a boto3 client for Bedrock Runtime.') fromexc
```
---|--- 
#### __init__
__CODE_BLOCK_37__
__CODE_BLOCK_38__
__CODE_BLOCK_39__
__CODE_BLOCK_40__
Initialize the Bedrock provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`bedrock_client` | `BaseClient | None` | A boto3 client for Bedrock Runtime. If provided, other arguments are ignored. | `None` 
`aws_access_key_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS access key ID. If not set, the `AWS_ACCESS_KEY_ID` environment variable will be used if available. | `None` 
`aws_secret_access_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS secret access key. If not set, the `AWS_SECRET_ACCESS_KEY` environment variable will be used if available. | `None` 
`aws_session_token` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS session token. If not set, the `AWS_SESSION_TOKEN` environment variable will be used if available. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key for Bedrock client. Can be used instead of `aws_access_key_id`, `aws_secret_access_key`, and `aws_session_token`. If not set, the `AWS_BEARER_TOKEN_BEDROCK` environment variable will be used if available. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base URL for the Bedrock client. | `None` 
`region_name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS region name. If not set, the `AWS_DEFAULT_REGION` environment variable will be used if available. | `None` 
`profile_name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The AWS profile name. | `None` 
`aws_read_timeout` | `float[](https://docs.python.org/3/library/functions.html#float) | None` | The read timeout for Bedrock client. | `None` 
`aws_connect_timeout` | `float[](https://docs.python.org/3/library/functions.html#float) | None` | The connect timeout for Bedrock client. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/bedrock.py`
__CODE_BLOCK_41__
| __CODE_BLOCK_42__
---|--- 
### groq_moonshotai_model_profile
__CODE_BLOCK_43__
Get the model profile for an MoonshotAI model used with the Groq provider.
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
__CODE_BLOCK_44__
| __CODE_BLOCK_45__
---|--- 
### meta_groq_model_profile
__CODE_BLOCK_46__
Get the model profile for a Meta model used with the Groq provider.
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
__CODE_BLOCK_47__
| __CODE_BLOCK_48__
---|--- 
### GroqProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncGroq]`
Provider for Groq API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
__CODE_BLOCK_49__
| __CODE_BLOCK_50__
---|--- 
#### __init__
__CODE_BLOCK_51__
__CODE_BLOCK_52__
__CODE_BLOCK_53__
Create a new Groq provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `GROQ_API_KEY` environment variable will be used if available. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Groq requests. If not provided, the `GROQ_BASE_URL` environment variable will be used if available. Otherwise, defaults to Groq's base url. | `None` 
`groq_client` | `AsyncGroq | None` | An existing [`AsyncGroq`](https://github.com/groq/groq-python?tab=readme-ov-file#async-usage) client to use. If provided, `api_key` and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `AsyncHTTPClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/groq.py`
__CODE_BLOCK_54__
| __CODE_BLOCK_55__
---|--- 
### AzureProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Azure OpenAI API.
See <https://azure.microsoft.com/en-us/products/ai-foundry> for more information.
Source code in `pydantic_ai_slim/pydantic_ai/providers/azure.py`
__CODE_BLOCK_56__
| __CODE_BLOCK_57__
---|--- 
#### __init__
__CODE_BLOCK_58__
__CODE_BLOCK_59__
__CODE_BLOCK_60__
Create a new Azure provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`azure_endpoint` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The Azure endpoint to use for authentication, if not provided, the `AZURE_OPENAI_ENDPOINT` environment variable will be used if available. | `None` 
`api_version` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API version to use for authentication, if not provided, the `OPENAI_API_VERSION` environment variable will be used if available. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `AZURE_OPENAI_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncAzureOpenAI | None` | An existing [`AsyncAzureOpenAI`](https://github.com/openai/openai-python#microsoft-azure-openai) client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/azure.py`
__CODE_BLOCK_61__
| __CODE_BLOCK_62__
---|--- 
### CohereProvider
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncClientV2]`
Provider for Cohere API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/cohere.py`
__CODE_BLOCK_63__
| __CODE_BLOCK_64__
---|--- 
#### __init__
__CODE_BLOCK_65__
Create a new Cohere provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `CO_API_KEY` environment variable will be used if available. | `None` 
`cohere_client` | `AsyncClientV2 | None` | An existing [AsyncClientV2](https://github.com/cohere-ai/cohere-python) client to use. If provided, `api_key` and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/cohere.py`
__CODE_BLOCK_66__
| __CODE_BLOCK_67__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Cerebras API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/cerebras.py`
__CODE_BLOCK_68__
| __CODE_BLOCK_69__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[Mistral]`
Provider for Mistral API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/mistral.py`
__CODE_BLOCK_70__
| __CODE_BLOCK_71__
---|--- 
### __init__
__CODE_BLOCK_72__
__CODE_BLOCK_73__
__CODE_BLOCK_74__
Create a new Mistral provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `MISTRAL_API_KEY` environment variable will be used if available. | `None` 
`mistral_client` | `Mistral | None` | An existing `Mistral` client to use, if provided, `api_key` and `http_client` must be `None`. | `None` 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Mistral requests. | `None` 
`http_client` | `AsyncClient | None` | An existing async client to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/mistral.py`
__CODE_BLOCK_75__
| __CODE_BLOCK_76__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Fireworks AI API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/fireworks.py`
__CODE_BLOCK_77__
| __CODE_BLOCK_78__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Grok API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/grok.py`
__CODE_BLOCK_79__
| __CODE_BLOCK_80__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Together AI API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/together.py`
__CODE_BLOCK_81__
| __CODE_BLOCK_82__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Heroku API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/heroku.py`
__CODE_BLOCK_83__
| __CODE_BLOCK_84__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for GitHub Models API.
GitHub Models provides access to various AI models through an OpenAI-compatible API. See <https://docs.github.com/en/github-models> for more information.
Source code in `pydantic_ai_slim/pydantic_ai/providers/github.py`
__CODE_BLOCK_85__
| __CODE_BLOCK_86__
---|--- 
### __init__
__CODE_BLOCK_87__
__CODE_BLOCK_88__
__CODE_BLOCK_89__
__CODE_BLOCK_90__
__CODE_BLOCK_91__
Create a new GitHub Models provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The GitHub token to use for authentication. If not provided, the `GITHUB_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncOpenAI | None` | An existing `AsyncOpenAI` client to use. If provided, `api_key` and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/github.py`
__CODE_BLOCK_92__
| __CODE_BLOCK_93__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for OpenRouter API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/openrouter.py`
__CODE_BLOCK_94__
| __CODE_BLOCK_95__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Vercel AI Gateway API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/vercel.py`
__CODE_BLOCK_96__
| __CODE_BLOCK_97__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncInferenceClient]`
Provider for Hugging Face.
Source code in `pydantic_ai_slim/pydantic_ai/providers/huggingface.py`
__CODE_BLOCK_98__
| __CODE_BLOCK_99__
---|--- 
### __init__
__CODE_BLOCK_100__
__CODE_BLOCK_101__
__CODE_BLOCK_102__
__CODE_BLOCK_103__
__CODE_BLOCK_104__
__CODE_BLOCK_105__
__CODE_BLOCK_106__
Create a new Hugging Face provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Hugging Face requests. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `HF_TOKEN` environment variable will be used if available. | `None` 
`hf_client` | `AsyncInferenceClient | None` | An existing [`AsyncInferenceClient`](https://huggingface.co/docs/huggingface_hub/v0.29.3/en/package_reference/inference_client#huggingface_hub.AsyncInferenceClient) client to use. If not provided, a new instance will be created. | `None` 
`http_client` | `AsyncClient | None` | (currently ignored) An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
`provider_name` | | Name of the provider to use for inference. available providers can be found in the [HF Inference Providers documentation](https://huggingface.co/docs/inference-providers/index#partners). defaults to "auto", which will select the first available provider for the model, the first of the providers available for the model, sorted by the user's order in https://hf.co/settings/inference-providers. If `base_url` is passed, then `provider_name` is not used. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/huggingface.py`
__CODE_BLOCK_107__
| __CODE_BLOCK_108__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for MoonshotAI platform (Kimi models).
Source code in `pydantic_ai_slim/pydantic_ai/providers/moonshotai.py`
__CODE_BLOCK_109__
| __CODE_BLOCK_110__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for local or remote Ollama API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/ollama.py`
__CODE_BLOCK_111__
| __CODE_BLOCK_112__
---|--- 
### __init__
__CODE_BLOCK_113__
Create a new Ollama provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`base_url` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The base url for the Ollama requests. If not provided, the `OLLAMA_BASE_URL` environment variable will be used if available. | `None` 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The API key to use for authentication, if not provided, the `OLLAMA_API_KEY` environment variable will be used if available. | `None` 
`openai_client` | `AsyncOpenAI | None` | An existing [`AsyncOpenAI`](https://github.com/openai/openai-python?tab=readme-ov-file#async-usage) client to use. If provided, `base_url`, `api_key`, and `http_client` must be `None`. | `None` 
`http_client` | `AsyncClient | None` | An existing `httpx.AsyncClient` to use for making HTTP requests. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/ollama.py`
__CODE_BLOCK_114__
| __CODE_BLOCK_115__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for LiteLLM API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/litellm.py`
__CODE_BLOCK_116__
| __CODE_BLOCK_117__
---|--- 
### __init__
__CODE_BLOCK_118__
__CODE_BLOCK_119__
__CODE_BLOCK_120__
__CODE_BLOCK_121__
Initialize a LiteLLM provider.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | API key for the model provider. If None, LiteLLM will try to get it from environment variables. | `None` 
`api_base` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Base URL for the model provider. Use this for custom endpoints or self-hosted models. | `None` 
`openai_client` | `AsyncOpenAI | None` | Pre-configured OpenAI client. If provided, other parameters are ignored. | `None` 
`http_client` | `AsyncClient | None` | Custom HTTP client to use. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/providers/litellm.py`
__CODE_BLOCK_122__
| __CODE_BLOCK_123__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for Nebius AI Studio API.
Source code in `pydantic_ai_slim/pydantic_ai/providers/nebius.py`
__CODE_BLOCK_124__
| __CODE_BLOCK_125__
---|--- 
Bases: `Provider[](#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]`
Provider for OVHcloud AI Endpoints.
Source code in `pydantic_ai_slim/pydantic_ai/providers/ovhcloud.py`
__CODE_BLOCK_126__
| __CODE_BLOCK_127__
---|---