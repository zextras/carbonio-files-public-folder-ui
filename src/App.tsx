/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Container, Text, ThemeProvider } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { IconBig } from './components/IconBig';
import { LoadingIcon } from './components/LoadingIcon';
import { NodeList } from './components/NodeList';
import { useCrumbs } from './hooks/useCrumbs';
import { useGetPublicNode } from './hooks/useGetPublicNode';
import './i18n';
import { Location } from './model/Node';

const App = (): React.JSX.Element => {
	const [t] = useTranslation();
	const [currentLocation, setCurrentLocation] = useState<Location | undefined>();

	const { crumbs } = useCrumbs(currentLocation, setCurrentLocation);

	const { publicNode, errors } = useGetPublicNode();
	useEffect(() => {
		if (publicNode) {
			setCurrentLocation(publicNode);
		}
	}, [publicNode]);

	return (
		<ThemeProvider>
			<Container maxHeight={'100vh'} height={'100vh'} mainAlignment={'flex-start'}>
				<HeaderBreadcrumbs crumbs={crumbs} />
				{currentLocation !== undefined && (
					<NodeList navigateTo={setCurrentLocation} currentId={currentLocation.id} />
				)}
				{currentLocation === undefined && errors === undefined && (
					<Container>
						<LoadingIcon icon={'LoaderOutline'} size={'3rem'} />
					</Container>
				)}
				{currentLocation === undefined && errors !== undefined && (
					<Container gap={'0.0625rem'}>
						<IconBig icon={'EmptyFolder'} color={'gray5'} />
						<Container height={'auto'} width={'auto'} gap={'0.5rem'}>
							<Text weight={'bold'}>
								{t(
									'carbonio-public-folder-ui.invalidLink.title',
									'Public access link not available.'
								)}
							</Text>
							<Text>
								{t(
									'carbonio-public-folder-ui.invalidLink.description.line1',
									'This link has been removed or is not valid.'
								)}
							</Text>
							<Text>
								{t(
									'carbonio-public-folder-ui.invalidLink.description.line2',
									'For more information, try to contact the person who shared it with you.'
								)}
							</Text>
						</Container>
					</Container>
				)}
			</Container>
		</ThemeProvider>
	);
};

export default App;
