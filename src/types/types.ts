/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { GQLFindNodesQuery } from '../graphql/types';
import { NonNullableListItem } from '../utils/typeUtils';

export type NodeOfFindNodes = NonNullableListItem<
	NonNullable<GQLFindNodesQuery['findNodes']>['nodes']
>;
