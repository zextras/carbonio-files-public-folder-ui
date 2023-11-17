/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Container, Crumb, ThemeProvider } from '@zextras/carbonio-design-system';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { NodeList } from './components/NodeList';
import { useGetPublicNode } from './hooks/useGetPublicNode';
import { useNavigation } from './hooks/useNavigation';

const App = (): React.JSX.Element => {
	const { currentId, navigateTo } = useNavigation();

	const [crumbs, setCrumbs] = useState<Array<Crumb>>([]);

	const { publicNode } = useGetPublicNode();
	useEffect(() => {
		if (publicNode) {
			navigateTo(publicNode.id);
			setCrumbs([
				{ id: publicNode.id, label: publicNode.name, onClick: () => navigateTo(publicNode.id) }
			]);
		}
	}, [navigateTo, publicNode]);

	return (
		<ThemeProvider>
			<Container maxHeight={'100vh'} height={'100vh'} mainAlignment={'flex-start'}>
				<HeaderBreadcrumbs crumbs={crumbs} />
				{currentId && <NodeList navigateTo={navigateTo} currentId={currentId} />}
			</Container>
		</ThemeProvider>
	);
};

export default App;
