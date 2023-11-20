/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useState } from 'react';

import { Container, Crumb, ThemeProvider } from '@zextras/carbonio-design-system';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { NodeList } from './components/NodeList';
import { useGetPublicNode } from './hooks/useGetPublicNode';
import { Node } from './model/Node';

const App = (): React.JSX.Element => {
	const [currentId, setCurrentId] = useState<string | undefined>();
	const [crumbs, setCrumbs] = useState<Array<Crumb>>([]);

	const [tree, setTree] = useState<Array<{ id: string; label: string }>>([]);

	useEffect(() => {
		const newCrumbs = tree.map<Crumb>((value) => ({
			id: value.id,
			label: value.label,
			onClick: (): void => {
				setCurrentId(value.id);
				setTree((prevState) =>
					prevState.slice(0, prevState.findIndex((el) => el.id === value.id) + 1)
				);
			}
		}));
		setCrumbs(newCrumbs);
	}, [tree]);

	const navigateTo = useCallback((node: Node) => {
		setCurrentId(node.id);
		setTree((prevState) => [...prevState, { id: node.id, label: node.name }]);
	}, []);

	const { publicNode } = useGetPublicNode();
	useEffect(() => {
		if (publicNode) {
			setCurrentId(publicNode.id);
			setTree([
				{
					id: publicNode.id,
					label: publicNode.name
				}
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
