// @ts-check
const fs = require('fs-extra')
const path = require('path')
const { exitExecutionWithSuccess, getSpawnPromise } = require('../helpers/cli')
const { writeFile } = require('../helpers/file')
const { displayError, log } = require('../helpers/logs')
const { name: linterPackageName } = require('../package.json')


const STRING_TO_BE_REPLACED = '{{configPathToExtends}}'

const { CI, INIT_CWD } = process.env


/* [start] ------------------ CONSTANTS ---------------------------------- */
const LINT_CONFIGS_PATH = `./node_modules/${linterPackageName}/configs`

const LINT_CONFIG_PATH_SUBFOLDER = {
  WITH_NEXT: `${LINT_CONFIGS_PATH}/with-next`,
  WITHOUT_NEXT: `${LINT_CONFIGS_PATH}/without-next`,
}

const LINT_SCRIPTS = {
  lint: 'eslint . --ext .js,.jsx,.ts,.tsx',
  'lint-fix': 'npm run lint -- --fix',
}
/* [end] -------------------- CONSTANTS ---------------------------------- */





/* [start] ------------------ HELPERS ---------------------------------- */
// eslint-disable-next-line no-unused-vars
const installNextJSConfigDependencies = async (isNextJSProject) => {
  if (!isNextJSProject) return true

  const packageToInstall = 'eslint-config-next'

  try {
    require(packageToInstall)
    return true
  } catch (e) {
    log('Installing needed dependencies...', INIT_CWD)
    // return exec(`npm i --save-dev --no-audit --no-fund ${packageToInstall}`, { cwd: INIT_CWD })
    return getSpawnPromise('npm', [
      'install',
      '--save-dev',
      '--no-audit',
      '--no-fund',
      packageToInstall,
    ], { cwd: INIT_CWD }).then(() => {
      log('Installed needed dependencies')
    })
  }
}

const hasCurrentlyEslintConfigFile = (projectCWD) => {
  // TODO : check more type of eslint configs
  if (fs.existsSync(path.resolve(projectCWD, '.eslintrc.js'))) return true

  return false
}
/* [end] -------------------- HELPERS ---------------------------------- */





;(async () => {
  try {
    if (CI) {
      log(`Skipping ${linterPackageName} postinstall due to CI env was detected`)
      exitExecutionWithSuccess()
    }

    const PROJECT_PACKAGE_PATH = path.resolve(INIT_CWD, 'package.json')

    // Get the project's package.json
    const packageJSON = require(PROJECT_PACKAGE_PATH)

    // Extract the fields we want to compare
    const { name, dependencies } = packageJSON

    // If actual package is the same, avoid the operation (useful when linking the package)
    if (name === linterPackageName) exitExecutionWithSuccess()

    const isNextJSProject = Object.keys(dependencies ?? {}).includes('next')

    const eslintFinalConfigPath = isNextJSProject
      ? LINT_CONFIG_PATH_SUBFOLDER.WITH_NEXT
      : LINT_CONFIG_PATH_SUBFOLDER.WITHOUT_NEXT

    const eslintConfigFilePath = `${eslintFinalConfigPath}/.eslintrc.js`


    let needToCreateEslintConfig = true
    if (hasCurrentlyEslintConfigFile(INIT_CWD)) {
      needToCreateEslintConfig = await renameEslintConfigFile(INIT_CWD)
    }

    if (needToCreateEslintConfig) {
      await createExtendableEslintConfig(INIT_CWD, eslintConfigFilePath)
    }


    const newPackageJSON = getChangedPackageJSON(packageJSON)

    await writeFile(
      PROJECT_PACKAGE_PATH,
      JSON.stringify(newPackageJSON, null, 2),
    )

    // installNextJSConfigDependencies(isNextJSProject).then(() => {
    // })
    log(`✅ Added ${linterPackageName} config successfully!`)
    exitExecutionWithSuccess()
  } catch (e) {
    displayError(`${linterPackageName} can't update the package.json file. ${JSON.stringify(e)}`)
  }
})()


async function createExtendableEslintConfig (projectCWD, configPathToBeReplaced) {
  const extendableConfigFilePath = path.resolve(__dirname, '..', 'configs', 'extensible', 'config.js')
  const newExtendableFilePath = path.resolve(projectCWD, '.eslintrc.js')

  const fileContent = await fs.readFile(extendableConfigFilePath, 'utf-8')

  const parsedExtendableConfigContent = fileContent.replace(STRING_TO_BE_REPLACED, configPathToBeReplaced)
  return writeFile(newExtendableFilePath, parsedExtendableConfigContent)
}



function getChangedPackageJSON ({ eslintConfig, scripts, ...restOfPkg }) {
  return {
    ...restOfPkg,
    scripts: {
      ...scripts,
      ...LINT_SCRIPTS,
    },
    __old_eslintConfig: eslintConfig,
  }
}



async function renameEslintConfigFile (projectCWD) {
  const currentEslintConfig = path.resolve(projectCWD, '.eslintrc.js')
  const currentEslintConfigContent = await fs.readFile(currentEslintConfig, 'utf-8')

  if (currentEslintConfigContent.includes(linterPackageName)) return false

  const newName = path.resolve(projectCWD, '_old_eslintrc.js')

  await fs.rename(currentEslintConfig, newName)
  return true
}
