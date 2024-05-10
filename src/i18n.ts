/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import {
	CARBONIO_STATIC_PATH,
	COMPONENTS_ENDPOINT,
	FILES_PROJECT_NAME,
	I18N_PATH
} from './utils/constants';

async function fetchI18NUrl(): Promise<string> {
	const response = await fetch(new URL(COMPONENTS_ENDPOINT, window.location.origin));
	if (response.ok) {
		const { components } = (await response.json()) as {
			components: Array<{ name: string; commit: string }>;
		};
		const filesEntry = components.find((entry) => entry.name === FILES_PROJECT_NAME);
		return `${CARBONIO_STATIC_PATH}${FILES_PROJECT_NAME}/${
			filesEntry?.commit ?? ''
		}${I18N_PATH}`.replace('//', '/');
	}
	return Promise.resolve('');
}

i18next
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(I18NextHttpBackend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(I18nextBrowserLanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		backend: {
			loadPath: fetchI18NUrl().catch((error) => {
				console.error(error);
			})
		},
		returnEmptyString: true,
		returnNull: false,
		compatibilityJSON: 'v4',
		fallbackLng: 'en',
		debug: false,
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		},
		missingKeyHandler: (key): void => {
			// eslint-disable-next-line no-console
			console.warn(`Missing translation with keys ${key}`);
		}
	});
