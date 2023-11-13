/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useState } from 'react';

import { Container, Icon, Text } from '@zextras/carbonio-design-system';
import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';
import styled from 'styled-components';

import { List } from './List';
import { NodeOfFindNodes } from './types';
import { FindNodesDocument, GQLFindNodesQuery, GQLFindNodesQueryVariables } from '../graphql/types';
import { Body } from '../mocks/handlers/handlers.learning.test';
import { convertGQLToNode, Node } from '../model/Node';
import { FIND_NODES_LIMITS } from '../utils/constants';

interface ListBcProps {
	folderId: string;
}

const CustomIcon = styled(Icon)`
	height: 232px;
	width: 232px;
`;

export const ListBc: React.FC<ListBcProps> = ({ folderId }) => {
	const [nodes, setNodes] = useState<Array<Node> | null>(null);
	const [hasMore, setHasMore] = useState(false);
	const [token, setToken] = useState<string | undefined | null>();

	useEffect(() => {
		const body: Body<GQLFindNodesQueryVariables> = {
			variables: { folder_id: folderId },
			query: print(FindNodesDocument)
		};

		fetch('http://localhost/graphql/', {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<GQLFindNodesQuery>> => response.json())
			.then((result) => {
				const newRows = result.data?.findNodes?.nodes
					.filter((value): value is NodeOfFindNodes => value !== null)
					.map((node) => convertGQLToNode(node));
				setNodes(newRows ?? []);
				setToken(result.data?.findNodes?.page_token);
				if (result.data?.findNodes?.page_token) {
					setHasMore(true);
				}
			});
	}, [folderId]);

	const findNodes = useCallback(() => {
		const body: Body<GQLFindNodesQueryVariables> = {
			variables: { folder_id: folderId, page_token: token, limit: FIND_NODES_LIMITS },
			query: print(FindNodesDocument)
		};

		fetch('http://localhost/graphql/', {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<GQLFindNodesQuery>> => response.json())
			.then((result) => {
				const newRows = result.data?.findNodes?.nodes
					.filter((value): value is NodeOfFindNodes => value !== null)
					.map((node) => convertGQLToNode(node));
				setNodes((oldNodes) => [...(oldNodes ?? []), ...(newRows ?? [])]);
				setToken(result.data?.findNodes?.page_token);
				setHasMore(!!result.data?.findNodes?.page_token);
			});
	}, [folderId, token]);

	return (
		<>
			{nodes !== null && nodes.length > 0 && (
				<List nodes={nodes} onListBottom={hasMore ? findNodes : undefined} />
			)}
			{nodes !== null && nodes.length === 0 && (
				<Container>
					<CustomIcon icon={'Folder'} size={'large'} color={'gray5'} />
					<Text size={'large'} weight={'bold'} color={'secondary'}>
						There are no items in this folder.
					</Text>
				</Container>
			)}
		</>
	);
};
