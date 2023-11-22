/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { graphql as executeGraphql } from 'graphql';
import { delay, graphql, GraphQLHandler, HttpResponse } from 'msw';

import { schema } from './schema';
import { GetPublicNodeDocument, GQLGetPublicNodeQuery } from '../../graphql/types';
import { resolveByTypename } from '../../test/resolvers';
import { MakeRequired } from '../../utils/typeUtils';

export function createGetPublicNodeHandler(
	node: MakeRequired<
		Partial<NonNullable<GQLGetPublicNodeQuery['getPublicNode']>>,
		'__typename'
	> | null,
	errors?: string[],
	handlerOptions?: { delay?: Parameters<typeof delay>[0] }
): GraphQLHandler {
	return graphql.query(GetPublicNodeDocument, async ({ query, variables }) => {
		const { data, errors: gqlErrors } = await executeGraphql({
			schema,
			source: query,
			variableValues: variables,
			typeResolver: resolveByTypename,
			rootValue: {
				getPublicNode(): GQLGetPublicNodeQuery['getPublicNode'] {
					if (variables.node_link_id === 'invalid' || node === null) {
						throw new Error(`Could not find link with id ${variables.node_link_id}`);
					}
					if (variables.node_link_id === 'empty') {
						return {
							name: faker.system.fileName({ extensionCount: 0 }),
							...node,
							id: 'empty-folder-id'
						};
					}
					return {
						name: faker.system.fileName({ extensionCount: 0 }),
						id: faker.string.uuid(),
						...node
					};
				}
			}
		});

		if (handlerOptions?.delay) {
			await delay(handlerOptions.delay);
		}

		return HttpResponse.json({
			errors: errors || gqlErrors ? [...(errors ?? []), ...(gqlErrors ?? [])] : undefined,
			data: data ?? { getPublicNode: null }
		});
	});
}
