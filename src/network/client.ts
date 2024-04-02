/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { GraphQLError } from 'graphql/error';
import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';

import {
	FindNodesDocument,
	GetPublicNodeDocument,
	GQLFindNodesQuery,
	GQLFindNodesQueryVariables,
	GQLGetPublicNodeQuery,
	GQLGetPublicNodeQueryVariables
} from '../graphql/types';
import { convertGQLToNode, Node } from '../model/Node';
import { NodeOfFindNodes } from '../types/types';
import { API_ENDPOINT, FIND_NODES_LIMITS } from '../utils/constants';

export type Body<TVariables extends Record<string, unknown>> = {
	variables: TVariables;
	query: string;
};
export const client = {
	findNodesQuery: (
		folderId: string,
		token?: string
	): Promise<{ newNodes: Array<Node>; newToken: string | null }> => {
		const body: Body<GQLFindNodesQueryVariables> = {
			variables: { folder_id: folderId, page_token: token, limit: FIND_NODES_LIMITS },
			query: print(FindNodesDocument)
		};

		return fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<GQLFindNodesQuery>> => response.json())
			.then((result) => {
				const newNodes = result.data?.findNodes?.nodes
					.filter((value): value is NodeOfFindNodes => value !== null)
					.map((node) => convertGQLToNode(node));
				return { newNodes: newNodes ?? [], newToken: result.data?.findNodes?.page_token ?? null };
			});
	},
	getPublicNodeQuery: (
		nodeLinkId: string
	): Promise<{
		publicNode: { id: string; name: string } | undefined;
		errors: readonly GraphQLError[] | undefined;
	}> => {
		const body: Body<GQLGetPublicNodeQueryVariables> = {
			variables: { node_link_id: nodeLinkId },
			query: print(GetPublicNodeDocument)
		};

		return fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<GQLGetPublicNodeQuery>> => response.json())
			.then((result) => {
				if (result.data?.getPublicNode?.id && result.data.getPublicNode.name) {
					return {
						publicNode: {
							id: result.data.getPublicNode.id,
							name: result.data.getPublicNode.name
						},
						errors: undefined
					};
				}
				if (result.errors && result.errors.length > 0) {
					return { publicNode: undefined, errors: result.errors };
				}
				throw new Error('Missing data and errors');
			});
	}
};
