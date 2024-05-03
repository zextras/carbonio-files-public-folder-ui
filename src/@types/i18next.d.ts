/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// Extend CustomTypeOptions
import type { TypeOptions } from 'i18next';

import en from '../../translations/en.json' assert { type: 'json' };

declare module 'i18next' {
	interface CustomTypeOptions {
		// custom resources type
		resources: {
			[defaultNs: TypeOptions['defaultNS']]: typeof en;
		};
		returnNull: false;
		compatibilityJson: 'v4';
		allowObjectInHTMLChildren: true;
	}
}
