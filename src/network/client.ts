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
	findNodesQuery: async (
		folderId: string,
		nodeLinkId: string,
		token?: string
	): Promise<{ newNodes: Array<Node>; newToken: string | null }> => {
		const body: Body<GQLFindNodesQueryVariables> = {
			variables: {
				folder_id: folderId,
				page_token: token,
				limit: FIND_NODES_LIMITS,
				node_link_id: nodeLinkId
			},
			query: print(FindNodesDocument)
		};

		const response = await fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		});
		const findNodesResult: ExecutionResult<GQLFindNodesQuery> = await response.json();
		const newNodes = findNodesResult.data?.findNodes?.nodes
			.filter((node): node is NodeOfFindNodes => node !== null)
			.map((node) => convertGQLToNode(node));
		return {
			newNodes: newNodes ?? [],
			newToken: findNodesResult.data?.findNodes?.page_token ?? null
		};
	},
	getPublicNodeQuery: async (
		nodeLinkId: string,
		accessCode?: string
	): Promise<{
		publicNode: { id: string; name: string } | undefined;
		errors: readonly GraphQLError[] | undefined;
	}> => {
		const body: Body<GQLGetPublicNodeQueryVariables> = {
			variables: { node_link_id: nodeLinkId, access_code: accessCode },
			query: print(GetPublicNodeDocument)
		};

		const response = await fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		});
		const getPublicNodeResult: ExecutionResult<GQLGetPublicNodeQuery> = await response.json();
		if (
			getPublicNodeResult.data?.getPublicNode?.id &&
			getPublicNodeResult.data.getPublicNode.name
		) {
			return {
				publicNode: {
					id: getPublicNodeResult.data.getPublicNode.id,
					name: getPublicNodeResult.data.getPublicNode.name
				},
				errors: undefined
			};
		}
		if (getPublicNodeResult.errors && getPublicNodeResult.errors.length > 0) {
			return { publicNode: undefined, errors: getPublicNodeResult.errors };
		}
		throw new Error('Missing data and errors');
	}
} as const;
