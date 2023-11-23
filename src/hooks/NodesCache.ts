/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Node } from '../model/Node';

export const nodesMap = new Map<string, Array<Node> | null>();

export const tokenMap = new Map<string, string | null>();

export function resetCache(): void {
	if (nodesMap.size > 0) {
		nodesMap.clear();
	}
	if (tokenMap.size > 0) {
		tokenMap.clear();
	}
}
