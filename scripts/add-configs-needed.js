// @ts-check
const { exitExecutionWithSuccess } = require('../helpers/cli')
const { writeFile } = require('../helpers/file')
const { log, displayError } = require('../helpers/logs')
const { name: linterPackageName } = require('../package.json')


const LINT_CONFIGS_PATH = `./node_modules/${linterPackageName}/`

const LINT_CONFIGS = {
  eslintConfig: {
    extends: [`${LINT_CONFIGS_PATH}.eslintrc.js`],
  },
}

const LINT_SCRIPTS = {
  lint: 'eslint . --ext .js,.jsx,.ts,.tsx',
  'lint-fix': 'npm run lint -- --fix',
}


try {
  const { CI, INIT_CWD } = process.env

  if (CI) {
    console.log(`Skipping ${linterPackageName} postinstall due to CI env was detected`)
    exitExecutionWithSuccess()
  }

  const PROJECT_PACKAGE_PATH = `${INIT_CWD}/package.json`

  // Get the project's package.json
  const packageJSON = require(PROJECT_PACKAGE_PATH)

  // Extract the fields we want to compare
  const { eslintConfig, name, scripts } = packageJSON

  // If actual package is the same, avoid the operation (useful when linking the package)
  if (name === linterPackageName) exitExecutionWithSuccess()


  // check if actual package has different lint config
  const isDifferentLintConfig =
    JSON.stringify({ eslintConfig })
    !== JSON.stringify(LINT_CONFIGS)


  // check if actual package has different lint config
  const isDifferentLintScripts =
    JSON.stringify(scripts)
    !== JSON.stringify({ ...scripts, ...LINT_SCRIPTS })


  // if they're different, we're going to rewrite the package.json
  if (isDifferentLintConfig || isDifferentLintScripts) {
    log(`Adding ${linterPackageName} changes to package.json...`)

    // create the new package.json object to be written
    const newPackageJSON = {
      ...packageJSON,
      ...LINT_CONFIGS,
      scripts: {
        ...scripts,
        ...LINT_SCRIPTS,
      },
    }

    // write the new package.json with the linter config
    writeFile(
      PROJECT_PACKAGE_PATH,
      JSON.stringify(newPackageJSON, null, 2),
    ).then(() => console.log(`✅ Added ${linterPackageName} config successfully!`))
  } else {
    console.log(`🔘 ${linterPackageName} config is already in your package.json. Great!`)
  }
} catch (e) {
  displayError(`${linterPackageName} can't update the package.json file.`)
}
