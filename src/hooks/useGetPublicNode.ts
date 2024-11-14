/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useState } from 'react';

import { GraphQLError } from 'graphql/error';

import { Node } from '../model/Node';
import { client } from '../network/client';

type UseGetPublicNodeReturnType = {
	publicNode: Pick<Node, 'id' | 'name'> | null | undefined;
	errors: readonly GraphQLError[] | undefined;
	nodeLinkId: string;
	queryWithAccessCode: (accessCode: string) => void;
};

export const useGetPublicNode = (): UseGetPublicNodeReturnType => {
	const [publicNode, setPublicNode] = useState<
		UseGetPublicNodeReturnType['publicNode'] | undefined
	>();
	const [errors, setErrors] = useState<readonly GraphQLError[] | undefined>(undefined);

	const nodeLinkId = window.location.pathname.split('/').slice(-1)[0];

	const getPublicNodeQuery = useCallback(
		(accessCode?: string) => {
			client.getPublicNodeQuery(nodeLinkId, accessCode).then((result) => {
				if (result.publicNode) {
					setPublicNode(result.publicNode);
					setErrors(undefined);
				} else {
					setPublicNode(undefined);
					setErrors(result.errors);
				}
			});
		},
		[nodeLinkId]
	);

	useEffect(() => {
		getPublicNodeQuery();
	}, [getPublicNodeQuery]);

	const queryWithAccessCode = useCallback(
		(accessCode: string) => {
			getPublicNodeQuery(accessCode);
		},
		[getPublicNodeQuery]
	);

	return {
		publicNode,
		errors,
		nodeLinkId,
		queryWithAccessCode
	};
};
