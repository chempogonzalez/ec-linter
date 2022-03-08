// @ts-check
const { exitExecutionWithSuccess, getSpawnPromise } = require('../helpers/cli')
const { writeFile } = require('../helpers/file')
const { displayError, logUpdate } = require('../helpers/logs')
const { name: linterPackageName } = require('../package.json')


const LINT_CONFIGS_PATH = `./node_modules/${linterPackageName}/configs/`

const LINT_CONFIG_PATH_SUBFOLDER = {
  WITH_NEXT: `${LINT_CONFIGS_PATH}with-next/`,
  WITHOUT_NEXT: `${LINT_CONFIGS_PATH}without-next/`,
}

const LINT_SCRIPTS = {
  lint: 'eslint . --ext .js,.jsx,.ts,.tsx',
  'lint-fix': 'npm run lint -- --fix',
}

const { CI, INIT_CWD } = process.env


const installNextJSConfigDependencies = async (isNextJSProject) => {
  if (!isNextJSProject) return true

  const packageToInstall = 'eslint-config-next'

  try {
    require(packageToInstall)
    return true
  } catch (e) {
    logUpdate('Installing needed dependencies...')
    return getSpawnPromise('npm', [
      'install',
      '--save-dev',
      '--no-audit',
      '--no-fund',
      packageToInstall,
      { cwd: INIT_CWD },
    ]).then(() => {
      logUpdate.done('Installed needed dependencies')
    })
  }
}


try {
  if (CI) {
    console.log(`Skipping ${linterPackageName} postinstall due to CI env was detected`)
    exitExecutionWithSuccess()
  }

  const PROJECT_PACKAGE_PATH = `${INIT_CWD}/package.json`

  // Get the project's package.json
  const packageJSON = require(PROJECT_PACKAGE_PATH)

  // Extract the fields we want to compare
  const { eslintConfig, name, scripts, dependencies } = packageJSON

  const isNextJSProject = Object.keys(dependencies ?? {}).includes('next')

  const eslintFinalConfigPath = isNextJSProject
    ? LINT_CONFIG_PATH_SUBFOLDER.WITH_NEXT
    : LINT_CONFIG_PATH_SUBFOLDER.WITHOUT_NEXT

  const LINT_CONFIGS = {
    eslintConfig: {
      extends: [`${eslintFinalConfigPath}.eslintrc.js`],
    },
  }

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
    logUpdate(`Adding ${linterPackageName} changes to package.json...`)

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
    ).then(() => {
      installNextJSConfigDependencies(isNextJSProject).then(() => {
        logUpdate(`✅ Added ${linterPackageName} config successfully!`)
      })
    })
  } else {
    logUpdate(`🔘 ${linterPackageName} config is already in your package.json. Great!`)
  }
} catch (e) {
  displayError(`${linterPackageName} can't update the package.json file.`)
}
