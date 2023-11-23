/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { act, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from './App';
import { createFile, createFolder, fileBuilder, folderBuilder } from './mocks/factories';
import { createFindNodesHandler } from './mocks/handlers/findNodes';
import { createGetPublicNodeHandler } from './mocks/handlers/getPublicNode';
import { server } from './mocks/server';
import { ICONS, SELECTORS } from './test/constants';
import { setup } from './test/utils';

describe('App', () => {
	const folderId = faker.string.uuid();
	const folderName = faker.system.fileName({ extensionCount: 0 });

	// navigable folder
	const navigableFolder = createFolder();

	const file = createFile();

	const firstPageNodes = [navigableFolder, ...folderBuilder(4), file, ...fileBuilder(19)];

	const navigableFolderNodes = [...folderBuilder(10)];
	beforeEach(() => {
		const url = new URL(folderId, window.location.href);

		Object.defineProperty(window, 'location', {
			value: url
		});
		server.use(
			createGetPublicNodeHandler({
				__typename: 'Folder',
				id: folderId,
				name: folderName
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

	it('should show the content of the folder', async () => {
		setup(<App />);
		expect(await screen.findByText(folderName)).toBeVisible();
		expect(await screen.findByText(firstPageNodes[0].name)).toBeVisible();
		expect(screen.getByText('Name')).toBeVisible();
		expect(screen.getByText('Last modified')).toBeVisible();
		expect(screen.getByText('Extension')).toBeVisible();
		expect(screen.getByText('Size')).toBeVisible();
	});

	it('should navigate inside a folder when double clicked', async () => {
		const { user } = setup(<App />);
		const navigableFolderElement = await screen.findByText(navigableFolder.name);
		expect(screen.getByText(firstPageNodes[1].name)).toBeVisible();
		await user.dblClick(navigableFolderElement);
		expect(await screen.findByText(navigableFolderNodes[0].name)).toBeVisible();
		expect(screen.queryByText(firstPageNodes[1].name)).not.toBeInTheDocument();
	});

	describe('BreadCrumbs', () => {
		it('should show current location ', async () => {
			setup(<App />);
			const breadCrumbs = screen.getByTestId(SELECTORS.breadcrumbs);
			expect(breadCrumbs).toBeVisible();
			expect(await within(breadCrumbs).findByText(folderName)).toBeVisible();
		});

		it('should show navigated crumb when double click a folder', async () => {
			const { user } = setup(<App />);
			const breadCrumbs = screen.getByTestId(SELECTORS.breadcrumbs);
			const navigableFolderElement = await screen.findByText(navigableFolder.name);
			await user.dblClick(navigableFolderElement);
			expect(await within(breadCrumbs).findByText(navigableFolder.name)).toBeVisible();
		});

		it('should navigate to clicked crumb folder and remove subsequent crumbs', async () => {
			const { user } = setup(<App />);
			const breadCrumbs = screen.getByTestId(SELECTORS.breadcrumbs);
			const navigableFolderElement = await screen.findByText(navigableFolder.name);
			await user.dblClick(navigableFolderElement);
			await within(breadCrumbs).findByText(navigableFolder.name);
			await screen.findByText(navigableFolderNodes[0].name);
			expect(screen.queryByText(firstPageNodes[5].name)).not.toBeInTheDocument();
			await user.click(within(breadCrumbs).getByText(folderName));
			expect(within(breadCrumbs).queryByText(navigableFolder.name)).not.toBeInTheDocument();
			expect(await screen.findByText(firstPageNodes[5].name)).toBeVisible();
		});
	});

	it('should show the loader while the request is loading', async () => {
		server.use(
			createGetPublicNodeHandler(
				{ id: folderId, name: folderName, __typename: 'Folder' },
				undefined,
				{ delay: 1000 }
			)
		);
		setup(<App />);
		expect(screen.getByTestId(ICONS.contentLoader)).toBeVisible();
		// execute request
		await vi.advanceTimersToNextTimerAsync();
		// run delay and wait response
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1000);
		});
		await screen.findByText(folderName);
		await screen.findByText(firstPageNodes[0].name);
		expect(screen.queryByTestId(ICONS.contentLoader)).not.toBeInTheDocument();
	});

	it('should show unavailability page when the request to retrieve the public node returns an error', async () => {
		server.use(createGetPublicNodeHandler(null));
		setup(<App />);
		expect(await screen.findByTestId(ICONS.unavailableFolder)).toBeVisible();
		expect(screen.getByText('Public access link not available.')).toBeVisible();
		expect(screen.getByText('This link has been removed or is not valid.')).toBeVisible();
		expect(
			screen.getByText('For more information, try to contact the person who shared it with you.')
		).toBeVisible();
	});

	it('should show folder content when there are errors but partial data are returned', async () => {
		server.use(
			createGetPublicNodeHandler({ id: folderId, name: folderName, __typename: 'Folder' }, [
				'generic error'
			])
		);
		setup(<App />);
		expect(await screen.findByText(firstPageNodes[0].name)).toBeVisible();
		expect(screen.getByText(folderName)).toBeVisible();
		expect(screen.queryByTestId(ICONS.unavailableFolder)).not.toBeInTheDocument();
		expect(screen.queryByText('Public access link not available.')).not.toBeInTheDocument();
		expect(
			screen.queryByText('This link has been removed or is not valid.')
		).not.toBeInTheDocument();
		expect(
			screen.queryByText('For more information, try to contact the person who shared it with you.')
		).not.toBeInTheDocument();
	});
});
