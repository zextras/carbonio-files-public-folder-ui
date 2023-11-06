/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect, useState } from 'react';

import { Divider, ThemeProvider } from '@zextras/carbonio-design-system';
import { ExecutionResult } from 'graphql/execution';
import { print } from 'graphql/language';
import styled from 'styled-components';

import { HeaderBreadcrumbs } from './components/HeaderBreadcrumbs';
import { ListHeader } from './components/ListHeader';
import { ListItem, ListItemProps } from './components/ListItem';
import {
	File,
	FindNodesDocument,
	FindNodesQuery,
	FindNodesQueryVariables,
	Folder
} from './graphql/types';
import { Body } from './mocks/handlers/handlers.learning.test';
import { crumbsBuilder } from './test/utils';
import { NonNullableListItem } from './utils/typeUtils';
import { isFile } from './utils/utils';

const Grid = styled.div`
	box-sizing: border-box;
	width: 100%;
	gap: 0.5rem 1rem;
	display: grid;
	grid-template-columns: max-content 3fr repeat(3, minmax(max-content, 1fr));
	justify-items: start;
	align-items: center;
	grid-template-rows: minmax(max-content, 1fr);
`;

const RowBorder = styled(Divider)`
	grid-column: 1 / span 5; /* this code makes the row stretch to entire width of the container */
`;

type NodeOfFindNodes = NonNullableListItem<NonNullable<FindNodesQuery['findNodes']>['nodes']>;

function convertNodeToListItemProps(node: File | Folder): ListItemProps {
	return {
		name: node.name,
		type: node.type,
		mimeType: isFile(node) ? node.mime_type : undefined,
		lastModified: node.updated_at,
		size: isFile(node) ? node.size : undefined,
		extension: isFile(node) && node.extension ? node.extension : undefined
	};
}

const App = (): React.JSX.Element => {
	const [nodes, setNodes] = useState<Array<NodeOfFindNodes>>([]);

	useEffect(() => {
		const body: Body<FindNodesQueryVariables> = {
			variables: { folder_id: '' },
			query: print(FindNodesDocument)
		};

		fetch('http://localhost/graphql/', {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body),
			method: 'POST'
		})
			.then((response): Promise<ExecutionResult<FindNodesQuery>> => response.json())
			.then((result) => {
				const newRows = result.data?.findNodes?.nodes.filter(
					(value): value is NodeOfFindNodes => value !== null
				);
				setNodes(newRows ?? []);
			});
	}, []);

	const rowsWithDividers = nodes.map((value, index) => (
		<React.Fragment key={index}>
			<ListItem {...convertNodeToListItemProps(value)} />
			<RowBorder color="secondary.disabled" />
		</React.Fragment>
	));

	return (
		<ThemeProvider>
			<HeaderBreadcrumbs crumbs={crumbsBuilder(10)} />
			<Grid>
				<RowBorder color="secondary.disabled" />
				<ListHeader />
				<RowBorder color="secondary.disabled" />
				{rowsWithDividers}
			</Grid>
		</ThemeProvider>
	);
};

export default App;
