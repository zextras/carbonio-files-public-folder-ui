/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useState } from 'react';

import type { GraphQLError } from 'graphql/error';

import type { Node } from '../model/Node';
import { client } from '../network/client';

type UseGetPublicNodeReturnType = {
	publicNode: Pick<Node, 'id' | 'name' | 'type'> | null | undefined;
	errors: readonly GraphQLError[] | undefined;
	nodeLinkId: string;
	queryWithAccessCode: (accessCode: string) => void;
	accessCode?: string;
};

export const useGetPublicNode = (): UseGetPublicNodeReturnType => {
	const [publicNode, setPublicNode] = useState<
		UseGetPublicNodeReturnType['publicNode'] | undefined
	>();
	const [errors, setErrors] = useState<readonly GraphQLError[] | undefined>(undefined);
	const [accessCode, setAccessCode] = useState<string | undefined>(undefined);

	const nodeLinkId = window.location.pathname.split('/').slice(-1)[0];

	const getPublicNodeQuery = useCallback(
		(accessCodeArg?: string) => {
			client.getPublicNodeQuery(nodeLinkId, accessCodeArg).then((result) => {
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
		(accessCodeArg: string) => {
			getPublicNodeQuery(accessCodeArg);
			setAccessCode(accessCodeArg);
		},
		[getPublicNodeQuery]
	);

	return {
		publicNode,
		errors,
		nodeLinkId,
		queryWithAccessCode,
		accessCode
	};
};
