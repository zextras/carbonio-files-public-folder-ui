/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { faker } from '@faker-js/faker';

import { File, Folder, NodeType } from '../graphql/types';

export function createFile(file?: Partial<File>): File {
	return {
		id: faker.string.uuid(),
		name: faker.system.commonFileName(),
		created_at: faker.date.past().valueOf(),
		updated_at: faker.date.recent().valueOf(),
		type: faker.helpers.arrayElement(Object.values(NodeType)),
		mime_type: faker.system.mimeType(),
		size: faker.number.int(),
		extension: faker.system.fileExt(),
		__typename: 'File',
		...file
	};
}

export function createFolder(folder?: Partial<Folder>): Folder {
	return {
		id: faker.string.uuid(),
		name: faker.system.commonFileName(),
		created_at: faker.date.past().valueOf(),
		updated_at: faker.date.recent().valueOf(),
		type: faker.helpers.arrayElement(Object.values(NodeType)),
		__typename: 'Folder',
		...folder
	};
}
