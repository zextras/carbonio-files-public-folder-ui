/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Container, SnackbarManager, ThemeProvider } from '@zextras/carbonio-design-system';

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

const App = (): React.JSX.Element => {
	const [currentLocation, setCurrentLocation] = useState<Location | undefined>();

	const { crumbs } = useCrumbs(currentLocation, setCurrentLocation);

	const {
		publicNode,
		errors,
		nodeLinkId,
		accessCodeRequired,
		wrongAccessCode,
		linkNotFound,
		queryWithAccessCode
	} = useGetPublicNode();

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
					{currentLocation === undefined && linkNotFound && <LinkNotFoundContainer />}
					{currentLocation === undefined && accessCodeRequired && (
						<AccessCodeModal
							queryWithAccessCode={queryWithAccessCode}
							wrongAccessCode={wrongAccessCode}
						/>
					)}
				</Container>
			</SnackbarManager>
		</ThemeProvider>
	);
};

export default App;
