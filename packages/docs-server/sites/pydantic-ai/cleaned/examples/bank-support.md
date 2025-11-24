[ Skip to content ](#running-the-example)
# Bank support
Small but complete example of using Pydantic AI to build a support agent for a bank.
Demonstrates:
 * [dynamic system prompt](../../agents/#system-prompts)
 * [structured `output_type`](../../output/#structured-output)
 * [tools](../../tools/)
## Running the Example
With [dependencies installed and environment variables set](../setup/#usage), run:
pipuv
```
python
```
```
uv
```
(or `PYDANTIC_AI_MODEL=gemini-2.5-flash ...`)
## Example Code
[bank_support.py](https://github.com/pydantic/pydantic-ai/blob/main/examples/pydantic_ai_examples/bank_support.py)```
"""Small but complete example of using Pydantic AI to build a support agent for a bank.
Run with:
 uv run -m pydantic_ai_examples.bank_support
"""
fromdataclassesimport dataclass
frompydanticimport BaseModel
frompydantic_aiimport Agent, RunContext
classDatabaseConn:
"""This is a fake database for example purposes.
 In reality, you'd be connecting to an external database
 (e.g. PostgreSQL) to get information about customers.
 """
 @classmethod
 async defcustomer_name(cls, *, id: int) -> str | None:
 if id == 123:
 return 'John'
 @classmethod
 async defcustomer_balance(cls, *, id: int, include_pending: bool) -> float:
 if id == 123:
 if include_pending:
 return 123.45
 else:
 return 100.00
 else:
 raise ValueError('Customer not found')
@dataclass
classSupportDependencies:
 customer_id: int
 db: DatabaseConn
classSupportOutput(BaseModel):
 support_advice: str
"""Advice returned to the customer"""
 block_card: bool
"""Whether to block their card or not"""
 risk: int
"""Risk level of query"""
support_agent = Agent(
 'openai:gpt-5',
 deps_type=SupportDependencies,
 output_type=SupportOutput,
 instructions=(
 'You are a support agent in our bank, give the '
 'customer support and judge the risk level of their query. '
 "Reply using the customer's name."
 ),
)
@support_agent.instructions
async defadd_customer_name(ctx: RunContext[SupportDependencies]) -> str:
 customer_name = await ctx.deps.db.customer_name(id=ctx.deps.customer_id)
 return f"The customer's name is {customer_name!r}"
@support_agent.tool
async defcustomer_balance(
 ctx: RunContext[SupportDependencies], include_pending: bool
) -> str:
"""Returns the customer's current account balance."""
 balance = await ctx.deps.db.customer_balance(
 id=ctx.deps.customer_id,
 include_pending=include_pending,
 )
 return f'${balance:.2f}'
if __name__ == '__main__':
 deps = SupportDependencies(customer_id=123, db=DatabaseConn())
 result = support_agent.run_sync('What is my balance?', deps=deps)
 print(result.output)
"""
 support_advice='Hello John, your current account balance, including pending transactions, is $123.45.' block_card=False risk=1
 """
 result = support_agent.run_sync('I just lost my card!', deps=deps)
 print(result.output)
"""
 support_advice="I'm sorry to hear that, John. We are temporarily blocking your card to prevent unauthorized transactions." block_card=True risk=8
 """
```