/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import App from './App';
import { createFile, createFolder, fileBuilder, folderBuilder } from './mocks/factories';
import { createFindNodesHandler } from './mocks/handlers/findNodes';
import { createGetPublicNodeHandler } from './mocks/handlers/getPublicNode';
import { server } from './mocks/server';
import { setup } from './test/utils';

it.todo('should show the content of the folder', () => {
	render(<App />);
	expect(screen.getByText('Folder name')).toBeVisible();
	expect(screen.getByText('Name')).toBeVisible();
	expect(screen.getByText('Last modified')).toBeVisible();
	expect(screen.getByText('Extension')).toBeVisible();
	expect(screen.getByText('Size')).toBeVisible();
	expect(screen.getByText('Name of the subfolder')).toBeVisible();
	expect(screen.getByText('Name of file 1')).toBeVisible();
	expect(screen.getByText('Name of file 2')).toBeVisible();
});

describe('App', () => {
	const folderId = faker.string.uuid();

	// navigable folder
	const navigableFolder = createFolder();

	const file = createFile();

	const firstPageNodes = [navigableFolder, ...folderBuilder(4), file, ...fileBuilder(19)];

	const navigableFolderNodes = [...folderBuilder(10)];
	beforeEach(() => {
		server.use(
			createGetPublicNodeHandler({
				__typename: 'Folder',
				id: folderId
			}),
			createFindNodesHandler(
				{
					nodes: firstPageNodes,
					nextPageToken: 'token1',
					variables: { folder_id: folderId }
				},
				{
					nodes: navigableFolderNodes,
					nextPageToken: null,
					variables: { folder_id: navigableFolder.id }
				}
			)
		);
	});

	it('should navigate inside a folder when double clicked', async () => {
		const { user } = setup(<App />);
		const navigableFolderElement = await screen.findByText(navigableFolder.name);
		expect(screen.getByText(firstPageNodes[1].name)).toBeVisible();
		await user.dblClick(navigableFolderElement);
		expect(await screen.findByText(navigableFolderNodes[0].name)).toBeVisible();
		expect(screen.queryByText(firstPageNodes[1].name)).not.toBeInTheDocument();
	});
});
