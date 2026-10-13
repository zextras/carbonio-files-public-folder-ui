/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { client } from './client';

const jsonResponse = (payload: unknown): Response =>
	new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } });

describe('client', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('findNodesQuery posts to the unified GraphQL endpoint without credentials', async () => {
		const fetchSpy = vi
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(
				jsonResponse({ data: { findPublicNodes: { nodes: [], page_token: null } } })
			);

		await client.findNodesQuery('folder-id', 'link-id');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		const [url, init] = fetchSpy.mock.calls[0];
		expect((url as URL).pathname).toBe('/services/files/graphql/');
		expect(init?.credentials).toBe('omit');
	});

	it('getPublicNodeQuery posts to the unified GraphQL endpoint without credentials', async () => {
		const fetchSpy = vi
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(
				jsonResponse({ data: { getPublicNode: { id: 'id', name: 'name', type: 'FOLDER' } } })
			);

		await client.getPublicNodeQuery('link-id');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		const [url, init] = fetchSpy.mock.calls[0];
		expect((url as URL).pathname).toBe('/services/files/graphql/');
		expect(init?.credentials).toBe('omit');
	});
});
