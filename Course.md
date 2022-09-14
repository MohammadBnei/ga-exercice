# Github Action

Github Action is a CI CD pipeline directly integrated with github.

## Advantages
- Fully integrated with Github
- Respond to any GitHub event
	- Push PR tags...
	- New issue,...
- Community-powered workflows
	- First party company
	- Third party company
	- community
- Any platform, any language, any cloud

## Key Functionalities
- Linux, macOS, Windows and containers
- Matrix builds
- Streaming, searchable, linkable logs
	- Reference specific row in your issue *(exemple)*
- Built-in secret store
- Easy to write, easy to share
	- Use any language that "compiles" to JS

You can basically do anything with github actions

![GA_Process](GA_Process.png)
*Github Action process - Schema 1*

## Events
- List of events : [Triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- Github triggered events :
	- **push**, **pull_request**, ...
```yaml
on: 
	push: 
		branches: [ master ] 
	pull_request: 
		branches: [ master ]

```
- **Schedule**
	- UTC times using [POSIX cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)
	- **schedule**
```yaml
on:
  schedule:
    # * is a special character in YAML so you have to quote this string    
    - cron:  '30 5,17 * * *'
```
- Manually triggered
	- Third party systems triggers
	- [Doc](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow)
	- **workflow_dispatch**
```yaml
on: workflow_dispatch
```

## Workflows
- Workflows are like pipelines
- Codify useful, customised processes
- **.yaml** syntax
- **.github/workflows/\*\***

Worflow files glue together existing actions in sequence
1. Listen for particular events
2a. Run **pre-existing** actions 
2b. shell scripts
	- *Linux* : **bash**
	- *Windows*: **Powershell**

```yaml
name: Exemple workflow

on:
	push:

jobs:
	build:
		runs-on: ubuntu-latest
		
		steps:
			- uses: actions/checkout@v3
			
			# (1.) Pre-existing action :
			- name: Use Node.js 16
			  uses: actions/setup-node@v3
			  with:
				node-version: 16
				
			# (2.) Shell script :
			- name: Unit Tests
			  run: |
				  npm install
				  npm test
```

- Actions run in **VMs** (Linux, Win, Mac)
	- Or **container** in Linux VM
- Logs streaming & artifacts
- **Secret store** with each repository or organisation

## Actions
[Create an action (docs)](https://docs.github.com/en/actions/creating-actions)

- Reusable units of code
- Referencing vs authoring Actions
- Administrative features
- Storing shared Actions
- Post your actions to the github Marketplace

Minimum requirements :
- **action.yml**
	- action metadata file
	- inputs
	- outputs
	- os
- **index.* (entrypoint)**
	- Any language if using docker
	- compiling to JS otherwise

Exemple - action.yml
```yaml
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  who-to-greet:  # id of input
    description: 'Who to greet'
    required: true
    default: 'World'
outputs:
  time: # id of output
    description: 'The time we greeted you'
runs:
  using: 'node16'
  main: 'dist/index.js'
```
index.js
```js
const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2);
//   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

You can lookup pre-packaged actions in the [Github Marketplace](https://github.com/marketplace?type=).

Types of action :
- **Monolithic**
	- Does a lot of things
	- Deploy, Test, call api...
	- Not a good approach
- **Chainable**
	- Self explanatory
	- Clean logs

### Best practices
- **Versionning**
- Documentation
- Test coverage
- **Maintain metadata**
- Post to the marketplace

## Troubleshooting tools
- Workflow editor
- Action-Debugging
	- Set these secrets to true :
		- **ACTIONS_STEP_DEBUG**
			- In the logs, you'll see exactly what this action or step is doing
		- **ACTIONS_RUNNER_DEBUG**
			- Used for hosted runners
			- Instruct github action to save specific runner logs 
- VS Code extension
- Try locally : [nektos/act](https://github.com/nektos/act)

## Artifacts
Artifacts are useful to save some data between jobs.
Can only use artifacts from current workflow.

```yaml
name: Artifact example

on: [push]

jobs:
  build_and_test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm test
          
      # Upload artifact
      - name: Archive production artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist-without-markdown
          path: |
            dist
            !dist/**/*.md

      # Download artifact
	  - name: Download a single artifact
	    uses: actions/download-artifact@v3
	    with:
		  name: dist-without-markdown
```

## Environnements
- Logical representation of your environnements
- Dev - Test - QA - PreProd - Prod ...
- Whole environment or "slice"
- Can define their own secrets
- Have protection rules
	- Required reviewers
	- Wait timer
	- Allowed branches
	- APIs for 3rd party integration

- Can be configured directly from the settings of the repo

```yaml
name: Deployment

on: [push]

jobs:
  deployment:
    runs-on: ubuntu-latest
    environment:
	  # Name of your environment (must match the name in the settings)
      name: production
      # URL of your app
      url: https://github.com
    steps:
      - name: deploy
        # ...deployment-specific steps
```

### Deployment logs
- Single or Multiple environments
- Complete history of deployments
- Status of deployment

## Self hosted runners

### Github hosted
- Automatic updates
- Managed and maintained by GitHub
- Clean instance for every job execution
- Pricing

### Self-Hosted
- Open source
- Automatic updates for the self-hosted runner application only
- Customisable
- Responsible for the cost of runner machines
- Not recommended for public repositories
- [Runner-Script](https://github.com/actions/runner/releases)

#### Best Practices
- Create a dedicated user for the Actions runner
- Enable limited sudo
- Multiple pools with specific tools
- *Actions inside Docker not supported*

#### Security risks
Public repositories with self-hosted runners pose potential risks.
- Malicious programs run on the machine
- Escape the machine's runner sandbox
- Expose access to machine's network
- Persist unwanted/dangerous data

### Runner groups
- Configure on enterprise and/or organization level
- Scope to specific organizations and/or repositories
- Move runners between groups
- A runner can only be in one group at a time

## Secrets Managements
- **GITHUB_TOKEN**
	- Automatically available to the actions of the repo
	- Give access to the action to make interaction with the repo
	- Specific to each action
- secrets.\<NAME\>
- CLI management
- API management
- Organization → Repository → Environments

### Limitations
- Secrets cannot be read in apps
	- Actions API does not provide a resource to the encrypted value
- By default, secrets are not passed to workflows triggered by forked repos. You can enable this with private repos.
- Workflow can have up to 100 secrets
- Secrets are limited to 64K
	- can use `gpg` to bypass this

## Github Action API
- Endpoints available to view anything from the Actions UI
- Artifacts, workflows, job information, run information
- Secrets API to manage and update your secret stores
	- The secrets value is not available

## Custom Event
- Custom event creation
- JSON payload

Triggered workflow :
```yaml
name: Target for call from another workflow

on:
	repository_dispatch:
		types: [MyCustomEventName]

jobs:
	build:
		runs-on: ubuntu-latest

		steps: 
			- name: Print client payload
			  run: |
				  echo 'ParamA' is ${{github.event.client_payload.paramA }}
				  echo 'boolean' is ${{github.event.client_payload.boolean }}
				  
		
```

Caller workflow :
```yaml
name: Call another workflow

on:
	workflow_dispatch:

jobs:
	build:
		runs-on: ubuntu-latest

		steps:
			- name: Repository dispatch
			  uses: peter-evans/repository-dispatch@v1.1.2
			  with:
				  # A repo scoped Github Personal Access Token
				  token: ${{ secrets.REPO_PAT }}
				  # A custom webhook event name
				  event-type: MyCustomEventName
				  # JSON payload with extra information about the webhook event that your action or workflow may use.
				  client-payload: '{ "paramA": 123, "boolean": false}'
```
