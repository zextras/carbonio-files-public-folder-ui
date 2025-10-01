/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback } from 'react';

import { IconButton, Tooltip, useModal, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

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

	const download = useCallback(() => {
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
				downloadMultipleNodes([currentFolderId], nodeLinkId, accessCode);
				closeModal(currentFolderId);
			},
			onSecondaryAction: () => closeModal(currentFolderId),
			secondaryActionLabel: t('modal.button.cancel', 'Cancel'),
			onClose: () => closeModal(currentFolderId),
			closeIconTooltip: t('modal.close.tooltip', 'Close')
		});
	}, [accessCode, closeModal, createModal, currentFolderId, folderName, nodeLinkId, t]);

	return (
		<Tooltip label="download all" placement={'top'}>
			<IconButton icon={'DownloadOutline'} size={'large'} borderRadius="round" onClick={download} />
		</Tooltip>
	);
};
