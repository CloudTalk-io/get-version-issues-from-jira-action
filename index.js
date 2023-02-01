const fetch = require('node-fetch');
const core = require('@actions/core');

try {
    const jiraToken = core.getInput('jira-api-token');
    const jiraCompanyUrl = core.getInput('jira-company-url');
    const project = core.getInput('project');
    const versionKey = core.getInput('version-key');
    const version = core.getInput('version');

    fetch(
        `${jiraCompanyUrl}/rest/api/3/search?jql=project = ${project} AND ${versionKey} = "${version}" order by created DESC&fields=summary`,
        {
            method: 'GET',
            headers: {
                Authorization: `Basic ${jiraToken}`,
                Accept: 'application/json'
            }
        }
    )
        .then((response) => response.text())
        .then((body) => {
            const response = JSON.parse(body);

            const issueList = response.issues.map(
                (issue) =>
                    `- <${jiraCompanyUrl}/browse/${issue.key}|${issue.key}> - ${issue.fields.summary}`
            );
            core.setOutput("issues", issueList.join('\\n'));
        })
        .catch((err) => core.setFailed(err));
} catch (error) {
    core.setFailed(error.message);
}
