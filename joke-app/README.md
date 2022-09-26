# Docker Deployment

In this tutorial we'll define a github action CI pipeline that will :
1. Build our app
2. Test it
3. Build the docker image
4. Deploy the docker image to DockerHub (public repository)

## Building and testing our app

This joke app is a simple NestJS application, but we will use pnpm to build and test it.

Let's start.

### Create a github action file

#### .github/workflows/docker-deploy.yml
Github automatically detects pipeline action when you create a yml file in the .github/workflows directory. This file contains all the settings and steps to do basically anything you want from a ci-cd pipeline.

Let's start with the basics. Give your pipeline a name :

```yaml
name: Docker Image CI
```

This name is what you'll see in your github repository UI (under the "Action" tab)

Next, we need to tell github action when to run this workflow. We have many options for that, the most common one being by action type (push, pull_request,...) and branch.

Add the on directive after the name of the worflow :

```yaml
on:
  push:
    branches: ["main"]
```

Our workflow will now run everytime we **push** to the branch **main**

Finally, we will setup a basic Node environnement to build and test our app :

```yaml
jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js 16
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: pnpm/action-setup@v2.0.1
        name: Install pnpm
        id: pnpm-install
        with:
          version: 7

      - name: Install dependencies
        run: pnpm install

      - name: Unit Tests
        run: pnpm test
```

Let's understand what these lines does.

- Jobs
  - We define here what the pipeline actually does. Jobs takes a list of user defined job that will be executed on a runner.
- Build
  - The name of the job.
- Runs-on
  - The image that will be used to execute the commands
- Steps
  - A list of command that will be executed. You can either write cli commands or use predefined scripts
- Uses
  - This is a predefined script provided by github. Checkout checks out the code from the repo.
  - setup-node sets up node
- Run
  - runs cli commands

#### Why build and test ?

As our CD is automated, we must do the most to prevent any bugs or erros to reach production. So, having a fully tested (unit and e2e) is very important.

Ok, now commit your file and see the result in the github action page associated with your repo.
