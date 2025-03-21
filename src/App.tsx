/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useMemo, useState } from 'react';

import { Container, SnackbarManager, ThemeProvider } from '@zextras/carbonio-design-system';
import type { GraphQLError } from 'graphql/error';

import { AccessCodeModal } from './components/AccessCodeModal';
import { DownloadModal } from './components/DownloadModal';
import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { LinkNotFoundContainer } from './components/LinkNotFoundContainer';
import { LoadingIcon } from './components/LoadingIcon';
import { NodeList } from './components/NodeList';
import { GQLNodeType } from './graphql/types';
import { useCrumbs } from './hooks/useCrumbs';
import { useGetPublicNode } from './hooks/useGetPublicNode';
import './i18n';
import './network/login-config';
import type { Location } from './model/Node';
import { ERROR } from './utils/constants';

type ErrorCode = (typeof ERROR)[keyof typeof ERROR];
function containsError(errors: readonly GraphQLError[] | undefined, errorCode: ErrorCode): boolean {
	return errors?.some((err) => err.extensions?.errorCode === errorCode) || false;
}

const App = (): React.JSX.Element => {
	const [currentLocation, setCurrentLocation] = useState<Location | undefined>();

	const { crumbs } = useCrumbs(currentLocation, setCurrentLocation);

	const { publicNode, errors, nodeLinkId, queryWithAccessCode, accessCode } = useGetPublicNode();

	useEffect(() => {
		if (publicNode && publicNode.type === GQLNodeType.Folder) {
			setCurrentLocation(publicNode);
		}
	}, [publicNode]);

	const content = useMemo(() => {
		if (currentLocation !== undefined) {
			return (
				<NodeList
					navigateTo={setCurrentLocation}
					currentId={currentLocation.id}
					nodeLinkId={nodeLinkId}
					accessCode={accessCode}
				/>
			);
		}
		if (publicNode && publicNode.type !== GQLNodeType.Folder && accessCode) {
			return (
				<DownloadModal nodeId={publicNode.id} nodeLinkId={nodeLinkId} accessCode={accessCode} />
			);
		}
		if (errors === undefined) {
			return <LoadingIcon icon={'LoaderOutline'} size={'3rem'} />;
		}
		if (
			containsError(errors, ERROR.accessCodeRequired) ||
			containsError(errors, ERROR.wrongAccessCode)
		) {
			return (
				<AccessCodeModal
					queryWithAccessCode={queryWithAccessCode}
					wrongAccessCode={containsError(errors, ERROR.wrongAccessCode)}
				/>
			);
		}
		// case Error.linkNotFound and default
		return <LinkNotFoundContainer />;
	}, [accessCode, currentLocation, errors, nodeLinkId, publicNode, queryWithAccessCode]);

	return (
		<ThemeProvider>
			<SnackbarManager>
				<Container maxHeight={'100vh'} height={'100vh'} mainAlignment={'flex-start'}>
					<HeaderBreadcrumbs crumbs={crumbs} />
					{content}
				</Container>
			</SnackbarManager>
		</ThemeProvider>
	);
};

export default App;
