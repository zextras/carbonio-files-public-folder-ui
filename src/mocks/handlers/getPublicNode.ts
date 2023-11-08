/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { graphql as executeGraphql } from 'graphql';
import { graphql, GraphQLHandler, HttpResponse } from 'msw';

import { schema } from './schema';
import { GetPublicNodeDocument, GQLGetPublicNodeQuery } from '../../graphql/types';
import { resolveByTypename } from '../../test/resolvers';
import { MakeRequired } from '../../utils/typeUtils';

export function createGetPublicNodeHandler(
	node: MakeRequired<Partial<NonNullable<GQLGetPublicNodeQuery['getPublicNode']>>, '__typename'>
): GraphQLHandler {
	return graphql.query(GetPublicNodeDocument, async ({ query, variables }) => {
		const { data, errors } = await executeGraphql({
			schema,
			source: query,
			variableValues: variables,
			typeResolver: resolveByTypename,
			rootValue: {
				getPublicNode(): GQLGetPublicNodeQuery['getPublicNode'] {
					return {
						name: faker.system.commonFileName(),
						id: faker.string.uuid(),
						...node
					};
				}
			}
		});

		return HttpResponse.json({ errors, data: data || undefined });
	});
}
