/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback } from 'react';

import { Container, Text } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

import { IconBig } from './IconBig';
import { List } from './List';
import { LoadingIcon } from './LoadingIcon';
import { useCustomSnackbars } from '../hooks/useCustomSnackbars';
import { useFindNodes } from '../hooks/useFindNodes';
import type { Node } from '../model/Node';
import { HTTP_STATUS_CODE } from '../utils/constants';
import { downloadMultipleNodes, downloadNode } from '../utils/utils';

interface NodeListProps {
	currentId: string;
	navigateTo: (node: Node) => void;
	nodeLinkId: string;
	accessCode?: string;
}

export const NodeList: React.FC<NodeListProps> = ({
	currentId,
	navigateTo,
	nodeLinkId,
	accessCode
}) => {
	const [t] = useTranslation();
	const { createDownloadSizeExceedsSnackbar, createDownloadWillStartSoonSnackbar } =
		useCustomSnackbars();

	const { nodes, hasMore, findMore } = useFindNodes(currentId, nodeLinkId, accessCode);

	const onItemDoubleClick = useCallback<(node: Node) => (() => void) | undefined>(
		(node) => {
			if (node.isDirectory) {
				return () => navigateTo(node);
			}
			return undefined;
		},
		[navigateTo]
	);
	const download = useCallback<(node: Node) => (() => void) | undefined>(
		(node) => {
			const handleResponse = (response: Response): void => {
				if (response.ok) {
					createDownloadWillStartSoonSnackbar();
				} else if (response.status === HTTP_STATUS_CODE.fileSizeExceeded) {
					createDownloadSizeExceedsSnackbar();
				}
			};

			if (node.isFile) {
				return (): void => {
					downloadNode(node.id, nodeLinkId, accessCode).then(handleResponse);
				};
			}
			if (node.isDirectory) {
				return (): void => {
					downloadMultipleNodes([node.id], nodeLinkId, accessCode).then(handleResponse);
				};
			}
			return undefined;
		},
		[accessCode, createDownloadSizeExceedsSnackbar, createDownloadWillStartSoonSnackbar, nodeLinkId]
	);

	return (
		<>
			{nodes !== null && nodes.length > 0 && (
				<List
					nodes={nodes}
					onListBottom={hasMore ? findMore : undefined}
					onItemDoubleClick={onItemDoubleClick}
					download={download}
				/>
			)}
			{nodes !== null && nodes.length === 0 && (
				<Container gap={'0.125rem'}>
					<IconBig icon={'Folder'} color={'gray5'} />
					<Text size={'large'} weight={'bold'} color={'secondary'}>
						{t('carbonio-public-folder-ui.emptyFolder', 'There are no items in this folder.')}
					</Text>
				</Container>
			)}
			{nodes === null && (
				<Container>
					<LoadingIcon icon={'LoaderOutline'} size={'3rem'} />
				</Container>
			)}
		</>
	);
};
