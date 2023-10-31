module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['./node_modules/@zextras/carbonio-ui-configs/rules/eslint.js'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
