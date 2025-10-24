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
Features
Proxies
On this page
 * [Overview](#overview)
 * [Proxy Configuration Options](#proxy-configuration-options)
 * [Use built-in proxies](#use-built-in-proxies)
 * [Set Proxy Geolocation](#set-proxy-geolocation)
 * [Proxy geolocations by country](#proxy-geolocations-by-country)
 * [Custom Proxies](#custom-proxies)
 * [Proxies Routing Rules](#proxies-routing-rules)
 * [Who can use proxies?](#who-can-use-proxies%3F)
 * [How is proxy usage measured?](#how-is-proxy-usage-measured%3F)
 * [Limitations](#limitations)
## 
[​](#overview)
Overview
Browserbase offers a flexible proxy system, enabling you to control how your automation traffic is routed across the internet. Whether you need anonymity, geolocation control, or improved reliability, Browserbase makes it easy to integrate proxies into your workflows. Enabling proxies is recommended for higher CAPTCHA success rates and required for bypassing some antibot systems. See more information about our stealth capabilities [here](/features/stealth-mode).
## 
[​](#proxy-configuration-options)
Proxy Configuration Options
With Browserbase, you can:
 * **Use built-in proxies:** Effortlessly route traffic through our managed residential proxies.
 * **Bring your own proxies:** Use custom HTTP/HTTPS proxies for greater control over network routing.
 * **Combine multiple proxies:** Set custom routing rules to direct traffic through different proxies based on domain or location.
Proxies are configured when [creating a session through the API](/reference/api/create-a-session) or SDK.
### 
[​](#use-built-in-proxies)
Use built-in proxies
Use Browserbase’s built-in proxies to route traffic through managed, residential proxies. This is the simplest option and only requires setting the `proxies` property to true when creating the session. By default, `proxies` is set to false.
Setting `proxies: true` will make a best-effort attempt to use a US-based proxy. If nearby US proxies are unavailable, we may route through nearby countries (like Canada).
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function createSessionWithProxies() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 proxies: true,
 });
return session;
}
const session = await createSessionWithProxies();
console.log("Session URL: https://browserbase.com/sessions/" + session.id);
```
ERR_TUNNEL_CONNECTION_FAILED: indicates either a temporary proxy hiccup or a site unsupported by our built-in proxies (more details [below](#limitations)). Please try again or email support@browserbase.com.
### 
[​](#set-proxy-geolocation)
Set Proxy Geolocation
Set the geolocation of the proxy to a specific country, state (when within the United States), and city. This is useful if you need to proxy traffic to a specific location. If there is no proxy in the specified location, the closest proxy will be used.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function createSessionWithGeoLocation() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 proxies: [
 {
 "type": "browserbase",
 "geolocation": {
 "city": "NEW_YORK",
 "state": "NY",
 "country": "US"
 }
 }
 ],
 });
return session;
}
const session = await createSessionWithGeoLocation();
console.log("Session URL: https://browserbase.com/sessions/" + session.id);
```
Geolocation fields are case-insensitive.
To set geolocations outside of the United States, use the following format:
 * London, UK
 * Tokyo, Japan
 * São Paulo, Brazil
Copy
Ask AI
```
"geolocation": {
 "city": "LONDON",
 "country": "GB"
}
```
#### 
[​](#proxy-geolocations-by-country)
Proxy geolocations by country
Our built-in proxies support 201 countries.
Africa
 * 🇩🇿 Algeria (DZ)
 * 🇦🇴 Angola (AO)
 * 🇧🇯 Benin (BJ)
 * 🇧🇼 Botswana (BW)
 * 🇧🇫 Burkina Faso (BF)
 * 🇧🇮 Burundi (BI)
 * 🇨🇲 Cameroon (CM)
 * 🇨🇻 Cape Verde (CV)
 * 🇨🇩 Democratic Republic of the Congo (CD)
 * 🇪🇬 Egypt (EG)
 * 🇬🇶 Equatorial Guinea (GQ)
 * 🇸🇿 Eswatini (SZ)
 * 🇪🇹 Ethiopia (ET)
 * 🇬🇦 Gabon (GA)
 * 🇬🇲 Gambia (GM)
 * 🇬🇭 Ghana (GH)
 * 🇬🇳 Guinea (GN)
 * 🇬🇼 Guinea-Bissau (GW)
 * 🇨🇮 Ivory Coast (CI)
 * 🇰🇪 Kenya (KE)
 * 🇱🇸 Lesotho (LS)
 * 🇱🇷 Liberia (LR)
 * 🇱🇾 Libya (LY)
 * 🇲🇬 Madagascar (MG)
 * 🇲🇼 Malawi (MW)
 * 🇲🇱 Mali (ML)
 * 🇲🇷 Mauritania (MR)
 * 🇲🇺 Mauritius (MU)
 * 🇾🇹 Mayotte (YT)
 * 🇲🇦 Morocco (MA)
 * 🇲🇿 Mozambique (MZ)
 * 🇳🇦 Namibia (NA)
 * 🇳🇪 Niger (NE)
 * 🇳🇬 Nigeria (NG)
 * 🇨🇬 Republic of the Congo (CG)
 * 🇷🇪 Reunion (RE)
 * 🇷🇼 Rwanda (RW)
 * 🇸🇳 Senegal (SN)
 * 🇸🇨 Seychelles (SC)
 * 🇸🇱 Sierra Leone (SL)
 * 🇸🇴 Somalia (SO)
 * 🇿🇦 South Africa (ZA)
 * 🇸🇸 South Sudan (SS)
 * 🇸🇩 Sudan (SD)
 * 🇹🇿 Tanzania (TZ)
 * 🇹🇬 Togo (TG)
 * 🇹🇳 Tunisia (TN)
 * 🇺🇬 Uganda (UG)
 * 🇿🇲 Zambia (ZM)
 * 🇿🇼 Zimbabwe (ZW)
Asia
 * 🇦🇫 Afghanistan (AF)
 * 🇦🇲 Armenia (AM)
 * 🇦🇿 Azerbaijan (AZ)
 * 🇧🇭 Bahrain (BH)
 * 🇧🇩 Bangladesh (BD)
 * 🇧🇹 Bhutan (BT)
 * 🇧🇳 Brunei (BN)
 * 🇰🇭 Cambodia (KH)
 * 🇨🇳 China (CN)
 * 🇬🇪 Georgia (GE)
 * 🇭🇰 Hong Kong (HK)
 * 🇮🇳 India (IN)
 * 🇮🇩 Indonesia (ID)
 * 🇮🇷 Iran (IR)
 * 🇮🇶 Iraq (IQ)
 * 🇮🇱 Israel (IL)
 * 🇯🇵 Japan (JP)
 * 🇯🇴 Jordan (JO)
 * 🇰🇿 Kazakhstan (KZ)
 * 🇰🇼 Kuwait (KW)
 * 🇰🇬 Kyrgyzstan (KG)
 * 🇱🇦 Laos (LA)
 * 🇱🇧 Lebanon (LB)
 * 🇲🇴 Macao (MO)
 * 🇲🇾 Malaysia (MY)
 * 🇲🇻 Maldives (MV)
 * 🇲🇳 Mongolia (MN)
 * 🇲🇲 Myanmar (Burma) (MM)
 * 🇳🇵 Nepal (NP)
 * 🇴🇲 Oman (OM)
 * 🇵🇰 Pakistan (PK)
 * 🇵🇸 Palestine (PS)
 * 🇵🇭 Philippines (PH)
 * 🇶🇦 Qatar (QA)
 * 🇷🇺 Russia (RU)
 * 🇸🇦 Saudi Arabia (SA)
 * 🇰🇷 South Korea (KR)
 * 🇱🇰 Sri Lanka (LK)
 * 🇹🇼 Taiwan (TW)
 * 🇹🇯 Tajikistan (TJ)
 * 🇹🇭 Thailand (TH)
 * 🇹🇷 Turkey (TR)
 * 🇦🇪 United Arab Emirates (AE)
 * 🇺🇿 Uzbekistan (UZ)
 * 🇻🇳 Vietnam (VN)
 * 🇾🇪 Yemen (YE)
Europe
 * 🇦🇽 Aland (AX)
 * 🇦🇱 Albania (AL)
 * 🇦🇩 Andorra (AD)
 * 🇦🇹 Austria (AT)
 * 🇧🇾 Belarus (BY)
 * 🇧🇪 Belgium (BE)
 * 🇧🇦 Bosnia and Herzegovina (BA)
 * 🇧🇬 Bulgaria (BG)
 * 🇭🇷 Croatia (HR)
 * 🇨🇾 Cyprus (CY)
 * 🇨🇿 Czech Republic (CZ)
 * 🇩🇰 Denmark (DK)
 * 🇪🇪 Estonia (EE)
 * 🇫🇴 Faroe Islands (FO)
 * 🇫🇮 Finland (FI)
 * 🇫🇷 France (FR)
 * 🇩🇪 Germany (DE)
 * 🇬🇮 Gibraltar (GI)
 * 🇬🇷 Greece (GR)
 * 🇬🇬 Guernsey (GG)
 * 🇭🇺 Hungary (HU)
 * 🇮🇸 Iceland (IS)
 * 🇮🇪 Ireland (IE)
 * 🇮🇲 Isle of Man (IM)
 * 🇮🇹 Italy (IT)
 * 🇯🇪 Jersey (JE)
 * 🇽🇰 Kosovo (XK)
 * 🇱🇻 Latvia (LV)
 * 🇱🇹 Lithuania (LT)
 * 🇱🇺 Luxembourg (LU)
 * 🇲🇹 Malta (MT)
 * 🇲🇩 Moldova (MD)
 * 🇲🇪 Montenegro (ME)
 * 🇳🇱 Netherlands (NL)
 * 🇲🇰 North Macedonia (MK)
 * 🇳🇴 Norway (NO)
 * 🇵🇱 Poland (PL)
 * 🇵🇹 Portugal (PT)
 * 🇷🇴 Romania (RO)
 * 🇷🇸 Serbia (RS)
 * 🇸🇰 Slovakia (SK)
 * 🇸🇮 Slovenia (SI)
 * 🇪🇸 Spain (ES)
 * 🇸🇪 Sweden (SE)
 * 🇨🇭 Switzerland (CH)
 * 🇺🇦 Ukraine (UA)
 * 🇬🇧 United Kingdom (GB)
North America
 * 🇦🇮 Anguilla (AI)
 * 🇦🇬 Antigua and Barbuda (AG)
 * 🇦🇼 Aruba (AW)
 * 🇧🇸 Bahamas (BS)
 * 🇧🇧 Barbados (BB)
 * 🇧🇿 Belize (BZ)
 * 🇧🇲 Bermuda (BM)
 * 🇻🇬 British Virgin Islands (VG)
 * 🇨🇦 Canada (CA)
 * 🇰🇾 Cayman Islands (KY)
 * 🇨🇷 Costa Rica (CR)
 * 🇨🇺 Cuba (CU)
 * 🇨🇼 Curacao (CW)
 * 🇩🇲 Dominica (DM)
 * 🇩🇴 Dominican Republic (DO)
 * 🇸🇻 El Salvador (SV)
 * 🇬🇱 Greenland (GL)
 * 🇬🇩 Grenada (GD)
 * 🇬🇵 Guadeloupe (GP)
 * 🇬🇹 Guatemala (GT)
 * 🇭🇹 Haiti (HT)
 * 🇭🇳 Honduras (HN)
 * 🇯🇲 Jamaica (JM)
 * 🇲🇶 Martinique (MQ)
 * 🇲🇽 Mexico (MX)
 * 🇳🇮 Nicaragua (NI)
 * 🇵🇦 Panama (PA)
 * 🇵🇷 Puerto Rico (PR)
 * 🇰🇳 Saint Kitts and Nevis (KN)
 * 🇱🇨 Saint Lucia (LC)
 * 🇻🇨 Saint Vincent and the Grenadines (VC)
 * 🇸🇽 Sint Maarten (SX)
 * 🇹🇹 Trinidad and Tobago (TT)
 * 🇹🇨 Turks and Caicos Islands (TC)
 * 🇻🇮 U.S. Virgin Islands (VI)
 * 🇺🇸 United States (US)
Oceania
 * 🇦🇺 Australia (AU)
 * 🇫🇯 Fiji (FJ)
 * 🇵🇫 French Polynesia (PF)
 * 🇬🇺 Guam (GU)
 * 🇫🇲 Micronesia (FM)
 * 🇳🇨 New Caledonia (NC)
 * 🇳🇿 New Zealand (NZ)
 * 🇲🇵 Northern Mariana Islands (MP)
 * 🇵🇬 Papua New Guinea (PG)
South America
 * 🇦🇷 Argentina (AR)
 * 🇧🇴 Bolivia (BO)
 * 🇧🇷 Brazil (BR)
 * 🇨🇱 Chile (CL)
 * 🇨🇴 Colombia (CO)
 * 🇪🇨 Ecuador (EC)
 * 🇬🇫 French Guiana (GF)
 * 🇬🇾 Guyana (GY)
 * 🇵🇾 Paraguay (PY)
 * 🇵🇪 Peru (PE)
 * 🇸🇷 Suriname (SR)
 * 🇺🇾 Uruguay (UY)
 * 🇻🇪 Venezuela (VE)
### 
[​](#custom-proxies)
Custom Proxies
Browserbase supports custom proxy configurations, allowing you to route traffic through **your own HTTP or HTTPS proxies**. This is useful if you need to enforce specific network routing rules, comply with security policies, or optimize performance with a preferred proxy provider. To configure a custom proxy, provide the proxy server URL and authentication details when creating a session.
Browserbase validates proxy connections at session creation time. If we are unable to connect to the specified proxy, an error will be thrown. Ensure that your proxy server is accessible and the provided credentials are correct before creating a session. We also do not support all proxy providers.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function createSessionWithCustomProxies() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 proxies: [
 {
 "type": "external",
 "server": "http://...",
 "username": "user",
 "password": "pass",
 }
 ]
 });
 return session;
}
const session = await createSessionWithCustomProxies();
console.log("Session URL: https://browserbase.com/sessions/" + session.id);
```
### 
[​](#proxies-routing-rules)
Proxies Routing Rules
Combine multiple proxies and define routing rules based on domain patterns. This is particularly useful when different websites require different proxies, such as routing government-related sites through one proxy while using another for general browsing. Proxies are applied in the order they are listed, meaning the first matching rule is used for each request. If no rule matches a domain pattern, you can use the `browserbase` proxy type to fall back to Browserbase’s default proxies.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function createSessionWithRouting() {
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 proxies: [
 // Use an external proxy for wikipedia.org
 {
 "type": "external",
 "server": "http://...",
 "username": "user",
 "password": "pass",
 "domainPattern": "wikipedia\.org"
 },
 // Use an external proxy for all other .gov domains
 {
 "type": "external",
 "server": "http://...",
 "username": "user",
 "password": "pass",
 "domainPattern": ".*\.gov"
 },
 // Use the Browserbase proxies for all other domains
 // Excluding this line will not use a proxy on any other domains
 {
 "type": "browserbase"
 }
 ]
 });
return session;
}
const session = createSessionWithRouting()
console.log("Session URL: https://browserbase.com/sessions/" + session.id)
```
## 
[​](#who-can-use-proxies%3F)
Who can use proxies?
Anyone on a Developer Plan or higher is able to use both Browserbase’s built-in proxies and your own custom proxies. You can find more information about the included proxy GBs by plan on our [pricing page](/guides/plans-and-pricing#plan-overview).
### 
[​](#how-is-proxy-usage-measured%3F)
How is proxy usage measured?
Proxy usage is measured by the total amount of data transferred through the proxy. This includes:
 * Webpage content, downloads, and media files
 * HTTP headers, authentication data, and encryption overhead
 * Any requests and responses routed through the proxy
Since all traffic must pass through the proxy server before reaching its final destination, every interaction contributes to your total bandwidth usage. To reduce proxy usage, refer to our [Cost Optimization](/guides/cost-optimization) section.
## 
[​](#limitations)
Limitations
Certain high-risk categories are restricted by our proxy providers and cannot be accessed through proxies, including:
 * All Apple domains, including iTunes and App stores
 * Entertainment (e.g., Netflix, Playstation)
 * Banking and other financial institutions
 * Some Google domains
 * Streaming
 * Ticketing
 * Mailing
 * Some .gov domains
Was this page helpful?
YesNo
[Stealth Mode](/features/stealth-mode)[Live View](/features/session-live-view)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.