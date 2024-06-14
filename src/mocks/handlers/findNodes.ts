/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { graphql as executeGraphql } from 'graphql';
import { delay, graphql, GraphQLHandler, HttpResponse } from 'msw';

import { schema } from './schema';
import {
	FindNodesDocument,
	GQLFindNodesQuery,
	GQLFindNodesQueryVariables
} from '../../graphql/types';
import { resolveByTypename } from '../../test/resolvers';

export function createFindNodesHandler(
	...args: Array<{
		variables: GQLFindNodesQueryVariables;
		nodes: NonNullable<GQLFindNodesQuery['findNodes']>['nodes'];
		nextPageToken?: string | null;
		delayAmount?: Parameters<typeof delay>[0];
	}>
): GraphQLHandler {
	return graphql.query(FindNodesDocument, async ({ query, variables }) => {
		const { folder_id: folderId, page_token: pageToken } = variables;

		const match = args.find(
			(value) => value.variables.folder_id === folderId && value.variables.page_token === pageToken
		);

		const { data, errors } = await executeGraphql({
			schema,
			source: query,
			variableValues: variables,
			typeResolver: resolveByTypename,
			rootValue: {
				findNodes: (): GQLFindNodesQuery['findNodes'] => ({
					nodes: match?.nodes ?? [],
					page_token: match?.nextPageToken ?? null,
					__typename: 'NodePage'
				})
			}
		});

		if (match?.delayAmount) {
			await delay(match.delayAmount);
		}
		return HttpResponse.json({ errors, data: { ...data, __typename: 'Query' } });
	});
}
