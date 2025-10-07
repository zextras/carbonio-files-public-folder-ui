/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback } from 'react';

import { useSnackbar } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

export const useCustomSnackbars = (): {
	createDownloadSizeExceedsSnackbar: () => void;
	createDownloadWillStartSoonSnackbar: () => void;
} => {
	const createSnackbar = useSnackbar();
	const [t] = useTranslation();

	const createDownloadSizeExceedsSnackbar = useCallback(() => {
		createSnackbar({
			key: new Date().toLocaleString(),
			label: t(
				'snackbar.download.error2',
				'Download size exceeds the maximum limit. Please reduce items to download'
			),
			severity: 'warning',
			replace: true,
			autoHideTimeout: 5000
		});
	}, [createSnackbar, t]);

	const createDownloadWillStartSoonSnackbar = useCallback(() => {
		createSnackbar({
			key: new Date().toLocaleString(),
			severity: 'info',
			label: t('snackbar.download.start', 'Your download will start soon'),
			replace: true,
			hideButton: true
		});
	}, [createSnackbar, t]);

	return {
		createDownloadSizeExceedsSnackbar,
		createDownloadWillStartSoonSnackbar
	};
};
