/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Container, SnackbarManager, ThemeProvider } from '@zextras/carbonio-design-system';
import { GraphQLError } from 'graphql/error';

import { AccessCodeModal } from './components/AccessCodeModal';
import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { LinkNotFoundContainer } from './components/LinkNotFoundContainer';
import { LoadingIcon } from './components/LoadingIcon';
import { NodeList } from './components/NodeList';
import { useCrumbs } from './hooks/useCrumbs';
import { useGetPublicNode } from './hooks/useGetPublicNode';
import './i18n';
import './network/login-config';
import { Location } from './model/Node';
import { ERROR } from './utils/constants';

type ErrorCode = (typeof ERROR)[keyof typeof ERROR];
function containsError(errors: readonly GraphQLError[] | undefined, errorCode: ErrorCode): boolean {
	return errors?.some((err) => err.extensions?.errorCode === errorCode) || false;
}

const App = (): React.JSX.Element => {
	const [currentLocation, setCurrentLocation] = useState<Location | undefined>();

	const { crumbs } = useCrumbs(currentLocation, setCurrentLocation);

	const { publicNode, errors, nodeLinkId, queryWithAccessCode } = useGetPublicNode();

	useEffect(() => {
		if (publicNode) {
			setCurrentLocation(publicNode);
		}
	}, [publicNode]);

	return (
		<ThemeProvider>
			<SnackbarManager>
				<Container maxHeight={'100vh'} height={'100vh'} mainAlignment={'flex-start'}>
					<HeaderBreadcrumbs crumbs={crumbs} />
					{currentLocation !== undefined && (
						<NodeList
							navigateTo={setCurrentLocation}
							currentId={currentLocation.id}
							nodeLinkId={nodeLinkId}
						/>
					)}
					{currentLocation === undefined && errors === undefined && (
						<Container>
							<LoadingIcon icon={'LoaderOutline'} size={'3rem'} />
						</Container>
					)}
					{currentLocation === undefined && containsError(errors, ERROR.linkNotFound) && (
						<LinkNotFoundContainer />
					)}
					{currentLocation === undefined &&
						(containsError(errors, ERROR.accessCodeRequired) ||
							containsError(errors, ERROR.wrongAccessCode)) && (
							<AccessCodeModal
								queryWithAccessCode={queryWithAccessCode}
								wrongAccessCode={containsError(errors, ERROR.wrongAccessCode)}
							/>
						)}
				</Container>
			</SnackbarManager>
		</ThemeProvider>
	);
};

export default App;
