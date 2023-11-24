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
import { GQLNodeType } from '../graphql/types';
import { useFindNodes } from '../hooks/useFindNodes';
import { Node } from '../model/Node';
import { downloadNode } from '../utils/utils';

interface NodeListProps {
	currentId: string;
	navigateTo: (node: Node) => void;
}

export const NodeList: React.FC<NodeListProps> = ({ currentId, navigateTo }) => {
	const [t] = useTranslation();
	const { nodes, hasMore, findMore } = useFindNodes(currentId);

	const onItemDoubleClick = useCallback<(node: Node) => (() => void) | undefined>(
		(node) => {
			if (node.isDirectory) {
				return () => navigateTo(node);
			}
			return undefined;
		},
		[navigateTo]
	);
	const download = useCallback<(node: Node) => (() => void) | undefined>((node) => {
		if (node.type !== GQLNodeType.Folder && node.mimeType && node.size) {
			return (): void => downloadNode(node.id);
		}
		return undefined;
	}, []);

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
