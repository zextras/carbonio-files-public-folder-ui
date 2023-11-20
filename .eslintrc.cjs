/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    project: 'tsconfig.json'
  },
  extends: ['./node_modules/@zextras/carbonio-ui-configs/rules/eslint.js'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'notice.template.*'],
  plugins: ['react-refresh', 'notice'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'notice/notice': [
      'error',
      {
        templateFile: './notice.template.js'
      }
    ],
  },
  overrides: [
    {
      files: [
        '**/types/**/*.ts?(x)',
        '**/test/**/*.ts?(x)',
        '**/mocks/**/*.ts?(x)',
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
    {
      files: ['vite.config.ts', 'commitlint.config.ts', 'codegen.ts'],
      parserOptions: {
        project: 'tsconfig.node.json'
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      }
    }
  ]
}
