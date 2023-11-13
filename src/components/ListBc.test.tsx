/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { it, describe, expect, beforeEach } from 'vitest';

import { ListBc } from './ListBc';
import { fileBuilder, folderBuilder } from '../mocks/factories';
import { createFindNodesHandler } from '../mocks/handlers/findNodes';
import { server } from '../mocks/server';
import { ICONS } from '../test/constants';
import { setup, triggerLoadMore } from '../test/utils';

// TODO rename
describe('ListBc', () => {
	const firstPageNodes = [...folderBuilder(5), ...fileBuilder(20)];
	const secondPageNodes = [...folderBuilder(10)];
	const folderId = faker.string.uuid();
	beforeEach(() => {
		server.use(
			createFindNodesHandler(
				{
					nodes: firstPageNodes,
					nextPageToken: 'token1',
					variables: { folder_id: folderId }
				},
				{
					nodes: secondPageNodes,
					nextPageToken: null,
					variables: { folder_id: folderId, page_token: 'token1' }
				}
			)
		);
	});
	it('should show nodes of specific folderId', async () => {
		setup(<ListBc folderId={folderId} />);
		await screen.findByText(firstPageNodes[0].name);
		firstPageNodes.forEach((node) => {
			expect(screen.getByText(node.name)).toBeVisible();
		});
	});

	it('should show empty folder message and icon when folder is empty ', async () => {
		server.use(
			createFindNodesHandler({
				nodes: [],
				nextPageToken: null,
				variables: { folder_id: folderId }
			})
		);
		setup(<ListBc folderId={folderId} />);
		expect(await screen.findByText('There are no items in this folder.')).toBeVisible();
		expect(await screen.findByTestId(ICONS.emptyFolder)).toBeVisible();
	});

	it('should load the second page only when bottom element becomes visible', async () => {
		setup(<ListBc folderId={folderId} />);
		await screen.findByText(firstPageNodes[0].name);
		expect(screen.queryByText(secondPageNodes[0].name)).not.toBeInTheDocument();
		triggerLoadMore();
		expect(await screen.findByText(secondPageNodes[0].name)).toBeVisible();
	});
});
