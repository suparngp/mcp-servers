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
 * [tl;dr: npm stands for nerfed package manager](#tldr-npm-stands-for-nerfed-package-manager)
 * [How to scan for compromised packages](#how-to-scan-for-compromised-packages)
 * [Make a local copy of the script](#make-a-local-copy-of-the-script)
 * [Run the script](#run-the-script)
 * [Conclusion](#conclusion)
_Published September 15th, 2025_
![Portrait of Patrick Kaeding.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3555dc6637aaf7efbdd16e06aeb6a8053f7b851b0129724c433ea19a15c968b8/assets/images/authors/patrick-kaeding.jpeg)
Patrick Kaeding, LaunchDarkly Engineer
## tl;dr: npm stands for nerfed package manager
In case you missed it, two popular npm packages ([`chalk`](https://github.com/chalk/chalk/issues/656) and [`debug`](https://github.com/debug-js/debug/issues/1005#issuecomment-3266885191)) were compromised last week.
I wrote a short script for quickly testing if a repo depends on any of the affected libraries. It makes use of [CycloneDX](https://cyclonedx.org/) to create a Software Bill of Materials (SBOM), and then queries that SBOM using `jq`. Let’s walk throug how to use it.
## How to scan for compromised packages
### Make a local copy of the script
Copy the following code into a file named `node-guard.sh`:
```
$
| #!/usr/bin/env bash
---|--- 
>
| # sbom-node-guard.sh
>
| # - Generates a CycloneDX SBOM for Node.js projects using cdxgen in Docker
>
| # - Scans the SBOM for specific package@version pairs with jq
>
| # - Exits non-zero if ANY listed pair is present
>
| 
>
| set -uo pipefail
>
| 
>
| # -------- Config --------
>
| DOCKER_IMAGE="${DOCKER_IMAGE:-ghcr.io/cyclonedx/cdxgen:v11.7.0}"
>
| OUTPUT_BOM="${OUTPUT_BOM:-bom.json}" # You can override with env var if you like
>
| PROJECT_DIR="${PROJECT_DIR:-$PWD}"
>
| # ------------------------
>
| 
>
| error() { printf "ERROR: %s\n" "$*" >&2; }
>
| info() { printf "INFO: %s\n" "$*\n" >&2; }
>
| 
>
| # Prereqs
>
| command -v docker >/dev/null 2>&1 || { error "docker not found in PATH"; exit 2; }
>
| command -v jq >/dev/null 2>&1 || { error "jq not found in PATH"; exit 2; }
>
| 
>
| # Detect NodeJS project (common markers)
>
| if [ ! -f "$PROJECT_DIR/package.json" ] \
>
| && [ ! -f "$PROJECT_DIR/package-lock.json" ] \
>
| && [ ! -f "$PROJECT_DIR/yarn.lock" ] \
>
| && [ ! -f "$PROJECT_DIR/pnpm-lock.yaml" ] \
>
| && [ ! -f "$PROJECT_DIR/bun.lockb" ]; then
>
| info "No Node.js project detected. Doing nothing."
>
| exit 0
>
| fi
>
| 
>
| info "Node.js project detected. Creating SBOM with cdxgen…"
>
| 
>
| # Ensure we can write the BOM file with host UID/GID
>
| USER_FLAG=()
>
| if command -v id >/dev/null 2>&1; then
>
| USER_FLAG=( -u "$(id -u)":"$(id -g)" )
>
| fi
>
| 
>
| # Generate SBOM (CycloneDX JSON) with -t nodejs
>
| # cdxgen writes relative to the working directory we mount as /app
>
| docker run --rm \
>
| "${USER_FLAG[@]}" \
>
| -v "$PROJECT_DIR":/app \
>
| -w /app \
>
| "$DOCKER_IMAGE" \
>
| -t nodejs -o "$OUTPUT_BOM" >/dev/null
>
| 
>
| BOM_FILE="$PROJECT_DIR/$OUTPUT_BOM"
>
| if [ ! -s "$BOM_FILE" ]; then
>
| error "SBOM file not created or empty: $BOM_FILE"
>
| exit 3
>
| fi
>
| 
>
| info "SBOM created at: $BOM_FILE"
>
| info "Scanning for disallowed package versions…"
>
| 
>
| # List of "name|version" to check
>
| declare -a CHECKS=(
>
| "ansi-styles|6.2.2"
>
| "debug|4.4.2"
>
| "chalk|5.6.1"
>
| "supports-color|10.2.1"
>
| "strip-ansi|7.1.1"
>
| "ansi-regex|6.2.1"
>
| "wrap-ansi|9.0.1"
>
| "color-convert|3.1.1"
>
| "color-name|2.0.1"
>
| "is-arrayish|0.3.3"
>
| "slice-ansi|7.1.1"
>
| "color|5.0.1"
>
| "color-string|2.1.1"
>
| "simple-swizzle|0.2.3"
>
| "supports-hyperlinks|4.1.1"
>
| "has-ansi|6.0.1"
>
| "chalk-template|1.1.1"
>
| "backslash|0.2.1"
>
| )
>
| 
>
| FOUND=0
>
| 
>
| for pair in "${CHECKS[@]}"; do
>
| NAME="${pair%%|*}"
>
| VERSION="${pair##*|}"
>
| 
>
| # Run the exact jq selection you specified (semantically identical)
>
| RESULT="$(jq -c '.components[] | select(.name == "'"$NAME"'" and .version == "'"$VERSION"'")' "$BOM_FILE")"
>
| 
>
| if [ -n "$RESULT" ]; then
>
| printf "FOUND: %s@%s in SBOM\n" "$NAME" "$VERSION" >&2
>
| echo "$RESULT" | jq . >&2
>
| FOUND=1
>
| fi
>
| done
>
| 
>
| if [ "$FOUND" -ne 0 ]; then
>
| error "One or more disallowed packages were found."
>
| exit 1
>
| fi
>
| 
>
| info "No disallowed package versions found."
>
| exit 2
```
### Run the script
Run the script by using the following command:
```
$
| cd /path/to/maybe/infected/project && /path/to/sbom-node-guard.sh
---|--- 
```
If it is not a Node.js project, the script will exit with code `0`, after logging:
```
$
| No Node.js project detected. Doing nothing.
---|--- 
```
If no compromised package versions are detected, the script will exit with code `0` and output logs similar to the following:
```
$
| INFO: Node.js project detected. Creating SBOM with cdxgen…\n
---|--- 
>
| INFO: SBOM created at: /path/to/maybe/infected/project/bom.json\n
>
| INFO: Scanning for disallowed package versions…\n
>
| INFO: No disallowed package versions found.\n
```
If an affected package was found, the script will exit with code `1` and output logs similar to the following (note that this is flagging version 4.4.1 of `debug`, which is not actually the compromised version— this is for testing/illustrative purposes):
```
$
| INFO: Node.js project detected. Creating SBOM with cdxgen…\n
---|--- 
>
| INFO: SBOM created at: /path/to/maybe/infected/project/bom.json\n
>
| INFO: Scanning for disallowed package versions…\n
>
| FOUND: debug@4.4.1 in SBOM
>
| {
>
| "group": "",
>
| "name": "debug",
>
| "version": "4.4.1",
>
| "scope": "optional",
>
| "hashes": [
>
| {
>
| "alg": "SHA-512",
>
| "content": "8e2709b2144f03c7950f8804d01ccb3786373df01e406a0f66928e47001cf2d336cbed9ee137261d4f90d68d8679468c755e3548ed83ddacdc82b194d2468afe"
>
| }
>
| ],
>
| "purl": "pkg:npm/debug@4.4.1",
>
| "type": "library",
>
| "bom-ref": "pkg:npm/debug@4.4.1",
>
| "properties": [
>
| {
>
| "name": "SrcFile",
>
| "value": "yarn.lock"
>
| }
>
| ],
>
| "evidence": {
>
| "identity": [
>
| {
>
| "field": "purl",
>
| "confidence": 1,
>
| "methods": [
>
| {
>
| "technique": "manifest-analysis",
>
| "confidence": 1,
>
| "value": "yarn.lock"
>
| }
>
| ],
>
| "concludedValue": "yarn.lock"
>
| }
>
| ]
>
| }
>
| }
>
| ERROR: One or more disallowed packages were found.
```
If you have a lot of projects to run this on, you can use something like [all repos](https://github.com/asottile/all-repos) to automate running this script against all your repositories.
## Conclusion
Supply chain security has been neglected for too long in the history of the tech industry. It became more important after [the SolarWinds cyber attack](https://www.fortinet.com/resources/cyberglossary/solarwinds-cyber-attack). The [SLSA Framework](https://slsa.dev/) is the best model we have for thinking about supply chain security, but it doesn’t really address dependency threats.
We must focus on preventing/detecting maliciously-modified dependencies, or managing vulnerabilities in dependencies, since those would be brought into the final software being built. SBOMs help in this regard, as they serve to document what versions of what dependencies go into the software. They can be used with [SLSA](https://slsa.dev/blog/2022/05/slsa-sbom) to make a lot of progress.
Open source maintainers are the target of increasingly sophisticated social engineering attacks, and we must be vigilant. Every software that team relies on open source should be package scanning. Here is one more tool for your toolbox. Feel free to use it the next time a vulnerability arises.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs