/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { GQLFindPublicNodesQuery } from '../graphql/types';
import type { NonNullableListItem } from '../utils/typeUtils';

export type NodeOfFindNodes = NonNullableListItem<
	NonNullable<GQLFindPublicNodesQuery['findPublicNodes']>['nodes']
>;

export type PublicNode = NodeOfFindNodes;
export type PublicFile = Extract<NodeOfFindNodes, { __typename: 'PublicFile' }>;
export type PublicFolder = Extract<NodeOfFindNodes, { __typename: 'PublicFolder' }>;
