/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { graphql as executeGraphql } from 'graphql';
import { graphql, GraphQLHandler, HttpResponse } from 'msw';

import { schema } from './schema';
import { FindNodesDocument, GQLFindNodesQuery } from '../../graphql/types';
import { resolveByTypename } from '../../test/resolvers';

export function createFindNodesHandler(
	nodes: NonNullable<GQLFindNodesQuery['findNodes']>['nodes']
): GraphQLHandler {
	return graphql.query(FindNodesDocument, async ({ query, variables }) => {
		const { data, errors } = await executeGraphql({
			schema,
			source: query,
			variableValues: variables,
			typeResolver: resolveByTypename,
			rootValue: {
				findNodes(): GQLFindNodesQuery['findNodes'] {
					return {
						nodes,
						page_token: null,
						__typename: 'NodePage'
					};
				}
			}
		});

		return HttpResponse.json({ errors, data: data || undefined });
	});
}
