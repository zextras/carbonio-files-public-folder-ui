/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
    input: [
        'src/**/*.{ts,tsx}',
        // Use ! to filter out files or directories
        '!src/**/*.test.{ts,tsx}',
        '!**/node_modules/**'
    ],
    output: './',
    options: {
        compatibilityJSON: 'v3',
        debug: false,
        attr: false,
        func: {
            list: ['t'],
            extensions: ['.ts', '.tsx']
        },
        defaultLng: 'en',
        resource: {
            loadPath: 'translations/{{lng}}.json',
            savePath: 'translations/{{lng}}.json',
            jsonIndent: 4,
        },
        sort: true
    }
}
