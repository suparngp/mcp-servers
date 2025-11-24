`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Flagship Blog](/docs/blog)
 * [5 takeaways from my first PyCon JP conference](/docs/blog/pyconjp-25-takeaways)
 * [Dungeons & Downtimes: XP gained from our adventure](/docs/blog/dungeons-downtimes)
 * [Reverse Proxy for custom domains](/docs/blog/reverse-proxy-custom-domains)
 * [Adventures in dogfooding: Guarded Releases](/docs/blog/dogfooding-guardian-edition)
 * [A quick tool for npm package scanning](/docs/blog/npm-breach-supply-chain-security)
 * [My DEF CON 33 experience](/docs/blog/defcon-33-takeaways)
 * [Make every launch a big deal](/docs/blog/celebrating-every-launch)
 * [A tale of three rate limiters](/docs/blog/rate-limiters)
 * [My good friend Claude](/docs/blog/my-good-friend-claude)
 * [My approach to React app architecture in 2025](/docs/blog/react-architecture-2025)
 * [Fun with JS streams](/docs/blog/fun-js-streams)
 * [Moonshots XXII: Hack to the Future recap](/docs/blog/2025-hackathon-recap)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Rolling dice](#rolling-dice)
 * [The players](#the-players)
 * [Primary On-Call](#primary-on-call)
 * [Secondary On-Call](#secondary-on-call)
 * [Incident Manager:](#incident-manager)
 * [Dungeon Master:](#dungeon-master)
 * [Playing the Game](#playing-the-game)
 * [Evil stirs in the night…](#evil-stirs-in-the-night)
 * [Investigating…](#investigating)
 * [Deception](#deception)
 * [The Cavalry Arrives](#the-cavalry-arrives)
 * [Learning Datadog: Trace Explorer](#learning-datadog-trace-explorer)
 * [Declare an incident?](#declare-an-incident)
 * [Following Up](#following-up)
 * [Recommendations](#recommendations)
 * [Thank You](#thank-you)
_Published October 16th, 2025_
![Portrait of Will Chieng.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ff21d935283e2ae3437e913e89fa0a56935fdb3a23233fc2b5e1e653c7d09706/assets/images/authors/will-chieng.png)
by Will Chieng, LaunchDarkly Engineer
> *It was a peaceful Friday night / Saturday morning. Your laptop long tucked away in your bag, and you [probably, hopefully] tucked away in bed. It is currently 3 AM local time - yes, even for you folks on the East Coast, somehow.
> Your phone starts ringing. Will you actually wake up? Roll for initiative.*
TL;DR: Play this with your team! Discover gaps as you role-play through the scenario, and then have a follow-up session to address questions in-depth.
 * Double-check your Pagerduty setup
 * Go through how to debug issues
 * Have fun!
## Rolling dice
For most of us on the Metrics team, this was the first time we were on-call after hours at LaunchDarkly. Some of us are frontend engineers and haven’t debugged backend issues before, and some of us are backend engineers that haven’t debugged frontend issues before. So to prepare ourselves, we role-played a mock incident in the style of Dungeons and Dragons tabletop.
![Photo of D4s, D6s, D8s, D20s in various shades of green in a fancy brown box, next to a soft looking emerald bag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f76f110dce0eeba77d00b156db0fdc0458012c2eae2358042ed3e258a79bec7a/assets/images/blog/dungeons-downtimes/d20.jpeg)
I can never remember how to roll initiative.
## The players
### Primary On-Call
 * Anthony
 * Hakan
 * Zakk * _See below for the twist_
### Secondary On-Call
 * Baslyos
 * Liz
### Incident Manager:
 * Tiffany
### Dungeon Master:
 * Will
## Playing the Game
The scenario starts off with everyone sleeping…
> _It was a peaceful Friday night / Saturday morning. Your laptop long tucked away in your bag, and you [probably, hopefully] tucked away in bed. It is currently 3 AM local time - yes, even for you folks on the east coast, somehow._
> _Your phone starts ringing. Will you actually wake up? Roll for initiative._
As primary on-call, Anthony, Hakan, and Zakk rolled a 20-sided dice (d20) to see if they passed a perception check - if they actually woke up and noticed their phone ringing.
![Screenshot of a private Slack channel titled #temp-dungeons-and-downtimes-metrics-20250821. Team member Anthony has sent a message to "/roll 1d20" from a D&D dice roller Slack app, and received a 13.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3a70840e35cfd8f374ea2d7b05d5164b7ae509ab446ac04d0a5a6a917f0fd921/assets/images/blog/dungeons-downtimes/dungeons-and-slacking.png)
There's a Slack plugin for everything these days.
Because they passed the check, I asked them to put their phones on Do-Not-Disturb mode, and actually paged them to double check that everyone had PagerDuty set up correctly:
## Evil stirs in the night…
While Anthony and Hakan were debugging, Zakk had other plans.
For you see, he did not share the same goals as the others.
> Unlike the others, Zakk, you’re already awake, sitting in the darkness when your phone lights up. As you look up in the mirror, you see a devilish reflection grinning back at you. You hear a voice like your own:
> “This is your chance to shine. Sabotage the others, be the hero, and take the glory of saving Metrics for yourself. Or better yet, watch the world burn.”
> Do you resist the dark urge or do you embrace it?
(Spoiler alert: he wholeheartedly embraced the darkness and became the antagonist)
Zakk‘s first order of business was to impose a _consequence_ on the team: GitHub is down and there’s a chance it won’t actually load.
## Investigating…
Anthony looks at the alert message:
> `Triggered: success rate SLO Burn Rate Alert. For the 7-day target, burn rates of 14.65 and 37.04 were measured for the past 4h (long window) and 20m (short window), respectively. Burn Rate has exceeded for metrics success rate & requests were 5xx in last 4h. Error budget rate has exceeded 5% of the 7-day error budget which will lead to violation of success rate SLO. Notified @slack-ops-metrics`
And noted this follow-up item:
He then looked for a Metrics dashboard, and discovered that there are multiple unrelated ones!
![Screenshot of 6 / 58 dashboards matching the query 'metrics.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/19703037761386434afb5bd0853c2f3759fc049ed4adb8b76433018a152e4019/assets/images/blog/dungeons-downtimes/dungeons-and-dashboards.png)
6 / 58 dashboards matching the query 'metrics.'
Anthony and Hakan took turns going through the traces:
![Screenshot of server logs displaying 9 errors to GET/internal/projects/projkey/metrics URLs.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2bbafdffccd2a3d91c8cf233d2bf1fab2d18528e8379e0d681284f5ea2491009/assets/images/blog/dungeons-downtimes/dungeons-and-metrics.png)
Roll 500 for Internal Server Error.'
And discovered an error message:
`"Failed to query Athena"`
Anthony then wanted to check up on Athena, but was met with a screen that suggested we didn’t have even have Athena access:
![Screenshot of AWS Athena login page that promises 'start querying data instantly.' Seems like that should require at least casting a spell.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/88d7870b09ded305df43856bb25de572bae2c799a094c0e502ba797041647112/assets/images/blog/dungeons-downtimes/aws-athena.png)
Athena? Is that an evil cleric?
Hakan then checked our Airflow DAGs, and found that the DAGs were fine.
## Deception
Zakk attempts to throw everyone off the scene and mislead everyone into looking at recent deploys instead of investigating the error message further.
![Screenshot of Slack dice roller plugin thingy.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6ac18949bb98441d131f8057174801e87cd8aee58cc9d6aa04b96ee9c33a426d/assets/images/blog/dungeons-downtimes/dungeons-and-deception.png)
Zakk rolls a d20 and gets 18. Anthony rolls a d20 and gets a 14.
And we fell victim to his silver tongue!
With that, the heroes turned their attention to looking at recent deploys… before realizing they needed to find out which repository / service to look at. Something to follow up on. 😄
## The Cavalry Arrives
The secondary on-call is paged! Liz successfully wakes up and responds to the page, but Baslyos unfortunately rolls too low (3/20), and continues peacefully sleeping away. 🛌💤
## Learning Datadog: Trace Explorer
And it was indeed one specific customer that was unable to load metric event activity!
## Declare an incident?
Role-playing as characters in the scenario, the team debated whether to declare an incident. Zakk pointed out our policy is to declare an incident if there is any doubt, so we declared an incident.
Tiffany arrives as incident manager:
![Screenshot from Slack: INCIDENT CHANNEL. Tiffany being a boss and making the definitive decision to declare an incident because everything involving metrics is on fire.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/654fa6de87cbd8cf7c409bfc674278cfbbf866cc8b5e7f8e358f2f203f81eaac/assets/images/blog/dungeons-downtimes/incident-manager.png)
Everything involving Metrics is on fire? Uh oh.
The team discussed the severity and the next steps, and the incident ends.
Fin.
## Following Up
We found that going through the Dungeons and Downtimes scenario was great for discovering issues, gaps, and questions, so Liz suggested a follow-up session where we dive in-depth on those specific questions.
_does not have any alerts configured yet_ , so we’re going to add those.
## Recommendations
I hope you enjoyed reading this lengthy post about our adventures in Dungeons and Downtimes! We encourage you to run similar scenarios for your teams, and to follow up on any questions unearthed. The scenario had branched off in a different direction than what I originally prepared for (which is actually awesome - that makes it more interesting!).
## Thank You
This session would not have gone as smoothly or as fun without the players:
 * Anthony and Hakan for discovering all the gaps and calling them out.
 * Baslyos for explaining our process and for showing us what happens if we decline a page.
 * Liz for teaching us how to page people, how to debug an issue using trace explorer, and pushing for a follow-up session to address questions in-depth.
 * Tiffany for the valuable feedback throughout the process, recording questions and screenshots, the Slack emoji, and encouraging people to share their screen while debugging.
 * Zakk for being a creative and entertaining villain. You gave us the most laughs!
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs