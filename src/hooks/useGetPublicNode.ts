/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useEffect, useState } from 'react';

import { GraphQLError } from 'graphql/error';

import { Node } from '../model/Node';
import { client } from '../network/client';

type UseGetPublicNodeRetunType = {
	publicNode: Pick<Node, 'id' | 'name'> | null | undefined;
	errors: readonly GraphQLError[] | undefined;
};

export const useGetPublicNode = (): UseGetPublicNodeRetunType => {
	const [publicNode, setPublicNode] = useState<
		UseGetPublicNodeRetunType['publicNode'] | undefined
	>();
	const [errors, setErrors] = useState<readonly GraphQLError[] | undefined>(undefined);

	useEffect(() => {
		client.getPublicNodeQuery(window.location.pathname.split('/').slice(-1)[0]).then((result) => {
			if (result.publicNode) {
				setPublicNode(result.publicNode);
				setErrors(undefined);
			} else {
				setPublicNode(undefined);
				setErrors(result.errors);
			}
		});
	}, []);
	return { publicNode, errors };
};
