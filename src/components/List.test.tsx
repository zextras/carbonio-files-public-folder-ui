/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { faker } from '@faker-js/faker';
import { describe, expect, it, vi } from 'vitest';

import { List } from './List';
import { GQLNodeType } from '../graphql/types';
import { Node } from '../model/Node';
import { ICONS } from '../test/constants';
import { screen, setup } from '../test/utils';

describe('List', () => {
	it.each(Object.values(GQLNodeType).filter((nodeType) => nodeType !== GQLNodeType.Folder))(
		'should show the download button for %s',
		(nodeType) => {
			const nodes: Node[] = [
				{
					createdAt: faker.date.recent().valueOf(),
					id: faker.string.uuid(),
					name: nodeType,
					type: nodeType,
					updatedAt: faker.date.recent().valueOf(),
					isDirectory: false,
					isFile: true
				}
			];
			setup(<List nodes={nodes} onItemDoubleClick={vi.fn()} />);
			expect(screen.getByRoleWithIcon('button', { icon: ICONS.download })).toBeVisible();
		}
	);

	it('should not show the download button for folders', () => {
		const nodes: Node[] = [
			{
				createdAt: faker.date.recent().valueOf(),
				id: faker.string.uuid(),
				name: 'Folder',
				type: GQLNodeType.Folder,
				updatedAt: faker.date.recent().valueOf(),
				isDirectory: true,
				isFile: false
			}
		];
		setup(<List nodes={nodes} onItemDoubleClick={vi.fn()} />);
		expect(screen.queryByRoleWithIcon('button', { icon: ICONS.download })).not.toBeInTheDocument();
	});
});
