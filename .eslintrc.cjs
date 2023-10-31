module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    project: 'tsconfig.json'
  },
  extends: ['./node_modules/@zextras/carbonio-ui-configs/rules/eslint.js'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'sonarjs/no-duplicate-string': 'off'
  },
  overrides: [
    {
      files: [
        '**/types/**/*.ts?(x)',
        '**/test/**/*.ts?(x)',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      }
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      rules: {
        'react/jsx-props-no-spreading': 'off'
      }
    },
  ]
}
