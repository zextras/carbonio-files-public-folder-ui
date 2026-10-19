/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { GraphQLError } from 'graphql/error';
import type { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';

import { FindPublicNodesDocument, GetPublicNodeDocument } from '../graphql/types';
import type {
	GQLFindPublicNodesQuery,
	GQLFindPublicNodesQueryVariables,
	GQLGetPublicNodeQuery,
	GQLGetPublicNodeQueryVariables,
	GQLNodeType
} from '../graphql/types';
import type { Node } from '../model/Node';
import { convertGQLToNode } from '../model/Node';
import type { PublicNode } from '../types/types';
import { API_ENDPOINT, FIND_NODES_LIMITS } from '../utils/constants';

export type Body<TVariables extends Record<string, unknown>> = {
	variables: TVariables;
	query: string;
};
export const client = {
	findNodesQuery: async (
		folderId: string,
		nodeLinkId: string,
		token?: string,
		accessCode?: string
	): Promise<{ newNodes: Array<Node>; newToken: string | null }> => {
		const body: Body<GQLFindPublicNodesQueryVariables> = {
			variables: {
				folder_id: folderId,
				page_token: token,
				access_code: accessCode,
				limit: FIND_NODES_LIMITS,
				node_link_id: nodeLinkId
			},
			query: print(FindPublicNodesDocument)
		};

		const response = await fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST',
			credentials: 'omit'
		});
		const findNodesResult: ExecutionResult<GQLFindPublicNodesQuery> = await response.json();
		const newNodes = findNodesResult.data?.findPublicNodes?.nodes
			.filter((node): node is PublicNode => node !== null)
			.map((node) => convertGQLToNode(node));
		return {
			newNodes: newNodes ?? [],
			newToken: findNodesResult.data?.findPublicNodes?.page_token ?? null
		};
	},
	getPublicNodeQuery: async (
		nodeLinkId: string,
		accessCode?: string
	): Promise<{
		publicNode: { id: string; name: string; type: GQLNodeType } | undefined;
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
			method: 'POST',
			credentials: 'omit'
		});
		const getPublicNodeResult: ExecutionResult<GQLGetPublicNodeQuery> = await response.json();
		if (
			getPublicNodeResult.data?.getPublicNode?.id &&
			getPublicNodeResult.data.getPublicNode.name
		) {
			return {
				publicNode: {
					id: getPublicNodeResult.data.getPublicNode.id,
					name: getPublicNodeResult.data.getPublicNode.name,
					type: getPublicNodeResult.data.getPublicNode.type
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
