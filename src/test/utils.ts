/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { faker } from '@faker-js/faker';
import { BreadcrumbsProps, Crumb } from '@zextras/carbonio-design-system';

import { ListItemProps } from '../components/ListItem';
import { NodeType } from '../graphql/types';

export function listItemPropsBuilder(props?: Partial<ListItemProps>): ListItemProps {
	return {
		name: faker.system.fileName({ extensionCount: 0 }),
		type: faker.helpers.arrayElement(Object.values(NodeType)),
		mimeType: faker.system.mimeType(),
		lastModified: faker.date.recent().valueOf(),
		size: faker.number.int(),
		extension: faker.system.fileExt(),
		...props
	};
}

export function crumbsBuilder(count: number = 3): BreadcrumbsProps['crumbs'] {
	return [...Array(count)].map((_, index) => {
		const label2 = faker.system.fileName({ extensionCount: 0 });
		const crumb2: Crumb = {
			label: label2,
			id: `${index}`
		};

		return crumb2;
	});
}
