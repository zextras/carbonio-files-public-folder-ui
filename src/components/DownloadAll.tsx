/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback } from 'react';

import { Button, Tooltip, useModal, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

import { useCustomSnackbars } from '../hooks/useCustomSnackbars';
import { HTTP_STATUS_CODE } from '../utils/constants';
import { downloadMultipleNodes } from '../utils/utils';

type DownloadAllProps = {
	currentFolderId: string;
	folderName: string;
	nodeLinkId: string;
	accessCode?: string;
};
export const DownloadAll = ({
	currentFolderId,
	folderName,
	nodeLinkId,
	accessCode
}: DownloadAllProps): React.JSX.Element => {
	const { createModal, closeModal } = useModal();
	const [t] = useTranslation();

	const { createDownloadSizeExceedsSnackbar, createDownloadWillStartSoonSnackbar } =
		useCustomSnackbars();

	const download = useCallback(() => {
		const handleResponse = (response: Response): void => {
			if (response.ok) {
				createDownloadWillStartSoonSnackbar();
			} else if (response.status === HTTP_STATUS_CODE.fileSizeExceeded) {
				createDownloadSizeExceedsSnackbar();
			}
		};

		createModal({
			id: currentFolderId,
			title: t('actions.download.multiple.modal.folder.title', 'Download {{folderName}}', {
				replace: {
					folderName
				}
			}),
			children: (
				<Text overflow={'break-word'}>
					{t(
						'actions.download.multiple.modal.folder.content',
						"You're about to download all your items in this folder. This operation may take several minutes."
					)}
				</Text>
			),
			confirmLabel: t('actions.download.multiple.modal.button.label', 'Download all'),
			onConfirm: () => {
				downloadMultipleNodes([currentFolderId], nodeLinkId, accessCode).then(handleResponse);
				closeModal(currentFolderId);
			},
			onSecondaryAction: () => closeModal(currentFolderId),
			secondaryActionLabel: t('modal.button.cancel', 'Cancel'),
			onClose: () => closeModal(currentFolderId),
			closeIconTooltip: t('modal.close.tooltip', 'Close')
		});
	}, [
		accessCode,
		closeModal,
		createDownloadSizeExceedsSnackbar,
		createDownloadWillStartSoonSnackbar,
		createModal,
		currentFolderId,
		folderName,
		nodeLinkId,
		t
	]);

	return (
		<Tooltip
			label={t('actions.download.multiple.button.tooltip', 'Download all')}
			placement={'top'}
		>
			<Button
				icon={'DownloadOutline'}
				size={'large'}
				onClick={download}
				type={'ghost'}
				shape={'round'}
				color={'text'}
			/>
		</Tooltip>
	);
};
