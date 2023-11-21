/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useEffect, useState } from 'react';

import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';

import {
	GetPublicNodeDocument,
	GQLGetPublicNodeQuery,
	GQLGetPublicNodeQueryVariables
} from '../graphql/types';
import { Body } from '../mocks/handlers/handlers.learning.test';
import { Node } from '../model/Node';
import { API_ENDPOINT } from '../utils/constants';

type UseGetPublicNodeRetunType = {
	publicNode: Pick<Node, 'id' | 'name'> | undefined;
};

export const useGetPublicNode = (): UseGetPublicNodeRetunType => {
	const [publicNode, setPublicNode] = useState<
		UseGetPublicNodeRetunType['publicNode'] | undefined
	>();

	useEffect(() => {
		const pathnameArray = window.location.pathname.split('/');
		const body: Body<GQLGetPublicNodeQueryVariables> = {
			variables: { node_link_id: pathnameArray[pathnameArray.length - 1] },
			query: print(GetPublicNodeDocument)
		};

		fetch(new URL(API_ENDPOINT, window.location.origin), {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<GQLGetPublicNodeQuery>> => response.json())
			.then((result) => {
				if (result.data?.getPublicNode?.id && result.data?.getPublicNode?.name) {
					setPublicNode({
						id: result.data.getPublicNode.id,
						name: result.data.getPublicNode.name
					});
				}
			});
	}, []);
	return { publicNode };
};
