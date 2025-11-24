[ Skip to content ](#pydantic_aimessages)
# `pydantic_ai.messages`
The structure of [`ModelMessage`](#pydantic_ai.messages.ModelMessage) can be shown as a graph:
```
graph RL
 SystemPromptPart(SystemPromptPart) --- ModelRequestPart
 UserPromptPart(UserPromptPart) --- ModelRequestPart
 ToolReturnPart(ToolReturnPart) --- ModelRequestPart
 RetryPromptPart(RetryPromptPart) --- ModelRequestPart
 TextPart(TextPart) --- ModelResponsePart
 ToolCallPart(ToolCallPart) --- ModelResponsePart
 ThinkingPart(ThinkingPart) --- ModelResponsePart
 ModelRequestPart("ModelRequestPart<br>(Union)") --- ModelRequest
 ModelRequest("ModelRequest(parts=list[...])") --- ModelMessage
 ModelResponsePart("ModelResponsePart<br>(Union)") --- ModelResponse
 ModelResponse("ModelResponse(parts=list[...])") --- ModelMessage("ModelMessage<br>(Union)")
```
### FinishReason `module-attribute`
```
FinishReason: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "stop", "length", "content_filter", "tool_call", "error"
]
```
Reason the model finished generating the response, normalized to OpenTelemetry values.
### SystemPromptPart `dataclass`
A system prompt, generally written by the application developer.
This gives the model context and guidance on how to respond.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
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
```
| ```
@dataclass(repr=False)
classSystemPromptPart:
"""A system prompt, generally written by the application developer.
 This gives the model context and guidance on how to respond.
 """
 content: str
"""The content of the prompt."""
 _: KW_ONLY
 timestamp: datetime = field(default_factory=_now_utc)
"""The timestamp of the prompt."""
 dynamic_ref: str | None = None
"""The ref of the dynamic system prompt function that generated this part.
 Only set if system prompt is dynamic, see [`system_prompt`][pydantic_ai.Agent.system_prompt] for more information.
 """
 part_kind: Literal['system-prompt'] = 'system-prompt'
"""Part type identifier, this is available on all parts as a discriminator."""
 defotel_event(self, settings: InstrumentationSettings) -> Event:
 return Event(
 'gen_ai.system.message',
 body={'role': 'system', **({'content': self.content} if settings.include_content else {})},
 )
 defotel_message_parts(self, settings: InstrumentationSettings) -> list[_otel_messages.MessagePart]:
 return [_otel_messages.TextPart(type='text', **{'content': self.content} if settings.include_content else {})]
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The content of the prompt.
#### timestamp `class-attribute` `instance-attribute`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=now_utc)
```
The timestamp of the prompt.
#### dynamic_ref `class-attribute` `instance-attribute`
```
dynamic_ref: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The ref of the dynamic system prompt function that generated this part.
Only set if system prompt is dynamic, see [`system_prompt`](../agent/#pydantic_ai.agent.Agent.system_prompt) for more information.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['system-prompt'] = 'system-prompt'
```
Part type identifier, this is available on all parts as a discriminator.
### FileUrl `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
Abstract base class for any URL-based file.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
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
```
| ```
@dataclass(init=False, repr=False)
classFileUrl(ABC):
"""Abstract base class for any URL-based file."""
 url: str
"""The URL of the file."""
 _: KW_ONLY
 force_download: bool = False
"""For OpenAI and Google APIs it:
 * If True, the file is downloaded and the data is sent to the model as bytes.
 * If False, the URL is sent directly to the model and no download is performed.
 """
 vendor_metadata: dict[str, Any] | None = None
"""Vendor-specific metadata for the file.
 Supported by:
 - `GoogleModel`: `VideoUrl.vendor_metadata` is used as `video_metadata`: https://ai.google.dev/gemini-api/docs/video-understanding#customize-video-processing
 - `OpenAIChatModel`, `OpenAIResponsesModel`: `ImageUrl.vendor_metadata['detail']` is used as `detail` setting for images
 """
 _media_type: Annotated[str | None, pydantic.Field(alias='media_type', default=None, exclude=True)] = field(
 compare=False, default=None
 )
 _identifier: Annotated[str | None, pydantic.Field(alias='identifier', default=None, exclude=True)] = field(
 compare=False, default=None
 )
 def__init__(
 self,
 url: str,
 *,
 media_type: str | None = None,
 identifier: str | None = None,
 force_download: bool = False,
 vendor_metadata: dict[str, Any] | None = None,
 ) -> None:
 self.url = url
 self._media_type = media_type
 self._identifier = identifier
 self.force_download = force_download
 self.vendor_metadata = vendor_metadata
 @pydantic.computed_field
 @property
 defmedia_type(self) -> str:
"""Return the media type of the file, based on the URL or the provided `media_type`."""
 return self._media_type or self._infer_media_type()
 @pydantic.computed_field
 @property
 defidentifier(self) -> str:
"""The identifier of the file, such as a unique ID.
 This identifier can be provided to the model in a message to allow it to refer to this file in a tool call argument,
 and the tool can look up the file in question by iterating over the message history and finding the matching `FileUrl`.
 This identifier is only automatically passed to the model when the `FileUrl` is returned by a tool.
 If you're passing the `FileUrl` as a user message, it's up to you to include a separate text part with the identifier,
 e.g. "This is file <identifier>:" preceding the `FileUrl`.
 It's also included in inline-text delimiters for providers that require inlining text documents, so the model can
 distinguish multiple files.
 """
 return self._identifier or _multi_modal_content_identifier(self.url)
 @abstractmethod
 def_infer_media_type(self) -> str:
"""Infer the media type of the file based on the URL."""
 raise NotImplementedError
 @property
 @abstractmethod
 defformat(self) -> str:
"""The file format."""
 raise NotImplementedError
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str) = url
```
The URL of the file.
#### force_download `class-attribute` `instance-attribute`
```
force_download: bool[](https://docs.python.org/3/library/functions.html#bool) = force_download
```
For OpenAI and Google APIs it:
 * If True, the file is downloaded and the data is sent to the model as bytes.
 * If False, the URL is sent directly to the model and no download is performed.
#### vendor_metadata `class-attribute` `instance-attribute`
```
vendor_metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = vendor_metadata
```
Vendor-specific metadata for the file.
Supported by: - `GoogleModel`: `VideoUrl.vendor_metadata` is used as `video_metadata`: https://ai.google.dev/gemini-api/docs/video-understanding#customize-video-processing - `OpenAIChatModel`, `OpenAIResponsesModel`: `ImageUrl.vendor_metadata['detail']` is used as `detail` setting for images
#### media_type `property`
```
media_type: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return the media type of the file, based on the URL or the provided `media_type`.
#### identifier `property`
```
identifier: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The identifier of the file, such as a unique ID.
This identifier can be provided to the model in a message to allow it to refer to this file in a tool call argument, and the tool can look up the file in question by iterating over the message history and finding the matching `FileUrl`.
This identifier is only automatically passed to the model when the `FileUrl` is returned by a tool. If you're passing the `FileUrl` as a user message, it's up to you to include a separate text part with the identifier, e.g. "This is file :" preceding the `FileUrl`.
It's also included in inline-text delimiters for providers that require inlining text documents, so the model can distinguish multiple files.
#### format `abstractmethod` `property`
```
format: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The file format.
### VideoUrl `dataclass`
Bases: `FileUrl[](#pydantic_ai.messages.FileUrl "pydantic_ai.messages.FileUrl")`
A URL to a video.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
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
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
```
| ```
@dataclass(init=False, repr=False)
classVideoUrl(FileUrl):
"""A URL to a video."""
 url: str
"""The URL of the video."""
 _: KW_ONLY
 kind: Literal['video-url'] = 'video-url'
"""Type identifier, this is available on all parts as a discriminator."""
 def__init__(
 self,
 url: str,
 *,
 media_type: str | None = None,
 identifier: str | None = None,
 force_download: bool = False,
 vendor_metadata: dict[str, Any] | None = None,
 kind: Literal['video-url'] = 'video-url',
 # Required for inline-snapshot which expects all dataclass `__init__` methods to take all field names as kwargs.
 _media_type: str | None = None,
 _identifier: str | None = None,
 ) -> None:
 super().__init__(
 url=url,
 force_download=force_download,
 vendor_metadata=vendor_metadata,
 media_type=media_type or _media_type,
 identifier=identifier or _identifier,
 )
 self.kind = kind
 def_infer_media_type(self) -> VideoMediaType:
"""Return the media type of the video, based on the url."""
 if self.url.endswith('.mkv'):
 return 'video/x-matroska'
 elif self.url.endswith('.mov'):
 return 'video/quicktime'
 elif self.url.endswith('.mp4'):
 return 'video/mp4'
 elif self.url.endswith('.webm'):
 return 'video/webm'
 elif self.url.endswith('.flv'):
 return 'video/x-flv'
 elif self.url.endswith(('.mpeg', '.mpg')):
 return 'video/mpeg'
 elif self.url.endswith('.wmv'):
 return 'video/x-ms-wmv'
 elif self.url.endswith('.three_gp'):
 return 'video/3gpp'
 # Assume that YouTube videos are mp4 because there would be no extension
 # to infer from. This should not be a problem, as Gemini disregards media
 # type for YouTube URLs.
 elif self.is_youtube:
 return 'video/mp4'
 else:
 raise ValueError(
 f'Could not infer media type from video URL: {self.url}. Explicitly provide a `media_type` instead.'
 )
 @property
 defis_youtube(self) -> bool:
"""True if the URL has a YouTube domain."""
 return self.url.startswith(('https://youtu.be/', 'https://youtube.com/', 'https://www.youtube.com/'))
 @property
 defformat(self) -> VideoFormat:
"""The file format of the video.
 The choice of supported formats were based on the Bedrock Converse API. Other APIs don't require to use a format.
 """
 return _video_format_lookup[self.media_type]
```
---|--- 
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL of the video.
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['video-url'] = kind
```
Type identifier, this is available on all parts as a discriminator.
#### is_youtube `property`
```
is_youtube: bool[](https://docs.python.org/3/library/functions.html#bool)
```
True if the URL has a YouTube domain.
#### format `property`
```
format: VideoFormat
```
The file format of the video.
The choice of supported formats were based on the Bedrock Converse API. Other APIs don't require to use a format.
### AudioUrl `dataclass`
Bases: `FileUrl[](#pydantic_ai.messages.FileUrl "pydantic_ai.messages.FileUrl")`
A URL to an audio file.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
```
| ```
@dataclass(init=False, repr=False)
classAudioUrl(FileUrl):
"""A URL to an audio file."""
 url: str
"""The URL of the audio file."""
 _: KW_ONLY
 kind: Literal['audio-url'] = 'audio-url'
"""Type identifier, this is available on all parts as a discriminator."""
 def__init__(
 self,
 url: str,
 *,
 media_type: str | None = None,
 identifier: str | None = None,
 force_download: bool = False,
 vendor_metadata: dict[str, Any] | None = None,
 kind: Literal['audio-url'] = 'audio-url',
 # Required for inline-snapshot which expects all dataclass `__init__` methods to take all field names as kwargs.
 _media_type: str | None = None,
 _identifier: str | None = None,
 ) -> None:
 super().__init__(
 url=url,
 force_download=force_download,
 vendor_metadata=vendor_metadata,
 media_type=media_type or _media_type,
 identifier=identifier or _identifier,
 )
 self.kind = kind
 def_infer_media_type(self) -> AudioMediaType:
"""Return the media type of the audio file, based on the url.
 References:
 - Gemini: https://ai.google.dev/gemini-api/docs/audio#supported-formats
 """
 if self.url.endswith('.mp3'):
 return 'audio/mpeg'
 if self.url.endswith('.wav'):
 return 'audio/wav'
 if self.url.endswith('.flac'):
 return 'audio/flac'
 if self.url.endswith('.oga'):
 return 'audio/ogg'
 if self.url.endswith('.aiff'):
 return 'audio/aiff'
 if self.url.endswith('.aac'):
 return 'audio/aac'
 raise ValueError(
 f'Could not infer media type from audio URL: {self.url}. Explicitly provide a `media_type` instead.'
 )
 @property
 defformat(self) -> AudioFormat:
"""The file format of the audio file."""
 return _audio_format_lookup[self.media_type]
```
---|--- 
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL of the audio file.
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['audio-url'] = kind
```
Type identifier, this is available on all parts as a discriminator.
#### format `property`
```
format: AudioFormat
```
The file format of the audio file.
### ImageUrl `dataclass`
Bases: `FileUrl[](#pydantic_ai.messages.FileUrl "pydantic_ai.messages.FileUrl")`
A URL to an image.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
```
| ```
@dataclass(init=False, repr=False)
classImageUrl(FileUrl):
"""A URL to an image."""
 url: str
"""The URL of the image."""
 _: KW_ONLY
 kind: Literal['image-url'] = 'image-url'
"""Type identifier, this is available on all parts as a discriminator."""
 def__init__(
 self,
 url: str,
 *,
 media_type: str | None = None,
 identifier: str | None = None,
 force_download: bool = False,
 vendor_metadata: dict[str, Any] | None = None,
 kind: Literal['image-url'] = 'image-url',
 # Required for inline-snapshot which expects all dataclass `__init__` methods to take all field names as kwargs.
 _media_type: str | None = None,
 _identifier: str | None = None,
 ) -> None:
 super().__init__(
 url=url,
 force_download=force_download,
 vendor_metadata=vendor_metadata,
 media_type=media_type or _media_type,
 identifier=identifier or _identifier,
 )
 self.kind = kind
 def_infer_media_type(self) -> ImageMediaType:
"""Return the media type of the image, based on the url."""
 if self.url.endswith(('.jpg', '.jpeg')):
 return 'image/jpeg'
 elif self.url.endswith('.png'):
 return 'image/png'
 elif self.url.endswith('.gif'):
 return 'image/gif'
 elif self.url.endswith('.webp'):
 return 'image/webp'
 else:
 raise ValueError(
 f'Could not infer media type from image URL: {self.url}. Explicitly provide a `media_type` instead.'
 )
 @property
 defformat(self) -> ImageFormat:
"""The file format of the image.
 The choice of supported formats were based on the Bedrock Converse API. Other APIs don't require to use a format.
 """
 return _image_format_lookup[self.media_type]
```
---|--- 
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL of the image.
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['image-url'] = kind
```
Type identifier, this is available on all parts as a discriminator.
#### format `property`
```
format: ImageFormat
```
The file format of the image.
The choice of supported formats were based on the Bedrock Converse API. Other APIs don't require to use a format.
### DocumentUrl `dataclass`
Bases: `FileUrl[](#pydantic_ai.messages.FileUrl "pydantic_ai.messages.FileUrl")`
The URL of the document.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
```
| ```
@dataclass(init=False, repr=False)
classDocumentUrl(FileUrl):
"""The URL of the document."""
 url: str
"""The URL of the document."""
 _: KW_ONLY
 kind: Literal['document-url'] = 'document-url'
"""Type identifier, this is available on all parts as a discriminator."""
 def__init__(
 self,
 url: str,
 *,
 media_type: str | None = None,
 identifier: str | None = None,
 force_download: bool = False,
 vendor_metadata: dict[str, Any] | None = None,
 kind: Literal['document-url'] = 'document-url',
 # Required for inline-snapshot which expects all dataclass `__init__` methods to take all field names as kwargs.
 _media_type: str | None = None,
 _identifier: str | None = None,
 ) -> None:
 super().__init__(
 url=url,
 force_download=force_download,
 vendor_metadata=vendor_metadata,
 media_type=media_type or _media_type,
 identifier=identifier or _identifier,
 )
 self.kind = kind
 def_infer_media_type(self) -> str:
"""Return the media type of the document, based on the url."""
 # Common document types are hardcoded here as mime-type support for these
 # extensions varies across operating systems.
 if self.url.endswith(('.md', '.mdx', '.markdown')):
 return 'text/markdown'
 elif self.url.endswith('.asciidoc'):
 return 'text/x-asciidoc'
 elif self.url.endswith('.txt'):
 return 'text/plain'
 elif self.url.endswith('.pdf'):
 return 'application/pdf'
 elif self.url.endswith('.rtf'):
 return 'application/rtf'
 elif self.url.endswith('.docx'):
 return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
 elif self.url.endswith('.xlsx'):
 return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
 type_, _ = guess_type(self.url)
 if type_ is None:
 raise ValueError(
 f'Could not infer media type from document URL: {self.url}. Explicitly provide a `media_type` instead.'
 )
 return type_
 @property
 defformat(self) -> DocumentFormat:
"""The file format of the document.
 The choice of supported formats were based on the Bedrock Converse API. Other APIs don't require to use a format.
 """
 media_type = self.media_type
 try:
 return _document_format_lookup[media_type]
 except KeyError as e:
 raise ValueError(f'Unknown document media type: {media_type}') frome
```
---|--- 
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL of the document.
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['document-url'] = kind
```
Type identifier, this is available on all parts as a discriminator.
#### format `property`
```
format: DocumentFormat
```
The file format of the document.
The choice of supported formats were based on the Bedrock Converse API. Other APIs don't require to use a format.
### BinaryContent `dataclass`
Binary content, e.g. an audio or image file.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
```
| ```
@dataclass(init=False, repr=False)
classBinaryContent:
"""Binary content, e.g. an audio or image file."""
 data: bytes
"""The binary data."""
 _: KW_ONLY
 media_type: AudioMediaType | ImageMediaType | DocumentMediaType | str
"""The media type of the binary data."""
 vendor_metadata: dict[str, Any] | None = None
"""Vendor-specific metadata for the file.
 Supported by:
 - `GoogleModel`: `BinaryContent.vendor_metadata` is used as `video_metadata`: https://ai.google.dev/gemini-api/docs/video-understanding#customize-video-processing
 - `OpenAIChatModel`, `OpenAIResponsesModel`: `BinaryContent.vendor_metadata['detail']` is used as `detail` setting for images
 """
 _identifier: Annotated[str | None, pydantic.Field(alias='identifier', default=None, exclude=True)] = field(
 compare=False, default=None, repr=False
 )
 kind: Literal['binary'] = 'binary'
"""Type identifier, this is available on all parts as a discriminator."""
 def__init__(
 self,
 data: bytes,
 *,
 media_type: AudioMediaType | ImageMediaType | DocumentMediaType | str,
 identifier: str | None = None,
 vendor_metadata: dict[str, Any] | None = None,
 kind: Literal['binary'] = 'binary',
 # Required for inline-snapshot which expects all dataclass `__init__` methods to take all field names as kwargs.
 _identifier: str | None = None,
 ) -> None:
 self.data = data
 self.media_type = media_type
 self._identifier = identifier or _identifier
 self.vendor_metadata = vendor_metadata
 self.kind = kind
 @staticmethod
 defnarrow_type(bc: BinaryContent) -> BinaryContent | BinaryImage:
"""Narrow the type of the `BinaryContent` to `BinaryImage` if it's an image."""
 if bc.is_image:
 return BinaryImage(
 data=bc.data,
 media_type=bc.media_type,
 identifier=bc.identifier,
 vendor_metadata=bc.vendor_metadata,
 )
 else:
 return bc
 @classmethod
 deffrom_data_uri(cls, data_uri: str) -> BinaryContent:
"""Create a `BinaryContent` from a data URI."""
 prefix = 'data:'
 if not data_uri.startswith(prefix):
 raise ValueError('Data URI must start with "data:"')
 media_type, data = data_uri[len(prefix) :].split(';base64,', 1)
 return cls.narrow_type(cls(data=base64.b64decode(data), media_type=media_type))
 @pydantic.computed_field
 @property
 defidentifier(self) -> str:
"""Identifier for the binary content, such as a unique ID.
 This identifier can be provided to the model in a message to allow it to refer to this file in a tool call argument,
 and the tool can look up the file in question by iterating over the message history and finding the matching `BinaryContent`.
 This identifier is only automatically passed to the model when the `BinaryContent` is returned by a tool.
 If you're passing the `BinaryContent` as a user message, it's up to you to include a separate text part with the identifier,
 e.g. "This is file <identifier>:" preceding the `BinaryContent`.
 It's also included in inline-text delimiters for providers that require inlining text documents, so the model can
 distinguish multiple files.
 """
 return self._identifier or _multi_modal_content_identifier(self.data)
 @property
 defdata_uri(self) -> str:
"""Convert the `BinaryContent` to a data URI."""
 return f'data:{self.media_type};base64,{base64.b64encode(self.data).decode()}'
 @property
 defis_audio(self) -> bool:
"""Return `True` if the media type is an audio type."""
 return self.media_type.startswith('audio/')
 @property
 defis_image(self) -> bool:
"""Return `True` if the media type is an image type."""
 return self.media_type.startswith('image/')
 @property
 defis_video(self) -> bool:
"""Return `True` if the media type is a video type."""
 return self.media_type.startswith('video/')
 @property
 defis_document(self) -> bool:
"""Return `True` if the media type is a document type."""
 return self.media_type in _document_format_lookup
 @property
 defformat(self) -> str:
"""The file format of the binary content."""
 try:
 if self.is_audio:
 return _audio_format_lookup[self.media_type]
 elif self.is_image:
 return _image_format_lookup[self.media_type]
 elif self.is_video:
 return _video_format_lookup[self.media_type]
 else:
 return _document_format_lookup[self.media_type]
 except KeyError as e:
 raise ValueError(f'Unknown media type: {self.media_type}') frome
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### data `instance-attribute`
```
data: bytes[](https://docs.python.org/3/library/stdtypes.html#bytes) = data
```
The binary data.
#### media_type `instance-attribute`
```
media_type: (
 AudioMediaType
 | ImageMediaType
 | DocumentMediaType
 | str[](https://docs.python.org/3/library/stdtypes.html#str)
) = media_type
```
The media type of the binary data.
#### vendor_metadata `class-attribute` `instance-attribute`
```
vendor_metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = vendor_metadata
```
Vendor-specific metadata for the file.
Supported by: - `GoogleModel`: `BinaryContent.vendor_metadata` is used as `video_metadata`: https://ai.google.dev/gemini-api/docs/video-understanding#customize-video-processing - `OpenAIChatModel`, `OpenAIResponsesModel`: `BinaryContent.vendor_metadata['detail']` is used as `detail` setting for images
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['binary'] = kind
```
Type identifier, this is available on all parts as a discriminator.
#### narrow_type `staticmethod`
```
narrow_type(
 bc: BinaryContent[](#pydantic_ai.messages.BinaryContent "pydantic_ai.messages.BinaryContent"),
) -> BinaryContent[](#pydantic_ai.messages.BinaryContent "pydantic_ai.messages.BinaryContent") | BinaryImage[](#pydantic_ai.messages.BinaryImage "pydantic_ai.messages.BinaryImage")
```
Narrow the type of the `BinaryContent` to `BinaryImage` if it's an image.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
506
507
508
509
510
511
512
513
514
515
516
517
```
| ```
@staticmethod
defnarrow_type(bc: BinaryContent) -> BinaryContent | BinaryImage:
"""Narrow the type of the `BinaryContent` to `BinaryImage` if it's an image."""
 if bc.is_image:
 return BinaryImage(
 data=bc.data,
 media_type=bc.media_type,
 identifier=bc.identifier,
 vendor_metadata=bc.vendor_metadata,
 )
 else:
 return bc
```
---|--- 
#### from_data_uri `classmethod`
```
from_data_uri(data_uri: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> BinaryContent[](#pydantic_ai.messages.BinaryContent "pydantic_ai.messages.BinaryContent")
```
Create a `BinaryContent` from a data URI.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
519
520
521
522
523
524
525
526
```
| ```
@classmethod
deffrom_data_uri(cls, data_uri: str) -> BinaryContent:
"""Create a `BinaryContent` from a data URI."""
 prefix = 'data:'
 if not data_uri.startswith(prefix):
 raise ValueError('Data URI must start with "data:"')
 media_type, data = data_uri[len(prefix) :].split(';base64,', 1)
 return cls.narrow_type(cls(data=base64.b64decode(data), media_type=media_type))
```
---|--- 
#### identifier `property`
```
identifier: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Identifier for the binary content, such as a unique ID.
This identifier can be provided to the model in a message to allow it to refer to this file in a tool call argument, and the tool can look up the file in question by iterating over the message history and finding the matching `BinaryContent`.
This identifier is only automatically passed to the model when the `BinaryContent` is returned by a tool. If you're passing the `BinaryContent` as a user message, it's up to you to include a separate text part with the identifier, e.g. "This is file :" preceding the `BinaryContent`.
It's also included in inline-text delimiters for providers that require inlining text documents, so the model can distinguish multiple files.
#### data_uri `property`
```
data_uri: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Convert the `BinaryContent` to a data URI.
#### is_audio `property`
```
is_audio: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the media type is an audio type.
#### is_image `property`
```
is_image: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the media type is an image type.
#### is_video `property`
```
is_video: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the media type is a video type.
#### is_document `property`
```
is_document: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the media type is a document type.
#### format `property`
```
format: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The file format of the binary content.
### BinaryImage
Bases: `BinaryContent[](#pydantic_ai.messages.BinaryContent "pydantic_ai.messages.BinaryContent")`
Binary content that's guaranteed to be an image.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
```
| ```
classBinaryImage(BinaryContent):
"""Binary content that's guaranteed to be an image."""
 def__init__(
 self,
 data: bytes,
 *,
 media_type: str,
 identifier: str | None = None,
 vendor_metadata: dict[str, Any] | None = None,
 # Required for inline-snapshot which expects all dataclass `__init__` methods to take all field names as kwargs.
 kind: Literal['binary'] = 'binary',
 _identifier: str | None = None,
 ):
 super().__init__(
 data=data, media_type=media_type, identifier=identifier or _identifier, vendor_metadata=vendor_metadata
 )
 if not self.is_image:
 raise ValueError('`BinaryImage` must be have a media type that starts with "image/"') # pragma: no cover
```
---|--- 
### ToolReturn `dataclass`
A structured return value for tools that need to provide both a return value and custom content to the model.
This class allows tools to return complex responses that include: - A return value for actual tool return - Custom content (including multi-modal content) to be sent to the model as a UserPromptPart - Optional metadata for application use
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
```
| ```
@dataclass(repr=False)
classToolReturn:
"""A structured return value for tools that need to provide both a return value and custom content to the model.
 This class allows tools to return complex responses that include:
 - A return value for actual tool return
 - Custom content (including multi-modal content) to be sent to the model as a UserPromptPart
 - Optional metadata for application use
 """
 return_value: Any
"""The return value to be used in the tool response."""
 _: KW_ONLY
 content: str | Sequence[UserContent] | None = None
"""The content to be sent to the model as a UserPromptPart."""
 metadata: Any = None
"""Additional data that can be accessed programmatically by the application but is not sent to the LLM."""
 kind: Literal['tool-return'] = 'tool-return'
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### return_value `instance-attribute`
```
return_value: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
The return value to be used in the tool response.
#### content `class-attribute` `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None
```
The content to be sent to the model as a UserPromptPart.
#### metadata `class-attribute` `instance-attribute`
```
metadata: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any") = None
```
Additional data that can be accessed programmatically by the application but is not sent to the LLM.
### UserPromptPart `dataclass`
A user prompt, generally written by the end user.
Content comes from the `user_prompt` parameter of [`Agent.run`](../agent/#pydantic_ai.agent.AbstractAgent.run), [`Agent.run_sync`](../agent/#pydantic_ai.agent.AbstractAgent.run_sync), and [`Agent.run_stream`](../agent/#pydantic_ai.agent.AbstractAgent.run_stream).
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
```
| ```
@dataclass(repr=False)
classUserPromptPart:
"""A user prompt, generally written by the end user.
 Content comes from the `user_prompt` parameter of [`Agent.run`][pydantic_ai.agent.AbstractAgent.run],
 [`Agent.run_sync`][pydantic_ai.agent.AbstractAgent.run_sync], and [`Agent.run_stream`][pydantic_ai.agent.AbstractAgent.run_stream].
 """
 content: str | Sequence[UserContent]
"""The content of the prompt."""
 _: KW_ONLY
 timestamp: datetime = field(default_factory=_now_utc)
"""The timestamp of the prompt."""
 part_kind: Literal['user-prompt'] = 'user-prompt'
"""Part type identifier, this is available on all parts as a discriminator."""
 defotel_event(self, settings: InstrumentationSettings) -> Event:
 content = [{'kind': part.pop('type'), **part} for part in self.otel_message_parts(settings)]
 for part in content:
 if part['kind'] == 'binary' and 'content' in part:
 part['binary_content'] = part.pop('content')
 content = [
 part['content'] if part == {'kind': 'text', 'content': part.get('content')} else part for part in content
 ]
 if content in ([{'kind': 'text'}], [self.content]):
 content = content[0]
 return Event('gen_ai.user.message', body={'content': content, 'role': 'user'})
 defotel_message_parts(self, settings: InstrumentationSettings) -> list[_otel_messages.MessagePart]:
 parts: list[_otel_messages.MessagePart] = []
 content: Sequence[UserContent] = [self.content] if isinstance(self.content, str) else self.content
 for part in content:
 if isinstance(part, str):
 parts.append(
 _otel_messages.TextPart(type='text', **({'content': part} if settings.include_content else {}))
 )
 elif isinstance(part, ImageUrl | AudioUrl | DocumentUrl | VideoUrl):
 parts.append(
 _otel_messages.MediaUrlPart(
 type=part.kind,
 **{'url': part.url} if settings.include_content else {},
 )
 )
 elif isinstance(part, BinaryContent):
 converted_part = _otel_messages.BinaryDataPart(type='binary', media_type=part.media_type)
 if settings.include_content and settings.include_binary_content:
 converted_part['content'] = base64.b64encode(part.data).decode()
 parts.append(converted_part)
 else:
 parts.append({'type': part.kind}) # pragma: no cover
 return parts
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent]
```
The content of the prompt.
#### timestamp `class-attribute` `instance-attribute`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=now_utc)
```
The timestamp of the prompt.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['user-prompt'] = 'user-prompt'
```
Part type identifier, this is available on all parts as a discriminator.
### BaseToolReturnPart `dataclass`
Base class for tool return parts.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
```
| ```
@dataclass(repr=False)
classBaseToolReturnPart:
"""Base class for tool return parts."""
 tool_name: str
"""The name of the "tool" was called."""
 content: Any
"""The return value."""
 tool_call_id: str = field(default_factory=_generate_tool_call_id)
"""The tool call identifier, this is used by some models including OpenAI.
 In case the tool call id is not provided by the model, Pydantic AI will generate a random one.
 """
 _: KW_ONLY
 metadata: Any = None
"""Additional data that can be accessed programmatically by the application but is not sent to the LLM."""
 timestamp: datetime = field(default_factory=_now_utc)
"""The timestamp, when the tool returned."""
 defmodel_response_str(self) -> str:
"""Return a string representation of the content for the model."""
 if isinstance(self.content, str):
 return self.content
 else:
 return tool_return_ta.dump_json(self.content).decode()
 defmodel_response_object(self) -> dict[str, Any]:
"""Return a dictionary representation of the content, wrapping non-dict types appropriately."""
 # gemini supports JSON dict return values, but no other JSON types, hence we wrap anything else in a dict
 if isinstance(self.content, dict):
 return tool_return_ta.dump_python(self.content, mode='json') # pyright: ignore[reportUnknownMemberType]
 else:
 return {'return_value': tool_return_ta.dump_python(self.content, mode='json')}
 defotel_event(self, settings: InstrumentationSettings) -> Event:
 return Event(
 'gen_ai.tool.message',
 body={
 **({'content': self.content} if settings.include_content else {}),
 'role': 'tool',
 'id': self.tool_call_id,
 'name': self.tool_name,
 },
 )
 defotel_message_parts(self, settings: InstrumentationSettings) -> list[_otel_messages.MessagePart]:
 from.models.instrumentedimport InstrumentedModel
 part = _otel_messages.ToolCallResponsePart(
 type='tool_call_response',
 id=self.tool_call_id,
 name=self.tool_name,
 )
 if settings.include_content and self.content is not None:
 part['result'] = InstrumentedModel.serialize_any(self.content)
 return [part]
 defhas_content(self) -> bool:
"""Return `True` if the tool return has content."""
 return self.content is not None # pragma: no cover
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### tool_name `instance-attribute`
```
tool_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the "tool" was called.
#### content `instance-attribute`
```
content: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
The return value.
#### tool_call_id `class-attribute` `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=generate_tool_call_id
)
```
The tool call identifier, this is used by some models including OpenAI.
In case the tool call id is not provided by the model, Pydantic AI will generate a random one.
#### metadata `class-attribute` `instance-attribute`
```
metadata: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any") = None
```
Additional data that can be accessed programmatically by the application but is not sent to the LLM.
#### timestamp `class-attribute` `instance-attribute`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=now_utc)
```
The timestamp, when the tool returned.
#### model_response_str
```
model_response_str() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return a string representation of the content for the model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
763
764
765
766
767
768
```
| ```
defmodel_response_str(self) -> str:
"""Return a string representation of the content for the model."""
 if isinstance(self.content, str):
 return self.content
 else:
 return tool_return_ta.dump_json(self.content).decode()
```
---|--- 
#### model_response_object
```
model_response_object() -> dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Return a dictionary representation of the content, wrapping non-dict types appropriately.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
770
771
772
773
774
775
776
```
| ```
defmodel_response_object(self) -> dict[str, Any]:
"""Return a dictionary representation of the content, wrapping non-dict types appropriately."""
 # gemini supports JSON dict return values, but no other JSON types, hence we wrap anything else in a dict
 if isinstance(self.content, dict):
 return tool_return_ta.dump_python(self.content, mode='json') # pyright: ignore[reportUnknownMemberType]
 else:
 return {'return_value': tool_return_ta.dump_python(self.content, mode='json')}
```
---|--- 
#### has_content
```
has_content() -> bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the tool return has content.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
803
804
805
```
| ```
defhas_content(self) -> bool:
"""Return `True` if the tool return has content."""
 return self.content is not None # pragma: no cover
```
---|--- 
### ToolReturnPart `dataclass`
Bases: `BaseToolReturnPart[](#pydantic_ai.messages.BaseToolReturnPart "pydantic_ai.messages.BaseToolReturnPart")`
A tool return message, this encodes the result of running a tool.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
810
811
812
813
814
815
816
817
```
| ```
@dataclass(repr=False)
classToolReturnPart(BaseToolReturnPart):
"""A tool return message, this encodes the result of running a tool."""
 _: KW_ONLY
 part_kind: Literal['tool-return'] = 'tool-return'
"""Part type identifier, this is available on all parts as a discriminator."""
```
---|--- 
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['tool-return'] = 'tool-return'
```
Part type identifier, this is available on all parts as a discriminator.
### BuiltinToolReturnPart `dataclass`
Bases: `BaseToolReturnPart[](#pydantic_ai.messages.BaseToolReturnPart "pydantic_ai.messages.BaseToolReturnPart")`
A tool return message from a built-in tool.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
820
821
822
823
824
825
826
827
828
829
830
```
| ```
@dataclass(repr=False)
classBuiltinToolReturnPart(BaseToolReturnPart):
"""A tool return message from a built-in tool."""
 _: KW_ONLY
 provider_name: str | None = None
"""The name of the provider that generated the response."""
 part_kind: Literal['builtin-tool-return'] = 'builtin-tool-return'
"""Part type identifier, this is available on all parts as a discriminator."""
```
---|--- 
#### provider_name `class-attribute` `instance-attribute`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the provider that generated the response.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["builtin-tool-return"] = (
 "builtin-tool-return"
)
```
Part type identifier, this is available on all parts as a discriminator.
### RetryPromptPart `dataclass`
A message back to a model asking it to try again.
This can be sent for a number of reasons:
 * Pydantic validation of tool arguments failed, here content is derived from a Pydantic [`ValidationError`](https://docs.pydantic.dev/latest/api/pydantic_core/#pydantic_core.ValidationError)
 * a tool raised a [`ModelRetry`](../exceptions/#pydantic_ai.exceptions.ModelRetry) exception
 * no tool was found for the tool name
 * the model returned plain text when a structured response was expected
 * Pydantic validation of a structured response failed, here content is derived from a Pydantic [`ValidationError`](https://docs.pydantic.dev/latest/api/pydantic_core/#pydantic_core.ValidationError)
 * an output validator raised a [`ModelRetry`](../exceptions/#pydantic_ai.exceptions.ModelRetry) exception
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
889
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
```
| ```
@dataclass(repr=False)
classRetryPromptPart:
"""A message back to a model asking it to try again.
 This can be sent for a number of reasons:
 * Pydantic validation of tool arguments failed, here content is derived from a Pydantic
 [`ValidationError`][pydantic_core.ValidationError]
 * a tool raised a [`ModelRetry`][pydantic_ai.exceptions.ModelRetry] exception
 * no tool was found for the tool name
 * the model returned plain text when a structured response was expected
 * Pydantic validation of a structured response failed, here content is derived from a Pydantic
 [`ValidationError`][pydantic_core.ValidationError]
 * an output validator raised a [`ModelRetry`][pydantic_ai.exceptions.ModelRetry] exception
 """
 content: list[pydantic_core.ErrorDetails] | str
"""Details of why and how the model should retry.
 If the retry was triggered by a [`ValidationError`][pydantic_core.ValidationError], this will be a list of
 error details.
 """
 _: KW_ONLY
 tool_name: str | None = None
"""The name of the tool that was called, if any."""
 tool_call_id: str = field(default_factory=_generate_tool_call_id)
"""The tool call identifier, this is used by some models including OpenAI.
 In case the tool call id is not provided by the model, Pydantic AI will generate a random one.
 """
 timestamp: datetime = field(default_factory=_now_utc)
"""The timestamp, when the retry was triggered."""
 part_kind: Literal['retry-prompt'] = 'retry-prompt'
"""Part type identifier, this is available on all parts as a discriminator."""
 defmodel_response(self) -> str:
"""Return a string message describing why the retry is requested."""
 if isinstance(self.content, str):
 if self.tool_name is None:
 description = f'Validation feedback:\n{self.content}'
 else:
 description = self.content
 else:
 json_errors = error_details_ta.dump_json(self.content, exclude={'__all__': {'ctx'}}, indent=2)
 description = f'{len(self.content)} validation errors: {json_errors.decode()}'
 return f'{description}\n\nFix the errors and try again.'
 defotel_event(self, settings: InstrumentationSettings) -> Event:
 if self.tool_name is None:
 return Event('gen_ai.user.message', body={'content': self.model_response(), 'role': 'user'})
 else:
 return Event(
 'gen_ai.tool.message',
 body={
 **({'content': self.model_response()} if settings.include_content else {}),
 'role': 'tool',
 'id': self.tool_call_id,
 'name': self.tool_name,
 },
 )
 defotel_message_parts(self, settings: InstrumentationSettings) -> list[_otel_messages.MessagePart]:
 if self.tool_name is None:
 return [_otel_messages.TextPart(type='text', content=self.model_response())]
 else:
 part = _otel_messages.ToolCallResponsePart(
 type='tool_call_response',
 id=self.tool_call_id,
 name=self.tool_name,
 )
 if settings.include_content:
 part['result'] = self.model_response()
 return [part]
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content `instance-attribute`
```
content: list[](https://docs.python.org/3/library/stdtypes.html#list)[ErrorDetails[](https://docs.pydantic.dev/latest/api/pydantic_core/#pydantic_core.ErrorDetails "pydantic_core.ErrorDetails")] | str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Details of why and how the model should retry.
If the retry was triggered by a [`ValidationError`](https://docs.pydantic.dev/latest/api/pydantic_core/#pydantic_core.ValidationError), this will be a list of error details.
#### tool_name `class-attribute` `instance-attribute`
```
tool_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the tool that was called, if any.
#### tool_call_id `class-attribute` `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=generate_tool_call_id
)
```
The tool call identifier, this is used by some models including OpenAI.
In case the tool call id is not provided by the model, Pydantic AI will generate a random one.
#### timestamp `class-attribute` `instance-attribute`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=now_utc)
```
The timestamp, when the retry was triggered.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['retry-prompt'] = 'retry-prompt'
```
Part type identifier, this is available on all parts as a discriminator.
#### model_response
```
model_response() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return a string message describing why the retry is requested.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
876
877
878
879
880
881
882
883
884
885
886
```
| ```
defmodel_response(self) -> str:
"""Return a string message describing why the retry is requested."""
 if isinstance(self.content, str):
 if self.tool_name is None:
 description = f'Validation feedback:\n{self.content}'
 else:
 description = self.content
 else:
 json_errors = error_details_ta.dump_json(self.content, exclude={'__all__': {'ctx'}}, indent=2)
 description = f'{len(self.content)} validation errors: {json_errors.decode()}'
 return f'{description}\n\nFix the errors and try again.'
```
---|--- 
### ModelRequestPart `module-attribute`
```
ModelRequestPart = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 SystemPromptPart[](#pydantic_ai.messages.SystemPromptPart "pydantic_ai.messages.SystemPromptPart")
 | UserPromptPart[](#pydantic_ai.messages.UserPromptPart "pydantic_ai.messages.UserPromptPart")
 | ToolReturnPart[](#pydantic_ai.messages.ToolReturnPart "pydantic_ai.messages.ToolReturnPart")
 | RetryPromptPart[](#pydantic_ai.messages.RetryPromptPart "pydantic_ai.messages.RetryPromptPart"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("part_kind"),
]
```
A message part sent by Pydantic AI to a model.
### ModelRequest `dataclass`
A request generated by Pydantic AI and sent to a model, e.g. a message from the Pydantic AI app to the model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
926
927
928
929
930
931
932
933
934
935
936
937
938
939
940
941
942
943
944
945
946
```
| ```
@dataclass(repr=False)
classModelRequest:
"""A request generated by Pydantic AI and sent to a model, e.g. a message from the Pydantic AI app to the model."""
 parts: Sequence[ModelRequestPart]
"""The parts of the user message."""
 _: KW_ONLY
 instructions: str | None = None
"""The instructions for the model."""
 kind: Literal['request'] = 'request'
"""Message type identifier, this is available on all parts as a discriminator."""
 @classmethod
 defuser_text_prompt(cls, user_prompt: str, *, instructions: str | None = None) -> ModelRequest:
"""Create a `ModelRequest` with a single user prompt as text."""
 return cls(parts=[UserPromptPart(user_prompt)], instructions=instructions)
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### parts `instance-attribute`
```
parts: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelRequestPart[](#pydantic_ai.messages.ModelRequestPart "pydantic_ai.messages.ModelRequestPart")]
```
The parts of the user message.
#### instructions `class-attribute` `instance-attribute`
```
instructions: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The instructions for the model.
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['request'] = 'request'
```
Message type identifier, this is available on all parts as a discriminator.
#### user_text_prompt `classmethod`
```
user_text_prompt(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str), *, instructions: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> ModelRequest[](#pydantic_ai.messages.ModelRequest "pydantic_ai.messages.ModelRequest")
```
Create a `ModelRequest` with a single user prompt as text.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
941
942
943
944
```
| ```
@classmethod
defuser_text_prompt(cls, user_prompt: str, *, instructions: str | None = None) -> ModelRequest:
"""Create a `ModelRequest` with a single user prompt as text."""
 return cls(parts=[UserPromptPart(user_prompt)], instructions=instructions)
```
---|--- 
### TextPart `dataclass`
A plain text response from a model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
949
950
951
952
953
954
955
956
957
958
959
960
961
962
963
964
965
966
967
968
```
| ```
@dataclass(repr=False)
classTextPart:
"""A plain text response from a model."""
 content: str
"""The text content of the response."""
 _: KW_ONLY
 id: str | None = None
"""An optional identifier of the text part."""
 part_kind: Literal['text'] = 'text'
"""Part type identifier, this is available on all parts as a discriminator."""
 defhas_content(self) -> bool:
"""Return `True` if the text content is non-empty."""
 return bool(self.content)
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The text content of the response.
#### id `class-attribute` `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
An optional identifier of the text part.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['text'] = 'text'
```
Part type identifier, this is available on all parts as a discriminator.
#### has_content
```
has_content() -> bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the text content is non-empty.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
964
965
966
```
| ```
defhas_content(self) -> bool:
"""Return `True` if the text content is non-empty."""
 return bool(self.content)
```
---|--- 
### ThinkingPart `dataclass`
A thinking response from a model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
 971
 972
 973
 974
 975
 976
 977
 978
 979
 980
 981
 982
 983
 984
 985
 986
 987
 988
 989
 990
 991
 992
 993
 994
 995
 996
 997
 998
 999
1000
1001
1002
1003
1004
1005
1006
1007
```
| ```
@dataclass(repr=False)
classThinkingPart:
"""A thinking response from a model."""
 content: str
"""The thinking content of the response."""
 _: KW_ONLY
 id: str | None = None
"""The identifier of the thinking part."""
 signature: str | None = None
"""The signature of the thinking.
 Supported by:
 * Anthropic (corresponds to the `signature` field)
 * Bedrock (corresponds to the `signature` field)
 * Google (corresponds to the `thought_signature` field)
 * OpenAI (corresponds to the `encrypted_content` field)
 """
 provider_name: str | None = None
"""The name of the provider that generated the response.
 Signatures are only sent back to the same provider.
 """
 part_kind: Literal['thinking'] = 'thinking'
"""Part type identifier, this is available on all parts as a discriminator."""
 defhas_content(self) -> bool:
"""Return `True` if the thinking content is non-empty."""
 return bool(self.content)
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The thinking content of the response.
#### id `class-attribute` `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The identifier of the thinking part.
#### signature `class-attribute` `instance-attribute`
```
signature: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The signature of the thinking.
Supported by:
 * Anthropic (corresponds to the `signature` field)
 * Bedrock (corresponds to the `signature` field)
 * Google (corresponds to the `thought_signature` field)
 * OpenAI (corresponds to the `encrypted_content` field)
#### provider_name `class-attribute` `instance-attribute`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the provider that generated the response.
Signatures are only sent back to the same provider.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['thinking'] = 'thinking'
```
Part type identifier, this is available on all parts as a discriminator.
#### has_content
```
has_content() -> bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the thinking content is non-empty.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1003
1004
1005
```
| ```
defhas_content(self) -> bool:
"""Return `True` if the thinking content is non-empty."""
 return bool(self.content)
```
---|--- 
### FilePart `dataclass`
A file response from a model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1010
1011
1012
1013
1014
1015
1016
1017
1018
1019
1020
1021
1022
1023
1024
1025
1026
1027
1028
1029
1030
1031
1032
1033
```
| ```
@dataclass(repr=False)
classFilePart:
"""A file response from a model."""
 content: Annotated[BinaryContent, pydantic.AfterValidator(BinaryImage.narrow_type)]
"""The file content of the response."""
 _: KW_ONLY
 id: str | None = None
"""The identifier of the file part."""
 provider_name: str | None = None
"""The name of the provider that generated the response.
 """
 part_kind: Literal['file'] = 'file'
"""Part type identifier, this is available on all parts as a discriminator."""
 defhas_content(self) -> bool:
"""Return `True` if the file content is non-empty."""
 return bool(self.content) # pragma: no cover
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content `instance-attribute`
```
content: Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 BinaryContent[](#pydantic_ai.messages.BinaryContent "pydantic_ai.messages.BinaryContent"), AfterValidator[](https://docs.pydantic.dev/latest/api/functional_validators/#pydantic.functional_validators.AfterValidator "pydantic.AfterValidator")(narrow_type[](#pydantic_ai.messages.BinaryContent.narrow_type "pydantic_ai.messages.BinaryImage.narrow_type"))
]
```
The file content of the response.
#### id `class-attribute` `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The identifier of the file part.
#### provider_name `class-attribute` `instance-attribute`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the provider that generated the response.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['file'] = 'file'
```
Part type identifier, this is available on all parts as a discriminator.
#### has_content
```
has_content() -> bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the file content is non-empty.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1029
1030
1031
```
| ```
defhas_content(self) -> bool:
"""Return `True` if the file content is non-empty."""
 return bool(self.content) # pragma: no cover
```
---|--- 
### BaseToolCallPart `dataclass`
A tool call from a model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1036
1037
1038
1039
1040
1041
1042
1043
1044
1045
1046
1047
1048
1049
1050
1051
1052
1053
1054
1055
1056
1057
1058
1059
1060
1061
1062
1063
1064
1065
1066
1067
1068
1069
1070
1071
1072
1073
1074
1075
1076
1077
1078
1079
1080
1081
1082
1083
1084
1085
1086
1087
1088
1089
1090
1091
1092
1093
1094
1095
```
| ```
@dataclass(repr=False)
classBaseToolCallPart:
"""A tool call from a model."""
 tool_name: str
"""The name of the tool to call."""
 args: str | dict[str, Any] | None = None
"""The arguments to pass to the tool.
 This is stored either as a JSON string or a Python dictionary depending on how data was received.
 """
 tool_call_id: str = field(default_factory=_generate_tool_call_id)
"""The tool call identifier, this is used by some models including OpenAI.
 In case the tool call id is not provided by the model, Pydantic AI will generate a random one.
 """
 _: KW_ONLY
 id: str | None = None
"""An optional identifier of the tool call part, separate from the tool call ID.
 This is used by some APIs like OpenAI Responses."""
 defargs_as_dict(self) -> dict[str, Any]:
"""Return the arguments as a Python dictionary.
 This is just for convenience with models that require dicts as input.
 """
 if not self.args:
 return {}
 if isinstance(self.args, dict):
 return self.args
 args = pydantic_core.from_json(self.args)
 assert isinstance(args, dict), 'args should be a dict'
 return cast(dict[str, Any], args)
 defargs_as_json_str(self) -> str:
"""Return the arguments as a JSON string.
 This is just for convenience with models that require JSON strings as input.
 """
 if not self.args:
 return '{}'
 if isinstance(self.args, str):
 return self.args
 return pydantic_core.to_json(self.args).decode()
 defhas_content(self) -> bool:
"""Return `True` if the arguments contain any data."""
 if isinstance(self.args, dict):
 # TODO: This should probably return True if you have the value False, or 0, etc.
 # It makes sense to me to ignore empty strings, but not sure about empty lists or dicts
 return any(self.args.values())
 else:
 return bool(self.args)
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### tool_name `instance-attribute`
```
tool_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the tool to call.
#### args `class-attribute` `instance-attribute`
```
args: str[](https://docs.python.org/3/library/stdtypes.html#str) | dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None
```
The arguments to pass to the tool.
This is stored either as a JSON string or a Python dictionary depending on how data was received.
#### tool_call_id `class-attribute` `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=generate_tool_call_id
)
```
The tool call identifier, this is used by some models including OpenAI.
In case the tool call id is not provided by the model, Pydantic AI will generate a random one.
#### id `class-attribute` `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
An optional identifier of the tool call part, separate from the tool call ID.
This is used by some APIs like OpenAI Responses.
#### args_as_dict
```
args_as_dict() -> dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Return the arguments as a Python dictionary.
This is just for convenience with models that require dicts as input.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1062
1063
1064
1065
1066
1067
1068
1069
1070
1071
1072
1073
```
| ```
defargs_as_dict(self) -> dict[str, Any]:
"""Return the arguments as a Python dictionary.
 This is just for convenience with models that require dicts as input.
 """
 if not self.args:
 return {}
 if isinstance(self.args, dict):
 return self.args
 args = pydantic_core.from_json(self.args)
 assert isinstance(args, dict), 'args should be a dict'
 return cast(dict[str, Any], args)
```
---|--- 
#### args_as_json_str
```
args_as_json_str() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return the arguments as a JSON string.
This is just for convenience with models that require JSON strings as input.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1075
1076
1077
1078
1079
1080
1081
1082
1083
1084
```
| ```
defargs_as_json_str(self) -> str:
"""Return the arguments as a JSON string.
 This is just for convenience with models that require JSON strings as input.
 """
 if not self.args:
 return '{}'
 if isinstance(self.args, str):
 return self.args
 return pydantic_core.to_json(self.args).decode()
```
---|--- 
#### has_content
```
has_content() -> bool[](https://docs.python.org/3/library/functions.html#bool)
```
Return `True` if the arguments contain any data.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1086
1087
1088
1089
1090
1091
1092
1093
```
| ```
defhas_content(self) -> bool:
"""Return `True` if the arguments contain any data."""
 if isinstance(self.args, dict):
 # TODO: This should probably return True if you have the value False, or 0, etc.
 # It makes sense to me to ignore empty strings, but not sure about empty lists or dicts
 return any(self.args.values())
 else:
 return bool(self.args)
```
---|--- 
### ToolCallPart `dataclass`
Bases: `BaseToolCallPart[](#pydantic_ai.messages.BaseToolCallPart "pydantic_ai.messages.BaseToolCallPart")`
A tool call from a model.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1098
1099
1100
1101
1102
1103
1104
1105
```
| ```
@dataclass(repr=False)
classToolCallPart(BaseToolCallPart):
"""A tool call from a model."""
 _: KW_ONLY
 part_kind: Literal['tool-call'] = 'tool-call'
"""Part type identifier, this is available on all parts as a discriminator."""
```
---|--- 
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['tool-call'] = 'tool-call'
```
Part type identifier, this is available on all parts as a discriminator.
### BuiltinToolCallPart `dataclass`
Bases: `BaseToolCallPart[](#pydantic_ai.messages.BaseToolCallPart "pydantic_ai.messages.BaseToolCallPart")`
A tool call to a built-in tool.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1108
1109
1110
1111
1112
1113
1114
1115
1116
1117
1118
1119
1120
1121
```
| ```
@dataclass(repr=False)
classBuiltinToolCallPart(BaseToolCallPart):
"""A tool call to a built-in tool."""
 _: KW_ONLY
 provider_name: str | None = None
"""The name of the provider that generated the response.
 Built-in tool calls are only sent back to the same provider.
 """
 part_kind: Literal['builtin-tool-call'] = 'builtin-tool-call'
"""Part type identifier, this is available on all parts as a discriminator."""
```
---|--- 
#### provider_name `class-attribute` `instance-attribute`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the provider that generated the response.
Built-in tool calls are only sent back to the same provider.
#### part_kind `class-attribute` `instance-attribute`
```
part_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["builtin-tool-call"] = (
 "builtin-tool-call"
)
```
Part type identifier, this is available on all parts as a discriminator.
### ModelResponsePart `module-attribute`
```
ModelResponsePart = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 TextPart[](#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart")
 | ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")
 | BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart")
 | BuiltinToolReturnPart[](#pydantic_ai.messages.BuiltinToolReturnPart "pydantic_ai.messages.BuiltinToolReturnPart")
 | ThinkingPart[](#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart")
 | FilePart[](#pydantic_ai.messages.FilePart "pydantic_ai.messages.FilePart"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("part_kind"),
]
```
A message part returned by a model.
### ModelResponse `dataclass`
A response from a model, e.g. a message from the model to the Pydantic AI app.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1131
1132
1133
1134
1135
1136
1137
1138
1139
1140
1141
1142
1143
1144
1145
1146
1147
1148
1149
1150
1151
1152
1153
1154
1155
1156
1157
1158
1159
1160
1161
1162
1163
1164
1165
1166
1167
1168
1169
1170
1171
1172
1173
1174
1175
1176
1177
1178
1179
1180
1181
1182
1183
1184
1185
1186
1187
1188
1189
1190
1191
1192
1193
1194
1195
1196
1197
1198
1199
1200
1201
1202
1203
1204
1205
1206
1207
1208
1209
1210
1211
1212
1213
1214
1215
1216
1217
1218
1219
1220
1221
1222
1223
1224
1225
1226
1227
1228
1229
1230
1231
1232
1233
1234
1235
1236
1237
1238
1239
1240
1241
1242
1243
1244
1245
1246
1247
1248
1249
1250
1251
1252
1253
1254
1255
1256
1257
1258
1259
1260
1261
1262
1263
1264
1265
1266
1267
1268
1269
1270
1271
1272
1273
1274
1275
1276
1277
1278
1279
1280
1281
1282
1283
1284
1285
1286
1287
1288
1289
1290
1291
1292
1293
1294
1295
1296
1297
1298
1299
1300
1301
1302
1303
1304
1305
1306
1307
1308
1309
1310
1311
1312
1313
1314
1315
1316
1317
1318
1319
1320
1321
1322
1323
1324
1325
1326
1327
1328
1329
1330
1331
1332
1333
1334
1335
1336
1337
1338
1339
1340
1341
1342
1343
1344
1345
1346
1347
1348
1349
1350
1351
1352
1353
1354
1355
1356
1357
1358
1359
1360
1361
1362
1363
1364
1365
1366
1367
```
| ```
@dataclass(repr=False)
classModelResponse:
"""A response from a model, e.g. a message from the model to the Pydantic AI app."""
 parts: Sequence[ModelResponsePart]
"""The parts of the model message."""
 _: KW_ONLY
 usage: RequestUsage = field(default_factory=RequestUsage)
"""Usage information for the request.
 This has a default to make tests easier, and to support loading old messages where usage will be missing.
 """
 model_name: str | None = None
"""The name of the model that generated the response."""
 timestamp: datetime = field(default_factory=_now_utc)
"""The timestamp of the response.
 If the model provides a timestamp in the response (as OpenAI does) that will be used.
 """
 kind: Literal['response'] = 'response'
"""Message type identifier, this is available on all parts as a discriminator."""
 provider_name: str | None = None
"""The name of the LLM provider that generated the response."""
 provider_details: Annotated[
 dict[str, Any] | None,
 # `vendor_details` is deprecated, but we still want to support deserializing model responses stored in a DB before the name was changed
 pydantic.Field(validation_alias=pydantic.AliasChoices('provider_details', 'vendor_details')),
 ] = None
"""Additional provider-specific details in a serializable format.
 This allows storing selected vendor-specific data that isn't mapped to standard ModelResponse fields.
 For OpenAI models, this may include 'logprobs', 'finish_reason', etc.
 """
 provider_response_id: Annotated[
 str | None,
 # `vendor_id` is deprecated, but we still want to support deserializing model responses stored in a DB before the name was changed
 pydantic.Field(validation_alias=pydantic.AliasChoices('provider_response_id', 'vendor_id')),
 ] = None
"""request ID as specified by the model provider. This can be used to track the specific request to the model."""
 finish_reason: FinishReason | None = None
"""Reason the model finished generating the response, normalized to OpenTelemetry values."""
 @property
 deftext(self) -> str | None:
"""Get the text in the response."""
 texts: list[str] = []
 last_part: ModelResponsePart | None = None
 for part in self.parts:
 if isinstance(part, TextPart):
 # Adjacent text parts should be joined together, but if there are parts in between
 # (like built-in tool calls) they should have newlines between them
 if isinstance(last_part, TextPart):
 texts[-1] += part.content
 else:
 texts.append(part.content)
 last_part = part
 if not texts:
 return None
 return '\n\n'.join(texts)
 @property
 defthinking(self) -> str | None:
"""Get the thinking in the response."""
 thinking_parts = [part.content for part in self.parts if isinstance(part, ThinkingPart)]
 if not thinking_parts:
 return None
 return '\n\n'.join(thinking_parts)
 @property
 deffiles(self) -> list[BinaryContent]:
"""Get the files in the response."""
 return [part.content for part in self.parts if isinstance(part, FilePart)]
 @property
 defimages(self) -> list[BinaryImage]:
"""Get the images in the response."""
 return [file for file in self.files if isinstance(file, BinaryImage)]
 @property
 deftool_calls(self) -> list[ToolCallPart]:
"""Get the tool calls in the response."""
 return [part for part in self.parts if isinstance(part, ToolCallPart)]
 @property
 defbuiltin_tool_calls(self) -> list[tuple[BuiltinToolCallPart, BuiltinToolReturnPart]]:
"""Get the builtin tool calls and results in the response."""
 calls = [part for part in self.parts if isinstance(part, BuiltinToolCallPart)]
 if not calls:
 return []
 returns_by_id = {part.tool_call_id: part for part in self.parts if isinstance(part, BuiltinToolReturnPart)}
 return [
 (call_part, returns_by_id[call_part.tool_call_id])
 for call_part in calls
 if call_part.tool_call_id in returns_by_id
 ]
 @deprecated('`price` is deprecated, use `cost` instead')
 defprice(self) -> genai_types.PriceCalculation: # pragma: no cover
 return self.cost()
 defcost(self) -> genai_types.PriceCalculation:
"""Calculate the cost of the usage.
 Uses [`genai-prices`](https://github.com/pydantic/genai-prices).
 """
 assert self.model_name, 'Model name is required to calculate price'
 return calc_price(
 self.usage,
 self.model_name,
 provider_id=self.provider_name,
 genai_request_timestamp=self.timestamp,
 )
 defotel_events(self, settings: InstrumentationSettings) -> list[Event]:
"""Return OpenTelemetry events for the response."""
 result: list[Event] = []
 defnew_event_body():
 new_body: dict[str, Any] = {'role': 'assistant'}
 ev = Event('gen_ai.assistant.message', body=new_body)
 result.append(ev)
 return new_body
 body = new_event_body()
 for part in self.parts:
 if isinstance(part, ToolCallPart):
 body.setdefault('tool_calls', []).append(
 {
 'id': part.tool_call_id,
 'type': 'function',
 'function': {
 'name': part.tool_name,
 **({'arguments': part.args} if settings.include_content else {}),
 },
 }
 )
 elif isinstance(part, TextPart | ThinkingPart):
 kind = part.part_kind
 body.setdefault('content', []).append(
 {'kind': kind, **({'text': part.content} if settings.include_content else {})}
 )
 elif isinstance(part, FilePart):
 body.setdefault('content', []).append(
 {
 'kind': 'binary',
 'media_type': part.content.media_type,
 **(
 {'binary_content': base64.b64encode(part.content.data).decode()}
 if settings.include_content and settings.include_binary_content
 else {}
 ),
 }
 )
 if content := body.get('content'):
 text_content = content[0].get('text')
 if content == [{'kind': 'text', 'text': text_content}]:
 body['content'] = text_content
 return result
 defotel_message_parts(self, settings: InstrumentationSettings) -> list[_otel_messages.MessagePart]:
 parts: list[_otel_messages.MessagePart] = []
 for part in self.parts:
 if isinstance(part, TextPart):
 parts.append(
 _otel_messages.TextPart(
 type='text',
 **({'content': part.content} if settings.include_content else {}),
 )
 )
 elif isinstance(part, ThinkingPart):
 parts.append(
 _otel_messages.ThinkingPart(
 type='thinking',
 **({'content': part.content} if settings.include_content else {}),
 )
 )
 elif isinstance(part, FilePart):
 converted_part = _otel_messages.BinaryDataPart(type='binary', media_type=part.content.media_type)
 if settings.include_content and settings.include_binary_content:
 converted_part['content'] = base64.b64encode(part.content.data).decode()
 parts.append(converted_part)
 elif isinstance(part, BaseToolCallPart):
 call_part = _otel_messages.ToolCallPart(type='tool_call', id=part.tool_call_id, name=part.tool_name)
 if isinstance(part, BuiltinToolCallPart):
 call_part['builtin'] = True
 if settings.include_content and part.args is not None:
 from.models.instrumentedimport InstrumentedModel
 if isinstance(part.args, str):
 call_part['arguments'] = part.args
 else:
 call_part['arguments'] = {k: InstrumentedModel.serialize_any(v) for k, v in part.args.items()}
 parts.append(call_part)
 elif isinstance(part, BuiltinToolReturnPart):
 return_part = _otel_messages.ToolCallResponsePart(
 type='tool_call_response',
 id=part.tool_call_id,
 name=part.tool_name,
 builtin=True,
 )
 if settings.include_content and part.content is not None: # pragma: no branch
 from.models.instrumentedimport InstrumentedModel
 return_part['result'] = InstrumentedModel.serialize_any(part.content)
 parts.append(return_part)
 return parts
 @property
 @deprecated('`vendor_details` is deprecated, use `provider_details` instead')
 defvendor_details(self) -> dict[str, Any] | None:
 return self.provider_details
 @property
 @deprecated('`vendor_id` is deprecated, use `provider_response_id` instead')
 defvendor_id(self) -> str | None:
 return self.provider_response_id
 @property
 @deprecated('`provider_request_id` is deprecated, use `provider_response_id` instead')
 defprovider_request_id(self) -> str | None:
 return self.provider_response_id
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### parts `instance-attribute`
```
parts: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")]
```
The parts of the model message.
#### usage `class-attribute` `instance-attribute`
```
usage: RequestUsage[](../usage/#pydantic_ai.usage.RequestUsage "pydantic_ai.usage.RequestUsage") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=RequestUsage[](../usage/#pydantic_ai.usage.RequestUsage "pydantic_ai.usage.RequestUsage"))
```
Usage information for the request.
This has a default to make tests easier, and to support loading old messages where usage will be missing.
#### model_name `class-attribute` `instance-attribute`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the model that generated the response.
#### timestamp `class-attribute` `instance-attribute`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=now_utc)
```
The timestamp of the response.
If the model provides a timestamp in the response (as OpenAI does) that will be used.
#### kind `class-attribute` `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['response'] = 'response'
```
Message type identifier, this is available on all parts as a discriminator.
#### provider_name `class-attribute` `instance-attribute`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The name of the LLM provider that generated the response.
#### provider_details `class-attribute` `instance-attribute`
```
provider_details: Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None,
 Field[](https://docs.pydantic.dev/latest/api/fields/#pydantic.fields.Field "pydantic.Field")(
 validation_alias=AliasChoices[](https://docs.pydantic.dev/latest/api/aliases/#pydantic.aliases.AliasChoices "pydantic.AliasChoices")(
 provider_details[](#pydantic_ai.messages.ModelResponse.provider_details "pydantic_ai.messages.ModelResponse.provider_details"), vendor_details
 )
 ),
] = None
```
Additional provider-specific details in a serializable format.
This allows storing selected vendor-specific data that isn't mapped to standard ModelResponse fields. For OpenAI models, this may include 'logprobs', 'finish_reason', etc.
#### provider_response_id `class-attribute` `instance-attribute`
```
provider_response_id: Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 str[](https://docs.python.org/3/library/stdtypes.html#str) | None,
 Field[](https://docs.pydantic.dev/latest/api/fields/#pydantic.fields.Field "pydantic.Field")(
 validation_alias=AliasChoices[](https://docs.pydantic.dev/latest/api/aliases/#pydantic.aliases.AliasChoices "pydantic.AliasChoices")(
 provider_response_id[](#pydantic_ai.messages.ModelResponse.provider_response_id "pydantic_ai.messages.ModelResponse.provider_response_id"), vendor_id
 )
 ),
] = None
```
request ID as specified by the model provider. This can be used to track the specific request to the model.
#### finish_reason `class-attribute` `instance-attribute`
```
finish_reason: FinishReason[](#pydantic_ai.messages.FinishReason "pydantic_ai.messages.FinishReason") | None = None
```
Reason the model finished generating the response, normalized to OpenTelemetry values.
#### text `property`
```
text: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
Get the text in the response.
#### thinking `property`
```
thinking: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
Get the thinking in the response.
#### files `property`
```
files: list[](https://docs.python.org/3/library/stdtypes.html#list)[BinaryContent[](#pydantic_ai.messages.BinaryContent "pydantic_ai.messages.BinaryContent")]
```
Get the files in the response.
#### images `property`
```
images: list[](https://docs.python.org/3/library/stdtypes.html#list)[BinaryImage[](#pydantic_ai.messages.BinaryImage "pydantic_ai.messages.BinaryImage")]
```
Get the images in the response.
#### tool_calls `property`
```
tool_calls: list[](https://docs.python.org/3/library/stdtypes.html#list)[ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")]
```
Get the tool calls in the response.
#### builtin_tool_calls `property`
```
builtin_tool_calls: list[](https://docs.python.org/3/library/stdtypes.html#list)[
 tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart"), BuiltinToolReturnPart[](#pydantic_ai.messages.BuiltinToolReturnPart "pydantic_ai.messages.BuiltinToolReturnPart")]
]
```
Get the builtin tool calls and results in the response.
#### price `deprecated`
```
price() -> PriceCalculation
```
Deprecated
`price` is deprecated, use `cost` instead
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1237
1238
1239
```
| ```
@deprecated('`price` is deprecated, use `cost` instead')
defprice(self) -> genai_types.PriceCalculation: # pragma: no cover
 return self.cost()
```
---|--- 
#### cost
```
cost() -> PriceCalculation
```
Calculate the cost of the usage.
Uses [`genai-prices`](https://github.com/pydantic/genai-prices).
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1241
1242
1243
1244
1245
1246
1247
1248
1249
1250
1251
1252
```
| ```
defcost(self) -> genai_types.PriceCalculation:
"""Calculate the cost of the usage.
 Uses [`genai-prices`](https://github.com/pydantic/genai-prices).
 """
 assert self.model_name, 'Model name is required to calculate price'
 return calc_price(
 self.usage,
 self.model_name,
 provider_id=self.provider_name,
 genai_request_timestamp=self.timestamp,
 )
```
---|--- 
#### otel_events
```
otel_events(
 settings: InstrumentationSettings[](../models/instrumented/#pydantic_ai.models.instrumented.InstrumentationSettings "pydantic_ai.models.instrumented.InstrumentationSettings"),
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[Event]
```
Return OpenTelemetry events for the response.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1254
1255
1256
1257
1258
1259
1260
1261
1262
1263
1264
1265
1266
1267
1268
1269
1270
1271
1272
1273
1274
1275
1276
1277
1278
1279
1280
1281
1282
1283
1284
1285
1286
1287
1288
1289
1290
1291
1292
1293
1294
1295
1296
1297
1298
1299
1300
```
| ```
defotel_events(self, settings: InstrumentationSettings) -> list[Event]:
"""Return OpenTelemetry events for the response."""
 result: list[Event] = []
 defnew_event_body():
 new_body: dict[str, Any] = {'role': 'assistant'}
 ev = Event('gen_ai.assistant.message', body=new_body)
 result.append(ev)
 return new_body
 body = new_event_body()
 for part in self.parts:
 if isinstance(part, ToolCallPart):
 body.setdefault('tool_calls', []).append(
 {
 'id': part.tool_call_id,
 'type': 'function',
 'function': {
 'name': part.tool_name,
 **({'arguments': part.args} if settings.include_content else {}),
 },
 }
 )
 elif isinstance(part, TextPart | ThinkingPart):
 kind = part.part_kind
 body.setdefault('content', []).append(
 {'kind': kind, **({'text': part.content} if settings.include_content else {})}
 )
 elif isinstance(part, FilePart):
 body.setdefault('content', []).append(
 {
 'kind': 'binary',
 'media_type': part.content.media_type,
 **(
 {'binary_content': base64.b64encode(part.content.data).decode()}
 if settings.include_content and settings.include_binary_content
 else {}
 ),
 }
 )
 if content := body.get('content'):
 text_content = content[0].get('text')
 if content == [{'kind': 'text', 'text': text_content}]:
 body['content'] = text_content
 return result
```
---|--- 
### ModelMessage `module-attribute`
```
ModelMessage = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 ModelRequest[](#pydantic_ai.messages.ModelRequest "pydantic_ai.messages.ModelRequest") | ModelResponse[](#pydantic_ai.messages.ModelResponse "pydantic_ai.messages.ModelResponse"), Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("kind")
]
```
Any message sent to or returned by a model.
### ModelMessagesTypeAdapter `module-attribute`
```
ModelMessagesTypeAdapter = TypeAdapter[](https://docs.pydantic.dev/latest/api/type_adapter/#pydantic.type_adapter.TypeAdapter "pydantic.TypeAdapter")(
 list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
 config=ConfigDict[](https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict "pydantic.ConfigDict")(
 defer_build=True,
 ser_json_bytes="base64",
 val_json_bytes="base64",
 ),
)
```
Pydantic [`TypeAdapter`](https://docs.pydantic.dev/latest/api/type_adapter/#pydantic.type_adapter.TypeAdapter) for (de)serializing messages.
### TextPartDelta `dataclass`
A partial update (delta) for a `TextPart` to append new text content.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1379
1380
1381
1382
1383
1384
1385
1386
1387
1388
1389
1390
1391
1392
1393
1394
1395
1396
1397
1398
1399
1400
1401
1402
1403
1404
1405
1406
1407
```
| ```
@dataclass(repr=False)
classTextPartDelta:
"""A partial update (delta) for a `TextPart` to append new text content."""
 content_delta: str
"""The incremental text content to add to the existing `TextPart` content."""
 _: KW_ONLY
 part_delta_kind: Literal['text'] = 'text'
"""Part delta type identifier, used as a discriminator."""
 defapply(self, part: ModelResponsePart) -> TextPart:
"""Apply this text delta to an existing `TextPart`.
 Args:
 part: The existing model response part, which must be a `TextPart`.
 Returns:
 A new `TextPart` with updated text content.
 Raises:
 ValueError: If `part` is not a `TextPart`.
 """
 if not isinstance(part, TextPart):
 raise ValueError('Cannot apply TextPartDeltas to non-TextParts') # pragma: no cover
 return replace(part, content=part.content + self.content_delta)
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content_delta `instance-attribute`
```
content_delta: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The incremental text content to add to the existing `TextPart` content.
#### part_delta_kind `class-attribute` `instance-attribute`
```
part_delta_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['text'] = 'text'
```
Part delta type identifier, used as a discriminator.
#### apply
```
apply(part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")) -> TextPart[](#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart")
```
Apply this text delta to an existing `TextPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")` | The existing model response part, which must be a `TextPart`. | _required_ 
Returns:
Type | Description 
---|--- 
`TextPart[](#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart")` | A new `TextPart` with updated text content. 
Raises:
Type | Description 
---|--- 
`ValueError[](https://docs.python.org/3/library/exceptions.html#ValueError)` | If `part` is not a `TextPart`. 
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1391
1392
1393
1394
1395
1396
1397
1398
1399
1400
1401
1402
1403
1404
1405
```
| ```
defapply(self, part: ModelResponsePart) -> TextPart:
"""Apply this text delta to an existing `TextPart`.
 Args:
 part: The existing model response part, which must be a `TextPart`.
 Returns:
 A new `TextPart` with updated text content.
 Raises:
 ValueError: If `part` is not a `TextPart`.
 """
 if not isinstance(part, TextPart):
 raise ValueError('Cannot apply TextPartDeltas to non-TextParts') # pragma: no cover
 return replace(part, content=part.content + self.content_delta)
```
---|--- 
### ThinkingPartDelta `dataclass`
A partial update (delta) for a `ThinkingPart` to append new thinking content.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1410
1411
1412
1413
1414
1415
1416
1417
1418
1419
1420
1421
1422
1423
1424
1425
1426
1427
1428
1429
1430
1431
1432
1433
1434
1435
1436
1437
1438
1439
1440
1441
1442
1443
1444
1445
1446
1447
1448
1449
1450
1451
1452
1453
1454
1455
1456
1457
1458
1459
1460
1461
1462
1463
1464
1465
1466
1467
1468
1469
```
| ```
@dataclass(repr=False, kw_only=True)
classThinkingPartDelta:
"""A partial update (delta) for a `ThinkingPart` to append new thinking content."""
 content_delta: str | None = None
"""The incremental thinking content to add to the existing `ThinkingPart` content."""
 signature_delta: str | None = None
"""Optional signature delta.
 Note this is never treated as a delta — it can replace None.
 """
 provider_name: str | None = None
"""Optional provider name for the thinking part.
 Signatures are only sent back to the same provider.
 """
 part_delta_kind: Literal['thinking'] = 'thinking'
"""Part delta type identifier, used as a discriminator."""
 @overload
 defapply(self, part: ModelResponsePart) -> ThinkingPart: ...
 @overload
 defapply(self, part: ModelResponsePart | ThinkingPartDelta) -> ThinkingPart | ThinkingPartDelta: ...
 defapply(self, part: ModelResponsePart | ThinkingPartDelta) -> ThinkingPart | ThinkingPartDelta:
"""Apply this thinking delta to an existing `ThinkingPart`.
 Args:
 part: The existing model response part, which must be a `ThinkingPart`.
 Returns:
 A new `ThinkingPart` with updated thinking content.
 Raises:
 ValueError: If `part` is not a `ThinkingPart`.
 """
 if isinstance(part, ThinkingPart):
 new_content = part.content + self.content_delta if self.content_delta else part.content
 new_signature = self.signature_delta if self.signature_delta is not None else part.signature
 new_provider_name = self.provider_name if self.provider_name is not None else part.provider_name
 return replace(part, content=new_content, signature=new_signature, provider_name=new_provider_name)
 elif isinstance(part, ThinkingPartDelta):
 if self.content_delta is None and self.signature_delta is None:
 raise ValueError('Cannot apply ThinkingPartDelta with no content or signature')
 if self.content_delta is not None:
 part = replace(part, content_delta=(part.content_delta or '') + self.content_delta)
 if self.signature_delta is not None:
 part = replace(part, signature_delta=self.signature_delta)
 if self.provider_name is not None:
 part = replace(part, provider_name=self.provider_name)
 return part
 raise ValueError( # pragma: no cover
 f'Cannot apply ThinkingPartDeltas to non-ThinkingParts or non-ThinkingPartDeltas ({part=}, {self=})'
 )
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### content_delta `class-attribute` `instance-attribute`
```
content_delta: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The incremental thinking content to add to the existing `ThinkingPart` content.
#### signature_delta `class-attribute` `instance-attribute`
```
signature_delta: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Optional signature delta.
Note this is never treated as a delta — it can replace None.
#### provider_name `class-attribute` `instance-attribute`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Optional provider name for the thinking part.
Signatures are only sent back to the same provider.
#### part_delta_kind `class-attribute` `instance-attribute`
```
part_delta_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['thinking'] = 'thinking'
```
Part delta type identifier, used as a discriminator.
#### apply
```
apply(part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")) -> ThinkingPart[](#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart")
```
```
apply(
 part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta"),
) -> ThinkingPart[](#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta")
```
```
apply(
 part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta"),
) -> ThinkingPart[](#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta")
```
Apply this thinking delta to an existing `ThinkingPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta")` | The existing model response part, which must be a `ThinkingPart`. | _required_ 
Returns:
Type | Description 
---|--- 
`ThinkingPart[](#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta")` | A new `ThinkingPart` with updated thinking content. 
Raises:
Type | Description 
---|--- 
`ValueError[](https://docs.python.org/3/library/exceptions.html#ValueError)` | If `part` is not a `ThinkingPart`. 
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1438
1439
1440
1441
1442
1443
1444
1445
1446
1447
1448
1449
1450
1451
1452
1453
1454
1455
1456
1457
1458
1459
1460
1461
1462
1463
1464
1465
1466
1467
```
| ```
defapply(self, part: ModelResponsePart | ThinkingPartDelta) -> ThinkingPart | ThinkingPartDelta:
"""Apply this thinking delta to an existing `ThinkingPart`.
 Args:
 part: The existing model response part, which must be a `ThinkingPart`.
 Returns:
 A new `ThinkingPart` with updated thinking content.
 Raises:
 ValueError: If `part` is not a `ThinkingPart`.
 """
 if isinstance(part, ThinkingPart):
 new_content = part.content + self.content_delta if self.content_delta else part.content
 new_signature = self.signature_delta if self.signature_delta is not None else part.signature
 new_provider_name = self.provider_name if self.provider_name is not None else part.provider_name
 return replace(part, content=new_content, signature=new_signature, provider_name=new_provider_name)
 elif isinstance(part, ThinkingPartDelta):
 if self.content_delta is None and self.signature_delta is None:
 raise ValueError('Cannot apply ThinkingPartDelta with no content or signature')
 if self.content_delta is not None:
 part = replace(part, content_delta=(part.content_delta or '') + self.content_delta)
 if self.signature_delta is not None:
 part = replace(part, signature_delta=self.signature_delta)
 if self.provider_name is not None:
 part = replace(part, provider_name=self.provider_name)
 return part
 raise ValueError( # pragma: no cover
 f'Cannot apply ThinkingPartDeltas to non-ThinkingParts or non-ThinkingPartDeltas ({part=}, {self=})'
 )
```
---|--- 
### ToolCallPartDelta `dataclass`
A partial update (delta) for a `ToolCallPart` to modify tool name, arguments, or tool call ID.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1472
1473
1474
1475
1476
1477
1478
1479
1480
1481
1482
1483
1484
1485
1486
1487
1488
1489
1490
1491
1492
1493
1494
1495
1496
1497
1498
1499
1500
1501
1502
1503
1504
1505
1506
1507
1508
1509
1510
1511
1512
1513
1514
1515
1516
1517
1518
1519
1520
1521
1522
1523
1524
1525
1526
1527
1528
1529
1530
1531
1532
1533
1534
1535
1536
1537
1538
1539
1540
1541
1542
1543
1544
1545
1546
1547
1548
1549
1550
1551
1552
1553
1554
1555
1556
1557
1558
1559
1560
1561
1562
1563
1564
1565
1566
1567
1568
1569
1570
1571
1572
1573
1574
1575
1576
1577
1578
1579
1580
1581
1582
1583
1584
1585
1586
1587
1588
1589
1590
1591
1592
```
| ```
@dataclass(repr=False, kw_only=True)
classToolCallPartDelta:
"""A partial update (delta) for a `ToolCallPart` to modify tool name, arguments, or tool call ID."""
 tool_name_delta: str | None = None
"""Incremental text to add to the existing tool name, if any."""
 args_delta: str | dict[str, Any] | None = None
"""Incremental data to add to the tool arguments.
 If this is a string, it will be appended to existing JSON arguments.
 If this is a dict, it will be merged with existing dict arguments.
 """
 tool_call_id: str | None = None
"""Optional tool call identifier, this is used by some models including OpenAI.
 Note this is never treated as a delta — it can replace None, but otherwise if a
 non-matching value is provided an error will be raised."""
 part_delta_kind: Literal['tool_call'] = 'tool_call'
"""Part delta type identifier, used as a discriminator."""
 defas_part(self) -> ToolCallPart | None:
"""Convert this delta to a fully formed `ToolCallPart` if possible, otherwise return `None`.
 Returns:
 A `ToolCallPart` if `tool_name_delta` is set, otherwise `None`.
 """
 if self.tool_name_delta is None:
 return None
 return ToolCallPart(self.tool_name_delta, self.args_delta, self.tool_call_id or _generate_tool_call_id())
 @overload
 defapply(self, part: ModelResponsePart) -> ToolCallPart | BuiltinToolCallPart: ...
 @overload
 defapply(
 self, part: ModelResponsePart | ToolCallPartDelta
 ) -> ToolCallPart | BuiltinToolCallPart | ToolCallPartDelta: ...
 defapply(
 self, part: ModelResponsePart | ToolCallPartDelta
 ) -> ToolCallPart | BuiltinToolCallPart | ToolCallPartDelta:
"""Apply this delta to a part or delta, returning a new part or delta with the changes applied.
 Args:
 part: The existing model response part or delta to update.
 Returns:
 Either a new `ToolCallPart` or `BuiltinToolCallPart`, or an updated `ToolCallPartDelta`.
 Raises:
 ValueError: If `part` is neither a `ToolCallPart`, `BuiltinToolCallPart`, nor a `ToolCallPartDelta`.
 UnexpectedModelBehavior: If applying JSON deltas to dict arguments or vice versa.
 """
 if isinstance(part, ToolCallPart | BuiltinToolCallPart):
 return self._apply_to_part(part)
 if isinstance(part, ToolCallPartDelta):
 return self._apply_to_delta(part)
 raise ValueError( # pragma: no cover
 f'Can only apply ToolCallPartDeltas to ToolCallParts, BuiltinToolCallParts, or ToolCallPartDeltas, not {part}'
 )
 def_apply_to_delta(self, delta: ToolCallPartDelta) -> ToolCallPart | BuiltinToolCallPart | ToolCallPartDelta:
"""Internal helper to apply this delta to another delta."""
 if self.tool_name_delta:
 # Append incremental text to the existing tool_name_delta
 updated_tool_name_delta = (delta.tool_name_delta or '') + self.tool_name_delta
 delta = replace(delta, tool_name_delta=updated_tool_name_delta)
 if isinstance(self.args_delta, str):
 if isinstance(delta.args_delta, dict):
 raise UnexpectedModelBehavior(
 f'Cannot apply JSON deltas to non-JSON tool arguments ({delta=}, {self=})'
 )
 updated_args_delta = (delta.args_delta or '') + self.args_delta
 delta = replace(delta, args_delta=updated_args_delta)
 elif isinstance(self.args_delta, dict):
 if isinstance(delta.args_delta, str):
 raise UnexpectedModelBehavior(
 f'Cannot apply dict deltas to non-dict tool arguments ({delta=}, {self=})'
 )
 updated_args_delta = {**(delta.args_delta or {}), **self.args_delta}
 delta = replace(delta, args_delta=updated_args_delta)
 if self.tool_call_id:
 delta = replace(delta, tool_call_id=self.tool_call_id)
 # If we now have enough data to create a full ToolCallPart, do so
 if delta.tool_name_delta is not None:
 return ToolCallPart(delta.tool_name_delta, delta.args_delta, delta.tool_call_id or _generate_tool_call_id())
 return delta
 def_apply_to_part(self, part: ToolCallPart | BuiltinToolCallPart) -> ToolCallPart | BuiltinToolCallPart:
"""Internal helper to apply this delta directly to a `ToolCallPart` or `BuiltinToolCallPart`."""
 if self.tool_name_delta:
 # Append incremental text to the existing tool_name
 tool_name = part.tool_name + self.tool_name_delta
 part = replace(part, tool_name=tool_name)
 if isinstance(self.args_delta, str):
 if isinstance(part.args, dict):
 raise UnexpectedModelBehavior(f'Cannot apply JSON deltas to non-JSON tool arguments ({part=}, {self=})')
 updated_json = (part.args or '') + self.args_delta
 part = replace(part, args=updated_json)
 elif isinstance(self.args_delta, dict):
 if isinstance(part.args, str):
 raise UnexpectedModelBehavior(f'Cannot apply dict deltas to non-dict tool arguments ({part=}, {self=})')
 updated_dict = {**(part.args or {}), **self.args_delta}
 part = replace(part, args=updated_dict)
 if self.tool_call_id:
 part = replace(part, tool_call_id=self.tool_call_id)
 return part
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### tool_name_delta `class-attribute` `instance-attribute`
```
tool_name_delta: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Incremental text to add to the existing tool name, if any.
#### args_delta `class-attribute` `instance-attribute`
```
args_delta: str[](https://docs.python.org/3/library/stdtypes.html#str) | dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None
```
Incremental data to add to the tool arguments.
If this is a string, it will be appended to existing JSON arguments. If this is a dict, it will be merged with existing dict arguments.
#### tool_call_id `class-attribute` `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Optional tool call identifier, this is used by some models including OpenAI.
Note this is never treated as a delta — it can replace None, but otherwise if a non-matching value is provided an error will be raised.
#### part_delta_kind `class-attribute` `instance-attribute`
```
part_delta_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['tool_call'] = 'tool_call'
```
Part delta type identifier, used as a discriminator.
#### as_part
```
as_part() -> ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart") | None
```
Convert this delta to a fully formed `ToolCallPart` if possible, otherwise return `None`.
Returns:
Type | Description 
---|--- 
`ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart") | None` | A `ToolCallPart` if `tool_name_delta` is set, otherwise `None`. 
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1495
1496
1497
1498
1499
1500
1501
1502
1503
1504
```
| ```
defas_part(self) -> ToolCallPart | None:
"""Convert this delta to a fully formed `ToolCallPart` if possible, otherwise return `None`.
 Returns:
 A `ToolCallPart` if `tool_name_delta` is set, otherwise `None`.
 """
 if self.tool_name_delta is None:
 return None
 return ToolCallPart(self.tool_name_delta, self.args_delta, self.tool_call_id or _generate_tool_call_id())
```
---|--- 
#### apply
```
apply(
 part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart"),
) -> ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart") | BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart")
```
```
apply(
 part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta"),
) -> ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart") | BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta")
```
```
apply(
 part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta"),
) -> ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart") | BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta")
```
Apply this delta to a part or delta, returning a new part or delta with the changes applied.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta")` | The existing model response part or delta to update. | _required_ 
Returns:
Type | Description 
---|--- 
`ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart") | BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta")` | Either a new `ToolCallPart` or `BuiltinToolCallPart`, or an updated `ToolCallPartDelta`. 
Raises:
Type | Description 
---|--- 
`ValueError[](https://docs.python.org/3/library/exceptions.html#ValueError)` | If `part` is neither a `ToolCallPart`, `BuiltinToolCallPart`, nor a `ToolCallPartDelta`. 
`UnexpectedModelBehavior[](../exceptions/#pydantic_ai.exceptions.UnexpectedModelBehavior "pydantic_ai.exceptions.UnexpectedModelBehavior")` | If applying JSON deltas to dict arguments or vice versa. 
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1514
1515
1516
1517
1518
1519
1520
1521
1522
1523
1524
1525
1526
1527
1528
1529
1530
1531
1532
1533
1534
1535
1536
1537
```
| ```
defapply(
 self, part: ModelResponsePart | ToolCallPartDelta
) -> ToolCallPart | BuiltinToolCallPart | ToolCallPartDelta:
"""Apply this delta to a part or delta, returning a new part or delta with the changes applied.
 Args:
 part: The existing model response part or delta to update.
 Returns:
 Either a new `ToolCallPart` or `BuiltinToolCallPart`, or an updated `ToolCallPartDelta`.
 Raises:
 ValueError: If `part` is neither a `ToolCallPart`, `BuiltinToolCallPart`, nor a `ToolCallPartDelta`.
 UnexpectedModelBehavior: If applying JSON deltas to dict arguments or vice versa.
 """
 if isinstance(part, ToolCallPart | BuiltinToolCallPart):
 return self._apply_to_part(part)
 if isinstance(part, ToolCallPartDelta):
 return self._apply_to_delta(part)
 raise ValueError( # pragma: no cover
 f'Can only apply ToolCallPartDeltas to ToolCallParts, BuiltinToolCallParts, or ToolCallPartDeltas, not {part}'
 )
```
---|--- 
### ModelResponsePartDelta `module-attribute`
```
ModelResponsePartDelta = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 TextPartDelta[](#pydantic_ai.messages.TextPartDelta "pydantic_ai.messages.TextPartDelta") | ThinkingPartDelta[](#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta") | ToolCallPartDelta[](#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("part_delta_kind"),
]
```
A partial update (delta) for any model response part.
### PartStartEvent `dataclass`
An event indicating that a new part has started.
If multiple `PartStartEvent`s are received with the same index, the new one should fully replace the old one.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1601
1602
1603
1604
1605
1606
1607
1608
1609
1610
1611
1612
1613
1614
1615
1616
1617
1618
1619
1620
1621
1622
1623
1624
1625
1626
```
| ```
@dataclass(repr=False, kw_only=True)
classPartStartEvent:
"""An event indicating that a new part has started.
 If multiple `PartStartEvent`s are received with the same index,
 the new one should fully replace the old one.
 """
 index: int
"""The index of the part within the overall response parts list."""
 part: ModelResponsePart
"""The newly started `ModelResponsePart`."""
 previous_part_kind: (
 Literal['text', 'thinking', 'tool-call', 'builtin-tool-call', 'builtin-tool-return', 'file'] | None
 ) = None
"""The kind of the previous part, if any.
 This is useful for UI event streams to know whether to group parts of the same kind together when emitting events.
 """
 event_kind: Literal['part_start'] = 'part_start'
"""Event type identifier, used as a discriminator."""
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### index `instance-attribute`
```
index: int[](https://docs.python.org/3/library/functions.html#int)
```
The index of the part within the overall response parts list.
#### part `instance-attribute`
```
part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")
```
The newly started `ModelResponsePart`.
#### previous_part_kind `class-attribute` `instance-attribute`
```
previous_part_kind: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "text",
 "thinking",
 "tool-call",
 "builtin-tool-call",
 "builtin-tool-return",
 "file",
 ]
 | None
) = None
```
The kind of the previous part, if any.
This is useful for UI event streams to know whether to group parts of the same kind together when emitting events.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['part_start'] = 'part_start'
```
Event type identifier, used as a discriminator.
### PartDeltaEvent `dataclass`
An event indicating a delta update for an existing part.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1629
1630
1631
1632
1633
1634
1635
1636
1637
1638
1639
1640
1641
1642
```
| ```
@dataclass(repr=False, kw_only=True)
classPartDeltaEvent:
"""An event indicating a delta update for an existing part."""
 index: int
"""The index of the part within the overall response parts list."""
 delta: ModelResponsePartDelta
"""The delta to apply to the specified part."""
 event_kind: Literal['part_delta'] = 'part_delta'
"""Event type identifier, used as a discriminator."""
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### index `instance-attribute`
```
index: int[](https://docs.python.org/3/library/functions.html#int)
```
The index of the part within the overall response parts list.
#### delta `instance-attribute`
```
delta: ModelResponsePartDelta[](#pydantic_ai.messages.ModelResponsePartDelta "pydantic_ai.messages.ModelResponsePartDelta")
```
The delta to apply to the specified part.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['part_delta'] = 'part_delta'
```
Event type identifier, used as a discriminator.
### PartEndEvent `dataclass`
An event indicating that a part is complete.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1645
1646
1647
1648
1649
1650
1651
1652
1653
1654
1655
1656
1657
1658
1659
1660
1661
1662
1663
1664
1665
1666
```
| ```
@dataclass(repr=False, kw_only=True)
classPartEndEvent:
"""An event indicating that a part is complete."""
 index: int
"""The index of the part within the overall response parts list."""
 part: ModelResponsePart
"""The complete `ModelResponsePart`."""
 next_part_kind: (
 Literal['text', 'thinking', 'tool-call', 'builtin-tool-call', 'builtin-tool-return', 'file'] | None
 ) = None
"""The kind of the next part, if any.
 This is useful for UI event streams to know whether to group parts of the same kind together when emitting events.
 """
 event_kind: Literal['part_end'] = 'part_end'
"""Event type identifier, used as a discriminator."""
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### index `instance-attribute`
```
index: int[](https://docs.python.org/3/library/functions.html#int)
```
The index of the part within the overall response parts list.
#### part `instance-attribute`
```
part: ModelResponsePart[](#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")
```
The complete `ModelResponsePart`.
#### next_part_kind `class-attribute` `instance-attribute`
```
next_part_kind: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "text",
 "thinking",
 "tool-call",
 "builtin-tool-call",
 "builtin-tool-return",
 "file",
 ]
 | None
) = None
```
The kind of the next part, if any.
This is useful for UI event streams to know whether to group parts of the same kind together when emitting events.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['part_end'] = 'part_end'
```
Event type identifier, used as a discriminator.
### FinalResultEvent `dataclass`
An event indicating the response to the current model request matches the output schema and will produce a result.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1669
1670
1671
1672
1673
1674
1675
1676
1677
1678
1679
1680
```
| ```
@dataclass(repr=False, kw_only=True)
classFinalResultEvent:
"""An event indicating the response to the current model request matches the output schema and will produce a result."""
 tool_name: str | None
"""The name of the output tool that was called. `None` if the result is from text content and not from a tool."""
 tool_call_id: str | None
"""The tool call ID, if any, that this result is associated with."""
 event_kind: Literal['final_result'] = 'final_result'
"""Event type identifier, used as a discriminator."""
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### tool_name `instance-attribute`
```
tool_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
The name of the output tool that was called. `None` if the result is from text content and not from a tool.
#### tool_call_id `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
The tool call ID, if any, that this result is associated with.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['final_result'] = 'final_result'
```
Event type identifier, used as a discriminator.
### ModelResponseStreamEvent `module-attribute`
```
ModelResponseStreamEvent = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 PartStartEvent[](#pydantic_ai.messages.PartStartEvent "pydantic_ai.messages.PartStartEvent")
 | PartDeltaEvent[](#pydantic_ai.messages.PartDeltaEvent "pydantic_ai.messages.PartDeltaEvent")
 | PartEndEvent[](#pydantic_ai.messages.PartEndEvent "pydantic_ai.messages.PartEndEvent")
 | FinalResultEvent[](#pydantic_ai.messages.FinalResultEvent "pydantic_ai.messages.FinalResultEvent"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("event_kind"),
]
```
An event in the model response stream, starting a new part, applying a delta to an existing one, indicating a part is complete, or indicating the final result.
### FunctionToolCallEvent `dataclass`
An event indicating the start to a call to a function tool.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1689
1690
1691
1692
1693
1694
1695
1696
1697
1698
1699
1700
1701
1702
1703
1704
1705
1706
1707
1708
1709
1710
1711
1712
```
| ```
@dataclass(repr=False)
classFunctionToolCallEvent:
"""An event indicating the start to a call to a function tool."""
 part: ToolCallPart
"""The (function) tool call to make."""
 _: KW_ONLY
 event_kind: Literal['function_tool_call'] = 'function_tool_call'
"""Event type identifier, used as a discriminator."""
 @property
 deftool_call_id(self) -> str:
"""An ID used for matching details about the call to its result."""
 return self.part.tool_call_id
 @property
 @deprecated('`call_id` is deprecated, use `tool_call_id` instead.')
 defcall_id(self) -> str:
"""An ID used for matching details about the call to its result."""
 return self.part.tool_call_id # pragma: no cover
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### part `instance-attribute`
```
part: ToolCallPart[](#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")
```
The (function) tool call to make.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["function_tool_call"] = (
 "function_tool_call"
)
```
Event type identifier, used as a discriminator.
#### tool_call_id `property`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
An ID used for matching details about the call to its result.
#### call_id `property`
```
call_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
An ID used for matching details about the call to its result.
### FunctionToolResultEvent `dataclass`
An event indicating the result of a function tool call.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1715
1716
1717
1718
1719
1720
1721
1722
1723
1724
1725
1726
1727
1728
1729
1730
1731
1732
1733
1734
1735
```
| ```
@dataclass(repr=False)
classFunctionToolResultEvent:
"""An event indicating the result of a function tool call."""
 result: ToolReturnPart | RetryPromptPart
"""The result of the call to the function tool."""
 _: KW_ONLY
 content: str | Sequence[UserContent] | None = None
"""The content that will be sent to the model as a UserPromptPart following the result."""
 event_kind: Literal['function_tool_result'] = 'function_tool_result'
"""Event type identifier, used as a discriminator."""
 @property
 deftool_call_id(self) -> str:
"""An ID used to match the result to its original call."""
 return self.result.tool_call_id
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### result `instance-attribute`
```
result: ToolReturnPart[](#pydantic_ai.messages.ToolReturnPart "pydantic_ai.messages.ToolReturnPart") | RetryPromptPart[](#pydantic_ai.messages.RetryPromptPart "pydantic_ai.messages.RetryPromptPart")
```
The result of the call to the function tool.
#### content `class-attribute` `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None
```
The content that will be sent to the model as a UserPromptPart following the result.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["function_tool_result"] = (
 "function_tool_result"
)
```
Event type identifier, used as a discriminator.
#### tool_call_id `property`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
An ID used to match the result to its original call.
### BuiltinToolCallEvent `dataclass` `deprecated`
Deprecated
`BuiltinToolCallEvent` is deprecated, look for `PartStartEvent` and `PartDeltaEvent` with `BuiltinToolCallPart` instead.
An event indicating the start to a call to a built-in tool.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1738
1739
1740
1741
1742
1743
1744
1745
1746
1747
1748
1749
1750
1751
```
| ```
@deprecated(
 '`BuiltinToolCallEvent` is deprecated, look for `PartStartEvent` and `PartDeltaEvent` with `BuiltinToolCallPart` instead.'
)
@dataclass(repr=False)
classBuiltinToolCallEvent:
"""An event indicating the start to a call to a built-in tool."""
 part: BuiltinToolCallPart
"""The built-in tool call to make."""
 _: KW_ONLY
 event_kind: Literal['builtin_tool_call'] = 'builtin_tool_call'
"""Event type identifier, used as a discriminator."""
```
---|--- 
#### part `instance-attribute`
```
part: BuiltinToolCallPart[](#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart")
```
The built-in tool call to make.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["builtin_tool_call"] = (
 "builtin_tool_call"
)
```
Event type identifier, used as a discriminator.
### BuiltinToolResultEvent `dataclass` `deprecated`
Deprecated
`BuiltinToolResultEvent` is deprecated, look for `PartStartEvent` and `PartDeltaEvent` with `BuiltinToolReturnPart` instead.
An event indicating the result of a built-in tool call.
Source code in `pydantic_ai_slim/pydantic_ai/messages.py`
```
1754
1755
1756
1757
1758
1759
1760
1761
1762
1763
1764
1765
1766
1767
```
| ```
@deprecated(
 '`BuiltinToolResultEvent` is deprecated, look for `PartStartEvent` and `PartDeltaEvent` with `BuiltinToolReturnPart` instead.'
)
@dataclass(repr=False)
classBuiltinToolResultEvent:
"""An event indicating the result of a built-in tool call."""
 result: BuiltinToolReturnPart
"""The result of the call to the built-in tool."""
 _: KW_ONLY
 event_kind: Literal['builtin_tool_result'] = 'builtin_tool_result'
"""Event type identifier, used as a discriminator."""
```
---|--- 
#### result `instance-attribute`
```
result: BuiltinToolReturnPart[](#pydantic_ai.messages.BuiltinToolReturnPart "pydantic_ai.messages.BuiltinToolReturnPart")
```
The result of the call to the built-in tool.
#### event_kind `class-attribute` `instance-attribute`
```
event_kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["builtin_tool_result"] = (
 "builtin_tool_result"
)
```
Event type identifier, used as a discriminator.
### HandleResponseEvent `module-attribute`
```
HandleResponseEvent = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 FunctionToolCallEvent[](#pydantic_ai.messages.FunctionToolCallEvent "pydantic_ai.messages.FunctionToolCallEvent")
 | FunctionToolResultEvent[](#pydantic_ai.messages.FunctionToolResultEvent "pydantic_ai.messages.FunctionToolResultEvent")
 | BuiltinToolCallEvent[](#pydantic_ai.messages.BuiltinToolCallEvent "pydantic_ai.messages.BuiltinToolCallEvent")
 | BuiltinToolResultEvent[](#pydantic_ai.messages.BuiltinToolResultEvent "pydantic_ai.messages.BuiltinToolResultEvent"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("event_kind"),
]
```
An event yielded when handling a model response, indicating tool calls and results.
### AgentStreamEvent `module-attribute`
```
AgentStreamEvent = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 ModelResponseStreamEvent[](#pydantic_ai.messages.ModelResponseStreamEvent "pydantic_ai.messages.ModelResponseStreamEvent") | HandleResponseEvent[](#pydantic_ai.messages.HandleResponseEvent "pydantic_ai.messages.HandleResponseEvent"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("event_kind"),
]
```
An event in the agent stream: model response stream events and response-handling events.