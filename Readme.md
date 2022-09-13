# Github Action Exercices

## Events
[(Event List)](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

For this part, you will have to trigger the workflow under specific conditions. Each item on the list correspond to a particular scenario where the workflow should (*or should not*) run.

### Push
1. *Create and publish 3 branches, "dev", "staging", "feat/feature-1"*
3. When you have a push on the branch "dev" only
4. When you have a push on any branch **except** "staging"
5. When you have a push on any branch where the name starts with "feat"


### Pull request
1. When someone **creates** a PR
2. When someone **closed** a PR

### Scheduled
[Help](https://crontab.guru)
1. Every minutes
2. Every 1h 37m 12s
3. Every Tuesday at 3am

### Push & PR
1. *Create two job inside a new workflow*
2. When there is a push, execute both job
3. When there is a PR, execute only the first job

### Manual & Custom
1. When you click on the corresponding button in the UI
2. *Create two workflow*
3. Trigger the second workflow from the first one, and pass the github event name from the first one to the second with a variable named "firstJobEvent"
