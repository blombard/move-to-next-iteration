import GitHubProject from "github-project";

const project = new GitHubProject({
  owner: "Leexi-ai",
  number: 1,
  token: "ghp_...",
  fields: {
    iteration: "Cycle",
  },
});

const statuses = ['Done', 'Todo', 'In Progress', 'In Review'];

const projectData = await project.getProperties();
// console.log(projectData.fields.iteration.configuration);

const lastIteration = projectData.fields.iteration.configuration.completedIterations[0];
const currentIteration = projectData.fields.iteration.configuration.iterations[0];
const nextIteration = projectData.fields.iteration.configuration.iterations[1];

const iteration = lastIteration;
// const newIteration = newiterationType === 'current' ? currentIteration : nextIteration;

const items = await project.items.list();
const filteredItems = items.filter(item => statuses.includes(item.fields.status) && item.fields.iteration === iteration.title);
console.log(filteredItems);

const run = async () => {
  try {
    const owner = core.getInput('owner');
    const number = core.getInput('number');
    const token = core.getInput('token');
    const iterationField = core.getInput('iteration-field'); // name of the iteration field
    const iterationType = core.getInput('iteration'); // last or current
    const newiterationType = core.getInput('new-iteration'); // current or next
    const statuses = core.getInput('statuses');

    const project = new GitHubProject({ owner, number, token, fields: { iteration: iterationField } });

    const projectData = await project.getProperties();
    const lastIteration = projectData.fields.iteration.configuration.completedIterations[0];
    const currentIteration = projectData.fields.iteration.configuration.iterations[0];
    const nextIteration = projectData.fields.iteration.configuration.iterations[1];

    const iteration = iterationType === 'last' ? lastIteration : currentIteration;
    const newIteration = newiterationType === 'current' ? currentIteration : nextIteration;

    const items = await project.items.list();
    const filteredItems = items.filter(item => statuses.includes(item.fields.status) && item.fields.iteration === iteration.title);
    await Promise.all(filteredItems.map(item => project.items.update(item.id, { iteration: newIteration.title })));
  } catch (error) {
    core.setFailed(error.message);
  }
};

// if (require.main === module) {
  // run();
// }


// node_modules/github-project/api/lib/project-node-to-properties.js
//   fields: state.fields,
// node_modules/github-project/api/lib/project-fields-nodes-to-fields-map.js
//   acc[userInternalFieldName].configuration = node.configuration;
// node_modules/github-project/index.d.ts
//   fields: ProjectFieldMap;
