const core = require('@actions/core');
const GitHubProject = require("github-project");

const run = async () => {
  try {
    const owner = core.getInput('owner');
    const number = core.getInput('number');
    const token = core.getInput('token');
    const iterationField = core.getInput('iteration-field'); // name of the iteration field
    const iterationType = core.getInput('iteration'); // last or current
    const newiterationType = core.getInput('new-iteration'); // current or next
    const statuses = core.getInput('statuses').split(',');

    console.log({ owner, number, iterationField, iterationType, newiterationType, statuses });

    const project = new GitHubProject({ owner, number, token, fields: { iteration: iterationField } });

    const projectData = await project.getProperties();
    const lastIteration = projectData.fields.iteration.configuration.completedIterations[0];
    const currentIteration = projectData.fields.iteration.configuration.iterations[0];
    const nextIteration = projectData.fields.iteration.configuration.iterations[1];

    const iteration = iterationType === 'last' ? lastIteration : currentIteration;
    const newIteration = newiterationType === 'current' ? currentIteration : nextIteration;

    const items = await project.items.list();
    const filteredItems = items.filter(item => statuses.includes(item.fields.status) && item.fields.iteration === iteration.title);
    console.log(filteredItems);
    console.log({ newIteration });
    await Promise.all(filteredItems.map(item => project.items.update(item.id, { iteration: newIteration.title })));
  } catch (error) {
    core.setFailed(error.message);
  }
};

if (require.main === module) {
  run();
}

module.exports = run;
