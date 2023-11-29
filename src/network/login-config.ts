/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { LOGIN_V3_CONFIG_PATH } from '../utils/constants';

export function loginConfig(): void {
	fetch(LOGIN_V3_CONFIG_PATH)
		.then((response) => response.json())
		.then((data: { carbonioWebUiTitle?: string; carbonioWebUiFavicon?: string }) => {
			const favicon = document.getElementById('favicon');
			if (favicon && favicon instanceof HTMLLinkElement && data.carbonioWebUiFavicon) {
				favicon.href = data.carbonioWebUiFavicon;
			}
			if (data.carbonioWebUiTitle) {
				document.title = data.carbonioWebUiTitle;
			}
		})
		.catch(() => {
			console.error('Custom title and favicon are not available');
		});
}

loginConfig();
