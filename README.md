# Get version issues from Jira action

This action makes a GET request to your company's Jira REST API, lists all issues assigned to version and returns them
in Slack's unordered list with format `PROJ-XYZ - Description`.

## Inputs

### `jira-api-token`

**Required** Jira API Token, encoded in Base 64 together with user. Read
more [here](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/).

### `jira-company-url`

**Required** Your company's Jira URL.

### `project`

**Required** Jira project name under your company.

### `version`

**Required** Version to list issues from.

### `version-key`

Version key in Jira. Default `"fixVersion"`.

## Outputs

### `issues`

Issues assigned to given version.

## Example usage

```yaml
- uses: CloudTalk-io/get-version-issues-from-jira-action@1.0
  id: release-issues
  with:
    jira-api-token: '<your-api-token>'
    project: 'PROJ'
    version: 'X.Y.Z'

# Use the output from 'release-issues' step
- run: echo "${{ steps.release-issues.outputs.issues }}"
```

## Maintenance


### Prerequisites

Installed `vercel/ncc` - `npm i -g @vercel/ncc`

### Notes

To release a new version, run:

```shell
yarn run build
```

Don't forget to create tag with version to publish your latest release:

```shell
git tag -a -m "<release description>" vX.Y
git push --follow-tags
```
