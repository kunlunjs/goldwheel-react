const componentGenerator = require('./generators/component/index')

// /**
//  *
//  * @param {import('plop').NodePlopAPI} plop
//  */
// module.exports = function (plop) {
//   plop.setGenerator('component', componentGenerator)
// }

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const camelCase = str => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}

const workspaces = ['components', 'hooks', 'utilities', 'integrations']

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
  plop.setHelper('capitalize', text => {
    return capitalize(camelCase(text))
  })
  // npm run generate:component
  plop.setGenerator('component', componentGenerator)

  // npm run generate:package
  plop.setGenerator('package', {
    description: 'Generates a component package',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter component name:'
      },
      {
        type: 'input',
        name: 'description',
        message: 'The description of this component:'
      },
      {
        type: 'list',
        name: 'outDir',
        message: 'where should this component or package live?',
        default: 'packages',
        choices: workspaces
      }
    ],
    actions(answers) {
      const actions = []

      if (!answers) return actions

      const { componentName, description, outDir } = answers

      actions.push({
        type: 'addMany',
        templateFiles: 'generators/package/**',
        destination: `./packages/{{outDir}}/{{dashCase componentName}}`,
        base: 'generators/package',
        data: { description, componentName, outDir },
        abortOnFail: true
      })

      return actions
    }
  })
}
