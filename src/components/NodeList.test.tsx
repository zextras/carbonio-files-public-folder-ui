/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NodeList } from './NodeList';
import { createFile, createFolder, fileBuilder, folderBuilder } from '../mocks/factories';
import { createFindNodesHandler } from '../mocks/handlers/findNodes';
import { server } from '../mocks/server';
import { ICONS } from '../test/constants';
import { screen, setup, triggerLoadMore } from '../test/utils';

describe('NodeList', () => {
	const folderId = faker.string.uuid();

	const navigableFolder = createFolder();

	const file = createFile();

	const firstPageNodes = [navigableFolder, ...folderBuilder(4), file, ...fileBuilder(19)];
	const secondPageNodes = [...folderBuilder(10)];

	const navigableFolderNodes = [...folderBuilder(10)];

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
				},
				{
					nodes: navigableFolderNodes,
					nextPageToken: null,
					variables: { folder_id: navigableFolder.id }
				}
			)
		);
	});

	it('should show nodes of specific folderId', async () => {
		setup(<NodeList currentId={folderId} navigateTo={vi.fn()} />);
		await screen.findByText(firstPageNodes[0].name);
		firstPageNodes.forEach((node) => {
			expect(screen.getByText(node.name)).toBeVisible();
		});
	});

	it('should show empty folder message and icon when folder is empty', async () => {
		server.use(
			createFindNodesHandler({
				nodes: [],
				nextPageToken: null,
				variables: { folder_id: folderId }
			})
		);
		setup(<NodeList currentId={folderId} navigateTo={vi.fn()} />);
		expect(await screen.findByText('There are no items in this folder.')).toBeVisible();
		expect(await screen.findByTestId(ICONS.emptyFolder)).toBeVisible();
	});

	it('should load the second page only when bottom element becomes visible', async () => {
		setup(<NodeList currentId={folderId} navigateTo={vi.fn()} />);
		await screen.findByText(firstPageNodes[0].name);
		expect(screen.queryByText(secondPageNodes[0].name)).not.toBeInTheDocument();
		triggerLoadMore();
		expect(await screen.findByText(secondPageNodes[0].name)).toBeVisible();
	});

	it('should show the loader while the content is loading', async () => {
		server.use(
			createFindNodesHandler({
				nodes: firstPageNodes,
				nextPageToken: null,
				variables: { folder_id: folderId },
				delayAmount: 1000
			})
		);
		setup(<NodeList currentId={folderId} navigateTo={vi.fn()} />);
		expect(screen.getByTestId(ICONS.contentLoader)).toBeVisible();
		expect(screen.queryByText('There are no items in this folder.')).not.toBeInTheDocument();
		expect(screen.queryByTestId(ICONS.emptyFolder)).not.toBeInTheDocument();
		// execute request
		await vi.advanceTimersToNextTimerAsync();
		// run delay and wait response
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1000);
		});
		expect(screen.getByText(firstPageNodes[0].name)).toBeVisible();
		expect(screen.queryByTestId(ICONS.contentLoader)).not.toBeInTheDocument();
	});

	it('should do nothing when a file is double clicked', async () => {
		const navigateToMock = vi.fn();
		const { user } = setup(<NodeList currentId={folderId} navigateTo={navigateToMock} />);
		const fileElement = await screen.findByText(file.name);
		expect(screen.getByText(firstPageNodes[1].name)).toBeVisible();
		await user.dblClick(fileElement);
		expect(navigateToMock).not.toHaveBeenCalled();
	});

	it('should show the download button for files', async () => {
		server.use(
			createFindNodesHandler({
				nodes: [file],
				variables: { folder_id: folderId }
			})
		);
		const navigateToMock = vi.fn();
		setup(<NodeList currentId={folderId} navigateTo={navigateToMock} />);
		expect(await screen.findByRoleWithIcon('button', { icon: ICONS.download })).toBeVisible();
	});

	it('should not show the download button for folders', async () => {
		const folder = createFolder();
		server.use(
			createFindNodesHandler({
				nodes: [folder],
				variables: { folder_id: folderId }
			})
		);
		const navigateToMock = vi.fn();
		setup(<NodeList currentId={folderId} navigateTo={navigateToMock} />);
		await screen.findByText(folder.name);
		expect(screen.queryByRoleWithIcon('button', { icon: ICONS.download })).not.toBeInTheDocument();
	});

	it('should show the snackbar when the user clicks on download icon', async () => {
		server.use(
			createFindNodesHandler({
				nodes: [file],
				variables: { folder_id: folderId }
			})
		);
		const navigateToMock = vi.fn();
		const { user } = setup(<NodeList currentId={folderId} navigateTo={navigateToMock} />);
		await user.click(await screen.findByRoleWithIcon('button', { icon: ICONS.download }));
		expect(screen.getByText('Your download will start soon')).toBeVisible();
	});
});
