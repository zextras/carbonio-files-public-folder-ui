/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { convertGQLToNode, Node } from './Node';
import { GQLFile, GQLFolder, GQLNodeType } from '../graphql/types';

describe('convertGQLToNode function', () => {
	it('should convert a GQLFile to a Node with the fields specific to files valued', () => {
		const gqlFile: GQLFile = {
			__typename: 'File',
			id: faker.string.uuid(),
			name: faker.system.fileName({ extensionCount: 0 }),
			created_at: faker.date.past().valueOf(),
			updated_at: faker.date.recent().valueOf(),
			type: faker.helpers.arrayElement(Object.values(GQLNodeType)),
			extension: faker.system.fileExt(),
			mime_type: faker.system.mimeType(),
			size: faker.number.int()
		};
		const expected: Node = {
			id: gqlFile.id,
			name: gqlFile.name,
			createdAt: gqlFile.created_at,
			updatedAt: gqlFile.updated_at,
			type: gqlFile.type,
			extension: gqlFile.extension,
			mimeType: gqlFile.mime_type,
			size: gqlFile.size,
			isFile: true,
			isDirectory: false
		};
		const result = convertGQLToNode(gqlFile);
		expect(result).toEqual(expected);
	});

	it('should convert a GQLFolder to a Node with the specific file fields set to undefined', () => {
		const gqlFile: GQLFolder = {
			__typename: 'Folder',
			id: faker.string.uuid(),
			name: faker.system.fileName({ extensionCount: 0 }),
			created_at: faker.date.past().valueOf(),
			updated_at: faker.date.recent().valueOf(),
			type: faker.helpers.arrayElement(Object.values(GQLNodeType))
		};
		const expected: Node = {
			id: gqlFile.id,
			name: gqlFile.name,
			createdAt: gqlFile.created_at,
			updatedAt: gqlFile.updated_at,
			type: gqlFile.type,
			extension: undefined,
			mimeType: undefined,
			size: undefined,
			isFile: false,
			isDirectory: true
		};
		const result = convertGQLToNode(gqlFile);
		expect(result).toEqual(expected);
	});
});
