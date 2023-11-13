/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Container, ThemeProvider } from '@zextras/carbonio-design-system';
import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { ListBc } from './components/ListBc';
import {
	GetPublicNodeDocument,
	GQLGetPublicNodeQuery,
	GQLGetPublicNodeQueryVariables
} from './graphql/types';
import { Body } from './mocks/handlers/handlers.learning.test';

const App = (): React.JSX.Element => {
	const [folderId, setFolderId] = useState<string | undefined>();
	useEffect(() => {
		const body: Body<GQLGetPublicNodeQueryVariables> = {
			variables: { node_link_id: '' },
			query: print(GetPublicNodeDocument)
		};

		fetch('http://localhost/graphql/', {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<GQLGetPublicNodeQuery>> => response.json())
			.then((result) => {
				setFolderId(result.data?.getPublicNode?.id);
			});
	}, []);

	return (
		<ThemeProvider>
			<Container maxHeight={'100vh'} height={'100vh'} mainAlignment={'flex-start'}>
				<HeaderBreadcrumbs crumbs={[{ id: 'folderId', label: 'initial folder' }]} />
				{folderId && <ListBc folderId={folderId} />}
			</Container>
		</ThemeProvider>
	);
};

export default App;
