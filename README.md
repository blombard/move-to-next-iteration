# Move to next iteration

Automatically move issues to the next iteration with this [Github Action](https://github.com/features/actions).

## Inputs
#### owner
The account name of the GitHub organization.

#### number
Project number as you see it in the URL of the project.

#### token
Personal access token or an OAuth token. the `write:org` scope is required for read-write access.

#### iteration-field
The name of your iteration field.

#### iteration
Should be `last` or `current`.

#### new-iteration
Should be `current` or `next`.

#### statuses
Statuses of the issues to move to the next iteration.

## Example

```yml
on:
  schedule:
    # Runs "at 23:00, only on Sunday" (see https://crontab.guru)
    - cron: '0 23 * * 0'

jobs:
  move-to-next-iteration:
    name: Move to next iteration
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - uses: blombard/move-to-next-iteration@master
      with:
        owner: OrgName
        number: 1
        token: ${{ secrets.PROJECT_PAT }}
        iteration-field: Iteration
        iteration: current
        new-iteration: next
        statuses: Todo,In Progress,In Review,Done
```

## Sources

This action was made possible thanks to https://github.com/gr2m/github-project
