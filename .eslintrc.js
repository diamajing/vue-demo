// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    "jquery": true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    "semi": [2, "always"],//语句强制分号结尾
    "quotes": 'off',
    "key-spacing": 'off',
    "no-useless-escape": 'off',
    "operator-linebreak": 'off',
    "space-before-function-paren": 'off',
    "spaced-comment": 'off',
    "no-multi-spaces": 'off',
    "no-multiple-empty-lines": 'off',
    "indent": 'off',
    "no-tabs": 'off',
    "padded-blocks": 'off',
    "space-before-blocks": 'off',
    "comma-spacing": 'off',
    "space-infix-ops": 'off',
    "comma-dangle": 'off',
    "brace-style": 'off',
    "import/no-dynamic-require": 'off',
    "semi":'off',
    "camelcase":'off',
    "no-mixed-spaces-and-tabs":'off',
    "no-inner-declarations":"off",
    "eol-last":"off",
    "sort-imports":"off",
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
