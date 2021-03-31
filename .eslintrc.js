module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'max-len': 'off',
    'vue/no-unused-components': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
};
