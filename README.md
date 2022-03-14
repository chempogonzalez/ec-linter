# 🕵🏻‍♂️ ec-linter
> ⚡️ Eslint easy configuration setup. Optimized based on 'standard' config with some opinionated configs. Non extra steps needed

## 🔖 Features
- Just install the package and that's it
- No extra steps needed
- **Based on:**
  - JS standard config
  - TS standard config
  - React & JSX standard config
  - NextJS config
  - Opinionated rules ([Overwritten Rules](https://github.com/chempogonzalez/ec-linter/blob/main/configs/shared/rules.js))


## 📦 Installation
```zsh
# Install it as a dev dependency
$npm install -D ec-linter
```


## 🌀 Working with
Prepared to be used within projects with the following languages/frameworks:

- **JavaScript**
- **Typescript**
- **React**
- **NextJS**

## 🚀 How it works?
##### 🟣 `1`  - It installs all the packages needed
##### 🟣 `2`  - Check if `eslintConfig` or `.eslintrc.js` file exists and rename them if it's needed
##### 🟣 `3` - Creates an `.eslintrc.js` file to extend the ec-linter rules
##### 🟣 `4` - Adds `2 scripts` to the package.json for lint and lint-fix execution



