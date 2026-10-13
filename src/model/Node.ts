/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NodeOfFindNodes, PublicFile, PublicNode } from '../types/types';

export type Node = {
	createdAt: PublicNode['created_at'];
	id: PublicNode['id'];
	name: PublicNode['name'];
	type: PublicNode['type'];
	updatedAt: PublicNode['updated_at'];
	extension?: PublicFile['extension'];
	mimeType?: PublicFile['mime_type'];
	size?: PublicFile['size'];
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

	if (node.__typename === 'PublicFolder') {
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
