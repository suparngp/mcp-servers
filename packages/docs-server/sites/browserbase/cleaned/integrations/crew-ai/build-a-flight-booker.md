[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Introduction
 * [What is Browserbase?](/introduction/what-is-browserbase)
 * [What is a headless browser?](/introduction/what-is-headless-browser)
 * [Getting started](/introduction/getting-started)
 * [Stagehand](/introduction/stagehand)
 * [Playwright](/introduction/playwright)
 * [Puppeteer](/introduction/puppeteer)
 * [Selenium](/introduction/selenium)
##### Fundamentals
 * [Create a Browser Session](/fundamentals/create-browser-session)
 * [Using a Browser Session](/fundamentals/using-browser-session)
 * [Manage a Browser Session](/fundamentals/manage-browser-session)
##### Features
 * [Stealth Mode](/features/stealth-mode)
 * [Proxies](/features/proxies)
 * [Live View](/features/session-live-view)
 * [Viewports](/features/viewports)
 * [Session Replay](/features/session-replay)
 * [Session Inspector](/features/session-inspector)
 * [Downloads](/features/downloads)
 * [Uploads](/features/uploads)
 * [Screenshots & PDFs](/features/screenshots)
 * [Contexts](/features/contexts)
 * [Browser Extensions](/features/browser-extensions)
 * [Metadata](/features/session-metadata)
##### Use Cases
 * [Form Submissions](/use-cases/automating-form-submissions)
 * [Web Scraping](/use-cases/scraping-website)
 * [Automated Tests](/use-cases/building-automated-tests)
##### Guides
 * [Improving Performance](/guides/speed-optimization)
 * [Optimizing Cost](/guides/cost-optimization)
 * [Long Running Sessions](/guides/long-running-sessions)
 * [Browser Regions](/guides/multi-region)
 * [Measuring Usage](/guides/measuring-usage)
 * [Using Session Metadata](/guides/using-session-metadata)
 * [Plans and Pricing](/guides/plans-and-pricing)
 * [Concurrency & Rate Limits](/guides/concurrency-rate-limits)
 * [Handling Authentication](/guides/authentication)
 * [Single Sign-On (SSO)](/guides/sso-setup)
 * [Enterprise Security](/guides/security)
 * [Manage Account](/guides/manage-account)
 * [Allowlisted VPN Routing](/guides/vpn)
##### Integrations
 * [Get Started with Integrations](/integrations/get-started)
 * 1Password
 * AgentKit
 * Agno
 * Braintrust
 * Browser Use
 * CrewAI
 * [Introduction](/integrations/crew-ai/introduction)
 * [Quickstart](/integrations/crew-ai/python)
 * [Tutorial: Build a Flight Booker](/integrations/crew-ai/build-a-flight-booker)
 * Langchain
 * Mastra
 * MCP Server
 * MongoDB
 * OpenAI CUA
 * Portia AI
 * Stripe
 * Temporal
 * Trigger
 * Val Town
 * Vercel
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
CrewAI
Tutorial: build a Flight Booking Crew
On this page
 * [Introduction: Crews, Agents, Tasks and Tools](#introduction%3A-crews%2C-agents%2C-tasks-and-tools)
 * [Example](#example)
 * [1. Our Flight Booking Crew](#1-our-flight-booking-crew)
 * [2. Installation](#2-installation)
 * [3. Create the Tools](#3-create-the-tools)
 * [The Browserbase Tool](#the-browserbase-tool)
 * [The Kayak Tool](#the-kayak-tool)
 * [4. Set up the Agents](#4-set-up-the-agents)
 * [4. Define the Tasks](#4-define-the-tasks)
 * [The “Search flights” Task](#the-%E2%80%9Csearch-flights%E2%80%9D-task)
 * [The “Search Booking Providers” Task](#the-%E2%80%9Csearch-booking-providers%E2%80%9D-task)
 * [4. Assemble our Flight Booking Crew](#4-assemble-our-flight-booking-crew)
 * [5. Running a Flight Booking search](#5-running-a-flight-booking-search)
 * [Running the program](#running-the-program)
 * [A close look at the Crew steps](#a-close-look-at-the-crew-steps)
 * [Wrapping up](#wrapping-up)
Flight booking automation presents significant challenges, primarily due to the scarcity of public APIs. Consequently, the process of searching for flights often requires simulating human-like interactions with web interfaces. Fortunately, the combination of [CrewAI](https://www.crewai.com/) and [Browserbase](https://www.browserbase.com/) only requires a few dozen lines of code to automate this complex task. By following this tutorial, you’ll learn how to build a CrewAI program that searches for a roundtrip flight from a simple human input:
Copy
Ask AI
```
> python3 main.py "San Francisco to NYC one-way on September 21st"
Here are our top 5 flights from San Francisco (SFO) to Newark (EWR) on September 21, 2024:
1. **Alaska Airlines**:
 - Departure: 8:50 am
 - Arrival: 5:24 pm
 - Duration: 5 hours 34 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [Alaska Airlines Saver](https://www.kayak.com/book/flight?code=noAiOYx8xU.4fFBlTtfVpoDzQq2dWkU9A.12411.28f6c8a3257adb48c2f7d8207660b2a0&h=41a638bca25d&_kw_pbranded=true&sub=F-1450586051791345216E0040d85ce85&pageOrigin=F..RP.FE.M4)
...
```
## 
[​](#introduction%3A-crews%2C-agents%2C-tasks-and-tools)
Introduction: Crews, Agents, Tasks and Tools
[CrewAI](https://www.crewai.com/) helps developers build AI Agents with 4 core concepts: [Crews](https://docs.crewai.com/core-concepts/Crews/), [Agents](https://docs.crewai.com/core-concepts/Agents/), [Tasks](https://docs.crewai.com/core-concepts/Tasks/), and [Tools](https://docs.crewai.com/core-concepts/Tools/):
 * A `Crew` is a team of `Agents` working together to accomplish some tasks.
 * A `Task`, such as _“Search flights according to criteria”_ , is a goal assigned to a specialized `Agent` (e.g., _a Flight Booking Agent_).
 * An `Agent` can be seen as a specialized text-only GPT that receives a set of `Tools` to perform actions (e.g., _search on Google_ , _navigate to this URL_).
### 
[​](#example)
Example
Here is an example of a Crew assembled to research a given topic and write an article. **The Agents: A Researcher and a Writer** First, let’s define 2 Agents, one specialized in researching a topic and another in writing articles:
Copy
Ask AI
```
researcher = Agent(
 role='Senior Researcher',
 goal='Uncover groundbreaking technologies in {topic}',
 backstory=(
 "Driven by curiosity, you're at the forefront of"
 "innovation, eager to explore and share knowledge that could change"
 "the world."
 ),
 tools=[search_tool],
)
writer = Agent(
 role='Writer',
 goal='Narrate compelling tech stories about {topic}',
 backstory=(
 "With a flair for simplifying complex topics, you craft"
 "engaging narratives that captivate and educate, bringing new"
 "discoveries to light in an accessible manner."
 ),
 tools=[search_tool]
)
```
Each Agent gets:
 * a `role` that helps the `Crew` select the best Agent for a given `Task`.
 * a `goal` that frames the `Agent` decision-making process when iterating on a `Task`.
 * a `backstory` providing context to the `Agent`’s `role` and `goal`.
Both Agents get access to a `search_tool` ([`SerperDevTool` instance](https://docs.crewai.com/tools/SerperDevTool/)) to perform searches with Google Search. **The Tasks: writing and researching** Let’s now define 2 tasks: researching a topic and writing an article.
Copy
Ask AI
```
research_task = Task(
 description=(
 "Identify the next big trend in {topic}."
 "Focus on identifying pros and cons and the overall narrative."
 "Your final report should clearly articulate the key points,"
 "its market opportunities, and potential risks."
 ),
 expected_output='A comprehensive 3 paragraphs long report on the latest AI trends.',
 agent=researcher,
)
write_task = Task(
 description=(
 "Compose an insightful article on {topic}."
 "Focus on the latest trends and how it's impacting the industry."
 "This article should be easy to understand, engaging, and positive."
 ),
 expected_output='A 4 paragraph article on {topic} advancements formatted as markdown.',
 agent=writer,
 output_file='new-blog-post.md' # Example of output customization
)
```
A Task’s `description` can be compared to a prompt, while the `expected_output` helps format the result of the `Task`. As expected, the `write_task` gets assigned to the `writer` Agent and the `research_task` to the `researcher` Agent.
**Agents and Tasks look very similar: do I need both?** Indeed, in a simple example as this one, the `Agent` and `Task` look alike. In real-world applications, an `Agent` gets to perform multiple tasks. Then, an `Agent` represents the expertise (`goal`, `backstory`) with a set of skills (`tools`), while a `Task` is a goal to accomplish.
**Assembling the Crew** As covered earlier, a `Crew` defines a set of `Task` to be performed sequentially by a team of `Agents`. Note that `Tasks` share a context, explaining why the research task comes before the writing task.
Copy
Ask AI
```
crew = Crew(
 agents=[researcher, writer],
 tasks=[research_task, write_task],
 memory=True,
 cache=True,
 max_rpm=100,
)
result = crew.kickoff(inputs={'topic': 'AI in healthcare'})
print(result)
```
Let’s now build our Flight Booking Crew with these fresh new concepts!
* * *
## 
[​](#1-our-flight-booking-crew)
1. Our Flight Booking Crew
Before jumping into the setup and code, let’s step back and look at how to assemble a Crew that helps book flights. From a user input like _“San Francisco to New York one-way on 21st September”_ , our Flight Booking Crew should print the top 5 flights as follows:
Copy
Ask AI
```
Here are our top 5 picks from San Francisco to New York on 21st September 2024:
1. **Delta Airlines**
 - Departure: 21:35
 - Arrival: 03:50
 - Duration: 6 hours 15 minutes
 - Layovers: Direct
 - Price: $125
 - Booking: [Delta Airlines](https://www.kayak.com/flights/sfo/jfk/2024-09-21/12:45/13:55/2:10/delta/airlines/economy/1)
...
```
To achieve this goal, our Crew will navigate to <https://www.kayak.com>, perform a search, and extract each flight detail, which translates to the following steps:
 1. Parse the user request (_“San Francisco to New York one-way on 21st September”_) to build a valid _Kayak search URL_
 2. Navigate to the _Kayak search URL_ and extract the top 5 flights
 3. For each flight, navigate to the _flight details URL_ to extract the available _providers_ (airlines)
 4. Summarize the flights’ information
To perform those steps, we will create 2 Agents:
 * The “Flights” Agent, responsible for looking for flights
 * The “Summarize” Agent, responsible for summarizing the available flights as a comprehensive list
The “Search Flights” Agent will need:
 * A custom `Kayak` tool to translate the user input into a valid _Kayak search URL_
 * A Browserbase tool to navigate on Kayak and interact with the web page
Finally, we will define 2 tasks: _“Search Flights”_ and _“Search Booking Providers”_. We can visualize our Flight Booking Crew as follows:
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/guides/crewai.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=1ee8494105ae630de50312249c27dd91)
Our Crew comprises 2 Agents, 2 Tools, and 2 Tasks.
Let’s implement our Crew!
## 
[​](#2-installation)
2. Installation
Let’s setup the project by installing the required dependencies:
Copy
Ask AI
```
pip install crewai 'crewai[tools]' html2text playwright python-dotenv
```
Create a `.env` file with the following variables and their respective values:
.env
Copy
Ask AI
```
OPENAI_API_KEY=
BROWSERBASE_API_KEY=
BROWSERBASE_PROJECT_ID=
# our Flight Booking's "Search Flights" Agent will have to load a lot of context (heavy webpages as text),
# let's configure a specific OpenAI model to avoid token size limits:
OPENAI_MODEL_NAME=gpt-4-turbo
```
**Where can I find my OpenAI and Browserbase API Keys?**
 * Get your Browserbase API Key and Project ID from your [Settings page](https://www.browserbase.com/settings).
 * Get your OpenAI API Key from the [OpenAI Platform](https://platform.openai.com/api-keys).
## 
[​](#3-create-the-tools)
3. Create the Tools
While CrewAI provides [a wide range of tools](https://docs.crewai.com/core-concepts/Tools/#available-crewai-tools) (e.g., _the[SerperDevTool](https://docs.crewai.com/tools/SerperDevTool/) to perform searches with Google Search_), our _“Search Flights”_ Agent needs 2 custom tools:
 * a custom `Kayak` tool to assemble a valid _Kayak search URL_
 * a Browserbase loader to navigate and interact with the web pages
### 
[​](#the-browserbase-tool)
The Browserbase Tool
The Kayak website relies heavily on JavaScript and performs a live flight search, making it hard to interact with:
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/crewai/skyscanner.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=54ccc5721782eb5f90249d23f6f5ce29)
The page is fully loaded, however the flights are still being searched.
Fortunately, leveraging Browserbase’s headless browsers makes loading and interacting with such websites easier while benefiting from its [Stealth features](/features/stealth-mode). Let’s take a look at our custom Browserbase Tool implementation:
browserbase.py
Copy
Ask AI
```
import os
from crewai_tools import tool
from playwright.sync_api import sync_playwright
from html2text import html2text
from time import sleep
@tool("Browserbase tool")
def browserbase(url: str):
 """
 Loads a URL using a headless webbrowser
 :param url: The URL to load
 :return: The text content of the page
 """
 with sync_playwright() as playwright:
 browser = playwright.chromium.connect_over_cdp(
 "wss://connect.browserbase.com?apiKey="
 + os.environ["BROWSERBASE_API_KEY"]
 )
 context = browser.contexts[0]
 page = context.pages[0]
 page.goto(url)
 # Wait for the flight search to finish
 sleep(25)
 content = html2text(page.content())
 browser.close()
 return content
```
**Custom Tool definition** A custom `Tool` is composed of 3 elements:
 * a name, via the `@tool("name")` decorator
 * a description defining the purpose of the tool along with its parameters
 * a function that contains the tool’s logic
The description, provided as a multi-line comment, is used by the Agents to evaluate the best-fitted `Tool` to help complete a given `Task`. A description can also provide instructions on the parameters. Here, we instruct that the unique `url` parameter should be a URL. **Browserbase Tool Logic** The Browserbase tool utilizes the `playwright` library along with the Browserbase Connect API to initiate a headless browser session. This setup allows interaction with web pages as follows:
Copy
Ask AI
```
browser = playwright.chromium.connect_over_cdp(
 "wss://connect.browserbase.com?apiKey="
 + os.environ["BROWSERBASE_API_KEY"]
)
```
Then, it leverages the `html2text` library to convert the webpage’s content to text and return it to the Agent for processing.
### 
[​](#the-kayak-tool)
The Kayak Tool
Agents are capable of reasoning but cannot build a valid _Kayak search URL_ from the ground up. To help our _“Flights”_ Agent, we will create a simple _Kayak Tool_ below:
kayak.py
Copy
Ask AI
```
from crewai_tools import tool
from typing import Optional
@tool("Kayak tool")
def kayak(
 departure: str, destination: str, date: str, return_date: Optional[str] = None
) -> str:
 """
 Generates a Kayak URL for flights between departure and destination on the specified date.
 :param departure: The IATA code for the departure airport (e.g., 'SOF' for Sofia)
 :param destination: The IATA code for the destination airport (e.g., 'BER' for Berlin)
 :param date: The date of the flight in the format 'YYYY-MM-DD'
 :return_date: Only for two-way tickets. The date of return flight in the format 'YYYY-MM-DD'
 :return: The Kayak URL for the flight search
 """
 print(f"Generating Kayak URL for {departure} to {destination} on {date}")
 URL = f"https://www.kayak.com/flights/{departure}-{destination}/{date}"
 if return_date:
 URL += f"/{return_date}"
 URL += "?currency=USD"
 return URL
```
The Kayak tool describes multiple parameters with specific format instructions. For example: `date: The date of the flight in the format 'YYYY-MM-DD'` This illustrates the flexibility of Tools that can rely on the `Agents` powerful reasoning capabilities to solve formatting challenges that generally require some preprocessing.
## 
[​](#4-set-up-the-agents)
4. Set up the Agents
Our _Flights_ Agent now has the tools to navigate the Kayak website from a high-level user input (_“San Francisco to New York one-way on 21st September”_). Let’s now set up our 2 Agents:
main.py
Copy
Ask AI
```
from crewai import Agent
# import our tools
from browserbase import browserbase
from kayak import kayak
flights_agent = Agent(
 role="Flights",
 goal="Search flights",
 backstory="I am an agent that can search for flights.",
 tools=[kayak, browserbase],
 allow_delegation=False,
)
summarize_agent = Agent(
 role="Summarize",
 goal="Summarize content",
 backstory="I am an agent that can summarize text.",
 allow_delegation=False,
)
```
As outlined in the introduction, an `Agent` needs 3 properties: a `role`, a `goal`, and a `backstory`. The role of our two Agents is to orchestrate the tools (build the URL, then navigate to it) and extract the information from the webpages’ text. For this reason, their definition is straightforward.
**What is the role of the _Summarize_ Agent?**Through our iterations in building this Flight Booker, we realized that the Crew, with a single _Flights_ Agent was struggling to distinguish flights from flight providers (booking links).The Summarize Agent, as we will cover in the next section, is not assigned to any task. It is created and assigned to the Crew to help digest the text extracted from the web pages and distinguish the flights from the providers (booking links).
## 
[​](#4-define-the-tasks)
4. Define the Tasks
Let’s now define the core part of our Flight Booking Crew, the `Tasks`. From a given flight criteria, our Crew should print the 5 first available flights with their associated booking link. To achieve such a result, our Crew needs to:
 1. Navigate to the _Kayak search URL_ and extract the top 5 flights
 2. For each flight, navigate to the _flight details URL_ to extract the available _providers_ and booking links
### 
[​](#the-%E2%80%9Csearch-flights%E2%80%9D-task)
The “Search flights” Task
Our _Search flights_ Task is bound to our _Flights_ Agent, getting access to our custom tools:
main.py
Copy
Ask AI
```
from crewai import Task
# Agents definitions...
output_search_example = """
Here are our top 5 flights from San Francisco to New York on 21st September 2024:
1. Delta Airlines: Departure: 21:35, Arrival: 03:50, Duration: 6 hours 15 minutes, Price: $125, Details: https://www.kayak.com/flights/sfo/jfk/2024-09-21/12:45/13:55/2:10/delta/airlines/economy/1
"""
search_task = Task(
 description=(
 "Search flights according to criteria {request}. Current year: {current_year}"
 ),
 expected_output=output_search_example,
 agent=flights_agent,
)
```
The `description` will be provided to the _Flights_ Agent who will call:
 1. The Kayak Tool to build a valid _Kayak search URL_
 2. Then, leverage the Browserbase Tool to get the flight results as text
 3. Finally, using the `output_search_example` and with the help of the _Summarize_ Agent, it will return a list of 5 flights
**Why do we provide the`current_year`?**Most users will prompt a relative date, for example: _“San Francisco to New York one-way on 21st September”_.An Agent’s reasoning relies on OpenAI that lacks some intuition on relative date ([OpenAI will always think we are in 2022](https://community.openai.com/t/api-doesnt-know-date-thinks-its-2022/569125)).For this reason, we need to specify the current year in the prompt (Task’s `description`).
### 
[​](#the-%E2%80%9Csearch-booking-providers%E2%80%9D-task)
The “Search Booking Providers” Task
The _Search Booking Providers_ Task relies heavily on the `Agent` reasoning capabilities:
main.py
Copy
Ask AI
```
from crewai import Task
# Agents definitions...
output_providers_example = """
Here are our top 5 picks from San Francisco to New York on 21st September 2024:
1. Delta Airlines:
 - Departure: 21:35
 - Arrival: 03:50
 - Duration: 6 hours 15 minutes
 - Price: $125
 - Booking: [Delta Airlines](https://www.kayak.com/flights/sfo/jfk/2024-09-21/12:45/13:55/2:10/delta/airlines/economy/1)
 ...
"""
search_booking_providers_task = Task(
 description="Load every flight individually and find available booking providers",
 expected_output=output_providers_example,
 agent=flights_agent,
)
```
By asking to _“Load every flight individually”_ , the _Flights_ Agent will understand that it needs to locate a URL to navigate to for each flight result. The _Search Booking Providers_ will indirectly rely on the _Summarize_ Agent to consolidate the flights result and individual flight providers’ results as showcased in `output_providers_example`.
## 
[​](#4-assemble-our-flight-booking-crew)
4. Assemble our Flight Booking Crew
It is time to assemble our Crew by arranging the `Task` in the correct order (_search flights, then gather providers and booking links_):
main.py
Copy
Ask AI
```
import sys
import datetime
from crewai import Crew, Process, Task, Agent
from browserbase import browserbase
from kayak import kayak
from dotenv import load_dotenv
load_dotenv() # take environment variables from .env.
# Tasks and Agents definitions...
crew = Crew(
 agents=[flights_agent, summarize_agent],
 tasks=[search_task, search_booking_providers_task],
 # let's cap the number of OpenAI requests as the Agents
 # may have to do multiple costly calls with large context
 max_rpm=100,
 # let's also set verbose=True and planning=True
 # to see the progress of the Agents
 # and the Task execution. Remove these lines
 # if you want to run the script without
 # seeing the progress (like in production).
 verbose=True,
 planning=True,
)
result = crew.kickoff(
 inputs={
 "request": sys.argv[1],
 "current_year": datetime.date.today().year,
 }
)
print(result)
```
The Crew must complete the _Search Flight_ task followed by the _Search Booking Providers_ task. As covered earlier, the _Summarize_ Agent gets assigned to the `Crew` - _not to a`Task`_ - to help consolidate the flights and providers into a simple list. **Let the Crew _kick off!_** A `Crew` process starts by calling the `kickoff()` method. Our Crew needs 2 inputs: the user input (_“San Francisco to New York one-way on 21st September”_) and the current year.
## 
[​](#5-running-a-flight-booking-search)
5. Running a Flight Booking search
Our CrewAI program is now complete! Let’s give it a try and look at its execution steps in detail.
### 
[​](#running-the-program)
Running the program
**OpenAI cost** Expect each run of the program to cost around $0.50 OpenAI credits.The Agent reasoning relies heavily on OpenAI and sends large chunks of text (the webpages), resulting in significant contexts (~50k context tokens per run).
Let’s search for a one-way flight from New York to San Francisco by running:
Copy
Ask AI
```
python3 main.py "San Francisco to New York one-way on 21st September"
```
As the program starts running in verbose mode, you should see some logs stream in your terminal; let’s take a closer look at the steps.
### 
[​](#a-close-look-at-the-crew-steps)
A close look at the Crew steps
Looking at the debugging logs streamed to the terminal helps us understand how our crew works. Let’s explore the logs in the following steps:
1. Kickoff the first tasks: Search flights
Copy
Ask AI
```
[DEBUG]: == Working Agent: Flights
[INFO]: == Starting Task: Search flights according to criteria San Francisco to New York one-way on 21st September. Current year: 2024
> Entering new CrewAgentExecutor chain...
Thought: I need to generate a URL using the Kayak tool for the flight search from San Francisco (SFO) to New York (JFK) on 21st September 2024.
```
We can already see the magic of the _Flights_ Agent reasoning in action.Given the Task definition and the 2 tools available, the _Flights_ Agent concludes _“I need to generate a URL using the Kayak tool for the flight search”_.
1.1 Use the Kayak tool to generate a valid search URL
Copy
Ask AI
```
Action: Kayak tool
Action Input: {"departure": "SFO", "destination": "JFK", "date": "2024-09-21"}
https://www.kayak.com/flights/SFO-JFK/2024-09-21
Thought: Now that I have the URL, I need to load it using the Browserbase tool to retrieve the flight information.
```
The _Action Input_ shows that our _Flights_ Agent successfully parsed the user input as valid parameters.Once the URL is generated, our Agent immediately reaches the next step: fetching the flight list using the URL.
1.2 Use the Browserbase tool to extract the flights list
Copy
Ask AI
```
Action: Browserbase tool
Action Input: {"url": "https://www.kayak.com/flights/SFO-JFK/2024-09-21"}
[Kayak](/)
...<webpage content as text>...
Thought: I now know the final answer
Final Answer: Here are our top 5 flights from San Francisco (SFO) to Newark (EWR) on September 21, 2024:
Here are our top 5 flights from San Francisco (SFO) to Newark (EWR) on September 21, 2024:
1. **Alaska Airlines**:
 - Departure: 8:50 am
 - Arrival: 5:24 pm
 - Duration: 5 hours 34 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [Alaska Airlines Saver](https://www.kayak.com/book/flight?code=noAiOYx8xU.4fFBlTtfVpoDzQq2dWkU9A.12411.28f6c8a3257adb48c2f7d8207660b2a0&h=41a638bca25d&_kw_pbranded=true&sub=F-1450586051791345216E0040d85ce85&pageOrigin=F..RP.FE.M4)
2. **United Airlines**:
 - Departure: 1:30 pm
 - Arrival: 9:50 pm
 - Duration: 5 hours 20 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.12448.df899b8e44c813d2f8c5501a1648fc15&h=3e1b76440249&sub=F-5023348394153941183E0bc6c2fafa5&pageOrigin=F..RP.FE.M1)
3. **United Airlines**:
 - Departure: 4:40 pm
 - Arrival: 1:13 am+1
 - Duration: 5 hours 33 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.12448.5ec6fd14128fd0c540fd0f53d711947a&h=f6ae82999387&sub=F-5023348393135040028E0bc6c2fafa5&pageOrigin=F..RP.FE.M6)
4. **United Airlines**:
 - Departure: 11:59 pm
 - Arrival: 8:27 am+1
 - Duration: 5 hours 28 minutes
 - Layovers: Nonstop
 - Price: $144
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.14383.65a16596bc682cce98ddcd39666710a3&h=e34e775c0ed7&sub=F-5023348391216069073E0bc6c2fafa5&pageOrigin=F..RP.FE.M9)
5. **United Airlines**:
 - Departure: 7:15 am
 - Arrival: 3:30 pm
 - Duration: 5 hours 15 minutes
 - Layovers: Nonstop
 - Price: $159
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.15888.f2fb6ff5bafca7eed4751036a9b91597&h=7ce06a5da162&sub=F-5023348394219198114E0bc6c2fafa5&pageOrigin=F..RP.FE.M10)
> Finished chain.
```
In this step, _Flights_ Agent retrieves the Kayak webpage as text and leverages OpenAI to extract a flight list. This is the program’s slowest and most costly action, as OpenAI takes up to multiple minutes to process the request.Once the flight list is generated, our Crew marks the first `Task` (“Search for flights”) as completed (_“Finished chain.”_) and moves to the next one.
2.x Iterate on each flight to extract provider and booking link
The second `Task` is impressive as the `Agent` realizes that it needs to loop over the 5 flights to retrieve the booking provider:
Copy
Ask AI
```
[DEBUG]: == Working Agent: Flights
[INFO]: == Starting Task: Load every flight individually and find available booking providers
> Entering new CrewAgentExecutor chain...
I need to load each of the provided flight detail URLs using the Browserbase tool to gather the detailed information necessary to present the top 5 picks from San Francisco to New York on 21st September 2024.
Action: Browserbase tool
Action Input: {"url": "https://www.kayak.com/flights/SFO-JFK/2024-09-21"}
[Kayak](/)
...<webpage content as text>...
Thought:
Now that I have gathered the necessary details from the Delta Airlines flight URL, I need to process the same for the remaining four flights from San Francisco to New York on 21st September 2024.
```
3. Format the consolidated list of 5 flights
Once the booking links of each flight has been retrieved, the Agent completes a final step by summarizing the list:
Copy
Ask AI
```
Thought: Here are our top 5 flights from San Francisco (SFO) to Newark (EWR) on September 21, 2024:
1. **Alaska Airlines**:
 - Departure: 8:50 am
 - Arrival: 5:24 pm
 - Duration: 5 hours 34 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [Alaska Airlines Saver](https://www.kayak.com/book/flight?code=noAiOYx8xU.4fFBlTtfVpoDzQq2dWkU9A.12411.28f6c8a3257adb48c2f7d8207660b2a0&h=41a638bca25d&_kw_pbranded=true&sub=F-1450586051791345216E0040d85ce85&pageOrigin=F..RP.FE.M4)
2. **United Airlines**:
 - Departure: 1:30 pm
 - Arrival: 9:50 pm
 - Duration: 5 hours 20 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.12448.df899b8e44c813d2f8c5501a1648fc15&h=3e1b76440249&sub=F-5023348394153941183E0bc6c2fafa5&pageOrigin=F..RP.FE.M1)
3. **United Airlines**:
 - Departure: 4:40 pm
 - Arrival: 1:13 am+1
 - Duration: 5 hours 33 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.12448.5ec6fd14128fd0c540fd0f53d711947a&h=f6ae82999387&sub=F-5023348393135040028E0bc6c2fafa5&pageOrigin=F..RP.FE.M6)
4. **United Airlines**:
 - Departure: 11:59 pm
 - Arrival: 8:27 am+1
 - Duration: 5 hours 28 minutes
 - Layovers: Nonstop
 - Price: $144
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.14383.65a16596bc682cce98ddcd39666710a3&h=e34e775c0ed7&sub=F-5023348391216069073E0bc6c2fafa5&pageOrigin=F..RP.FE.M9)
5. **United Airlines**:
 - Departure: 7:15 am
 - Arrival: 3:30 pm
 - Duration: 5 hours 15 minutes
 - Layovers: Nonstop
 - Price: $159
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.15888.f2fb6ff5bafca7eed4751036a9b91597&h=7ce06a5da162&sub=F-5023348394219198114E0bc6c2fafa5&pageOrigin=F..RP.FE.M10)
> Finished chain.
```
Once finished, our program prints the final answered returned by the `Crew`:
Copy
Ask AI
```
Here are our top 5 flights from San Francisco (SFO) to Newark (EWR) on September 21, 2024:
1. **Alaska Airlines**:
 - Departure: 8:50 am
 - Arrival: 5:24 pm
 - Duration: 5 hours 34 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [Alaska Airlines Saver](https://www.kayak.com/book/flight?code=noAiOYx8xU.4fFBlTtfVpoDzQq2dWkU9A.12411.28f6c8a3257adb48c2f7d8207660b2a0&h=41a638bca25d&_kw_pbranded=true&sub=F-1450586051791345216E0040d85ce85&pageOrigin=F..RP.FE.M4)
2. **United Airlines**:
 - Departure: 1:30 pm
 - Arrival: 9:50 pm
 - Duration: 5 hours 20 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.12448.df899b8e44c813d2f8c5501a1648fc15&h=3e1b76440249&sub=F-5023348394153941183E0bc6c2fafa5&pageOrigin=F..RP.FE.M1)
3. **United Airlines**:
 - Departure: 4:40 pm
 - Arrival: 1:13 am+1
 - Duration: 5 hours 33 minutes
 - Layovers: Nonstop
 - Price: $125
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.12448.5ec6fd14128fd0c540fd0f53d711947a&h=f6ae82999387&sub=F-5023348393135040028E0bc6c2fafa5&pageOrigin=F..RP.FE.M6)
4. **United Airlines**:
 - Departure: 11:59 pm
 - Arrival: 8:27 am+1
 - Duration: 5 hours 28 minutes
 - Layovers: Nonstop
 - Price: $144
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.14383.65a16596bc682cce98ddcd39666710a3&h=e34e775c0ed7&sub=F-5023348391216069073E0bc6c2fafa5&pageOrigin=F..RP.FE.M9)
5. **United Airlines**:
 - Departure: 7:15 am
 - Arrival: 3:30 pm
 - Duration: 5 hours 15 minutes
 - Layovers: Nonstop
 - Price: $159
 - Booking: [United Airlines Basic Economy](https://www.kayak.com/book/flight?code=noAiOYx8xU.UYIuDTZHiSY.15888.f2fb6ff5bafca7eed4751036a9b91597&h=7ce06a5da162&sub=F-5023348394219198114E0bc6c2fafa5&pageOrigin=F..RP.FE.M10)
```
## 
[​](#wrapping-up)
Wrapping up
CrewAI provides a powerful way to develop AI Agents. The traditional approach of Prompt Engineering is replaced by instructions that leverage the `Agent`’s reasoning capabilities. As we covered in this example, the Agents are capable of completing `Tasks` defined with high-level instructions (ex: _“Load every flight individually and find available booking providers”_) Combined with Browserbase headless browsers, crewAI helps create powerful AI Agents that automate human tasks or provide support in accessing data not accessible through public APIs. ## [View the source code on GitHub Check out the repo! ](https://github.com/browserbase/integrations/tree/master/examples/integrations/crewai/crewai-tutorial)
Was this page helpful?
YesNo
[Quickstart](/integrations/crew-ai/python)[Introduction](/integrations/langchain/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.