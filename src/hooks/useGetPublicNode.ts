/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useEffect, useState } from 'react';

import { GraphQLError } from 'graphql/error';

import { Node } from '../model/Node';
import { client } from '../network/client';

type UseGetPublicNodeReturnType = {
	publicNode: Pick<Node, 'id' | 'name'> | null | undefined;
	errors: readonly GraphQLError[] | undefined;
	nodeLinkId: string;
};

export const useGetPublicNode = (): UseGetPublicNodeReturnType => {
	const [publicNode, setPublicNode] = useState<
		UseGetPublicNodeReturnType['publicNode'] | undefined
	>();
	const [errors, setErrors] = useState<readonly GraphQLError[] | undefined>(undefined);

	const nodeLinkId = window.location.pathname.split('/').slice(-1)[0];

	useEffect(() => {
		client.getPublicNodeQuery(nodeLinkId).then((result) => {
			if (result.publicNode) {
				setPublicNode(result.publicNode);
				setErrors(undefined);
			} else {
				setPublicNode(undefined);
				setErrors(result.errors);
			}
		});
	}, [nodeLinkId]);

	return { publicNode, errors, nodeLinkId };
};
