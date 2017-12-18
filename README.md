[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]

<div align="center">
  <h1>babel-plugin-eslint-validation</h1>
  <p>A babel plugin that validate files with eslint rules.</p>
</div>

## Installation

```sh
npm install --save-dev babel-plugin-eslint-validation
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["babel-plugin-eslint-validation"]
}

// with options
{
  "plugins": [
    ["babel-plugin-eslint-validation", {
        "fix": false,
        "formatter": "stylish",
        "failOnError": true,
        "failOnWarning": false
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-eslint-validation script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["babel-plugin-eslint-validation"]
});
```

### Options

#### `fix` (default: false)

This option will enable
[ESLint autofix feature](http://eslint.org/docs/user-guide/command-line-interface#fix).

#### `formatter` (default: eslint stylish formatter)

You can use official eslint formatters, or the path to a custom formatter

```js
{
  "plugins": [
    ["babel-plugin-eslint-validation", {
        "formatter": "eslint-friendly-formatter"
    }]
  ]
}
```

#### `eslintPath` (default: "eslint")

Path to `eslint` instance that will be used for linting.


#### `failOnWarning` (default: `false`)

Loader will cause the module build to fail if there are any eslint warnings.

#### `failOnError` (default: `false`)

Loader will cause the module build to fail if there are any eslint errors.


[npm]: https://img.shields.io/npm/v/babel-plugin-eslint-validation.svg
[npm-url]: https://npmjs.com/package/babel-plugin-eslint-validation

[node]: https://img.shields.io/node/v/babel-plugin-eslint-validation.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/paztis/babel-plugin-eslint-validation.svg
[deps-url]: https://david-dm.org/paztis/babel-plugin-eslint-validation