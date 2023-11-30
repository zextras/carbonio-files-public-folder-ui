/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useState } from 'react';

import { nodesMap, tokenMap } from './NodesCache';
import { Node } from '../model/Node';
import { client } from '../network/client';

type UseFindNodesReturnType = {
	nodes: Array<Node> | null;
	hasMore: boolean;
	findMore: () => void;
};

export const useFindNodes = (folderId: string): UseFindNodesReturnType => {
	const [nodes, setNodes] = useState<Array<Node> | null>(nodesMap.get(folderId) ?? null);
	const [token, setToken] = useState<string | undefined | null>();

	useEffect(() => {
		setToken(undefined);
	}, [folderId]);

	useEffect(() => {
		const cachedNodes = nodesMap.get(folderId);
		const cachedToken = tokenMap.get(folderId);
		if (cachedNodes && cachedToken !== undefined) {
			setNodes(cachedNodes);
			setToken(cachedToken);
			return;
		}

		client.findNodesQuery(folderId).then(({ newNodes, newToken }) => {
			setNodes(newNodes);
			nodesMap.set(folderId, newNodes);
			setToken(newToken);
			tokenMap.set(folderId, newToken);
		});
	}, [folderId]);

	const findMore = useCallback(() => {
		if (token === null) {
			throw new Error('No more nodes available');
		}
		if (folderId === undefined) {
			throw new Error('Cannot findMore when folderId is not defined');
		}

		client.findNodesQuery(folderId, token).then(({ newNodes, newToken }) => {
			setNodes((oldNodes) => [...(oldNodes ?? []), ...(newNodes ?? [])]);
			setToken(newToken);
			nodesMap.set(folderId, [...(nodesMap.get(folderId) ?? []), ...(newNodes ?? [])]);
			tokenMap.set(folderId, newToken);
		});
	}, [folderId, token]);

	return { nodes, hasMore: token != null, findMore };
};
