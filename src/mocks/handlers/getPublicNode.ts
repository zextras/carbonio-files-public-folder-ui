/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { graphql as executeGraphql } from 'graphql';
import { GraphQLError } from 'graphql/error';
import type { GraphQLHandler } from 'msw';
import { delay, graphql, HttpResponse } from 'msw';

import { schema } from './schema';
import type { GQLGetPublicNodeQuery, GQLGetPublicNodeQueryVariables } from '../../graphql/types';
import { GetPublicNodeDocument, GQLNodeType } from '../../graphql/types';
import { resolveByTypename } from '../../test/resolvers';
import { ERROR } from '../../utils/constants';

function handleErrors<TNode>(
	variables: GQLGetPublicNodeQueryVariables,
	node: TNode
): asserts node is NonNullable<TNode> {
	if (
		variables.node_link_id === 'invalid' ||
		node === null ||
		variables.node_link_id.trim() === ''
	) {
		throw new GraphQLError(`Could not find link with id ${variables.node_link_id}`, {
			extensions: { errorCode: ERROR.linkNotFound }
		});
	}
	if (variables.node_link_id === 'withAccessCode') {
		if (variables.access_code === undefined) {
			throw new GraphQLError('Access code required', {
				extensions: { errorCode: ERROR.accessCodeRequired }
			});
		}
		if (variables.access_code?.toLowerCase() !== 'accesscode') {
			throw new GraphQLError('Invalid access code', {
				extensions: { errorCode: ERROR.wrongAccessCode }
			});
		}
	}
}

export function createGetPublicNodeHandler(
	node: Partial<GQLGetPublicNodeQuery['getPublicNode']>,
	errors?: Partial<GraphQLError>[],
	handlerOptions?: { delay?: Parameters<typeof delay>[0]; once?: boolean }
): GraphQLHandler {
	return graphql.query(
		GetPublicNodeDocument,
		async ({ query, variables }) => {
			const { data, errors: gqlErrors } = await executeGraphql({
				schema,
				source: query,
				variableValues: variables,
				typeResolver: resolveByTypename,
				rootValue: {
					getPublicNode(): GQLGetPublicNodeQuery['getPublicNode'] {
						handleErrors(variables, node);
						const emptyFolderId =
							variables.node_link_id === 'empty' ? { id: 'empty-folder-id' } : {};
						return {
							__typename: 'Folder',
							id: faker.string.uuid(),
							name: faker.system.fileName(),
							type: faker.helpers.arrayElement([GQLNodeType.Folder]),
							...node,
							...emptyFolderId
						};
					}
				}
			});

			if (handlerOptions?.delay) {
				await delay(handlerOptions.delay);
			}

			return HttpResponse.json({
				errors: errors || gqlErrors ? [...(errors ?? []), ...(gqlErrors ?? [])] : undefined,
				data: { getPublicNode: null, ...data, __typename: 'Query' }
			});
		},
		{ once: handlerOptions?.once }
	);
}
