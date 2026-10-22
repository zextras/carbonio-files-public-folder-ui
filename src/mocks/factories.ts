/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { faker } from '@faker-js/faker';

import { GQLNodeType } from '../graphql/types';
import type { PublicFile, PublicFolder } from '../types/types';

// faker.system.fileName draws from a small dictionary, so generating many nodes
// occasionally yields duplicate names. Tests query nodes by their exact name with
// getByText, which then throws "found multiple elements". A monotonic suffix keeps
// the realistic faker name while guaranteeing uniqueness across a single test run.
let uniqueNodeNameCounter = 0;

function uniqueNodeName(): string {
	uniqueNodeNameCounter += 1;
	return `${faker.system.fileName({ extensionCount: 0 })}-${uniqueNodeNameCounter}`;
}

export function createFile(file?: Partial<PublicFile>): PublicFile {
	return {
		id: faker.string.uuid(),
		name: uniqueNodeName(),
		created_at: faker.date.past().valueOf(),
		updated_at: faker.date.recent().valueOf(),
		type: faker.helpers.arrayElement(
			Object.values(GQLNodeType).filter(
				(nodeType) => nodeType !== GQLNodeType.Folder && nodeType !== GQLNodeType.Root
			)
		),
		mime_type: faker.system.mimeType(),
		size: faker.number.int(),
		extension: faker.system.fileExt(),
		__typename: 'PublicFile',
		...file
	};
}

export function createFolder(folder?: Partial<PublicFolder>): PublicFolder {
	return {
		id: faker.string.uuid(),
		name: uniqueNodeName(),
		created_at: faker.date.past().valueOf(),
		updated_at: faker.date.recent().valueOf(),
		type: GQLNodeType.Folder,
		__typename: 'PublicFolder',
		...folder
	};
}

export function folderBuilder(count: number = 10): Array<PublicFolder> {
	return [...Array(count)].map(() => createFolder());
}

export function fileBuilder(count: number = 10): Array<PublicFile> {
	return [...Array(count)].map(() => createFile());
}
