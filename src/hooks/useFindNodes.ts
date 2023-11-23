/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useState } from 'react';

import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';

import { nodesMap, tokenMap } from './NodesCache';
import { NodeOfFindNodes } from '../components/types';
import { FindNodesDocument, GQLFindNodesQuery, GQLFindNodesQueryVariables } from '../graphql/types';
import { Body } from '../mocks/handlers/handlers.learning.test';
import { convertGQLToNode, Node } from '../model/Node';
import { API_ENDPOINT, FIND_NODES_LIMITS } from '../utils/constants';

type UseFindNodesReturnType = {
	nodes: Array<Node> | null;
	hasMore: boolean;
	findMore: () => void;
};

export const useFindNodes = (folderId: string): UseFindNodesReturnType => {
	const [nodes, setNodes] = useState<Array<Node> | null>(nodesMap[folderId] ?? null);
	const [hasMore, setHasMore] = useState(false);
	const [token, setToken] = useState<string | undefined | null>();

	useEffect(() => {
		setToken(undefined);
		setHasMore(false);
	}, [folderId]);

	useEffect(() => {
		if (nodesMap[folderId] && tokenMap[folderId] !== undefined) {
			setNodes(nodesMap[folderId]);
			setToken(tokenMap[folderId]);
			setHasMore(tokenMap[folderId] !== null);
			return;
		}

		const body: Body<GQLFindNodesQueryVariables> = {
			variables: { folder_id: folderId },
			query: print(FindNodesDocument)
		};

		fetch(new URL(API_ENDPOINT, window.location.origin), {
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
				nodesMap[folderId] = newRows ?? [];
				setToken(result.data?.findNodes?.page_token);
				tokenMap[folderId] = result.data?.findNodes?.page_token ?? null;
				if (result.data?.findNodes?.page_token) {
					setHasMore(true);
				}
			});
	}, [folderId]);

	const findMore = useCallback(() => {
		if (!hasMore) {
			throw new Error('No more nodes available');
		}
		if (folderId === undefined) {
			throw new Error('Cannot findMore when folderId is not defined');
		}
		const body: Body<GQLFindNodesQueryVariables> = {
			variables: { folder_id: folderId, page_token: token, limit: FIND_NODES_LIMITS },
			query: print(FindNodesDocument)
		};

		fetch(new URL(API_ENDPOINT, window.location.origin), {
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
				nodesMap[folderId] = [...(nodesMap[folderId] ?? []), ...(newRows ?? [])];
				tokenMap[folderId] = result.data?.findNodes?.page_token ?? null;
			});
	}, [folderId, hasMore, token]);

	return { nodes, hasMore, findMore };
};
