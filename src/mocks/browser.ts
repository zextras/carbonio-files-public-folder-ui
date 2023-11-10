/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { setupWorker } from 'msw/browser';

import { fileBuilder, folderBuilder } from './factories';
import { createFindNodesHandler } from './handlers/findNodes';
import { createGetPublicNodeHandler } from './handlers/getPublicNode';

export const worker = setupWorker(
	createGetPublicNodeHandler({ __typename: 'Folder', id: 'publicNodeId' }),
	createFindNodesHandler([...folderBuilder(5), ...fileBuilder(5)])
);

export type WorkerStartReturnType = ReturnType<(typeof worker)['start']>;
