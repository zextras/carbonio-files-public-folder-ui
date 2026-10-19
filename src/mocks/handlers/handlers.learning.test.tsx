/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import type { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';
import { describe, expect, it } from 'vitest';

import { createFindPublicNodesHandler } from './findPublicNodes';
import { createGetPublicNodeHandler } from './getPublicNode';
import type {
	GQLFindPublicNodesQuery,
	GQLFindPublicNodesQueryVariables,
	GQLGetPublicNodeQuery,
	GQLGetPublicNodeQueryVariables
} from '../../graphql/types';
import { FindPublicNodesDocument, GetPublicNodeDocument } from '../../graphql/types';
import type { Body } from '../../network/client';
import { API_ENDPOINT } from '../../utils/constants';
import { server } from '../server';

describe('handlers', () => {
	it('getPublicNode handler', async () => {
		const node: Parameters<typeof createGetPublicNodeHandler>[0] = {
			id: faker.string.uuid(),
			name: faker.system.commonFileName(),
			__typename: 'PublicFolder'
		};
		server.use(createGetPublicNodeHandler(node));

		const body: Body<GQLGetPublicNodeQueryVariables> = {
			variables: { node_link_id: 'node_link_id' },
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

	it('findPublicNodes handler', async () => {
		server.use(
			createFindPublicNodesHandler({ nodes: [], variables: { folder_id: '', node_link_id: '' } })
		);

		const body: Body<GQLFindPublicNodesQueryVariables> = {
			variables: { folder_id: '', node_link_id: 'hash' },
			query: print(FindPublicNodesDocument)
		};

		const result = await fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		}).then((response): Promise<ExecutionResult<GQLFindPublicNodesQuery>> => response.json());

		expect(result.data?.findPublicNodes?.nodes.length).toBe(0);
	});
});
