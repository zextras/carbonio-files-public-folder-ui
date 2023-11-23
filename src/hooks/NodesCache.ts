/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Node } from '../model/Node';

export const nodesMap: Record<string, Array<Node> | null> = {};

export const tokenMap: Record<string, string | null> = {};

export function resetCache(): void {
	Object.keys(nodesMap).forEach((key) => {
		delete nodesMap[key];
	});
	Object.keys(tokenMap).forEach((key) => {
		delete tokenMap[key];
	});
}
