// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  extends: "airbnb-base",
  // add your custom rules here
  "rules": {
    // allow optionalDependencies
    "import/no-extraneous-dependencies": "error",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "quotes": ["warn", "double"],
    "semi": ["warn", "never"],
    "comma-dangle": ["warn", "never"],
    "object-curly-spacing": ["warn", "never"],
    "no-param-reassign": ["warn", {"props": false}],
    "arrow-parens": ["warn", "as-needed"],
    "class-methods-use-this": [0]
  }
}
