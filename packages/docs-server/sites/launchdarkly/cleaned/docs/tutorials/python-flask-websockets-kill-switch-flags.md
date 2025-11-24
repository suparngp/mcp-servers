`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Tutorials](/docs/tutorials)
 * [When to use prompt-based vs agent mode in LaunchDarkly](/docs/tutorials/agent-vs-completion)
 * [When to Add Online Evals to Your AI Configs](/docs/tutorials/when-to-add-online-evals)
 * [Detecting User Frustration: Understanding Rage Clicks and Session Replay](/docs/tutorials/detecting-user-frustration-session-replay)
 * [AI Config CI/CD Pipeline: Automated Quality Gates and Safe Deployment](/docs/tutorials/aic-cicd)
 * [Resilient architecture patterns for LaunchDarkly's SDKs](/docs/tutorials/sdk-resilience-best-practices)
 * [Proving ROI with Data-Driven AI Agent Experiments](/docs/tutorials/ai-experiments-roi)
 * [A Deeper Look at LaunchDarkly Architecture: More than Feature Flags](/docs/tutorials/ld-arch-deep-dive)
 * [Add Observability to Your React Native App in 5 minutes](/docs/tutorials/react-native-observability)
 * [Smart AI Agent Targeting with MCP Tools](/docs/tutorials/multi-agent-mcp-targeting)
 * [Build a LangGraph Multi-Agent System in 20 Minutes with LaunchDarkly AI Configs](/docs/tutorials/agents-langgraph)
 * [Snowflake Cortex Completion API + LaunchDarkly SDK Integration](/docs/tutorials/snowflake-tutorial)
 * [Using AI Configs to review database changes](/docs/tutorials/ai-configs-review-database-changes)
 * [How to implement WebSockets and kill switches in a Python application](/docs/tutorials/python-flask-websockets-kill-switch-flags)
 * [4 hacks to turbocharge your Cursor productivity](/docs/tutorials/cursor-tips-and-tricks)
 * [Create a feature flag in your IDE in 5 minutes with LaunchDarkly's MCP server](/docs/tutorials/mcp-server-feature-flags)
 * [DeepSeek vs Qwen: local model showdown featuring LaunchDarkly AI Configs](/docs/tutorials/ollama-javascript)
 * [Video tutorials](/docs/tutorials/videos)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Tutorial requirements](#tutorial-requirements)
 * [Set Up the Environment](#set-up-the-environment)
 * [Create and Activate a Virtual Environment](#create-and-activate-a-virtual-environment)
 * [Set up the developer environment for the Python application](#set-up-the-developer-environment-for-the-python-application)
 * [Configure your LaunchDarkly kill switch flag](#configure-your-launchdarkly-kill-switch-flag)
 * [Test the kill switch flag](#test-the-kill-switch-flag)
 * [Add a websocket to the Python application](#add-a-websocket-to-the-python-application)
 * [Add the socket to the front end](#add-the-socket-to-the-front-end)
 * [What’s next for building with kill switches and WebSockets?](#whats-next-for-building-with-kill-switches-and-websockets)
_Published July 21st, 2025_
![Portrait of Diane Phan.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/cc1328788277426f2915f428dbd6f12b7f5e7d7dd0bedc317c8efcef75262d5e/assets/images/authors/Diane_3.jpg)
by Diane Phan
## Overview
High-traffic events, such as product launches or promotional campaigns, can strain an application’s infrastructure, leading to degraded performance or downtime. Implementing [kill switch flags using LaunchDarkly](/docs/home/flags/killswitch) allows you to gracefully degrade non-essential features, ensuring core functionalities remain available.
In this tutorial, we’ll explore how to integrate LaunchDarkly kill switch flags into a Python application to manage traffic effectively during peak events.
This project will show a sample social media feed that makes calls to a 3rd party API for unique profile avatars and show personalized recommendations. However, if the developer has to toggle the kill switch, then the social media feed will fall back to default avatar images and not serve personalized recommendations. A WebSocket is required to send the flag value from the server to the client side browser.
## Tutorial requirements
 * Python 3.6 or newer. If your operating system does not provide a Python interpreter, you can go to [python.org](/docs/tutorials/python.org) to download an installer.
 * Visual Studio Code or your favorite IDE.
 * LaunchDarkly account. If you haven’t done so already, [create a free account](https://app.launchdarkly.com/signup).
## Set Up the Environment
Clone the repository and switch over to the “kill-switch-event-starter” branch to follow along in this tutorial.
```
git clone https://github.com/dianephan/kill-switch-event-traffic.git 
--- 
cd kill-switch-event-traffic 
git checkout kill-switch-event-starter 
```
## Create and Activate a Virtual Environment
Run the following commands in your terminal to clone the repository with starter code, install dependencies, and start the server.
```
1
| python3 -m venv venv
---|--- 
2
| source venv/bin/activate 
3
| # On Windows: venv\Scripts\activate
4
| (venv) $ pip install launchdarkly-server-sdk-ai python-dotenv flask requests
5
| (venv) $ python3 app.py
```
Head over to <http://localhost:5000/> to see the social media feed up and running. There are posts coming in from users, however everyone’s avatar is the same defaulted gif.
![screenshot of homepage of social app with default image](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7ab7d2c311218e63852af8d1ebc896f35668301170663169a247a1c56ef3893a/assets/images/tutorials/python-flask-websockets-kill-switch-flags/default.png)
Let’s integrate the LaunchDarkly SDK so that we can see the power of kill switches in action.
## Set up the developer environment for the Python application
Make sure that you are currently in the virtual environment of your project’s directory in the terminal or command prompt.
Create a file at the root of your project folder named _.env_ and add the following lines to define the environment variables. These are placeholder values, which you’ll be updating later with real ones.
LAUNCHDARKLY_SDK_KEY=“sdk-###############“
## Configure your LaunchDarkly kill switch flag
In the [LaunchDarkly app](https://app.launchdarkly.com/login), click on “Flags” in the left navigation menu and then click one of the **Create flag** buttons.
![screenshot to create a flag on LD dashboard](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1cd90dc3705861b94564c9d269f60d26c3ad123bd35e131f2fc60fb095836a5b/assets/images/tutorials/python-flask-websockets-kill-switch-flags/configure.jpg)
Configure your flag as follows:
 * Name your flag “show-avatars-and-reccs”. When you type in the **Name** , the key will automatically populate.
 * Enter some text in the description field to explain the purpose of this flag: “Shut off calls to the 3rd-party API that generates avatars.”
 * Click **No template** and select “Kill switch” as the flag template. Selecting this option will automatically set up the flag variations for you.
Click **Create flag** at the bottom of this dialog.
On the following screen, click the dropdown menu next to the “Test” environment. Copy the SDK key by selecting it from the dropdown menu and add it to the _.env_ file created earlier.
For the sake of this project, the toggle will be switched on to show that the application is working and everyone on the social media feed has a unique avatar with personalized recommendations.
Turn the flag on using the toggle switch. Then click the **Review and save** button at the bottom. Add a comment and verify the name of the environment, then click the **Save changes** button.
![screenshot to toggle a flag on LD dashboard](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/04d988443e9fae27febcbe743c12946cd219061c279f8a7369c1d53dcd53c9db/assets/images/tutorials/python-flask-websockets-kill-switch-flags/toggle.png)
Go to the _app.py_ file and change the following line to match the name of the newly created flag key:
`flag_key = "replace-key-here"`
## Test the kill switch flag
It’s time to initialize and make calls to the LaunchDarkly Python SDK.
In the index route, uncomment the lines of code that creates the `show_avatar` function. This function will retrieve feature flag values from the LaunchDarkly client and determine the actions based on the flag logic. The sample lines of code defining the user “Sandy” are no longer needed, so remove them completely.
Make sure that the index route looks like the code below:
```
1
| @app.route('/')
---|--- 
2
| def index():
3
| # Get feature flag values
4
| show_avatar = ldclient.get().variation(flag_key, user_context, False)
5
| 
6
| if show_avatar:
7
| avatar_url = get_random_avatar()
8
| # Recommendations are only shown if we get a real avatar
9
| show_recommendations = True
10
| else:
11
| avatar_url = "https://media.tenor.com/ocYNcAWYyHMAAAAM/99-cat.gif"
12
| show_recommendations = False
13
| 
14
| # Generate social media feed
15
| feed_posts = generate_feed(show_avatar)
16
| 
17
| return render_template(
18
| 'index.html',
19
| user=user_context.to_dict(),
20
| avatar_image=avatar_url,
21
| show_avatar=show_avatar,
22
| posts=feed_posts,
23
| show_recommendations=show_recommendations
24
| )
```
Scroll down to the main function at the bottom of the file and uncomment those lines of code as well.
Head back to <http://localhost:5000/> and click refresh to see the social media feed show personalized recommendations and make calls to a 3rd party API for unique profile images.
![screenshot of homepage of social app with images pulled from 3rd party API](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7f0e5e84d5cd86db4204cfc759442fcb83e61d29e08ea0d5f108792d2e9b0ac5/assets/images/tutorials/python-flask-websockets-kill-switch-flags/thirdparty.png)
Great! The social media feed is operating successfully as if everything is normal and there is no need to cut off any resources.
However, the magic of kill switches can only be appreciated if you don’t have to click refresh on the page. Your users should also not be required to click refresh in order to continue enjoying the application.
## Add a websocket to the Python application
[WebSockets](https://www.fullstackpython.com/websockets.html) need to be implemented to enable real-time two-way communication between the server and client-side browser. [SocketIO is a great Python library that can get the job done quickly with low latency](https://socket.io/docs/v4/). Without this library, the browser would not know about the flag changes and the user would have to manually refresh the page, which is a slow process and will not truly demonstrate the power of a kill switch flag.
To have your website update immediately when a LaunchDarkly flag changes, you need to implement SocketIO as the real-time update mechanism between your back end and front end. The front end will wait and listen for the flag value changes in order to update the UI accordingly.
In your terminal, run the following command to install the library. `pip install flask-socketio`
Navigate to the _app.py_ file and add the following import statements to the top of the file:
```
1
| from flask_socketio import SocketIO, emit
---|--- 
2
| 
3
| app = Flask(__name__)
4
| socketio = SocketIO(app)
```
Below the `show_evaluation_result` function, add a class named `FlagValueChangeListener` to handle the values from the WebSocket:
```
1
| class FlagValueChangeListener:
---|--- 
2
| def flag_value_change_listener(self, flag_change):
3
| # Notify all connected clients about the flag change
4
| socketio.emit('flag_update', {
5
| 'key': flag_change.key,
6
| 'new_value': flag_change.new_value
7
| })
8
| show_evaluation_result(flag_change.key, flag_change.new_value)
```
When the kill switch flag is toggled on or off, the function will detect a flag change and emit a SocketIO event, while showing the evaluation results.
Change the main Python script so that it matches the code below:
```
1
| if __name__ == "__main__":
---|--- 
2
| if not sdk_key:
3
| print("*** Please set the LAUNCHDARKLY_SDK_KEY env first")
4
| exit()
5
| 
6
| # Initialize the LaunchDarkly client
7
| ldclient.set_config(Config(sdk_key))
8
| 
9
| if not ldclient.get().is_initialized():
10
| print("*** SDK failed to initialize. Please check your internet connection and SDK credential for any typo.")
11
| exit()
12
| 
13
| print("*** SDK successfully initialized")
14
| # Set up the evaluation context. This context should appear on your
15
| # LaunchDarkly contexts dashboard soon after you run the demo.
16
| user_context = \
17
| Context.builder('example-user-key').kind('user').name('Sandy').build()
18
| 
19
| flag_value = ldclient.get().variation(flag_key, user_context, False)
20
| show_evaluation_result(flag_key, flag_value)
21
| 
22
| if sdk_key is not None:
23
| change_listener = FlagValueChangeListener()
24
| listener = ldclient.get().flag_tracker \
25
| .add_flag_value_change_listener(flag_key, user_context, change_listener.flag_value_change_listener)
26
| 
27
| socketio.run(app, debug=True)
```
The LaunchDarkly SDK client is initialized to retrieve the flag value and evaluate the context. [Read more about how the SDK subscribes to flag changes on the documentation here.](https://launchdarkly.com/docs/sdk/features/flag-changes#python)
The SocketIO library wraps the Flask app with a server that can now support both regular HTTP requests as done in Flask, as well as WebSocket connections required to operate in realtime.
## Add the socket to the front end
At this point, you’ll need to add some code so the browser can listen for the event using SocketIO’s JavaScript client. Add the following JavaScript to the head tag in the _index.html_ file in the _templates_ folder:
```
1
| <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
---|--- 
2
| <script>
3
| var socket = io();
4
| socket.on('flag_update', function(data) {
5
| // Optionally, check which flag changed and act accordingly
6
| // For now, just reload the page to reflect the new flag value
7
| location.reload();
8
| });
9
| </script>
```
When the LaunchDarkly flag changes, your back end emits a `flag_update` event via the SocketIO library.
The front end listens for this event and reloads the page automatically, so users see the updated content immediately without a manual refresh needed.
Navigate back to LaunchDarkly and disable your flag. Click **Review and save** again as you did previously when you enabled it. This is the process you will use if you have to quickly kill external API calls. No more wasting resources when one part of your application is failing and you need to act fast!
# What’s next for building with kill switches and WebSockets?
In this post you’ve learned how to use the [LaunchDarkly Python SDK](https://launchdarkly.com/docs/sdk/server-side/python) to add kill switch flags and WebSockets to your Flask web application. If you want to learn more about what you can do with kill switch flags, check out the following articles:
 * [Add LaunchDarkly kill switches to a FastAPI app](https://launchdarkly.com/blog/fastapi-python-kill-switch-flag/)
 * [Quickly disable external API calls in your Sinatra application sing LaunchDarkly kill switch flags](https://launchdarkly.com/blog/sinatra-ruby-launchdarkly-kill-switch-flags/)
 * [Implement Kill Switch Flags to a Spring Boot Application](https://launchdarkly.com/blog/java-spring-boot-kill-switch-flags/)
[Join us on Discord](https://discord.com/invite/launchdarklycommunity), send me an email at (dphan@launchdarkly.com), or [connect with me on LinkedIn](https://www.linkedin.com/in/diane-phan/) and let us know what you’re building.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs