/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { TOptionsBase } from 'i18next';

function t(key: string, options?: TOptionsBase | string): string {
	if (typeof options === 'string') {
		return options;
	}
	return (options?.defaultValue as string) ?? `${key}${(options?.context as string) ?? ''}`;
}

const i18n = { t };

export default i18n;
