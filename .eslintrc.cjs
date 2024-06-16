module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'no-console': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 0,
    'jsx-a11y/anchor-is-valid': 0,
    camelcase: 0,
  },
};
