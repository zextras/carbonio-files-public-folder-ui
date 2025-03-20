/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { Container, Icon, Modal, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { downloadNode } from '../utils/utils';

const CustomIcon = styled(Icon)`
	height: 3rem;
	width: 3rem;
`;

interface AccessCodeModalProps {
	nodeId: string;
	nodeLinkId: string;
	accessCode: string;
}

export const DownloadModal = ({
	nodeId,
	nodeLinkId,
	accessCode
}: AccessCodeModalProps): React.JSX.Element => {
	const [t] = useTranslation();
	const [downloaded, setDownloaded] = useState(false);
	const onConfirm = useCallback(() => {
		downloadNode(nodeId, nodeLinkId, accessCode);
		setDownloaded(true);
	}, [accessCode, nodeId, nodeLinkId]);
	return (
		<Modal
			showCloseIcon={false}
			title={t(
				'carbonio-public-folder-ui.accessCode.modal.title',
				'The link is secured by an access code'
			)}
			open
			confirmLabel={
				!downloaded
					? t('carbonio-public-folder-ui.fileDownload.modal.confirmLabel1', 'Download')
					: t('carbonio-public-folder-ui.fileDownload.modal.confirmLabel2', 'Download again')
			}
			onConfirm={onConfirm}
		>
			<Container gap={'1rem'} crossAlignment={'center'}>
				<CustomIcon icon={'Checkmark'} color={'success'} />
				<Text overflow={'break-word'}>
					{t(
						'carbonio-public-folder-ui.fileDownload.modal.description',
						'Access code entered correctly. Now you can download the file.'
					)}
				</Text>
			</Container>
		</Modal>
	);
};
