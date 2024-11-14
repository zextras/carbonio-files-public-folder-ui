/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useCallback, useEffect, useState } from 'react';

import { GraphQLError } from 'graphql/error';

import { Node } from '../model/Node';
import { client } from '../network/client';
import { error } from '../utils/constants';

type UseGetPublicNodeReturnType = {
	publicNode: Pick<Node, 'id' | 'name'> | null | undefined;
	errors: readonly GraphQLError[] | undefined;
	nodeLinkId: string;
	accessCodeRequired: boolean;
	wrongAccessCode: boolean;
	linkNotFound: boolean;
	queryWithAccessCode: (accessCode: string) => void;
};

export const useGetPublicNode = (): UseGetPublicNodeReturnType => {
	const [publicNode, setPublicNode] = useState<
		UseGetPublicNodeReturnType['publicNode'] | undefined
	>();
	const [errors, setErrors] = useState<readonly GraphQLError[] | undefined>(undefined);
	const [accessCodeRequired, setAccessCodeRequired] = useState(false);
	const [wrongAccessCode, setWrongAccessCode] = useState(false);
	const [linkNotFound, setLinkNotFound] = useState(false);

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

	useEffect(() => {
		if (errors?.some((err) => err.extensions?.errorCode === error.accessCodeRequired)) {
			setAccessCodeRequired(true);
		}
		if (errors?.some((err) => err.extensions?.errorCode === error.wrongAccessCode)) {
			setAccessCodeRequired(true);
			setWrongAccessCode(true);
		}
		if (errors?.some((err) => err.extensions?.errorCode === error.linkNotFound)) {
			setLinkNotFound(true);
		}
		if (errors?.length === 0) {
			setAccessCodeRequired(false);
			setWrongAccessCode(false);
			setLinkNotFound(false);
		}
	}, [errors]);

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
		accessCodeRequired,
		wrongAccessCode,
		linkNotFound,
		queryWithAccessCode
	};
};
