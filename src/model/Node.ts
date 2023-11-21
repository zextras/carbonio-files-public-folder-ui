/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { NodeOfFindNodes } from '../components/types';
import { GQLFile, GQLNode } from '../graphql/types';

export type Node = {
	createdAt: GQLNode['created_at'];
	id: GQLNode['id'];
	name: GQLNode['name'];
	type: GQLNode['type'];
	updatedAt: GQLNode['updated_at'];
	extension?: GQLFile['extension'];
	mimeType?: GQLFile['mime_type'];
	size?: GQLFile['size'];
} & (
	| {
			isDirectory: true;
			isFile: false;
	  }
	| {
			isDirectory: false;
			isFile: true;
	  }
);

export function convertGQLToNode(node: NodeOfFindNodes): Node {
	const commonNode = {
		id: node.id,
		name: node.name,
		type: node.type,
		createdAt: node.created_at,
		updatedAt: node.updated_at
	};

	if (node.__typename === 'Folder') {
		return {
			...commonNode,
			isDirectory: true,
			isFile: false
		};
	}
	return {
		...commonNode,
		isDirectory: false,
		isFile: true,
		extension: node.extension,
		mimeType: node.mime_type,
		size: node.size
	};
}

export type Location = Pick<Node, 'id' | 'name'>;
