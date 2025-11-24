[ Skip to content ](#question-graph)
# Question Graph
Example of a graph for asking and evaluating questions.
Demonstrates:
 * [`pydantic_graph`](../../graph/)
## Running the Example
With [dependencies installed and environment variables set](../setup/#usage), run:
pipuv
```
python
```
```
uv
```
## Example Code
[question_graph.py](https://github.com/pydantic/pydantic-ai/blob/main/examples/pydantic_ai_examples/question_graph.py)```
"""Example of a graph for asking and evaluating questions.
Run with:
 uv run -m pydantic_ai_examples.question_graph
"""
from__future__import annotations as _annotations
fromdataclassesimport dataclass, field
frompathlibimport Path
importlogfire
fromgroqimport BaseModel
frompydantic_aiimport Agent, ModelMessage, format_as_xml
frompydantic_graphimport (
 BaseNode,
 End,
 Graph,
 GraphRunContext,
)
frompydantic_graph.persistence.fileimport FileStatePersistence
# 'if-token-present' means nothing will be sent (and the example will work) if you don't have logfire configured
logfire.configure(send_to_logfire='if-token-present')
logfire.instrument_pydantic_ai()
ask_agent = Agent('openai:gpt-5', output_type=str)
@dataclass
classQuestionState:
 question: str | None = None
 ask_agent_messages: list[ModelMessage] = field(default_factory=list)
 evaluate_agent_messages: list[ModelMessage] = field(default_factory=list)
@dataclass
classAsk(BaseNode[QuestionState]):
 async defrun(self, ctx: GraphRunContext[QuestionState]) -> Answer:
 result = await ask_agent.run(
 'Ask a simple question with a single correct answer.',
 message_history=ctx.state.ask_agent_messages,
 )
 ctx.state.ask_agent_messages += result.all_messages()
 ctx.state.question = result.output
 return Answer(result.output)
@dataclass
classAnswer(BaseNode[QuestionState]):
 question: str
 async defrun(self, ctx: GraphRunContext[QuestionState]) -> Evaluate:
 answer = input(f'{self.question}: ')
 return Evaluate(answer)
classEvaluationOutput(BaseModel, use_attribute_docstrings=True):
 correct: bool
"""Whether the answer is correct."""
 comment: str
"""Comment on the answer, reprimand the user if the answer is wrong."""
evaluate_agent = Agent(
 'openai:gpt-5',
 output_type=EvaluationOutput,
 system_prompt='Given a question and answer, evaluate if the answer is correct.',
)
@dataclass
classEvaluate(BaseNode[QuestionState, None, str]):
 answer: str
 async defrun(
 self,
 ctx: GraphRunContext[QuestionState],
 ) -> End[str] | Reprimand:
 assert ctx.state.question is not None
 result = await evaluate_agent.run(
 format_as_xml({'question': ctx.state.question, 'answer': self.answer}),
 message_history=ctx.state.evaluate_agent_messages,
 )
 ctx.state.evaluate_agent_messages += result.all_messages()
 if result.output.correct:
 return End(result.output.comment)
 else:
 return Reprimand(result.output.comment)
@dataclass
classReprimand(BaseNode[QuestionState]):
 comment: str
 async defrun(self, ctx: GraphRunContext[QuestionState]) -> Ask:
 print(f'Comment: {self.comment}')
 ctx.state.question = None
 return Ask()
question_graph = Graph(
 nodes=(Ask, Answer, Evaluate, Reprimand), state_type=QuestionState
)
async defrun_as_continuous():
 state = QuestionState()
 node = Ask()
 end = await question_graph.run(node, state=state)
 print('END:', end.output)
async defrun_as_cli(answer: str | None):
 persistence = FileStatePersistence(Path('question_graph.json'))
 persistence.set_graph_types(question_graph)
 if snapshot := await persistence.load_next():
 state = snapshot.state
 assert answer is not None, (
 'answer required, usage "uv run -m pydantic_ai_examples.question_graph cli <answer>"'
 )
 node = Evaluate(answer)
 else:
 state = QuestionState()
 node = Ask()
 # debug(state, node)
 async with question_graph.iter(node, state=state, persistence=persistence) as run:
 while True:
 node = await run.next()
 if isinstance(node, End):
 print('END:', node.data)
 history = await persistence.load_all()
 print('history:', '\n'.join(str(e.node) for e in history), sep='\n')
 print('Finished!')
 break
 elif isinstance(node, Answer):
 print(node.question)
 break
 # otherwise just continue
if __name__ == '__main__':
 importasyncio
 importsys
 try:
 sub_command = sys.argv[1]
 assert sub_command in ('continuous', 'cli', 'mermaid')
 except (IndexError, AssertionError):
 print(
 'Usage:\n'
 ' uv run -m pydantic_ai_examples.question_graph mermaid\n'
 'or:\n'
 ' uv run -m pydantic_ai_examples.question_graph continuous\n'
 'or:\n'
 ' uv run -m pydantic_ai_examples.question_graph cli [answer]',
 file=sys.stderr,
 )
 sys.exit(1)
 if sub_command == 'mermaid':
 print(question_graph.mermaid_code(start_node=Ask))
 elif sub_command == 'continuous':
 asyncio.run(run_as_continuous())
 else:
 a = sys.argv[2] if len(sys.argv) > 2 else None
 asyncio.run(run_as_cli(a))
```
The mermaid diagram generated in this example looks like this:
```
---
title: question_graph
---
stateDiagram-v2
 [*] --> Ask
 Ask --> Answer: ask the question
 Answer --> Evaluate: answer the question
 Evaluate --> Congratulate
 Evaluate --> Castigate
 Congratulate --> [*]: success
 Castigate --> Ask: try again
```