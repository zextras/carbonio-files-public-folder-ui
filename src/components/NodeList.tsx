/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback } from 'react';

import { Container, Text } from '@zextras/carbonio-design-system';

import { IconBig } from './IconBig';
import { List } from './List';
import { useFindNodes } from '../hooks/useFindNodes';
import { Node } from '../model/Node';

interface NodeListProps {
	currentId: string;
	navigateTo: (node: Node) => void;
}

export const NodeList: React.FC<NodeListProps> = ({ currentId, navigateTo }) => {
	const { nodes, hasMore, findMore } = useFindNodes(currentId);

	const onItemDoubleClick = useCallback<(node: Node) => void>(
		(node) => {
			if (node.isDirectory) {
				navigateTo(node);
			}
		},
		[navigateTo]
	);

	return (
		<>
			{nodes !== null && nodes.length > 0 && (
				<List
					nodes={nodes}
					onListBottom={hasMore ? findMore : undefined}
					onItemDoubleClick={onItemDoubleClick}
				/>
			)}
			{nodes !== null && nodes.length === 0 && (
				<Container gap={'0.125rem'}>
					<IconBig icon={'Folder'} color={'gray5'} />
					<Text size={'large'} weight={'bold'} color={'secondary'}>
						There are no items in this folder.
					</Text>
				</Container>
			)}
		</>
	);
};
