/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { faker } from '@faker-js/faker';
import { setupWorker } from 'msw/browser';

import { fileBuilder, folderBuilder } from './factories';
import { createFindNodesHandler } from './handlers/findNodes';
import { createGetPublicNodeHandler } from './handlers/getPublicNode';

const firstPageNodes = [...folderBuilder(5), ...fileBuilder(20)];
const secondPageNodes = [...folderBuilder(25)];
const folderId = faker.string.uuid();

export const worker = setupWorker(
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
			nodes: secondPageNodes,
			nextPageToken: null,
			variables: { folder_id: folderId, page_token: 'token1' }
		}
	)
);

export type WorkerStartReturnType = ReturnType<(typeof worker)['start']>;
