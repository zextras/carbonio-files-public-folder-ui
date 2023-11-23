/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';
import { describe, expect, it } from 'vitest';

import { createFindNodesHandler } from './findNodes';
import { createGetPublicNodeHandler } from './getPublicNode';
import {
	FindNodesDocument,
	GetPublicNodeDocument,
	GQLFindNodesQuery,
	GQLFindNodesQueryVariables,
	GQLGetPublicNodeQuery,
	GQLGetPublicNodeQueryVariables
} from '../../graphql/types';
import { API_ENDPOINT } from '../../utils/constants';
import { server } from '../server';

export type Body<TVariables extends Record<string, unknown>> = {
	variables: TVariables;
	query: string;
};

describe('handlers', () => {
	it('getPublicNode handler', async () => {
		const node: Parameters<typeof createGetPublicNodeHandler>[0] = {
			id: faker.string.uuid(),
			name: faker.system.commonFileName(),
			__typename: 'Folder'
		};
		server.use(createGetPublicNodeHandler(node));

		const body: Body<GQLGetPublicNodeQueryVariables> = {
			variables: { node_link_id: '' },
			query: print(GetPublicNodeDocument)
		};

		const result = await fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		}).then((response): Promise<ExecutionResult<GQLGetPublicNodeQuery>> => response.json());

		expect(result.data?.getPublicNode?.name).toBe(node.name);
	});

	it('findNodes handler', async () => {
		server.use(createFindNodesHandler({ nodes: [], variables: { folder_id: '' } }));

		const body: Body<GQLFindNodesQueryVariables> = {
			variables: { folder_id: '' },
			query: print(FindNodesDocument)
		};

		const result = await fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		}).then((response): Promise<ExecutionResult<GQLFindNodesQuery>> => response.json());

		expect(result.data?.findNodes?.nodes.length).toBe(0);
	});
});
