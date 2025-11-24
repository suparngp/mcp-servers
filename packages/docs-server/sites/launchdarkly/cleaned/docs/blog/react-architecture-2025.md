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
 * [TL;DR](#tldr)
 * [Intro](#intro)
 * [<cautionary-tale>](#cautionary-tale)
 * [Adding a harmless little prop](#adding-a-harmless-little-prop)
 * [Adding completely different behavior](#adding-completely-different-behavior)
 * [Adding even more completely different behavior](#adding-even-more-completely-different-behavior)
 * [The wheels start falling off](#the-wheels-start-falling-off)
 * [</cautionary-tale>](#cautionary-tale-1)
 * [How did we get here?](#how-did-we-get-here)
 * [The props are confusing](#the-props-are-confusing)
 * [No access to child components](#no-access-to-child-components)
 * [Tightly-coupled components](#tightly-coupled-components)
 * [What I’d do differently](#what-id-do-differently)
 * [1. Lift content up](#1-lift-content-up)
 * [2. Push state down](#2-push-state-down)
 * [A final example: a Task component](#a-final-example-a-task-component)
 * [But y, tho?](#but-y-tho)
_Published August 27th, 2025_
![Portrait of Paul Heggeseth.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/03acebeed4447a4b2ad049ab7571d4c7b00707e01c93742646a3acfbeee58fc1/assets/images/authors/paul-heggeseth.jpeg)
by Paul Heggeseth, LaunchDarkly Engineer
## TL;DR
This is a bit of a deep dive into my current philosophy of React application development in 2025. The main takeaway is that a lot of component complexity can be mitigated by following these two patterns:
 1. **Lift content up** – if a component doesn’t influence _how_ a child component is rendered, but just renders it in a given slot, the act of rendering that child component could be moved up to _this_ component’s parent.
 2. **Push state down** – the points where “global” state is “consumed” by components (think Redux/React Query/React Context) should be pushed down as close as possible to the components that actually render UI based on that state, rather than consuming the global state in an ancestor component and passing down an aspect of the state multiple levels in the component tree.
Without further ado…
## Intro
At its core, using React to build user interfaces is quite simple. It produces UI as a function of some state:
```
1
| type App = (state) => UI
---|--- 
```
Describe what UI you want with JSX (`createElement()` calls visualized as HTML), as well as how your state should influence what UI to show, using plain JavaScript logic, and React itself takes care of making it happen (and re-happen).
Consider this “component” that displays the current weather:
```
1
| function CurrentWeather(props: { status: 'sunny' | 'raining' }) {
---|--- 
2
| return (
3
| <div>
4
| Today is {new Date().toString()}, and it is currently {props.status} outside.
5
| </div>
6
| );
7
| }
```
When this component “renders” (the function is executed and returns a description of what UI should be shown), most of it is plain text, but there are two pieces of variable data: a date, and the `status` of the weather.
At the time the component renders, that `new Date().toString()` expression is evaluated and produces a datetime string, `props.status` is evaluated to either be `'sunny'` or `'raining'`, and the component (essentially) returns a complete string similar to `Today is January 1st, 2025, and it is currently sunny outside.`
It’s beautiful, it’s simple, it’s declarative. No wonder everyone uses React! Until…
## `<cautionary-tale>`
## Adding a harmless little prop
This component is useful, but let’s say I’m building a large weather app, and that this component will be used in many different places and in different contexts. In some places, I may want this text to be displayed as a plain string (like above), and in some places, I may want the date and the `status` to be bold/highlighted. We could enable these different “variants” of this component by adding more props like this:
```
1
| function CurrentWeather(props: { 
---|--- 
2
| status: 'sunny' | 'raining'; 
3
| variant?: 'default' | 'highlighted';
4
| }) {
5
| const dateString = new Date().toString();
6
| return (
7
| <div>
8
| Today is 
9
| {props.variant === 'highlighted' ? <strong>{dateString}</strong> : dateString}, 
10
| and it is currently 
11
| {props.variant === 'highlighted' ? <strong>{props.status}</strong> : props.status} 
12
| outside.
13
| </div>
14
| );
15
| }
```
Ok great! Now if I render my component like this `<CurrentWeather status="sunny" variant="highlighted" />` (components can be treated as JSX too), I get the date and status in bold text. Just wait, things are about to get a lot less great!
## Adding completely different behavior
Another team wants to use this component, and they DON’T want bold text using a `<strong>` element; they want the date string to show an ad for watches in a popover when you hover over it (PMs ask for weird stuff sometimes 🤷‍♂️). So, to enable this behavior, we update the component like this:
```
1
| function CurrentWeather(props: { 
---|--- 
2
| status: 'sunny' | 'raining'; 
3
| variant?: 'default' | 'highlighted';
4
| includeWatchUpsell?: boolean;
5
| }) {
6
| const dateString = new Date().toString();
7
| let date: ReactNode;
8
| if (props.includeWatchUpsell) {
9
| date = <WatchUpsellPopover>{dateString}</WatchUpsellPopover>;
10
| } else if (props.variant === 'highlighted') {
11
| date = <strong>{dateString}</strong>;
12
| } else {
13
| date = dateString;
14
| }
15
| let status: ReactNode;
16
| if (props.variant === 'highlighted') {
17
| status = <strong>{props.status}</strong>;
18
| } else {
19
| status = props.status;
20
| }
21
| return (
22
| <div>
23
| Today is {date}, and it is currently {status} outside.
24
| </div>
25
| );
26
| }
```
Ok, a few nice things have happened, and a few very NOT nice things have happened, including:
 1. First, we’re taking advantage that components are just plain JavaScript functions and pushing the logic for what to show for the `date` and `status` up into the body of the function, rather than what would have been quite large and confusing ternary expressions. This is a GOOD development!
 2. Now `CurrentWeather` is tightly coupled to `WatchUpsellPopover`. It is fully responsible for making THAT work, when all it did before was render the date and the current weather. This is NOT a good development.
## Adding even _more_ completely different behavior
But now that `WatchUpsellPopover` is making us so much money that ANOTHER team wants to use it too, but they want to sell some kind of weather tablet that just happens to also tell time (PMs, man. I’m tellin’ ya… 🙄). So now they’ve swooped into our component and updated it some more:
```
1
| function CurrentWeather(props: { 
---|--- 
2
| status: 'sunny' | 'raining'; 
3
| variant?: 'default' | 'highlighted';
4
| includeWatchUpsell?: boolean;
5
| includeTabletUpsell?: boolean;
6
| }) {
7
| const { 
8
| status, 
9
| variant = 'default', 
10
| includeWatchUpsell, 
11
| includeTabletUpsell = true,
12
| } = props;
13
| const currentUser = useCurrentUser();
14
| const dateString = new Date().toString();
15
| 
16
| let date: ReactNode;
17
| if (includeTabletUpsell) {
18
| date = (
19
| <TabletUpsellPopover currentUserName={currentUser.data.name}>
20
| {dateString}
21
| </TabletUpsellPopover>
22
| );
23
| } else if (includeWatchUpsell) {
24
| date = <WatchUpsellPopover>{dateString}</WatchUpsellPopover>;
25
| } else if (variant === 'highlighted') {
26
| date = <strong>{dateString}</strong>;
27
| } else {
28
| date = dateString;
29
| }
30
| 
31
| let status: ReactNode;
32
| if (variant === 'highlighted') {
33
| status = <strong>{status}</strong>;
34
| } else {
35
| status = status;
36
| }
37
| 
38
| return (
39
| <div>
40
| Today is {date}, and it is currently {status} outside.
41
| </div>
42
| );
43
| }
44
| 
45
| function useCurrentUser() {
46
| const currentUserContext = use(CurrentUserContext);
47
| 
48
| if (!currentUserContext) {
49
| throw new Error('expected CurrentUserContext');
50
| }
51
| 
52
| return {
53
| data: currentUserContext.currentUser,
54
| };
55
| }
```
## The wheels start falling off
Can you spot the bug they added…I’ll wait……….seriously, look closely……found it, yet? 
… 
… 
… 
Ok, so suddenly, everywhere we show the `<CurrentWeather />`, we’re trying to sell people tablets! That new `includeTabletUpsell` has a default value of `true` and because it’s the first `if` statement, we now always render the tablet upsell component, regardless of whatever other props we pass in.
Actually there’s ANOTHER potential bug, which is that now `CurrentWeather` needs to be rendered within a `CurrentUserContext` so that we can pass a `userName` to `TabletUpsellPopover`. This means that, in any instances where `CurrentWeather` was previously rendered outside of the `CurrentUserContext`, we’d get another error, even if we didn’t care at all about using that tablet upsell thing!
Incidents are declared, postmortems are had, feelings are hurt. Some executive decides to make their career by “spearheading an initiative” to refactor these upsell components so that they can’t step on each other’s toes anymore:
```
1
| function CurrentWeather(props: { 
---|--- 
2
| status: 'sunny' | 'raining'; 
3
| variant?: 'default' | 'highlighted';
4
| upsellKind?: 'watch' | 'tablet';
5
| }) {
6
| const { status, variant = 'default', upsellKind } = props;
7
| const dateString = new Date().toString();
8
| 
9
| let date: ReactNode;
10
| if (upsellKind) {
11
| date = <UpsellPopover kind={upsellKind}>{dateString}</UpsellPopover>;
12
| } else if (variant === 'highlighted') {
13
| date = <strong>{dateString}</strong>;
14
| } else {
15
| date = dateString;
16
| }
17
| 
18
| let status: ReactNode;
19
| if (variant === 'highlighted') {
20
| status = <strong>{status}</strong>;
21
| } else {
22
| status = status;
23
| }
24
| 
25
| return (
26
| <div>
27
| Today is {date}, and it is currently {status} outside.
28
| </div>
29
| );
30
| }
```
The exec gets promoted, this bug gets fixed, the code is arguably better than it was before, everything’s good…until the next team decides to use it…
# `</cautionary-tale>`
# How did we get here?
What started out as a simple component that rendered a string ended up growing and growing and eventually causing bugs. There’s no single actor to blame in this story; everyone was just trying to do their job and to make the smallest, most sensible change at the time, but without a mutually agreed upon set of patterns and principles for how to write components, things can get out of control quickly. Some basic critiques I have are:
## The `props` are confusing
Our component now has a `variant` prop and an `upsellKind` prop. This component’s name and its external API (the `props` it takes in) doesn’t give you any clue how these props are used or how they work together or how they can conflict. I’m forced to internalize the component’s implementation to really understand what’s happening and how to use it.
## No access to child components
If I want highlighted text, but to not use the `<strong>` element, I’d have to make yet another confusing change to this component’s logic to swap it out in some way, like we do for the `UpsellPopover`.
## Tightly-coupled components
Any change to `UpsellPopover`, like to the `kind` prop it supports, now also requires a change to `CurrentWeather`. Their APIs need to stay in sync in order for `CurrentWeather` to work properly. If `UpsellPopover` were to get widely and deeply adopted in the same way across the organization, a simple change to its API now requires a lot of refactoring.
# What I’d do differently
Having spent over 4 years building and using React components at LD, I’ve seen this kind of organic bloat happen over and over again. Sometimes it’s code that one person wrote for a specific purpose that gets picked up and adapted to a totally different context, sometimes it involves not knowing where to look to find the most relevant pattern for what you’re trying to do. Sometimes it’s simply a good idea that gradually turns into a bad idea.
But our application is complex and so is the UI that supports it, so are large components with some amount of error-prone complexity just unavoidable, despite our best intentions? Sometimes, yes, but here are some patterns and principles I’ve gradually settled on that can really help both minimize and manage complexity in React apps:
## 1. Lift content up
`CurrentWeather` is responsible for A LOT of logic to decide what to render in the `{date}` slot. This logic will only ever grow as we decide to render that `date` in more and different ways. A more maintainable approach would be to “lift up” the actual rendering of the `date` to be outside `CurrentWeather` and to pass the rendered content back in as a `date` prop. If we do that, then each team can easily decide for themselves what kind of date they want to render, and they completely own and control what props are needed to render that date:
```
1
| type WeatherStatus = 'sunny' | 'raining';
---|--- 
2
| 
3
| function CurrentWeather(props: {
4
| date: ReactNode;
5
| status: ReactNode; 
6
| }) {
7
| return (
8
| <div>
9
| Today is {props.date}, and it is currently {props.status} outside.
10
| </div>
11
| );
12
| }
13
| 
14
| function HighlightedCurrentWeather(props: { status: WeatherStatus }) {
15
| return (
16
| <CurrentWeather 
17
| date={<strong>{new Date().toString()}</strong>}
18
| status={<strong>{props.status}</strong>}
19
| />
20
| );
21
| }
22
| 
23
| function WatchTeamCurrentWeather(props: { status: WeatherStatus }) {
24
| return (
25
| <CurrentWeather 
26
| date={<UpsellPopover kind="watch">{new Date().toString()}</UpsellPopover>}
27
| status={props.status}
28
| />
29
| );
30
| }
31
| 
32
| function TabletTeamCurrentWeather(props: { status: WeatherStatus }) {
33
| return (
34
| <CurrentWeather 
35
| date={<UpsellPopover kind="tablet">{new Date().toString()}</UpsellPopover>}
36
| status={props.status}
37
| />
38
| );
39
| }
```
Here, we’re relinquishing control of WHAT to render for the `date` and `status` and focusing on HOW to render them and in what layout. After that, each team writes a small wrapper component that composes `CurrentWeather` together with WHAT they want to render for the `date` and `status`.
But now each wrapper component evaluates `new Date().toString()`, which is a lot of duplication that could lead to inconsistencies across the app. If we want to regain control JUST over how the current date string is created, we can do that like this:
```
1
| type WeatherStatus = 'sunny' | 'raining';
---|--- 
2
| 
3
| function CurrentWeather(props: {
4
| date: (dateString: string) => ReactNode;
5
| status: ReactNode; 
6
| }) {
7
| const dateString = new Date().toString();
8
| 
9
| return (
10
| <div>
11
| Today is {props.date(dateString)}, and it is currently {props.status} outside.
12
| </div>
13
| );
14
| }
15
| 
16
| function HighlightedCurrentWeather(props: { status: WeatherStatus }) {
17
| return (
18
| <CurrentWeather 
19
| date={(dateString) => <strong>{dateString}</strong>}
20
| status={<strong>{props.status}</strong>}
21
| />
22
| );
23
| }
24
| 
25
| function WatchTeamCurrentWeather(props: { status: WeatherStatus }) {
26
| return (
27
| <CurrentWeather 
28
| date={(dateString) => <UpsellPopover kind="watch">{dateString}</UpsellPopover>}
29
| status={props.status}
30
| />
31
| );
32
| }
33
| 
34
| function TabletTeamCurrentWeather(props: { status: WeatherStatus }) {
35
| return (
36
| <CurrentWeather 
37
| date={(dateString) => <UpsellPopover kind="tablet">{dateString}</UpsellPopover>}
38
| status={props.status}
39
| />
40
| );
41
| }
```
We type the `date` prop as `(dateString: string) => ReactNode`, expecting consumers to provide a function that we can call with the date string that WE control and that returns a `ReactNode`. We still don’t have control over what that `ReactNode` actually is, but we’ve standardized the format of the `dateString`, and, apart from that, we’re trusting our teams to render something sensible.
## 2. Push state down
Remember that other potential bug about the current user context? Let’s revisit that wrapper that the Tablet Team may have made. Given that they needed that `CurrentUserContext`, they’d end up writing this:
```
1
| function TabletTeamCurrentWeather(props: { status: WeatherStatus }) {
---|--- 
2
| const currentUser = use(CurrentUserContext);
3
| 
4
| if (!currentUser) {
5
| throw new Error('expected CurrentUserContext');
6
| }
7
| 
8
| return (
9
| <CurrentWeather 
10
| date={(dateString) => (
11
| <TabletUpsellPopover currentUserName={currentUser.name}>
12
| {dateString}
13
| </TabletUpsellPopover>
14
| )}
15
| status={props.status}
16
| />
17
| );
18
| }
```
They’re free to use `TabletUpsellPopover` directly again, as this wrapper component is clearly meant for THEIR feature. So they’ve added that hook to `use` the `CurrentUserContext`. But should this logic REALLY be here? It only serves to pass on the `currentUserName` to the subcomponent. Given this, PLUS the fact that we’re assuming that `CurrentUserContext` is “global state” in some sense (meaning it’s provided at the root of the application in some way), there’s no point in consuming that context here. It would best be _**pushed down**_ closer to the component that needs it:
```
1
| function TabletTeamCurrentWeather(props: { status: WeatherStatus }) {
---|--- 
2
| return (
3
| <CurrentWeather 
4
| date={(dateString) => (
5
| <TabletUpsellPopover>
6
| {dateString}
7
| </TabletUpsellPopover>
8
| )}
9
| status={props.status}
10
| />
11
| );
12
| }
13
| 
14
| function TabletUpsellPopover({ children }: { children: ReactNode }) {
15
| const currentUser = useCurrentUser();
16
| return (
17
| // content
18
| );
19
| }
```
# A final example: a `Task` component
Consider this component, which renders a single task in a task list:
```
1
| function Task({ task, onCompletedChange, onNameChange, onDelete }) {
---|--- 
2
| return (
3
| <div>
4
| <input 
5
| type="checkbox" 
6
| checked={task.completed} 
7
| onChange={(event) => onCompletedChange(event.target.checked)}
8
| />
9
| <input
10
| type="text"
11
| value={task.name}
12
| onChange={(event) => onNameChange(event.target.value)}
13
| />
14
| <button onClick={onDelete}>Delete</button>
15
| </div>
16
| );
17
| }
```
That’s rendered within a `TaskList` component:
```
1
| function TaskList() {
---|--- 
2
| const { listId } = useParams();
3
| const { tasks, onTaskCompletedChange, onTaskNameChange, onTaskDelete } = useTaskListManager({ listId });
4
| return (
5
| <ol>
6
| {tasks.map(task => (
7
| <Task 
8
| task={task}
9
| onCompletedChange={(checked) => onTaskCompletedChange(task.id, checked)}
10
| onNameChange={(name) => onTaskNameChange(task.id, name)}
11
| onDelete={() => onTaskDelete(task.id)}
12
| />
13
| ))}
14
| </ol>
15
| )
16
| }
```
At face value, this seems quite reasonable! But multiply the complexity X50, and we get some of the huge components and state management hooks we currently deal with on the frontend in `gonfalon`.
Consider this, in contrast:
```
1
| function TaskList() {
---|--- 
2
| const { listId } = useParams();
3
| const list = useList({ listId });
4
| 
5
| return (
6
| <ol>
7
| {list.data.taskIds.map((taskId) => (
8
| <TaskListItemLayout
9
| completedCheckbox={<TaskCompletedCheckbox taskId={taskId} />}
10
| nameInput={<TaskNameInput taskId={taskId} />}
11
| deleteButton={<TaskDeleteButton taskId={taskId} />}
12
| />
13
| ))}
14
| </ol>
15
| )
16
| }
17
| 
18
| function TaskListItemLayout({ completedCheckbox, nameInput, deleteButton }) {
19
| return (
20
| <li>
21
| {completedCheckbox}
22
| {nameInput}
23
| {deleteButton}
24
| </li>
25
| );
26
| }
27
| 
28
| function TaskCompletedCheckbox({ taskId }) {
29
| const task = useTask({ taskId });
30
| 
31
| return (
32
| <input 
33
| type="checkbox" 
34
| checked={task.data.completed} 
35
| onChange={(event) => event.target.checked ? task.actions.complete() : task.actions.uncomplete()}
36
| />
37
| )
38
| }
39
| 
40
| function TaskNameInput({ taskId }) {
41
| const task = useTask({ taskId });
42
| 
43
| return (
44
| <input
45
| type="text"
46
| value={task.data.name}
47
| onChange={(event) => task.actions.changeName(event.target.value)}
48
| />
49
| );
50
| }
51
| 
52
| function TaskDeleteButton({ taskId }) {
53
| const task = useTask({ taskId });
54
| 
55
| return (
56
| <button onClick={task.actions.delete}>Delete</button>
57
| )
58
| }
```
# But y, tho?
This may seem a bit nuts, in comparison! Dare I say: `over-engineered`! But fast forward 1, 2, 3 years. What’s changed? Maybe we’ve added more elements to a `Task`, maybe we’ve refactored how we fetch, cache, and update tasks in the backend (the `useTask` hook). Maybe we’re feature flagging a refactor to the look and feel of the completed checkbox.
In any case, we’ve distilled the architecture down to its core units. Each component/hook does one thing and can be easily swapped/discarded accordingly. The APIs we’ve chosen to define, and the boundaries we’ve chosen to draw, let each piece of the puzzle be blissfully unaware of the other.
By _**lifting content up**_ and _**pushing state down**_ as much as we can, we can flatten the number of layers that separate the UI we show from the things they do.
I’ll have more to say later as it relates to specific implications or recommendations for how we could better leverage these patterns going forward.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs