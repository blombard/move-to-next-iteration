# Move to next iteration

Automatically move issues and pull requests to the next iteration of your [GitHub project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) with this [Github Action](https://github.com/features/actions).

## Example

```yaml
on:
  schedule:
    # Runs "at 05:00, only on Monday" (see https://crontab.guru)
    - cron: '0 5 * * 1'

jobs:
  move-to-next-iteration:
    name: Move to next iteration
    runs-on: ubuntu-latest

    steps:
    - uses: blombard/move-to-next-iteration@master
      with:
        owner: OrgName
        number: 1
        token: ${{ secrets.PROJECT_PAT }}
        iteration-field: Iteration
        iteration: last
        new-iteration: current
        statuses: 'Todo,In Progress,In Review'
```

Alternatively, you may specify `excluded-statuses`. In this case, all items that _don’t_ have these statuses will be moved to the new iteration. (Note that if `excluded-statuses` is used, `statuses` will be ignored.)

```yaml
on:
  schedule:
    # Runs "at 05:00, only on Monday" (see https://crontab.guru)
    - cron: '0 5 * * 1'

jobs:
  move-to-next-iteration:
    name: Move to next iteration
    runs-on: ubuntu-latest

    steps:
    - uses: blombard/move-to-next-iteration@master
      with:
        owner: OrgName
        number: 1
        token: ${{ secrets.PROJECT_PAT }}
        iteration-field: Iteration
        iteration: last
        new-iteration: current
        excluded-statuses: "Done,Won't Fix"
```

## Inputs
#### owner
The account name of the GitHub organization.

#### number
Project number as you see it in the URL of the project.

#### token
Personal access token or an OAuth token. the `project` scope is required.

#### iteration-field
The name of your iteration field.

#### iteration
Should be `last` or `current`.

#### new-iteration
Should be `current` or `next`.

#### statuses
Statuses of the issues to move to the next iteration.

⚠️ _This setting is ignored if `excluded-statuses` is provided. See below._ ⚠️

#### excluded-statuses
Statuses of the issues that should _not_ be moved.

⚠️ _This setting takes precedence over `statuses`._ ⚠️

## Sources

This action was made possible thanks to https://github.com/gr2m/github-project.
