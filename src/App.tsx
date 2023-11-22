/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Container, SnackbarManager, ThemeProvider } from '@zextras/carbonio-design-system';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { NodeList } from './components/NodeList';
import { useCrumbs } from './hooks/useCrumbs';
import { useGetPublicNode } from './hooks/useGetPublicNode';
import { Location } from './model/Node';

const App = (): React.JSX.Element => {
	const [currentLocation, setCurrentLocation] = useState<Location | undefined>();

	const { crumbs } = useCrumbs(currentLocation, setCurrentLocation);

	const { publicNode } = useGetPublicNode();
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
					{currentLocation && (
						<NodeList navigateTo={setCurrentLocation} currentId={currentLocation.id} />
					)}
				</Container>
			</SnackbarManager>
		</ThemeProvider>
	);
};

export default App;
