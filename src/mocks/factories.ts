/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { faker } from '@faker-js/faker';

import { GQLFile, GQLFolder, GQLNodeType } from '../graphql/types';

export function createFile(file?: Partial<GQLFile>): GQLFile {
	return {
		id: faker.string.uuid(),
		name: faker.system.fileName({ extensionCount: 0 }),
		created_at: faker.date.past().valueOf(),
		updated_at: faker.date.recent().valueOf(),
		type: faker.helpers.arrayElement(
			Object.values(GQLNodeType).filter((nodeType) => nodeType !== GQLNodeType.Folder)
		),
		mime_type: faker.system.mimeType(),
		size: faker.number.int(),
		extension: faker.system.fileExt(),
		__typename: 'File',
		...file
	};
}

export function createFolder(folder?: Partial<GQLFolder>): GQLFolder {
	return {
		id: faker.string.uuid(),
		name: faker.system.fileName({ extensionCount: 0 }),
		created_at: faker.date.past().valueOf(),
		updated_at: faker.date.recent().valueOf(),
		type: GQLNodeType.Folder,
		__typename: 'Folder',
		...folder
	};
}

export function folderBuilder(count: number = 10): Array<GQLFolder> {
	return [...Array(count)].map(() => createFolder());
}

export function fileBuilder(count: number = 10): Array<GQLFile> {
	return [...Array(count)].map(() => createFile());
}
