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
Mortgage Rate Capture
On this page
 * [Build a Mortgage Rate Analysis Tool](#build-a-mortgage-rate-analysis-tool)
 * [1. Set up your environment](#1-set-up-your-environment)
 * [2. Capture a web page screenshot](#2-capture-a-web-page-screenshot)
 * [3. Analyze the screenshot with IBM watsonx.ai](#3-analyze-the-screenshot-with-ibm-watsonx-ai)
 * [4. Create a mortgage rate report](#4-create-a-mortgage-rate-report)
 * [Next Steps](#next-steps)
 * [Best Practices](#best-practices)
Here are the steps:
 1. Set up your environment
 2. Capture a web page screenshot
 3. Analyze the screenshot with IBM watsonx.ai
 4. Create a mortgage rate report
## 
[​](#build-a-mortgage-rate-analysis-tool)
Build a Mortgage Rate Analysis Tool
### 
[​](#1-set-up-your-environment)
1. Set up your environment
Install the required dependencies and set up your API keys.
 * Python
pip
poetry
uv
conda
Copy
Ask AI
```
pip install browserbase playwright ibm-watsonx-ai python-dotenv
```
Create a `.env` file with your API keys:
 * IBM watsonx.ai [API key and Project ID](https://www.ibm.com/watsonx/developer/get-started/quick-start/)
 * Browserbase [Project ID & API Key](https://browserbase.com/settings/)
.env
Copy
Ask AI
```
IBM_API_KEY=your_ibm_api_key
IBM_PROJECT_ID=your_ibm_project_id
BROWSERBASE_PROJECT_ID=your_browserbase_project_id
BROWSERBASE_API_KEY=your_browserbase_api_key
```
Make sure to install Playwright dependencies after installation by running `playwright install` in your terminal.
### 
[​](#2-capture-a-web-page-screenshot)
2. Capture a web page screenshot
Use Browserbase to navigate to the Freddie Mac mortgage rates page and capture a screenshot of the rate information that’s embedded in an iframe:
 * Python
screenshot.py
Copy
Ask AI
```
from playwright.sync_api import sync_playwright
from browserbase import Browserbase
import os
import base64
from dotenv import load_dotenv
load_dotenv()
def capture_mortgage_rates():
 # Create BrowserBase session and take screenshot
 bb = Browserbase(api_key=os.environ["BROWSERBASE_API_KEY"])
 session = bb.sessions.create(
 project_id=os.environ["BROWSERBASE_PROJECT_ID"],
 )
 with sync_playwright() as playwright:
 # Setup browser
 browser = playwright.chromium.connect_over_cdp(session.connect_url)
 context = browser.new_context()
 page = context.new_page()
 # Navigate to Freddie Mac's mortgage rates page
 page.goto("https://www.freddiemac.com/pmms")
 # Navigate and screenshot
 page.locator("#main-content iframe").content_frame.get_by_role(
 "heading", name="Primary Mortgage Market"
 ).scroll_into_view_if_needed()
 # Take a screenshot via CDP for better performance
 client = context.new_cdp_session(page)
 screenshot_data = client.send("Page.captureScreenshot", {
 "format": "jpeg",
 "quality": 80,
 "fullpage": True
 })
 # Save the screenshot
 image_data = base64.b64decode(screenshot_data['data'])
 with open('freddie_mac_rates.jpeg', 'wb') as f:
 f.write(image_data)
 # Clean up
 browser.close()
 return 'freddie_mac_rates.jpeg'
if __name__ == "__main__":
 screenshot_path = capture_mortgage_rates()
 print(f"Screenshot saved as '{screenshot_path}'")
```
### 
[​](#3-analyze-the-screenshot-with-ibm-watsonx-ai)
3. Analyze the screenshot with IBM watsonx.ai
Now, use IBM watsonx.ai’s vision model to analyze the captured screenshot and extract the mortgage rate information:
 * Python
analyze.py
Copy
Ask AI
```
from ibm_watsonx_ai import APIClient, Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
import base64
import os
import datetime
from dotenv import load_dotenv
load_dotenv()
def get_image_base64(image_path):
 with open(image_path, "rb") as image_file:
 return base64.b64encode(image_file.read()).decode('utf-8')
def analyze_mortgage_rates(image_path):
 # Get base64 encoded image
 image_base64 = get_image_base64(image_path)
 # Set up IBM watsonx.ai
 credentials = Credentials(
 # use your IBM URL based on region
 url="https://us-south.ml.cloud.ibm.com",
 api_key=os.getenv("IBM_API_KEY")
 )
 client = APIClient(credentials)
 project_id = os.getenv("IBM_PROJECT_ID")
 print(f"Using IBM watsonx.ai project ID: {project_id}")
 # Initialize the Llama 3 vision model
 model = ModelInference(
 model_id="meta-llama/llama-3-2-90b-vision-instruct",
 api_client=client,
 project_id=project_id,
 params={
 "max_new_tokens": 1000,
 "time_limit": 10000
 }
 )
 # Prepare prompt with the image
 messages = [
 {
 "role": "user",
 "content": [
 {
 "type": "image_url",
 "image_url": {
 "url": f"data:image/jpeg;base64,{image_base64}"
 }
 },
 {
 "type": "text",
 "text": "Please provide a clear summary of the current mortgage rates shown in this Freddie Mac PMMS page. Format the response as a brief market update, including the date and the rates for 30-year and 15-year fixed mortgages."
 }
 ]
 }
 ]
 # Generate the analysis
 print("Analyzing mortgage rates with IBM watsonx.ai...")
 response = model.chat(
 messages=messages,
 params={
 "input_type": "chat"
 }
 )
 # Extract content from response
 if isinstance(response, dict):
 content = response.get('choices', [{}])[0].get('message', {}).get('content', '')
 else:
 # Some API versions return the content directly
 content = response
 return content
if __name__ == "__main__":
 analysis = analyze_mortgage_rates('freddie_mac_rates.jpeg')
```
### 
[​](#4-create-a-mortgage-rate-report)
4. Create a mortgage rate report
Combine the screenshot capture and analysis steps into a complete solution that produces a nicely formatted report.
 * Python
mortgage_analysis.py
Copy
Ask AI
```
from screenshot import capture_mortgage_rates
from analyze import analyze_mortgage_rates
def main():
 # Capture the screenshot
 print("Step 1: Capturing screenshot of mortgage rates...")
 screenshot_path = capture_mortgage_rates()
 # Analyze the rates
 print("\nStep 2: Analyzing image...")
 analysis = analyze_mortgage_rates(screenshot_path)
 # Display the results
 print("\nMortgage Rate Analysis:")
 print(analysis)
if __name__ == "__main__":
 main()
```
Example output:
Copy
Ask AI
```
Step 1: Capturing screenshot of mortgage rates...
Screenshot saved as 'freddie_mac_rates.jpeg'
Step 2: Analyzing image...
Using project_id: proj-123abc456def
Analyzing mortgage rates with IBM watsonx.ai...
Generating response...
=== MORTGAGE RATE SUMMARY ===
--------------------------------------------------
Mortgage Market Update - March 20, 2025
According to the Freddie Mac Primary Mortgage Market Survey (PMMS), the 30-year fixed-rate mortgage averaged 6.70% this week. 
The 15-year fixed-rate mortgage averaged 5.95% this week.
These rates reflect the latest trends in the mortgage market as of March 20, 2025.
--------------------------------------------------
```
🎉 You’ve created a mortgage rate analysis tool with **IBM watsonx.ai** and **Browserbase**!
## 
[​](#next-steps)
Next Steps
With this foundation, you can build more advanced workflows:
 * Schedule regular rate checks and track trends over time
 * Compare rates across multiple mortgage providers
 * Create dashboards to monitor rate changes and predict future trends
 * Fill out mortgage applications using extracted data
## 
[​](#best-practices)
Best Practices
 * **Handle dynamic content** : Some websites load data asynchronously; ensure content is fully loaded by adding wait times before capturing screenshots.
 * **Add error handling** : Implement robust error handling for network issues and page structure changes.
 * **Secure your credentials** : Never expose API keys in client-side code or public repositories.
For more information, explore:
 * [IBM watsonx.ai documentation](https://www.ibm.com/products/watsonx-ai)
 * [Browserbase documentation](https://docs.browserbase.com/)
Was this page helpful?
YesNo
⌘I
Assistant
Responses are generated using AI and may contain mistakes.